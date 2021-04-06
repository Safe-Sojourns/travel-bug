import React, {useEffect, useState, useRef} from 'react';
import {io} from 'socket.io-client';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const socket = io('http://localhost:4000');

export default function Messages() {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState('LuciEric');
  //eventually change user to what is passed down in props

  useEffect(() => {
    socket.on('new messages', msg => {
      setChatMessages([...chatMessages, msg]);
      // setChatMessage('');
    });
    scroll.current.scrollToEnd();
  }, [chatMessages]);

  const scroll = useRef();

  function submitMessage() {
    const date = new Date();
    const formattedDate = getDate(date.toString());
    socket.emit('chat message', {
      user: currentUser,
      message: chatMessage,
      date: formattedDate,
    });
    setChatMessage('');
    scroll.current.scrollToEnd();
  }

  const getDate = date => {
    const dateArr = date.slice(0, date.indexOf('T')).split('-');
    const year = dateArr.shift();
    dateArr.push(year);
    return dateArr.join('-');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageList} ref={scroll}>
        {chatMessages.map((message, index) => (
          <MessageListEntry
            key={index}
            message={message.message}
            user={message.user}
            date={message.date}
          />
        ))}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.footer}>
        <TextInput
          multiline
          value={chatMessage}
          onChangeText={message => setChatMessage(message)}
          style={styles.textInput}
          onSubmitEditing={submitMessage}
          keyboardType="default"
        />
        <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    backgroundColor: '#ABDA9A',
  },
  messageContainer: {
    height: 'auto',
    backgroundColor: '#EAF9FF',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    width: '75%',
    display: 'flex',
    alignSelf: 'center',
    marginTop: 10,
    padding: 7,
  },
  textInput: {
    height: 50,
    width: '80%',
    backgroundColor: '#EAF9FF',
    borderWidth: 1,
    top: 625,
    borderStyle: 'solid',
    borderRadius: 10,
    bottom: 0,
    padding: 10,
  },
  buttonContainer: {
    height: 50,
    top: 625,
    width: '20%',
    backgroundColor: '#EAF9FF',
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
  },
  messageList: {
    overflow: 'hidden',
    maxHeight: 600,
  },
});

const MessageListEntry = ({user, message, date}) => (
  <View style={styles.messageContainer}>
    <Text style={{fontWeight: '700', paddingBottom: 5}}>{user}</Text>
    <Text style={{paddingBottom: 5}}>{message}</Text>
    <Text style={{fontStyle: 'italic', fontSize: 9, alignSelf: 'flex-end'}}>
      {date}
    </Text>
  </View>
);
