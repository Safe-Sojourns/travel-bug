import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAmbulance, faUser, faEdit} from '@fortawesome/free-solid-svg-icons';


function EmergencyPage(props) {
  const [emergencyInput, onChangeEmergencyInput] = React.useState('');

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
          <FontAwesomeIcon style={styles.icon} icon={faEdit} size={25} />
          <Text style={styles.text}>Additional Information:</Text>
        </View>
        <TextInput
          style={styles.input}
          value={emergencyInput}
          placeholder="Add any information important to you."
          onChange={e => onChangeEmergencyInput(e.target.value)}
        />
        <Text style={styles.textNum}>Edit</Text>
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
  card: {
    backgroundColor: '#ABDA9A',
    width: 300,
    height: 400,
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
