import React from "react";
import type { CladniConfig } from "../types/cladni";
import { PRESETS } from "../utils/constants";
import "./PresetSelector.css";

interface PresetSelectorProps {
  onSelectPreset: (config: CladniConfig) => void;
  currentConfig: CladniConfig;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({
  onSelectPreset,
  currentConfig,
}) => {
  return (
    <div className="preset-selector">
      <h3>预设模式</h3>
      <div className="preset-grid">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            className={`mini-preset-btn ${
              currentConfig.frequencyX === preset.config.frequencyX
                ? "active"
                : ""
            }`}
            onClick={() => onSelectPreset(preset.config)}
          >
            <span className="btn-label">{preset.name}</span>
            <span className="btn-meta">
              M{preset.config.frequencyX}N{preset.config.frequencyY}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PresetSelector;
