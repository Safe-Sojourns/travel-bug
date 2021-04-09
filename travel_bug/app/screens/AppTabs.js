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
import {AuthContext} from '../navigation/AuthProvider';
import key from './maps/keyConfig.js';
import Geocoder from 'react-native-geocoding';

const Tabs = createBottomTabNavigator();

const AppTabs = ({userData}) => {
  const {user} = useContext(AuthContext);
  const [urgentMessage, setUrgentMessage] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [importantInfo, setImportantInfo] = useState();
  const [critical, setCritical] = useState([]);
  const [currentDay, setCurrentDay] = useState(formatDate(new Date()));
  const [email, setEmail] = useState();
  const [pastMessages, setPastMessages] = useState([]);
  const [centeredLat, setCenteredLat] = useState(41.8933);
  const [centeredLong, setCenteredLong] = useState(12.4889);
  Geocoder.init(key);

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
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
    getEvents(1, currentDay);
  }, []);

  useEffect(() => {
    getEvents(1, currentDay);
  }, [currentDay]);

  useEffect(() => {
    getMessages();
  }, [userData]);

  const getMessages = () => {
    axios
      .get('http://localhost:3001/logallmessages/1')
      .then(({data}) => {
        setPastMessages(data.messages);
        if (userData[0].email) {
          const unseenIds = data.criticalInfo
            .map(criticalMessage => {
              if (
                criticalMessage.seen_by_user_email.indexOf(userData[0].email) >=
                0
              ) {
                return;
              } else {
                return criticalMessage._id;
              }
            })
            .filter(id => id !== undefined);
          if (unseenIds.length > 0) {
            setUrgentMessage(true);
            setCritical(unseenIds);
          }
        }
      })
      .catch(err => console.log(err));
  };

  const getEvents = (tripId, date) => {
    const selectedDate = formatDate(date);
    axios
      .get(`http://localhost:3001/api/events/${tripId}/${selectedDate}`)
      .then(results => {
        let tempEvents = results.data;
        tempEvents.forEach(element => {
          Geocoder.from(element.location)
            .then(json => {
              let location = json.results[0].geometry.location;
              element.latitude = location.lat;
              element.longitude = location.lng;
            })
            .catch(error => console.warn(error));
        });
        setAllEvents(tempEvents);
      })
      .catch(err => console.log(err));
  };

  const getImportantInfo = tripId => {
    if (userData) {
      axios
        .get(`http://localhost:3001/logallimportantinfo/${tripId}`)
        .then(results => setImportantInfo(results.data))
        .catch(err => console.log(err));
    }
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
            setCenteredLat={setCenteredLat}
            setCenteredLong={setCenteredLong}
            admin={userData[0].admin}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen name="Map">
        {props => (
          <MapMain
            {...props}
            allEvents={allEvents}
            importantInfo={importantInfo}
            userData={userData}
            centeredLat={centeredLat}
            centeredLong={centeredLong}
            setCenteredLat={setCenteredLat}
            setCenteredLong={setCenteredLong}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen name="Important Contacts">
        {props => (
          <EmergencyPage
            {...props}
            id={userData[0].id}
            email={userData[0].email}
            notes={userData[0].notes}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name="Messages"
        options={!urgentMessage ? null : {tabBarBadge: '!'}}>
        {props => (
          <Messages
            {...props}
            user={userData[0].email}
            urgentMessage={urgentMessage}
            setUrgentMessage={setUrgentMessage}
            admin={userData[0].admin}
            pastMessages={pastMessages}
            critical={critical}
            setCritical={setCritical}
          />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default AppTabs;
