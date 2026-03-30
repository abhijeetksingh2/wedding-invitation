import React from 'react';
import { motion } from 'framer-motion';
import { getParallaxIntensity } from '../../utils/performance/motionPerformance';
import { useFloatingAnimation } from '../../hooks/useGestureAnimations';
import '../../styles/parallax.css';

const MotionParallaxBackground: React.FC = () => {
  const parallaxIntensity = getParallaxIntensity();
  
  // Floating animations for different layers
  const layer1Float = useFloatingAnimation(5, 1);
  const layer2Float = useFloatingAnimation(8, 1.5);
  const layer3Float = useFloatingAnimation(12, 2);

  if (parallaxIntensity === 0) {
    return null; // Don't render parallax if reduced motion is preferred
  }

  return (
    <div className="parallax-background">
      {/* Layer 1 - Slowest movement */}
      <motion.div 
        className="parallax-layer layer-1"
        style={{
          ...layer1Float.style,
          opacity: 0.1 * parallaxIntensity,
        }}
      >
        <motion.div 
          className="floral-pattern floral-1"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div 
          className="floral-pattern floral-2"
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Layer 2 - Medium movement */}
      <motion.div 
        className="parallax-layer layer-2"
        style={{
          ...layer2Float.style,
          opacity: 0.08 * parallaxIntensity,
        }}
      >
        <motion.div 
          className="floral-pattern floral-3"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="floral-pattern floral-4"
          animate={{
            y: [0, 20, 0],
            rotate: [180, 360],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Layer 3 - Fastest movement */}
      <motion.div 
        className="parallax-layer layer-3"
        style={{
          ...layer3Float.style,
          opacity: 0.06 * parallaxIntensity,
        }}
      >
        <motion.div 
          className="floral-pattern floral-5"
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
            rotate: [0, 270],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="floral-pattern floral-6"
          animate={{
            x: [0, -30, 0],
            y: [0, 15, 0],
            rotate: [270, 540],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default MotionParallaxBackground;
