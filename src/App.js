import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);    
  }
  
  fiboArray = [0, 1, 1];

  state = {
    result : 0,
    isNValid : true
  }

  componentDidMount = () => {
    Number.MAX_SAFE_INTEGER = Math.pow(2, 53)-1;
  }

  getFibo = n => {
    if(typeof this.fiboArray[n] !== 'undefined') return this.fiboArray[n];

    for(let i = this.fiboArray.length; i<n+1; i++){ 
      this.fiboArray[i] = this.fiboArray[i-1] + this.fiboArray[i-2];
      let str = `${this.fiboArray[i]} of ${i} is safe : ${Number.isSafeInteger(this.fiboArray[i])}`;
      console.log(str)
    }
    console.log("this.fiboArray : ", this.fiboArray);
    return this.fiboArray[n];
  }

  onSubmit = event => {
    const inputBoxVal = this.refs.inputBox.value;
    const n = parseInt(inputBoxVal);

    if(typeof n == 'number' && n > 0){
      let result = this.getFibo(n);
      this.setState({
        result,
        isNValid : true
      });
    }else{
      this.setState({
        isNValid : false    
      })
    }



  };  

  render() {
    const {result, isNValid} = this.state;
    return (
      <div>
        <div className="inputBoxWrapper">
          n = <input
                type="text"
                ref="inputBox"
                placeholder="Positive integer"/>
          {(!isNValid && 
            <span className="validityText"> Please give a positive integer </span> 
          )}      
        </div>
        
        <div className="buttonBoxWrapper">
          <button onClick={this.onSubmit}> GO </button>
        </div>  

        <div className="resultWrapper">     
          {(result == 0 ? "" : result)}
        </div>
     </div>
    );
  }
}

export default App;
