import React from 'react';
import VanityAddressGenerator from './components/VanityAddressGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-900 text-white">
      <div className="absolute inset-0 bg-cover bg-center z-0 opacity-20" style={{ backgroundImage: "url('/vaporwave-bg.jpg')" }}></div>
      <div className="relative z-10">
        <VanityAddressGenerator />
      </div>
    </div>
  );
}

export default App;