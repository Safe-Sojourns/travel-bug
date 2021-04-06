import React from 'react';
import { Button, View, StyleSheet, Text, SafeAreaView } from 'react-native';
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
    borderWidth: 2,
    borderColor: '#5B58AD',
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    top: 50,
  },
});

function PopUpFromMap({changePinView, pinView, currentModal}) {
  return (
    <SafeAreaView>
      <GestureRecognizer onSwipeDown={() => changePinView()}>
        <Modal
          hasBackdrop={false}
          isVisible={pinView}
          style={styles.modal}
          animationType="bottom-half">
          <View style={styles.centeredView}>
            <Text style={{textAlign: 'center'}}>⬇</Text>
            <Text>Name: {currentModal.name}</Text>
            <Text>Address: {currentModal.description}</Text>
            <Text>Date: {currentModal.date}</Text>
            <Text>Time: {currentModal.time}</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.textBox}>
                <Button
                  color="#013220"
                  title="Google me"
                  accesibilityLabel="Googel me"
                  onPress={() => changePinView()}
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
        </Modal>
      </GestureRecognizer>
    </SafeAreaView>
  );
}

export default PopUpFromMap;
