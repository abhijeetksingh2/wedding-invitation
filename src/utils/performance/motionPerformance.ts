import { isMobile, isReducedMotion, shouldUseGPUAcceleration } from '../performance';

// Motion-specific performance utilities
export const getMotionAnimationDuration = (baseDuration: number): number => {
  if (isReducedMotion()) return 0;
  if (isMobile()) return baseDuration * 0.7;
  return baseDuration;
};

export const getMotionSpringConfig = (baseStiffness: number = 100) => {
  if (isReducedMotion()) {
    return {
      type: "tween" as const,
      duration: 0,
      ease: "linear" as const,
    };
  }
  
  if (isMobile()) {
    return {
      type: "spring" as const,
      stiffness: baseStiffness * 0.8,
      damping: 20,
      mass: 1,
    };
  }
  
  return {
    type: "spring" as const,
    stiffness: baseStiffness,
    damping: 15,
    mass: 1,
  };
};

export const shouldAnimateParticles = (): boolean => {
  return !isReducedMotion() && !isMobile();
};

export const getOptimizedParticleCount = (): number => {
  if (isReducedMotion()) return 0;
  if (isMobile()) return 3;
  return 8;
};

export const getParallaxIntensity = (): number => {
  if (isReducedMotion()) return 0;
  if (isMobile()) return 0.3;
  return 1;
};

// GPU acceleration utilities
export const getGPUTransform = (transform: string) => {
  if (shouldUseGPUAcceleration()) {
    return `translateZ(0) ${transform}`;
  }
  return transform;
};

// Performance monitoring for animations
export class MotionPerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;
  private callbacks: Array<(fps: number) => void> = [];
  private isMonitoring = false;

  constructor() {
    this.startMonitoring();
  }

  private startMonitoring() {
    if (this.isMonitoring) return;
    this.isMonitoring = true;

    const measure = () => {
      if (!this.isMonitoring) return;
      
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

  public stopMonitoring() {
    this.isMonitoring = false;
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

  public getOptimizedSettings() {
    const lowPerf = this.isLowPerformance();
    return {
      reducedParticles: lowPerf || isMobile(),
      shorterAnimations: lowPerf,
      disabledParallax: lowPerf,
      simplifiedTransitions: lowPerf,
    };
  }
}

// Adaptive animation settings
export const getAdaptiveAnimationSettings = () => {
  const settings = {
    duration: getMotionAnimationDuration(1),
    springConfig: getMotionSpringConfig(),
    particlesEnabled: shouldAnimateParticles(),
    parallaxEnabled: getParallaxIntensity() > 0,
    gpuAcceleration: shouldUseGPUAcceleration(),
  };

  return settings;
};

// Debounced animation trigger for performance
export const debounceAnimation = (func: Function, wait: number) => {
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

// Throttled scroll handler for parallax
export const throttleScroll = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function executedFunction(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
