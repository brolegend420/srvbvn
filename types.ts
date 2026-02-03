
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 
    | 'APPETIZERS & SOUPS' 
    | 'IDLY VARIETIES' 
    | 'DOSAS' 
    | 'RAVA DOSAS' 
    | 'UTHAPPAM' 
    | 'PONGAL & UPMA' 
    | 'RICE VARIETIES' 
    | 'BIRYANIS & PULAO' 
    | 'THALI MEALS' 
    | 'BREADS' 
    | 'NORTH INDIAN CURRIES' 
    | 'INDO-CHINESE' 
    | 'STARTERS' 
    | 'BEVERAGES' 
    | 'DESSERTS';
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface TranscriptionEntry {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface VoiceState {
  isActive: boolean;
  isConnecting: boolean;
  isListening: boolean;
  lastError: string | null;
}
