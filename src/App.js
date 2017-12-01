import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import bigInt from 'big-integer';

class App extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);    
  }

  fiboArray = [bigInt(0), bigInt(1), bigInt(1)];

  state = {
    result : bigInt(0),
    isNValid : true,
    nthPlace: 0
  }


  getFibo = n => {
    if(typeof this.fiboArray[n] !== 'undefined') return this.fiboArray[n];

    for(let i = this.fiboArray.length; i<n+1; i++){ 
      this.fiboArray[i] = this.fiboArray[i-1].add(this.fiboArray[i-2]);
      let str = `${this.fiboArray[i]} of ${i} is safe : ${Number.isSafeInteger(this.fiboArray[i])}`;
      console.log(str)
    }
    console.log("this.fiboArray : ", this.fiboArray);
    return this.fiboArray[n];
  }

  onSubmit = event => {
    const inputBoxVal = this.refs.inputBox.value;
    const nthPlace = parseInt(inputBoxVal);

    if(Number.isInteger(nthPlace) && nthPlace > 0){
      let nthFibo = this.getFibo(nthPlace);
      let result = nthFibo.isSmall ? nthFibo.value : nthFibo.value.reverse().join('')
      this.setState({
        result,
        nthPlace,   
        isNValid : true
      });
    }else{
      this.setState({
        result: bigInt(0),
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
          {(result == 0 ? "" : `F(${nthPlace}) is ${result}`)}
        </div>
     </div>
    );
  }
}

export default App;
