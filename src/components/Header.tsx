import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} resizeMode="contain" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {height: 90},
});
