import React from 'react';
import VanityAddressGenerator from './components/VanityAddressGenerator';

function App() {
  // Background image path
  const backgroundImagePath = '/vaporwave-bg.jpg';
  
  return (
    <div className="min-h-screen bg-gradient-primary text-aikira-text font-body">
      {/* Soft pastel background */}
      <div className="absolute inset-0 bg-aikira-bg opacity-70"></div>
      
      {/* Background image with blend */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-20 mix-blend-soft-light" 
        style={{ backgroundImage: `url(${backgroundImagePath})` }}
      ></div>
      
      {/* Pastel grid pattern */}
      <div className="absolute inset-0 z-0 opacity-15 bg-grid-pattern"></div>
      
      {/* Floating pastel bubbles for decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute h-16 w-16 rounded-full bg-aikira-primary opacity-20 animate-float" 
             style={{ top: '10%', left: '10%', animationDelay: '0s' }}></div>
        <div className="absolute h-32 w-32 rounded-full bg-aikira-accent opacity-15 animate-float" 
             style={{ top: '40%', left: '20%', animationDelay: '1s' }}></div>
        <div className="absolute h-24 w-24 rounded-full bg-aikira-blue-pastel opacity-20 animate-float" 
             style={{ top: '70%', left: '15%', animationDelay: '2s' }}></div>
        <div className="absolute h-28 w-28 rounded-full bg-aikira-neon-green opacity-10 animate-float" 
             style={{ top: '20%', right: '10%', animationDelay: '1.5s' }}></div>
        <div className="absolute h-20 w-20 rounded-full bg-aikira-primary opacity-15 animate-float" 
             style={{ top: '60%', right: '20%', animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Subtle circuit lines */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit-pattern" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
            <path d="M10,10 L50,10 L50,50 L90,50 L90,90 L130,90 L130,130 L170,130 L170,170" 
                  stroke="#a3e4e4" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M30,30 L70,30 L70,70 L110,70 L110,110 L150,110 L150,150 L190,150" 
                  stroke="#ffb6e1" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="50" r="3" fill="#a6ffb5" />
            <circle cx="90" cy="90" r="3" fill="#c2a3ff" />
            <circle cx="130" cy="130" r="3" fill="#a6ffb5" />
            <circle cx="170" cy="170" r="3" fill="#c2a3ff" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 pt-8">
        <VanityAddressGenerator />
      </div>
    </div>
  );
}

export default App;