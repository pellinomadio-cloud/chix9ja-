
import React from 'react';
import { Icons } from './Icons';

const Banner: React.FC = () => {
  return (
    <div className="mt-4 mb-24 relative rounded-2xl overflow-hidden shadow-2xl border border-gold-glow/20 floating-button">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-black to-black backdrop-blur-md"></div>
      
      <div className="relative p-6 flex justify-between items-center">
        <div className="flex-1 z-10">
            <h3 className="text-amber-400 font-black text-xl italic mb-1 uppercase tracking-tighter">Financial Freedom!</h3>
            <p className="text-gray-300 text-xs font-bold mb-5 max-w-[200px] leading-relaxed uppercase tracking-tight opacity-80">
                Unlock your potential with easy credit. <span className="text-amber-200">Our Quick Loan Is Ready When You Are</span>
            </p>
            <button className="bg-amber-400 text-black text-[10px] font-black py-2.5 px-8 rounded-xl shadow-[0_4px_15px_rgba(251,191,36,0.4)] uppercase tracking-widest active:scale-95 transition-all">
                Get Now!
            </button>
            
             {/* Pagination Dots Simulation */}
            <div className="flex space-x-1.5 mt-4">
                <div className="w-3 h-1 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
                <div className="w-1.5 h-1 rounded-full bg-white/10"></div>
                <div className="w-1.5 h-1 rounded-full bg-white/10"></div>
            </div>
        </div>

        {/* Illustrations */}
        <div className="absolute right-0 bottom-0 h-full w-1/2 flex items-end justify-end pointer-events-none">
             <img 
                src="https://picsum.photos/200/150?random=10" 
                alt="Growth" 
                className="object-cover h-full w-full opacity-90 mask-image-gradient" 
                style={{maskImage: 'linear-gradient(to right, transparent, black)'}}
             />
        </div>
      </div>
    </div>
  );
};

export default Banner;
