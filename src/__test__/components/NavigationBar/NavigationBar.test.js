import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  IconButton,
  Drawer,
} from '@material-ui/core';
import NavigationBar from '../../../components/NavigationBar/NavigationBar';

Enzyme.configure({ adapter: new Adapter() });

describe('NavigationBar component', () => {
  it('should render', () => {
    const wrapper = shallow(<NavigationBar />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should have one IconButton', () => {
    const wrapper = shallow(<NavigationBar />);
    const menuButton = wrapper.find(IconButton);
    expect(menuButton.length).toBe(1);
  });

  it('should toggle open state when IconButton is clicked', () => {
    const wrapper = shallow(<NavigationBar />);
    const menuButton = wrapper.find(IconButton);
    menuButton.simulate('click');
    const drawer = wrapper.find(Drawer);
    expect(drawer.props().open).toEqual(true);
  });

  it('should toggle open state when IconButton is clicked multiple times', () => {
    const wrapper = shallow(<NavigationBar />);
    const menuButton = wrapper.find(IconButton);
    menuButton.simulate('click');
    menuButton.simulate('click');
    const drawer = wrapper.find(Drawer);
    expect(drawer.props().open).toEqual(false);
  });
});
