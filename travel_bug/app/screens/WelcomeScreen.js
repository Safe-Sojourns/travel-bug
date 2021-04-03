import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';

function WelcomeScreen(props) {
  const handlePress = () => console.log('Text pressed');

  return (
    <SafeAreaView style={styles.container}>
      <Text onPress={handlePress}>Hello From Gabe</Text>
      <TouchableHighlight
        onPress={() => {
          console.log('Image tapped');
        }}>
        <Image
          source={{
            width: 200,
            height: 300,
            uri: 'https://picsum.photos/200/300',
          }}
        />
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
