import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import colors from '../../assets/colors';
import {Image} from 'react-native';
import Logo from '../../assets/images/logo.png';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = useCallback(() => {
    console.log({email});
  }, [email, password]);

  const register = useCallback(() => {
    console.log({password});
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
        <CustomButton text="Sign In" onPress={signIn} />
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
