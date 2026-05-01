
import React from 'react';
import { Icons } from './Icons';
import { MenuItem } from '../types';

const topRowItems: MenuItem[] = [
  { id: 'bank', label: 'Withdraw', icon: Icons.Send },
  { id: 'palmpay', label: 'To chix9ja', icon: Icons.User },
  { id: 'rewards', label: 'Rewards', icon: Icons.Reward },
  { id: 'subscribe', label: 'Subscribe', icon: Icons.Subscribe },
];

const bottomGridItems: MenuItem[] = [
  { id: 'invest', label: 'Invest', icon: Icons.Invest, color: 'text-amber-400' },
  { id: 'support', label: 'Support', icon: Icons.Support, color: 'text-blue-500' },
  { id: 'free_withdraw', label: 'Task', icon: Icons.Gift, color: 'text-orange-500 dark:text-orange-400', badge: 'Unlock' },
  { id: 'business', label: 'My Business Hub', icon: Icons.Business, color: 'text-blue-600 dark:text-blue-400' },
  { id: 'quiz_game', label: 'Quiz Game', icon: Icons.Gamepad2, color: 'text-purple-500 dark:text-purple-400' },
  { id: 'upgrade', label: 'VIP', icon: Icons.Upgrade, color: 'text-amber-500 dark:text-amber-400' },
  { id: 'loan', label: 'Loan', icon: Icons.Loan, color: 'text-purple-700 dark:text-purple-300' },
  { id: 'sync', label: 'Sync Account', icon: Icons.Sync, color: 'text-gray-500 dark:text-gray-400' },
];

interface ActionGridProps {
  onActionClick?: (id: string) => void;
}

const ActionGrid: React.FC<ActionGridProps> = ({ onActionClick }) => {
  return (
    <div className="space-y-4">
      {/* Top Row - Primary Actions */}
      <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 shadow-xl grid grid-cols-4 gap-3 transition-colors duration-200 border border-gold-glow/20">
        {topRowItems.map((item) => {
          const Icon = item.icon;
          const isGlowing = ['bank', 'rewards', 'subscribe'].includes(item.id);
          const isWhiteGlowing = item.id === 'subscribe';
          const isGoldGlowing = item.id === 'bank';
          
          return (
            <div 
              key={item.id} 
              onClick={() => onActionClick?.(item.id)}
              className="flex flex-col items-center justify-center space-y-2 cursor-pointer active:opacity-70 group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 floating-button ${
                isWhiteGlowing 
                  ? 'bg-white text-black animate-white-glow' 
                  : isGoldGlowing
                    ? 'bg-amber-400 text-black animate-gold-glow'
                    : isGlowing 
                      ? 'bg-green-glow/20 text-green-glow animate-green-glow' 
                      : 'bg-white/5 border-white/10 group-hover:bg-white/10 text-white'
              }`}>
                <Icon size={26} fill="currentColor" className={isWhiteGlowing || isGoldGlowing ? 'text-black' : (isGlowing ? 'text-green-glow' : 'text-white')} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center leading-tight">{item.label}</span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes green-glow {
          0% { box-shadow: 0 0 5px rgba(0, 255, 127, 0.3); transform: scale(1) translateY(-2px); filter: brightness(1); }
          50% { box-shadow: 0 0 25px rgba(0, 255, 127, 0.8); transform: scale(1.05) translateY(-5px); filter: brightness(1.2); }
          100% { box-shadow: 0 0 5px rgba(0, 255, 127, 0.3); transform: scale(1) translateY(-2px); filter: brightness(1); }
        }
        @keyframes white-glow {
          0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); transform: scale(1) translateY(-2px); filter: brightness(1); }
          50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.9); transform: scale(1.05) translateY(-5px); filter: brightness(1.4); }
          100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); transform: scale(1) translateY(-2px); filter: brightness(1); }
        }
        @keyframes gold-glow {
          0% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.3); transform: scale(1) translateY(-2px); filter: brightness(1); }
          50% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.9); transform: scale(1.05) translateY(-5px); filter: brightness(1.4); }
          100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.3); transform: scale(1) translateY(-2px); filter: brightness(1); }
        }
        .animate-green-glow {
          animation: green-glow 2.5s infinite ease-in-out;
        }
        .animate-white-glow {
          animation: white-glow 2.5s infinite ease-in-out;
        }
        .animate-gold-glow {
          animation: gold-glow 2.5s infinite ease-in-out;
        }
      `}</style>

      {/* Secondary Actions Grid */}
      <div className="bg-black/30 backdrop-blur-md rounded-2xl p-5 shadow-2xl grid grid-cols-4 gap-x-3 gap-y-8 transition-colors duration-200 border border-gold-glow/10">
        {bottomGridItems.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id} 
              onClick={() => onActionClick?.(item.id)}
              className="flex flex-col items-center justify-start space-y-3 cursor-pointer active:scale-95 transition-all group"
            >
              {item.badge && (
                <div className="absolute -top-3 right-0 bg-gold-glow text-black text-[7px] font-black px-1.5 py-0.5 rounded-full z-10 shadow-lg uppercase tracking-tighter">
                    {item.badge}
                </div>
              )}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center floating-button ${item.color || 'text-white'}`}>
                <Icon size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 text-center leading-none w-full break-words px-0.5 uppercase tracking-tight group-hover:text-amber-200 transition-colors">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActionGrid;
