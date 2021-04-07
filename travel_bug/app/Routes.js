import React, {useState, useEffect, useContext} from 'react';
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  AsyncStorage,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './navigation/AuthProvider';
import AppTabs from './screens/AppTabs.js';
import SignIn from './navigation/SignIn';

const Stack = createStackNavigator();

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

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
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

  // if (!user) {
  //   return (
  //     <NavigationContainer>
  //       <SafeAreaView>
  //         <View>
  //           <Text>Login</Text>
  //         </View>
  //       </SafeAreaView>
  //     </NavigationContainer>
  //   );
  // }

  // return (
  //   <NavigationContainer>
  //     <SafeAreaView>
  //       <View>
  //         <AppTabs />
  //       </View>
  //     </SafeAreaView>
  //   </NavigationContainer>
  // );
  console.log('user: ', user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Login" component={SignIn} />
        ) : (
          <Stack.Screen
            name="Travel Bug"
            component={AppTabs}
            options={{headerRight: () => <Button title="Logout" />}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator
  //       screenOptions={{
  //         header: () => null,
  //       }}
  //       initialRouteName="SplashScreen">
  //       <Stack.Screen name="SplashScreen" component={SplashScreenPage} />
  //       <Stack.Screen name="Login" component={SignIn} />
  //       <Stack.Screen name="AppTabs" component={AppTabs} />
  //     </Stack.Navigator>
  //     {/* {user ? <AppTabs /> : <SignIn />} */}
  //   </NavigationContainer>
  // );
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
