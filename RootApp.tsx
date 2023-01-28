import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import BottomNavBar from './src/components/BottomNavBar';
import {useDispatch, useSelector} from 'react-redux';
import MovieDetails from './src/screens/MovieDetails';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import ActionName from './src/redux/reducers/ActionName';
import SplashScreen from './src/screens/SplashScreen';

const RootApp = () => {
  const Stack = createStackNavigator();
  const isSplash = useSelector(state => state.AuthReducer.isSplash);
  const isLogin = useSelector(state => state.AuthReducer.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log({user});

    if (user) {
      dispatch({
        type: ActionName.connecte,
        userName: user.displayName,
        userEmail: user.email,
      });
    }
    setTimeout(() => {
      dispatch({type: ActionName.finishsplash});
    }, 500);
  }

  return (
    <NavigationContainer>
      {isSplash ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
      ) : isLogin ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="BottomNavBar" component={BottomNavBar} />
          <Stack.Screen
            name="MovieDetails"
            component={MovieDetails}
            options={{
              animationEnabled: false,
            }}
          />
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
