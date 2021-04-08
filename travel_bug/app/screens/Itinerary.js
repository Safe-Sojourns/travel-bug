import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import Calendar from './components/Calendar';
import CardDetails from './components/Cards';
import AddEvent from './components/AddEvent';

const Itinerary = props => {
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var date = new Date().getDate();
  var month = months[new Date().getMonth()];
  var year = new Date().getFullYear();
  return (
    <SafeAreaView style={styles.calendar}>
      <View>
        <Image
          style={{
            height: 800,
            width: 400,
            position: 'absolute',
            top: 0,
            left: 0,
            opacity:0.06,
          }}
          source={require('./assets/travelbackground.jpeg')}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.calendarDisplay}>
          {date}th {month}, {year}
        </Text>
        <Calendar />
        <AddEvent />
      </View>
      <ScrollView style={{height: 500}}>
        <CardDetails />
        <CardDetails />
        <CardDetails />
        <CardDetails />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  calendar: {
    padding: 20,
  },
  calendarDisplay: {
    fontSize: 20,
  },
});

export default Itinerary;
