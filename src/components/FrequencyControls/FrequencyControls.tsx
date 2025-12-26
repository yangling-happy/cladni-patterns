import React, { useRef, useState } from "react";
import type { CladniConfig } from "../types/cladni";
import { getModesFromFrequency } from "../utils/cladniMath";
import "./FrequencyControls.css";

interface FrequencyControlsProps {
  config: CladniConfig;
  onConfigChange: (config: CladniConfig) => void;
}

const FrequencyControls: React.FC<FrequencyControlsProps> = ({
  config,
  onConfigChange,
}) => {
  const updateTimeoutRef = useRef<number | null>(null);
  // 本地状态：用于存储声音频率 Hz
  const [hz, setHz] = useState(440);

  // 通用的防抖更新函数
  const debounceUpdate = (newConfig: CladniConfig) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    updateTimeoutRef.current = window.setTimeout(() => {
      onConfigChange(newConfig);
    }, 10); // 降低延迟，增强仿真交互感
  };

  // 核心功能：处理声音频率变化
  const handleFrequencyHzChange = (value: number) => {
    setHz(value);
    // 从 Hz 计算物理模态 m 和 n
    const { m, n } = getModesFromFrequency(value);

    const newConfig = {
      ...config,
      frequencyX: m,
      frequencyY: n,
    };
    debounceUpdate(newConfig);
  };

  // 处理其他常规参数变化
  const handleParamChange = (key: keyof CladniConfig, value: number) => {
    const newConfig = {
      ...config,
      [key]: value,
    };
    debounceUpdate(newConfig);
  };

  return (
    <div className="frequency-controls">
      <h3>声音频率仿真</h3>

      {/* 新增：频率 Hz 控制器 */}
      <div className="control-group physics-primary">
        <label htmlFor="hzRange">
          激励频率 (Hz): <span className="highlight">{hz} Hz</span>
        </label>
        <input
          id="hzRange"
          type="range"
          min="100"
          max="2000"
          step="1"
          value={hz}
          onChange={(e) => handleFrequencyHzChange(parseInt(e.target.value))}
        />
        <div className="helper-text">改变 Hz 会自动计算最佳物理模态 (m, n)</div>
      </div>

      <hr />

      <h3>参数微调</h3>

      <div className="control-group">
        <label htmlFor="frequencyX">X方向模态 (m): {config.frequencyX}</label>
        <input
          id="frequencyX"
          type="range"
          min="1"
          max="20"
          step="1"
          value={config.frequencyX}
          onChange={(e) =>
            handleParamChange("frequencyX", parseInt(e.target.value))
          }
        />
      </div>

      <div className="control-group">
        <label htmlFor="frequencyY">Y方向模态 (n): {config.frequencyY}</label>
        <input
          id="frequencyY"
          type="range"
          min="1"
          max="20"
          step="1"
          value={config.frequencyY}
          onChange={(e) =>
            handleParamChange("frequencyY", parseInt(e.target.value))
          }
        />
      </div>

      <div className="control-group">
        <label htmlFor="amplitude">
          振幅 (Amplitude): {config.amplitude.toFixed(1)}
        </label>
        <input
          id="amplitude"
          type="range"
          min="0.1"
          max="5.0"
          step="0.1"
          value={config.amplitude}
          onChange={(e) =>
            handleParamChange("amplitude", parseFloat(e.target.value))
          }
        />
      </div>

      <div className="control-group">
        <label htmlFor="damping">
          阻尼 (Damping): {config.damping.toFixed(2)}
        </label>
        <input
          id="damping"
          type="range"
          min="0"
          max="4"
          step="0.05"
          value={config.damping}
          onChange={(e) =>
            handleParamChange("damping", parseFloat(e.target.value))
          }
        />
      </div>

      <div className="formula-display">
        <p>克拉尼驻波公式 (正方形板):</p>
        <p className="formula">z = A · [sin(nπx)sin(mπy) - sin(mπx)sin(nπy)]</p>
        <p className="status-bar">
          当前状态:{" "}
          <strong>
            m={config.frequencyX}, n={config.frequencyY}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default FrequencyControls;
