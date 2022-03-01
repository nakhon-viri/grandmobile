import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Tabs from './navigation/Tab';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOption={{
          headerShown: false,
        }}
        initialRouteName={'App'}>
        <Stack.Screen name="App" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View><Text>sasdf</Text></View>
  );
};

export default App;
