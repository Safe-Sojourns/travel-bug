import React, {useState, useEffect, useContext} from 'react';
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
import {AuthContext} from '../navigation/AuthProvider';

const Tabs = createBottomTabNavigator();

const AppTabs = () => {
  const {user} = useContext(AuthContext);
  const [urgentMessage, setUrgentMessage] = useState(false);
  const [allEvents, setAllEvents] = useState();
  const [importantInfo, setImportantInfo] = useState();
  const [currentDay, setCurrentDay] = useState();
  const [userData, setUserData] = useState();
  const [email, setEmail] = useState();
  const [pastMessages, setPastMessages] = useState([]);

  const date = new Date();
  const formattedDate = format(date, 'yyyy-MM-dd');

  useEffect(() => {
    getImportantInfo(1);
    getEvents(1, currentDay);
    setCurrentDay(formattedDate);
    setEmail(user.email);
  }, [email]);

  useEffect(() => {
    getEvents(1, currentDay);
  }, [currentDay]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/logallmessages/1')
      .then(({data}) => {
        setPastMessages(data.messages);
        data.criticalInfo.map(criticalMessage => {
          if (criticalMessage.seen_by_user_email.indexOf(email) < 0) {
            setUrgentMessage(true);
          } else {
            return;
          }
        });
      })
      .catch(err => console.log(err));
  }, [urgentMessage, email]);

  const getEvents = (tripId, date) => {
    axios
      .get(`http://localhost:3001/api/events/${tripId}/${'2021-04-09'}`)
      .then(results => setAllEvents(results.data))
      .catch(err => console.log(err));
  };

  const getImportantInfo = id => {
    axios
      .get(`http://localhost:3001/logallimportantinfo/${id}`)
      .then(results => setImportantInfo(results.data))
      .catch(err => console.log(err));
  };

  const getUsersInfo = (email) => {
    axios.get(`http://localhost:3001/api/users/${email}`)
      .then((results) => setUserData(results.data))
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
                onPress={() => setUrgentMessage(false)}
              />
            );
          }
        },
      })}>
      <Tabs.Screen name="Itinerary" component={Itinerary} />
      <Tabs.Screen name="Map">
        {props => (
          <MapMain
            {...props}
            allEvents={allEvents}
            importantInfo={importantInfo}
            userData={userData}
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
            admin={true}
            pastMessages={pastMessages}
          />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default AppTabs;
