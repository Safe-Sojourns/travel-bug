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
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import Routes from '../Routes';

function WelcomeScreen(props) {
  const handlePress = () => console.log('Text pressed');

  console.log(Dimensions.get('screen'));

  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <View
        style={{
          backgroundColor: 'dodgerblue',
          width: '100%',
          height: '30%',
        }}
      />
      <Button
        title="First Click"
        onPress={() => {
          Alert.prompt('My title', 'My message', text => console.log(text));
        }}
      />
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
      <Button
        title="Click Me"
        color="orange"
        onPress={() => {
          Alert.alert('My title', 'My message', [
            {text: 'Yes', onPress: () => console.log('Yes')},
            {text: 'No', onPress: () => console.log('No')},
          ]);
        }}
      />
      <Routes />
    </SafeAreaView>
  );
}

const containerStyle = {backgroundColor: 'grey'};

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
