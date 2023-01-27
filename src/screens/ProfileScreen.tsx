import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import ActionName from '../redux/reducers/ActionName';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const [logoutLoader, setLogoutLoader] = useState(false);
  const [deleteAccountLoader, setDeleteAccountLoader] = useState(false);

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

  const deleteAccount = useCallback(async () => {
    setDeleteAccountLoader(true);
    let user = auth().currentUser;
    console.log(user);

    await user
      ?.delete()
      .then(() => console.log('User deleted'))
      .catch(error => console.log(error));

    setDeleteAccountLoader(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.mainContainer}>
        <Text>Hey {name}, Thank for using our App</Text>
        <View style={styles.operationsContainer}>
          <Text style={styles.operationtext}>
            You can logout or delete this account You can logout or delete this
            account You can logout or delete this account
          </Text>
          <CustomButton
            text="Log out"
            onPress={signOut}
            isLoading={logoutLoader}
          />
          <CustomButton
            text="Log out"
            onPress={deleteAccount}
            isLoading={deleteAccountLoader}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  operationsContainer: {
    alignItems: 'center',
    padding: 16,
  },
  operationtext: {
    color: colors.white,
    fontFamily: fonts.semiBoldFont,
    fontSize: 16,
    marginBottom: 16,
  },
});
