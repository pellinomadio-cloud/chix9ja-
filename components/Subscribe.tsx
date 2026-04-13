
import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { Plan } from '../types';

interface SubscribeProps {
  onPlanSelect: (plan: Plan) => void;
  userBalance: number;
  promoExpiry?: number;
}

// Extended plan interface locally for display purposes
interface PlanDisplay extends Plan {
  limitDescription: string;
}

const Subscribe: React.FC<SubscribeProps> = ({ onPlanSelect, userBalance, promoExpiry }) => {
  const [showAdvert, setShowAdvert] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const isPromoActive = promoExpiry ? now < promoExpiry : false;

  const plans: PlanDisplay[] = [
    { 
      id: 'weekly', 
      name: 'Weekly Plan', 
      price: isPromoActive ? '₦4,500' : '₦8,000', 
      amount: isPromoActive ? '4,500 Naira' : '8,000 Naira', 
      duration: '7 Days',
      limitDescription: 'Withdraw limit: ₦200,000 / week'
    },
    { 
      id: 'monthly', 
      name: 'Monthly Plan', 
      price: isPromoActive ? '₦7,000' : '₦15,000', 
      amount: isPromoActive ? '7,000 Naira' : '15,000 Naira', 
      duration: '30 Days', 
      recommended: true,
      limitDescription: 'Withdraw limit: ₦2,000,000 / month'
    },
    { 
      id: 'yearly', 
      name: 'Premium User', 
      price: '₦50,000', 
      amount: '50,000 Naira', 
      duration: '365 Days',
      limitDescription: 'Unlimited Withdrawals'
    },
  ];

  useEffect(() => {
    // Initial delay
    const timer = setTimeout(() => setShowAdvert(true), 1000);
    
    const interval = setInterval(() => {
      setShowAdvert(prev => !prev);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleSupportClick = () => {
    window.open('https://t.me/CHIX9JAservice', '_blank');
  };

  return (
    <div className="px-4 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-24">
      
      {/* Header Text */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Choose Your Plan</h2>
        <p className="text-sm text-gray-500">Unlock premium features with our flexible subscription plans.</p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 gap-4">
        {plans.map((plan) => {
          const isWeeklyRestricted = plan.id === 'weekly' && userBalance > 200000;
          const isMonthlyRestricted = plan.id === 'monthly' && userBalance > 2000000;
          const isRestricted = isWeeklyRestricted || isMonthlyRestricted;

          return (
            <div 
              key={plan.id}
              onClick={() => {
                if (!isRestricted) {
                  onPlanSelect(plan);
                }
              }}
              className={`relative p-4 rounded-2xl border-2 transition-all duration-200 ${
                isRestricted 
                ? 'border-red-900/50 bg-red-950/20 cursor-not-allowed opacity-80' 
                : 'border-gray-800 bg-gray-900 hover:border-green-glow cursor-pointer active:scale-[0.98]'
              }`}
            >
              {plan.recommended && !isRestricted && (
                <span className="absolute -top-3 right-4 bg-green-glow text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                  BEST VALUE
                </span>
              )}
              
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${isRestricted ? 'text-gray-500' : 'text-white'}`}>{plan.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">{plan.duration}</p>
                  
                  {isRestricted ? (
                    <div className="mt-2 p-2 bg-red-900/20 border border-red-800/30 rounded-lg">
                      <p className="text-[10px] font-bold text-red-400 leading-tight uppercase">
                        {isWeeklyRestricted 
                          ? "earnings on your dashboard has exceed weekly plan limit, kindly subscribe to monthly to perform withdrawal"
                          : "earnings on your dashboard has exceed monthly plan limit, kindly subscribe to yearly to perform withdrawal"
                        }
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 mt-2">
                        <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-green-glow/10 text-green-glow">
                            <Icons.CheckCircle size={10} className="mr-1" />
                            <span className="text-[10px] font-bold">{plan.limitDescription}</span>
                        </div>
                        <button className="w-full py-2 bg-white text-black font-black text-xs rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-white-glow-button">
                            SUBSCRIBE NOW
                        </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 ml-4">
                   <span className={`text-xl font-extrabold ${isRestricted ? 'text-gray-600' : 'text-green-glow'}`}>{plan.price}</span>
                   {!isRestricted && <Icons.ChevronRight size={20} className="text-gray-700" />}
                   {isRestricted && <Icons.Lock size={20} className="text-red-900/50" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes white-glow-button {
          0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
          50% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.7); }
          100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
        }
        .animate-white-glow-button {
          animation: white-glow-button 2s infinite ease-in-out;
        }
      `}</style>

      {/* Support Advert */}
      <div 
        className={`fixed bottom-20 left-4 right-4 z-[100] transition-all duration-500 transform ${
          showAdvert ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <div 
          onClick={handleSupportClick}
          className="bg-green-glow rounded-2xl p-4 shadow-green-lg flex items-center justify-between cursor-pointer active:scale-95 transition-transform border border-white/20"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-green-glow shadow-md">
              <Icons.Support size={20} />
            </div>
            <div>
              <p className="text-black font-black text-sm">Need assistance or info?</p>
              <p className="text-black/70 text-xs font-bold">Contact Support on Telegram</p>
            </div>
          </div>
          <div className="bg-black text-green-glow px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider">
            Chat Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
