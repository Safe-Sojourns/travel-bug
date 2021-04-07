import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from './AuthProvider';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);

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
          login(email, password);
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Let's Go Traveling!</Text>
        </View>
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

export default SignIn;