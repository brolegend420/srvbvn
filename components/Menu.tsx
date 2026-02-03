
import React from 'react';
import { MenuItem } from '../types';

interface MenuProps {
  items: MenuItem[];
  activeCategory: string;
}

const Menu: React.FC<MenuProps> = ({ items, activeCategory }) => {
  const filteredItems = items.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm transition-all flex items-center justify-between group hover:border-amber-200"
          >
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <h4 className="font-bold text-slate-800 text-lg">
                  {item.name}
                </h4>
              </div>
              {item.description && (
                <p className="text-xs text-slate-400 mb-2 leading-relaxed italic">
                  {item.description}
                </p>
              )}
              <span className="text-base font-bold text-amber-800 tracking-tight">${item.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          No items found in this category.
        </div>
      )}
    </div>
  );
};

export default Menu;
