
import React, { useState } from 'react';
import { Icons } from './Icons';

interface LoginProps {
  onLogin: (email: string, name: string) => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and max 4 digits
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPassword(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password.length !== 4) {
      setError('Please enter your 4-digit PIN');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call / Local Validation
    setTimeout(() => {
      // Check if user exists in local storage
      const existingUsersStr = localStorage.getItem('chix9ja_users');
      const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : {};
      const user = existingUsers[email.toLowerCase()];

      if (user) {
        onLogin(email, user.name);
        setIsLoading(false);
      } else {
        // User not found logic
        setError('Account not registered on this device.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black relative flex flex-col items-center justify-center p-6 transition-colors duration-200 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 -left-10 w-72 h-72 bg-fuchsia-600/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 -right-10 w-80 h-80 bg-pink-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-tr from-fuchsia-600 to-pink-400 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(217,70,239,0.3)] -rotate-3">
            <span className="text-white font-black text-3xl italic tracking-tighter">Cx</span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Welcome <span className="text-fuchsia-500">Back</span></h2>
          <p className="mt-3 text-sm text-gray-400 font-medium">Sign in to access your chix9ja dashboard</p>
        </div>

        <form className="mt-8 space-y-6 bg-gray-900/40 p-8 rounded-[2rem] border border-white/5 backdrop-blur-xl shadow-2xl" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {error && (
              <div className="bg-red-900/20 text-red-400 text-xs font-bold p-4 rounded-xl text-center border border-red-800/50 animate-shake">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="text-[10px] font-black text-gray-500 uppercase ml-1 tracking-widest">Email Address</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icons.Mail className="h-5 w-5 text-fuchsia-500/50" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-2xl relative block w-full pl-12 px-4 py-4 border border-gray-800 placeholder-gray-600 text-white bg-black/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-all font-medium"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="text-[10px] font-black text-gray-500 uppercase ml-1 tracking-widest">4-Digit PIN</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icons.Lock className="h-5 w-5 text-fuchsia-500/50" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  required
                  className="appearance-none rounded-2xl relative block w-full pl-12 px-4 py-4 border border-gray-800 placeholder-gray-600 text-white bg-black/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-all font-black tracking-[1em] text-center"
                  placeholder="••••"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-[10px] font-black uppercase tracking-widest">
              <a href="#" className="text-gray-500 hover:text-fuchsia-400 transition-colors">
                Forgot your PIN?
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-5 px-4 border border-transparent text-sm font-black rounded-2xl text-white bg-gradient-to-r from-fuchsia-600 to-pink-500 hover:from-fuchsia-500 hover:to-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 shadow-[0_10px_20px_rgba(217,70,239,0.3)] transition-all disabled:opacity-70 uppercase tracking-widest active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Sign In</span>
                  <Icons.ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">
                New to chix9ja?{' '}
                <button onClick={onSwitchToRegister} className="text-fuchsia-500 hover:text-fuchsia-400 transition-colors ml-1">
                    Register here
                </button>
            </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
