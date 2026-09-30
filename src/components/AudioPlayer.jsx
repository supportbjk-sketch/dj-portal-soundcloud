import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer({ track, isOpen, onClose }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!track) return;
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, track]);

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) audioRef.current.currentTime = time;
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 z-40">
      <audio ref={audioRef} src={track.fileUrl} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => setIsPlaying(false)} />

      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-4">
          <img src={track.coverUrl} alt={track.judul} className="w-16 h-16 rounded object-cover" />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white truncate">{track.judul}</h3>
            <p className="text-sm text-gray-400">{track.remixer}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">✕</button>
        </div>

        <div className="mb-3">
          <input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleProgressChange} className="w-full h-2 bg-gray-700 rounded cursor-pointer accent-primary" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button onClick={() => setIsPlaying(!isPlaying)} className="bg-primary hover:opacity-80 text-white p-3 rounded-full transition">
            {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
          </button>

          <div className="flex items-center gap-2 ml-4">
            {volume === 0 ? <VolumeX size={18} className="text-gray-400" /> : <Volume2 size={18} className="text-gray-400" />}
            <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} className="w-24 h-2 bg-gray-700 rounded cursor-pointer accent-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
