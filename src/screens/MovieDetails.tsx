import {
  ActivityIndicator,
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
import {ScrollView} from 'react-native';
import {Icon} from '@rneui/themed';
import axios from 'axios';
import axiosInstance from '../../config/axios';
import YoutubeIframe from 'react-native-youtube-iframe';
import MovieCard from '../components/MovieCard';
import fonts from '../../assets/fonts/fonts';

const MovieDetails = ({route}) => {
  const windowWidth = Dimensions.get('window').width;

  const id = route.params.data.id;
  const title = route.params.data.original_title;
  const overview = route.params.data.overview;
  const image = route.params.data.backdrop_path;
  const releaseDate = route.params.data.release_date;
  const note = route.params.data.vote_average;
  const voteCount = route.params.data.vote_count;

  const [youtubeKey, setYoutubeKey] = useState('');
  const [getYoutubeKey, setGetYoutubeKey] = useState(false);
  const [trailerIsPlaying, setTrailerIsPlaying] = useState(false);

  const [similarMoviesPage, setSimilarMoviesPage] = useState(1);
  const [similarMovies, setSimilarMovies] = useState([]);

  const [loader, setLoader] = useState(false);

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
      })
      .finally(() => {
        setGetYoutubeKey(true);
      });

    return () => {
      source.cancel();
    };
  }, [id]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoader(true);
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
      })
      .finally(() => {
        setLoader(false);
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
        <Image
          source={{uri: imageBaseUrl + image}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
          <View style={styles.rateContainer}>
            <View style={styles.rateMainContainer}>
              <Icon
                name="star"
                type="antdesign"
                size={25}
                color={colors.yellow}
              />
              <Text style={styles.noteText}>{note} / 10</Text>
            </View>
            <Text style={styles.voteCountText}>{voteCount} votes</Text>
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

        {getYoutubeKey == true && youtubeKey == '' ? (
          <View style={styles.noAvailableTrailerContainer}>
            <Text style={styles.noAvailableTrailerText}>
              No Available Trailer
            </Text>
          </View>
        ) : (
          <View style={styles.trailerContainer}>
            <Text style={styles.trailerText}>Trailer</Text>
            <YoutubeIframe
              height={500}
              width={windowWidth * 0.9}
              play={trailerIsPlaying}
              videoId={youtubeKey}
              onChangeState={onStateChange}
            />
          </View>
        )}

        {similarMovies.length > 0 && (
          <View>
            <Text style={styles.similarMoviesText}>Similar Movies</Text>
            <FlatList
              ref={flatListViewRef}
              data={similarMovies}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={item => `${item.id}_${Math.random()}`}
              ListFooterComponent={() => {
                return (
                  <View style={styles.loaderContainer}>
                    {loader && (
                      <ActivityIndicator
                        size={'large'}
                        color={colors.white}
                        style={styles.loader}
                      />
                    )}
                  </View>
                );
              }}
              onEndReached={() => {
                setSimilarMoviesPage(similarMoviesPage + 1);
              }}
              renderItem={({item, index}) => {
                return <MovieCard data={item} textColor={colors.black} />;
              }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  image: {
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  infoContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: fonts.boldFont,
    color: colors.white,
    fontSize: 20,
  },
  rateContainer: {
    alignItems: 'center',
  },
  rateMainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteText: {
    marginLeft: 10,
    fontFamily: fonts.semiBoldFont,
    color: colors.white,
    fontSize: 16,
  },
  voteCountText: {
    fontFamily: fonts.semiBoldFont,
    color: colors.white,
    fontSize: 13,
  },
  releaseDateContainer: {
    alignItems: 'center',
    padding: 16,
  },
  releaseDateText: {
    fontFamily: fonts.boldFont,
    color: colors.white,
    fontSize: 16,
  },
  overviewContainer: {
    padding: 16,
    backgroundColor: colors.transparentWhite,
  },
  overviewTitle: {
    fontFamily: fonts.boldFont,
    color: colors.black,
    fontSize: 18,
    marginBottom: 10,
  },
  overviewText: {
    fontFamily: fonts.semiBoldFont,
    textAlign: 'justify',
    fontSize: 14,
    color: colors.white,
  },
  trailerContainer: {
    alignItems: 'center',
    height: 300,
  },
  trailerText: {
    alignSelf: 'flex-start',
    padding: 16,
    fontFamily: fonts.boldFont,
    fontSize: 18,
    color: colors.white,
  },
  noAvailableTrailerContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAvailableTrailerText: {
    fontFamily: fonts.semiBoldFont,
    color: colors.white,
    fontSize: 16,
  },
  similarMoviesText: {
    padding: 16,
    fontFamily: fonts.boldFont,
    fontSize: 18,
    color: colors.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loader: {margin: 16},
});
export default MovieDetails;
