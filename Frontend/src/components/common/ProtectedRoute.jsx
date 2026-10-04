import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowLeft, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, role, loading, logout } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-700 border-t-transparent"></div>
      </div>
    );
  }

  // Not logged in -> redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Requires admin but user is not admin
  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-xl space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>
          
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900">Access Denied (403)</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Your account currently has the <span className="font-bold text-slate-800 uppercase">{role || 'USER'}</span> role. The Admin Dashboard is strictly restricted to accounts with the <span className="font-bold text-amber-600 uppercase">ADMIN</span> role.
            </p>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/hotels"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Hotels
            </Link>
            <Link
              to="/login"
              onClick={logout}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-700 hover:bg-brand-800 transition-all shadow-md"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign in as Admin
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
};
