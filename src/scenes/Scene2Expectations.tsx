import React, { useState } from 'react';
import { useSceneStore } from '../store/useSceneStore';

const FLOAT_WORDS = [
  { label: 'Parents', color: '#1976d2', x: 120, y: 180 },
  { label: 'Teacher', color: '#388e3c', x: 320, y: 120 },
  { label: 'Billboard', color: '#fbc02d', x: 600, y: 200 },
];
const WORDS = [
  'Be perfect', 'Make us proud', 'Don\'t disappoint', 'Follow the rules', 'Be a role model', 'Never fail', 'Always try harder',
  'Be obedient', 'Get high scores', 'Be successful', 'Be sensible', 'Be excellent', 'Be disciplined', 'Fit in',
];

const Scene2Expectations: React.FC = () => {
  const nextScene = useSceneStore((s: { nextScene: () => void }) => s.nextScene);
  const [floatWords, setFloatWords] = useState<any[]>([]);
  const [coverCount, setCoverCount] = useState(0);

  const handleClick = (idx: number) => {
    setFloatWords((prev) => [
      ...prev,
      {
        text: WORDS[coverCount % WORDS.length],
        x: Math.random() * 600 + 80,
        y: Math.random() * 250 + 80,
        color: FLOAT_WORDS[idx].color,
        key: Date.now() + Math.random(),
        animate: true,
      },
    ]);
    setCoverCount((c) => c + 1);
  };

  return (
    <div style={{ height: '100vh', background: 'linear-gradient(120deg, #e3f2fd 0%, #f5f5f5 100%)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* 背景教室/写字楼轮廓 */}
      <svg width={800} height={400} style={{ position: 'absolute', left: '50%', top: 90, transform: 'translateX(-50%)', zIndex: 0, opacity: 0.13 }}>
        <rect x={40} y={180} width={180} height={120} rx={18} fill="#90caf9" />
        <rect x={260} y={140} width={120} height={160} rx={18} fill="#bdbdbd" />
        <rect x={420} y={200} width={100} height={100} rx={18} fill="#ffe082" />
        <rect x={560} y={160} width={160} height={140} rx={18} fill="#aed581" />
      </svg>
      <h2 style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive', color: '#1976d2', letterSpacing: 2, fontWeight: 700, zIndex: 2 }}>Scene 2: Web of Expectations</h2>
      <div style={{fontSize:20, color:'#1976d2', marginBottom:8, fontFamily:'Comic Sans MS, Comic Sans, cursive', fontWeight:500, textShadow:'0 2px 8px #fff', zIndex:2}}>
        As she grows, voices of expectation surround her—parents, teachers, society—all hoping she’ll become someone great.
      </div>
      <div style={{ position: 'relative', width: 800, height: 400, background: 'rgba(255,255,255,0.85)', border: '2px solid #bdbdbd', borderRadius: 20, boxShadow: '0 8px 32px #bdbdbd33', zIndex: 2 }}>
        {FLOAT_WORDS.map((item, idx) => (
          <div
            key={item.label}
            onClick={() => handleClick(idx)}
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              width: 90,
              height: 90,
              background: `linear-gradient(135deg, ${item.color} 60%, #fff 100%)`,
              color: '#fff',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              cursor: 'pointer',
              boxShadow: `0 4px 16px ${item.color}44, 0 1.5px 0 #fff inset`,
              zIndex: 2,
              userSelect: 'none',
              fontWeight: 700,
              border: `2.5px solid ${item.color}`,
              transition: 'box-shadow 0.2s',
            }}
          >
            {item.label}
          </div>
        ))}
        {floatWords.map((fw, i) => (
          <div
            key={fw.key}
            style={{
              position: 'absolute',
              left: fw.x,
              top: fw.y,
              color: fw.color,
              fontWeight: 700,
              fontSize: 30,
              opacity: 0.96,
              pointerEvents: 'none',
              textShadow: '0 2px 12px #fff, 0 0 2px #000',
              zIndex: 3,
              filter: 'drop-shadow(0 2px 8px #bdbdbd88)',
              animation: fw.animate ? 'popIn 0.5s cubic-bezier(.7,1.5,.5,1)' : undefined,
              transition: 'opacity 0.5s',
            }}
            onAnimationEnd={() => { fw.animate = false; }}
          >
            {fw.text}
          </div>
        ))}
        <style>{`
          @keyframes popIn {
            0% { transform: scale(0.7) translateY(30px); opacity: 0; }
            80% { transform: scale(1.1) translateY(-8px); opacity: 1; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
        `}</style>
      </div>
      <p style={{ marginTop: 24, color: '#1976d2', fontSize: 18, fontFamily: 'Comic Sans MS, Comic Sans, cursive', zIndex: 2 }}>
        Click the icons to see how expectations build up, layer by layer.
      </p>
      <button style={{ background: 'linear-gradient(90deg,#90caf9,#ffe082)', color: '#333', border: 'none', borderRadius: 8, padding: '8px 32px', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px #90caf966', cursor: 'pointer', marginTop: 16, zIndex: 2 }} onClick={nextScene}>Next Scene</button>
    </div>
  );
};

export default Scene2Expectations; 