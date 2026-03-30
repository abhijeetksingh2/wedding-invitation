import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingElement, Pulse } from './AnimatedElements';
import { weddingTransitions } from '../../utils/motion/transitions';

interface TimeUnit {
  value: number;
  label: string;
}

const CountdownTimer: React.FC = () => {
  const weddingDate = useMemo(() => new Date('2026-04-21T19:00:00'), []);
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([
    { value: 0, label: 'Days' },
    { value: 0, label: 'Hours' },
    { value: 0, label: 'Minutes' },
    { value: 0, label: 'Seconds' }
  ]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeUnits([
          { value: days, label: 'Days' },
          { value: hours, label: 'Hours' },
          { value: minutes, label: 'Minutes' },
          { value: seconds, label: 'Seconds' }
        ]);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        ...weddingTransitions.elegantEntrance,
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotate: -5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: weddingTransitions.romanticSpring,
    }
  };

  const numberVariants = {
    hidden: {
      scale: 0,
      rotate: 180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      }
    },
    change: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      }
    }
  };

  return (
    <motion.div
      className="countdown-timer"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 
        className="countdown-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={weddingTransitions.elegantFade}
      >
        Until Our Big Day
      </motion.h2>

      <FloatingElement amplitude={3} frequency={3}>
        <motion.div className="countdown-units">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="time-unit"
              variants={itemVariants}
            >
              <motion.div className="time-value-container">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={unit.value}
                    className="time-value"
                    variants={numberVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
              
              <motion.span 
                className="time-label"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {unit.label}
              </motion.span>

              {/* Decorative elements */}
              <motion.div
                className="time-unit-decoration"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                ✨
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </FloatingElement>

      <motion.div
        className="countdown-hearts"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <Pulse scale={1.2} duration={2}>
          <span className="heart-icon">💕</span>
        </Pulse>
      </motion.div>

      <motion.p
        className="countdown-message"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        Every moment brings us closer to forever
      </motion.p>
    </motion.div>
  );
};

export default CountdownTimer;
