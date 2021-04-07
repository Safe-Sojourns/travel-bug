import React from 'react';
import {Button, View, StyleSheet, Text, SafeAreaView, Linking, TouchableWithoutFeedback} from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  centeredView: {
    width: 390,
    height: 200,
    top: 325,
    backgroundColor: '#EAF9FF',
    borderRadius: 20,
  },
  modal: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textBox: {
    backgroundColor: '#ABDA9A',
    borderRadius: 15,
    borderColor: '#5B58AD',
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    top: 25,
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingBottom: 5,
    paddingTop: 15
  },
  h2: {
    fontSize: 10,
    paddingLeft: 20,
    paddingBottom: 4
  },
  tab: {
    borderWidth: 1,
    borderRadius: 10,
    width: 30,
    height: 2,
    borderColor: 'grey',
    left: '42%',
    top: 4
  }
});

function PopUpFromMap({ changePinView, pinView, currentModal, centeredLat, centeredLong }) {

  return (
    <SafeAreaView>
      <GestureRecognizer onSwipeDown={() => changePinView()}>
        <Modal
          hasBackdrop={false}
          isVisible={pinView}
          style={styles.modal}
          onBackdropPress={() => {
            console.log('modal pressed')
          }}
          config={{velocityThreshold: 0.00000001}}
          animationType="bottom-half">
          <TouchableWithoutFeedback onPress={() => changePinView()}>
            <View style={styles.centeredView}>
            <View style={styles.tab}>
              <Text style={{ textAlign: 'center' }}> </Text>
            </View>
            <Text style={styles.h1}>{currentModal.name}</Text>
            <Text style={styles.h2}>{currentModal.description}</Text>
            <Text style={styles.h2}>{currentModal.date}</Text>
            <Text style={styles.h2}>{currentModal.time}</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.textBox}>
                <Button
                  color="#013220"
                  title="Get Directions"
                  accesibilityLabel="Get Directions"
                  onPress={() => Linking.openURL(`http://maps.apple.com/?sll=${centeredLat},${centeredLong}&daddr=${currentModal.description}`)}
                />
              </View>
              <View style={styles.textBox}>
                <Button
                  color="#013220"
                  title="Go to Itinerary"
                  accesibilityLabel="Go to Itinerary"
                  onPress={() => changePinView()}
                />
              </View>
            </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </GestureRecognizer>
    </SafeAreaView>
  );
}

export default PopUpFromMap;
