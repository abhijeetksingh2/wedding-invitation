import React, { useEffect, useState } from 'react';
import { getOptimizedParticleCount, isReducedMotion } from '../utils/performance';
import '../styles/particles.css';

interface Particle {
  id: number;
  type: 'heart' | 'flower' | 'sparkle';
  size: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
}

const ParticleSystem: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (isReducedMotion()) {
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

  return (
    <div className="particle-system">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle particle-${particle.type}`}
          style={{
            '--size': `${particle.size}px`,
            '--left': `${particle.left}%`,
            '--duration': `${particle.animationDuration}s`,
            '--delay': `${particle.animationDelay}s`,
          } as React.CSSProperties}
        >
          {particle.type === 'heart' && '❤️'}
          {particle.type === 'flower' && '✿'}
          {particle.type === 'sparkle' && '✨'}
        </div>
      ))}
    </div>
  );
};

export default ParticleSystem;
