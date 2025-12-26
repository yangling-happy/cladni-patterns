import { useState } from 'react';
import CladniCanvas from './components/CladniCanvas/CladniCanvas';
import FrequencyControls from './components/FrequencyControls/FrequencyControls';
import PresetSelector from './components/PresetSelector/PresetSelector';
import PatternInfo from './components/PatternInfo/PatternInfo';
import type { CladniConfig } from './components/types/cladni';
import { DEFAULT_CONFIG } from './components/utils/constants';
import './App.css';

function App() {
  // 核心状态：包含物理模态 m (frequencyX) 和 n (frequencyY)
  const [config, setConfig] = useState<CladniConfig>(DEFAULT_CONFIG);
  const [colorScheme, setColorScheme] = useState(0);
  const [animate, setAnimate] = useState(true);

  return (
    <div className="App">
      <header className="header">
        <h1>克拉尼图形物理仿真</h1>
        <p className="subtitle">基于声音频率与薄板振动方程的实时可视化</p>
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
            {/* 这里的 onConfigChange 会接收来自 FrequencyControls 计算出的 m 和 n */}
            <FrequencyControls 
              config={config} 
              onConfigChange={setConfig} 
            />
          </div>
        </div>
      </main>
      
      <div className="bottom-section">
        <div className="bottom-panel formula-panel">
          <h3>物理仿真公式</h3>
          <div className="formula">
            {/* 更新为更准确的正方形薄板驻波方程 */}
            <p>z(x,y) = A · [sin(nπx)sin(mπy) - sin(mπx)sin(nπy)]</p>
            <p className="formula-description">
              <strong>物理模态：</strong> m = {config.frequencyX}, n = {config.frequencyY} <br />
              此公式描述了正方形薄板在特定频率下的自由振动图案。
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
          克拉尼图形仿真 | 物理模型: 正方形薄板驻波 | 
          当前频率对应模态: ({config.frequencyX}, {config.frequencyY})
        </p>
      </footer>
    </div>
  );
}

export default App;