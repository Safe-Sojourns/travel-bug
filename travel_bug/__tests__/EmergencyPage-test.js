import React from 'react';
import renderer from 'react-test-renderer';
import EmergencyPage from '../app/screens/EmergencyPage.js';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

test('renders correctly', () => {
  const tree = renderer.create(<EmergencyPage />);
  expect(tree).toMatchSnapshot();
});
