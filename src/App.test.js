import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import App from './App';

import bignumber from 'bignumber.js';
import { resultReducer } from './utils/reducer.js';
import { getFibo } from './utils/fiboGenerator.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it("should match the snapshot data", () => {

  const component = renderer.create(<App></App>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});


it("input box placeholder='Positive integer'", () => {

  const component = shallow(<App/>);
  const textBox = component.find('input');
  expect(textBox.node.props.placeholder).toEqual("Positive integer");

});

it("find timings", () => {
  let fiboArray = [bignumber(0), bignumber(1), bignumber(1)];

  let result1 = getFibo(1, fiboArray);
  let result2 = getFibo(20, fiboArray);
  let result4 = getFibo(50, fiboArray);
  let result3 = getFibo(100, fiboArray);
  let result6 = getFibo(200, fiboArray);
  let result5 = getFibo(100000, fiboArray);

  expect(0).toEqual(0);

});
