import React from 'react';
import { useParams } from 'react-router-dom';
import { formatGuestName } from '../utils/nameFormatter';
import ParticleSystem from './ParticleSystem';
import ParallaxBackground from './ParallaxBackground';
import '../styles/global.css';
import '../styles/invitation.css';
import '../styles/animations.css';
import '../styles/particles.css';
import '../styles/parallax.css';

const WeddingCard: React.FC = () => {
  const { guestName } = useParams<{ guestName: string }>();
  const formattedName = formatGuestName(guestName || 'Guest');

  return (
    <>
      <ParallaxBackground />
      <ParticleSystem />
      <div className="wedding-card">
        <div className="card-container animate-fade-in-scale">
        {/* Decorative top border */}
        <div className="decorative-border top animate-fade-in-up delay-200"></div>
        
        {/* Guest name */}
        <div className="guest-name animate-fade-in-up delay-300">
          Dear {formattedName}
        </div>

        {/* New invitation text below guest name */}
        <div className="invitation-subtitle animate-fade-in-up delay-400">
          With great joy, we invite you to celebrate the wedding of
        </div>

        {/* Couple names */}
        <div className="couple-names">
          <h1 className="bride-name animate-slide-in-left delay-500">Shwetaanjali Kumari</h1>
          <div className="ampersand animate-fade-in-rotate delay-600">&</div>
          <h1 className="groom-name animate-slide-in-right delay-700">Rituraj Dayal</h1>
        </div>

        {/* Wedding invitation text */}
        <div className="invitation-text">
          <p className="invitation-line animate-fade-in-up delay-800">We look forward to celebrating this beautiful day with you.</p>
          <p className="invitation-line animate-fade-in-up delay-900">Your presence will make our celebration even more special.</p>
        </div>

        {/* Date and time */}
        <div className="datetime animate-fade-in-scale delay-1100">
          <div className="date">April 21, 2026</div>
          <div className="time">7:00 PM</div>
        </div>

        {/* Decorative divider */}
        <div className="decorative-divider animate-fade-in-up delay-1200"></div>

        {/* Venue */}
        <div className="venue animate-fade-in-up delay-1300">
          <h3>Venue</h3>
          <p>Pilot Dam near Rohit International</p>
          <p>Sasaram, Rohtas, Bihar</p>
        </div>

        {/* Closing message */}
        <div className="closing animate-fade-in-up delay-1400">
          <p>Kindly join us as we celebrate love, laughter, and a lifetime of togetherness.</p>
        </div>

        {/* Decorative bottom border */}
        <div className="decorative-border bottom animate-fade-in-up delay-1500"></div>
        </div>
      </div>
    </>
  );
};

export default WeddingCard;
