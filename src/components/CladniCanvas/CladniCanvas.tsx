import React, { useRef, useEffect } from 'react';
import type { CladniConfig } from '../types/cladni';
import { cladniPattern } from '../utils/cladniMath';
import './CladniCanvas.css';

interface CladniCanvasProps {
  config: CladniConfig;
  colorScheme: number; // 粒子模式下可作为粒子颜色切换
  width?: number;
  height?: number;
  animate?: boolean;
}

// 定义粒子类型
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

  // 1. 初始化粒子群 (模拟真实实验中的沙粒)
  useEffect(() => {
    const particleCount = 25000; // 增加粒子数量以获得更细腻的线条
    const initialParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
      });
    }
    particlesRef.current = initialParticles;
  }, []);

  // 2. 仿真渲染循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // 使用带透明度的黑色填充背景，产生轻微的拖尾感/沉淀感
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // 粒子颜色：模拟白沙质感
      ctx.fillStyle = 'rgba(230, 230, 230, 0.8)';

      const particles = particlesRef.current;
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // 计算当前位置的物理振幅
        // 注意：cladniPattern 已在 utils 中改为物理方程
        const z = cladniPattern(p.x, p.y, config);
        const absZ = Math.abs(z);

        // --- 核心物理仿真逻辑 ---
        // 振幅 absZ 越大，粒子受到的“随机踢力”越大
        // 这会导致粒子离开高振幅区，堆积在 absZ 趋近于 0 的节点线上
        const moveScale = 0.015; 
        p.x += (Math.random() - 0.5) * absZ * moveScale;
        p.y += (Math.random() - 0.5) * absZ * moveScale;

        // 边界处理：防止粒子跑出金属板
        if (p.x < -0.5) p.x = -0.5;
        if (p.x > 0.5) p.x = 0.5;
        if (p.y < -0.5) p.y = -0.5;
        if (p.y > 0.5) p.y = 0.5;

        // 映射物理坐标 (-0.5~0.5) 到 画布坐标 (0~width)
        const screenX = (p.x + 0.5) * width;
        const screenY = (p.y + 0.5) * height;

        // 绘制沙粒点（使用 1x1 或微小的圆点）
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
      <div className="canvas-overlay">
        <div className="mode-indicator">物理模式: 驻波仿真</div>
        <div className="params-readout">
          FREQ_M: {config.frequencyX} | FREQ_N: {config.frequencyY}
        </div>
      </div>
    </div>
  );
};

export default CladniCanvas;