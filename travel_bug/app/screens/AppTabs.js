import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClipboardList,
  faMapMarkedAlt,
  faExclamationTriangle,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Itinerary from './Itinerary.js';
import mapMain from './maps/mapMain.js';
import EmergencyPage from './EmergencyPage.js';
import Messages from './Messages.js';
import axios from 'axios';

const Tabs = createBottomTabNavigator();

// TouchableOpacity required??

const AppTabs = ({user}) => {
  const [urgentMessage, setUrgentMessage] = useState(false);
  const [pastMessages, setPastMessages] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/logallmessages')
      .then(({data}) => {
        setPastMessages(data.messages);
        data.criticalInfo.map(criticalMessage => {
          if (
            criticalMessage.seen_by_user_email.indexOf('lucipak@tempmail.com') <
            0
          ) {
            setUrgentMessage(true);
          } else {
            return;
          }
        });
      })
      .catch(err => console.log(err));
  }, [urgentMessage]);

  return (
    <Tabs.Navigator
      tabBarOptions={{style: {backgroundColor: '#ABDA9A', paddingTop: 5}}}
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
      <Tabs.Screen
        name="Messages"
        options={!urgentMessage ? null : {tabBarBadge: '!'}}>
        {props => (
          <Messages
            {...props}
            user={'lucipak@tempmail.com'}
            urgentMessage={urgentMessage}
            setUrgentMessage={setUrgentMessage}
            admin={'true'}
            pastMessages={pastMessages}
          />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default AppTabs;
