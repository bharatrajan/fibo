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
