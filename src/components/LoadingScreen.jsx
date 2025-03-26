import React from 'react';
import '../styles/animations.css';

const LoadingScreen = ({ isLoading, pairsPerSec, pairCount }) => {
  if (!isLoading) return null;
  
  const formatNumber = (num) => {
    return num.toLocaleString('en-US');
  };
  
  return (
    <div className="w-full bg-black/60 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></div>
        <p className="text-xl font-bold text-blue-400 ml-3">Searching...</p>
      </div>
      
      <div className="text-center mt-4 w-full">
        {pairsPerSec > 0 && (
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-black/30 p-2 rounded">
              <p className="text-xs text-gray-400">Speed</p>
              <p className="text-lg font-mono font-bold">{formatNumber(Math.round(pairsPerSec))}/sec</p>
            </div>
            <div className="bg-black/30 p-2 rounded">
              <p className="text-xs text-gray-400">Total Checked</p>
              <p className="text-lg font-mono font-bold">{formatNumber(pairCount)}</p>
            </div>
          </div>
        )}
        <p className="text-xs text-gray-400 mt-4">All processing happens in your browser. Your keys are never sent to any server.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;