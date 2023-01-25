import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {imageBaseUrl} from '../../config';
import {useNavigation} from '@react-navigation/native';
import fonts from '../../assets/fonts/fonts';
import colors from '../../assets/colors';

const MovieCard = props => {
  const navigation = useNavigation();
  const movie = props.data;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('MovieDetails', {
          data: movie,
        });
      }}>
      <Image
        source={{uri: imageBaseUrl + movie.backdrop_path}}
        style={styles.image}
      />
      <Text style={styles.text}>{movie.original_title}</Text>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {width: 180, padding: 10, alignItems: 'center'},
  image: {height: 200, width: 150, borderRadius: 12},
  text: {
    marginTop: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontFamily: fonts.semiBoldFont,
    fontSize: 15,
    color: colors.white,
  },
});
