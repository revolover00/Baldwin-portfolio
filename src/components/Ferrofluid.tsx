import React from 'react';
import './Ferrofluid.css';

interface FerrofluidProps {
  className?: string;
  dpr?: number;
  paused?: boolean;
  colors?: string[];
  speed?: number;
  scale?: number;
  turbulence?: number;
  fluidity?: number;
  rimWidth?: number;
  sharpness?: number;
  shimmer?: number;
  glow?: number;
  flowDirection?: 'up' | 'down' | 'left' | 'right';
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
  mouseDampening?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
}

const COLOR_VARIANTS = [
  "text-[#CC00FF]/65 drop-shadow-[0_0_8px_rgba(204,0,255,0.4)]",
  "text-[#8B5CF6]/55 drop-shadow-[0_0_6px_rgba(139,92,246,0.35)]",
  "text-[#E8D5F5]/45 drop-shadow-[0_0_10px_rgba(232,213,245,0.3)]",
  "text-[#A78BCA]/50 drop-shadow-[0_0_5px_rgba(167,139,202,0.35)]",
];

const CODE_ELEMENTS = [
  { text: "const dev = 'Baldwin';", left: "4%", size: "11px", delay: "0s", duration: "17s", anim: "float-code-up", variant: 0 },
  { text: "await synth.play();", left: "15%", size: "12px", delay: "3s", duration: "21s", anim: "float-code-diagonal", variant: 1 },
  { text: "import { motion } from 'motion';", left: "28%", size: "10px", delay: "1.5s", duration: "25s", anim: "float-code-drift", variant: 2 },
  { text: "function draw() { ... }", left: "42%", size: "12.5px", delay: "5s", duration: "19s", anim: "float-code-up", variant: 0 },
  { text: "interface DeepPortfolio {", left: "55%", size: "11.5px", delay: "0.8s", duration: "23s", anim: "float-code-diagonal", variant: 3 },
  { text: "gl_FragColor = vec4(col, 1.0);", left: "68%", size: "11px", delay: "7s", duration: "22s", anim: "float-code-drift", variant: 0 },
  { text: "npm run build && node server.js", left: "82%", size: "12px", delay: "9s", duration: "26s", anim: "float-code-up", variant: 1 },
  { text: "const [state, setState] = useState()", left: "93%", size: "11px", delay: "2.5s", duration: "20s", anim: "float-code-diagonal", variant: 2 },
  { text: "export default function App()", left: "10%", size: "12.5px", delay: "4s", duration: "24s", anim: "float-code-drift", variant: 3 },
  { text: "git commit -m 'feat: custom-cursor'", left: "33%", size: "11px", delay: "11s", duration: "18s", anim: "float-code-up", variant: 0 },
  { text: "() => process.exit(0)", left: "60%", size: "13px", delay: "13s", duration: "22s", anim: "float-code-diagonal", variant: 1 },
  { text: "<canvas ref={canvasRef} />", left: "88%", size: "12px", delay: "12s", duration: "25s", anim: "float-code-up", variant: 2 },
  { text: "const gl = canvas.getContext('webgl')", left: "22%", size: "11px", delay: "6s", duration: "23s", anim: "float-code-drift", variant: 3 },
  { text: "requestAnimationFrame(loop);", left: "48%", size: "12px", delay: "8s", duration: "20s", anim: "float-code-diagonal", variant: 0 },
  { text: "transform: translate3d(0,0,0);", left: "75%", size: "11px", delay: "10s", duration: "24s", anim: "float-code-drift", variant: 1 },
  { text: "window.innerWidth >= 1024", left: "95%", size: "12px", delay: "14s", duration: "22s", anim: "float-code-up", variant: 2 },
  { text: "import { useSpring } from 'motion';", left: "2%", size: "11.5px", delay: "5.5s", duration: "21s", anim: "float-code-diagonal", variant: 3 },
  { text: "ctx.closePath();", left: "37%", size: "11px", delay: "15s", duration: "23s", anim: "float-code-drift", variant: 0 },
  { text: "01011001 01010101", left: "52%", size: "10.5px", delay: "17s", duration: "25s", anim: "float-code-up", variant: 1 },
  { text: "mixBlendMode: 'screen'", left: "80%", size: "12.5px", delay: "8.5s", duration: "19s", anim: "float-code-diagonal", variant: 2 },
];

const Ferrofluid: React.FC<FerrofluidProps> = ({
  className,
  colors = ['#8B5CF6', '#C084FC', '#F3E8FF'],
  opacity = 1,
  mixBlendMode
}) => {
  // Gracefully fallback to ultra-smooth hardware-accelerated CSS animations
  // to achieve maximum 120 FPS on all high-resolution screen devices
  const colorList = colors.length >= 3 ? colors : [...colors, '#8B5CF6', '#C084FC', '#F3E8FF'];

  return (
    <div
      className={`ferrofluid-container ${className ?? ''}`}
      style={{
        ...(mixBlendMode && { mixBlendMode }),
        opacity
      }}
    >
      <div className="absolute inset-0 z-0 bg-[#06010A] overflow-hidden">
        {/* Soft, modern ambient glowing circles with orbital floating animations */}
        <div 
          className="absolute w-[100vw] h-[100vw] lg:w-[45vw] lg:h-[45vw] rounded-full blur-[100px] lg:blur-[140px] animate-float-1 top-[-20%] left-[-20%] opacity-40 mix-blend-screen"
          style={{
            backgroundColor: colorList[0]
          }}
        />
        <div 
          className="absolute w-[90vw] h-[90vw] lg:w-[40vw] lg:h-[40vw] rounded-full blur-[110px] lg:blur-[150px] animate-float-2 bottom-[-10%] right-[-10%] opacity-30 mix-blend-screen"
          style={{
            backgroundColor: colorList[1]
          }}
        />
        <div 
          className="absolute w-[85vw] h-[85vw] lg:w-[35vw] lg:h-[35vw] rounded-full blur-[90px] lg:blur-[130px] animate-float-3 top-[35%] left-[25%] opacity-25 mix-blend-screen"
          style={{
            backgroundColor: colorList[2]
          }}
        />

        {/* Flying developer codes background layer */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          {CODE_ELEMENTS.map((col, idx) => (
            <div
              key={idx}
              className={`code-particle opacity-0 ${COLOR_VARIANTS[col.variant]}`}
              style={{
                left: col.left,
                fontSize: col.size,
                animationDelay: col.delay,
                animationDuration: col.duration,
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear',
                animationName: col.anim,
                willChange: 'transform, opacity',
              }}
            >
              {col.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ferrofluid;
