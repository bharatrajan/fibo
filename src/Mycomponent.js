import React, { Component } from 'react';


class Mycomponent extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    nthPlace: 0
  };


  render() {
    
    return (
      <React.Fragment>
        {this.state.nthPlace + 1}
      </React.Fragment>
    );
  }
}

export default Mycomponent;
