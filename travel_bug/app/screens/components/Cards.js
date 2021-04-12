import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapMain from '../maps/mapMain';
import {useNavigation} from '@react-navigation/native';

export default function CardDetails(props) {
  const navigation = useNavigation();

  function setLocation() {
    props.setCenteredLong(props.event.longitude);
    props.setCenteredLat(props.event.latitude);
    navigation.jumpTo('Map');
  }
  return (
    <React.Fragment>
      <View>
        <CollapsibleView title={<Card event={props} />} style={styles.app}>
          {props.event.photos.length > 0 ? (
            <ImageBackground
              source={{uri: `${props.event.photos[0]}`}}
              style={{width: 330, height: 140}}
            />
          ) : (
            <ImageBackground
              source={require('../assets/rome.jpg')}
              style={{width: 330, height: 140}}
            />
          )}
          <Text />
          <Text style={styles.textStyle}>{props.event.description}</Text>
          <Text />
          <TouchableOpacity onPress={() => setLocation()}>
            <FontAwesomeIcon
              icon={faMapMarkedAlt}
              size={30}
              color={'#007AFF'}
              accessibilityLabel="Map"
            />
            <Text>{'   '}</Text>
            <Text style={styles.textStyle}>{props.event.location}</Text>
            {/* </Text> */}
          </TouchableOpacity>
          <Text style={styles.textStyle}>
            {props.event.cost > 0 ? `Cost: ${props.event.cost} euros` : null}
          </Text>
          <Text style={styles.textStyle}>
            {props.event.transportation
              ? `Transport: ${props.event.transportation}`
              : null}
          </Text>
        </CollapsibleView>
      </View>
    </React.Fragment>
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
  textStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    // textAlign: 'center',
  },
});
