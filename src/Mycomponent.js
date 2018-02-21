import React, { Component } from 'react';
import bharatVal from './utils/env';


class Mycomponent extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    nthPlace: 0
  };


  render() {
    console.log('bharatVal : ', bharatVal)
    return (
      <React.Fragment>
        {this.state.nthPlace + 1}
        {bharatVal}
      </React.Fragment>
    );
  }
}

export default Mycomponent;
