import bignumber from 'bignumber.js';

export const getFibo = (n, fiboStorage) => {
    let startTime = new Date().getTime();

    if(typeof fiboStorage[n] !== 'undefined'){
      let endTime = startTime - new Date().getTime();
      console.log(`${n} : Time taken = ${endTime}`)  
      return fiboStorage[n]
    };

    for(let i = fiboStorage.length; i < n+1 ; i++){ 
        fiboStorage[i] = fiboStorage[i-1].plus(fiboStorage[i-2]);
    }

    let endTime = new Date().getTime() - startTime;
    console.log(`${n} : Time taken = ${endTime}`)

    return fiboStorage[n];
}  
