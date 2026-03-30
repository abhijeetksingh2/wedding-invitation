import { Variants } from 'framer-motion';
import { isReducedMotion } from '../performance';

// Wedding card entrance variants
export const weddingCardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: isReducedMotion() ? 1 : 0.9,
    y: isReducedMotion() ? 0 : 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: isReducedMotion() ? 0 : 1.5,
    }
  },
  hover: {
    y: -5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    }
  }
};

// Guest name reveal variants
export const guestNameVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      delay: 0.3,
    }
  }
};

// Couple names entrance variants
export const coupleNamesVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      delay: 0.5,
    }
  }
};

// Bride name slide-in variants
export const brideNameVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
    rotate: -5,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.7,
    }
  }
};

// Groom name slide-in variants
export const groomNameVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 100,
    rotate: 5,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.9,
    }
  }
};

// Ampersand animation variants
export const ampersandVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: -180,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.8,
    }
  }
};

// Invitation text variants
export const invitationTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 20,
      delay: 1.3,
    }
  }
};

// Date and time variants
export const dateTimeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
      delay: 1.3,
    }
  }
};

// Venue variants
export const venueVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      delay: 1.7,
    }
  }
};

// Decorative border variants
export const decorativeBorderVariants: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.2,
    }
  }
};

// Container stagger variants
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};
