import React, { useRef, useEffect } from "react";
import type { CladniConfig } from "../types/cladni";
import { cladniPattern } from "../utils/cladniMath";
import "./CladniCanvas.css";

interface CladniCanvasProps {
  config: CladniConfig;
  width?: number;
  height?: number;
}

interface Particle {
  x: number;
  y: number;
}

const CladniCanvas: React.FC<CladniCanvasProps> = ({
  config,
  width = 600,
  height = 600,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>(0);

  // 初始化粒子群
  useEffect(() => {
    const particleCount = 20000; // 适当减少数量以平衡单屏性能
    const initialParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
      });
    }
    particlesRef.current = initialParticles;
  }, []);

  // 渲染循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      // 背景色：深色拉丝金属感
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, width, height);

      // 粒子：纯净白沙色
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";

      const particles = particlesRef.current;
      // const { frequencyX, frequencyY } = config;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const z = cladniPattern(p.x, p.y, config);
        const absZ = Math.abs(z);

        // 物理模拟：震动幅度越大，随机位移越大
        const jitter = absZ * 0.02;
        p.x += (Math.random() - 0.5) * jitter;
        p.y += (Math.random() - 0.5) * jitter;

        // 边界锁定
        if (p.x < -0.5) p.x = -0.5;
        if (p.x > 0.5) p.x = 0.5;
        if (p.y < -0.5) p.y = -0.5;
        if (p.y > 0.5) p.y = 0.5;

        const screenX = (p.x + 0.5) * width;
        const screenY = (p.y + 0.5) * height;

        ctx.fillRect(screenX, screenY, 1, 1);
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [config, width, height]);

  return (
    <div className="cladni-canvas-container physical-sim">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="cladni-canvas"
      />
      <div className="canvas-overlay-minimal">
        <span className="terminal-text">STATUS: RESONANCE_ACTIVE</span>
        <span className="terminal-text">
          MODES: M{config.frequencyX} / N{config.frequencyY}
        </span>
      </div>
    </div>
  );
};

export default CladniCanvas;
