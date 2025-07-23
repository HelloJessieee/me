import React from 'react';
import { useSceneStore } from '../store/useSceneStore';

const GIRL = { x: 400, y: 260, r: 32 };

const Scene3Lost: React.FC = () => {
  const nextScene = useSceneStore((s: { nextScene: () => void }) => s.nextScene);

  return (
    <div style={{ height: '100vh', background: 'linear-gradient(to bottom, #e0e0e0 0%, #bdbdbd 100%)', filter: 'grayscale(0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive', color: '#616161', letterSpacing: 2, fontWeight: 700 }}>Scene 3: Lost</h2>
      <div style={{fontSize:20, color:'#616161', marginBottom:8, fontFamily:'Comic Sans MS, Comic Sans, cursive', fontWeight:500, textShadow:'0 2px 8px #fff'}}>
        In the crowd, the little girl lowers her head. The world is gray, and her voice is lost among so many others.
      </div>
      <svg width={800} height={400} style={{ background: '#f5f5f5', borderRadius: 20, border: '2px solid #bdbdbd', boxShadow: '0 8px 32px #bdbdbd66' }}>
        {/* Gray crowd */}
        {Array.from({ length: 18 }).map((_, i) => {
          const x = 80 + (i % 6) * 120 + (i === 8 ? 0 : Math.random() * 10);
          const y = 80 + Math.floor(i / 6) * 100 + (i === 8 ? 0 : Math.random() * 10);
          if (i === 8) return null;
          return (
            <g key={i}>
              {/* body */}
              <ellipse cx={x} cy={y+28} rx={16} ry={26} fill="#cfd8dc" />
              {/* head */}
              <circle cx={x} cy={y} r={28} fill="#b0b0b0" stroke="#888" strokeWidth={2} />
            </g>
          );
        })}
        {/* The girl */}
        <g>
          {/* body */}
          <ellipse cx={GIRL.x} cy={GIRL.y+36} rx={18} ry={32} fill="#f8bbd0" />
          {/* head */}
          <circle
            cx={GIRL.x}
            cy={GIRL.y}
            r={GIRL.r}
            fill="#fff9c4"
            stroke="#ad1457"
            strokeWidth={3}
            style={{ cursor: 'pointer' }}
          />
          {/* hair */}
          <ellipse cx={GIRL.x-12} cy={GIRL.y-8} rx={12} ry={16} fill="#a1887f" />
          <ellipse cx={GIRL.x+12} cy={GIRL.y-8} rx={12} ry={16} fill="#a1887f" />
          {/* arms */}
          <ellipse cx={GIRL.x-18} cy={GIRL.y+18} rx={7} ry={10} fill="#fff9c4" />
          <ellipse cx={GIRL.x+18} cy={GIRL.y+18} rx={7} ry={10} fill="#fff9c4" />
          {/* legs */}
          <ellipse cx={GIRL.x-8} cy={GIRL.y+60} rx={7} ry={10} fill="#f8bbd0" />
          <ellipse cx={GIRL.x+8} cy={GIRL.y+60} rx={7} ry={10} fill="#f8bbd0" />
        </g>
      </svg>
      <p style={{ marginTop: 24, color: '#666', fontSize: 18, fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
        Sometimes, no matter how hard you try, you just feel invisible.
      </p>
      <button style={{ background: 'linear-gradient(90deg,#bdbdbd,#ffe082)', color: '#333', border: 'none', borderRadius: 8, padding: '8px 32px', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px #bdbdbd66', cursor: 'pointer', marginTop: 16 }} onClick={nextScene}>Next Scene</button>
    </div>
  );
};

export default Scene3Lost; 