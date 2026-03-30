import { Transition } from 'framer-motion';

// Wedding-themed transitions
export const weddingTransitions = {
  // Romantic spring transition
  romanticSpring: {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
  
  // Gentle fade transition
  gentleFade: {
    type: "tween" as const,
    duration: 1.2,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  },
  
  // Elegant entrance transition
  elegantEntrance: {
    type: "spring" as const,
    stiffness: 80,
    damping: 20,
    velocity: 0,
  },
  
  // Elegant fade transition (alias for gentleFade)
  elegantFade: {
    type: "tween" as const,
    duration: 1.2,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  },
  
  // Quick transition for interactive elements
  quick: {
    type: "tween" as const,
    duration: 0.3,
    ease: "easeOut" as const,
  },
  
  // Smooth page transition
  pageTransition: {
    type: "tween" as const,
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.96] as const,
  },
  
  // Bouncy celebration transition
  celebration: {
    type: "spring" as const,
    stiffness: 300,
    damping: 10,
  },
  
  // Slow, elegant transition
  elegant: {
    type: "tween" as const,
    duration: 2,
    ease: [0.4, 0, 0.2, 1] as const,
  },
  
  // Glow transition
  glow: {
    type: "tween" as const,
    duration: 0.5,
    ease: "easeInOut" as const,
  }
};

// Hover transitions
export const hoverTransitions = {
  scale: {
    type: "spring" as const,
    stiffness: 400,
    damping: 10,
  },
  
  glow: {
    type: "tween" as const,
    duration: 0.3,
    ease: "easeInOut",
  },
  
  lift: {
    type: "spring" as const,
    stiffness: 300,
    damping: 15,
  }
};

// Tap/click transitions
export const tapTransitions = {
  press: {
    type: "spring" as const,
    stiffness: 600,
    damping: 10,
  },
  
  ripple: {
    type: "tween" as const,
    duration: 0.4,
    ease: "easeOut",
  }
};

// Staggered transition configuration
export const staggerTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  staggerChildren: 0.1,
  delayChildren: 0.2,
};

// Layout animation transition
export const layoutTransition: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 25,
  mass: 0.8,
};
