import React from 'react';
import type { CladniConfig } from '../types/cladni';
import { PRESETS } from '../utils/constants';
import './PresetSelector.css';

interface PresetSelectorProps {
  onSelectPreset: (config: CladniConfig) => void;
  currentConfig: CladniConfig;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({
  onSelectPreset,
  currentConfig
}) => {
  return (
    <div className="preset-selector">
      <h3>预设模式</h3>
      <div className="preset-grid">
        {PRESETS.map(preset => (
          <button
            key={preset.id}
            className={`preset-button ${
              preset.config.frequencyX === currentConfig.frequencyX &&
              preset.config.frequencyY === currentConfig.frequencyY &&
              preset.config.complexity === currentConfig.complexity
                ? 'active'
                : ''
            }`}
            onClick={() => onSelectPreset(preset.config)}
            title={preset.description}
          >
            <div className="preset-name">{preset.name}</div>
            <div className="preset-details">
              m={preset.config.frequencyX}, n={preset.config.frequencyY}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PresetSelector;