import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Button,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './AuthProvider';
import AppTabs from './screens/AppTabs.js';

const Stack = createStackNavigator();

const Login = ({navigation}) => {
  const {login} = useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>I am a login screen</Text>
      <Button
        title="Log me in"
        onPress={() => {
          login();
        }}
      />
      <Button
        title="Go to register"
        onPress={() => {
          navigation.navigate('Register');
        }}
      />
    </View>
  );
};

const Register = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>I am a register screen</Text>
      <Button
        title="Go to login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

const Routes = ({}) => {
  const {user, login} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check if the user is logged in or not with async function
    AsyncStorage.getItem('user')
      .then(userString => {
        if (userString) {
          // Decode it
          login();
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* {user ? (
        <AppTabs />
      ) : (
        <Stack.Navigator
          screenOptions={{
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
