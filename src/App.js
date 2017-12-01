import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  state = {
    result : 0
  }
  
  render() {
    const {result} = this.state;
    return (
      <div>
        <div className="inputBoxWrapper">
          n = <input
            type="text"
            placeholder="Positive integer"/>
        </div>
        <div className="resultWrapper">     
          {result}
        </div>
     </div>
    );
  }
}

export default App;
