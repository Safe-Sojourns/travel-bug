import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

const Authenticate = (props) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState('');
  const {person} = props;

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    auth()
      .createUserWithEmailAndPassword(person.email, person.password)
      .then(() => {
        console.log('User signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email is invalid');
        }
        console.error(error);
      });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <SafeAreaView>
        <View>
          <Text>Login</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Welcome {user.email}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Authenticate;
