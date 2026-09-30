import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import TrackCard from '../components/TrackCard';
import AudioPlayer from '../components/AudioPlayer';
import { genres } from '../lib/mockData';
import { getTracks, isAuthenticated } from '../lib/auth';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [tracks, setTracks] = useState(getTracks());

  const years = [...new Set(tracks.map((t) => t.tahun))].sort((a, b) => b - a);

  const filteredTracks = useMemo(() => {
    return tracks.filter((track) => {
      const matchesSearch =
        track.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.remixer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.album.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre = !selectedGenre || track.genre === selectedGenre;
      const matchesYear = !selectedYear || track.tahun.toString() === selectedYear;
      return matchesSearch && matchesGenre && matchesYear;
    });
  }, [tracks, searchQuery, selectedGenre, selectedYear]);

  useEffect(() => {
    const refreshTracks = () => setTracks(getTracks());
    window.addEventListener('storage', refreshTracks);
    return () => window.removeEventListener('storage', refreshTracks);
  }, []);

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
    setPlayerOpen(true);
  };

  const handleDownload = (track) => {
    const a = document.createElement('a');
    a.href = track.fileUrl;
    a.download = `${track.judul} - ${track.remixer}.mp3`;
    a.click();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setSelectedYear('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-gray-900">
      <div className="bg-gradient-to-r from-secondary to-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🎵 Portal Musik DJ Terlengkap</h1>
          <p className="text-gray-200 text-lg">Temukan, dengarkan, dan download lagu-lagu terbaik dari DJ favorit Anda</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari judul, artis, atau album..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-6">
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 text-white hover:text-primary transition mb-4">
            <Filter size={20} /> Filter
          </button>

          {showFilters && (
            <div className="bg-gray-800 p-6 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-white font-semibold text-sm mb-2 block">Genre</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 focus:border-primary focus:outline-none"
                >
                  <option value="">Semua Genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-white font-semibold text-sm mb-2 block">Tahun</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 focus:border-primary focus:outline-none"
                >
                  <option value="">Semua Tahun</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button onClick={clearFilters} className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition">
                  Bersihkan Filter
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-gray-400 text-sm mb-6">Menampilkan {filteredTracks.length} dari {tracks.length} lagu</div>

        {filteredTracks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
            {filteredTracks.map((track) => (
              <TrackCard key={track.id} track={track} onPlay={handlePlayTrack} onDownload={handleDownload} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Tidak ada lagu yang ditemukan</p>
            <button onClick={clearFilters} className="text-primary hover:underline mt-4">
              Bersihkan pencarian
            </button>
          </div>
        )}
      </div>

      <AudioPlayer track={currentTrack} isOpen={playerOpen} onClose={() => setPlayerOpen(false)} />

      {!isAuthenticated() && (
        <div className="fixed bottom-24 right-4 bg-primary p-4 rounded-lg shadow-lg max-w-xs">
          <p className="text-white text-sm font-semibold mb-2">Mau download lagu favorit?</p>
          <p className="text-white text-xs mb-3">Login atau daftar untuk mendapatkan akses download penuh.</p>
          <div className="flex gap-2">
            <a href="/login" className="flex-1 bg-white text-primary px-3 py-1 rounded text-sm font-semibold text-center hover:opacity-90">
              Login
            </a>
            <a href="/register" className="flex-1 border border-white text-white px-3 py-1 rounded text-sm font-semibold text-center hover:bg-white hover:text-primary transition">
              Daftar
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
