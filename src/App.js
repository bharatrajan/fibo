import React, { Component } from 'react';
import './App.css';
import bignumber from 'bignumber.js';
import { debug } from 'util';

class App extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);    
  }

  trailingZeroFactory = {
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

  reduceResult = arr => {
    let i, result = arr[0].toString();
    for(i = 1; i < arr.length; i++){
      let numOfZerosNeeded = 14 - arr[i].toString().length;
      console.log(`numOfZerosNeeded : ${numOfZerosNeeded}, i: ${i}`);
      result += this.trailingZeroFactory[numOfZerosNeeded] + arr[i]; 
    }
    return result;
  }

  fiboArray = [bignumber(0), bignumber(1), bignumber(1)];

  state = {
    result : bignumber(0),
    isNValid : true,
    nthPlace: 0
  }

  getFibo = n => {
    if(typeof this.fiboArray[n] !== 'undefined') return this.fiboArray[n];

    for(let i = this.fiboArray.length; i<n+1; i++){ 
      this.fiboArray[i] = this.fiboArray[i-1].plus(this.fiboArray[i-2]);
    }
    console.log("this.fiboArray : ", this.fiboArray);
    return this.fiboArray[n];
  }

  onSubmit = event => {
    const nthPlace = parseInt(this.refs.inputBox.value);

    if(Number.isInteger(nthPlace) && nthPlace > 0){
      let nthFibo = this.getFibo(nthPlace);
      let result = nthFibo.c.length === 1 ? 
                   nthFibo.c[0]:
                   this.reduceResult(nthFibo.c);
      
      this.setState({
        result,
        nthPlace,   
        isNValid : true
      });
    }else{
      this.setState({
        result: bignumber(0),
        nthPlace: 0,        
        isNValid : false    
      })
    }



  };  

  render() {
    const {nthPlace, result, isNValid} = this.state;

    return (
      <div className='app'>
        <div className="input-box-wrapper">
          n = <input
                type="text"
                ref="inputBox"
                placeholder="Positive integer"/>
          
          <button className='submit-button' onClick={this.onSubmit}> Submit </button>
        </div>

        <div className='error-msg-box-wrapper'>
          {(!isNValid && 
            <span className="validityText"> Please give a positive integer </span> 
          )}      
        </div>
        
        <div className="result-box-wrapper">     
          {(nthPlace === 0 ? "" : `F(${nthPlace}) is ${result}`)}
        </div>
     </div>
    );
  }
}

export default App;
