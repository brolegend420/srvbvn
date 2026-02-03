
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onAdd: (id: string) => void;
  subtotal: number;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onAdd, subtotal }) => {
  const deliveryFee = 0; // Saravanaa Bhavan Pickup only in this flow
  const taxRate = 0.0825;
  const tax = subtotal * taxRate;
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 flex flex-col overflow-hidden shadow-xl shadow-slate-200/50">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <i className="fas fa-receipt text-amber-700"></i>
          Your Order
        </h3>
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-md">
          {items.length} {items.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[400px] p-4 space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-slate-200 mb-3">
              <i className="fas fa-shopping-basket text-5xl"></i>
            </div>
            <p className="text-slate-400 text-sm">Your order is empty.</p>
            <p className="text-amber-700 text-xs font-medium mt-1">Talk to our AI concierge to order!</p>
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} className="flex justify-between items-center group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 text-xs font-bold border border-amber-100">
                  {item.quantity}x
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">{item.name}</h4>
                  <p className="text-xs text-slate-400">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onRemove(item.id)}
                  className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-minus text-[10px]"></i>
                </button>
                <button 
                  onClick={() => onAdd(item.id)}
                  className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-plus text-[10px]"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-3">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Tax (8.25%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg text-slate-900 border-t border-slate-200 pt-2">
            <span>Total</span>
            <span className="text-amber-700">${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-xl font-bold shadow-lg shadow-amber-200 transition-all transform active:scale-[0.98]">
            Finalize Pickup Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
