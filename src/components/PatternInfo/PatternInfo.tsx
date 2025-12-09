import React from 'react';
import type { CladniConfig } from '../types/cladni';
import './PatternInfo.css';

interface PatternInfoProps {
  config: CladniConfig;
  colorScheme: number;
  onColorSchemeChange: (index: number) => void;
  animate: boolean;
  onAnimateChange: (animate: boolean) => void;
}

const PatternInfo: React.FC<PatternInfoProps> = ({
  config,
  colorScheme,
  onColorSchemeChange,
  animate,
  onAnimateChange
}) => {
  const colorSchemes = ['彩虹', '蓝紫渐变', '灰度', '火焰', '海洋'];
  
  return (
    <div className="pattern-info">
      <h3>克拉尼图形说明</h3>
      
      <div className="info-section">
        <p>
          克拉尼图形是声波在振动板上形成的驻波图案，由德国物理学家恩斯特·克拉尼在18世纪发现。
          通过调节振动频率(m, n)可以产生不同的图形。
        </p>
        
        <div className="controls">
          <div className="control-group">
            <label>颜色方案:</label>
            <div className="color-scheme-buttons">
              {colorSchemes.map((name, index) => (
                <button
                  key={name}
                  className={`color-scheme-button ${colorScheme === index ? 'active' : ''}`}
                  onClick={() => onColorSchemeChange(index)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="control-group">
            <label>
              <input
                type="checkbox"
                checked={animate}
                onChange={(e) => onAnimateChange(e.target.checked)}
              />
              启用动画
            </label>
          </div>
        </div>
        
        <div className="current-settings">
          <h4>当前参数</h4>
          <ul>
            <li>X方向频率 (m): <strong>{config.frequencyX}</strong></li>
            <li>Y方向频率 (n): <strong>{config.frequencyY}</strong></li>
            <li>振幅: <strong>{config.amplitude.toFixed(2)}</strong></li>
            <li>阻尼系数: <strong>{config.damping.toFixed(2)}</strong></li>
            <li>模态叠加数: <strong>{config.complexity}</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatternInfo;