import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimizedParticleCount, shouldAnimateParticles } from '../../utils/performance/motionPerformance';
import { particleVariants } from '../../utils/motion/animations';
import '../../styles/particles.css';

interface Particle {
  id: number;
  type: 'heart' | 'flower' | 'sparkle';
  size: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
}

const MotionParticle: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!shouldAnimateParticles()) {
      setParticles([]);
      return;
    }

    const particleCount = getOptimizedParticleCount();
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const types: ('heart' | 'flower' | 'sparkle')[] = ['heart', 'flower', 'sparkle'];
      newParticles.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        size: Math.random() * 20 + 15, // 15-35px
        left: Math.random() * 100, // 0-100% of screen width
        animationDuration: Math.random() * 10 + 15, // 15-25s
        animationDelay: Math.random() * 5, // 0-5s delay
      });
    }

    setParticles(newParticles);
  }, []);

  const getParticleEmoji = (type: string) => {
    switch (type) {
      case 'heart': return '❤️';
      case 'flower': return '✿';
      case 'sparkle': return '✨';
      default: return '✨';
    }
  };

  const getParticleClass = (type: string) => {
    switch (type) {
      case 'heart': return 'particle-heart';
      case 'flower': return 'particle-flower';
      case 'sparkle': return 'particle-sparkle';
      default: return 'particle-sparkle';
    }
  };

  return (
    <AnimatePresence>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`particle ${getParticleClass(particle.type)}`}
          variants={particleVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          style={{
            fontSize: `${particle.size}px`,
            left: `${particle.left}%`,
            animationDuration: `${particle.animationDuration}s`,
            animationDelay: `${particle.animationDelay}s`,
            '--size': `${particle.size}px`,
            '--left': `${particle.left}%`,
            '--duration': `${particle.animationDuration}s`,
            '--delay': `${particle.animationDelay}s`,
          } as React.CSSProperties}
        >
          {getParticleEmoji(particle.type)}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default MotionParticle;
