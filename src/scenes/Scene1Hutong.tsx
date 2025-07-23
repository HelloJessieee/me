import React, { useRef, useEffect, useState } from 'react';
import { useSceneStore } from '../store/useSceneStore';

const WALL_Y = 260;
const WALL_HEIGHT = 180;
const KITE = { x: 600, y: 120, w: 60, h: 40 };
const GIRL = { x: 200, y: 340, r: 30 };
const GRAFFITI_TYPES = ['flower', 'smile', 'star', 'childhood'];

const Scene1Hutong: React.FC = () => {
  const nextScene = useSceneStore((s: { nextScene: () => void }) => s.nextScene);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [graffiti, setGraffiti] = useState<{x:number,y:number,type:string}[]>([]);
  const [kiteFly, setKiteFly] = useState(false);
  const [showDream, setShowDream] = useState(false);
  const [hoverWall, setHoverWall] = useState(false);
  const [kiteClicked, setKiteClicked] = useState(false);

  // 绘制主场景
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // 渐变天空
    const sky = ctx.createLinearGradient(0, 0, 0, 500);
    sky.addColorStop(0, '#aeefff');
    sky.addColorStop(1, '#e0f7fa');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 800, 500);
    // 远处屋顶
    ctx.fillStyle = '#b0bec5';
    ctx.beginPath();
    ctx.moveTo(0, WALL_Y-40);
    ctx.lineTo(800, WALL_Y-30);
    ctx.lineTo(800, WALL_Y);
    ctx.lineTo(0, WALL_Y);
    ctx.closePath();
    ctx.fill();
    // 墙
    ctx.save();
    ctx.fillStyle = hoverWall ? '#f9eac0' : '#f5e6c8';
    ctx.fillRect(0, WALL_Y, 800, WALL_HEIGHT);
    ctx.strokeStyle = '#e0cfa9';
    for(let y=WALL_Y+20; y<WALL_Y+WALL_HEIGHT; y+=20) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(800, y); ctx.stroke();
    }
    ctx.restore();
    // 墙面初始淡淡线条
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = '#90caf9';
    ctx.beginPath();
    ctx.arc(120, WALL_Y+60, 30, 0, 2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(300, WALL_Y+100, 18, 0, 2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(500, WALL_Y+80); ctx.lineTo(540, WALL_Y+120);
    ctx.stroke();
    ctx.restore();
    // 墙面涂鸦
    graffiti.forEach(({x, y, type}) => {
      if(type==='flower') {
        // 花朵
        ctx.save();
        ctx.translate(x, y);
        for(let i=0;i<6;i++){
          ctx.rotate(Math.PI/3);
          ctx.beginPath();
          ctx.arc(0, 12, 7, 0, 2*Math.PI);
          ctx.fillStyle = '#ffb347';
          ctx.globalAlpha = 0.85;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, 2*Math.PI);
        ctx.fillStyle = '#fff176';
        ctx.globalAlpha = 1;
        ctx.fill();
        ctx.restore();
      } else if(type==='smile') {
        // 笑脸
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.arc(0, 0, 13, 0, 2*Math.PI);
        ctx.fillStyle = '#fff9c4';
        ctx.fill();
        ctx.strokeStyle = '#fbc02d';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(-5, -3, 2, 0, 2*Math.PI);
        ctx.arc(5, -3, 2, 0, 2*Math.PI);
        ctx.fillStyle = '#ad1457';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 3, 5, 0, Math.PI);
        ctx.strokeStyle = '#ad1457';
        ctx.stroke();
        ctx.restore();
      } else if(type==='star') {
        // 星星
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI/10);
        ctx.beginPath();
        for(let i=0;i<5;i++){
          ctx.lineTo(Math.cos((18+i*72)*Math.PI/180)*13, -Math.sin((18+i*72)*Math.PI/180)*13);
          ctx.lineTo(Math.cos((54+i*72)*Math.PI/180)*6, -Math.sin((54+i*72)*Math.PI/180)*6);
        }
        ctx.closePath();
        ctx.fillStyle = '#90caf9';
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.restore();
      } else if(type==='childhood') {
        // 英文单词
        ctx.save();
        ctx.font = 'bold 18px Comic Sans MS, Comic Sans, cursive';
        ctx.fillStyle = '#1976d2';
        ctx.globalAlpha = 0.85;
        ctx.fillText('childhood', x-30, y+7);
        ctx.restore();
      }
    });
    // Dream字样
    if(showDream) {
      ctx.save();
      ctx.font = 'bold 32px Comic Sans MS, Comic Sans, cursive';
      ctx.fillStyle = '#ffb347';
      ctx.globalAlpha = 0.92;
      ctx.fillText('Dream', 520, WALL_Y+60);
      ctx.restore();
    }
    // 地面
    ctx.fillStyle = '#ffe082';
    ctx.beginPath();
    ctx.moveTo(0, 440);
    ctx.bezierCurveTo(200, 470, 600, 470, 800, 440);
    ctx.lineTo(800, 500);
    ctx.lineTo(0, 500);
    ctx.closePath();
    ctx.fill();
    // 风筝
    ctx.save();
    ctx.translate(KITE.x, kiteFly ? KITE.y-60 : KITE.y);
    ctx.rotate(-0.2);
    ctx.fillStyle = '#ffb347';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(KITE.w, KITE.h/2);
    ctx.lineTo(0, KITE.h);
    ctx.lineTo(-KITE.w, KITE.h/2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#b8860b';
    ctx.stroke();
    // 风筝线
    ctx.beginPath();
    ctx.moveTo(0, KITE.h/2);
    ctx.bezierCurveTo(-40, 60, -120, 120, -300, 200);
    ctx.strokeStyle = '#bdbdbd';
    ctx.lineWidth = 2;
    ctx.stroke();
    // 彩带
    if(kiteFly) {
      ctx.strokeStyle = '#ffb347';
      ctx.beginPath();
      ctx.moveTo(0, KITE.h);
      ctx.lineTo(0, KITE.h+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-8, KITE.h+18);
      ctx.lineTo(8, KITE.h+24);
      ctx.stroke();
    }
    ctx.restore();
    // 小女孩身体
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(GIRL.x, GIRL.y+30, 18, 32, 0, 0, 2*Math.PI);
    ctx.fillStyle = '#f8bbd0';
    ctx.fill();
    // 头
    ctx.beginPath();
    ctx.arc(GIRL.x, GIRL.y, GIRL.r, 0, 2*Math.PI);
    ctx.fillStyle = '#fff9c4';
    ctx.fill();
    ctx.strokeStyle = '#ad1457';
    ctx.lineWidth = 2;
    ctx.stroke();
    // 头发
    ctx.beginPath();
    ctx.arc(GIRL.x-12, GIRL.y-8, 12, 0.5*Math.PI, 2*Math.PI);
    ctx.arc(GIRL.x+12, GIRL.y-8, 12, Math.PI, 1.5*Math.PI, true);
    ctx.fillStyle = '#a1887f';
    ctx.fill();
    // 手
    ctx.beginPath();
    ctx.arc(GIRL.x-18, GIRL.y+18, 7, 0, 2*Math.PI);
    ctx.arc(GIRL.x+18, GIRL.y+18, 7, 0, 2*Math.PI);
    ctx.fillStyle = '#fff9c4';
    ctx.fill();
    // 脚
    ctx.beginPath();
    ctx.arc(GIRL.x-8, GIRL.y+60, 7, 0, 2*Math.PI);
    ctx.arc(GIRL.x+8, GIRL.y+60, 7, 0, 2*Math.PI);
    ctx.fillStyle = '#f8bbd0';
    ctx.fill();
    ctx.restore();
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.cursor = 'url("https://cdn-icons-png.flaticon.com/128/3132/3132693.png") 8 24, pointer';
  }, []);

  // 只允许墙面画画
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // 点风筝
    if (!kiteClicked && x >= KITE.x-KITE.w && x <= KITE.x+KITE.w && y >= (kiteFly ? KITE.y-60 : KITE.y) && y <= (kiteFly ? KITE.y-60 : KITE.y)+KITE.h) {
      setKiteFly(true);
      setShowDream(true);
      setKiteClicked(true);
      return;
    }
    // 只允许墙面
    if (y >= WALL_Y && y <= WALL_Y + WALL_HEIGHT) {
      const type = GRAFFITI_TYPES[Math.floor(Math.random()*GRAFFITI_TYPES.length)];
      setGraffiti(g => [...g, {x, y, type}]);
    }
  };

  // 悬停高亮墙面
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    setHoverWall(y >= WALL_Y && y <= WALL_Y + WALL_HEIGHT);
  };
  const handleMouseLeave = () => setHoverWall(false);

  return (
    <div style={{ height: '100vh', background: 'linear-gradient(to bottom, #aeefff 0%, #e0f7fa 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive', color: '#1976d2', letterSpacing: 2, fontWeight: 700 }}>Scene 1: Hutong Childhood</h2>
      <div style={{fontSize:20, color:'#1976d2', marginBottom:8, fontFamily:'Comic Sans MS, Comic Sans, cursive', fontWeight:500, textShadow:'0 2px 8px #fff'}}>
        A little girl finds joy in drawing on the old hutong wall, her dreams taking flight with every doodle.
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        style={{ border: '3px solid #90caf9', background: 'transparent', marginBottom: 16, borderRadius: 18, boxShadow: '0 8px 32px #90caf966' }}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      <p style={{ color: hoverWall ? '#ffb347' : '#1976d2', fontSize: 18, fontFamily: 'Comic Sans MS, Comic Sans, cursive', fontWeight: hoverWall ? 700 : 400, transition: 'color 0.2s' }}>
        {hoverWall ? 'Click the wall to help her fill her world with childhood wonders.' : 'Draw on the wall to help the girl express her childhood dreams.'}
      </p>
      <button style={{ background: 'linear-gradient(90deg,#90caf9,#ffe082)', color: '#333', border: 'none', borderRadius: 8, padding: '8px 32px', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px #90caf966', cursor: 'pointer' }} onClick={nextScene}>Next Scene</button>
    </div>
  );
};

export default Scene1Hutong; 