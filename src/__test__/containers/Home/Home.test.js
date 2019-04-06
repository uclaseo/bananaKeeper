import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../../../containers/Home/Home';

Enzyme.configure({ adapter: new Adapter() });
describe('Home component', () => {
  test('renders', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.exists()).toBe(true);
  });
})
