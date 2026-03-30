import { useInView, useScroll, useTransform, useAnimation, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export const useScrollTriggeredAnimation = (threshold: number = 0.1) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold 
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return { ref, controls, isInView };
};

export const useParallaxScroll = (offset: number[] = [0, 1]) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, offset, [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return {
    y,
    opacity,
    scale,
    scrollYProgress,
  };
};

export const useStaggeredScrollAnimation = (itemCount: number, staggerDelay: number = 0.1) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    if (isInView) {
      const timeouts: NodeJS.Timeout[] = [];
      
      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems(prev => [...prev, i]);
        }, i * staggerDelay * 1000);
        
        timeouts.push(timeout);
      }

      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
  }, [isInView, itemCount, staggerDelay]);

  return { ref, visibleItems };
};

export const useScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  return {
    scrollYProgress,
    progress,
  };
};

export const useRevealOnScroll = (direction: 'up' | 'down' | 'left' | 'right' = 'up') => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  const getInitialVariants = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 50 };
      case 'down':
        return { opacity: 0, y: -50 };
      case 'left':
        return { opacity: 0, x: -50 };
      case 'right':
        return { opacity: 0, x: 50 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  const variants = {
    hidden: getInitialVariants(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return {
    ref,
    controls,
    variants,
    isInView,
  };
};

export const useScrollBasedOpacity = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return {
    opacity,
    scrollY,
  };
};

// Hook for creating scroll-triggered timeline animations
export const useScrollTimeline = (keyframes: any[]) => {
  const { scrollYProgress } = useScroll();
  const [currentKeyframe, setCurrentKeyframe] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const keyframeIndex = Math.floor(latest * keyframes.length);
      setCurrentKeyframe(Math.min(keyframeIndex, keyframes.length - 1));
    });

    return () => unsubscribe();
  }, [scrollYProgress, keyframes]);

  return {
    currentKeyframe,
    scrollYProgress,
    keyframes,
  };
};
