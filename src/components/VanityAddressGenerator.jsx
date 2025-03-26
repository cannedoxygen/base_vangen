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
  const foundResultsRef = useRef(0); // Track found results separately from state
  
  // Initialize the worker
  useEffect(() => {
    if (typeof window !== 'undefined') {
      workerRef.current = new Worker(new URL('../workers/vanityWorker.js', import.meta.url), {
        type: 'module'
      });
      
      workerRef.current.onmessage = (event) => {
        const { type, data } = event.data;
        
        if (type === 'RESULT') {
          console.log('Result received from worker:', data);
          setResults(prev => {
            const newResults = [...prev, data];
            foundResultsRef.current = newResults.length;
            return newResults;
          });
          
          // If we've found enough addresses, stop the worker
          if (foundResultsRef.current >= numAddresses) {
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
  }, []); // Remove the dependencies to prevent recreation of worker
  
  const startWorker = () => {
    if (!isValidInputs()) return;
    
    console.log('Starting worker with criteria:', { beginsWith, endsWith, caseSensitive, numAddresses });
    
    // Reset state
    setResults([]);
    setPairCount(0);
    setPairsPerSec(0);
    pairCountRef.current = 0;
    foundResultsRef.current = 0;
    startTimeRef.current = Date.now();
    setIsLoading(true);
    
    // Start the worker
    workerRef.current.postMessage({
      beginsWith,
      endsWith,
      caseSensitive,
      numAddresses
    });
  };
  
  const stopWorker = () => {
    console.log('Stopping worker');
    if (workerRef.current) {
      workerRef.current.terminate();
      
      // Reinitialize the worker
      workerRef.current = new Worker(new URL('../workers/vanityWorker.js', import.meta.url), {
        type: 'module'
      });
      
      workerRef.current.onmessage = (event) => {
        const { type, data } = event.data;
        
        if (type === 'RESULT') {
          setResults(prev => {
            const newResults = [...prev, data];
            foundResultsRef.current = newResults.length;
            return newResults;
          });
          
          if (foundResultsRef.current >= numAddresses) {
            stopWorker();
          }
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
    console.log('Form submitted, isLoading:', isLoading);
    
    if (isLoading) {
      stopWorker();
    } else {
      startWorker();
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl flex flex-col items-center">
      <div className="w-full bg-white/50 backdrop-blur-md p-6 rounded-pastel-lg border border-aikira-primary/20 shadow-pastel-lg mb-8 relative animate-fade-in overflow-hidden">
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
        
        {/* Background decorative elements */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-aikira-primary opacity-10 blur-xl"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-aikira-accent opacity-10 blur-xl"></div>
        
        {/* Soft pastel header */}
        <div className="text-center mb-8 relative">
          <h1 className="text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-mix mb-2 drop-shadow-pastel">
            AIKIRA VANITY
          </h1>
          
          <div className="flex items-center justify-center gap-1 mb-3">
            <div className="h-px w-12 bg-aikira-primary opacity-40"></div>
            <div className="h-2 w-2 rounded-full bg-aikira-primary opacity-60"></div>
            <div className="h-px w-24 bg-gradient-primary opacity-40"></div>
            <div className="h-2 w-2 rounded-full bg-aikira-blue-pastel opacity-60"></div>
            <div className="h-px w-12 bg-aikira-blue-pastel opacity-40"></div>
          </div>
          
          <p className="text-aikira-text-secondary font-light tracking-wider text-lg">
            ｇｅｎｅｒａｔｅ ｙｏｕｒ ｄｒｅａｍ ａｄｄｒｅｓｓ
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6 relative">
            {/* Subtle divider lines */}
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-20 bg-aikira-accent/20"></div>
            <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-1 h-20 bg-aikira-blue-pastel/20"></div>
            
            <div className="relative group">
              <label className="block text-sm font-medium text-aikira-text mb-2 uppercase tracking-wider">
                <span className="text-aikira-blue-pastel mr-1">❀</span>
                Address Starts With
              </label>
              <input
                type="text"
                value={beginsWith}
                onChange={(e) => setBeginsWith(e.target.value.trim())}
                disabled={isLoading}
                placeholder="e.g. c0ffee"
                className="w-full p-3 bg-white/70 backdrop-blur-sm border border-aikira-primary/30 rounded-pastel-md 
                  text-aikira-text focus:ring-2 focus:ring-aikira-primary focus:border-transparent shadow-pastel-inset
                  transition-normal"
              />
              <div className="absolute top-9 right-3 h-2 w-2 rounded-full bg-aikira-primary opacity-0 group-hover:opacity-60 transition-normal"></div>
            </div>
            
            <div className="relative group">
              <label className="block text-sm font-medium text-aikira-text mb-2 uppercase tracking-wider">
                <span className="text-aikira-primary mr-1">❀</span>
                Address Ends With
              </label>
              <input
                type="text"
                value={endsWith}
                onChange={(e) => setEndsWith(e.target.value.trim())}
                disabled={isLoading}
                placeholder="e.g. dead"
                className="w-full p-3 bg-white/70 backdrop-blur-sm border border-aikira-blue-pastel/30 rounded-pastel-md 
                  text-aikira-text focus:ring-2 focus:ring-aikira-blue-pastel focus:border-transparent shadow-pastel-inset
                  transition-normal"
              />
              <div className="absolute top-9 right-3 h-2 w-2 rounded-full bg-aikira-blue-pastel opacity-0 group-hover:opacity-60 transition-normal"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative group">
              <label className="block text-sm font-medium text-aikira-text mb-2 uppercase tracking-wider">
                <span className="text-aikira-accent mr-1">❀</span>
                Number of Addresses
              </label>
              <select
                value={numAddresses}
                onChange={(e) => setNumAddresses(Number(e.target.value))}
                disabled={isLoading}
                className="w-full p-3 bg-white/70 backdrop-blur-sm border border-aikira-accent/30 rounded-pastel-md 
                  text-aikira-text focus:ring-2 focus:ring-aikira-accent focus:border-transparent shadow-pastel-inset
                  transition-normal"
              >
                {[1, 3, 5, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <div className="absolute top-9 right-3 h-2 w-2 rounded-full bg-aikira-accent opacity-0 group-hover:opacity-60 transition-normal"></div>
            </div>
            
            <div className="flex items-center justify-center relative group">
              <input
                type="checkbox"
                id="case-sensitive"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                disabled={isLoading}
                className="h-5 w-5 text-aikira-primary focus:ring-aikira-primary border-aikira-blue-pastel/40 rounded-pastel-sm
                  transition-normal"
              />
              <label htmlFor="case-sensitive" className="ml-3 block text-sm text-aikira-text uppercase tracking-wider">
                <span className="text-aikira-neon-blue mr-1">❀</span>
                Case Sensitive
              </label>
              <div className="absolute inset-0 rounded-pastel-md border border-aikira-primary/0 group-hover:border-aikira-primary/20 transition-normal"></div>
            </div>
          </div>
          
          <div className="flex justify-center relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-mix opacity-30"></div>
            
            <button
              type="submit"
              className={`relative py-3 px-12 rounded-pastel-md font-heading font-bold text-lg tracking-widest uppercase 
                transition-normal ${
                isLoading
                  ? 'bg-gradient-accent text-white hover:shadow-pastel-glow'
                  : 'bg-gradient-primary text-white hover:shadow-pastel-glow'
              } animate-pulse-pastel`}
            >
              <span className="absolute top-0 left-0 right-0 bottom-0 bg-white/10 rounded-pastel-md scale-0 group-hover:scale-100 transition-normal"></span>
              {isLoading ? 'S T O P' : 'G E N E R A T E'}
            </button>
          </div>
        </form>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-2 right-3 text-xs text-aikira-blue-pastel/70 font-mono">
          <div>AIKIRA-882</div>
          <div>ドリーム</div>
        </div>
        <div className="absolute bottom-2 left-3 text-xs text-aikira-accent/70 font-mono">
          <div>パステル</div>
          <div>v2.0</div>
        </div>
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
      
      <div className="mt-8 text-sm text-center text-aikira-text-secondary tracking-wider">
        <div className="flex items-center justify-center gap-1">
          <div className="h-px w-4 bg-aikira-accent/40"></div>
          <p>All processing happens in your browser</p>
          <div className="h-px w-4 bg-aikira-accent/40"></div>
        </div>
        <div className="flex items-center justify-center gap-1 mt-1">
          <div className="h-px w-4 bg-aikira-blue-pastel/40"></div>
          <p>Your keys are never sent to any server</p>
          <div className="h-px w-4 bg-aikira-blue-pastel/40"></div>
        </div>
      </div>
    </div>
  );
};

export default VanityAddressGenerator;