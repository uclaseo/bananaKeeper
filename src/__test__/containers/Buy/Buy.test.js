import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Buy from '../../../containers/Buy/Buy';

Enzyme.configure({ adapter: new Adapter() });

describe('Buy component', () => {
  it('should render', () => {
    const wrapper = shallow(<Buy />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should have empty strings for default state', () => {
    const wrapper = shallow(<Buy />);
    const bananaCount = wrapper.state('bananaCount');
    const buyDate = wrapper.state('buyDate');
    const validations = wrapper.state('validations');
    const {
      bananaCountErrorMessage,
      buyDateErrorMessage,
      inputErrorMessage,
    } = validations;
    const submitMessage = wrapper.state('submitMessage');

    expect(bananaCount).toBe('');
    expect(buyDate).toBe('');
    expect(bananaCountErrorMessage).toBe('');
    expect(buyDateErrorMessage).toBe('');
    expect(inputErrorMessage).toBe('');
    expect(submitMessage).toBe('');
  });

  it('should change correct state when handleChange is triggered', () => {
    const wrapper = shallow(<Buy />);
    const instance = wrapper.instance();

    instance.handleChange('bananaCount')({ target: { value: '5' } });
    const bananaCount = wrapper.state('bananaCount');
    expect(bananaCount).toBe('5');

    instance.handleChange('buyDate')({ target: { value: '2019-04-05' } });
    const buyDate = wrapper.state('buyDate');
    expect(buyDate).toBe('2019-04-05');
  });

  it('should validate fields when handleSubmit is triggered without any input', () => {
    const wrapper = shallow(<Buy />);
    const instance = wrapper.instance();

    instance.handleSubmit({
      preventDefault: () => {},
    });
    const validations = wrapper.state('validations');
    const {
      bananaCountErrorMessage,
      buyDateErrorMessage,
      inputErrorMessage,
    } = validations;

    expect(bananaCountErrorMessage).toBe('Please enter valid number');
    expect(buyDateErrorMessage).toBe('Date should be in the form of YYYY-MM-DD');
    expect(inputErrorMessage).toBe('Please enter all required fields');
  });
});
