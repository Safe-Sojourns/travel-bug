import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {Formik} from 'formik';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  Image,
  TextInput,
} from 'react-native';
import FlatButton from './button';
import axios from 'axios';

const EventSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required().min(20),
  date: yup
    .string()
    .required()
    .test(
      'is in date format',
      'Please input in "yyyy-mm-dd" number format only',
      val => {
        return parseInt(val);
      },
    ),
  location: yup.string().required(),
  cost: yup.string(),
  transportation: yup.string(),
  start_time: yup
    .string()
    .required()
    .test(
      'is in time format',
      'Please input in "hh:mm" number format only',
      val => {
        return parseInt(val);
      },
    ),
  end_time: yup
    .string()
    .required()
    .test(
      'is in time format',
      'Please input in "hh:mm" number format only',
      val => {
        return parseInt(val);
      },
    ),
  mandatory: yup.string().required(),
});

const AddEvent = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={{padding: 10}}>
      <TouchableHighlight onPress={() => {}}>
        <View>
          <FontAwesomeIcon icon={faEdit} size={24} onPress={toggleModal} />
        </View>
      </TouchableHighlight>
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View>
          <FontAwesomeIcon
            icon={faTimesCircle}
            size={26}
            style={{display: 'flex', bottom: 15}}
            onPress={toggleModal}
          />
        </View>
        <View>
          <Image
            style={styles.image}
            source={require('../assets/travelbackground.jpeg')}
          />
        </View>
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
              mandatory: '',
            }}
            validationSchema={EventSchema}
            onSubmit={(values, actions) => {
              actions.resetForm();
              toggleModal();

              if (values.mandatory === 'False') {
                values.mandatory = false;
              } else {
                values.mandatory = true;
              }

              let formObj = {
                trip_id: 1,
                event_name: values.title,
                location: values.location,
                start_time: values.start_time,
                end_time: values.end_time,
                description: values.description,
                start_date: values.date,
                end_date: values.date,
                cost: parseInt(values.cost),
                transportation: values.transportation,
                mandatory: values.mandatory,
              };
              axios
                .post('http://localhost:3001/api/events', formObj)
                .then(() => console.log('successfully created new event'))
                .catch(err => console.log(err));
            }}>
            {props => (
              <View>
                <Text style={styles.titleText}>New Event Form</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Event Name"
                  onChangeText={props.handleChange('title')}
                  value={props.values.title}
                  onBlur={props.handleBlur('title')}
                />
                <Text style={styles.errorText}>
                  {props.touched.title && props.errors.title}
                </Text>
                <TextInput
                  style={styles.input}
                  multiline
                  placeholder="Event Description"
                  onChangeText={props.handleChange('description')}
                  value={props.values.description}
                  onBlur={props.handleBlur('description')}
                />
                <Text style={styles.errorText}>
                  {props.touched.description && props.errors.description}
                </Text>
                <TextInput
                  placeholder="Event Date (yyyy-mm-dd)"
                  style={styles.input}
                  onChangeText={props.handleChange('date')}
                  value={props.values.date}
                  onBlur={props.handleBlur('date')}
                />
                <Text style={styles.errorText}>
                  {props.touched.date && props.errors.date}
                </Text>
                <TextInput
                  placeholder="Event Location"
                  style={styles.input}
                  onChangeText={props.handleChange('location')}
                  value={props.values.location}
                  onBlur={props.handleBlur('location')}
                />
                <Text style={styles.errorText}>
                  {props.touched.location && props.errors.location}
                </Text>
                <TextInput
                  placeholder="Event Cost"
                  style={styles.input}
                  onChangeText={props.handleChange('cost')}
                  value={props.values.cost}
                  onBlur={props.handleBlur('cost')}
                />
                <Text style={styles.errorText}>
                  {props.touched.cost && props.errors.cost}
                </Text>
                <TextInput
                  placeholder="Event Transportation"
                  style={styles.input}
                  onChangeText={props.handleChange('transportation')}
                  value={props.values.transportation}
                  onBlur={props.handleBlur('transportation')}
                />
                <Text style={styles.errorText}>
                  {props.touched.cost && props.errors.cost}
                </Text>
                <TextInput
                  placeholder="Start Time (hh:mm)"
                  style={styles.input}
                  onChangeText={props.handleChange('start_time')}
                  value={props.values.start_time}
                  onBlur={props.handleBlur('start_time')}
                />
                <Text style={styles.errorText}>
                  {props.touched.start_time && props.errors.start_time}
                </Text>
                <TextInput
                  placeholder="End Time (hh:mm)"
                  style={styles.input}
                  onChangeText={props.handleChange('end_time')}
                  value={props.values.end_time}
                  onBlur={props.handleBlur('end_time')}
                />
                <Text style={styles.errorText}>
                  {props.touched.end_time && props.errors.end_time}
                </Text>
                <TextInput
                  placeholder="Is this event mandatory? (true or false)"
                  style={styles.input}
                  onChangeText={props.handleChange('mandatory')}
                  value={props.values.mandatory}
                  onBlur={props.handleBlur('mandatory')}
                />
                <Text style={styles.errorText}>
                  {props.touched.mandatory && props.errors.mandatory}
                </Text>
                <FlatButton text="SUBMIT" onPress={props.handleSubmit} />
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
    marginTop: 50,
    marginBottom: 100,
    marginLeft: 0,
    marginRight: 0,
  },
  titleText: {
    color: '#013220',
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    marginTop: 2,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
    height: 45,
  },
  errorText: {
    color: 'maroon',
    margin: 1,
    textAlign: 'center',
  },
  image: {
    height: 600,
    width: 400,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.06,
  },
});

export default AddEvent;
