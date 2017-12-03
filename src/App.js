import React, { Component } from 'react';
import './App.css';
import bignumber from 'bignumber.js';
import { debug } from 'util';
import { resultReducer } from './utils/reducer.js';
import { getFibo } from './utils/fiboGenerator.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);    
  }

  fiboArray = [bignumber(0), bignumber(1), bignumber(1)];
  
  state = {
    result : bignumber(0),
    isNValid : true,
    nthPlace: 0
  }


  onSubmit = event => {
    const nthPlace = parseInt(this.refs.inputBox.value);

    if(Number.isInteger(nthPlace) && nthPlace > 0){

      let nthFibo = getFibo(nthPlace, this.fiboArray);
      let result = nthFibo.c.length === 1 ? 
                   nthFibo.c[0]:
                   resultReducer(nthFibo.c);
      console.log("this.fiboObj : ", this.fiboObj)
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
