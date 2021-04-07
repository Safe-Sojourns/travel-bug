import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/App.js';

jest.useFakeTimers();

test('renders correctly', () => {
  const tree = renderer.create(<App />);
  expect(tree).toMatchSnapshot();
});
