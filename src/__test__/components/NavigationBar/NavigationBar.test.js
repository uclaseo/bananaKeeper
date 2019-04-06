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
  test('renders', () => {
    const wrapper = shallow(<NavigationBar />);
    expect(wrapper.exists()).toBe(true);
  });

  test('has one menu button', () => {
    const wrapper = shallow(<NavigationBar />);
    const menuButton = wrapper.find(IconButton);
    expect(menuButton.length).toBe(1);
  });

  test('toggles Drawer when IconButton is clicked', () => {
    const wrapper = shallow(<NavigationBar />);
    const menuButton = wrapper.find(IconButton);
    menuButton.simulate('click');
    const drawer = wrapper.find(Drawer);
    expect(drawer.props().open).toEqual(true);
  });

  test('toggles Drawer when IconButton is clicked multiple times', () => {
    const wrapper = shallow(<NavigationBar />);
    const menuButton = wrapper.find(IconButton);
    menuButton.simulate('click');
    menuButton.simulate('click');
    const drawer = wrapper.find(Drawer);
    expect(drawer.props().open).toEqual(false);
  });
});
