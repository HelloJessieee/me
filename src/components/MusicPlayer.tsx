import React, { useRef, useEffect, useState } from 'react';

const AUDIO_URL = process.env.PUBLIC_URL + '/music.mp3';

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const [userInteracted, setUserInteracted] = useState(false);

  // 自动播放策略：首次交互后尝试播放
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    if (playing && userInteracted) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [playing, volume, userInteracted]);

  // 监听全局点击，首次交互后自动播放
  useEffect(() => {
    const handler = () => setUserInteracted(true);
    window.addEventListener('pointerdown', handler, { once: true });
    return () => window.removeEventListener('pointerdown', handler);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 100, display: 'flex', alignItems: 'center', gap: 16 }}>
      <audio ref={audioRef} src={AUDIO_URL} loop autoPlay style={{ display: 'none' }} />
      <button
        onClick={() => { setPlaying(p => !p); setUserInteracted(true); }}
        style={{
          background: playing ? '#1976d2' : '#90caf9',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '8px 18px',
          fontWeight: 700,
          fontSize: 18,
          boxShadow: '0 2px 8px #90caf966',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {playing ? <span style={{fontSize:20}}>⏸️</span> : <span style={{fontSize:20}}>▶️</span>}
        {playing ? 'Pause' : 'Play'}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={e => { setVolume(Number(e.target.value)); setUserInteracted(true); }}
        style={{ verticalAlign: 'middle', width: 160 }}
      />
    </div>
  );
};

export default MusicPlayer; 