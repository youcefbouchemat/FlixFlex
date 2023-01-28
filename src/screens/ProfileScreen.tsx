import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import ActionName from '../redux/reducers/ActionName';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import {showSuccess, showWarning} from '../Messages';

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

  const deleteAccountAlert = useCallback(
    () =>
      Alert.alert(
        'Delete Account',
        'Are you sure you want to delete this Account ?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              console.log('OK Pressed');
              deleteAccount();
            },
          },
        ],
      ),
    [],
  );

  const deleteAccount = async () => {
    setDeleteAccountLoader(true);
    let user = auth().currentUser;
    console.log(user);

    await user
      ?.delete()
      .then(() => {
        showSuccess('Your account has been successfully deleted');
        dispatch({type: ActionName.disconnect});
      })
      .catch(error => {
        if (error.code === 'auth/requires-recent-login') {
          showWarning(
            'This operation is sensitive and requires recent authentication',
          );
        }
      });

    setDeleteAccountLoader(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.mainContainer}>
        <Text style={styles.mainText}>Hey {name}, Thank for using our App</Text>
        <View style={styles.operationsContainer}>
          <Text style={styles.operationText}>
            You can logout or delete this account
          </Text>
          <CustomButton
            text="Log out"
            onPress={signOut}
            isLoading={logoutLoader}
          />
          <CustomButton
            text="Delete account"
            onPress={deleteAccountAlert}
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
    padding: 16,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  operationsContainer: {
    alignItems: 'center',
  },
  mainText: {
    color: colors.white,
    fontFamily: fonts.boldFont,
    fontSize: 18,
  },
  operationText: {
    color: colors.white,
    fontFamily: fonts.semiBoldFont,
    fontSize: 16,
    marginBottom: 16,
  },
});
