/* eslint-disable react/no-unstable-nested-components */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import React from 'react';
import HomeTab from '../Screens/Tabs/HomeTab';
import SearchTab from '../Screens/Tabs/SearchTab';
import WishlistTab from '../Screens/Tabs/WishlistTab';
import ProfileTab from '../Screens/Tabs/ProfileTab';
const Tab = createBottomTabNavigator();
const BottomStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Search':
              iconName = 'search';
              break;
            case 'Wishist':
              iconName = 'heart';
              break;
            case 'Profile':
              iconName = 'person';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFCA45',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#001C29',
          borderTopWidth: 0,
          elevation: 5,
          shadowOpacity: 0.1,
          paddingVertical: 10,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Search" component={SearchTab} />
      <Tab.Screen name="Wishist" component={WishlistTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
};

export default BottomStack;
