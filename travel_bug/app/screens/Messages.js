import React, {useEffect, useState, useRef} from 'react';
import {io} from 'socket.io-client';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faImages} from '@fortawesome/free-solid-svg-icons';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Switch,
  TouchableOpacity,
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

  // function checkPermission() {
  //   check(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
  //     switch()
  //     console.log(result);
  //   });
  // }

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
      <KeyboardAvoidingView
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
          <TouchableOpacity>
            <FontAwesomeIcon
              icon={faImages}
              size={30}
              color="blue"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
              }}
              // onPress={checkPermission}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          multiline
          value={chatMessage}
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
      </KeyboardAvoidingView>
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
    backgroundColor: '#EAF9FF',
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
    backgroundColor: 'white',
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
    maxHeight: 365,
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
