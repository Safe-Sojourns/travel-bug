// /**
//  * @format
//  */

// import 'react-native';
// import React from 'react';
// import App from '../App';

// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });

import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/App.js';

test('renders correctly', () => {
  const tree = renderer.create(<App />);
  expect(tree).toMatchSnapshot();
});
