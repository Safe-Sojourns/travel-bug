import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { View, StyleSheet, Text, Image, SafeAreaView } from 'react-native';

function SearchAutoComplete(props) {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      nearbyPlacesAPI="googlePlacesSearch"
      listViewDisplayed="auto"
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: {PROVIDER_GOOGLE},
        language: 'en',
      }}
      requestUrl={{
        useOnPlatform: 'web', // or "all"
        url:
          ' https://maps.googleapis.com/maps/api/place/queryautocomplete/json', // or any proxy server that hits https://maps.googleapis.com/maps/api
      }}
    />
  );
}

export default SearchAutoComplete;
