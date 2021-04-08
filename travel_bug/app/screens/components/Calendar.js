import React, {useState} from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarAlt, faTimesCircle} from '@fortawesome/free-solid-svg-icons';

export default function Calendar() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
          <CalendarPicker />
          <FontAwesomeIcon
            icon={faTimesCircle}
            size={35}
            onPress={toggleModal}
            style={styles.close}
          />
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
    marginBottom: 200,
    marginLeft: 0,
    marginRight: 0,
  },
  close: {
    alignItems: 'flex-end',
    display: 'flex',
    left: 360,
    bottom: 350,
  },
});
