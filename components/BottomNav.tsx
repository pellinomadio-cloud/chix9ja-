import React from 'react';
import { Icons } from './Icons';
import { User } from '../types';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user?: User | null;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, user }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Icons.Home },
    { id: 'loan', label: 'Loan', icon: Icons.LoanTab },
    { id: 'finance', label: 'Finance', icon: Icons.Finance },
    { id: 'reward', label: 'Reward', icon: Icons.Reward },
    { id: 'me', label: 'Me', icon: Icons.Me },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xl border-t border-gold-glow/10 pb-safe-area transition-colors duration-200 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center px-4 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isMeAndHasImage = tab.id === 'me' && user?.profileImage;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
                isActive ? 'text-amber-400 scale-110' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className={`relative ${isActive ? 'drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : ''}`}>
                {isMeAndHasImage ? (
                  <div className={`w-7 h-7 rounded-full overflow-hidden border-2 ${isActive ? 'border-amber-400' : 'border-transparent'}`}>
                    <img src={user!.profileImage} alt="Me" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <Icon size={24} strokeWidth={isActive ? 3 : 2} />
                )}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full shadow-[0_0_5px_rgba(251,191,36,1)]"></div>
                )}
              </div>
              
              <span className={`text-[9px] font-black uppercase tracking-tighter transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;