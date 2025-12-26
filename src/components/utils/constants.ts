import type { CladniConfig, Preset } from '../types/cladni';

/**
 * 默认配置
 * frequencyX (m) 和 frequencyY (n) 采用整数，模拟物理共振模态
 */
export const DEFAULT_CONFIG: CladniConfig = {
  frequencyX: 2,
  frequencyY: 3,
  amplitude: 1.2, // 增加初始振幅使图形更清晰
  damping: 0.2,   // 降低默认阻尼，使边缘图案更完整
  complexity: 1   // 物理仿真模式下，基础复杂度设为1效果最纯净
};

/**
 * 物理仿真预设模式
 * 这里的参数对应正方形薄板的经典共振模态
 */
export const PRESETS: Preset[] = [
  {
    id: 'default',
    name: '标准模式',
    description: '经典非对称图案 (m=2, n=3)',
    config: {
      frequencyX: 2,
      frequencyY: 3,
      amplitude: 1.0,
      damping: 0.2,
      complexity: 1
    }
  },
  {
    id: 'simple_cross',
    name: '基础十字',
    description: '最低阶共振模式 (m=1, n=2)',
    config: {
      frequencyX: 1,
      frequencyY: 2,
      amplitude: 1.0,
      damping: 0.1,
      complexity: 1
    }
  },
  {
    id: 'high_freq',
    name: '高频细纹',
    description: '高频振动下的密集网格 (m=7, n=8)',
    config: {
      frequencyX: 7,
      frequencyY: 8,
      amplitude: 1.5,
      damping: 0.3,
      complexity: 1
    }
  },
  {
    id: 'diagonal_sym',
    name: '对角对称',
    description: '由于 m=n 产生的全对称图案 (m=4, n=4)',
    config: {
      frequencyX: 4,
      frequencyY: 4,
      amplitude: 1.0,
      damping: 0.2,
      complexity: 1
    }
  },
  {
    id: 'complex_resonance',
    name: '复杂共振',
    description: '多模态叠加效果 (m=5, n=3)',
    config: {
      frequencyX: 5,
      frequencyY: 3,
      amplitude: 1.2,
      damping: 0.4,
      complexity: 2
    }
  },
  {
    id: 'fine_structure',
    name: '精细结构',
    description: '高阶模态下的复杂分割 (m=10, n=2)',
    config: {
      frequencyX: 10,
      frequencyY: 2,
      amplitude: 1.3,
      damping: 0.5,
      complexity: 1
    }
  }
];