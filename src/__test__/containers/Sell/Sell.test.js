import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sell from '../../../containers/Sell/Sell';

Enzyme.configure({ adapter: new Adapter() });
describe('Sell component', () => {
  test('renders', () => {
    const wrapper = shallow(<Sell />);
    expect(wrapper.exists()).toBe(true);
  });
})
