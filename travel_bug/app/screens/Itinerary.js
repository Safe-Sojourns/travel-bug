import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import Calendar from './components/Calendar';
import CardListInfo from './components/CardList';
import AddEvent from './components/AddEvent';

const Itinerary = ({setCurrentDay, allEvents}) => {
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
          style={styles.image}
          source={require('./assets/travelbackground.jpeg')}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={styles.calendarDisplay}>
          {date}th {month}, {year}
        </Text>
        <Calendar setCurrentDay={setCurrentDay} />
        <AddEvent />
      </View>
      <ScrollView style={{height: 500}}>
        <CardListInfo allEvents={allEvents} />
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
  image: {
    height: 800,
    width: 400,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.06,
  },
});

export default Itinerary;
