import React from 'react';
import { Building2, Heart, ShieldCheck, Database, Layers, Sparkles, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Footer = () => {
  const { isAdmin, isAuthenticated } = useAuth();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Hotel<span className="text-brand-400">Verse</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              An enterprise-grade hotel rating and review platform connecting guests with world-class hospitality experiences.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 bg-brand-950/60 px-3 py-1.5 rounded-full border border-brand-800/50 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              Microservices Powered
            </div>
          </div>

          {/* Architecture Badges */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Architecture</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Spring Security 7 + JWT
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Layers className="w-4 h-4 text-brand-400" />
                Spring Cloud Gateway (8084)
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Database className="w-4 h-4 text-sky-400" />
                MySQL + MongoDB Polyglot
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Resilience4j Circuit Breaker
              </li>
            </ul>
          </div>

          {/* Microservices Ports */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Microservices Grid</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/50">
                <span className="block text-slate-400 font-medium">Gateway</span>
                <span className="font-mono text-brand-300 font-bold">:8084</span>
              </div>
              <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/50">
                <span className="block text-slate-400 font-medium">AuthService</span>
                <span className="font-mono text-emerald-300 font-bold">:8086</span>
              </div>
              <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/50">
                <span className="block text-slate-400 font-medium">UserService</span>
                <span className="font-mono text-sky-300 font-bold">:8081</span>
              </div>
              <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/50">
                <span className="block text-slate-400 font-medium">HotelService</span>
                <span className="font-mono text-amber-300 font-bold">:8082</span>
              </div>
              <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/50">
                <span className="block text-slate-400 font-medium">RatingService</span>
                <span className="font-mono text-rose-300 font-bold">:8083</span>
              </div>
              <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/50">
                <span className="block text-slate-400 font-medium">Eureka</span>
                <span className="font-mono text-purple-300 font-bold">:8761</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/hotels" className="text-slate-400 hover:text-white transition-colors">
                  Explore Hotels
                </Link>
              </li>
              {!isAuthenticated && (
                <li>
                  <Link to="/login" className="text-slate-400 hover:text-white transition-colors">
                    Sign In / Register
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <Link to="/profile" className="text-slate-400 hover:text-white transition-colors">
                    My Profile & Reviews
                  </Link>
                </li>
              )}
              {/* Only visible to authenticated ADMIN */}
              {isAdmin && (
                <li>
                  <Link to="/admin" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    Admin Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HotelVerse Microservices. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for enterprise cloud scalability.
          </p>
        </div>
      </div>
    </footer>
  );
};
