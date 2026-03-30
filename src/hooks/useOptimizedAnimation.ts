import { useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  getMotionAnimationDuration, 
  getAdaptiveAnimationSettings 
} from '../utils/performance/motionPerformance';
import { isReducedMotion } from '../utils/performance';

export const useOptimizedAnimation = () => {
  const controls = useAnimation();
  const [settings, setSettings] = useState(getAdaptiveAnimationSettings());

  useEffect(() => {
    // Update settings if device capabilities change
    const handleResize = () => {
      setSettings(getAdaptiveAnimationSettings());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startAnimation = async (variant: string) => {
    if (isReducedMotion()) {
      await controls.start('visible');
      return;
    }

    switch (variant) {
      case 'entrance':
        await controls.start('visible', {
          ...settings.springConfig,
          duration: settings.duration,
        });
        break;
      case 'hover':
        await controls.start('hover', {
          type: "spring",
          stiffness: 300,
          damping: 10,
        });
        break;
      case 'exit':
        await controls.start('hidden', {
          duration: settings.duration * 0.5,
        });
        break;
      default:
        await controls.start('visible');
    }
  };

  return {
    controls,
    settings,
    startAnimation,
    shouldAnimate: !isReducedMotion(),
    particlesEnabled: settings.particlesEnabled,
    parallaxEnabled: settings.parallaxEnabled,
  };
};

export const useReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced;
};

export const usePerformanceMode = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setIsLowPerformance(fps < 30);
        frameCount = 0;
        lastTime = currentTime;
      }
      
      if (!isLowPerformance) {
        requestAnimationFrame(measureFPS);
      }
    };

    requestAnimationFrame(measureFPS);
  }, [isLowPerformance]);

  return {
    isLowPerformance,
    shouldReduceAnimations: isLowPerformance || isReducedMotion(),
    optimizedDuration: getMotionAnimationDuration(isLowPerformance ? 0.5 : 1),
  };
};
