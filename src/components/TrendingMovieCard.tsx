import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {imageBaseUrl} from '../../config';
import fonts from '../../assets/fonts/fonts';
import colors from '../../assets/colors';

const TrendingMovieCard = props => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <Pressable
      style={{
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ImageBackground
        source={{uri: imageBaseUrl + props.image}}
        resizeMode="cover"
        imageStyle={styles.image}
        style={{
          width: windowWidth * 0.85,
          height: windowWidth * 0.85,
          justifyContent: 'flex-end',
        }}>
        <View style={styles.movieTextContainer}>
          <Text style={styles.movieText}>{props.title}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default TrendingMovieCard;

const styles = StyleSheet.create({
  image: {
    borderRadius: 40,
  },
  movieTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: colors.alphaBlackBackground,
    padding: 10,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  movieText: {
    fontFamily: fonts.boldFont,
    color: colors.white,
    fontSize: 25,
    textAlign: 'center',
  },
});
