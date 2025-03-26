import { Wallet } from 'ethers';

// Number of addresses to check before reporting progress
const REPORT_PROGRESS_INTERVAL = 1000;

self.onmessage = async (event) => {
  const { beginsWith, endsWith, caseSensitive, numAddresses } = event.data;
  
  // Log what we're looking for (for debugging)
  console.log('Worker started with criteria:', { beginsWith, endsWith, caseSensitive, numAddresses });
  
  // Track total addresses checked
  let pairCount = 0;
  let foundCount = 0;
  
  // Main generation loop
  while (foundCount < numAddresses) {
    // Create a batch of addresses
    for (let i = 0; i < REPORT_PROGRESS_INTERVAL; i++) {
      pairCount++;
      
      try {
        // Generate random wallet
        const wallet = Wallet.createRandom();
        const address = wallet.address;
        const addressLower = address.toLowerCase();
        
        // For debugging - log every 10000th address
        if (pairCount % 10000 === 0) {
          console.log('Sample address:', address);
        }
        
        // Check if the address matches the criteria
        let isMatch = true;
        
        if (beginsWith && beginsWith.length > 0) {
          const prefix = '0x' + beginsWith.toLowerCase();
          if (caseSensitive) {
            isMatch = address.startsWith('0x' + beginsWith);
          } else {
            isMatch = addressLower.startsWith(prefix);
          }
        }
        
        if (isMatch && endsWith && endsWith.length > 0) {
          const suffix = endsWith.toLowerCase();
          if (caseSensitive) {
            isMatch = address.endsWith(endsWith);
          } else {
            isMatch = addressLower.endsWith(suffix);
          }
        }
        
        // If we found a match, post it back to the main thread
        if (isMatch) {
          console.log('Match found:', address);
          self.postMessage({
            type: 'RESULT',
            data: {
              address: address,
              secretKey: wallet.privateKey
            }
          });
          
          foundCount++;
          
          // If we've found enough addresses, break the loop
          if (foundCount >= numAddresses) {
            break;
          }
        }
      } catch (error) {
        console.error('Error in worker:', error);
      }
    }
    
    // Report progress back to the main thread
    self.postMessage({
      type: 'PROGRESS',
      data: pairCount
    });
    
    // Yield to the browser to keep UI responsive
    await new Promise(resolve => setTimeout(resolve, 0));
  }
};