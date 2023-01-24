import {StyleSheet, Text, View, Animated, Dimensions} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import axiosInstance from '../../config/axios';
import TrendingMovieCard from './TrendingMovieCard';
import colors from '../../assets/colors';

const TrendingMovies = () => {
  const newMovieScrollX = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get('window').width;
  const dotposition = Animated.divide(newMovieScrollX, windowWidth);

  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axiosInstance
      .get('trending/movie/day?api_key=b488ff37b7bcb45680153eab3372c68e', {
        cancelToken: source.token,
      })
      .then(response => {
        setTrendingMovies(response.data.results);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('canceled', error);
        } else {
          console.log('error in getting trending movies', error);
        }
      });

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <>
      <Animated.FlatList
        horizontal
        pagingEnabled
        snapToAlignment={'center'}
        snapToInterval={windowWidth}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        contentContainerStyle={styles.flatlistContainer}
        data={trendingMovies}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: newMovieScrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => {
          return (
            <TrendingMovieCard
              title={item.original_title}
              image={item.backdrop_path}
            />
          );
        }}
      />
      <View style={styles.dotContainer}>
        {trendingMovies.map((item, index) => {
          const opacity = dotposition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotWidth = dotposition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 20, 6],
            extrapolate: 'clamp',
          });

          const dotColor = dotposition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [
              colors.placeholderText,
              colors.secondaryBackground,
              colors.placeholderText,
            ],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: 12,
                marginHorizontal: 3,
                width: dotWidth,
                opacity: opacity,
                height: 6,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    </>
  );
};

export default TrendingMovies;

const styles = StyleSheet.create({
  flatlistContainer: {
    marginTop: 12,
  },
  dotContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
