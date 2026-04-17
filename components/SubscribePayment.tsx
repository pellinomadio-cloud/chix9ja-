
import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { Plan, User } from '../types';

interface SubscribePaymentProps {
  plan: Plan;
  userEmail: string;
  onPaymentComplete: () => void;
}

const SubscribePayment: React.FC<SubscribePaymentProps> = ({ plan, userEmail, onPaymentComplete }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'failed' | 'success'>('idle');
  const [isFetching, setIsFetching] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [isPromoCodeApplied, setIsPromoCodeApplied] = useState(false);

  const accountNumber = "0435119272";

  const getPrice = () => {
    if (isPromoCodeApplied) {
      if (plan.id === 'weekly') return '₦6,000';
      if (plan.id === 'monthly') return '₦10,000';
      if (plan.id === 'yearly') return '₦25,000';
    }
    return plan.price;
  };

  const handleApplyPromo = () => {
    if (promoCodeInput.trim() === '987789') {
      setIsPromoCodeApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && promoCodeInput) {
      handleApplyPromo();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Initial fetching state
    const timer = setTimeout(() => {
      setIsFetching(false);
    }, 3000);

    // Warning message interval (show/hide or pulse)
    const warningInterval = setInterval(() => {
      setShowWarning(prev => !prev);
      setTimeout(() => setShowWarning(true), 500); // Quick pulse
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(warningInterval);
    };
  }, []);

  const handleVerify = () => {
    if (!proofFile) {
      alert("Please upload payment proof first.");
      return;
    }
    setStatus('loading');

    // Wait for 3 seconds as requested
    setTimeout(() => {
        // Check V Mode status from local storage to ensure we have the latest admin settings
        const existingUsersStr = localStorage.getItem('chix9ja_users');
        const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : {};
        const currentUser: User = existingUsers[userEmail.toLowerCase()];

        if (currentUser && currentUser.isVMode) {
            // SUCCESS LOGIC: Activate subscription as selected
            let durationDays = 30; 
            if (plan.id === 'weekly') durationDays = 7;
            if (plan.id === 'yearly') durationDays = 365;
            
            const expiryTimestamp = Date.now() + (durationDays * 24 * 60 * 60 * 1000);

            // Update user in storage
            currentUser.isSubscribed = true;
            currentUser.subscriptionPlan = plan.name;
            currentUser.subscriptionExpiryDate = expiryTimestamp;
            currentUser.isVMode = false; // Optionally consume the V mode trigger
            
            existingUsers[userEmail.toLowerCase()] = currentUser;
            localStorage.setItem('chix9ja_users', JSON.stringify(existingUsers));
            
            setStatus('success');
            setTimeout(() => {
                alert(`Activation Successful! Your ${plan.name} is now active.`);
                window.location.reload(); // Reload to refresh all app state
            }, 500);
        } else {
            // FAILED LOGIC
            setStatus('failed');
        }
    }, 3000);
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-in fade-in duration-500">
        <div className="w-16 h-16 border-4 border-green-glow border-t-transparent rounded-full animate-spin"></div>
        <p className="text-green-glow font-black uppercase tracking-widest animate-pulse">fetching management account...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Warning Message */}
      <div className={`bg-red-600 text-white p-3 rounded-xl text-center font-black text-xs uppercase tracking-tighter transition-all duration-500 ${showWarning ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}>
        DONT USE OPAY AND PALMPAY TO PAY FOR SUBSCRIPTION. OTHER BANKS LIKE MONIEPOINT E.T.C ARE ALLOWED.
      </div>

      {/* Selected Plan Summary */}
      <div className="bg-gray-900 p-4 rounded-xl flex justify-between items-center border border-gray-800 shadow-sm relative overflow-hidden">
        {isPromoCodeApplied && (
          <div className="absolute top-0 right-0 bg-amber-500 text-black text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-tighter animate-pulse">
            PROMO APPLIED
          </div>
        )}
        <div>
            <p className="text-xs text-green-glow font-bold uppercase tracking-wide">Selected Plan</p>
            <h3 className="text-lg font-bold text-white">{plan.name}</h3>
        </div>
        <div className="text-right">
            <p className={`text-xl font-black transition-all duration-300 ${isPromoCodeApplied ? 'text-amber-400 scale-110' : 'text-green-glow'}`}>
              {getPrice()}
            </p>
            {isPromoCodeApplied && (
              <p className="text-[10px] text-gray-500 line-through font-bold">{plan.price}</p>
            )}
            <p className="text-xs text-gray-500 font-medium">{plan.duration}</p>
        </div>
      </div>

      {/* Promo Code Section */}
      {!isPromoCodeApplied && (
        <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 space-y-3 shadow-inner">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center">
            <Icons.Tag size={10} className="mr-1" />
            Have a promo code?
          </label>
          <div className="flex space-x-2">
            <input 
              type="text" 
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter Code (e.g. 987789)"
              className="flex-1 bg-black/40 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-glow transition-colors"
            />
            <button 
              onClick={handleApplyPromo}
              disabled={!promoCodeInput}
              className="px-6 py-2 bg-green-glow hover:bg-green-dark text-black rounded-xl text-xs font-black active:scale-95 disabled:opacity-50 transition-all shadow-lg"
            >
              APPLY
            </button>
          </div>
        </div>
      )}

      {/* Account Details Section */}
      <div className="space-y-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 text-center">Step 1: Transfer to Management Account</p>
        
        <div className="bg-gray-900 rounded-2xl p-6 shadow-xl border border-green-glow/30 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-green-glow"></div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-xs text-gray-500 uppercase font-bold">Account Number</span>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black text-white tracking-widest">{accountNumber}</span>
                <button 
                  onClick={handleCopy}
                  className={`p-1.5 rounded-md transition-all ${copied ? 'bg-green-500 text-white' : 'bg-green-glow/20 text-green-glow hover:bg-green-glow/30'}`}
                >
                  {copied ? <Icons.Check size={14} /> : <Icons.Copy size={14} />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-xs text-gray-500 uppercase font-bold">Bank Name</span>
              <span className="text-lg font-black text-green-glow uppercase">Paga</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 uppercase font-bold">Account Name</span>
              <span className="text-sm font-black text-white uppercase">Marvelous Michael O</span>
            </div>
          </div>
          
          <div className="bg-green-glow/10 p-3 rounded-lg flex items-start space-x-2 border border-green-glow/20">
            <Icons.AlertTriangle size={16} className="text-green-glow flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-green-glow/80 leading-tight font-medium">
              Ensure you pay exactly <span className="font-black text-white">{getPrice()}</span> for your selected plan. Transfers from OPAY and PALMPAY are strictly prohibited.
            </p>
          </div>
        </div>
      </div>

      {/* Proof Upload Section */}
      <div className="space-y-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 text-center">Step 2: Upload Payment Proof</p>
        
        <div className="relative">
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setProofFile(e.target.files?.[0] || null)}
            className="hidden" 
            id="proof-upload"
          />
          <label 
            htmlFor="proof-upload"
            className={`w-full py-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all ${
              proofFile ? 'border-green-500 bg-green-500/5' : 'border-gray-700 bg-gray-900 hover:border-green-glow'
            }`}
          >
            {proofFile ? (
              <>
                <Icons.CheckCircle size={32} className="text-green-500" />
                <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Proof Selected: {proofFile.name}</span>
              </>
            ) : (
              <>
                <Icons.Upload size={32} className="text-gray-600" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Click to upload receipt</span>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Status Message */}
      {status === 'failed' && (
          <div className="bg-red-900/30 p-4 rounded-xl flex items-center justify-center space-x-3 animate-in shake duration-300 border border-red-800">
               <Icons.X className="text-red-400" size={20} />
               <p className="text-sm font-black text-red-400 uppercase">Verification Pending</p>
          </div>
      )}

      {/* VERIFY Button */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 text-center">Step 3: Verify Activation</p>
        <button 
            onClick={handleVerify}
            disabled={status === 'loading' || status === 'success'}
            className={`w-full py-4 rounded-xl text-black font-black text-lg shadow-xl transition-all flex items-center justify-center space-x-2 ${
                status === 'loading'
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-green-glow hover:bg-green-dark transform active:scale-95'
            }`}
        >
            {status === 'loading' ? <Icons.Sync className="animate-spin" size={20} /> : <Icons.ShieldCheck size={20} />}
            <span className="uppercase tracking-widest">{status === 'loading' ? 'Verifying...' : 'Verify Payment'}</span>
        </button>
      </div>

      <div className="bg-green-glow/5 p-3 rounded-lg text-center border border-green-glow/10">
          <p className="text-[10px] text-green-glow/60 leading-tight">
            Our admin team will verify your uploaded proof manually. <br/>
            <span className="font-bold">Fake proofs will lead to permanent account ban.</span>
          </p>
      </div>

    </div>
  );
};

export default SubscribePayment;
