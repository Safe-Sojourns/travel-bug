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
  SafeAreaView,
} from 'react-native';

const socket = io('http://localhost:4000');

export default function Messages() {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentUser, setCurrentUser] = useState('student1');
  //eventually change user to what is passed down in props

  useEffect(() => {
    socket.on('new messages', msg => {
      setChatMessages([...chatMessages, msg]);
    });
    scroll.current.scrollToEnd();
  }, [chatMessages]);

  const scroll = useRef();

  function submitMessage() {
    const date = new Date();
    const formattedDate = date.toString().split(' ').slice(0, 5).join(' ');
    socket.emit('chat message', {
      user: currentUser,
      message: chatMessage,
      date: formattedDate,
    });
    setChatMessage('');
    scroll.current.scrollToEnd();
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <Text style={styles.headerText}>Messages</Text>
      </View>
      <SafeAreaView>
        <ScrollView
          onTouchStart={() => setIsExpanded(false)}
          style={isExpanded ? styles.expandedContainer : styles.messageList}
          ref={scroll}>
          {chatMessages.map((message, index) => (
            <MessageListEntry
              key={index}
              message={message.message}
              currentUser={currentUser}
              user={message.user}
              date={message.date}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
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
          onFocus={() => {
            setIsExpanded(true);
            scroll.current.scrollToEnd();
          }}
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
    backgroundColor: '#EAF9FF',
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
    bottom: 8,
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
    backgroundColor: '#EAF9FF',
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
    backgroundColor: 'white',
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
  headerText: {
    fontSize: 20,
    display: 'flex',
    alignSelf: 'center',
    paddingTop: 30,
  },
  viewHeader: {
    backgroundColor: '#EAF9FF',
    height: 90,
    display: 'flex',
    justifyContent: 'center',
  },
});

const MessageListEntry = ({currentUser, user, message, date}) => (
  <View style={user === currentUser ? styles.currentUser : styles.otherUsers}>
    <Text style={{fontWeight: '700', paddingBottom: 5}}>{user}</Text>
    <Text style={{paddingBottom: 5}}>{message}</Text>
    <Text style={{fontStyle: 'italic', fontSize: 9, alignSelf: 'flex-end'}}>
      {date}
    </Text>
  </View>
);
