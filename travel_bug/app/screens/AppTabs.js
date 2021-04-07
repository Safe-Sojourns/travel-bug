import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TouchableOpacityComponent,
  TouchableWithoutFeedback,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClipboardList,
  faMapMarkedAlt,
  faExclamationTriangle,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import {NavigationContainer} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  tabBarIcon,
  tabBarOptions,
  screenOptions,
} from '@react-navigation/bottom-tabs';
import Itinerary from './Itinerary.js';
import mapMain from './maps/mapMain.js';
import EmergencyPage from './EmergencyPage.js';
import Messages from './Messages.js';

const Tabs = createBottomTabNavigator();

// TouchableOpacity required??

const AppTabs = ({user}) => {
  const [urgentMessage, setUrgentMessage] = useState(false);
  return (
    <Tabs.Navigator
      barStyle={{backgroundColor: '#3BAD87'}}
      screenOptions={({route}) => ({
        tabBarIcon: ({icon, size, color, accessibilityLabel}) => {
          if (route.name === 'Itinerary') {
            return (
              <FontAwesomeIcon
                icon={faClipboardList}
                size={30}
                color={'#ABDA9A'}
                // color={'#5B58AD'}
                accessibilityLabel="Itinerary"
              />
            );
          } else if (route.name === 'Map') {
            return (
              <FontAwesomeIcon
                icon={faMapMarkedAlt}
                size={30}
                color={'#ABDA9A'}
                // color={'#5B58AD'}
                accessibilityLabel="Map"
              />
            );
          } else if (route.name === 'Important Contacts') {
            return (
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                size={30}
                color={'#ABDA9A'}
                // color={'#5B58AD'}
                accessibilityLabel="Important Contacts"
              />
            );
          } else if (route.name === 'Messages') {
            return (
              <FontAwesomeIcon
                icon={faCommentDots}
                size={30}
                color={'#ABDA9A'}
                // color={'#5B58AD'}
                accessibilityLabel="Messages"
              />
            );
          }
        },
      })}>
      <Tabs.Screen name="Itinerary" component={Itinerary} />
      <Tabs.Screen name="Map" component={mapMain} />
      <Tabs.Screen name="Important Contacts" component={EmergencyPage} />
      <Tabs.Screen
        name="Messages"
        options={!urgentMessage ? null : {tabBarBadge: '!'}}>
        {props => (
          <Messages
            {...props}
            user={user}
            urgentMessage={urgentMessage}
            setUrgentMessage={setUrgentMessage}
            admin={'true'}
          />
        )}
      </Tabs.Screen>
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
