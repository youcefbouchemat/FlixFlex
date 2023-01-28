import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../assets/colors';
import * as Animatable from 'react-native-animatable';
import Logo from '../../assets/images/logo.png';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Animatable.Image
        source={Logo}
        animation="bounceIn"
        iterationCount={1}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {height: 200, width: 200},
});
