import React, { useRef, useState } from 'react';
import { useSceneStore } from '../store/useSceneStore';

const CANVAS_W = 800;
const CANVAS_H = 400;
const COLORS = ['#f06292', '#4caf50', '#1976d2', '#ffb300', '#8d6e63', '#ab47bc'];
const SHAPES = ['circle', 'flower', 'text'];
const WORDS = ['Freedom', 'Dream', 'Create', 'Childhood', 'Fly', 'Hope'];

function randomInt(a: number, b: number) {
  return Math.floor(Math.random() * (b - a)) + a;
}

const Scene5Recreation: React.FC = () => {
  const setSceneIndex = useSceneStore((s: { setSceneIndex: (idx: number) => void }) => s.setSceneIndex);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shapes, setShapes] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [animateIdx, setAnimateIdx] = useState<number|null>(null);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const shapeType = SHAPES[randomInt(0, SHAPES.length)];
    const color = COLORS[randomInt(0, COLORS.length)];
    let shape: { type: string; x: number; y: number; r?: number; color: string; text?: string };
    if (shapeType === 'circle') {
      shape = { type: 'circle', x, y, r: randomInt(18, 38), color };
    } else if (shapeType === 'flower') {
      shape = { type: 'flower', x, y, color };
    } else {
      shape = { type: 'text', x, y, text: WORDS[randomInt(0, WORDS.length)], color };
    }
    setShapes((prev) => [...prev, shape]);
    setCount((c) => c + 1);
    setAnimateIdx(shapes.length);
    setTimeout(() => setAnimateIdx(null), 600);
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-creation.png';
    a.click();
  };

  // 绘制所有元素
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // 渐变背景
    const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    grad.addColorStop(0, '#fffde7');
    grad.addColorStop(1, '#ffe082');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    shapes.forEach((s, i) => {
      const shadow = 'rgba(0,0,0,0.13)';
      if (s.type === 'circle') {
        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = s.color;
        ctx.shadowColor = shadow;
        ctx.shadowBlur = animateIdx === i ? 32 : 12;
        ctx.fill();
        ctx.restore();
      } else if (s.type === 'flower') {
        ctx.save();
        ctx.globalAlpha = 0.85;
        for (let j = 0; j < 6; j++) {
          ctx.beginPath();
          ctx.arc(s.x + Math.cos((j * Math.PI) / 3) * 22, s.y + Math.sin((j * Math.PI) / 3) * 22, 12, 0, 2 * Math.PI);
          ctx.fillStyle = s.color;
          ctx.shadowColor = shadow;
          ctx.shadowBlur = animateIdx === i ? 32 : 8;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = '#fffde7';
        ctx.shadowBlur = 0;
        ctx.fill();
        ctx.restore();
      } else if (s.type === 'text') {
        ctx.save();
        ctx.font = 'bold 32px "Smiley Sans", "微软雅黑", sans-serif';
        ctx.fillStyle = s.color;
        ctx.shadowColor = shadow;
        ctx.shadowBlur = animateIdx === i ? 32 : 8;
        ctx.globalAlpha = 0.95;
        ctx.fillText(s.text, s.x, s.y);
        ctx.restore();
      }
    });
  }, [shapes, animateIdx]);

  return (
    <div style={{ height: '100vh', background: 'linear-gradient(to bottom, #fffde7 0%, #ffe082 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive', color: '#ab47bc', letterSpacing: 2, fontWeight: 700 }}>Scene 5: Rediscovering Self</h2>
      <div style={{fontSize:20, color:'#ab47bc', marginBottom:8, fontFamily:'Comic Sans MS, Comic Sans, cursive', fontWeight:500, textShadow:'0 2px 8px #fff'}}>
        With chalk in hand, she lets her imagination run wild. The wall becomes a canvas for her true self.
      </div>
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        style={{ border: '3px solid #ffe082', background: 'transparent', borderRadius: 20, marginBottom: 16, boxShadow: '0 8px 32px #ffe08266', cursor: 'crosshair', transition: 'box-shadow 0.2s' }}
        onClick={handleCanvasClick}
      />
      <div style={{ marginBottom: 12, color: '#ab47bc', fontSize: 18, fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>You helped her create <b>{count}</b> dreams. Thank you for bringing her colors back.</div>
      <button onClick={handleExport} style={{ background: 'linear-gradient(90deg,#ab47bc,#ffe082)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 32px', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px #ab47bc66', cursor: 'pointer', marginRight: 16 }}>Export PNG</button>
      <button onClick={() => setSceneIndex(0)} style={{ background: 'linear-gradient(90deg,#90caf9,#ab47bc)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 32px', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px #ab47bc66', cursor: 'pointer' }}>Back to Start</button>
    </div>
  );
};

export default Scene5Recreation; 