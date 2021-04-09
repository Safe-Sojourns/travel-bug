import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Image, TouchableHighlight, View} from 'react-native';
import Modal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarAlt, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-date-picker';
// import axios from 'axios';

export default function Calendar({setCurrentDay}) {
  const [date, setDate] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDateChange = selectedDate => {
    setDate(selectedDate);
    setCurrentDay(selectedDate);
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
          <DatePicker date={date} mode="date" onDateChange={handleDateChange} />
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
    marginTop: 270,
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
    height: 270,
    width: 400,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.06,
  },
});
