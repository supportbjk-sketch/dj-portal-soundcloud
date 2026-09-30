import React from 'react';
import { Download, Play, Lock } from 'lucide-react';
import { canDownload } from '../lib/auth';

export default function TrackCard({ track, onPlay, onDownload }) {
  const canDl = canDownload();

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-primary/50 transition duration-300 group cursor-pointer">
      <div className="relative overflow-hidden h-48 bg-gray-800">
        <img src={track.coverUrl} alt={track.judul} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button onClick={() => onPlay(track)} className="bg-primary rounded-full p-4 hover:scale-110 transition">
            <Play size={24} fill="white" />
          </button>
        </div>

        {!canDl && (
          <div className="absolute top-2 right-2 bg-gray-800 bg-opacity-80 px-2 py-1 rounded flex items-center gap-1 text-xs text-gray-300">
            <Lock size={12} /> Login
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-white truncate hover:text-primary">{track.judul}</h3>
        <p className="text-sm text-gray-400 truncate">{track.remixer} • {track.tahun}</p>
        <p className="text-xs text-gray-500 mt-1 inline-block bg-gray-800 px-2 py-1 rounded">{track.genre}</p>
        <div className="text-xs text-gray-500 mt-2">📥 {track.downloadCount} downloads</div>

        <div className="flex gap-2 mt-3">
          <button onClick={() => onPlay(track)} className="flex-1 bg-primary hover:opacity-80 text-white py-2 rounded text-sm font-semibold flex items-center justify-center gap-2 transition">
            <Play size={14} fill="white" /> Play
          </button>

          {canDl ? (
            <button onClick={() => onDownload(track)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded text-sm font-semibold flex items-center justify-center gap-2 transition">
              <Download size={14} /> Download
            </button>
          ) : (
            <button disabled title="Login untuk download" className="flex-1 bg-gray-800 text-gray-500 py-2 rounded text-sm font-semibold flex items-center justify-center gap-2 cursor-not-allowed opacity-50">
              <Lock size={14} /> Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
