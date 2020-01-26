import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Category from './Category';
import Loaction from './Location';

configure ({adapter: new Adapter ()});

describe ('<Category/>', () => {
  it ('should render  <Location/> and one <Category/> element', () => {
    const wrapper = shallow (<Loaction />);
    expect (wrapper.find (Category)).toHaveLength (1);
  });
});
