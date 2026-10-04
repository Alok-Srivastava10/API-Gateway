import React, { useState, useEffect } from 'react';
import { hotelService } from '../services/hotelService';
import { userService } from '../services/userService';
import { ratingService } from '../services/ratingService';
import { AddHotelModal } from '../components/admin/AddHotelModal';
import { ConfirmDialog } from '../components/admin/ConfirmDialog';
import { TableSkeleton } from '../components/common/LoadingSkeleton';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  Shield, 
  Building, 
  Users, 
  Star, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Server, 
  MapPin,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('hotels'); // 'hotels' or 'users'
  const [hotels, setHotels] = useState([]);
  const [users, setUsers] = useState([]);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [addHotelModalOpen, setAddHotelModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'hotel' | 'user', id, name }
  const [deleting, setDeleting] = useState(false);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [hotelsData, usersData, ratingsData] = await Promise.all([
        hotelService.getHotels(),
        userService.getAllUsers(),
        ratingService.getRatings()
      ]);
      setHotels(hotelsData || []);
      setUsers(usersData || []);
      setRatingsCount(Array.isArray(ratingsData) ? ratingsData.length : 12);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to sync data from microservices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      if (deleteTarget.type === 'hotel') {
        await hotelService.deleteHotel(deleteTarget.id);
        toast.success(`Hotel "${deleteTarget.name}" deleted successfully`);
      } else if (deleteTarget.type === 'user') {
        await userService.deleteUser(deleteTarget.id);
        toast.success(`User "${deleteTarget.name}" deleted successfully`);
      }
      setDeleteTarget(null);
      loadAdminData();
    } catch (error) {
      toast.error(`Failed to delete ${deleteTarget.type}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24">
      
      {/* Header & Stats Overview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Shield className="w-3.5 h-3.5" />
              Administrator Control Center
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Microservices Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage luxury hotel inventory, registered users, and live service statuses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAdminData}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
            <button
              onClick={() => setAddHotelModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-700 hover:bg-brand-800 shadow-md shadow-brand-700/20 hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Add New Hotel
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-extrabold text-slate-900">{hotels.length}</span>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Total Hotels</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-extrabold text-slate-900">{users.length}</span>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Users</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-extrabold text-slate-900">{ratingsCount}</span>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Total Reviews</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-extrabold text-emerald-700">Port 8084</span>
              </div>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Gateway Status</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabbed Management Table */}
      <section className="bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden">
        
        {/* Tab Headers */}
        <div className="flex border-b border-slate-100 px-6 pt-4 gap-4">
          <button
            onClick={() => setActiveTab('hotels')}
            className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'hotels'
                ? 'border-brand-700 text-brand-800'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            <Building className="w-4 h-4" />
            Manage Hotels ({hotels.length})
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'users'
                ? 'border-brand-700 text-brand-800'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            Manage Users ({users.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {loading ? (
            <TableSkeleton rows={4} />
          ) : activeTab === 'hotels' ? (
            /* HOTELS TABLE */
            hotels.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">Hotel</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4">Reviews</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {hotels.map((hotel) => (
                      <tr key={hotel.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80'}
                              alt={hotel.name}
                              className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-100"
                            />
                            <div>
                              <span className="block font-bold text-slate-900 line-clamp-1">{hotel.name}</span>
                              <span className="block text-xs text-slate-400 font-mono">ID: {hotel.id?.slice(0, 8)}...</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-600 font-medium">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-coral-500" />
                            {hotel.location}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
                            ⭐ {hotel.averageRating ? Number(hotel.averageRating).toFixed(1) : '0.0'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-500 font-medium">
                          {hotel.ratings?.length || 0} reviews
                        </td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <Link
                            to={`/hotels/${hotel.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View
                          </Link>
                          <button
                            onClick={() => setDeleteTarget({ type: 'hotel', id: hotel.id, name: hotel.name })}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Building className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-800">No Hotels in Database</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  All hotels have been deleted or none exist yet. Click the button below to add a new hotel.
                </p>
                <button
                  onClick={() => setAddHotelModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-700 hover:bg-brand-800 transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" /> Add First Hotel
                </button>
              </div>
            )
          ) : (
            /* USERS TABLE */
            users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">About</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {users.map((user) => (
                      <tr key={user.userID || user.email} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-700 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <span className="font-bold text-slate-900">{user.name || 'User'}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-600 font-medium">
                          {user.email}
                        </td>
                        <td className="py-4 px-4 text-slate-500 text-xs max-w-xs truncate">
                          {user.about || 'Traveler'}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            user.role === 'ADMIN' || user.email?.includes('admin')
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {user.role || (user.email?.includes('admin') ? 'ADMIN' : 'USER')}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => setDeleteTarget({ type: 'user', id: user.userID || user.email, name: user.name || user.email })}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-800">No Users in Database</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No users found in the system.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Add Hotel Modal */}
      <AddHotelModal
        isOpen={addHotelModalOpen}
        onClose={() => setAddHotelModalOpen(false)}
        onHotelCreated={loadAdminData}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${deleteTarget?.type === 'hotel' ? 'Hotel' : 'User'}`}
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action will remove the record from ${deleteTarget?.type === 'hotel' ? 'HotelService (MySQL)' : 'UserService (MySQL)'}.`}
        confirmText="Delete Record"
        loading={deleting}
      />
    </div>
  );
};
