import React, { useEffect, useState } from 'react';
import { canUpload, getCurrentUser, getTracks, initStorage, isAuthenticated, saveTrack } from '../lib/auth';

export default function Upload() {
  const currentUser = getCurrentUser();
  const [form, setForm] = useState({
    judul: '',
    remixer: '',
    album: '',
    tahun: new Date().getFullYear(),
    genre: 'Disco Pop',
  });
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [userTracks, setUserTracks] = useState([]);

  useEffect(() => {
    initStorage();
    const tracks = getTracks().filter((track) => track.uploadedBy === currentUser?.username);
    setUserTracks(tracks);
  }, [currentUser]);

  if (!isAuthenticated() || !canUpload()) {
    return <div className="container mx-auto px-4 py-12 text-center text-gray-400">Anda tidak memiliki akses upload.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.judul || !form.remixer || !form.genre) {
      setError('Judul, remixer, dan genre wajib diisi.');
      return;
    }

    const newTrack = {
      id: Date.now(),
      judul: form.judul,
      remixer: form.remixer,
      album: form.album || 'Single',
      tahun: Number(form.tahun),
      genre: form.genre,
      uploadedBy: currentUser.username,
      fileUrl: audioFile ? URL.createObjectURL(audioFile) : 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
      coverUrl: coverFile ? URL.createObjectURL(coverFile) : 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      folderPath: `${form.remixer}/audio/${form.judul}.mp3`,
      createdAt: new Date().toISOString().split('T')[0],
      downloadCount: 0,
    };

    saveTrack(newTrack);
    setUserTracks((prev) => [newTrack, ...prev]);

    setSuccess('Lagu berhasil diupload dan otomatis dikelompokkan berdasarkan nama remixer.');
    setForm({ judul: '', remixer: '', album: '', tahun: new Date().getFullYear(), genre: 'Disco Pop' });
    setAudioFile(null);
    setCoverFile(null);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Upload Lagu Baru</h2>

          {error && <div className="bg-red-500/20 border border-red-500 text-red-300 px-3 py-2 rounded mb-4">{error}</div>}
          {success && <div className="bg-green-500/20 border border-green-500 text-green-300 px-3 py-2 rounded mb-4">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Judul</label>
              <input
                type="text"
                value={form.judul}
                onChange={(e) => setForm({ ...form, judul: e.target.value })}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Remixer</label>
              <input
                type="text"
                value={form.remixer}
                onChange={(e) => setForm({ ...form, remixer: e.target.value })}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Album</label>
              <input
                type="text"
                value={form.album}
                onChange={(e) => setForm({ ...form, album: e.target.value })}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Tahun</label>
                <input
                  type="number"
                  value={form.tahun}
                  onChange={(e) => setForm({ ...form, tahun: e.target.value })}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Genre</label>
                <select
                  value={form.genre}
                  onChange={(e) => setForm({ ...form, genre: e.target.value })}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-primary focus:outline-none"
                >
                  {['Disco Pop', 'Synthwave', 'Pop', 'Deep House', 'Techno', 'Drum & Bass', 'Trap', 'Hip Hop', 'Electronic'].map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">File Audio</label>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files[0])}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Cover</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files[0])}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-700 focus:border-primary focus:outline-none"
              />
            </div>

            <button type="submit" className="w-full bg-primary hover:opacity-90 text-white font-semibold py-3 rounded transition">
              Upload Lagu
            </button>
          </form>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-white mb-6">Lagu Saya</h3>

          {userTracks.length === 0 ? (
            <div className="text-gray-400">Belum ada lagu yang diupload.</div>
          ) : (
            <div className="space-y-4">
              {userTracks.map((track) => (
                <div key={track.id} className="bg-gray-800 rounded-lg p-4 flex gap-4">
                  <img src={track.coverUrl} alt={track.judul} className="w-20 h-20 rounded object-cover" />
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{track.judul}</h4>
                    <p className="text-gray-400 text-sm">{track.remixer} • {track.genre}</p>
                    <p className="text-gray-500 text-xs mt-1">Folder: {track.folderPath}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
