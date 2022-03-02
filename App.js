import React, {useEffect, useState, useContext} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import Tabs from './navigation/Tab';
import {StoreContext} from './store';
import {httpClient} from './utils/HttpClient';
import {Login} from './screens';

const Stack = createStackNavigator();

const App = () => {
  const {
    auth: {isLogin, upDateLogin},
    userStore: {upDateProfile},
    orderStore: {uoDateOrder},
  } = useContext(StoreContext);

  useEffect(async () => {
    const getProfile = () => {
      httpClient
        .get('http://localhost:2200/personnel/me')
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
        .get('http://localhost:2200/order/mobile')
        .then(res => {
          uoDateOrder(res.data.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    };

    const credentials = await Keychain.getGenericPassword();
    if (credentials.password) {
      getProfile();
      getOrder();
    }
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'App'}>
        {isLogin ? (
          <Stack.Screen name="App" component={Tabs} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
