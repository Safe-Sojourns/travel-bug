import React from 'react';
import {
  Button,
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAmbulance,
  faUser,
  faPhone,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';

function EmergencyPage(props) {
  const [emergencyInput, onChangeText] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require('./assets/travelbackground.jpeg')}
        />
      </View>
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
          <Text style={styles.textNum}>112</Text>
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
        <View style={styles.numberView}>
          <FontAwesomeIcon
            style={styles.icon}
            icon={faPhone}
            size={20}
            accessibilityLabel="Phone"
          />
          <Text style={styles.textNum}>+ 1 425-567-8976</Text>
        </View>
        <View style={styles.numberView}>
          <FontAwesomeIcon
            style={styles.icon}
            icon={faPhone}
            size={20}
            accessibilityLabel="Phone"
          />
          <Text style={styles.textNum}>+ 1 425-563-2566</Text>
        </View>
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
            <Text style={styles.infoText}>{emergencyInput}</Text>
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
                  value={emergencyInput}
                  onChangeText={text => onChangeText(text)}
                />
                <View testID="view" style={styles.buttonView}>
                  <Button
                    testID="saveButton"
                    color="white"
                    title="Save"
                    onPress={() => setModalVisible(false)}
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
    // backgroundColor: '#EAF9FF',
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
    display: 'flex',
    bottom: 600,
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
  image: {
    height: 1200,
    width: 400,
    position: 'relative',
    // top: 0,
    // left: 0,
    // right: 0,
    opacity: 0.06,
  },
});

export default EmergencyPage;
