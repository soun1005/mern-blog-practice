/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      // return original state
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    // initial property
    user: null,
  });

  // if user exists, stay logged in! -> so it will be logged in even if the page refresh
  useEffect(() => {
    // the 'user' that is saved in localstorage is 'json' so it needs to be parsed
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // if there are user email and token, patch login function
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  console.log('authContext state: ', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
