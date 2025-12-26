import { useState } from 'react';
import CladniCanvas from './components/CladniCanvas/CladniCanvas';
import FrequencyControls from './components/FrequencyControls/FrequencyControls';
import PresetSelector from './components/PresetSelector/PresetSelector';
import type { CladniConfig } from './components/types/cladni';
import { DEFAULT_CONFIG } from './components/utils/constants';
import './App.css';

function App() {
  const [config, setConfig] = useState<CladniConfig>(DEFAULT_CONFIG);

  return (
    <div className="App">
      <div className="dashboard-container">
        {/* 左侧：核心仿真区 */}
        <section className="simulation-area">
          <header className="minimal-header">
            <h1>CHLADNI_SIMULATOR_V1.0</h1>
            <div className="system-status">SYSTEM_READY // OSC_ACTIVE</div>
          </header>
          
          <div className="canvas-wrapper">
            <CladniCanvas 
              config={config} 
              width={600} 
              height={600} 
            />
          </div>
        </section>

        {/* 右侧：控制与参数区 */}
        <aside className="control-sidebar">
          <FrequencyControls 
            config={config} 
            onConfigChange={setConfig} 
          />
          
          <div className="sidebar-divider" />
          
          <section className="preset-section">
            <PresetSelector 
              onSelectPreset={setConfig}
              currentConfig={config}
            />
          </section>

          <footer className="sidebar-footer">
            <div className="formula-mini">
              z = A·[sin(nπx)sin(mπy) - sin(mπx)sin(nπy)]
            </div>
            <p className="copyright">PHYSICS_SIM_RE_2025</p>
          </footer>
        </aside>
      </div>
    </div>
  );
}

export default App;