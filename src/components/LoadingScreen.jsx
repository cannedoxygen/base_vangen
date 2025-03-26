import React from 'react';
import '../styles/animations.css';

const LoadingScreen = ({ isLoading, pairsPerSec, pairCount }) => {
  if (!isLoading) return null;
  
  const formatNumber = (num) => {
    return num.toLocaleString('en-US');
  };
  
  return (
    <div className="w-full bg-white/50 backdrop-blur-md p-6 rounded-pastel-lg border border-aikira-blue-pastel/20 shadow-pastel-lg relative animate-fade-in overflow-hidden">
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-16 h-16">
        <div className="absolute top-0 left-0 w-8 h-1 bg-aikira-accent opacity-60"></div>
        <div className="absolute top-0 left-0 w-1 h-8 bg-aikira-accent opacity-60"></div>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16">
        <div className="absolute top-0 right-0 w-8 h-1 bg-aikira-blue-pastel opacity-60"></div>
        <div className="absolute top-0 right-0 w-1 h-8 bg-aikira-blue-pastel opacity-60"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-16 h-16">
        <div className="absolute bottom-0 left-0 w-8 h-1 bg-aikira-blue-pastel opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-1 h-8 bg-aikira-blue-pastel opacity-60"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16">
        <div className="absolute bottom-0 right-0 w-8 h-1 bg-aikira-accent opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-1 h-8 bg-aikira-accent opacity-60"></div>
      </div>
      
      {/* Subtle decorative elements */}
      <div className="absolute top-2 right-3 text-xs text-aikira-blue-pastel/70 font-mono">
        <div>スキャニング</div>
        <div>アイキラ-SCN</div>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-3 border-aikira-accent border-t-aikira-blue-pastel animate-spin"></div>
          <div className="w-16 h-16 rounded-full border-3 border-aikira-primary border-b-aikira-neon-blue animate-spin-slow absolute top-0 opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-primary opacity-20 blur-sm animate-pulse"></div>
          </div>
        </div>
        <p className="text-2xl font-heading font-bold text-aikira-primary ml-4 tracking-wider">Searching...</p>
      </div>
      
      <div className="text-center mt-6 w-full">
        {pairsPerSec > 0 && (
          <div className="grid grid-cols-2 gap-6 w-full">
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-pastel-md border border-aikira-primary/30 shadow-pastel-sm relative group">
              <div className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-aikira-primary opacity-40 group-hover:opacity-80 transition-normal"></div>
              <p className="text-xs text-aikira-text uppercase tracking-wider mb-1 font-medium">
                <span className="text-aikira-primary mr-1">❀</span>
                Speed
              </p>
              <p className="text-xl font-mono font-bold text-aikira-text">{formatNumber(Math.round(pairsPerSec))}/sec</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-pastel-md border border-aikira-blue-pastel/30 shadow-pastel-sm relative group">
              <div className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-aikira-blue-pastel opacity-40 group-hover:opacity-80 transition-normal"></div>
              <p className="text-xs text-aikira-text uppercase tracking-wider mb-1 font-medium">
                <span className="text-aikira-blue-pastel mr-1">❀</span>
                Total Checked
              </p>
              <p className="text-xl font-mono font-bold text-aikira-text">{formatNumber(pairCount)}</p>
            </div>
          </div>
        )}
        
        <div className="mt-5 p-3 bg-white/60 backdrop-blur-sm rounded-pastel-md border border-aikira-neon-green/20 shadow-pastel-sm">
          <div className="flex items-center mb-2">
            <div className="h-3 w-3 rounded-full bg-aikira-neon-green/60 animate-ping mr-2"></div>
            <p className="text-xs text-aikira-text uppercase tracking-wider font-medium">System Status</p>
          </div>
          <p className="text-xs text-aikira-text-secondary tracking-wider">
            Local processing active. Your keys remain secure on your device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;