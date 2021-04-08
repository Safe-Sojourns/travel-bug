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
import MapMain from './maps/mapMain.js';
import EmergencyPage from './EmergencyPage.js';
import Messages from './Messages.js';
import axios from 'axios';
import {format} from 'date-fns';

const Tabs = createBottomTabNavigator();

const AppTabs = ({user}) => {
  const [urgentMessage, setUrgentMessage] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [importantInfo, setImportantInfo] = useState();
  const [currentDay, setCurrentDay] = useState(formatDate(new Date()));
  const [email, setEmail] = useState();

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + (d.getDate() + 1),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  useEffect(() => {
    getImportantInfo(1);
    setEmail('aaronfink@tempmail.com');
  }, []);

  useEffect(() => {
    getEvents(1, currentDay);
  }, [currentDay]);

  const getEvents = (tripId, date) => {
    const selectedDate = formatDate(date);
    axios
      .get(`http://localhost:3001/api/events/${tripId}/${selectedDate}`)
      .then(results => setAllEvents(results.data))
      .catch(err => console.log(err));
  };

  const getImportantInfo = id => {
    axios
      .get(`http://localhost:3001/logallimportantinfo/${id}`)
      .then(results => setImportantInfo(results.data))
      .catch(err => console.log(err));
  };

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
                color={'#007AFF'}
                accessibilityLabel="Itinerary"
              />
            );
          } else if (route.name === 'Map') {
            return (
              <FontAwesomeIcon
                icon={faMapMarkedAlt}
                size={30}
                color={'#007AFF'}
                accessibilityLabel="Map"
              />
            );
          } else if (route.name === 'Important Contacts') {
            return (
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                size={30}
                color={'#007AFF'}
                accessibilityLabel="Important Contacts"
              />
            );
          } else if (route.name === 'Messages') {
            return (
              <FontAwesomeIcon
                icon={faCommentDots}
                size={30}
                color={'#007AFF'}
                accessibilityLabel="Messages"
              />
            );
          }
        },
      })}>
      <Tabs.Screen name="Itinerary">
        {props => (
          <Itinerary
            {...props}
            allEvents={allEvents}
            setCurrentDay={setCurrentDay}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen name="Map">
        {props => (
          <MapMain
            {...props}
            allEvents={allEvents}
            importantInfo={importantInfo}
          />
        )}
      </Tabs.Screen>
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
