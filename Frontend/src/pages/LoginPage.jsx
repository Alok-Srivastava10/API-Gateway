import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  Mail, 
  Lock, 
  User, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  KeyRound
} from 'lucide-react';

export const LoginPage = ({ defaultTab = 'login' }) => {
  const [tab, setTab] = useState(defaultTab); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [role, setRole] = useState('USER');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/hotels';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      navigate(redirectPath, { replace: true });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await register({ email, password, name, about, role });
    setLoading(false);
    if (res.success) {
      setTab('login');
    }
  };

  const setDemoCredentials = (type) => {
    if (type === 'admin') {
      setEmail('ayush@gmail.com');
      setPassword('password123');
    } else {
      setEmail('user@gmail.com');
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl w-full bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Col: Brand Art Banner */}
        <div className="relative bg-slate-900 text-white p-8 sm:p-12 flex flex-col justify-between overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
            alt="Luxury stay"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-slate-900/90 to-slate-950" />

          {/* Brand */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Hotel<span className="text-brand-400">Verse</span>
              </span>
            </div>
            <p className="text-xs text-brand-200 uppercase font-bold tracking-widest">
              JWT Microservices Security
            </p>
          </div>

          {/* Center Pitch */}
          <div className="relative z-10 space-y-4 my-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug">
              Access Curated Stays & Real Guest Reviews
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Sign in to rate hotels, track your travel history, and explore verified ratings across India.
            </p>
          </div>

          {/* Quick Demo Credentials helper */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-300 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" /> Quick Demo Credentials:
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => setDemoCredentials('admin')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-amber-400/20 text-amber-200 hover:bg-amber-400/30 border border-amber-400/30 transition-colors"
              >
                Fill Admin (ayush@gmail.com)
              </button>
              <button
                type="button"
                onClick={() => setDemoCredentials('user')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-sky-400/20 text-sky-200 hover:bg-sky-400/30 border border-sky-400/30 transition-colors"
              >
                Fill User (user@gmail.com)
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Forms */}
        <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
          
          {/* Tab Switcher */}
          <div className="flex p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setTab('login')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                tab === 'login'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setTab('register')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                tab === 'register'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form Header */}
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-slate-900">
              {tab === 'login' ? 'Welcome back' : 'Create an account'}
            </h3>
            <p className="text-xs text-slate-500">
              {tab === 'login'
                ? 'Enter your credentials to access your account'
                : 'Fill out the details below to join the community'}
            </p>
          </div>

          {/* Login Form */}
          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ayush@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-brand-700 hover:bg-brand-800 shadow-md shadow-brand-700/20 hover:shadow-lg disabled:opacity-50 transition-all mt-2"
              >
                {loading ? 'Signing In...' : 'Sign In'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ayush Shukla"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@gmail.com"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
                  >
                    <option value="USER">USER (Regular)</option>
                    <option value="ADMIN">ADMIN (Full Access)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Bio / About
                  </label>
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Traveler & foodie"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-700 hover:bg-brand-800 shadow-md shadow-brand-700/20 hover:shadow-lg disabled:opacity-50 transition-all mt-2"
              >
                {loading ? 'Registering...' : 'Create Account'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
