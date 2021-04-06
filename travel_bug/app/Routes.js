import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  AsyncStorage,
  Button,
  Text,
  TextInput,
  View,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AppTabs from './screens/AppTabs.js';

const Stack = createStackNavigator();

// const login = (userOjb) => {
//   return (
//     value={{
//       userStr,
//       login: () => {
//         const fakeUser = {username: 'Frodo'};
//         setUser(fakeUser);
//         AsyncStorage.setItem('user', JSON.stringify(fakeUser));
//       },
//       logout: () => {
//         AsyncStorage.removeItem('user');
//       },
//     }}>
//   );
// };

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

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
          // login();
        }}
      />
      <TextInput
        style={styles.inputField}
        onChangeText={text => setPassword(text)}
        defaultValue={password}
        placeholder="Password"
      />
    </View>
  );
};

function SplashScreenPage({navigation}) {
  setTimeout(() => {
    navigation.navigate('Login');
  }, 5000);
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('./screens/assets/globe.gif')}>
      <Text style={styles.splashscreen}>Travel Bug</Text>
    </ImageBackground>
  );
}

const Routes = ({}) => {
  // const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // check if the user is logged in or not with async function
  //   AsyncStorage.getItem('user')
  //     .then(userString => {
  //       if (userString) {
  //         // Decode it
  //         login();
  //       }
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  // if (loading) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      {user ? (
        <AppTabs />
      ) : (
        <Stack.Navigator
          screenOptions={{
            header: () => null,
          }}
          initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreenPage} />
          <Stack.Screen name="Login" component={AppTabs} />
        </Stack.Navigator>
      )}
      {/* <AppTabs /> */}
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
});

export default Routes;
