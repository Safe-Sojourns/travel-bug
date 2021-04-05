import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAmbulance,
  faUser,
  faEdit,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';

function EmergencyPage(props) {
  const [emergencyInput, setEmergencyInput] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.card} title="title">
        <Card.Title style={styles.titleText}>EMERGENCY INFORMATION</Card.Title>
        <Card.Divider />
        <View style={styles.iconText}>
          <FontAwesomeIcon style={styles.icon} icon={faAmbulance} size={25} />
          <Text style={styles.text}>Emergency:</Text>
          <Text style={styles.textNum}>911</Text>
        </View>
        <View style={styles.iconText}>
          <FontAwesomeIcon style={styles.icon} icon={faUser} size={25} />
          <Text style={styles.text}>Staff:</Text>
          <Text style={styles.textNum}>425-567-8976</Text>
        </View>
        <View style={styles.iconText}>
          <FontAwesomeIcon style={styles.icon} icon={faInfoCircle} size={25} />
          <Text style={styles.text}>Additional Information:</Text>
        </View>
        <View>
          <Text>In progress</Text>
        </View>
        <View style={styles.buttonView}>
          <Button title="Edit" onPress={() => setModalVisible(true)} />
        </View>
        <View>
          <Modal isVisible={modalVisible}>
            <View style={styles.modal}>
              <Card containerStyle={styles.cardModal} title="title">
                <Card.Title style={styles.titleText}>
                  Add additional Information
                </Card.Title>
                <Card.Divider />
                <TextInput
                  style={styles.input}
                  value={emergencyInput}
                  onChange={e => setEmergencyInput(e.target.value)}
                />
                <View style={styles.buttonView}>
                  <Button title="Save" onPress={() => setModalVisible(false)} />
                </View>
              </Card>
            </View>
          </Modal>
        </View>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    color: '#013220',
  },
  container: {
    flex: 1,
    backgroundColor: '#EAF9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    width: 70,
    height: 40,
    backgroundColor: '#6EAD58',
    alignSelf: 'flex-end',
    margin: 5,
    borderRadius: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ABDA9A',
    width: 300,
    height: 410,
    padding: 20,
  },
  cardModal: {
    backgroundColor: '#ABDA9A',
    width: 300,
    height: 250,
    padding: 20,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: 'white',
    borderWidth: 1,
    paddingTop: 10,
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
  icon: {
    color: '#013220',
  },
});

export default EmergencyPage;
