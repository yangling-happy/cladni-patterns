import type { CladniConfig } from '../types/cladni';

// 克拉尼图形核心数学公式
export function cladniPattern(
  x: number, 
  y: number, 
  config: CladniConfig,
  time: number = 0
): number {
  const { frequencyX, frequencyY, amplitude, damping, complexity } = config;
  
  let value = 0;
  
  // 叠加多个模态以增加图形复杂性
  for (let i = 1; i <= complexity; i++) {
    for (let j = 1; j <= complexity; j++) {
      const m = frequencyX * i;
      const n = frequencyY * j;
      
      // 克拉尼图形标准方程: sin(mπx) * sin(nπy)
      const pattern = Math.sin(m * Math.PI * x) * Math.sin(n * Math.PI * y);
      
      // 添加时间动画效果
      const timeEffect = Math.sin(time * 0.5 + i + j) * 0.2;
      
      // 添加阻尼效应
      const distance = Math.sqrt(x * x + y * y);
      const dampingEffect = Math.exp(-damping * distance);
      
      value += pattern * dampingEffect * (amplitude / (i + j)) * (1 + timeEffect);
    }
  }
  
  return value;
}

// 生成网格数据
export function generateGridData(
  width: number, 
  height: number, 
  config: CladniConfig,
  time: number = 0
): number[][] {
  const grid: number[][] = [];
  const scale = 2; // 扩大坐标范围
  
  for (let i = 0; i < height; i++) {
    grid[i] = [];
    const y = (i / height - 0.5) * scale;
    
    for (let j = 0; j < width; j++) {
      const x = (j / width - 0.5) * scale;
      grid[i][j] = cladniPattern(x, y, config, time);
    }
  }
  
  return grid;
}

// 查找最大最小值用于归一化
export function findMinMax(grid: number[][]): { min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;
  
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const value = grid[i][j];
      if (value < min) min = value;
      if (value > max) max = value;
    }
  }
  
  return { min, max };
}