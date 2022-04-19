import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {StoreContext} from '../store';

const loginValidationSchema = yup.object().shape({
  _uid: yup.string().required('ID is Required'),
  password: yup
    .string()
    .min(4, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const Login = () => {
  console.log('this is login screen!!');
  const {
    userStore: {upDateProfile},
    auth: {upDateLogin},
    orderStore: {upDateOrder},
  } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = value => {
    setLoading(true);
    const nametoken = 'token';
    axios
      .post(
        'https://api-grandlogistics.herokuapp.com/personnel/loginmobile',
        value,
      )
      .then(async res => {
        upDateProfile(res.data.user);
        await Keychain.setGenericPassword(nametoken, res.data.accessToken);
        upDateOrder(res.data.emp);
        upDateLogin(true);
        setLoading(false);
      })
      .catch(err => {
        console.log('err', err.response);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 10}}>
        <Image
          style={{width: 180, height: 180}}
          source={require('../assets/images/loggrand.png')}
        />
      </View>
      <Text style={{fontSize: 35, fontWeight: '800'}}>
        <Text style={{color: '#007bff'}}>GRAND</Text>LOGISTICS
      </Text>
      <Text style={{fontSize: 20, marginTop: 20}}>เข้าสู่ระบบ</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{_uid: '6501020012', password: '12345678'}}
        onSubmit={async values => {
          handleLogin(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          dirty,
        }) => (
          <>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '80%',
                margin: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  width: '100%',
                  textAlign: 'left',
                  marginBottom: 10,
                }}>
                ID ผู้ใช่ :{' '}
              </Text>
              <TextInput
                name="_uid"
                placeholder="ID"
                style={styles.textInput}
                onChangeText={handleChange('_uid')}
                onBlur={handleBlur('_uid')}
                value={values._uid}
              />
            </View>
            {errors._uid && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors._uid}</Text>
            )}
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '80%',
                margin: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  width: '100%',
                  textAlign: 'left',
                  marginBottom: 10,
                }}>
                รหัสผ่าน :
              </Text>
              <TextInput
                name="password"
                placeholder="Password"
                style={styles.textInput}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
            </View>
            {errors.password && (
              <Text style={{fontSize: 10, color: 'red'}}>
                {errors.password}
              </Text>
            )}
            <TouchableOpacity
              onPress={handleSubmit}
              style={{marginTop: 30}}
              disabled={!isValid || loading}>
              {/* disabled={!(isValid && dirty)}> */}
              <Text
                style={{
                  // color: !(isValid && dirty) ? '#bfbfbf' : '#007bff',
                  color: !isValid || loading ? '#bfbfbf' : '#007bff',
                  fontSize: 20,
                }}>
                {loading ? 'Loading...' : 'LOGIN'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  textInput: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    padding: 15,
    fontSize: 20,
  },
});

export default Login;
