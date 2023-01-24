import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../assets/colors';
import Header from '../components/Header';
import TrendingMovies from '../components/TrendingMovies';
import fonts from '../../assets/fonts/fonts';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />

        <Text style={styles.trendingTextHeader}>Trending Movies</Text>

        <TrendingMovies />
        <Text>HomeScreen</Text>
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
  },
  trendingTextHeader: {
    color: colors.white,
    fontFamily: fonts.boldFont,
    fontSize: 25,
  },
});
