import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
// import CollapsibleCard from './CollapsibleCard';
import CollapsibleView from '@eliav2/react-native-collapsible-view';

export default function CardDetails() {
  return (
    <View>
      <CollapsibleView title={<Card />} style={styles.app}>
        <ImageBackground
          source={require('../assets/rome.jpg')}
          style={{width: 320, height: 200}}
        />
        <Text />
        <Text>
          Come see the beautiful architecture. Our tour begins at the Trevi
          Fountain!
        </Text>
        <Text />
        <Text>Location</Text>
        <Text>Cost: </Text>
        <Text>Transport: </Text>
      </CollapsibleView>
    </View>
  );
}

const Card = () => {
  return (
    <View style={styles.container}>
      <Text testID="activity" style={styles.title}>
        Flight to Rome
      </Text>
      <Text style={styles.inline}>
        <Text testID="time" style={styles.time}>
          9.00am
        </Text>
        <Text>{'        '}</Text>
        <Text>{'        '}</Text>
        <Text>{'        '}</Text>
        <Text>{'     '}</Text>
        <Text>{'     '}</Text>
        <Text>{'     '}</Text>
        <Text style={styles.optional}>[OPTIONAL]</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    borderRadius: 10,
    width: 320,
    display: 'flex',
    left: 20,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 19,
  },
  container: {
    alignItems: 'stretch',
    width: 300,
    display: 'flex',
  },
  inline: {
    padding: 5,
  },
  title: {
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
  },
  time: {
    fontWeight: 'bold',
    color: 'red',
    margin: 20,
  },
  optional: {
    fontSize: 12,
    color: 'black',
  },
});
