import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Alert,
  Linking,
} from 'react-native';
import PopUpFromMap from './PopUpFromMap.js';
import SearchAutoComplete from './SearchAutoComplete.js';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHouseUser,
  faBuilding,
  faAmbulance,
  faFlagUsa,
} from '@fortawesome/free-solid-svg-icons';
import key from './keyConfig.js';

const styles = StyleSheet.create({
  searchView: {
    marginTop: 20,
  },
  icon: {
    position: 'absolute',
    right: 30,
    top: 720,
  },
});
const MapMain = ({
  allEvents,
  importantInfo,
  centeredLat,
  centeredLong,
  setCenteredLat,
  setCenteredLong,
}) => {
  const [pinView, setPinView] = useState(false);
  const [searchAddr, setSearchAddr] = useState();
  const [searchLat, setSearchLat] = useState();
  const [searchLong, setSearchLong] = useState();
  const [currentModal, setCurrentModal] = useState({});
  const [pinTitle, setPinTitle] = useState();
  console.log(allEvents)

  const changePinView = () => {
    setPinView(!pinView);
  };

  const createTwoButtonAlert = pinTitle =>
    Alert.alert(`Get Directions to ${pinTitle}?`, 'This will open maps', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          Linking.openURL(
            `http://maps.apple.com/?sll=${centeredLat},${centeredLong}&daddr=${searchAddr}`,
          ),
      },
    ]);

  if (importantInfo) {
    return (
      <SafeAreaView>
        <MapView
          style={{height: '100%', width: '100%'}}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          region={{
            latitude: Number(centeredLat),
            longitude: Number(centeredLong),
            latitudeDelta: 0.075,
            longitudeDelta: 0.075,
          }}>
          <SearchAutoComplete
            searchLat={searchLat}
            searchLong={searchLong}
            setSearchLat={setSearchLat}
            setSearchLong={setSearchLong}
            centeredLong={centeredLong}
            centeredLat={centeredLat}
            setCenteredLong={setCenteredLong}
            setCenteredLat={setCenteredLat}
            setSearchAddr={setSearchAddr}
            setPinTitle={setPinTitle}
            importantInfo={importantInfo}
          />
          {allEvents.map((event, index) => (
            <Marker
              onPress={() => {
                setCurrentModal(event);
                setCenteredLat(event.latitude);
                setCenteredLong(event.longitude);
                setPinView(!pinView);
              }}
              key={event._id}
              title={event.event_name}
              coordinate={{
                latitude: event.latitude,
                longitude: event.longitude,
              }}>
              <Image
                source={require('./bug.png')}
                style={{height: 40, width: 40}}
                resizeMode="contain"
              />
              <PopUpFromMap
                changePinView={changePinView}
                pinView={pinView}
                currentModal={currentModal}
                centeredLat={centeredLat}
                centeredLong={centeredLong}
              />
            </Marker>
          ))}
          {searchLat && searchLong ? (
            <Marker
              onPress={() => createTwoButtonAlert(pinTitle)}
              description={pinTitle}
              isPreselected={true}
              coordinate={{
                latitude: searchLat,
                longitude: searchLong,
              }}
            />
          ) : null}
          <Marker
            description={'Home Base'}
            onPress={() => {
              setCenteredLat(importantInfo[0].homebase_lat);
              setCenteredLong(importantInfo[0].homebase_long);
              createTwoButtonAlert('Home Base');
            }}
            isPreselected={true}
            coordinate={{
              latitude: Number(importantInfo[0].homebase_long),
              longitude: Number(importantInfo[0].homebase_lat),
            }}>
            <FontAwesomeIcon
              icon={faHouseUser}
              size={25}
              accessibilityLabel="Info"
            />
          </Marker>
          <Marker
            description={'Embassy'}
            onPress={() => {
              setCenteredLat(importantInfo[0].us_embassy_latitude);
              setCenteredLong(importantInfo[0].us_embassy_longitude);
              createTwoButtonAlert('The Embassy');
            }}
            isPreselected={true}
            coordinate={{
              latitude: Number(importantInfo[0].us_embassy_latitude),
              longitude: Number(importantInfo[0].us_embassy_longitude),
            }}>
            <FontAwesomeIcon
              icon={faFlagUsa}
              size={25}
              accessibilityLabel="Info"
            />
          </Marker>
          <Marker
            description={'Police Station'}
            onPress={() => {
              setCenteredLat(importantInfo[0].us_embassy_latitude);
              setCenteredLong(importantInfo[0].us_embassy_longitude);
              createTwoButtonAlert('Police Station');
            }}
            isPreselected={true}
            coordinate={{
              latitude: 41.88815,
              longitude: 12.49534,
            }}>
            <Image
              source={require('./popo2.png')}
              backgroundColor="transparent"
              style={{height: 25, width: 25}}
              resizeMode="contain"
            />
          </Marker>
          <Marker
            description={'Hospital'}
            onPress={() => {
              setCenteredLat(importantInfo[0].us_embassy_latitude);
              setCenteredLong(importantInfo[0].us_embassy_longitude);
              createTwoButtonAlert('Hospital');
            }}
            isPreselected={true}
            coordinate={{
              latitude: 41.88597,
              longitude: 12.5032,
            }}>
            <FontAwesomeIcon
              icon={faAmbulance}
              size={25}
              accessibilityLabel="Info"
            />
          </Marker>
        </MapView>
      </SafeAreaView>
    );
  }
  return null;
};

export default MapMain;
