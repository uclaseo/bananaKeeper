import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../../../containers/Home/Home';

Enzyme.configure({ adapter: new Adapter() });
describe('Home component', () => {
  it('should render', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should have one div', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('div').length).toBe(1);
  });
});
