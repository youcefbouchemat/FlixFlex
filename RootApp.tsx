import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import BottomNavBar from './src/components/BottomNavBar';
import {useSelector} from 'react-redux';
import MovieDetails from './src/screens/MovieDetails';
import {createStackNavigator} from '@react-navigation/stack';

const RootApp = () => {
  const Stack = createStackNavigator();
  const isLogin = useSelector(state => state.AuthReducer.isLogin);
  return (
    <NavigationContainer>
      {isLogin ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="BottomNavBar" component={BottomNavBar} />
          <Stack.Screen name="MovieDetails" component={MovieDetails} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootApp;
