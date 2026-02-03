
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center text-white shadow-lg shadow-amber-200">
            <i className="fas fa-h-square text-2xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-display text-slate-800 leading-tight">Saravanaa Bhavan</h1>
            <p className="text-xs font-medium text-amber-800 tracking-widest uppercase italic">Authentic South Indian Cuisine</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="text-amber-700 border-b-2 border-amber-700 pb-1">Menu</a>
        </nav>

        <div className="flex flex-col items-end text-[10px] font-semibold text-slate-400 uppercase tracking-tighter">
          <span>8604 N MacArthur Blvd, Irving</span>
          <span className="text-amber-600 font-bold">(972) 506-7755</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
