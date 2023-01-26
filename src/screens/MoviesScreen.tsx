import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../components/Header';
import colors from '../../assets/colors';
import {ButtonGroup, SearchBar} from '@rneui/themed';
import fonts from '../../assets/fonts/fonts';
import axios from 'axios';
import axiosInstance from '../../config/axios';
import MovieCard from '../components/MovieCard';

const MoviesScreen = () => {
  const windowWidth = Dimensions.get('window').width;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [moviesList, setMoviesList] = useState([]);
  const [moviesPage, setMoviesPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState('');
  const flatListViewRef = useRef<FlatList>();

  const shuffle = array => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    axiosInstance
      .get(
        `movie/popular?api_key=b488ff37b7bcb45680153eab3372c68e&language=en-US&page=${moviesPage}`,
        {
          cancelToken: source.token,
        },
      )
      .then(response => {
        console.log('response page', moviesPage);

        setMoviesList([...moviesList, ...response.data.results]);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('canceled', error);
        } else {
          console.log('error in getting movies', error);
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
    <SafeAreaView style={styles.container}>
      <Header />
      <ButtonGroup
        buttons={['All Movies', 'Top Rated', 'Most Popular']}
        selectedIndex={selectedIndex}
        onPress={value => {
          setSelectedIndex(value);
          flatListViewRef.current?.scrollToOffset({animated: true, offset: 0});
          if (value == 0) {
            setMoviesList(shuffle(moviesList));
          } else if (value == 1) {
            setMoviesList(
              moviesList.sort((movie1, movie2) =>
                movie1.vote_average < movie2.vote_average
                  ? 1
                  : movie1.vote_average > movie2.vote_average
                  ? -1
                  : 0,
              ),
            );
          } else if (value == 2) {
            setMoviesList(
              moviesList.sort((movie1, movie2) =>
                movie1.popularity < movie2.popularity
                  ? 1
                  : movie1.popularity > movie2.popularity
                  ? -1
                  : 0,
              ),
            );
          }
        }}
        containerStyle={styles.buttonGroup}
      />
      <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarContainerInput}
        inputStyle={styles.searchBarInput}
      />
      <FlatList
        ref={flatListViewRef}
        data={moviesList.filter(movie => movie.original_title.includes(search))}
        numColumns={parseInt(windowWidth / 170)}
        contentContainerStyle={styles.flatlist}
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
          if (search.length == 0 && selectedIndex == 0) {
            setMoviesPage(moviesPage + 1);
          }
        }}
        renderItem={({item, index}) => {
          return <MovieCard data={item} textColor={colors.black} />;
        }}
      />
    </SafeAreaView>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  buttonGroup: {
    backgroundColor: colors.primaryBackground,
    borderRadius: 40,
  },
  searchBarContainer: {
    backgroundColor: colors.primaryBackground,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarContainerInput: {
    borderRadius: 10,
    backgroundColor: colors.placeholderBackground,
  },
  searchBarInput: {
    color: colors.white,
    fontFamily: fonts.semiBoldFont,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loader: {margin: 16},
  flatlist: {alignItems: 'center', paddingBottom: 80},
});
