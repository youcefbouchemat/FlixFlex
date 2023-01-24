import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';

const CustomButton = props => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.blue,
  },
  text: {
    color: colors.white,
    fontFamily: fonts.semiBoldFont,
  },
});
