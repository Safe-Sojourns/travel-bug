import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

function WelcomeScreen(props) {
  return (
    <SafeAreaView>
      <View>
        <Text>Hello From Gabe</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
  }
})

export default WelcomeScreen;
