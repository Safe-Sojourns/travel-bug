import React from 'react';
import renderer from 'react-test-renderer';
import EmergencyPage from '../app/screens/EmergencyPage.js';

jest.useFakeTimers();

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

const tree = renderer.create(<EmergencyPage />);

test('Emergency renders correctly', () => {
  expect(tree).toMatchSnapshot();
});

test('Modal appears', () => {
  const button = tree.root.findByProps({testID: 'editButton'}).props;
  renderer.act(() => button.onPress());

  const modal = tree.root.findByProps({testID: 'modal'}).props;
  expect(modal).toBeDefined();
});

test('Save button appears', () => {
  const button = tree.root.findByProps({testID: 'editButton'}).props;
  renderer.act(() => button.onPress());

  const save = tree.root.findByProps({testID: 'saveButton'}).props;
  expect(save).toBeDefined();
});

test('Input appears', () => {
  const button = tree.root.findByProps({testID: 'editButton'}).props;
  renderer.act(() => button.onPress());

  const input = tree.root.findByProps({testID: 'input'}).props;
  expect(input).toBeDefined();
});

test('View appears', () => {
  const button = tree.root.findByProps({testID: 'editButton'}).props;
  renderer.act(() => button.onPress());

  const view = tree.root.findByProps({testID: 'view'}).props;
  expect(view).toBeDefined();
});

test('Emergency number exists', () => {
  const emergency = tree.root.findByProps({testID: 'emergency'}).props;
  expect(emergency).toBeDefined();
});

test('Staff number exists', () => {
  const staff = tree.root.findByProps({testID: 'staff'}).props;
  expect(staff).toBeDefined();
});

test('Additional info exists', () => {
  const addInfo = tree.root.findByProps({testID: 'addInfo'}).props;
  expect(addInfo).toBeDefined();
});
