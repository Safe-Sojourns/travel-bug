import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Authenticate from './navigation/AuthProvider';
import AppTabs from './screens/AppTabs.js';

const Stack = createStackNavigator();

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  return (
    <View
      style={styles.loginScreen}
      accessible={true}
      accessibilityLabel="Login screen"
      autoCapitalize="none">
      <Text
        style={styles.introText}
        accessibilityLabel="Welcome to travel bug"
        accessibilityRole="text">
        Weclome to Travel Bug
      </Text>
      <Image
        accessibilityRole="image"
        accessibilityLabel="Travel Bug"
        source={require('./screens/maps/bug.png')}
      />
      <TextInput
        style={styles.inputField}
        autoCapitalize="none"
        type="email"
        defaultValue={email}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.inputField}
        autoCapitalize="none"
        onChangeText={text => setPassword(text)}
        defaultValue={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Login button"
        onPress={() => {
          setUser({email: email, password: password});
          Authenticate();
          setEmail('');
          setPassword('');
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Let's Go Traveling!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Routes = ({}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // check if the user is logged in or not with async function
    AsyncStorage.getItem('user')
      .then(userString => {
        if (userString) {
          // Decode it
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     setLoading(false);
  //   }
  // }, []);

  if (loading) {
    return (
      <View style={styles.loadingIcon}>
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
          <Stack.Screen name="Login" component={SignIn} />
        </Stack.Navigator>
      )} */}
      <AppTabs />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
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
