import React from 'react';

const ResultDisplay = ({ keypairs, beginsWith, endsWith }) => {
  if (!keypairs || keypairs.length === 0) return null;
  
  console.log('Rendering result display with keypairs:', keypairs);
  
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
    <div className="w-full bg-white/50 backdrop-blur-md p-6 rounded-pastel-lg border border-aikira-primary/20 shadow-pastel-lg animate-fade-in relative overflow-hidden">
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
        <div>アドレス</div>
        <div>アイキラ-D4T4</div>
      </div>
      
      <h2 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-mix mb-3 tracking-wider text-center uppercase drop-shadow-pastel">
        Generated Addresses
      </h2>
      
      <div className="flex items-center justify-center gap-1 mb-6">
        <div className="h-px w-12 bg-aikira-primary opacity-40"></div>
        <div className="h-2 w-2 rounded-full bg-aikira-primary opacity-60"></div>
        <div className="h-px w-24 bg-gradient-primary opacity-40"></div>
        <div className="h-2 w-2 rounded-full bg-aikira-blue-pastel opacity-60"></div>
        <div className="h-px w-12 bg-aikira-blue-pastel opacity-40"></div>
      </div>
      
      <div className="flex flex-col gap-8">
        {keypairs.map((pair, index) => (
          <div key={index} className="flex flex-col gap-2 bg-white/70 backdrop-blur-sm p-5 rounded-pastel-md border border-aikira-accent/20 shadow-pastel-md relative group transition-normal">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-primary opacity-5 rounded-bl-pastel-lg"></div>
            
            <div className="text-xl font-heading font-semibold text-aikira-text mb-2 tracking-wider">
              <span className="text-aikira-primary mr-1">❀</span>
              {formatAddress(pair.address, beginsWith ? beginsWith.length : 0, endsWith ? endsWith.length : 0)}
            </div>
            
            <div className="flex flex-col space-y-4 mt-1">
              <div>
                <p className="text-xs text-aikira-text uppercase tracking-wider mb-2 font-medium flex items-center">
                  <span className="inline-block h-3 w-3 bg-aikira-primary opacity-40 rounded-full mr-2"></span>
                  Address
                  <span className="inline-block h-px flex-grow ml-2 bg-aikira-primary/20"></span>
                </p>
                <div className="flex items-center">
                  <code className="text-aikira-text font-mono text-sm break-all block p-3 bg-white/80 backdrop-blur-sm rounded-pastel-md w-full border border-aikira-primary/20 shadow-pastel-inset">
                    {pair.address}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(pair.address)}
                    className="ml-2 text-xs bg-gradient-primary text-white hover:shadow-pastel-sm px-3 py-2 rounded-pastel-md tracking-wider transition-normal flex items-center"
                  >
                    <span className="inline-block h-2 w-2 bg-white opacity-60 mr-1 rounded-full"></span>
                    Copy
                  </button>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-aikira-text uppercase tracking-wider mb-2 font-medium flex items-center">
                  <span className="inline-block h-3 w-3 bg-aikira-blue-pastel opacity-40 rounded-full mr-2"></span>
                  Private Key
                  <span className="inline-block h-px flex-grow ml-2 bg-aikira-blue-pastel/20"></span>
                </p>
                <div className="flex items-center">
                  <code className="text-aikira-text-secondary font-mono text-xs break-all block p-3 bg-white/80 backdrop-blur-sm rounded-pastel-md w-full border border-aikira-blue-pastel/20 shadow-pastel-inset">
                    {pair.secretKey}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(pair.secretKey)}
                    className="ml-2 text-xs bg-gradient-accent text-white hover:shadow-pastel-sm px-3 py-2 rounded-pastel-md tracking-wider transition-normal flex items-center"
                  >
                    <span className="inline-block h-2 w-2 bg-white opacity-60 mr-1 rounded-full"></span>
                    Copy
                  </button>
                </div>
              </div>
              
              <div className="text-xs text-aikira-text-secondary mt-2 p-3 bg-white/80 rounded-pastel-md tracking-wider backdrop-blur-sm border border-aikira-neon-green/20 relative overflow-hidden shadow-pastel-inset">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aikira-accent/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aikira-blue-pastel/30 to-transparent"></div>
                <p className="relative z-10">
                  <span className="text-aikira-error mr-1">⚠️</span>
                  SECURITY WARNING: Keep your private key secure. Anyone with access to this key can control your funds.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom decorative elements */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <div className="h-px w-8 bg-aikira-accent/40"></div>
        <div className="text-xs text-aikira-blue-pastel/70 font-mono">AIKIRA-END</div>
        <div className="h-px w-8 bg-aikira-blue-pastel/40"></div>
      </div>
    </div>
  );
};

export default ResultDisplay;