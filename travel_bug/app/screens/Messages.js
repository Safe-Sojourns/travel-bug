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
  Switch,
  Image,
} from 'react-native';

const socket = io('http://localhost:4000');

export default function Messages({
  user,
  urgentMessage,
  setUrgentMessage,
  admin,
}) {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentUser, setCurrentUser] = useState('');
  const [urgent, setUrgent] = useState(false);

  const toggleSwitch = () => {
    setUrgent(previousState => !previousState);
    setUrgentMessage(true);
  };

  useEffect(() => {
    socket.on('new messages', msg => {
      setChatMessages([...chatMessages, msg]);
    });
    scroll.current.scrollToEnd();
    setCurrentUser(user);
  }, [chatMessages, user]);

  const scroll = useRef();

  function submitMessage() {
    const date = new Date();
    const formattedDate = date.toString().split(' ').slice(0, 5).join(' ');
    socket.emit('chat message', {
      user: 'Luci2',
      message: chatMessage,
      date: formattedDate,
      isUrgent: urgent,
    });
    setUrgent(false);
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
            opacity:0.06,
          }}
          source={require('./assets/travelbackground.jpeg')}
        />
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
              admin={admin}
              urgent={message.isUrgent}
            />
          ))}
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
          <Text style={{alignSelf: 'center', paddingLeft: 5}}>Urgent</Text>
          <Switch
            trackColor={{false: '#767577', true: '#ABDA9A'}}
            onValueChange={toggleSwitch}
            value={urgent}
          />
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

const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    // backgroundColor: '#EAF9FF',
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
    width: '17%',
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
  // headerText: {
  //   fontSize: 20,
  //   display: 'flex',
  //   alignSelf: 'center',
  //   paddingTop: 30,
  // },
  // viewHeader: {
  //   backgroundColor: 'white',
  //   height: 90,
  //   display: 'flex',
  //   justifyContent: 'center',
  // },
});

const MessageListEntry = ({currentUser, user, message, date, urgent}) => (
  <View style={user === currentUser ? styles.currentUser : styles.otherUsers}>
    <Text style={{fontWeight: '700', paddingBottom: 5}}>{user}</Text>
    <Text style={urgent ? {color: 'red'} : {paddingBottom: 5}}>{message}</Text>
    <Text style={{fontStyle: 'italic', fontSize: 9, alignSelf: 'flex-end'}}>
      {date}
    </Text>
  </View>
);
