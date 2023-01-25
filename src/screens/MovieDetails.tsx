import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import colors from '../../assets/colors';
import {Image} from 'react-native';
import {imageBaseUrl, youtubeUrl} from '../../config';
import {SharedElement} from 'react-navigation-shared-element';
import {ScrollView} from 'react-native';
import {Icon} from '@rneui/themed';
import axios from 'axios';
import axiosInstance from '../../config/axios';
import YoutubeIframe from 'react-native-youtube-iframe';
import MovieCard from '../components/MovieCard';

const MovieDetails = ({route}) => {
  const windowWidth = Dimensions.get('window').width;

  const id = route.params.data.id;
  const title = route.params.data.original_title;
  const overview = route.params.data.overview;
  const isAdult = route.params.data.adult;
  const image = route.params.data.backdrop_path;
  const releaseDate = route.params.data.release_date;
  const note = route.params.data.vote_average;
  const voteCount = route.params.data.vote_count;

  const [youtubeKey, setYoutubeKey] = useState('');
  const [trailerIsPlaying, setTrailerIsPlaying] = useState(false);

  const [similarMoviesPage, setSimilarMoviesPage] = useState(1);
  const [similarMovies, setSimilarMovies] = useState([]);

  const scrollViewRef = useRef<ScrollView>();

  const flatListViewRef = useRef<FlatList>();

  useEffect(() => {
    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
    flatListViewRef.current?.scrollToOffset({animated: true, offset: 0});
    const source = axios.CancelToken.source();
    axiosInstance
      .get(
        `movie/${id}/videos?api_key=b488ff37b7bcb45680153eab3372c68e&language=en-US`,
        {
          cancelToken: source.token,
        },
      )
      .then(response => {
        setYoutubeKey(response.data.results[0].key);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('canceled', error);
        } else {
          console.log('error in getting trailer', error);
        }
      });

    return () => {
      source.cancel();
    };
  }, [id]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axiosInstance
      .get(
        `movie/${id}/similar?api_key=b488ff37b7bcb45680153eab3372c68e&language=en-US&page=${similarMoviesPage}`,
        {
          cancelToken: source.token,
        },
      )
      .then(response => {
        setSimilarMovies(similarMovies.concat(response.data.results));
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('canceled', error);
        } else {
          console.log('error in getting similare movies', error);
        }
      });

    return () => {
      source.cancel();
    };
  }, [similarMoviesPage]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axiosInstance
      .get(
        `movie/${id}/similar?api_key=b488ff37b7bcb45680153eab3372c68e&language=en-US&page=${similarMoviesPage}`,
        {
          cancelToken: source.token,
        },
      )
      .then(response => {
        setSimilarMovies(response.data.results);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('canceled', error);
        } else {
          console.log('error in getting similare movies', error);
        }
      });

    return () => {
      source.cancel();
    };
  }, [id]);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setTrailerIsPlaying(false);
    } else if (state === 'playing') {
      setTrailerIsPlaying(true);
    } else if (state === 'paused') {
      setTrailerIsPlaying(false);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
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

        <View style={styles.trailerContainer}>
          <Text style={styles.trailerText}>Trailer</Text>
          {youtubeKey == '' ? (
            <Text style={styles.noAvailableTrailer}>No Available Trailer</Text>
          ) : (
            <YoutubeIframe
              height={500}
              width={windowWidth * 0.9}
              play={trailerIsPlaying}
              videoId={youtubeUrl + youtubeKey}
              onChangeState={onStateChange}
            />
          )}
        </View>
        {similarMovies.length > 0 && (
          <View>
            <Text
              onPress={() => {
                setSimilarMoviesPage(similarMoviesPage + 1);
              }}>
              Similar Movies
            </Text>
            <FlatList
              ref={flatListViewRef}
              data={similarMovies}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={item => `${item.id}_${Math.random()}`}
              renderItem={({item, index}) => {
                return (
                  <MovieCard
                    data={item}
                    textColor={colors.black}
                    refScroll={scrollViewRef}
                  />
                );
              }}
            />
          </View>
        )}
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
  trailerContainer: {
    alignItems: 'center',
    height: 300,
  },
  trailerText: {
    alignSelf: 'flex-start',
    padding: 16,
  },
  noAvailableTrailer: {},
});
export default MovieDetails;
