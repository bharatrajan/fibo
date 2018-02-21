import React, { Component } from 'react';
import './App.css';
import bignumber from 'bignumber.js';
import { resultReducer } from './utils/reducer.js';
import { getFibo } from './utils/fiboGenerator.js';
import Mycomponent from './Mycomponent';
import {Helmet} from "react-helmet";


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
    //this.onChange = this.onChange.bind(this);
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

  onChange = (e) => {
    console.log("val : ", e.target.value)
  }


  /**
   * @description: Template renderer
   * @param: None
   * @returns: UI template
   */
  render() {
    const { nthPlace, result, isNValid } = this.state;
    let c = React.Children;
    return (
      <div className="app">
      <Helmet>
        <script> window.carApi = '/api' </script>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>      
        <Mycomponent
          id='dfad'
          ref = {(mc) => this.mc = mc}
        ></Mycomponent>

        <div>
          props = {this.props.maami}
        </div>

        <div className="input-box-wrapper">
          n ={' '}
          <input type="text" ref="inputBox" placeholder="Positive integer" />

          <select onChange={this.onChange.bind(this)} defaultValue="audi">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>

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
