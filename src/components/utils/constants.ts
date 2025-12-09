import type { CladniConfig, Preset } from '../types/cladni';

// 默认配置
export const DEFAULT_CONFIG: CladniConfig = {
  frequencyX: 2,
  frequencyY: 3,
  amplitude: 1.0,
  damping: 0.5,
  complexity: 2
};

// 预设模式
export const PRESETS: Preset[] = [
  {
    id: 'default',
    name: '默认模式',
    description: '标准Cladni图形 (m=2, n=3)',
    config: {
      frequencyX: 2,
      frequencyY: 3,
      amplitude: 1.0,
      damping: 0.5,
      complexity: 2
    }
  },
  {
    id: 'simple',
    name: '简单模式',
    description: '简单的十字形图案 (m=1, n=1)',
    config: {
      frequencyX: 1,
      frequencyY: 1,
      amplitude: 1.0,
      damping: 0.3,
      complexity: 1
    }
  },
  {
    id: 'complex',
    name: '复杂模式',
    description: '复杂的多模态叠加 (m=4, n=5)',
    config: {
      frequencyX: 4,
      frequencyY: 5,
      amplitude: 1.2,
      damping: 0.7,
      complexity: 4
    }
  },
  {
    id: 'diagonal',
    name: '对角线',
    description: '对角线为主的图案 (m=2, n=2)',
    config: {
      frequencyX: 2,
      frequencyY: 2,
      amplitude: 1.0,
      damping: 0.4,
      complexity: 2
    }
  },
  {
    id: 'symmetrical',
    name: '对称模式',
    description: '高度对称的图案 (m=3, n=3)',
    config: {
      frequencyX: 3,
      frequencyY: 3,
      amplitude: 0.9,
      damping: 0.6,
      complexity: 3
    }
  },
  {
    id: 'spiral',
    name: '螺旋模式',
    description: '近似螺旋的图案 (m=5, n=2)',
    config: {
      frequencyX: 5,
      frequencyY: 2,
      amplitude: 1.1,
      damping: 0.5,
      complexity: 3
    }
  }
];
