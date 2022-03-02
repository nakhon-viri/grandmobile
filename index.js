/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {StoreProvider} from './store';
const MyApp = () => {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  );
};

AppRegistry.registerComponent(appName, () => MyApp);
