import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TabBarButton from './TabBarButton';
import colors from '../../assets/colors';
import HomeScreen from '../screens/HomeScreen';
import MoviesScreen from '../screens/MoviesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const bottomBars = [
  {
    route: 'Home',
    label: 'Home',
    type: 'antdesign',
    icon: 'home',
    color: colors.primaryLite,
    component: HomeScreen,
  },
  {
    route: 'Movie',
    label: 'Movie',
    type: 'material',
    icon: 'local-movies',
    color: colors.secondaryBackground,
    component: MoviesScreen,
  },

  {
    route: 'Profile',
    label: 'Profile',
    type: 'antdesign',
    icon: 'user',
    color: colors.primaryPink,
    component: ProfileScreen,
  },
];

const BottomNavBar = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
          backgroundColor: colors.primaryBackground,
        },
      }}>
      {bottomBars.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabBarButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};
export default BottomNavBar;
