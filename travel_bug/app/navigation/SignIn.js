import React, {useState, useContext} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from './AuthProvider';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const SignIn = ({setUserData}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useContext(AuthContext);

  const navigation = useNavigation();

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
        source={require('../screens/maps/bug.png')}
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
          axios
            .get(`http://localhost:3001/api/users/${email}`)
            .then(results => setUserData(results.data))
            .then(login(email, password))
            .catch(err => console.log(err));
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Let's Go Traveling!</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Button
          title="I need to register first!"
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </TouchableOpacity>
    </View>
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
    color: '#007AFF',
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
    color: '#007AFF',
  },
});

export default SignIn;
