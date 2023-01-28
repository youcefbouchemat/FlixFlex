import ActionName from './ActionName';

const INITIAL_STATE = {
  isSplash: true,
  isLogin: false,
  userName: null,
  userEmail: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionName.connecte:
      return {
        ...state,
        isLogin: true,
        userName: action.userName ? action.userName : state.userName,
        userEmail: action.userEmail,
      };
    case ActionName.disconnect:
      return {
        ...state,
        isLogin: false,
        userName: null,
        userEmail: null,
      };
    case ActionName.changeusername:
      return {
        ...state,
        userName: action.payload,
      };

    case ActionName.finishsplash:
      return {
        ...state,
        isSplash: false,
      };

    default:
      return state;
  }
};
