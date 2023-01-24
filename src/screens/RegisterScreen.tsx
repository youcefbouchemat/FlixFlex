import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import colors from '../../assets/colors';
import Logo from '../../assets/images/logo.png';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

import auth from '@react-native-firebase/auth';
import {showError} from '../Messages';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = useCallback(() => {
    if (username == '' || email == '' || password == '') {
      showError('Please fill out all required fields');
      return;
    }
    if (username.length < 5) {
      showError('Username must be at least 5 characters');
      return;
    }

    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (regEmail.test(email) == false) {
      showError('Wrong Email format');
      return;
    }

    const regPassword = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
    );
    if (regPassword.test(password) == false) {
      showError(
        'Password must contain 8 characters, uppercase, lowercase, and a number',
      );
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async user => {
        user.user.updateProfile({
          displayName: username,
        });
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          showError('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          showError('That email address is invalid!');
        }
      });
  }, [username, email, password]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Logo} style={{height: 150}} resizeMode="contain" />
      <View style={styles.body}>
        <CustomTextInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />

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
        <CustomButton text="Register" onPress={register} />
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  body: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
});
