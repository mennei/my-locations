import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Category from './Category';

configure ({adapter: new Adapter ()});

describe ('<Category/>', () => {
  it ('should render  <Category/> elements if localStroage conatain them', () => {
    const wrapper = shallow (<Category />);
    expect (wrapper.length === 3);
  });
});
