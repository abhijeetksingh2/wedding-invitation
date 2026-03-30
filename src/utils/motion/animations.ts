import { isReducedMotion, getOptimizedAnimationDuration } from '../performance';

// Animation presets for wedding invitation
export const weddingAnimations = {
  // Romantic spring animations
  romanticSpring: {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
  
  // Gentle floating animation
  gentleFloat: {
    type: "spring" as const,
    stiffness: 50,
    damping: 20,
    mass: 2,
  },
  
  // Elegant fade animation
  elegantFade: {
    type: "tween" as const,
    duration: getOptimizedAnimationDuration(1.2),
    ease: [0.25, 0.46, 0.45, 0.94],
  },
  
  // Quick entrance animation
  quickEntrance: {
    type: "tween" as const,
    duration: getOptimizedAnimationDuration(0.8),
    ease: "easeOut",
  },
};

// Animation variants for different elements
export const createAnimationVariants = (baseDelay: number = 0) => ({
  hidden: { 
    opacity: 0, 
    y: isReducedMotion() ? 0 : 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...weddingAnimations.elegantFade,
      delay: baseDelay,
    }
  },
  hover: {
    scale: 1.05,
    transition: weddingAnimations.gentleFloat,
  }
});

// Staggered animation for multiple elements
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

// Particle animation variants
export const particleVariants = {
  initial: {
    y: -50,
    rotate: 0,
    opacity: 0,
  },
  animate: {
    y: ["-50px", "100vh"],
    rotate: [0, 360],
    opacity: [0, 0.7, 0.7, 0],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear" as const,
    }
  }
};

// Parallax animation variants
export const parallaxVariants = {
  initial: { x: 0 },
  animate: {
    x: [0, 100, 0],
    transition: {
      duration: 60,
      repeat: Infinity,
      ease: "linear",
    }
  }
};

// Typewriter effect for guest name
export const typewriterVariants = {
  hidden: { width: 0 },
  visible: {
    width: "auto",
    transition: {
      duration: 2,
      ease: "easeInOut",
    }
  }
};

// Magnetic button effect
export const magneticButtonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 10,
    }
  }
};
