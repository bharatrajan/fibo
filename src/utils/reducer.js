const trailingZeroFactory = {
    0: "",
    1: "0",
    2: "00",
    3: "000",
    4: "0000",
    5: "00000",
    6: "000000",
    7: "0000000",
    8: "00000000",
    9: "000000000",
    10: "0000000000",
    11: "00000000000",
    12: "000000000000",
    13: "0000000000000",
  }

export const resultReducer = arr => {
    let i, result = arr[0].toString();
    for(i = 1; i < arr.length; i++){
      let numOfZerosNeeded = 14 - arr[i].toString().length;
      result += trailingZeroFactory[numOfZerosNeeded] + arr[i]; 
    }
    return result;
}