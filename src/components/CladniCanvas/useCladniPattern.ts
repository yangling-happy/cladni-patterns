import { useState, useEffect, useCallback, useRef } from 'react';
import type { CladniConfig } from '../types/cladni';
import { generateGridData, findMinMax } from '../utils/cladniMath';

export function useCladniPattern(
  width: number, 
  height: number, 
  config: CladniConfig, 
  animate: boolean = true
) {
  const [grid, setGrid] = useState<number[][]>([]);
  const [minMax, setMinMax] = useState({ min: 0, max: 1 });
  const [time, setTime] = useState(0);
  
  // 使用ref保存上一次更新的时间，用于节流
  const lastUpdateRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);

  // 更新图形数据
  const updatePattern = useCallback(() => {
    // 节流处理：限制更新频率
    const now = performance.now();
    if (now - lastUpdateRef.current < 50) { // 至少间隔50ms更新一次
      return;
    }
    lastUpdateRef.current = now;
    
    // 仅在动画开启时更新时间
    const newTime = animate ? time + 0.05 : time;
    const newGrid = generateGridData(width, height, config, newTime);
    const newMinMax = findMinMax(newGrid);
    
    setGrid(newGrid);
    setMinMax(newMinMax);
    if (animate) {
      setTime(newTime);
    }
  }, [width, height, config, time, animate]);

  // 初始化和配置变化时更新（不节流）
  useEffect(() => {
    // 立即更新，不节流
    const newTime = animate ? time + 0.05 : time;
    const newGrid = generateGridData(width, height, config, newTime);
    const newMinMax = findMinMax(newGrid);
    
    setGrid(newGrid);
    setMinMax(newMinMax);
    if (animate) {
      setTime(newTime);
    }
  }, [config, width, height, time, animate]);

  // 动画循环
  useEffect(() => {
    const animationLoop = () => {
      if (animate) {
        updatePattern();
      }
      animationFrameRef.current = requestAnimationFrame(animationLoop);
    };
    
    if (animate) {
      animationFrameRef.current = requestAnimationFrame(animationLoop);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, updatePattern]);

  return { grid, minMax, time, updatePattern };
}