import React from 'react';
import Scene1Hutong from './scenes/Scene1Hutong';
import Scene2Expectations from './scenes/Scene2Expectations';
import Scene3Lost from './scenes/Scene3Lost';
import Scene4Awakening from './scenes/Scene4Awakening';
import Scene5Recreation from './scenes/Scene5Recreation';
import { useSceneStore } from './store/useSceneStore';
import './App.css';

function App() {
  const sceneIndex = useSceneStore((state) => state.sceneIndex);

  return (
    <div className="App">
      {sceneIndex === 0 && <Scene1Hutong />}
      {sceneIndex === 1 && <Scene2Expectations />}
      {sceneIndex === 2 && <Scene3Lost />}
      {sceneIndex === 3 && <Scene4Awakening />}
      {sceneIndex === 4 && <Scene5Recreation />}
    </div>
  );
}

export default App;
