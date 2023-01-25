import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import colors from '../../assets/colors';
import {Image} from 'react-native';
import {imageBaseUrl} from '../../config';
import {SharedElement} from 'react-navigation-shared-element';

const MovieDetails = ({route}) => {
  const id = route.params.data.id;
  const title = route.params.data.original_title;
  const overview = route.params.data.overview;
  const isAdult = route.params.data.adult;
  const image = route.params.data.backdrop_path;
  const releaseDate = route.params.data.release_date;
  const note = route.params.data.vote_average;

  return (
    <SafeAreaView style={styles.container}>
      <SharedElement id={`image_${id}`}>
        <Image
          source={{uri: imageBaseUrl + image}}
          style={styles.image}
          resizeMode="cover"
        />
      </SharedElement>
    </SafeAreaView>
  );
};

MovieDetails.sharedElements = route => {
  const id = route.params.data.id;

  return [
    {
      id: `image_${id}`,
    },
  ];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    height: 300,
    width: '100%',
  },
});
export default MovieDetails;
