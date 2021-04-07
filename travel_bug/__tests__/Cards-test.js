import React from 'react';
import renderer from 'react-test-renderer';
import Cards from '../app/screens/components/Cards.js';

jest.useFakeTimers();

const tree = renderer.create(<Cards />);

test('Cards renders correctly', () => {
  expect(tree).toMatchSnapshot();
});

test('Time exists', () => {
  const time = tree.root.findByProps({testID: 'time'}).props;
  expect(time).toBeDefined();
});

test('Activity exists', () => {
  const activity = tree.root.findByProps({testID: 'activity'}).props;
  expect(activity).toBeDefined();
});
