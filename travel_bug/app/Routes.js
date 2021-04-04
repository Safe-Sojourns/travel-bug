import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClipboardList, faMapMarkedAlt, faExclamationTriangle, faCommentDots} from '@fortawesome/free-solid-svg-icons';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const Itinerary = () => {
  return (
    <Text>Itinerary Screen</Text>
  );
};

const MapView = () => {
  return (
    <Text>Map Screen</Text>
  );
};

const EmergencyPage = () => {
  return (
    <Text>Emergency Information Screen</Text>
  );
};

const Messages = () => {
  return (
    <Text>Messages Screen</Text>
  );
};

const Login = ({navigation}) => {
  return (
    <View accessible={true} style={styles.footerStyle}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Itinerary');
        }}>
        <FontAwesomeIcon
          icon={faClipboardList}
          size={30}
          color={'#5B58AD'}
          accessibilityLabel="Itinerary"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MapView');
        }}>
        <FontAwesomeIcon
          icon={faMapMarkedAlt}
          size={30}
          color={'#5B58AD'}
          accessibilityLabel="Map"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EmergencyPage');
        }}>
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          size={30}
          color={'#5B58AD'}
          accessibilityLabel="Emergency Contact"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Messages');
        }}>
        <FontAwesomeIcon
          icon={faCommentDots}
          size={30}
          color={'#5B58AD'}
          accessibilityLabel="Messages"
        />
      </TouchableOpacity>
    </View>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Itinerary" component={Itinerary} />
        <Stack.Screen name="MapView" component={MapView} />
        <Stack.Screen name="EmergencyPage" component={EmergencyPage} />
        <Stack.Screen name="Messages" component={Messages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  footerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '8%',
    backgroundColor: '#ABDA9A',
  },
});

export default Routes;
