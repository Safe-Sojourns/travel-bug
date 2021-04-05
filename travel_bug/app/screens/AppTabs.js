import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClipboardList, faMapMarkedAlt, faExclamationTriangle, faCommentDots} from '@fortawesome/free-solid-svg-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator, tabBarIcon, tabBarOptions, screenOptions} from '@react-navigation/bottom-tabs';
import Itinerary from './Itinerary.js';
import mapMain from './mapMain.js';
import EmergencyPage from './EmergencyPage.js';
import Messages from './Messages.js';

const Tabs = createBottomTabNavigator();

// <View accessible={true} style={styles.footerStyle}>
//   {/* <TouchableOpacity
//     onPress={() => {
//       navigation.navigate('WelcomeScreen');
//     }}>
//     <Text>Welcome</Text>
//   </TouchableOpacity> */}
//   <TouchableOpacity
//     onPress={() => {
//       navigation.navigate('Itinerary');
//     }}>
//     <FontAwesomeIcon
//       icon={faClipboardList}
//       size={30}
//       color={'#5B58AD'}
//       accessibilityLabel="Itinerary"
//     />
//   </TouchableOpacity>
//   <TouchableOpacity
//     onPress={() => {
//       navigation.navigate('mapMain');
//     }}>
//     <FontAwesomeIcon
//       icon={faMapMarkedAlt}
//       size={30}
//       color={'#5B58AD'}
//       accessibilityLabel="Map"
//     />
//   </TouchableOpacity>
//   <TouchableOpacity
//     onPress={() => {
//       navigation.navigate('EmergencyPage');
//     }}>
//     <FontAwesomeIcon
//       icon={faExclamationTriangle}
//       size={30}
//       color={'#5B58AD'}
//       accessibilityLabel="Emergency Contact"
//     />
//   </TouchableOpacity>
// <TouchableOpacity
//   onPress={() => {
//     navigation.navigate('Messages');
//   }}>
//   <FontAwesomeIcon
//     icon={faCommentDots}
//     size={30}
//     color={'#5B58AD'}
//     accessibilityLabel="Messages"
//   />
// </TouchableOpacity>

const AppTabs = ({navigation}) => {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({icon, size, color, accessibilityLabel}) => {
          if (route.name === 'Itinerary') {
            return (
              <FontAwesomeIcon
                icon={faClipboardList}
                size={30}
                color={'#5B58AD'}
                accessibilityLabel="Itinerary"
              />
            );
          } else if (route.name === 'Map') {
            return (
              <FontAwesomeIcon
                icon={faMapMarkedAlt}
                size={30}
                color={'#5B58AD'}
                accessibilityLabel="Map"
              />
            );
          } else if (route.name === 'Important Contacts') {
            return (
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                size={30}
                color={'#5B58AD'}
                accessibilityLabel="Important Contacts"
              />
            );
          } else if (route.name === 'Messages') {
            return (
              <FontAwesomeIcon
                icon={faCommentDots}
                size={30}
                color={'#5B58AD'}
                accessibilityLabel="Messages"
              />
            );
          }
        },
      })}>
      <Tabs.Screen name="Itinerary" component={Itinerary} />
      <Tabs.Screen name="Map" component={mapMain} />
      <Tabs.Screen name="Important Contacts" component={EmergencyPage} />
      <Tabs.Screen name="Messages" component={Messages} />
    </Tabs.Navigator>
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
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
  },
});

export default AppTabs;
