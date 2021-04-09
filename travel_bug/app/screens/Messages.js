/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {io} from 'socket.io-client';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faImages} from '@fortawesome/free-solid-svg-icons';
import KeyboardStickyView from 'rn-keyboard-sticky-view';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {openSettings} from 'react-native-permissions';
import {openLimitedPhotoLibraryPicker} from 'react-native-permissions';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Platform,
  SafeAreaView,
  Switch,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';

const socket = io('http://localhost:4000');

export default function Messages({
  user,
  urgentMessage,
  setUrgentMessage,
  admin,
  pastMessages,
}) {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentUser, setCurrentUser] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [photo, setPhoto] = useState('');

  const toggleSwitch = () => {
    setUrgent(previousState => !previousState);
  };

  useEffect(() => {
    setChatMessages(pastMessages);
  }, [pastMessages]);

  useEffect(() => {
    socket.on('new messages', msg => {
      setChatMessages([...chatMessages, msg]);
    });
    scroll.current.scrollToEnd();
    setCurrentUser(user);
  }, [chatMessages, user]);

  function checkPermission() {
    check(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('feature is not available on this device');
            break;
          case RESULTS.BLOCKED:
            openSettings().catch(() => console.warn('cannot open settings'));
            console.log('permission blocked');
            break;
          case RESULTS.LIMITED:
            openLimitedPhotoLibraryPicker().catch(() => {
              console.warn('Cannot open photo library picker');
            });
            break;
          case RESULTS.GRANTED:
            console.log('permission is granted by user');
            launchImageLibrary(
              {
                mediaType: 'photo',
                maxWidth: 40,
                maxHeight: 40,
                quality: 1,
              },
              response => {
                console.log('library opened', response);
                setPhoto(response.uri);
              },
            );
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.IOS.PHOTO_LIBRARY)
              .then(results => {
                switch (results) {
                  case RESULTS.BLOCKED:
                    console.log('permission denied');
                    break;
                  case RESULTS.GRANTED:
                    console.log('permission granted');
                }
              })
              .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  const scroll = useRef();

  function submitMessage() {
    const date = new Date();
    const formattedDate = date.toString().split(' ').slice(0, 5).join(' ');
    socket.emit('chat message', {
      user_email: currentUser,
      message: chatMessage,
      date: formattedDate,
      critical: urgent,
    });
    axios
      .post('http://localhost:3001/api/postmessage', {
        tripid: 1,
        message: chatMessage,
        userEmail: currentUser,
        critical: urgent,
        date: formattedDate,
      })
      .then(() => console.log('posted message'))
      .catch(err => console.log(err));
    setUrgent(false);
    if (urgent === true) {
      setUrgentMessage(true);
    }
    setChatMessage('');
    scroll.current.scrollToEnd();
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{
            height: 800,
            width: 400,
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0.06,
          }}
          source={require('./assets/travelbackground.jpeg')}
        />
      </View>
      <SafeAreaView>
        <ScrollView
          onTouchStart={() => setIsExpanded(false)}
          style={isExpanded ? styles.expandedContainer : styles.messageList}
          ref={scroll}>
          {chatMessages.map((message, index) => {
            return (
              <MessageListEntry
                key={index}
                message={message.message}
                currentUser={currentUser}
                user={message.user_email}
                date={message.date}
                admin={admin}
                urgent={message.critical}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
      <KeyboardStickyView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.footer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          {admin ? (
            <Text style={{display: 'flex', flexDirection: 'column'}}>
              <Switch
                trackColor={{false: '#767577', true: 'red'}}
                onValueChange={toggleSwitch}
                value={urgent}
              />{' '}
            </Text>
          ) : null}
          <TouchableOpacity onPressIn={checkPermission}>
            <FontAwesomeIcon
              icon={faImages}
              size={30}
              color="#007AFF"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          multiline
          value={photo ? <View><Image source={{uri: photo}} style={{height: 20, width: 20}}/></View> : chatMessage}
          onChangeText={message => setChatMessage(message)}
          style={styles.adminTextInput}
          onSubmitEditing={submitMessage}
          keyboardType="default"
          onFocus={() => {
            setIsExpanded(true);
            scroll.current.scrollToEnd();
          }}
        />
        <View style={styles.adminButtonContainer}>
          <Button
            onPress={submitMessage}
            title="Send"
            color="black"
            disabled={chatMessage === ''}
          />
        </View>
      </KeyboardStickyView>
    </View>
  );
}

const MessageListEntry = ({currentUser, user, message, date, urgent}) => (
  <View style={user === currentUser ? styles.currentUser : styles.otherUsers}>
    <Text style={{fontWeight: '700', paddingBottom: 5}}>{user}</Text>
    <Text style={urgent ? {color: 'red'} : {paddingBottom: 5}}>{message}</Text>
    <Text style={{fontStyle: 'italic', fontSize: 9, alignSelf: 'flex-end'}}>
      {date}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
  },
  adminTextInput: {
    height: 'auto',
    width: '70%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    fontSize: 20,
  },
  adminButtonContainer: {
    height: 'auto',
    width: '16%',
    backgroundColor: '#013220',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    justifyContent: 'center',
  },
  textInput: {
    height: 'auto',
    width: '80%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    fontSize: 20,
  },
  buttonContainer: {
    height: 'auto',
    width: '20%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    alignContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
    bottom: 3,
  },
  messageList: {
    overflow: 'hidden',
    maxHeight: 615,
    height: 'auto',
  },
  expandedContainer: {
    overflow: 'hidden',
    maxHeight: 355,
    height: 'auto',
  },
  currentUser: {
    height: 'auto',
    backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    width: '75%',
    display: 'flex',
    marginTop: 10,
    padding: 7,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  otherUsers: {
    height: 'auto',
    backgroundColor: '#ABDA9A',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    width: '75%',
    display: 'flex',
    marginTop: 10,
    padding: 7,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
});
