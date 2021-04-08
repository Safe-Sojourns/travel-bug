import React, {useState, useEffect, useContext} from 'react';
import {
  Alert,
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

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tripIdNumber, setTripIdNumber] = useState(0);
  const [isValidPassword, setIsValidPassword] = useState(null);

  const {register} = useContext(AuthContext);

  const handleValidPassword = () => {
    if (password === confirmPassword) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };

  console.log('password: ', password);
  console.log('confirmPassword: ', confirmPassword);

  useEffect(() => {
    if (isValidPassword === true) {
      register(email, password);
      axios
        .post('http://localhost:3001/api/createuser', {
          email,
          tripIdNumber,
        })
        .then(() => {
          console.log('Successfully posted to database!');
        })
        .catch(error => {
          console.log(error);
        });
    } else if (isValidPassword === false) {
      console.log('isValid: ', isValidPassword);
      Alert.alert('Invalid Password!', 'Password does not match', [
        {text: 'Okay'},
      ]);
    }
  }, [isValidPassword]);

  return (
    <View
      style={styles.registerScreen}
      accessible={true}
      accessibilityLabel="Register screen"
      autoCapitalize="none">
      <Text
        style={styles.introText}
        accessibilityLabel="Create an account"
        accessibilityRole="text">
        Create an account
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
        keyboardType="numeric"
        placeholder="Your Trip ID Number"
        onChangeText={text => setTripIdNumber(text)}
      />
      <TextInput
        style={styles.inputField}
        autoCapitalize="none"
        onChangeText={text => setPassword(text)}
        defaultValue={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.inputField}
        autoCapitalize="none"
        onChangeText={text => setConfirmPassword(text)}
        defaultValue={confirmPassword}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Register button"
        onPress={() => {
          handleValidPassword();
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Let's Go Traveling!</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Button
          title="Take me to the login page"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  registerScreen: {
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

export default SignUp;
