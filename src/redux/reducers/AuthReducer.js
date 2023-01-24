import ActionName from './ActionName';

const INITIAL_STATE = {
  isLogin: false,
  userData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionName.connecte:
      return {
        ...state,
        isLogin: true,
        userData: action.payload,
      };
    case ActionName.disconnect:
      return {
        ...state,
        isLogin: false,
        userData: null,
      };
    default:
      return state;
  }
};
