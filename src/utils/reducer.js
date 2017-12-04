/**
  * @description - Number of 0 to 0's library
  */
const trailingZeroFactory = {
  0: '',
  1: '0',
  2: '00',
  3: '000',
  4: '0000',
  5: '00000',
  6: '000000',
  7: '0000000',
  8: '00000000',
  9: '000000000',
  10: '0000000000',
  11: '00000000000',
  12: '000000000000',
  13: '0000000000000'
};

/**
  * @description - Takes in a bigNumber and converts to readable string
  * @description - Binds "this" inside "onCatagoryChange"
  * @utility
  * @param {Array} arr - Array of strings that carry pieces of big integer number
  * @returns String
  */
export const resultReducer = arr => {
  let i,
    result = arr[0].toString();
  for (i = 1; i < arr.length; i++) {
    //Logic for adding trailing 0's in arrays with lenght less than 14
    let numOfZerosNeeded = 14 - arr[i].toString().length;
    result += trailingZeroFactory[numOfZerosNeeded] + arr[i];
  }
  return result;
};
