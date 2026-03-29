import React from 'react';
import '../styles/parallax.css';

const ParallaxBackground: React.FC = () => {
  return (
    <div className="parallax-background">
      <div className="parallax-layer layer-1">
        <div className="floral-pattern floral-1"></div>
        <div className="floral-pattern floral-2"></div>
      </div>
      <div className="parallax-layer layer-2">
        <div className="floral-pattern floral-3"></div>
        <div className="floral-pattern floral-4"></div>
      </div>
      <div className="parallax-layer layer-3">
        <div className="floral-pattern floral-5"></div>
        <div className="floral-pattern floral-6"></div>
      </div>
    </div>
  );
};

export default ParallaxBackground;
