
import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { User } from '../types';

interface LoanProps {
  user: User;
  onApply: (amount: number) => void;
  onBack: () => void;
}

const loanOffers = [
  { id: 'small', amount: 50000, label: 'Starter Loan', duration: '7 Days' },
  { id: 'medium', amount: 150000, label: 'Business Growth', duration: '14 Days' },
  { id: 'large', amount: 500000, label: 'Enterprise Fund', duration: '30 Days' },
];

const Loan: React.FC<LoanProps> = ({ user, onApply, onBack }) => {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState('');

  const isEligible = user.isSubscribed && (user.subscriptionPlan === 'Monthly Plan' || user.subscriptionPlan === 'Yearly Plan');
  const hasActiveLoan = (user.loanBalance || 0) > 0;

  useEffect(() => {
    if (!user.loanExpiry) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = user.loanExpiry! - now;

      if (diff <= 0) {
        setTimeLeft('Repayment Due');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h left`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s left`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [user.loanExpiry]);

  if (!isEligible && !hasActiveLoan) {
    return (
      <div className="px-4 py-10 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
        <div className="w-24 h-24 bg-amber-400/10 rounded-3xl flex items-center justify-center text-amber-400 floating-button border-amber-400/20">
          <Icons.Lock size={48} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">LOANS <span className="text-amber-400">RESTRICTED</span></h2>
          <p className="text-gray-400 mt-2 max-w-xs mx-auto font-bold text-sm tracking-tight">
            Free loans are exclusive to <span className="text-amber-400">Monthly</span> and <span className="text-amber-400">Yearly</span> subscribers.
          </p>
        </div>
        <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">
          <p className="text-xs text-amber-200 font-bold leading-relaxed">
            Please upgrade your plan to access instant business credit up to ₦500,000 with 0% interest.
          </p>
        </div>
        <button 
          onClick={onBack}
          className="w-full max-w-sm bg-amber-400 hover:bg-amber-500 text-black font-black py-4 rounded-xl shadow-xl shadow-amber-400/20 transition-all uppercase tracking-widest active:scale-95 floating-button"
        >
          BACK TO DASHBOARD
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center p-4 bg-amber-400/10 rounded-2xl text-amber-400 mb-2 border border-amber-400/20 floating-button">
          <Icons.Banknote size={40} />
        </div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">INSTANT <span className="text-amber-400">CREDIT</span></h2>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest opacity-70">Borrow interest-free. Safe & Secure.</p>
      </div>

      {hasActiveLoan ? (
        <div className="bg-gradient-to-br from-green-glow to-green-dark rounded-3xl p-8 text-black shadow-2xl relative overflow-hidden floating-button border border-green-glow/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-black/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="text-black text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Active Loan Balance</p>
            <h3 className="text-5xl font-black my-4 tracking-tighter">₦{user.loanBalance?.toLocaleString()}</h3>
            <div className="bg-black text-green-glow rounded-full px-6 py-2 flex items-center space-x-2 mt-2 shadow-lg border border-green-glow/20">
              <Icons.Clock size={16} strokeWidth={3} />
              <span className="text-sm font-black uppercase tracking-tighter">{timeLeft}</span>
            </div>
            <p className="text-[9px] text-black font-bold mt-6 leading-tight uppercase tracking-widest opacity-60">
              Automated repayment upon expiry.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Available Loan Offers</h3>
          <div className="grid grid-cols-1 gap-4">
            {loanOffers.map((offer) => (
              <div 
                key={offer.id}
                onClick={() => setSelectedOffer(offer.amount)}
                className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center floating-button ${
                  selectedOffer === offer.amount 
                  ? 'border-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,0.3)]' 
                  : 'border-white/5 bg-black/40'
                }`}
              >
                <div className="space-y-1">
                  <h4 className={`font-black uppercase tracking-tighter text-lg ${selectedOffer === offer.amount ? 'text-amber-400' : 'text-white'}`}>{offer.label}</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Term: {offer.duration} • 0% Interest</p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-black tracking-tighter ${selectedOffer === offer.amount ? 'text-amber-400' : 'text-gray-400'}`}>₦{offer.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => selectedOffer && onApply(selectedOffer)}
            disabled={!selectedOffer}
            className="w-full py-5 bg-green-glow hover:bg-green-dark disabled:bg-gray-800 disabled:text-gray-500 text-black font-black rounded-2xl shadow-xl shadow-green-glow/20 transition-all flex items-center justify-center space-x-3 active:scale-95 uppercase tracking-[0.2em] mt-4 floating-button"
          >
            <Icons.CheckCircle size={24} strokeWidth={3} />
            <span>Apply Now</span>
          </button>
        </div>
      )}

      <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-xl">
        <h4 className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em] mb-4">Contract Agreement</h4>
        <ul className="space-y-3">
          <li className="flex items-start space-x-3 text-xs text-gray-300 font-bold tracking-tight">
            <span className="mt-1 flex-shrink-0 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_5px_rgba(251,191,36,0.5)]"></span>
            <span>Automated repayment will occur exactly on the expiry date.</span>
          </li>
          <li className="flex items-start space-x-3 text-xs text-gray-300 font-bold tracking-tight">
            <span className="mt-1 flex-shrink-0 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_5px_rgba(251,191,36,0.5)]"></span>
            <span>Borrower agrees to maintain sufficient balance for repayment.</span>
          </li>
        </ul>
      </div>

      <button onClick={onBack} className="w-full py-4 text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity">
        Back to Dashboard
      </button>
    </div>
  );
};

export default Loan;
