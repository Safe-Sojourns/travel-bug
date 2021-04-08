import React from 'react';
import renderer from 'react-test-renderer';
import Itinerary from '../app/screens/Itinerary.js';

jest.useFakeTimers();

const tree = renderer.create(<Itinerary />);

test('Itinerary renders correctly', () => {
  expect(tree).toMatchSnapshot();
});

test('Date exists', () => {
  const date = tree.root.findByProps({testID: 'date'}).props;
  expect(date).toBeDefined();
});

test('Card exists', () => {
  const card = tree.root.findByProps({testID: 'card'}).props;
  expect(card).toBeDefined();
});
