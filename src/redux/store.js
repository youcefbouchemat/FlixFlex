/* eslint-disable */
import {createStore, combineReducers} from 'redux';
import AuthReducer from './reducers/AuthReducer';

const RootReducers = combineReducers({
  AuthReducer,
});

export const store = createStore(RootReducers);
