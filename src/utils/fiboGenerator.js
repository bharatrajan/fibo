import bignumber from 'bignumber.js';

 export const getFibo = (n, fiboStorage) => {
    if(typeof fiboStorage[n] !== 'undefined') return fiboStorage[n];

    for(let i = fiboStorage.length; i < n+1 ; i++){ 
        fiboStorage[i] = fiboStorage[i-1].plus(fiboStorage[i-2]);
    }
    return fiboStorage[n];
  }