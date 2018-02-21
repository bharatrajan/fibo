import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import App from './App';

import bignumber from 'bignumber.js';
import { resultReducer } from './utils/reducer.js';
import { getFibo, getFiboNCache } from './utils/fiboGenerator.js';


describe('set up', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });


  it('tests jest is there or not', ()=>{
    let cb = jest.fn();
        cb.mockReturnValueOnce(true)
    let ans = cb("My val")
    console.log("cb : ", cb.mock.calls)
    expect(ans).toBeTruthy();
  })  
})

describe('Select box', () => {
  it('tests select box default value', ()=>{
    const component = shallow(<App />);
    const selectBox = component.find('select');
    expect(selectBox.node.props.defaultValue).toEqual('audi');    
  });  

  it('tests select box onChange', ()=>{
    const component = shallow(<App />);
    const selectBox = component.find('select');
    let cb = jest.fn();
    selectBox.onChange = cb;

    selectBox.simulate('change', {target : { value : 'saab'}})
    console.log("cb.mock.calls[0][0] :", cb.mock.calls)
    //expect()
  })  
})

describe('comparison', () => {
  it('should match the snapshot data 003', () => {
    const component = renderer.create(<App maami="003"></App>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match the snapshot data foo', () => {
    const component = renderer.create(<App maami="foo"></App>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });  

  it("input box placeholder='Positive integer'", () => {
    const component = shallow(<App />);
    const textBox = component.find('input');
    expect(textBox.node.props.placeholder).toEqual('Positive integer');
  });

  it('find timings with cache', () => {
    let fiboArray = [bignumber(0), bignumber(1), bignumber(1)];

    let result1 = getFiboNCache(1, fiboArray);
    let result2 = getFiboNCache(20, fiboArray);
    let result4 = getFiboNCache(50, fiboArray);
    let result3 = getFiboNCache(100, fiboArray);
    let result7 = getFiboNCache(200, fiboArray);
    let result8 = getFiboNCache(2004, fiboArray);
    let result9 = getFiboNCache(5050, fiboArray);
    let result10 = getFiboNCache(3055, fiboArray);
    let result11 = getFiboNCache(1035, fiboArray);
    let result12 = getFiboNCache(2003, fiboArray);
    let result5 = getFiboNCache(100000, fiboArray);

    expect(0).toEqual(0);
  });

  it('find timings without cache', () => {
    let fiboObj = {
      0: bignumber(0),
      1: bignumber(1),
      2: bignumber(1)
    };

    let result1 = getFibo(1, fiboObj);
    let result2 = getFibo(20, fiboObj);
    let result4 = getFibo(50, fiboObj);
    let result3 = getFibo(100, fiboObj);
    let result7 = getFibo(200, fiboObj);
    let result8 = getFibo(2004, fiboObj);
    let result9 = getFibo(5050, fiboObj);
    let result10 = getFibo(3055, fiboObj);
    let result11 = getFibo(1035, fiboObj);
    let result12 = getFibo(2003, fiboObj);
    let result5 = getFibo(100000, fiboObj);

    expect(0).toEqual(0);
  });
});

