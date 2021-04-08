import React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAmbulance,
  faUser,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';

function EmergencyPage(props) {
  const [emergencyInput, onChangeText] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
       {/* <View>
        <Image
          style={{
            height: 800,
            width: 400,
            resizeMode: 'stretch',
            // position: 'absolute',
            // top: 0,
            // left: 0,
            opacity: 0.06,
          }}
          source={require('./assets/travelbackground.jpeg')}
        />
      </View> */}
      <View>
        <View style={styles.card}>
          <View style={styles.iconText}>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faAmbulance}
              size={25}
              accessibilityLabel="Ambulance"
            />
            <Text style={styles.text}>Emergency:</Text>
          </View>
          <View style={styles.iconText}>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faUser}
              size={25}
              accessibilityLabel="User"
            />
            <Text style={styles.text}>Staff:</Text>
            <Text style={styles.textNum}>425-567-8976</Text>
          </View>
          <View style={styles.iconText}>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faInfoCircle}
              size={25}
              accessibilityLabel="Info"
            />
            <Text style={styles.text}>Additional Information:</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText}>{emergencyInput}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              color="white"
              title="Edit"
              onPress={() => setModalVisible(true)}
            />
          </View>
          <View>
            <Modal isVisible={modalVisible}>
              <View style={styles.modal}>
                <View containerStyle={styles.cardModal} title="title">
                  <TextInput
                    style={styles.input}
                    value={emergencyInput}
                    onChangeText={text => onChangeText(text)}
                  />
                  <View style={styles.buttonView}>
                    <Button
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
    // position: 'relative',
    // left: 30,
    // bottom: 200,
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
    height: 350,
    padding: 20,
    borderRadius: 15,
    // opacity: 1,
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
    color: '#013220',
  },
  icon: {
    color: '#013220',
  },
});

export default EmergencyPage;
