import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Buy from '../../../containers/Buy/Buy';

Enzyme.configure({ adapter: new Adapter() });
describe('Buy component', () => {
  test('renders', () => {
    const wrapper = shallow(<Buy />);
    expect(wrapper.exists()).toBe(true);
  });
})
