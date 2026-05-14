
import React, { useState } from 'react';
import { Icons } from './Icons';
import { User } from '../types';

interface LinkWithdrawAccountProps {
  user: User;
  onBack: () => void;
}

const LinkWithdrawAccount: React.FC<LinkWithdrawAccountProps> = ({ user, onBack }) => {
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName || !bankName || !accountNumber) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    // Simulate a brief delay
    setTimeout(() => {
      setLoading(false);
      setStep('payment');
    }, 1500);
  };

  if (step === 'payment') {
    return (
      <div className="px-4 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24 text-center">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-amber-400/10 rounded-full flex items-center justify-center animate-pulse border-2 border-amber-400/50">
            <Icons.AlertTriangle size={48} className="text-amber-400" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight">
            Account Linking <span className="text-amber-400">Incomplete</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed px-4">
            Standard verification required. To complete the secure linking of your withdrawal account to the <span className="text-white font-bold italic">chix9ja</span> network, a one-time database synchronization fee is required.
          </p>
        </div>

        <div className="bg-gray-900 border-2 border-amber-400/20 rounded-[2.5rem] p-8 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Icons.Lock size={120} />
          </div>
          <p className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em]">Required Payment</p>
          <p className="text-5xl font-black text-white tracking-tighter">₦47,000</p>
          <div className="h-px bg-gray-800 w-1/2 mx-auto"></div>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Database Sync Fee</p>
        </div>

        <div className="space-y-4">
          <button 
            className="w-full py-5 bg-amber-400 text-black font-black rounded-2xl shadow-xl shadow-amber-400/20 active:scale-[0.98] transition-all uppercase tracking-widest text-sm"
            onClick={() => alert("Please contact support at t.me/CHIX9JAservice to get the payment details for your dedicated sync node.")}
          >
            PROCEED TO PAYMENT
          </button>
          
          <button 
            onClick={onBack}
            className="w-full py-4 text-gray-500 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
          >
            Cancel & Return
          </button>
        </div>

        <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-600 font-bold uppercase">
          <Icons.ShieldCheck size={14} className="text-amber-400" />
          <span>Secured by chix9ja Node Validator v4.2</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <div className="flex items-center space-x-2">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          <Icons.ArrowLeft size={24} className="text-white" />
        </button>
        <h2 className="text-xl font-bold text-white">Link Account</h2>
      </div>

      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-400 mb-4 border border-blue-600/20">
          <Icons.Link size={32} />
        </div>
        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Withdrawal Account</h3>
        <p className="text-sm text-gray-500 font-medium">Provide details for your external bank account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/50 p-6 rounded-[2rem] border border-white/5 backdrop-blur-xl">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Account Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icons.User size={18} className="text-blue-500/50" />
              </div>
              <input 
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Full Name as it appears on bank"
                className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-medium text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Bank Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icons.Banknote size={18} className="text-blue-500/50" />
              </div>
              <input 
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. OPay, PalmPay, Zenit"
                className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-medium text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Account Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icons.Hash size={18} className="text-blue-500/50" />
              </div>
              <input 
                type="number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="10-digit Account Number"
                className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-medium text-sm tracking-widest"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-600/10 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 uppercase tracking-widest text-sm"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <Icons.PlusCircle size={18} />
              <span>Link Account Now</span>
            </>
          )}
        </button>
      </form>

      <div className="bg-blue-600/5 p-4 rounded-xl border border-blue-600/10">
         <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Security Notice</p>
         <p className="text-xs text-gray-500 leading-relaxed italic">
           Ensure your details are accurate. Linked accounts are cryptographically bound to your chix9ja profile for zero-risk settlements.
         </p>
      </div>
    </div>
  );
};

export default LinkWithdrawAccount;
