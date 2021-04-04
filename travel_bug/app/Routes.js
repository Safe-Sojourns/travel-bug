import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClipboardList, faMapMarkedAlt, faExclamationTriangle, faCommentDots} from '@fortawesome/free-solid-svg-icons';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const handleItinerary = ({navigation}) => {
  return(
    <TouchableOpacity onPress={() => {
      navigation.navigate("Itinerary");
    }}>
      <FontAwesomeIcon
        icon={faClipboardList}
        size={30}
        color={'#5B58AD'}
        accessibilityLabel="Itinerary"
      />
    </TouchableOpacity>
  )
};

const handleMaps = ({navigation}) => {
  console.log('Go to map screen');
};

const handleEmergency = ({navigation}) => {
  console.log('Go to EmergencyPage');
};

const handleMessages = ({navigation}) => {
  console.log('Go to messages screen');
};

const Login = () => {
  return (
    <View accessible={true} style={styles.footerStyle}>
      <Text>I am a login screen</Text>
      <TouchableOpacity onPress={() => {
        navigation.navigate("Itinerary")
      }}>
        <FontAwesomeIcon
          icon={faClipboardList}
          size={30}
          color={'#5B58AD'}
          accessibilityLabel="Itinerary"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate("Itinerary")
      }}>
        <FontAwesomeIcon
          icon={faMapMarkedAlt}
          size={30}
          color={'#5B58AD'}
          accessibilityLabel="Map"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate("Itinerary")
      }}>
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          size={30}
          color={'#5B58AD'}
          accessibilityLabel="Emergency Contact"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate("Itinerary")
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
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Itinerary" component={Itinerary} />
        <Stack.Screen name="Map" component={MapView} />
        <Stack.Screen name="EmergencyPage" component={EmergencyPage} />
        <Stack.Screen name="Messages" component={Messages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const handleItinerary = () => {
//   console.log('Go to itinerary screen for today');
// };

// const handleMaps = () => {
//   console.log('Go to map screen');
// };

// const handleEmergency = () => {
//   console.log('Go to EmergencyPage');
// };

// const handleMessages = () => {
//   console.log('Go to messages screen');
// };

// const Routes = () => {
//   return (
//     <View accessible={true} style={styles.footerStyle}>
//       <TouchableOpacity onPress={handleItinerary}>
//         <FontAwesomeIcon
//           icon={faClipboardList}
//           size={30}
//           color={'#5B58AD'}
//           accessibilityLabel="Itinerary"
//         />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={handleMaps}>
//         <FontAwesomeIcon
//           icon={faMapMarkedAlt}
//           size={30}
//           color={'#5B58AD'}
//           accessibilityLabel="Map"
//         />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={handleEmergency}>
//         <FontAwesomeIcon
//           icon={faExclamationTriangle}
//           size={30}
//           color={'#5B58AD'}
//           accessibilityLabel="Emergency Contact"
//         />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={handleMessages}>
//         <FontAwesomeIcon
//           icon={faCommentDots}
//           size={30}
//           color={'#5B58AD'}
//           accessibilityLabel="Messages"
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

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
