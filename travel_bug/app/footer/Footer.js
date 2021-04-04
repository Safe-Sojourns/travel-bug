import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClipboardList, faMapMarkedAlt, faExclamationTriangle, faCommentDots} from '@fortawesome/free-solid-svg-icons';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

const handleItinerary = (event) => {
  event.preventDefault();

  console.log('Go to itinerary screen for today');
};

const handleMaps = (event) => {
  event.preventDefault();

  console.log('Go to map screen');
};

const handleEmergency = (event) => {
  event.preventDefault();

  console.log('Go to emergency contact screen');
};

const handleMessages = (event) => {
  event.preventDefault();

  console.log('Go to messages screen');
};

const Footer = (props) => {
  return (
    <View accessible={true} style={styles.footerStyle}>
      <TouchableOpacity onPress={handleItinerary}>
        <FontAwesomeIcon
          icon={faClipboardList}
          size={30}
          color={'#5B58AD'}
          accessibilityLabel="Itinerary"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMaps}>
        <FontAwesomeIcon
          icon={faMapMarkedAlt}
          size={30}
          color={'#5B58AD'}
          accessibilityLabel="Map"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEmergency}>
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          size={30}
          color={'#5B58AD'}
          accessibilityLabel="Emergency Contact"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMessages}>
        <FontAwesomeIcon
          icon={faCommentDots}
          size={30}
          color={'#5B58AD'}
          accessibilityLabel="Messages"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '8%',
    backgroundColor: '#ABDA9A',
  },
});

export default Footer;
