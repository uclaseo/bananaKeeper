import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Analytics from '../../../containers/Analytics/Analytics';

Enzyme.configure({ adapter: new Adapter() });
describe('Analytics component', () => {
  test('renders', () => {
    const wrapper = shallow(<Analytics />);
    expect(wrapper.exists()).toBe(true);
  });
})
