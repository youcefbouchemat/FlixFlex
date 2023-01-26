import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import colors from '../../assets/colors';
import {Image} from 'react-native';
import Logo from '../../assets/images/logo.png';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import {showError} from '../Messages';
import {useDispatch} from 'react-redux';
import ActionName from '../redux/reducers/ActionName';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signinLoader, setSigninLoader] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      dispatch({
        type: ActionName.connecte,
        userName: user.displayName,
        userEmail: user.email,
      });
    }
  }

  const signIn = useCallback(async () => {
    setSigninLoader(true);
    if (email == '' || password == '') {
      showError('Please fill out all required fields');
      return;
    }
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (regEmail.test(email) == false) {
      showError('Wrong Email format');
      return;
    }

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        dispatch({
          type: ActionName.connecte,
          userName: data.user.displayName,
          userEmail: data.user.email,
        });
      })
      .catch(error => {
        if (error.code == 'auth/invalid-email') {
          showError('Wrong email format');
        }
        if (error.code == 'auth/user-disabled') {
          showError(
            'The user corresponding to the given email has been disabled',
          );
        }
        if (error.code == 'auth/user-not-found') {
          showError('There is no user corresponding to the given email');
        }
        if (error.code == 'auth/wrong-password') {
          showError(
            'The password is invalid for the given email, or the account corresponding to the email does not have a password set',
          );
        }
      });
    setSigninLoader(false);
  }, [email, password]);

  const register = useCallback(() => {
    navigation.navigate('RegisterScreen');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Logo} style={{height: 180}} resizeMode="contain" />
      <View style={styles.body}>
        <CustomTextInput
          placeholder="Email address"
          value={email}
          setValue={setEmail}
        />

        <CustomTextInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          isPassword={true}
        />
        <CustomButton
          text="Sign In"
          onPress={signIn}
          isLoading={signinLoader}
        />
        <CustomButton text="Register" onPress={register} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 50,
  },
});
