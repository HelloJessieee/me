import React from 'react';

export interface LyricLine {
  time: number; // 秒
  text: string;
  scene: number;
}

interface SubtitleProps {
  lyrics: LyricLine[];
  currentTime: number;
  sceneIndex: number;
}

const Subtitle: React.FC<SubtitleProps> = () => null;

export default Subtitle; 