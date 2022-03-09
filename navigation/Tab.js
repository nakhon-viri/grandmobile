import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {Order, Profile, Home, Financial} from '../screens';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: [
          {
            position: 'absolute',
            left: 0,
            bottom: 0,
            right: 0,
            paddingTop: 10,
            borderTopColor: 'transparent',
            backgroundColor: '#fff',
            height: 90,
          },
          null,
        ],
        tabBarLabelStyle: {
          left: 0,
          bottom: 8,
          right: 0,
        },
        tabBarIconStyle: {
          padding: 0,
          marginBottom: 10,
        },
        tabBarIcon: ({color, size}) => {
          if (route.name === 'order') {
            return <Icon name="truck" size={size} color={color} />;
          } else if (route.name === 'history') {
            return <Icon name="history" size={size} color={color} />;
          } else if (route.name === 'revenue') {
            return <Icon name="hand-holding-usd" size={size} color={color} />;
          } else if (route.name === 'profile') {
            return <Icon name="user-alt" size={size} color={color} />;
          }
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#1a73e8',
        unmountOnBlur: true,
      })}>
      <Tab.Screen
        name="order"
        // options={{tabBarBadge: 3}}
        component={Home}
        options={{
          headerTitle: 'วันนี้',
          tabBarLabel: 'วันนี้',
          headerTitleStyle: {
            fontFamily: 'Kanit-Light',
          },
          headerStyle: {
            borderBottomWidth: 0.2,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="history"
        component={Order}
        options={{
          headerTitle: 'ประวัติการทำงาน',
          tabBarLabel: 'ประวัติงาน',
          headerTitleStyle: {
            fontFamily: 'Kanit-Light',
          },
          headerStyle: {
            borderBottomWidth: 0.2,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="revenue"
        component={Financial}
        options={{
          headerTitle: 'การเงิน',
          tabBarLabel: 'การเงิน',
          headerTitleStyle: {
            fontFamily: 'Kanit-Light',
          },
          headerStyle: {
            borderBottomWidth: 0.2,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          headerTitle: 'ฉัน',
          tabBarLabel: 'ฉัน',
          headerTitleStyle: {
            fontFamily: 'Kanit-Light',
          },
          headerStyle: {
            borderBottomWidth: 0.2,
          },
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
