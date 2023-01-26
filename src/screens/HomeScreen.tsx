import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../assets/colors';
import Header from '../components/Header';
import TrendingMovies from '../components/TrendingMovies';
import fonts from '../../assets/fonts/fonts';
import {ActivityIndicator} from 'react-native';
import MovieCard from '../components/MovieCard';
import axios from 'axios';
import axiosInstance from '../../config/axios';

const HomeScreen = () => {
  const [playingNowMovies, setPlayingNowMovies] = useState([]);
  const [playingNowLoader, setPlayingNowLoader] = useState(false);
  const [playingNowMoviesPage, setPlayingNowMoviesPage] = useState(1);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setPlayingNowLoader(true);
    axiosInstance
      .get(
        `movie/now_playing?api_key=b488ff37b7bcb45680153eab3372c68e&language=en-US&page=${playingNowMoviesPage}`,
        {
          cancelToken: source.token,
        },
      )
      .then(response => {
        setPlayingNowMovies(playingNowMovies.concat(response.data.results));
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('canceled', error);
        } else {
          console.log('error in getting similare movies', error);
        }
      })
      .finally(() => {
        setPlayingNowLoader(false);
      });

    return () => {
      source.cancel();
    };
  }, [playingNowMoviesPage]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <Text style={styles.trendingTextHeader}>Trending Movies</Text>
        <TrendingMovies />

        <Text style={styles.playingNowTextHeader}>Playing Now</Text>
        <FlatList
          data={playingNowMovies}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={item => `${item.id}_${Math.random()}`}
          ListFooterComponent={() => {
            return (
              <View style={styles.loaderContainer}>
                {playingNowLoader && (
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
            setPlayingNowMoviesPage(playingNowMoviesPage + 1);
          }}
          renderItem={({item, index}) => {
            return <MovieCard data={item} textColor={colors.black} />;
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 80,
  },
  trendingTextHeader: {
    color: colors.white,
    fontFamily: fonts.boldFont,
    fontSize: 25,
  },
  playingNowTextHeader: {
    color: colors.white,
    fontFamily: fonts.boldFont,
    fontSize: 25,
    alignSelf: 'flex-start',
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loader: {margin: 16},
});
