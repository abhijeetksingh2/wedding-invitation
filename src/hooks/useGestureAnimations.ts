import { useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export const useMagneticButton = (strength: number = 0.3) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (event.clientX - centerX) * strength;
    const deltaY = (event.clientY - centerY) * strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    controls.start({
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    controls.start({
      scale: 1,
      transition: { type: "spring", stiffness: 600, damping: 10 }
    });
  };

  return {
    x,
    y,
    controls,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    style: {
      x,
      y,
    }
  };
};

export const useSwipeGesture = (onSwipeLeft?: () => void, onSwipeRight?: () => void) => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setStartY(touch.clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    
    // Check if it's a horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }
  };

  return {
    handleTouchStart,
    handleTouchEnd,
  };
};

export const useParallaxEffect = (intensity: number = 0.5) => {
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 300], [1, 0]);
  const scale = useTransform(y, [0, 300], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      y.set(scrollY * intensity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [intensity, y]);

  return {
    y,
    opacity,
    scale,
    style: {
      y,
      opacity,
      scale,
    }
  };
};

export const useFloatingAnimation = (amplitude: number = 10, frequency: number = 2) => {
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  useEffect(() => {
    const animate = () => {
      const time = Date.now() / 1000;
      y.set(Math.sin(time * frequency) * amplitude);
      rotate.set(Math.sin(time * frequency * 0.5) * 5);
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [amplitude, frequency, y, rotate]);

  return {
    y,
    rotate,
    style: {
      y,
      rotate,
    }
  };
};

export const useMagneticCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return {
    cursorX,
    cursorY,
  };
};
