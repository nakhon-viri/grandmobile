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
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: [
          {
            position: 'absolute',
            left: 0,
            bottom: 0,
            right: 0,
            paddingTop: 10,
            borderTopColor: 'transparent',
            backgroundColor: '#fff',
            // elevation: 0,
            height: 90,
          },
          null,
        ],
        // tabBarIcon: ({color, size}) => {
        //   if (route.name === 'order') {
        //     return <Icon name="truck" size={size} color={color} />;
        //   } else if (route.name === 'history') {
        //     return <Icon name="history" size={size} color={color} />;
        //   } else if (route.name === 'revenue') {
        //     return <Icon name="hand-holding-usd" size={size} color={color} />;
        //   }
        // },
        // tabBarInactiveTintColor: 'gray',
        // tabBarActiveTintColor: '#1a73e8',
      })}>
      <Tab.Screen
        name="order"
        component={Order}
        options={{
          tabBarLabel: 'งานที่กำลังทำ',
        }}
        // options={{tabBarBadge: 3}}
      />
      <Tab.Screen
        name="history"
        component={Order}
        options={{
          tabBarLabel: 'ประวัติการทำงาน',
        }}
      />
      <Tab.Screen
        name="revenue"
        component={Order}
        options={{
          tabBarLabel: 'ประวัติการทำงาน',
        }}
      />
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
