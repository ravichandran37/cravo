import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Return to website */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5a4138] hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Restaurant Storefront</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-10 px-6 sm:px-10 rounded-3xl border border-[#e8e4dc] shadow-warm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#ffefe9] text-primary flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="font-display font-bold text-2xl text-[#111c2d]">
              Cravo Staff & Admin Login
            </h2>
            <p className="text-xs text-[#8e7166] mt-1">
              Sign in with your administrator credentials to access dashboard, products, and incoming orders.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#5a4138] mb-1">
                Email or Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e7166]" />
                <input
                  type="text"
                  required
                  placeholder="Enter your username or email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a4138] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e7166]" />
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-primary hover:bg-primary-hover disabled:bg-gray-300 text-white font-bold text-xs rounded-xl shadow-warm transition-all active:scale-95"
              >
                {loading ? 'Authenticating...' : 'Sign In to Admin Dashboard'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
