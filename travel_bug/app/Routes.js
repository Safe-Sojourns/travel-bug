import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StyleSheet,
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
    <View style={styles.loginScreen}>
      <TextInput
        style={styles.inputField}
        onChangeText={text => setEmail(text)}
        defaultValue={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.inputField}
        onChangeText={text => setPassword(text)}
        defaultValue={password}
        placeholder="Password"
      />
      <Button
        title="Log me in"
        onPress={() => {
          // login(user);
          setUser({email: email, password: password});
        }}
      />
    </View>
  );
};

const Routes = ({}) => {
  const [loading, setLoading] = useState(true);
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
      <View style={styles.loadingIcon}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <AppTabs />
      ) : (
        <Stack.Navigator
          screenOptions={{
            header: () => null,
          }}
          initialRouteName="Login">
          <Stack.Screen name="Login" component={SignIn} />
        </Stack.Navigator>
      )}
      {/* <AppTabs /> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    height: 30,
    width: 200,
    margin: 12,
    borderWidth: 1,
  },
  loadingIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Routes;
