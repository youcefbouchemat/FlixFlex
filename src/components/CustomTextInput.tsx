import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../../assets/colors';
import {Icon} from '@rneui/themed';
import fonts from '../../assets/fonts/fonts';

const CustomTextInput = props => {
  const [eye, setEye] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={colors.placeholderText}
          style={styles.text}
          value={props.value}
          secureTextEntry={props.isPassword && eye}
          onChangeText={text => {
            props.setValue(text);
          }}
        />
        {props.isPassword && (
          <Icon
            name={eye ? 'visibility' : 'visibility-off'}
            type="material"
            size={20}
            color={colors.placeholderText}
            onPress={() => {
              setEye(!eye);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.placeholderBackground,
    width: '80%',
    maxWidth: 500,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 30,
  },
  secondContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    flex: 1,
    fontFamily: fonts.semiBoldFont,
  },
});
