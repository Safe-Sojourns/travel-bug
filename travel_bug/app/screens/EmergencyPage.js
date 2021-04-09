import React, {useEffect} from 'react';
import {
  Button,
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Linking,
  TextInput,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAmbulance,
  faUser,
  faPhone,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-native-modal';
// import AsyncStorage from '@react-native-async-storage/async-storage';

function EmergencyPage({id, email}) {
  const [notes, setNotes] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [emergencyInfo, setEmergencyInfo] = React.useState();
  const [staffInfo, setStaffInfo] = React.useState([]);

  // const STORAGE_KEY = '@save_age';

  useEffect(() => {
    getEmergencyInfo(1);
    getUserNotes(email);
    // readData();
  }, []);

  // const saveData = async () => {
  //   try {
  //     await AsyncStorage.setItem(STORAGE_KEY, emergencyInput);
  //     console.log('Data successfully saved');
  //   } catch (e) {
  //     console.log('Failed to save the data to the storage');
  //   }
  // };

  // const readData = async () => {
  //   try {
  //     const notes = await AsyncStorage.getItem(STORAGE_KEY);

  //     if (notes !== null) {
  //       onChangeText(notes);
  //     }
  //   } catch (e) {
  //     console.log('Failed to fetch the data from storage');
  //   }
  // };

  const getEmergencyInfo = tripId => {
    const numArray = [];
    axios
      .get(`http://localhost:3001/api/staffimportant/?trip_id=${tripId}`)
      .then(({data}) => {
        setEmergencyInfo(data.important[0].popo_phone);
        data.staff.map(staff => {
          numArray.push(staff.number);
        });
        setStaffInfo(numArray);
      })
      .catch(err => console.log(err));
  };

  const getUserNotes = userEmail => {
    axios
      .get(`http://localhost:3001/api/users/${userEmail}`)
      .then(data => setNotes(data.data[0].notes))
      .catch(err => console.log(err));
  };

  const handleSave = () => {
    // saveData();
    let notesObj = {
      id: id,
      notes: notes,
    };
    console.log(notesObj);
    axios
      .post('http://localhost:3001/api/notes', notesObj)
      .then(() => getUserNotes(email))
      .catch(err => console.log(err));
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconText}>
          <FontAwesomeIcon
            style={styles.icon}
            icon={faAmbulance}
            size={25}
            accessibilityLabel="Ambulance"
          />
          <Text testID="emergency" style={styles.text}>
            Emergency:
          </Text>
          <Text
            onPress={() => {
              Linking.openURL(`tel:${emergencyInfo}`);
            }}
            style={styles.textNum}>
            {emergencyInfo}
          </Text>
        </View>
        <View style={styles.iconText}>
          <FontAwesomeIcon
            style={styles.icon}
            icon={faUser}
            size={25}
            accessibilityLabel="User"
          />
          <Text testID="staff" style={styles.text}>
            Staff Contact Info:
          </Text>
        </View>
        {staffInfo.map(num => (
          <View key={num} style={styles.numberView}>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faPhone}
              size={20}
              accessibilityLabel="Phone"
            />
            <Text
              onPress={() => {
                Linking.openURL(`tel:${num}`);
              }}
              style={styles.textNum}>
              {num}
            </Text>
          </View>
        ))}
        <View style={styles.iconText}>
          <FontAwesomeIcon
            style={styles.icon}
            icon={faInfoCircle}
            size={25}
            accessibilityLabel="Info"
          />
          <Text testID="addInfo" style={styles.text}>
            Additional Information:
          </Text>
        </View>
        <SafeAreaView style={styles.view}>
          <ScrollView style={styles.info}>
            <Text style={styles.infoText}>{notes}</Text>
          </ScrollView>
        </SafeAreaView>
        <View style={styles.buttonView}>
          <Button
            testID="editButton"
            color="white"
            title="Edit"
            onPress={() => setModalVisible(true)}
          />
        </View>
        <View>
          <Modal testID="modal" isVisible={modalVisible}>
            <View style={styles.modal}>
              <View containerStyle={styles.cardModal} title="title">
                <TextInput
                  multiline
                  testID="input"
                  style={styles.input}
                  value={notes}
                  onChangeText={text => setNotes(text)}
                />
                <View testID="view" style={styles.buttonView}>
                  <Button
                    testID="saveButton"
                    color="white"
                    title="Save"
                    onPress={handleSave}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    width: 70,
    height: 40,
    backgroundColor: '#013220',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    marginRight: 12,
  },
  card: {
    backgroundColor: '#ABDA9A',
    width: 300,
    height: 450,
    padding: 20,
    borderRadius: 15,
  },
  cardModal: {
    backgroundColor: '#ABDA9A',
    width: 300,
    height: 250,
    padding: 20,
    borderRadius: 5,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 40,
  },
  input: {
    height: 120,
    width: 250,
    backgroundColor: 'white',
    borderWidth: 1,
    paddingTop: 10,
  },
  info: {
    height: 120,
    width: 250,
    backgroundColor: '#EAF9FF',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    color: '#013220',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleText: {
    color: '#013220',
    fontSize: 20,
  },
  textNum: {
    paddingLeft: 5,
    color: '#013220',
    fontSize: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#007AFF',
  },
  icon: {
    color: '#013220',
  },
});

export default EmergencyPage;
