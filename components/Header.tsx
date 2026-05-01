
import React from 'react';
import { Icons } from './Icons';

interface HeaderProps {
  userName?: string;
  profileImage?: string;
  onLogout?: () => void;
  showBack?: boolean;
  onBack?: () => void;
  pageTitle?: string;
  onNotificationClick?: () => void;
  hasUnread?: boolean;
  isSubscribed?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  userName = "Guest", 
  profileImage, 
  onLogout,
  showBack = false,
  onBack,
  pageTitle,
  onNotificationClick,
  hasUnread = false,
  isSubscribed = false
}) => {
  // Get initials safely
  const initials = userName.length >= 2 ? userName.substring(0, 2).toUpperCase() : userName.substring(0, 1).toUpperCase();
  const firstName = userName.split(' ')[0];

  return (
    <div className="bg-black/40 backdrop-blur-md px-4 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm transition-all duration-300 border-b border-gold-glow/10">
      <div className="flex items-center space-x-2">
        {showBack ? (
          <>
            <button 
              onClick={onBack} 
              className="p-2 -ml-2 mr-1 hover:bg-white/10 rounded-full transition-colors text-white floating-button border-white/10"
            >
              <Icons.ArrowLeft size={24} />
            </button>
            <span className="font-black text-white text-lg tracking-tight uppercase">{pageTitle}</span>
          </>
        ) : (
          <>
            <div className="relative group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-glow to-green-dark flex items-center justify-center text-black font-black italic text-base overflow-hidden shadow-green-lg floating-button border-green-glow/20 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  {profileImage ? (
                    <img src={profileImage} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    initials
                  )}
              </div>
              {isSubscribed && (
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 border-2 border-black rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse flex items-center justify-center">
                  <Icons.Star size={8} className="fill-black" />
                </span>
              )}
            </div>
            <div className="flex flex-col ml-1">
              <div className="flex items-center space-x-1">
                <span className={`font-black text-white text-lg truncate max-w-[150px] tracking-tight ${isSubscribed ? 'text-glow-green' : ''}`}>Hi, {firstName}</span>
                {isSubscribed && (
                  <span className="bg-amber-400 text-black text-[8px] font-black px-1.5 py-0.5 rounded-full border border-amber-600 uppercase tracking-tighter shadow-sm">
                    VIP
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="flex items-center space-x-3 text-gray-300">
        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all floating-button border-white/5">
            <Icons.Support size={20} className="text-white" />
        </button>
        <button 
          onClick={onNotificationClick}
          className="p-2 relative bg-white/5 hover:bg-white/10 rounded-xl transition-all floating-button border-white/5"
        >
            <Icons.Notification size={20} className="text-white" />
            {hasUnread && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full border-2 border-black animate-pulse shadow-lg">
                  New
              </span>
            )}
        </button>
      </div>
    </div>
  );
};

export default Header;
