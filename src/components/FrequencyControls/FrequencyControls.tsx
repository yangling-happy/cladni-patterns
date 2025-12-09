import React, { useRef } from 'react';
import type { CladniConfig } from '../types/cladni';
import './FrequencyControls.css';

interface FrequencyControlsProps {
  config: CladniConfig;
  onConfigChange: (config: CladniConfig) => void;
}

const FrequencyControls: React.FC<FrequencyControlsProps> = ({
  config,
  onConfigChange
}) => {
  // 使用ref保存超时ID
  const updateTimeoutRef = useRef<number | null>(null);

  // 实现防抖处理，减少频繁更新导致的卡顿
  const handleChange = (key: keyof CladniConfig, value: number) => {
    // 立即更新本地状态显示，提供即时反馈
    
    // 防抖处理：等待用户停止滑动后再更新配置
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    updateTimeoutRef.current = setTimeout(() => {
      onConfigChange({
        ...config,
        [key]: value
      });
    }, 100); // 100ms延迟，可根据需要调整
  };

  return (
    <div className="frequency-controls">
      <h3>参数调节</h3>
      
      <div className="control-group">
        <label htmlFor="frequencyX">
          X方向频率 (m): {config.frequencyX.toFixed(1)}
        </label>
        <input
          id="frequencyX"
          type="range"
          min="1"
          max="10"
          step="0.1"
          value={config.frequencyX}
          onChange={(e) => handleChange('frequencyX', parseFloat(e.target.value))}
        />
        <div className="value-display">{config.frequencyX.toFixed(1)}</div>
      </div>
      
      <div className="control-group">
        <label htmlFor="frequencyY">
          Y方向频率 (n): {config.frequencyY.toFixed(1)}
        </label>
        <input
          id="frequencyY"
          type="range"
          min="1"
          max="10"
          step="0.1"
          value={config.frequencyY}
          onChange={(e) => handleChange('frequencyY', parseFloat(e.target.value))}
        />
        <div className="value-display">{config.frequencyY.toFixed(1)}</div>
      </div>
      
      <div className="control-group">
        <label htmlFor="amplitude">
          振幅: {config.amplitude.toFixed(1)}
        </label>
        <input
          id="amplitude"
          type="range"
          min="0.1"
          max="2.0"
          step="0.1"
          value={config.amplitude}
          onChange={(e) => handleChange('amplitude', parseFloat(e.target.value))}
        />
        <div className="value-display">{config.amplitude.toFixed(1)}</div>
      </div>
      
      <div className="control-group">
        <label htmlFor="damping">
          阻尼: {config.damping.toFixed(1)}
        </label>
        <input
          id="damping"
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={config.damping}
          onChange={(e) => handleChange('damping', parseFloat(e.target.value))}
        />
        <div className="value-display">{config.damping.toFixed(1)}</div>
      </div>
      
      <div className="control-group">
        <label htmlFor="complexity">
          复杂度: {config.complexity}
        </label>
        <input
          id="complexity"
          type="range"
          min="1"
          max="8"
          step="1"
          value={config.complexity}
          onChange={(e) => handleChange('complexity', parseInt(e.target.value))}
        />
        <div className="value-display">{config.complexity}</div>
      </div>
      
      <div className="formula-display">
        <p>克拉尼图形公式:</p>
        <p className="formula">
          z(x,y) = Σ<sub>i=1</sub><sup>N</sup> Σ<sub>j=1</sub><sup>N</sup> 
          sin(m·i·π·x) · sin(n·j·π·y) · e<sup>-α·r</sup>
        </p>
        <p>其中: m = {config.frequencyX}, n = {config.frequencyY}, N = {config.complexity}, α = {config.damping}</p>
      </div>
    </div>
  );
};

export default FrequencyControls;