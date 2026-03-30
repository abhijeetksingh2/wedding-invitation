import React from 'react';
import { motion } from 'framer-motion';

interface WeddingEvent {
  name: string;
  date: string;
  day: string;
}

const WeddingEvents: React.FC<{ className?: string }> = ({ className = '' }) => {
  const events: WeddingEvent[] = [
    {
      name: 'Auspicious, Tilak',
      date: '17/04/2026',
      day: 'Friday'
    },
    {
      name: 'Mehndi, Ceremony',
      date: '19/04/2026',
      day: 'Sunday'
    },
    {
      name: 'Mandap, Haldi',
      date: '21/04/2026',
      day: 'Tuesday'
    },
    {
      name: 'Auspicious, Wedding',
      date: '21/04/2026',
      day: 'Tuesday'
    }
  ];

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const eventVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 15,
      }
    }
  };

  return (
    <motion.div
      className={`wedding-events ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 
        className="events-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Wedding Events
      </motion.h3>

      <div className="events-list">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="event-item"
            variants={eventVariants}
            whileHover="hover"
          >
            <div className="event-name">
              {event.name}
            </div>
            <div className="event-details">
              <div className="event-date">{event.date}</div>
              <div className="event-day">{event.day}</div>
            </div>
            {index < events.length - 1 && (
              <div className="event-divider"></div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeddingEvents;
