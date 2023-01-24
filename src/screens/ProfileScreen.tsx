import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import ActionName from '../redux/reducers/ActionName';
import CustomButton from '../components/CustomButton';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.AuthReducer.userEmail);
  const name = useSelector(state => state.AuthReducer.userName);

  const signOut = useCallback(() => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        dispatch({type: ActionName.disconnect});
      });
  }, []);

  return (
    <View>
      <Text>{email}</Text>
      <Text>{name}</Text>
      <CustomButton text="Log out" onPress={signOut} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
