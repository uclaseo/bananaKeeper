import React from 'react';
import { create } from 'react-test-renderer';
import NavigationBar from '../../../components/NavigationBar/NavigationBar';

describe('NavigationBar component', () => {
  test('it matches the snapshot', () => {
    const component = create(<NavigationBar />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
