import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, SafeAreaView, Alert, Linking} from 'react-native';
import PopUpFromMap from './PopUpFromMap.js';
import SearchAutoComplete from './SearchAutoComplete.js';

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
const MapMain = () => {
  const [pinView, setPinView] = useState(false);
  const [searchAddr, setSearchAddr] = useState();
  const [centeredLat, setCenteredLat] = useState(41.8933);
  const [centeredLong, setCenteredLong] = useState(12.4889);
  const [searchLat, setSearchLat] = useState();
  const [searchLong, setSearchLong] = useState();
  const [currentModal, setCurrentModal] = useState({});

  const changePinView = () => {
    setPinView(!pinView);
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Get Directions?', 'This will open maps', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => Linking.openURL(`http://maps.apple.com/?sll=${centeredLat},${centeredLong}&daddr=${searchAddr}`)}
    ]);

  return (
    <SafeAreaView>
      <MapView
        style={{height: '100%', width: '100%'}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={{
          latitude: centeredLat,
          longitude: centeredLong,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
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
        />
        {arrayOfEventLocations.map((event, index) => (
          <Marker
            onPress={() => {
              setCurrentModal(event);
              setCenteredLat(event.latitude);
              setCenteredLong(event.longitude);
              setPinView(!pinView);
            }}
            key={event.eventIdNumber}
            title={event.name}
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
            coordinate={{
              latitude: searchLat,
              longitude: searchLong,
            }}
            onPress={createTwoButtonAlert}
          />
        ) : null}
      </MapView>
    </SafeAreaView>
  );
};

export default MapMain;

const arrayOfEventLocations = [
  {
    name: 'Roman Forum',
    description: 'Via della Salara Vecchia, 5/6, 00186 Roma RM, Italy',
    date: 'March 16, 2021',
    time: '11:00 am',
    longitude: 12.4853,
    latitude: 41.8925,
    eventIdNumber: 2,
  },
  {
    name: 'Colosseum of Rome',
    description: 'Piazza del Colosseo, 1, 00184 Roma RM, Italy',
    date: 'March 16, 2021',
    time: '09:00 am',
    longitude: 12.4922,
    latitude: 41.8902,
    eventIdNumber: 1,
  },
  {
    name: 'Pantheon',
    description: 'Piazza della Rotonda, 00186 Roma RM, Italy',
    date: 'March 16, 2021',
    time: '1:00 pm',
    longitude: 12.4748,
    latitude: 41.8996,
    eventIdNumber: 3,
  },
];
