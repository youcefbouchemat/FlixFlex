import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../assets/colors';
import Header from '../components/Header';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
});
