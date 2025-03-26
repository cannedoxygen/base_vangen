import React, { useState, useEffect, useRef } from 'react';
import LoadingScreen from './LoadingScreen';
import ResultDisplay from './ResultDisplay';

const VanityAddressGenerator = () => {
  const [beginsWith, setBeginsWith] = useState('');
  const [endsWith, setEndsWith] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [numAddresses, setNumAddresses] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [pairsPerSec, setPairsPerSec] = useState(0);
  const [pairCount, setPairCount] = useState(0);
  
  const workerRef = useRef(null);
  const startTimeRef = useRef(null);
  const pairCountRef = useRef(0);
  
  // Initialize the worker
  useEffect(() => {
    if (typeof window !== 'undefined') {
      workerRef.current = new Worker(new URL('../workers/vanityWorker.js', import.meta.url), {
        type: 'module'
      });
      
      workerRef.current.onmessage = (event) => {
        const { type, data } = event.data;
        
        if (type === 'RESULT') {
          setResults(prev => [...prev, data]);
          
          // If we've found enough addresses, stop the worker
          if (results.length + 1 >= numAddresses) {
            stopWorker();
          }
        } else if (type === 'PROGRESS') {
          pairCountRef.current = data;
          setPairCount(data);
          
          // Calculate pairs per second
          if (startTimeRef.current) {
            const elapsedSeconds = (Date.now() - startTimeRef.current) / 1000;
            if (elapsedSeconds > 0) {
              setPairsPerSec(pairCountRef.current / elapsedSeconds);
            }
          }
        }
      };
    }
    
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [results, numAddresses]);
  
  const startWorker = () => {
    if (!isValidInputs()) return;
    
    // Reset state
    setResults([]);
    setPairCount(0);
    setPairsPerSec(0);
    pairCountRef.current = 0;
    startTimeRef.current = Date.now();
    setIsLoading(true);
    
    // Start the worker
    workerRef.current.postMessage({
      beginsWith: beginsWith.toLowerCase(),
      endsWith: endsWith.toLowerCase(),
      caseSensitive,
      numAddresses
    });
  };
  
  const stopWorker = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
      
      // Reinitialize the worker
      workerRef.current = new Worker(new URL('../workers/vanityWorker.js', import.meta.url), {
        type: 'module'
      });
      
      workerRef.current.onmessage = (event) => {
        const { type, data } = event.data;
        
        if (type === 'RESULT') {
          setResults(prev => [...prev, data]);
        } else if (type === 'PROGRESS') {
          pairCountRef.current = data;
          setPairCount(data);
          
          if (startTimeRef.current) {
            const elapsedSeconds = (Date.now() - startTimeRef.current) / 1000;
            if (elapsedSeconds > 0) {
              setPairsPerSec(pairCountRef.current / elapsedSeconds);
            }
          }
        }
      };
    }
    
    setIsLoading(false);
  };
  
  const isValidInputs = () => {
    // Check if beginsWith or endsWith contains invalid characters
    const validHexChars = /^[0-9a-fA-F]*$/;
    
    if (beginsWith && !validHexChars.test(beginsWith)) {
      alert('Prefix must contain only hexadecimal characters (0-9, a-f)');
      return false;
    }
    
    if (endsWith && !validHexChars.test(endsWith)) {
      alert('Suffix must contain only hexadecimal characters (0-9, a-f)');
      return false;
    }
    
    // Check if lengths are too long
    if ((beginsWith && beginsWith.length > 16) || (endsWith && endsWith.length > 16)) {
      alert('Prefix or suffix should be 16 characters or less for reasonable generation time');
      return false;
    }
    
    // At least one criteria must be specified
    if (!beginsWith && !endsWith) {
      alert('Please specify at least a prefix or suffix');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLoading) {
      stopWorker();
    } else {
      startWorker();
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl flex flex-col items-center">
      <div className="w-full bg-blue-600/10 backdrop-blur p-6 rounded-xl border border-blue-900/50 shadow-lg mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
            Base Vanity Address Generator
          </h1>
          <p className="text-blue-300 mt-2">
            Create Ethereum addresses with custom prefixes or suffixes
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Address Starts With (after 0x)
              </label>
              <input
                type="text"
                value={beginsWith}
                onChange={(e) => setBeginsWith(e.target.value.trim())}
                disabled={isLoading}
                placeholder="e.g. c0ffee"
                className="w-full p-2 bg-black/40 border border-blue-900 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Address Ends With
              </label>
              <input
                type="text"
                value={endsWith}
                onChange={(e) => setEndsWith(e.target.value.trim())}
                disabled={isLoading}
                placeholder="e.g. dead"
                className="w-full p-2 bg-black/40 border border-blue-900 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Number of Addresses
              </label>
              <select
                value={numAddresses}
                onChange={(e) => setNumAddresses(Number(e.target.value))}
                disabled={isLoading}
                className="w-full p-2 bg-black/40 border border-blue-900 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[1, 3, 5, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="case-sensitive"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                disabled={isLoading}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-blue-900 rounded"
              />
              <label htmlFor="case-sensitive" className="ml-2 block text-sm text-blue-300">
                Case Sensitive
              </label>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              className={`py-2 px-8 rounded-lg font-bold transition-all shadow-lg ${
                isLoading
                  ? 'bg-red-700 hover:bg-red-600 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white'
              } animate-pulse-blue`}
            >
              {isLoading ? 'Stop Generation' : 'Generate Address'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="w-full space-y-6">
        <LoadingScreen
          isLoading={isLoading}
          pairsPerSec={pairsPerSec}
          pairCount={pairCount}
        />
        
        <ResultDisplay
          keypairs={results}
          beginsWith={beginsWith}
          endsWith={endsWith}
        />
      </div>
      
      <div className="mt-8 text-sm text-center text-blue-300/70">
        <p>This tool generates addresses locally in your browser.</p>
        <p>Your private keys are never sent to any server.</p>
      </div>
    </div>
  );
};

export default VanityAddressGenerator;