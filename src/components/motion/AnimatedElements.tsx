import React from 'react';
import { motion } from 'framer-motion';
import { useMagneticButton } from '../../hooks/useGestureAnimations';

// Magnetic Button Component
interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
  type?: 'button' | 'submit' | 'reset';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  strength = 0.3,
  type = 'button'
}) => {
  const { x, y, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMagneticButton(strength);

  return (
    <motion.button
      className={`magnetic-button ${className}`}
      style={{ x, y }}
      onMouseMove={handleMouseMove as any}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.button>
  );
};

// Floating Element Component
interface FloatingElementProps {
  children: React.ReactNode;
  amplitude?: number;
  frequency?: number;
  className?: string;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({ 
  children, 
  amplitude = 10, 
  frequency = 2,
  className = ''
}) => {
  return (
    <motion.div
      className={`floating-element ${className}`}
      animate={{
        y: [0, amplitude, -amplitude, 0],
      }}
      transition={{
        duration: frequency,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Reveal on Scroll Component
interface RevealOnScrollProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ 
  children, 
  direction = 'up',
  delay = 0,
  className = ''
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 50 };
      case 'down': return { opacity: 0, y: -50 };
      case 'left': return { opacity: 0, x: -50 };
      case 'right': return { opacity: 0, x: 50 };
      default: return { opacity: 0, y: 50 };
    }
  };

  return (
    <motion.div
      className={`reveal-on-scroll ${className}`}
      initial={getInitialPosition()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// Staggered Animation Container
interface StaggeredContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggeredContainer: React.FC<StaggeredContainerProps> = ({ 
  children, 
  staggerDelay = 0.1,
  className = ''
}) => {
  return (
    <motion.div
      className={`staggered-container ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
};

// Pulse Animation Component
interface PulseProps {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

export const Pulse: React.FC<PulseProps> = ({ 
  children, 
  scale = 1.05,
  duration = 2,
  className = ''
}) => {
  return (
    <motion.div
      className={`pulse-animation ${className}`}
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Glow on Hover Component
interface GlowOnHoverProps {
  children: React.ReactNode;
  glowColor?: string;
  glowSize?: number;
  className?: string;
}

export const GlowOnHover: React.FC<GlowOnHoverProps> = ({ 
  children, 
  glowColor = 'rgba(212, 175, 55, 0.3)',
  glowSize = 20,
  className = ''
}) => {
  return (
    <motion.div
      className={`glow-on-hover ${className}`}
      whileHover={{
        boxShadow: `0 0 ${glowSize}px ${glowColor}`,
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
};
