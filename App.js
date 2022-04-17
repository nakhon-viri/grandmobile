import React, {useEffect, useState, useContext} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import Tabs from './navigation/Tab';
import {StoreContext} from './store';
import {httpClient} from './utils/HttpClient';
import {Login, OrderDetail} from './screens';
import io from 'socket.io-client';

const Stack = createStackNavigator();

const App = () => {
  const {
    auth: {isLogin, upDateLogin},
    userStore: {profile, upDateProfile},
    orderStore: {order, upDateOrder},
  } = useContext(StoreContext);

  useEffect(() => {
    const newSocket = io('http://localhost:2200');
    newSocket.emit('addUser', profile?._id);
    newSocket.on('arrayValue', data => {
      // console.log(data);
      // upDateOrder([...order, data]);
      httpClient
        .get('http://192.168.1.20:2200/order/mobile')
        .then(res => {
          upDateOrder(res.data.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    });

    return () => newSocket.close();
  }, [profile]);

  useEffect(() => {
    const getProfile = () => {
      httpClient
        .get('http://192.168.1.20:2200/personnel/me')
        .then(res => {
          upDateProfile(res.data);
          upDateLogin(true);
        })
        .catch(err => {
          console.log(err.response);
        });
    };

    const getOrder = () => {
      httpClient
        .get('http://192.168.1.20:2200/order/mobile')
        .then(res => {
          upDateOrder(res.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    };

    const getData = async () => {
      const credentials = await Keychain.getGenericPassword();
      if (credentials.password) {
        getProfile();
        getOrder();
      } else {
        upDateLogin(false);
        upDateOrder(null);
        upDateProfile(null);
      }
    };

    getData();
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogin ? (
          <>
            <Stack.Screen
              name="App"
              component={Tabs}
              options={{
                tabBarLabel: 'วันนี้',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="OrderDetail"
              component={OrderDetail}
              options={{
                headerTitle: 'รายละเอียด',
                headerTitleStyle: {
                  fontFamily: 'Kanit-Regular',
                  color: '#000',
                },
                headerStyle: {
                  borderBottomWidth: 0.2,
                },
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
              }}
            />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
