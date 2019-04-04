import React from 'react';
import { create } from 'react-test-renderer';
import App from '../App';

describe('App component', () => {
  test('it matches the snapshot', () => {
    const component = create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
