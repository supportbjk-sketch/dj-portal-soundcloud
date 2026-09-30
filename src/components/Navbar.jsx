import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, Menu, X, LogOut } from 'lucide-react';
import { getCurrentUser, logout, isAdmin } from '../lib/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <nav className="bg-secondary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <Music className="text-primary" size={28} />
            <span>DJ Portal</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white hover:text-primary transition">Home</Link>

            {user ? (
              <>
                <div className="flex items-center gap-4 border-l border-gray-600 pl-4">
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-semibold">{user.namaLengkap}</span>
                    <span className={`text-xs ${user.status === 'approved' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {user.status === 'approved' ? '✓ Approved' : '⏳ Pending'}
                    </span>
                  </div>

                  {isAdmin() && (
                    <Link to="/admin" className="bg-primary text-white px-3 py-2 rounded hover:opacity-90 transition text-sm">
                      Admin
                    </Link>
                  )}

                  {user.status === 'approved' && (
                    <Link to="/upload" className="bg-primary text-white px-3 py-2 rounded hover:opacity-90 transition text-sm">
                      Upload
                    </Link>
                  )}

                  <button onClick={handleLogout} className="text-white hover:text-primary transition flex items-center gap-2">
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-primary transition">Login</Link>
                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition">
                  Daftar
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-700 pt-4">
            <Link to="/" className="block text-white hover:text-primary transition py-2">Home</Link>
            {user ? (
              <>
                <div className="border-t border-gray-700 mt-4 pt-4">
                  <div className="text-white text-sm font-semibold mb-2">{user.namaLengkap}</div>
                  <span className={`text-xs ${user.status === 'approved' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {user.status === 'approved' ? '✓ Approved' : '⏳ Pending'}
                  </span>

                  {isAdmin() && (
                    <Link to="/admin" onClick={() => setMobileOpen(false)} className="block bg-primary text-white px-3 py-2 rounded hover:opacity-90 transition text-sm mt-2">
                      Admin Panel
                    </Link>
                  )}

                  {user.status === 'approved' && (
                    <Link to="/upload" onClick={() => setMobileOpen(false)} className="block bg-primary text-white px-3 py-2 rounded hover:opacity-90 transition text-sm mt-2">
                      Upload Lagu
                    </Link>
                  )}

                  <button onClick={handleLogout} className="block w-full text-left text-white hover:text-primary transition mt-2">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-white hover:text-primary transition py-2">Login</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="block bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition mt-2">
                  Daftar
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
