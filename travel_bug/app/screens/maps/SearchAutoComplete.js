import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { View, StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import key from './keyConfig.js';

function SearchAutoComplete({
  searchLong,
  searchLat,
  setSearchLong,
  setSearchLat,
  setCenteredLong,
  setCenteredLat,
  centeredLat,
  centeredLong,
  searchTerm,
  setSearchTerm,
  setSearchAddr,
  setPinTitle,
}) {

  const homePlace = { description: 'Dreaming Rome Hostel', geometry: { location: { lat: 41.88194, lng: 12.50947 } } };
  const workPlace = { description: 'Embassy', geometry: { location: { lat: 41.907188, lng: 12.490300 } } };
  const hospital = { description: 'Hospital', geometry: { location: { lat: 41.885970, lng: 12.503200 } } };
  const popo = { description: 'Police Station', geometry: { location: { lat: 41.888150, lng: 12.495340 } } };


  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={2} // minimum length of text to search
      autoFocus
      returnKeyType={"search"}// Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytypehtml#keyboardappearance
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails
      renderDescription={row => row.description} // custom description render
      onPress={(data, details) => {
        setSearchLat(details.geometry.location.lat);
        setSearchLong(details.geometry.location.lng);
        setCenteredLat(details.geometry.location.lat);
        setCenteredLong(details.geometry.location.lng);
        setSearchAddr(details.formatted_address);
        setPinTitle(data.description)
      }}
      getDefaultValue={() => ''}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: `${key}`,
        language: 'en', // language of the results
        location: `${centeredLat},${centeredLong}`,
        radius: 2000,
      }}
      styles={{
        textInputContainer: {
          width: '100%',
        },
        description: {
          fontWeight: 'bold',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
      predefinedPlaces={[homePlace, workPlace, hospital, popo]}
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={
        {
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }
      }
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        type: 'cafe',
      }}
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'formatted_address,geometry',
      }}
      filterReverseGeocodingByTypes={[
        'locality',
        'administrative_area_level_3',
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    // eslint-disable-next-line react/jsx-one-expression-per-line
      keyboardShouldPersistTaps="always"
    />
  );
}

export default SearchAutoComplete;

// keyboardDismissMode='on-drag'
