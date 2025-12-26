import type { CladniConfig } from "../types/cladni";

/**
 * 物理常量定义
 * BASE_V: 模拟板材的波速相关常数（根据不同材质可调，如铝板、钢板）
 * 这个值会影响频率与模态之间的转换关系
 */
const BASE_V = 200;

/**
 * 频率到模态转换函数
 * 原理：基于Chladni定律，将声音频率转换为物理模态参数(m,n)
 * 物理公式参考: f = C * (m² + n²)，其中C为材料相关常数
 */
export function getModesFromFrequency(freqHz: number): {
  m: number;
  n: number;
} {
  let bestM = 1,
    bestN = 1;
  let minDiff = Infinity;

  // 搜索可能的整数模态组合 (m,n)，范围1-15
  for (let m = 1; m <= 15; m++) {
    for (let n = 1; n <= 15; n++) {
      // 物理简化模型：频率与模态平方和成正比
      // 这里BASE_V/10是为了将数值调整到合适的范围
      const calculatedF = (m * m + n * n) * (BASE_V / 10);
      const diff = Math.abs(calculatedF - freqHz);

      // 寻找最接近输入频率的模态组合
      if (diff < minDiff) {
        minDiff = diff;
        bestM = m;
        bestN = n;
      }
    }
  }
  return { m: bestM, n: bestN };
}

/**
 * 核心Cladni图案数学函数
 * 原理：模拟振动板上粒子的分布，基于振动模式方程
 * 节点线(振动幅度为0的区域)形成可见的图案
 */
export function cladniPattern(
  x: number, // X坐标 (-0.5 到 0.5)
  y: number, // Y坐标 (-0.5 到 0.5)
  config: CladniConfig,
  time: number = 0 // 时间参数，用于模拟微小的时间变化
): number {
  // 解构配置参数
  // frequencyX/Y: 振动模式参数 m/n (物理模态数)
  // amplitude: 振动幅度
  // damping: 阻尼系数
  // complexity: 复杂度，影响图案的细节层次
  const { frequencyX, frequencyY, amplitude, damping, complexity } = config;

  let value = 0;

  /**
   * 核心物理原理：经典Chladni波函数
   * 标准正方形板公式：sin(nπx)sin(mπy) - sin(mπx)sin(nπy) = 0
   * 这个方程描述了矩形板的振动模式
   * 节点线：函数值接近0的区域，沙粒会聚集形成图案
   * 反节点：函数值较大的区域，沙粒会被振动驱散
   */
  for (let i = 1; i <= complexity; i++) {
    // 振动模式参数 m/n (代表沿X和Y方向的振动节点数)
    const m = frequencyX; // X方向的振动模态数
    const n = frequencyY; // Y方向的振动模态数

    // 两个正弦波函数的组合，形成干涉图案
    const term1 = Math.sin(n * Math.PI * x) * Math.sin(m * Math.PI * y); // sin(nπx)sin(mπy)
    const term2 = Math.sin(m * Math.PI * x) * Math.sin(n * Math.PI * y); // sin(mπx)sin(nπy)

    // 干涉图案，产生节点线和反节点区域
    // (1/i) 用于随复杂度增加逐渐减弱每个层次的影响
    const pattern = (term1 - term2) * (1 / i);

    // 时间变化效果：模拟板的微小颤动，增加真实感
    const timeEffect = Math.sin(time * 0.2 + i) * 0.1;

    // 阻尼效应：模拟振动能量从中心向边缘衰减
    // 距离中心越远，振动幅度越小
    const distance = Math.sqrt(x * x + y * y);
    const dampingEffect = Math.exp(-damping * distance);

    // 累加所有复杂度层次的贡献
    value += pattern * dampingEffect * amplitude * (1 + timeEffect);
  }

  return value;
}

/**
 * 生成网格数据
 * 原理：在指定区域内计算每个点的Cladni函数值
 * 用于生成完整的图案网格
 */
export function generateGridData(
  width: number, // 网格宽度（像素）
  height: number, // 网格高度（像素）
  config: CladniConfig,
  time: number = 0 // 时间参数
): number[][] {
  const grid: number[][] = [];
  const scale = 1; // 坐标系缩放因子

  // 遍历每个像素位置，计算对应的Cladni函数值
  for (let i = 0; i < height; i++) {
    grid[i] = [];
    // 将像素坐标转换为标准化坐标 (-0.5 到 0.5)
    const y = (i / height - 0.5) * scale;

    for (let j = 0; j < width; j++) {
      // 将像素坐标转换为标准化坐标 (-0.5 到 0.5)
      const x = (j / width - 0.5) * scale;
      // 计算该点的Cladni函数值
      grid[i][j] = cladniPattern(x, y, config, time);
    }
  }

  return grid;
}

/**
 * 查找网格中的最大最小值
 * 用于数据归一化，便于后续的可视化处理
 */
export function findMinMax(grid: number[][]): { min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;

  // 遍历所有网格点，找出最大最小值
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const value = grid[i][j];
      if (value < min) min = value;
      if (value > max) max = value;
    }
  }

  return { min, max };
}
