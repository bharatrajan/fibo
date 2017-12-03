import bignumber from 'bignumber.js';

export const getFiboNCache = (n, fiboStorage) => {
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


export const getFibo = (n, fiboStorage) => {
  let startTime = new Date().getTime();

  if(typeof fiboStorage[n] !== 'undefined'){
    let endTime = startTime - new Date().getTime();
    console.log(`${n} : Time taken = ${endTime}`)  
    return fiboStorage[n]
  };
  
  let a,b,c,iterer,startVal;

  if(fiboStorage.length === 3){
    a = bignumber(0);
    b = bignumber(1);
    startVal = 2;    
  }else if(fiboStorage.length < n){
    a = fiboStorage[fiboStorage.length-2];
    b = fiboStorage[fiboStorage.length-1];
    startVal = fiboStorage.length;
  }else{
    let iterer2 = n;
    while(!fiboStorage[iterer2]){
      iterer2--;
    }
    a = fiboStorage[iterer2-1];
    b = fiboStorage[iterer2];
    startVal = iterer2 + 1;
  }

  
  for (iterer = startVal; iterer <= n; iterer++){
      c = a.plus(b);
      a = b;
      b = c;
  }

  fiboStorage[n-1] = a;
  fiboStorage[n] = b;

  let endTime = new Date().getTime() - startTime;
  console.log(`${n} : Time taken = ${endTime}`)
  return b;
}
