import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyLocations from './MyLocations';
import ButtonAppBar from '../../fe/components/UI/Toolbar/Toolbar';
import Button from '@material-ui/core/Button';
configure ({adapter: new Adapter ()});

describe ('<MyLocations/>', () => {
  let wrapper;
  let toolbarWrapper;
  beforeEach (() => {
    wrapper = shallow (<MyLocations />);
    toolbarWrapper = shallow (<ButtonAppBar />);
  });

  it ('should render toolbar', () => {
    expect (wrapper.find (ButtonAppBar)).toHaveLength (1);
  });

  it ('should render one button in the toolbar', () => {
    toolbarWrapper.setProps ({title: 'New Category', categories: []});
    expect (toolbarWrapper.find (Button)).toHaveLength (1);
  });

  it ('should render more then five buttons in the toolbar', () => {
    toolbarWrapper.setProps ({categories: new Array (2)});
    expect (toolbarWrapper.find (Button)).toHaveLength (5);
  });
});
