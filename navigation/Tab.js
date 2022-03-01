import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';

import {Order} from '../screens';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Order} />
      <Tab.Screen name="Portfolio" component={Order} />
      <Tab.Screen name="Transaction" component={Order} />
      <Tab.Screen name="Prices" component={Order} />
      <Tab.Screen name="Settings" component={Order} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#4481eb",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Tabs;
