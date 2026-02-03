
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from '@google/genai';
import { SYSTEM_INSTRUCTION } from '../constants';

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer, data.byteOffset, data.byteLength / 2);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface VoiceAgentProps {
  onUpdateCart: (updates: { name: string; quantity: number }[]) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({ onUpdateCart, isActive, setIsActive }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [volume, setVolume] = useState<number>(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  const updateCartFunctionDeclaration: FunctionDeclaration = {
    name: 'update_cart',
    parameters: {
      type: Type.OBJECT,
      description: 'Update the customer shopping cart with items and quantities.',
      properties: {
        updates: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: 'The exact name of the menu item.' },
              quantity: { type: Type.NUMBER, description: 'The total quantity of this item in the cart.' }
            },
            required: ['name', 'quantity']
          }
        }
      },
      required: ['updates']
    }
  };

  const stopConversation = useCallback(() => {
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch (e) {}
      sessionRef.current = null;
    }
    
    if (audioContextRef.current) {
      if (audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      audioContextRef.current = null;
    }
    
    if (outputAudioContextRef.current) {
      if (outputAudioContextRef.current.state !== 'closed') {
        outputAudioContextRef.current.close().catch(() => {});
      }
      outputAudioContextRef.current = null;
    }

    sourcesRef.current.forEach(s => {
      try { s.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();
    
    setIsActive(false);
    setIsConnecting(false);
    setVolume(0);
  }, [setIsActive]);

  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const startConversation = async () => {
    if (!process.env.API_KEY || isConnecting || isActive) return;

    setIsConnecting(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      await inputCtx.resume();
      await outputCtx.resume();

      audioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = inputCtx.createMediaStreamSource(stream);
      const scriptProcessor = inputCtx.createScriptProcessor(2048, 1, 1);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ functionDeclarations: [updateCartFunctionDeclaration] }],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          }
        },
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            
            // Send initial trigger immediately
            sessionPromise.then(session => {
              session.sendRealtimeInput({
                parts: [{ text: `[START_CALL] Current time is ${getTimeOfDayGreeting()}.` }]
              });
            });

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const sum = inputData.reduce((acc, val) => acc + val * val, 0);
              setVolume(Math.sqrt(sum / inputData.length));

              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000'
              };
              
              // CRITICAL: Rely solely on sessionPromise
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
          },
          onmessage: async (message: LiveServerMessage) => {
            // Find and process audio parts
            if (message.serverContent?.modelTurn?.parts) {
              for (const part of message.serverContent.modelTurn.parts) {
                if (part.inlineData?.data && outputAudioContextRef.current) {
                  const ctx = outputAudioContextRef.current;
                  nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                  const buffer = await decodeAudioData(decode(part.inlineData.data), ctx, 24000, 1);
                  const sourceNode = ctx.createBufferSource();
                  sourceNode.buffer = buffer;
                  sourceNode.connect(ctx.destination);
                  sourceNode.addEventListener('ended', () => sourcesRef.current.delete(sourceNode));
                  sourceNode.start(nextStartTimeRef.current);
                  nextStartTimeRef.current += buffer.duration;
                  sourcesRef.current.add(sourceNode);
                }
              }
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                if (fc.name === 'update_cart') {
                  onUpdateCart((fc.args as any).updates);
                  sessionPromise.then(s => s.sendToolResponse({
                    functionResponses: {
                      id: fc.id,
                      name: fc.name,
                      response: { result: "ok" }
                    }
                  }));
                }
              }
            }
          },
          onclose: () => stopConversation(),
          onerror: () => stopConversation()
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Voice Initialization Error:", err);
      setIsConnecting(false);
      stopConversation();
    }
  };

  useEffect(() => {
    return () => stopConversation();
  }, [stopConversation]);

  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={isActive || isConnecting ? stopConversation : startConversation}
        disabled={isConnecting}
        className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white shadow-2xl transition-all transform hover:scale-105 active:scale-95 relative z-50 ${
          isActive ? 'bg-red-600' : 'bg-amber-800 hover:bg-amber-900'
        } ${isConnecting ? 'cursor-wait' : ''}`}
      >
        {isConnecting ? (
          <i className="fas fa-circle-notch fa-spin"></i>
        ) : (
          <i className={`fas ${isActive ? 'fa-phone-slash' : 'fa-phone-alt'}`}></i>
        )}
        
        {isActive && (
          <>
            <span className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping"></span>
            <div 
              className="absolute -inset-2 rounded-full border-2 border-red-400/30 transition-transform duration-75 pointer-events-none"
              style={{ transform: `scale(${1 + volume * 1.5})` }}
            ></div>
          </>
        )}
      </button>
      
      {(isActive || isConnecting) && (
        <span className="mt-3 text-[10px] font-bold text-amber-900 uppercase tracking-widest bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-amber-100 animate-fadeIn">
          {isConnecting ? 'Establishing Line...' : 'Saravanaa Bhavan Live'}
        </span>
      )}
    </div>
  );
};

export default VoiceAgent;
