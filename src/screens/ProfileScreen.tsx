import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import ActionName from '../redux/reducers/ActionName';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import colors from '../../assets/colors';

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
    <SafeAreaView style={styles.container}>
      <Header />
      <Text>{email}</Text>
      <Text>{name}</Text>
      <CustomButton text="Log out" onPress={signOut} />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
});
