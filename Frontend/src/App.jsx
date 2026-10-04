import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { HotelDetailPage } from './pages/HotelDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: '16px',
              background: '#0F172A',
              color: '#F8FAFC',
              fontSize: '13px',
              fontWeight: '600',
              padding: '12px 18px',
              boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.25)'
            }
          }}
        />

        {/* Global Navbar */}
        <Navbar />

        {/* Routes Viewport */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotels" element={<HomePage />} />
            <Route path="/hotels/:hotelId" element={<HotelDetailPage />} />
            
            <Route path="/login" element={<LoginPage defaultTab="login" />} />
            <Route path="/register" element={<LoginPage defaultTab="register" />} />

            {/* Protected User Profile Route */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Dashboard Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
