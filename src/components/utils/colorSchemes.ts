import type { ColorScheme } from '../types/cladni';

// 生成彩虹色
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// 颜色方案定义
export const colorSchemes: ColorScheme[] = [
  {
    name: '彩虹',
    getColor: (value: number, maxValue: number): string => {
      // 将值归一化到 [0, 1]
      const normalized = (value + maxValue) / (2 * maxValue);
      // 彩虹色从 0° 到 360°
      const hue = normalized * 360;
      return hslToHex(hue, 100, 50);
    }
  },
  {
    name: '蓝紫渐变',
    getColor: (value: number, maxValue: number): string => {
      const normalized = (value + maxValue) / (2 * maxValue);
      const r = Math.round(100 + normalized * 155);
      const g = Math.round(100 + normalized * 50);
      const b = Math.round(200 + normalized * 55);
      return `rgb(${r}, ${g}, ${b})`;
    }
  },
  {
    name: '灰度',
    getColor: (value: number, maxValue: number): string => {
      const normalized = (value + maxValue) / (2 * maxValue);
      const gray = Math.round(normalized * 255);
      return `rgb(${gray}, ${gray}, ${gray})`;
    }
  },
  {
    name: '火焰',
    getColor: (value: number, maxValue: number): string => {
      const normalized = (value + maxValue) / (2 * maxValue);
      const r = Math.round(255);
      const g = Math.round(normalized * 200);
      const b = Math.round(normalized * 50);
      return `rgb(${r}, ${g}, ${b})`;
    }
  },
  {
    name: '海洋',
    getColor: (value: number, maxValue: number): string => {
      const normalized = (value + maxValue) / (2 * maxValue);
      const r = Math.round(normalized * 50);
      const g = Math.round(150 + normalized * 105);
      const b = Math.round(200 + normalized * 55);
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
];