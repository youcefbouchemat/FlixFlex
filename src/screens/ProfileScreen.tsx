import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import ActionName from '../redux/reducers/ActionName';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import colors from '../../assets/colors';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const [logoutLoader, setLogoutLoader] = useState(false);

  const email = useSelector(state => state.AuthReducer.userEmail);
  const name = useSelector(state => state.AuthReducer.userName);

  const signOut = useCallback(async () => {
    setLogoutLoader(true);
    await auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        dispatch({type: ActionName.disconnect});
      });
    setLogoutLoader(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text>{email}</Text>
      <Text>{name}</Text>
      <CustomButton text="Log out" onPress={signOut} isLoading={logoutLoader} />
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
