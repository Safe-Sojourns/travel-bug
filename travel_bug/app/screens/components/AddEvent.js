import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {Formik} from 'formik';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  Button,
  TextInput,
} from 'react-native';

const AddEvent = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={{padding: 20}}>
      <TouchableHighlight onPress={() => {}}>
        <View>
          <FontAwesomeIcon icon={faEdit} size={26} onPress={toggleModal} />
        </View>
      </TouchableHighlight>
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View>
          <Formik
            initialValues={{
              title: '',
              description: '',
              date: '',
              location: '',
              cost: '',
              transportation: '',
              start_time: '',
              end_time: '',
            }}
            onSubmit={(values, actions) => {
              actions.resetForm();
              toggleModal();
              console.log(values);
            }}>
            {(props) => (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Event Name"
                  onChangeText={props.handleChange('title')}
                  value={props.values.title}
                />
                <TextInput
                  style={styles.input}
                  multiline
                  placeholder="Event Description"
                  onChangeText={props.handleChange('description')}
                  value={props.values.description}
                />
                <TextInput
                  placeholder="Event Date (mm/dd/yyyy)"
                  style={styles.input}
                  onChangeText={props.handleChange('date')}
                  value={props.values.date}
                />
                <TextInput
                  placeholder="Event Location"
                  style={styles.input}
                  onChangeText={props.handleChange('location')}
                  value={props.values.location}
                />
                <TextInput
                  placeholder="Event Cost"
                  style={styles.input}
                  onChangeText={props.handleChange('cost')}
                  value={props.values.cost}
                />
                <TextInput
                  placeholder="Event Transportation"
                  style={styles.input}
                  onChangeText={props.handleChange('transportation')}
                  value={props.values.transportation}
                />
                <TextInput
                  placeholder="Start Time"
                  style={styles.input}
                  onChangeText={props.handleChange('start_time')}
                  value={props.values.start_time}
                />
                <TextInput
                  placeholder="End Time"
                  style={styles.input}
                  onChangeText={props.handleChange('end_time')}
                  value={props.values.end_time}
                />
                <Button
                  title="Submit"
                  color="#013220"
                  onPress={props.handleSubmit}
                />
              </View>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
};

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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
});

export default AddEvent;
