import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AppTabs from './screens/AppTabs.js';

const Stack = createStackNavigator();

const Login = ({navigation}) => {
  return (
    <Text>Login</Text>
  );
};

const Register = ({navigation}) => {
  return (
    <Text>Register</Text>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      {/* {user ? (
        <AppTabs />
      ) : (
        <Stack.Navigator
          screenOptions= {{
            header: () => null,
          }}
          initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )} */}
      <AppTabs />
    </NavigationContainer>
  );
};

export default Routes;
