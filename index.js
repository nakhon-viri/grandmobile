/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {StoreProvider} from './store';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
dayjs.extend(buddhistEra);
import 'dayjs/locale/th';

const MyApp = () => {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  );
};

AppRegistry.registerComponent(appName, () => MyApp);
