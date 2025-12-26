import type { CladniConfig } from "../types/cladni";

/**
 * 物理常量定义
 * BASE_V: 模拟板材的波速相关常数（根据不同材质可调，如铝板、钢板）
 */
const BASE_V = 200;

/**
 * 核心修改 1: 根据声音频率 (Hz) 寻找最匹配的物理模态 (m, n)
 * 物理公式参考: f = C * (m^2 + n^2)
 */
export function getModesFromFrequency(freqHz: number): {
  m: number;
  n: number;
} {
  let bestM = 1,
    bestN = 1;
  let minDiff = Infinity;

  // 搜索可能的整数模态组合
  for (let m = 1; m <= 15; m++) {
    for (let n = 1; n <= 15; n++) {
      // 物理简化模型：频率与模态平方和成正比
      const calculatedF = (m * m + n * n) * (BASE_V / 10);
      const diff = Math.abs(calculatedF - freqHz);

      if (diff < minDiff) {
        minDiff = diff;
        bestM = m;
        bestN = n;
      }
    }
  }
  return { m: bestM, n: bestN };
}

// 克拉尼图形核心数学公式
export function cladniPattern(
  x: number,
  y: number,
  config: CladniConfig,
  time: number = 0
): number {
  // 注意：这里的 frequencyX/Y 现在代表物理模态参数 m/n
  const { frequencyX, frequencyY, amplitude, damping, complexity } = config;

  let value = 0;

  // 核心修改 2: 使用经典克拉尼波函数 (Chladni's Law)
  // 标准正方形板公式：sin(nπx)sin(mπy) - sin(mπx)sin(nπy) = 0
  for (let i = 1; i <= complexity; i++) {
    // 将基础频率作为基础模态
    const m = frequencyX;
    const n = frequencyY;

    // 经典的叠加公式，能产生更真实的对称线条
    const term1 = Math.sin(n * Math.PI * x) * Math.sin(m * Math.PI * y);
    const term2 = Math.sin(m * Math.PI * x) * Math.sin(n * Math.PI * y);

    // 引入 i, j 扰动实现 complexity 叠加效果
    const pattern = (term1 - term2) * (1 / i);

    // 添加时间动画（模拟板的微小颤动）
    const timeEffect = Math.sin(time * 0.2 + i) * 0.1;

    // 阻尼效应（模拟能量从中心向边缘衰减）
    const distance = Math.sqrt(x * x + y * y);
    const dampingEffect = Math.exp(-damping * distance);

    value += pattern * dampingEffect * amplitude * (1 + timeEffect);
  }

  return value;
}

// 生成网格数据 (保持逻辑，但确保坐标处理正确)
export function generateGridData(
  width: number,
  height: number,
  config: CladniConfig,
  time: number = 0
): number[][] {
  const grid: number[][] = [];
  const scale = 1; // 标准化坐标系

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

// 查找最大最小值用于归一化 (保持不变)
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
