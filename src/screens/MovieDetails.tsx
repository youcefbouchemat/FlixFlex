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
import {ScrollView} from 'react-native';
import {Icon} from '@rneui/themed';

const MovieDetails = ({route}) => {
  const id = route.params.data.id;
  const title = route.params.data.original_title;
  const overview = route.params.data.overview;
  const isAdult = route.params.data.adult;
  const image = route.params.data.backdrop_path;
  const releaseDate = route.params.data.release_date;
  const note = route.params.data.vote_average;
  const voteCount = route.params.data.vote_count;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SharedElement id={`image_${id}`}>
          <Image
            source={{uri: imageBaseUrl + image}}
            style={styles.image}
            resizeMode="cover"
          />
        </SharedElement>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text>{title}</Text>
          </View>
          <View style={styles.rateContainer}>
            <View style={styles.rateMainContainer}>
              <Icon
                name="heart-fill"
                type="octicon"
                size={25}
                color={colors.red}
              />
              <Text>{note}</Text>
            </View>
            <Text>{voteCount}</Text>
          </View>
        </View>
        <View style={styles.releaseDateContainer}>
          <Text style={styles.releaseDateText}>
            Release Date : {releaseDate}
          </Text>
        </View>
        <View style={styles.overviewContainer}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.overviewText}>{overview}</Text>
        </View>
      </ScrollView>
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
    height: 200,
    width: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  titleContainer: {
    flex: 1,
  },
  rateContainer: {
    alignItems: 'center',
  },
  rateMainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  releaseDateContainer: {
    alignItems: 'center',
    padding: 16,
  },
  releaseDateText: {},
  overviewContainer: {},
  overviewTitle: {},
  overviewText: {},
});
export default MovieDetails;
