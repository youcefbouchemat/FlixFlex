import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import {ActivityIndicator} from 'react-native';

const CustomButton = props => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
      {props.isLoading ? (
        <ActivityIndicator size={'small'} color={colors.white} />
      ) : (
        <Text style={styles.text}>{props.text}</Text>
      )}
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
