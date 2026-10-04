import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  Search, 
  User, 
  Shield, 
  LogOut, 
  Menu, 
  X, 
  Compass, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { currentUser, role, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-800 to-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-700/20 group-hover:scale-105 transition-transform duration-300">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                Hotel<span className="text-brand-700">Verse</span>
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 inline" />
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold -mt-1">
                Microservices Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/hotels"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                isActive('/') || isActive('/hotels')
                  ? 'bg-brand-50 text-brand-800 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4 text-brand-700" />
              Explore Hotels
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                  isActive('/admin')
                    ? 'bg-amber-100 text-amber-900 font-extrabold shadow-sm'
                    : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
                }`}
              >
                <Shield className="w-4 h-4 text-amber-600" />
                Admin Panel
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-300 text-amber-950 rounded-md">
                  ADMIN
                </span>
              </Link>
            )}
          </nav>

          {/* User Auth Buttons / Dropdown */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-3 py-1.5 pl-2 pr-3 rounded-full border transition-all duration-200 ${
                    isAdmin 
                      ? 'border-amber-300 bg-amber-50/80 hover:bg-amber-100/80 shadow-sm' 
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs shadow-sm ${
                    isAdmin ? 'bg-amber-600 text-white' : 'bg-brand-700 text-white'
                  }`}>
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-800 leading-tight">
                      {currentUser.name || currentUser.email}
                    </span>
                    <span className={`block text-[10px] font-extrabold leading-tight ${
                      isAdmin ? 'text-amber-700' : 'text-brand-700'
                    }`}>
                      {role || 'USER'} {isAdmin ? '👑' : ''}
                    </span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 py-3 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                      
                      <div className="px-4 py-2 border-b border-slate-100 mb-2">
                        <p className="text-[11px] text-slate-400 font-medium">Signed in as</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{currentUser.email}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                          isAdmin ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-brand-100 text-brand-900'
                        }`}>
                          Role: {role || 'USER'}
                        </span>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-700 transition-colors"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        My Profile & History
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-amber-900 hover:bg-amber-50 transition-colors"
                        >
                          <Shield className="w-4 h-4 text-amber-600" />
                          Admin Dashboard
                        </Link>
                      )}

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:text-brand-800 hover:bg-slate-100 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-700 to-brand-800 hover:from-brand-800 hover:to-brand-900 shadow-md shadow-brand-700/20 hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <Link
            to="/hotels"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-50"
          >
            <Compass className="w-5 h-5 text-brand-700" />
            Explore Hotels
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                <User className="w-5 h-5 text-brand-700" />
                My Profile & History
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-amber-800 bg-amber-50"
                >
                  <Shield className="w-5 h-5 text-amber-600" />
                  Admin Dashboard
                </Link>
              )}

              <div className="border-t border-slate-100 pt-2">
                <div className="px-3 py-2 text-xs text-slate-500 font-medium">
                  Logged in as <span className="font-bold text-slate-800">{currentUser.email}</span> ({role})
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-sm font-bold border border-slate-200 text-slate-800"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-white bg-brand-700"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
