import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import colors from '../../assets/colors';

const MoviesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text>MoviesScreen</Text>
    </SafeAreaView>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
});
