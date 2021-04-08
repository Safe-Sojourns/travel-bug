import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Image, TouchableHighlight, View} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarAlt, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import FlatButton from './button';

export default function Calendar() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectDate, setDate] = useState(formatDate(new Date()));
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }
  const handleDateChange = selectedDate => {
    setDate(selectedDate);
  };

  useEffect(() => {
    getEventInfo(1, selectDate);
  }, [selectDate]);

  const getEventInfo = (tripId, selectedDate) => {
    const date = formatDate(selectedDate);
    axios
      .get(`http://localhost:3001/api/events/${tripId}/${date}`)
      .then(results => console.log(results.data))
      .catch(err => console.log(err));
  };

  return (
    <View style={{padding: 10}}>
      <TouchableHighlight onPress={() => {}}>
        <View>
          <FontAwesomeIcon
            icon={faCalendarAlt}
            size={26}
            onPress={toggleModal}
          />
        </View>
      </TouchableHighlight>
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View>
          <Image
            style={styles.image}
            source={require('../assets/travelbackground.jpeg')}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          {/* <CalendarPicker /> */}
          <DatePicker
            selectDate={selectDate}
            mode="date"
            onDateChange={handleDateChange}
          />
          <TouchableHighlight style={styles.button} onPress={toggleModal}>
            <Text style={styles.textButton}>Ok</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 200,
    marginBottom: 280,
    marginLeft: 0,
    marginRight: 0,
  },
  button: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'teal',
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
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
