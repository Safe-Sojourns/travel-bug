import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import PopUpFromMap from './PopUpFromMap.js';


const styles = StyleSheet.create({
  searchView: {
    marginTop: 20,
  },
});
const MapMain = () => {
  const [pinView, setPinView] = useState(false);

  const changePinView = () => {
    setPinView(!pinView);
  };
  return (
    <View>
      <MapView
        style={{ height: '100%', width: '100%' }}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 41.8902,
          longitude: 12.4922,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <SafeAreaView style={styles.searchView}>
          <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: { PROVIDER_GOOGLE },
              language: 'en',
            }}
          />
        </SafeAreaView>
        {arrayOfEventLocations.map((event, index) => (
          <Marker
            onPress={() => {
              console.log('pressed again');
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
              style={{ height: 40, width: 40 }}
              resizeMode="contain"
            />
          </Marker>
        ))}
      </MapView>

      <PopUpFromMap changePinView={changePinView} pinView={pinView} />
    </View>
  );
};

export default MapMain;

const arrayOfEventLocations = [
  {
    name: 'Colosseum of Rome',
    longitude: 12.4922,
    latitude: 41.8902,
    eventIdNumber: 1,
  },
  {
    name: 'Roman Forum',
    longitude: 12.4853,
    latitude: 41.8925,
    eventIdNumber: 2,
  },
  {
    name: 'Pantheon',
    longitude: 12.4748,
    latitude: 41.8996,
    eventIdNumber: 3,
  },
]