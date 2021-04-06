import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {View, StyleSheet, Text, Image, SafeAreaView} from 'react-native';
import key from './keyConfig.js';

function SearchAutoComplete({
  searchLat,
  searchLong,
  setSearchLat,
  setSearchLong,
  setCurrentLong,
  currentLat,
  currentLong,
  setCurrentLat,
  searchTerm,
  setSearchTerm,
}) {
  const placesUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${key}&input=p=${currentLat}, ${currentLong}&radius=2000`;

  const home = 'Pantheon';

  return (
    <View style={{paddingTop: 1, flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus
        returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance='light' // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed='auto' // true/false/undefined
        fetchDetails
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          console.log('hello')
        }}
        getDefaultValue={() => ''}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: `${key}`,
          language: 'en', // language of the results
          location: `${currentLat},${currentLong}`,
          radius: 2000
        }}
        styles={{
          textInputContainer: {
            width: '100%'
          },
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          type: 'cafe'
        }}
        GooglePlacesDetailsQuery={{
          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
          fields: 'formatted_address,geometry',
        }}
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      // eslint-disable-next-line react/jsx-one-expression-per-line
      />
    </View>
  );
}

export default SearchAutoComplete;