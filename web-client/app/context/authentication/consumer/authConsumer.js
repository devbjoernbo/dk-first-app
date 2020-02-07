import AuthenticationContext from '../auth_context';

function useAuthenticationConsumer() {
  const context = React.useContext(AuthenticationContext);
  const [state, dispatch] = context;

  if (!context) {
    throw new Error(
      `useAuthentication must be used within a AuthenticationProvider`
    );
  }

  const setCurrentUser = user => {
    if (!user) {
      // remove currentUser
      dispatch({ type: 'SET_CURRENT_USER' });
    } else {
      // add currentUser with user-props from args
      dispatch({ type: 'SET_CURRENT_USER', payload: { user } });
    }
  };

  return [state, { setCurrentUser }];
}

export default useAuthenticationConsumer;
