function authenticationReducer(state, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER': {
      if (!action.payload) {
        return update(state, {
          authenticationKey: { $set: '' },
          currentUser: {
            id: { $set: '' },
            email: { $set: '' }
          }
        });
      }
      return update(state, {
        authenticationKey: { $set: action.payload.user.id },
        currentUser: {
          id: { $set: action.payload.user.id },
          email: { $set: action.payload.user.email }
        }
      });
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

export default authenticationReducer;
