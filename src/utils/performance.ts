// Performance optimization utilities for animations

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getOptimizedAnimationDuration = (baseDuration: number): number => {
  if (isReducedMotion()) return 0;
  if (isMobile()) return baseDuration * 0.7;
  return baseDuration;
};

export const getOptimizedParticleCount = (): number => {
  if (isReducedMotion()) return 0;
  if (isMobile()) return 2;
  return 5;
};

export const shouldUseGPUAcceleration = (): boolean => {
  // Check if the device supports GPU acceleration
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  return gl !== null;
};

export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function executedFunction(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Monitor frame rate and adjust animations accordingly
export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;
  private callbacks: Array<(fps: number) => void> = [];

  constructor() {
    this.startMonitoring();
  }

  private startMonitoring() {
    const measure = () => {
      this.frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= this.lastTime + 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
        this.frameCount = 0;
        this.lastTime = currentTime;
        
        this.callbacks.forEach(callback => callback(this.fps));
      }
      
      requestAnimationFrame(measure);
    };
    
    requestAnimationFrame(measure);
  }

  public onFPSUpdate(callback: (fps: number) => void) {
    this.callbacks.push(callback);
  }

  public getCurrentFPS(): number {
    return this.fps;
  }

  public isLowPerformance(): boolean {
    return this.fps < 30;
  }
}
