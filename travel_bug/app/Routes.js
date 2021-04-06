import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClipboardList, faMapMarkedAlt, faExclamationTriangle, faCommentDots} from '@fortawesome/free-solid-svg-icons';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
// import WelcomeScreen from './screens/WelcomeScreen.js';
import Itinerary from './screens/Itinerary.js';
import mapMain from './screens/maps/mapMain.js';
import EmergencyPage from './screens/EmergencyPage.js';
import Messages from './screens/Messages.js';

const Stack = createStackNavigator();

const Login = ({navigation}) => {
  return (
    <View accessible={true} style={styles.footerStyle}>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate('WelcomeScreen');
        }}>
        <Text>Welcome</Text>
      </TouchableOpacity> */}
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
          navigation.navigate('mapMain');
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
      <Stack.Navigator
        // screenOptions= {{
        //   header: () => null,
        // }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} /> */}
        <Stack.Screen name="Itinerary" component={Itinerary} />
        <Stack.Screen name="mapMain" component={mapMain} />
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
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
  },
});

export default Routes;
