import { useState } from 'react';
import CladniCanvas from './components/CladniCanvas/CladniCanvas';
import FrequencyControls from './components/FrequencyControls/FrequencyControls';
import PresetSelector from './components/PresetSelector/PresetSelector';
import PatternInfo from './components/PatternInfo/PatternInfo';
import type { CladniConfig } from './components/types/cladni';
import { DEFAULT_CONFIG } from './components/utils/constants';
import './App.css';

function App() {
  const [config, setConfig] = useState<CladniConfig>(DEFAULT_CONFIG);
  const [colorScheme, setColorScheme] = useState(0);
  const [animate, setAnimate] = useState(true);

  return (
    <div className="App">
      <header className="header">
        <h1>克拉尼图形可视化</h1>
        <p className="subtitle">通过调整频率参数探索声波振动形成的驻波图案</p>
      </header>
      
      <main className="main-content">
        <div className="visualization-section">
          <CladniCanvas 
            config={config} 
            colorScheme={colorScheme}
            animate={animate}
            width={500}
            height={450}
          />
        </div>
        
        <div className="controls-section">
          <div className="controls-panel">
            <FrequencyControls 
              config={config} 
              onConfigChange={setConfig} 
            />
          </div>
        </div>
      </main>
      
      <div className="bottom-section">
        <div className="bottom-panel formula-panel">
          <h3>图形公式</h3>
          <div className="formula">
            <p>z(x,y) = Σ sin(mπx) · sin(nπy)</p>
            <p className="formula-description">
              其中：m和n分别为X和Y方向的频率参数<br />
              通过调整这些参数可以观察不同的驻波图案
            </p>
          </div>
        </div>
        
        <div className="bottom-panel preset-panel">
          <PresetSelector 
            onSelectPreset={setConfig}
            currentConfig={config}
          />
        </div>
        
        <div className="bottom-panel info-panel">
          <PatternInfo 
            config={config}
            colorScheme={colorScheme}
            onColorSchemeChange={setColorScheme}
            animate={animate}
            onAnimateChange={setAnimate}
          />
        </div>
      </div>
      
      <footer className="footer">
        <p>
          克拉尼图形可视化 | 基于React + TypeScript + Vite构建 | 
          公式: z(x,y) = Σ sin(mπx) · sin(nπy)
        </p>
      </footer>
    </div>
  );
}

export default App;