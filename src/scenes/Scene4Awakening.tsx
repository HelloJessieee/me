import React, { useState } from 'react';
import { useSceneStore } from '../store/useSceneStore';

const GIRL = { x: 200, y: 300, r: 30 };
const OTHER = { x: 600, y: 300, r: 30 };

const Scene4Awakening: React.FC = () => {
  const nextScene = useSceneStore((s: { nextScene: () => void }) => s.nextScene);
  const [chalkGiven, setChalkGiven] = useState(false);
  const [fade, setFade] = useState(false);

  const handleClickOther = () => {
    setChalkGiven(true);
    setTimeout(() => {
      setFade(true);
      setTimeout(() => {
        nextScene();
      }, 800);
    }, 1200);
  };

  return (
    <div style={{ height: '100vh', background: 'linear-gradient(to bottom, #fffde7 0%, #ffe082 100%)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'filter 0.8s', filter: fade ? 'blur(8px) brightness(1.2)' : 'none' }}>
      <h2 style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive', color: '#ffb300', letterSpacing: 2, fontWeight: 700 }}>Scene 4: Awakening</h2>
      <div style={{fontSize:20, color:'#ffb300', marginBottom:8, fontFamily:'Comic Sans MS, Comic Sans, cursive', fontWeight:500, textShadow:'0 2px 8px #fff'}}>
        One day, she sees another child drawing freely on the wall. A spark of hope is passed to her—a piece of chalk, a chance to begin again.
      </div>
      <svg width={800} height={400} style={{ background: '#fffde7', borderRadius: 20, border: '2px solid #ffe082', boxShadow: '0 8px 32px #ffe08266' }}>
        {/* The girl */}
        <g>
          <ellipse cx={GIRL.x} cy={GIRL.y+36} rx={18} ry={32} fill="#f8bbd0" />
          <circle cx={GIRL.x} cy={GIRL.y} r={GIRL.r} fill="#fff9c4" stroke="#ad1457" strokeWidth={3} />
          <ellipse cx={GIRL.x-12} cy={GIRL.y-8} rx={12} ry={16} fill="#a1887f" />
          <ellipse cx={GIRL.x+12} cy={GIRL.y-8} rx={12} ry={16} fill="#a1887f" />
          <ellipse cx={GIRL.x-18} cy={GIRL.y+18} rx={7} ry={10} fill="#fff9c4" />
          <ellipse cx={GIRL.x+18} cy={GIRL.y+18} rx={7} ry={10} fill="#fff9c4" />
          <ellipse cx={GIRL.x-8} cy={GIRL.y+60} rx={7} ry={10} fill="#f8bbd0" />
          <ellipse cx={GIRL.x+8} cy={GIRL.y+60} rx={7} ry={10} fill="#f8bbd0" />
        </g>
        {/* The other child */}
        <g>
          <ellipse cx={OTHER.x} cy={OTHER.y+36} rx={18} ry={32} fill="#b3e5fc" />
          <circle cx={OTHER.x} cy={OTHER.y} r={OTHER.r} fill="#fff9c4" stroke="#1976d2" strokeWidth={3} style={{ cursor: chalkGiven ? 'default' : 'pointer' }} onClick={chalkGiven ? undefined : handleClickOther} />
          <ellipse cx={OTHER.x-12} cy={OTHER.y-8} rx={12} ry={16} fill="#1976d2" />
          <ellipse cx={OTHER.x+12} cy={OTHER.y-8} rx={12} ry={16} fill="#1976d2" />
          <ellipse cx={OTHER.x-18} cy={OTHER.y+18} rx={7} ry={10} fill="#fff9c4" />
          <ellipse cx={OTHER.x+18} cy={OTHER.y+18} rx={7} ry={10} fill="#fff9c4" />
          <ellipse cx={OTHER.x-8} cy={OTHER.y+60} rx={7} ry={10} fill="#b3e5fc" />
          <ellipse cx={OTHER.x+8} cy={OTHER.y+60} rx={7} ry={10} fill="#b3e5fc" />
        </g>
        {/* Chalk animation */}
        {chalkGiven && (
          <rect x={OTHER.x - 6} y={OTHER.y + 10} width={12} height={28} fill="#fff" stroke="#bdbdbd" strokeWidth={1} rx={4} style={{
            transform: `translate(${(GIRL.x - OTHER.x) * 0.7}px, ${(GIRL.y - OTHER.y) * 0.7}px)`,
            transition: 'transform 1.2s cubic-bezier(.7,1.5,.5,1)',
            filter: 'drop-shadow(0 2px 8px #ffe08288)'
          }} />
        )}
        {/* Drawing on the wall */}
        {chalkGiven && (
          <rect x={OTHER.x + 30} y={OTHER.y - 20} width={60} height={12} fill="#4caf50" rx={6} style={{ opacity: 0.7, transition: 'opacity 1.2s', filter: 'drop-shadow(0 2px 8px #4caf5088)' }} />
        )}
      </svg>
      <p style={{ marginTop: 24, color: '#ffb300', fontSize: 18, fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
        Click the other child to accept the chalk and rediscover your spark.
      </p>
    </div>
  );
};

export default Scene4Awakening; 