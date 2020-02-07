import React, { useReducer } from 'react';
import AuthenticationContext from './auth_context';
import authenticationReducer from './auth_reducer';

const AuthenticationProvider = ({ currentUser, children }) => {
  const [state, dispatch] = useReducer(authenticationReducer, {
    authenticationKey: '',
    currentUser: currentUser
      ? currentUser
      : {
          id: '',
          name: '',
          email: ''
        }
  });

  const value = React.useMemo(() => [state, dispatch], [state]);
  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
