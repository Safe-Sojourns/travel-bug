import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import CollapsibleView from '@eliav2/react-native-collapsible-view';

export default function CardDetails(event) {
  return (
    <View>
      <CollapsibleView title={<Card event={event} />} style={styles.app}>
        <ImageBackground
          source={{uri: `${event.event.photos[0]}`}}
          style={{width: 320, height: 170}}
        />
        <Text />
        <Text>{event.event.description}</Text>
        <Text />
        <Text>{event.event.location}</Text>
        <Text>
          {event.event.cost > 0 ? `Cost: ${event.event.cost} euros` : null}
        </Text>
        <Text>
          {event.event.transportation
            ? `Transport: ${event.event.transportation}`
            : null}
        </Text>
      </CollapsibleView>
    </View>
  );
}

const Card = event => {
  return (
    <View style={styles.container}>
      <Text testID="activity" style={styles.title}>
        {event.event.event.event_name}
      </Text>
      <Text style={styles.inline}>
        <Text testID="time" style={styles.time}>
          {event.event.event.start_time.slice(0, 2) >= 12
            ? `${event.event.event.start_time}pm`
            : `${event.event.event.start_time}am`}
        </Text>
        <Text>{'        '}</Text>
        <Text>{'        '}</Text>
        <Text>{'        '}</Text>
        <Text>{'     '}</Text>
        <Text>{'     '}</Text>
        <Text>{'     '}</Text>
        <Text style={styles.optional}>
          {!event.event.event.mandatory ? '[OPTIONAL]' : null}
        </Text>
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
    backgroundColor: 'white',
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
