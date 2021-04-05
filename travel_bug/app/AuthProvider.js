import React, {useState} from 'react';
import {AsyncStorage} from 'react-native';

export const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

// GENERAL SETUP, still need to handle the promise appropriately with AsyncStorage or change to a different system for handling auth

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {
          const fakeUser = {username: 'Frodo'};
          setUser(fakeUser);
          AsyncStorage.setItem('user', JSON.stringify(fakeUser));
        },
        logout: () => {
          AsyncStorage.removeItem('user');
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
