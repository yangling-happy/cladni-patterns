import { useRef, useEffect } from 'react';

/**
 * 动画帧钩子，用于处理流畅的动画循环
 * @param callback 每帧执行的回调函数，接收时间参数
 * @param isActive 是否激活动画
 */
export function useAnimationFrame(callback: (time: number) => void, isActive: boolean = true) {
  // 保存回调函数的引用
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef(callback);

  // 更新回调函数引用
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // 动画循环函数
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      // 可以使用deltaTime参数，但现在不需要
      // const deltaTime = time - previousTimeRef.current;
      callbackRef.current(time);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  // 设置和清理动画
  useEffect(() => {
    if (isActive) {
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }
    return undefined;
  }, [isActive]);

  return {
    // 取消动画的方法
    cancel: () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    },
    // 重启动画的方法
    restart: () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      previousTimeRef.current = undefined;
      requestRef.current = requestAnimationFrame(animate);
    }
  };
}