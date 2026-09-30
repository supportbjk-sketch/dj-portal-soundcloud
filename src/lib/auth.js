import { mockUsers, mockTracks } from './mockData';

const AUTH_KEY = 'djportal_auth';
const USERS_KEY = 'djportal_users';
const TRACKS_KEY = 'djportal_tracks';

export const initStorage = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
  }

  if (!localStorage.getItem(TRACKS_KEY)) {
    localStorage.setItem(TRACKS_KEY, JSON.stringify(mockTracks));
  }
};

export const login = (username, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return { success: false, error: 'Username atau password salah' };
  }

  const authData = {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
      namaLengkap: user.namaLengkap,
    },
    token: 'mock_token_' + user.id + '_' + Date.now(),
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
  return { success: true, user: authData.user };
};

export const register = (data) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

  if (users.find((u) => u.username === data.username || u.email === data.email)) {
    return { success: false, error: 'Username atau email sudah terdaftar' };
  }

  const newUser = {
    id: Math.max(...users.map((u) => u.id), 0) + 1,
    username: data.username,
    email: data.email,
    password: data.password,
    namaLengkap: data.namaLengkap,
    phone: data.phone || '',
    role: 'user',
    status: 'pending',
    createdAt: new Date().toISOString().split('T')[0],
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return {
    success: true,
    message: 'Pendaftaran berhasil! Tunggu persetujuan admin.',
    user: newUser,
  };
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const getCurrentUser = () => {
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return null;
  return JSON.parse(authData).user;
};

export const isAuthenticated = () => !!localStorage.getItem(AUTH_KEY);

export const canDownload = () => {
  const user = getCurrentUser();
  return !!user && user.status === 'approved';
};

export const canUpload = () => {
  const user = getCurrentUser();
  return !!user && user.status === 'approved';
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return !!user && user.role === 'admin';
};

export const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

export const updateUserStatus = (userId, status) => {
  const users = getUsers();
  const updated = users.map((user) => (user.id === userId ? { ...user, status } : user));
  localStorage.setItem(USERS_KEY, JSON.stringify(updated));
  return updated;
};

export const getTracks = () => JSON.parse(localStorage.getItem(TRACKS_KEY) || '[]');

export const saveTrack = (track) => {
  const tracks = getTracks();
  tracks.unshift(track);
  localStorage.setItem(TRACKS_KEY, JSON.stringify(tracks));
  window.dispatchEvent(new Event('storage'));
  return tracks;
};
