import React from 'react';
import Routes from './Routes';
import {AuthProvider} from './navigation/AuthProvider';
import {Text} from 'react-native';



const App = () => {
  return (
    // <Text>Hello</Text>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
