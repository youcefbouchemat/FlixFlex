import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import axiosInstance from '../../config/axios';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import MovieCard from './MovieCard';

const MoviesFlatList = props => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [moviesPage, setMoviesPage] = useState(1);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoader(true);
    axiosInstance
      .get(
        `${props.endpoint}?api_key=b488ff37b7bcb45680153eab3372c68e&language=en-US&page=${moviesPage}`,
        {
          cancelToken: source.token,
        },
      )
      .then(response => {
        setMovies([...movies, ...response.data.results]);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('canceled', error);
        } else {
          console.log('error in getting playing now movies', error);
        }
      })
      .finally(() => {
        setLoader(false);
      });

    return () => {
      source.cancel();
    };
  }, [moviesPage]);
  return (
    <>
      <Text style={styles.mainTextHeader}>{props.title}</Text>
      <FlatList
        data={movies}
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
          setMoviesPage(moviesPage + 1);
        }}
        renderItem={({item, index}) => {
          return <MovieCard data={item} textColor={colors.black} />;
        }}
      />
    </>
  );
};

export default MoviesFlatList;

const styles = StyleSheet.create({
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
