import React, { Component } from 'react';
import './App.css';
import bignumber from 'bignumber.js';
import { resultReducer } from './utils/reducer.js';
import { getFibo } from './utils/fiboGenerator.js';

/**
* @description - Simple form takes an integer (n) and
* @description - return nth Fibonacci number
*/

class App extends Component {
  /**
   * @description - Sends props to super class 'Component'
   * @description - Binds "this" inside "onSubmit"
   * @constructor
   * @param {object} props - this.props of the current component
   * @returns null
   */
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    result: bignumber(0),
    isNValid: true,
    nthPlace: 0
  };

  /**
   * @description - Validate for integer
   * @validation
   * @param {String} val - Value of input box
   * @returns Object containing the integer value of val 'nthPlace' & boolean 'isNValid'
   */
  validateInputValue = val => {
    let validationResult = {
      nthPlace: 0,
      isNValid: false
    };

    if (!val) {
      return validationResult;
    }

    const nthPlace = parseInt(val);
    // Intentionally placed == for comparing "10" == 10
    // Intentionally placed == for filtering "10rs" == 10
    if (nthPlace == val && nthPlace > 0) {
      return {
        nthPlace,
        isNValid: true
      };
    } else {
      return validationResult;
    }
  };

  /**
   * @description - Haldles submit action of button
   * @description - Call validator then calls "getFibo" function
   * @description - Updates state based on "getFibo's" result 
   * @eventListener
   * @param {object} event - click event
   * @returns null
   */
  onSubmit = event => {
    const validationResult = this.validateInputValue(this.refs.inputBox.value);

    if (validationResult.isNValid) {
      let nthFibo = getFibo(validationResult.nthPlace);
      let result =
        nthFibo.c.length === 1 ? nthFibo.c[0] : resultReducer(nthFibo.c);
      this.setState({
        result,
        ...validationResult
      });
    } else {
      this.setState({
        result: bignumber(0),
        ...validationResult
      });
    }
  };

  /**
   * @description: Template renderer
   * @param: None
   * @returns: UI template
   */
  render() {
    const { nthPlace, result, isNValid } = this.state;
    return (
      <div className="app">
        <div className="input-box-wrapper">
          n ={' '}
          <input type="text" ref="inputBox" placeholder="Positive integer" />
          <button className="submit-button" onClick={this.onSubmit}>
            {' '}Submit{' '}
          </button>
        </div>

        <div className="error-msg-box-wrapper">
          {!isNValid &&
            <span className="validityText">
              {' '}Please give a positive integer{' '}
            </span>}
        </div>

        <div className="result-box-wrapper">
          {nthPlace === 0 ? '' : `F(${nthPlace}) is ${result}`}
        </div>
      </div>
    );
  }
}

export default App;
