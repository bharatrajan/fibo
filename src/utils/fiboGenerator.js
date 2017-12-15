import bignumber from 'bignumber.js';

//============================== Method 1 : With caching ==============================
/**
  * @description - A local array to store the list of fibonacci numbers found.
  * @description - Stores all fibonacci numbers from F(0) to F(n) when F(n) is calculated.
  * @description - Lives until the session lives
  * @description - Used for computing future fibonacci numbers
  */
let fiboArr = [bignumber(0),bignumber(1),bignumber(1)]

/**
  * @description - Compute F(n) by simply adding F(n-1) & F(n-1), serially in loop at O(N)
  * @description - Stores F(0) to F(n) when F(n) is calculated into 'fiboArr'
  * @description - In future, if F(n)  - n < fiboArr.lenth - is asked, fiboArr[n] can be retrived at O(1)
  * @description - In future, if F(n + 1) is asked computation starts from F(N)
  * @utility
  * @param {integer} n - nth Fibonacci to be computed
  * @returns bignumber object carrying nth Fibonacci number
  */
export const getFiboNCache = n => {
  //If F(n) is already present in fiboArr then return fiboArr[n]
  if (typeof fiboArr[n] !== 'undefined') {
    return fiboArr[n];
  }

  //Compute F(n) by adding F(n-1) & F(n-1)
  for (let i = fiboArr.length; i < n + 1; i++) {
    fiboArr[i] = fiboArr[i - 1].plus(fiboArr[i - 2]);
  }

  return fiboArr[n];
};

/*/
  * TIME : 
  ** O(N) for new N
  ** O(1) for N if N is cached
  
  * SPACE : 
  ** stricly O(N)
/*/

//============================== Method 2 : WithOUT caching ==============================

/**
  * @description - A local storage to store the list of fibonacci numbers found.
  * @description - Lives until the session lives
  * @description - Used for computing future fibonacci numbers
  */
let fiboStorage = {
  0: bignumber(0),
  1: bignumber(1),
  2: bignumber(1)
};

/**
  * @description - After F(n) is calculated, fiboStorage is updated
  * @description - In case of F(k) is asked where  1 < K < n, this 
  * @description - function returns nearest pair of fibonacci numbers to start the computation with
  * @utility
  * @param {integer} n - nth Fibonacci to be computed
  * @param {Object} fiboStorage - carried previously found fibonacci numbers
  * @param {array} keys - Keys of fiboStorage object
  * @returns integer from where computation starts
  */
const getNearestFiboIndex = (n, fiboStorage, keys) => {
  let i, idx;
  for (i = 0; i < keys.length; i++) {
    idx = parseInt(keys[i]);
    if (idx > n) return parseInt(keys[i - 1]);
  }
};

/**
  * @description - Compute F(n) by simply adding F(n-1) & F(n-1), serially in loop at O(N)
  * @description - Stores F(n-1) and F(n) when F(n) is calculated into 'fiboStorage'
  * @description - In future, if F(n + 1) is asked computation starts from F(N)  
  * @utility
  * @param {integer} n - nth Fibonacci to be computed
  * @returns bignumber object carrying nth Fibonacci number
  */
export const getFibo = n => {
  
  //If F(n) is already present in fiboStorage then return fiboStorage.n  
  if (typeof fiboStorage[n] !== 'undefined') {
    return fiboStorage[n];
  }

  let a,
    b,
    c,
    iterer,
    startVal,
    keys = Object.keys(fiboStorage),
    biggestFiboIndex = parseInt(keys[keys.length - 1]);

  if (biggestFiboIndex === 2) {//First time user computing F(n)
    a = bignumber(0);
    b = bignumber(1);
    startVal = 2;
  } else if (biggestFiboIndex < n) {//Computing F(n) bigger than biggest Fibonacci in fiboStorage
    a = fiboStorage[biggestFiboIndex - 1];
    b = fiboStorage[biggestFiboIndex];
    startVal = biggestFiboIndex + 1;
  } else {//Computing F(n) where 1 < n < biggestFiboIndex
    let nearestFiboIndex = getNearestFiboIndex(n, fiboStorage, keys);
    a = fiboStorage[nearestFiboIndex - 1];
    b = fiboStorage[nearestFiboIndex];
    startVal = nearestFiboIndex + 1;
  }

  //Compute F(n) by adding F(n-1) & F(n-1)  
  for (iterer = startVal; iterer <= n; iterer++) {
    c = a.plus(b);
    a = b;
    b = c;
  }

  fiboStorage[n - 1] = a;
  fiboStorage[n] = b;

  return b;
};

/*/
  * TIME : 
  ** O(N) for any N

  * SPACE : 
  ** stricly O(N)
/*/


//============================== Method 3 : Partial memoization ==========================
  /**
    * @description - A local array to store the list of fibonacci numbers found.
    * @description - Stores all fibonacci numbers from F(0), F(1) , F(2), every 9th F(n) & every 10th F(n)
    * @description - Lives until the session lives
    * @description - Used for computing future fibonacci numbers
    */
  let partialCacheArr = [
    bignumber(0),
    bignumber(1),
    bignumber(1)
  ]

  /**
    * @description - Compute F(n) by simply adding F(n-1) & F(n-1), serially in loop at O(N)
    * @description - Stores F(n-1) and F(n) when F(n) is calculated into 'partialCacheArr'
    * @description - Stores every 9th F(n) & every 10th F(n), calculated into 'partialCacheArr'
    * @utility
    * @param {integer} n - nth Fibonacci to be computed
    * @returns bignumber object carrying nth Fibonacci number
    */
  export const getFiboNPartiallyCache = n => {
    
    //If F(n) is already present in partialCacheArr then return partialCacheArr[n]  
    if(partialCacheArr[n]){ 
      return partialCacheArr[n];
    }

    let a,
      b,
      c,
      iterer,
      startVal;
      
      if(n < 11){
        //F(n) where n between 3 - 10
        a = partialCacheArr[1];
        b = partialCacheArr[2];
        startVal = 3;
      
      }else if( n > partialCacheArr.length-1){
        //F(n) where n greater than biggestAvailableFiboNumber
        a = partialCacheArr[partialCacheArr.length - 2];
        b = partialCacheArr[partialCacheArr.length - 1];
        startVal = partialCacheArr.length;
      
      } else{
        //F(n) where 1 < n < biggestAvailableFiboNumber
        let nearestFiboIndex = (n - (n%10));
        a = partialCacheArr[nearestFiboIndex - 1];
        b = partialCacheArr[nearestFiboIndex];
        startVal = nearestFiboIndex + 1;
      }

      //Compute F(n) by adding F(n-1) & F(n-1)  
      for (iterer = startVal; iterer <= n; iterer++) {
        c = a.plus(b);
        a = b;
        b = c;

        if(iterer % 10 === 0){
          //Store every 9th & 10th Fibonacci number in partialCacheArr  
          partialCacheArr[iterer - 1] = a;
          partialCacheArr[iterer] = b;
        }
      }

      partialCacheArr[n - 1] = a;
      partialCacheArr[n] = b;
    
      return b;
      
};

/*/
  * TIME : 
  ** O(N) for new N
  ** O(10) for any 10 < N < cache length
  
  * SPACE : 
  ** Less than O(N)
/*/
