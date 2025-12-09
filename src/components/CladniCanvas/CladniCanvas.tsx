import React, { useRef, useEffect } from 'react';
import type { CladniConfig } from '../types/cladni';
import { useCladniPattern } from './useCladniPattern';
import { colorSchemes } from '../utils/colorSchemes';
import './CladniCanvas.css';

interface CladniCanvasProps {
  config: CladniConfig;
  colorScheme: number;
  width?: number;
  height?: number;
  animate?: boolean;
}

const CladniCanvas: React.FC<CladniCanvasProps> = ({
  config,
  colorScheme,
  width = 600,
  height = 600,
  animate = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { grid, minMax } = useCladniPattern(width, height, config, animate);
  const selectedColorScheme = colorSchemes[colorScheme];

  // 绘制图形
  const drawPattern = () => {
    const canvas = canvasRef.current;
    if (!canvas || grid.length === 0) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    
    const cellWidth = width / grid[0].length;
    const cellHeight = height / grid.length;
    
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const value = grid[i][j];
        
        ctx.fillStyle = selectedColorScheme.getColor(value, Math.max(Math.abs(minMax.min), Math.abs(minMax.max)));
        ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
      }
    }
    
    // 绘制网格线（可选）
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    
    // 垂直线
    for (let x = 0; x <= width; x += cellWidth) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // 水平线
    for (let y = 0; y <= height; y += cellHeight) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  // 当grid或minMax变化时重新绘制
  useEffect(() => {
    drawPattern();
  }, [grid, minMax, selectedColorScheme]);

  return (
    <div className="cladni-canvas-container">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="cladni-canvas"
      />
      <div className="canvas-info">
        <span>频率: m={config.frequencyX}, n={config.frequencyY}</span>
        <span>振幅: {config.amplitude.toFixed(2)}</span>
        <span>复杂度: {config.complexity}</span>
      </div>
    </div>
  );
};

export default CladniCanvas;