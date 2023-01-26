import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import colors from '../../assets/colors';
import Header from '../components/Header';
import TrendingMovies from '../components/TrendingMovies';
import fonts from '../../assets/fonts/fonts';
import MoviesFlatList from '../components/MoviesFlatList';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <Text style={styles.trendingTextHeader}>Trending Movies</Text>
        <TrendingMovies />

        <MoviesFlatList title="Playing Now" endpoint="movie/now_playing" />
        <MoviesFlatList title="Top Rated" endpoint="movie/top_rated" />
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
  mainTextHeader: {
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
