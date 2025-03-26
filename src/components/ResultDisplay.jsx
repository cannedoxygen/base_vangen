import React from 'react';

const ResultDisplay = ({ keypairs, beginsWith, endsWith }) => {
  if (!keypairs || keypairs.length === 0) return null;
  
  // Helper for address display
  const formatAddress = (address, startsLen, endsLen) => {
    const addressWithout0x = address.slice(2);
    const start = address.substring(0, 2 + Math.max(4, startsLen));
    const end = address.substring(address.length - Math.max(4, endsLen));
    return `${start}...${end}`;
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Error copying to clipboard:', err);
      });
  };
  
  return (
    <div className="w-full bg-black/50 p-4 rounded-lg backdrop-blur-sm animate-fade-in">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-4 drop-shadow-lg">
        GENERATED ADDRESSES
      </h2>
      
      <div className="flex flex-col gap-8">
        {keypairs.map((pair, index) => (
          <div key={index} className="flex flex-col gap-1 bg-black/30 p-3 rounded border border-blue-900">
            <div className="text-xl font-semibold text-blue-300">
              {formatAddress(pair.address, beginsWith.length, endsWith.length)}
            </div>
            
            <div className="flex flex-col space-y-2 mt-2">
              <div>
                <p className="text-xs text-gray-400">Address:</p>
                <div className="flex items-center">
                  <code className="text-blue-300 font-mono text-sm break-all block p-2 bg-black/40 rounded w-full">
                    {pair.address}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(pair.address)}
                    className="ml-2 text-xs bg-blue-800 hover:bg-blue-700 px-2 py-1 rounded"
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-400">Private Key:</p>
                <div className="flex items-center">
                  <code className="text-yellow-400 font-mono text-xs break-all block p-2 bg-black/40 rounded w-full">
                    {pair.secretKey}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(pair.secretKey)}
                    className="ml-2 text-xs bg-blue-800 hover:bg-blue-700 px-2 py-1 rounded"
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              <div className="text-xs text-gray-400 mt-2 p-2 bg-black/30 rounded">
                <p>⚠️ Keep your private key secure! Anyone with your private key can access your funds.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultDisplay;