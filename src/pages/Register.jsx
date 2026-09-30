import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initStorage, register } from '../lib/auth';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    namaLengkap: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  initStorage();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.username || !form.email || !form.password || !form.namaLengkap) {
      setError('Semua field wajib diisi');
      return;
    }

    const result = register(form);
    if (!result.success) {
      setError(result.error);
      return;
    }

    setSuccess(result.message);
    setTimeout(() => navigate('/login'), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 px-4 py-10">
      <div className="w-full max-w-lg bg-gray-900 rounded-xl shadow-2xl p-8 border border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Daftar Akun</h2>

        {error && <div className="bg-red-500/20 border border-red-500 text-red-300 px-3 py-2 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-500/20 border border-green-500 text-green-300 px-3 py-2 rounded mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Nama Lengkap</label>
            <input
              type="text"
              value={form.namaLengkap}
              onChange={(e) => setForm({ ...form, namaLengkap: e.target.value })}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Username</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Nomor HP</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-primary focus:outline-none"
            />
          </div>

          <button type="submit" className="w-full bg-primary hover:opacity-90 text-white font-semibold py-3 rounded transition">
            Daftar
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-400">
          Sudah punya akun?{' '}
          <a href="/login" className="text-primary font-semibold hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
}
