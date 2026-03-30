import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { formatGuestName } from '../../utils/nameFormatter';
import MotionParticle from './MotionParticle';
import MotionParallaxBackground from './MotionParallaxBackground';
import WeddingEvents from './WeddingEvents';
import CountdownTimer from './CountdownTimer';
import { 
  weddingCardVariants, 
  guestNameVariants, 
  coupleNamesVariants,
  brideNameVariants,
  groomNameVariants,
  ampersandVariants,
  invitationTextVariants,
  venueVariants,
  decorativeBorderVariants,
  containerVariants,
  ganeshImageVariants
} from '../../utils/motion/variants';
import '../../styles/global.css';
import '../../styles/invitation.css';
import '../../styles/countdown.css';

const AnimatedWeddingCard: React.FC = () => {
  const { guestName } = useParams<{ guestName: string }>();
  const formattedName = formatGuestName(guestName || 'Guest');

  return (
    <>
      <MotionParallaxBackground />
      <MotionParticle />
      
      <motion.div 
        className="wedding-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="card-container"
          variants={weddingCardVariants}
          whileHover="hover"
        >
          {/* Ganesh-Ji Image */}
          <motion.div 
            className="ganesh-ji-container"
            variants={ganeshImageVariants}
            whileHover="hover"
          >
            <img 
              src="/ganesh-ji.png" 
              alt="Ganesh Ji" 
              className="ganesh-ji-image"
            />
          </motion.div>

          {/* Decorative top border */}
          <motion.div 
            className="decorative-border top"
            variants={decorativeBorderVariants}
          />
          
          {/* Guest name */}
          <motion.div 
            className="guest-name"
            variants={guestNameVariants}
          >
            Dear {formattedName}
          </motion.div>

          {/* Invitation subtitle */}
          <motion.div 
            className="invitation-subtitle"
            variants={invitationTextVariants}
          >
            With great joy, we invite you to celebrate the wedding of
          </motion.div>

          {/* Couple names */}
          <motion.div 
            className="couple-names"
            variants={coupleNamesVariants}
          >
            <div className="bride-section">
              <motion.h1 
                className="bride-name"
                variants={brideNameVariants}
              >
                Shwetanjali Kumari
              </motion.h1>
              <motion.div 
                className="bride-parents"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.6,
                  duration: 0.8,
                  ease: "easeOut"
                }}
              >
                Daughter of Shri Ashok Kumar Singh 
              </motion.div>
              <motion.div 
                className="bride-parents"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.65,
                  duration: 0.8,
                  ease: "easeOut"
                }}
              >
                and Smt. Asha Singh
              </motion.div>
            </div>
            <motion.div 
              className="ampersand"
              variants={ampersandVariants}
            >
              &amp;
            </motion.div>
            <div className="groom-section">
              <motion.h1 
                className="groom-name"
                variants={groomNameVariants}
              >
                Rituraj Dayal
              </motion.h1>
              <motion.div 
                className="groom-parents"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.9,
                  duration: 0.8,
                  ease: "easeOut"
                }}
              >
                Son of Shri Murari Dayal Singh 
              </motion.div>
              <motion.div 
                className="groom-parents"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.95,
                  duration: 0.8,
                  ease: "easeOut"
                }}
              >
                and Smt. Raj Kumari Devi
              </motion.div>
            </div>
          </motion.div>

          {/* Wedding invitation text */}
          <motion.div 
            className="invitation-text"
            variants={invitationTextVariants}
          >
            <motion.p className="invitation-line">
              We look forward to celebrating this beautiful day with you.
            </motion.p>
            <motion.p className="invitation-line">
              Your presence will make our celebration even more special.
            </motion.p>
          </motion.div>

          {/* Wedding Events Schedule */}
          <WeddingEvents className="wedding-events-section" />

          {/* Decorative divider */}
          <motion.div 
            className="decorative-divider"
            variants={decorativeBorderVariants}
          />

          {/* Venue */}
          <motion.div 
            className="venue"
            variants={venueVariants}
            whileHover={{ 
              y: -3,
              transition: { type: "spring", stiffness: 200 }
            }}
          >
            <h3>Venue</h3>
            <p>Pilot Dam near Rohit International</p>
            <p>Sasaram, Rohtas, Bihar</p>
          </motion.div>

          {/* Closing message */}
          <motion.div 
            className="closing"
            variants={invitationTextVariants}
          >
            <p>Kindly join us as we celebrate love, laughter, and a lifetime of togetherness.</p>
          </motion.div>

          {/* Decorative bottom border */}
          <motion.div 
            className="decorative-border bottom"
            variants={decorativeBorderVariants}
          />
        </motion.div>
        
        {/* Countdown Timer */}
        <CountdownTimer />
      </motion.div>
    </>
  );
};

export default AnimatedWeddingCard;
