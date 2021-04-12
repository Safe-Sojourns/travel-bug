import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import axios from 'axios';

function WelcomeScreen(props) {

  const click = () => {
    axios.get('/')
    .catch((err) => console.log(err))
  };

  return (
    <SafeAreaView>
      <View>
        <Text onPress={click}>Hello From Gabe</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center'
  }
});

export default WelcomeScreen;
