import bignumber from 'bignumber.js';

export const getFiboNCache = (n, fiboStorage) => {
    let startTime = new Date().getTime();

    if(typeof fiboStorage[n] !== 'undefined'){
      let endTime = startTime - new Date().getTime();
      console.log(`F(${n}) : Time taken = ${endTime}ms`)  
      return fiboStorage[n]
    };

    for(let i = fiboStorage.length; i < n+1 ; i++){ 
        fiboStorage[i] = fiboStorage[i-1].plus(fiboStorage[i-2]);
    }

    let endTime = new Date().getTime() - startTime;
    console.log(`F(${n}) : Time taken = ${endTime}ms`)

    return fiboStorage[n];
}  

const getNearestFiboIndex = (n, fiboStorage, keys) => {
  let i , idx;
  for(i = 0; i < keys.length; i++){
    idx = parseInt(keys[i])
    if(idx > n) return parseInt(keys[i-1]);
  }
}

export const getFibo = (n, fiboStorage) => {
  let startTime = new Date().getTime();

  if(typeof fiboStorage[n] !== 'undefined'){
    let endTime = startTime - new Date().getTime();
    console.log(`F(${n}) : Time taken = ${endTime}ms`)  
    return fiboStorage[n]
  };
  
  let a,b,c,
  iterer,startVal,
  keys = Object.keys(fiboStorage),
  lastFiboN = parseInt(keys[keys.length - 1]);

  if(lastFiboN === 2){
    a = bignumber(0);
    b = bignumber(1);
    startVal = 2;    
  }

  else if(lastFiboN < n){
    a = fiboStorage[lastFiboN-1];
    b = fiboStorage[lastFiboN];
    startVal = lastFiboN + 1;
  }

  else{
    let nearestFiboIndex = getNearestFiboIndex(n, fiboStorage, keys);
    a = fiboStorage[nearestFiboIndex-1];
    b = fiboStorage[nearestFiboIndex];
    startVal = nearestFiboIndex + 1;
  }

  
  for (iterer = startVal; iterer <= n; iterer++){
      c = a.plus(b);
      a = b;
      b = c;
  }

  fiboStorage[n-1] = a;
  fiboStorage[n] = b;

  let endTime = new Date().getTime() - startTime;
  console.log(`F(${n}) : Time taken = ${endTime}ms`)
  return b;
}
