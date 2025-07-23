import React, { useRef, useState, useEffect } from 'react';
import Scene1Hutong from './scenes/Scene1Hutong';
import Scene2Expectations from './scenes/Scene2Expectations';
import Scene3Lost from './scenes/Scene3Lost';
import Scene4Awakening from './scenes/Scene4Awakening';
import Scene5Recreation from './scenes/Scene5Recreation';
import { useSceneStore } from './store/useSceneStore';
import MusicPlayer from './components/MusicPlayer';
import Subtitle from './components/Subtitle';
import { lyrics } from './lyrics';
import './App.css';

const AUDIO_URL = process.env.PUBLIC_URL + '/music.mp3';

function App() {
  const sceneIndex = useSceneStore((state: { sceneIndex: number }) => state.sceneIndex);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handler = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', handler);
    return () => audio.removeEventListener('timeupdate', handler);
  }, []);

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      <audio ref={audioRef} src={AUDIO_URL} autoPlay loop style={{ display: 'none' }} />
      <MusicPlayer />
      <Subtitle lyrics={lyrics} currentTime={currentTime} sceneIndex={sceneIndex} />
      {sceneIndex === 0 && <Scene1Hutong />}
      {sceneIndex === 1 && <Scene2Expectations />}
      {sceneIndex === 2 && <Scene3Lost />}
      {sceneIndex === 3 && <Scene4Awakening />}
      {sceneIndex === 4 && <Scene5Recreation />}
    </div>
  );
}

export default App;
