import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TextInput, Header} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAmbulance, faUser, faEdit} from '@fortawesome/free-solid-svg-icons';


function EmergencyPage(props) {
  const [emergencyInput, onChangeEmergencyInput] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>Emergency Page</Text>
      <View style={styles.view}>
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
          <FontAwesomeIcon style={styles.icon} icon={faEdit} size={25} />
          <Text style={styles.text}>Edit:</Text>
        </View>
        <TextInput
          style={styles.input}
          value={emergencyInput}
          placeholder="Add any information important to you."
          onChange={e => onChangeEmergencyInput(e.target.value)}
        />
      </View>
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
  view: {
    backgroundColor: '#ABDA9A',
    width: 300,
    height: 350,
    padding: 20,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 150,
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
  textHeader: {
    paddingTop: 10,
    paddingBottom: 100,
    paddingLeft: 10,
    color: '#013220',
    fontSize: 40,
    fontWeight: 'bold',
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
