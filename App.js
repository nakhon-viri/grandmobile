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
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';

const Stack = createStackNavigator();

const App = () => {
  const {
    auth: {isLogin, upDateLogin},
    userStore: {profile, upDateProfile, loadingProfile, upDateLoadingProfile},
    orderStore: {order, upDateOrder, loadingOrder, upDateLoadingOrder},
    socketStore: {upDateSocket},
  } = useContext(StoreContext);

  const createChannel = channelId => {
    PushNotification.createChannel(
      {
        channelId: channelId, // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };
  const showNotification = (channelId, options) => {
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: channelId, // (required) channelId, if the channel doesn't exist, notification will not trigger.
      largeIconUrl:
        'https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/react-128.png', // (optional) default: undefined
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      subText: options.subText, // (optional) default: none
      bigPictureUrl: options.bigImage, // (optional) default: undefined
      bigLargeIconUrl:
        'https://cdn0.iconfinder.com/data/icons/logos-brands-in-colors/128/react-128.png', // (optional) default: undefined
      color: options.color, // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      priority: 'high', // (optional) set notification priority, default: high
      actions: ['ReplyInput'],
      reply_placeholder_text: 'Merhaba De..', // (required)
      reply_button_text: 'Cevapla', // (required)

      title: options.title, // (optional)
      message: options.message, // (required)
    });
  };

  useEffect(() => {
    if (isLogin && profile) {
      const newSocket = io('https://api-grandlogistics.herokuapp.com', {
        secure: true,
        transports: ['websocket'],
      });
      upDateSocket(newSocket);
      messaging()
        .getToken(firebase.app().options.messagingSenderId)
        .then(token => {
          newSocket.emit('addUser', {
            token,
            _id: profile._id,
            platform: 'mobile',
          });
          console.log(`token`, token);
        });
      const unsubscribe = messaging().onMessage(async remoteMsg => {
        const channelId = Math.random().toString(36).substring(7);
        createChannel(channelId);
        showNotification(channelId, {
          bigImage: remoteMsg.notification.android.imageUrl,
          title: remoteMsg.notification.title,
          message: remoteMsg.notification.body,
          subText: remoteMsg.data.subTitle,
        });
        console.log('remoteMsg', remoteMsg);
      });
      messaging().setBackgroundMessageHandler(async remoteMsg => {
        console.log(`remoteMsg Background`, remoteMsg);
      });
      return () => {
        unsubscribe;
        newSocket.close();
      };
    }
  }, [isLogin, profile]);

  // useEffect(() => {
  //   const newSocket = io('https://api-grandlogistics.herokuapp.com');
  //   newSocket.emit('addUser', profile?._id);
  //   newSocket.on('arrayValue', data => {
  //     // console.log(data);
  //     // upDateOrder([...order, data]);
  //     httpClient
  //       .get('https://api-grandlogistics.herokuapp.com/order/mobile')
  //       .then(res => {
  //         upDateOrder(res.data.data);
  //       })
  //       .catch(err => {
  //         console.log(err.response);
  //       });
  //   });

  //   return () => newSocket.close();
  // }, [profile]);

  useEffect(() => {
    const getProfile = () => {
      httpClient
        .get('https://api-grandlogistics.herokuapp.com/personnel/me')
        .then(res => {
          upDateProfile(res.data);
          upDateLogin(true);
          upDateLoadingProfile(true);
        })
        .catch(err => {
          console.log(err.response);
        });
    };

    const getOrder = () => {
      httpClient
        .get('https://api-grandlogistics.herokuapp.com/order/mobile')
        .then(res => {
          upDateOrder(res.data);
          upDateLoadingOrder(true);
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
      if (!credentials) {
        SplashScreen.hide();
      } else if (credentials && (loadingProfile || loadingOrder) && isLogin) {
        SplashScreen.hide();
      }
    };

    getData();
  }, [loadingProfile, loadingOrder, isLogin]);

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
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
