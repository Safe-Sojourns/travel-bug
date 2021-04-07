/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './navigation/AuthProvider';
import AppTabs from './screens/AppTabs.js';
import SignIn from './navigation/SignIn';

const Stack = createStackNavigator();

// function SplashScreenPage({navigation}) {
//   setTimeout(() => {
//     navigation.navigate('Login');
//   }, 5000);
//   return (
//     <ImageBackground
//       style={{flex: 1}}
//       source={require('./screens/assets/globe.gif')}>
//       <Text style={styles.splashscreen}>Travel Bug</Text>
//     </ImageBackground>
//   );
// }

const Routes = () => {
  const {user, setUser, logout} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 5000);
  }, []);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  if (splash) {
    return (
      <ImageBackground
        style={{flex: 1}}
        source={require('./screens/assets/globe.gif')}>
        <Text style={styles.splashscreen}>Travel Bug</Text>
      </ImageBackground>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {user ? (
          <Stack.Screen
            name="Travel Bug"
            component={AppTabs}
            options={{
              headerRight: () => (
                <TouchableOpacity accessible={true} accessibilityLabel="logout">
                  <Button title="Logout" onPress={() => logout()} />
                </TouchableOpacity>
              ),
              headerStyle: {
                backgroundColor: '#ABDA9A',
              },
              headerTintColor: '#5B58AD',
              headerTitleStyle: {
                fontWeight: '900',
              },
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={SignIn}
            options={{header: () => null}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splashscreen: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'flex',
    top: 80,
    color: 'white',
    fontStyle: 'italic',
  },
  loginScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF9FF',
  },
  introText: {
    color: '#6EAD58',
    fontSize: 35,
    marginBottom: 50,
  },
  inputField: {
    height: 30,
    width: 200,
    margin: 12,
    paddingLeft: 5,
    borderWidth: 1,
    backgroundColor: 'white',
    color: '#5B58AD',
  },
  loadingIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    elevation: 8,
    backgroundColor: '#ABDA9A',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#5B58AD',
  },
});

export default Routes;
