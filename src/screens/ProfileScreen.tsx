import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import ActionName from '../redux/reducers/ActionName';
import CustomButton from '../components/CustomButton';

const ProfileScreen = () => {
  const dispatch = useDispatch();
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
      <Text>ProfileScreen</Text>
      <CustomButton text="Log out" onPress={signOut} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
