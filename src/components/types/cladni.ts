export interface CladniConfig {
  frequencyX: number;  // X方向频率 (m)
  frequencyY: number;  // Y方向频率 (n)
  amplitude: number;   // 振幅
  damping: number;     // 阻尼系数
  complexity: number;  // 复杂度 (叠加的模态数量)
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  config: CladniConfig;
}

export interface ColorScheme {
  name: string;
  getColor: (value: number, maxValue: number) => string;
}