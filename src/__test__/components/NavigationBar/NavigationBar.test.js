import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationBar from '../../../components/NavigationBar/NavigationBar';

Enzyme.configure({ adapter: new Adapter() });
describe('NavigationBar component', () => {
  test('renders', () => {
    const wrapper = shallow(<NavigationBar />);
    expect(wrapper.exists()).toBe(true);
  });
})

// describe('NavigationBar component', () => {
//   test('it matches the snapshot', () => {
//     const component = renderer.create(<NavigationBar />);
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();

//     tree.props.toggleDrawer();
//     tree = component.toJSON();
//     expect(tree).topMatchSnapShot();
//   });
//   test('concats strings', () => {
//     expect('Hello'.concat(' World!')).toBe('Hello World!');
//   })
// });
