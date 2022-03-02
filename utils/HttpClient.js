import axios from 'axios';
import * as Keychain from 'react-native-keychain';

axios.interceptors.request.use(async config => {
  const credentials = await Keychain.getGenericPassword();
  const token = 'Bearer ' + credentials.password;
  config.headers.Authorization = token;

  return config;
});

export const httpClient = axios;
