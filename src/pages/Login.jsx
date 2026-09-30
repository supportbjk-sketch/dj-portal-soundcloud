import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initStorage, login } from '../lib/auth';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  initStorage();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form.username, form.password);

    if (!result.success) {
      setError(result.error);
      return;
    }

    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl p-8 border border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>

        {error && <div className="bg-red-500/20 border border-red-500 text-red-300 px-3 py-2 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Username</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-primary focus:outline-none"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-primary focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full bg-primary hover:opacity-90 text-white font-semibold py-3 rounded transition">
            Masuk
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-400">
          Belum punya akun?{' '}
          <a href="/register" className="text-primary font-semibold hover:underline">Daftar sekarang</a>
        </div>
      </div>
    </div>
  );
}
