import React, {useContext} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
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
  const {
    userStore: {upDateProfile},
    auth: {upDateLogin},
  } = useContext(StoreContext);

  const handleLogin = value => {
    const nametoken = 'token';
    axios
      .post('http://localhost:2200/personnel/loginmobile', value)
      .then(async res => {
        upDateProfile(res.data.user);
        await Keychain.setGenericPassword(nametoken, res.data.accessToken);
        upDateLogin(true);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{_uid: '6502020042', password: '12345'}}
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
        }) => (
          <>
            <TextInput
              name="_uid"
              placeholder="ID"
              style={styles.textInput}
              onChangeText={handleChange('_uid')}
              onBlur={handleBlur('_uid')}
              value={values._uid}
            />
            {errors._uid && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors._uid}</Text>
            )}
            <TextInput
              name="password"
              placeholder="Password"
              style={styles.textInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && (
              <Text style={{fontSize: 10, color: 'red'}}>
                {errors.password}
              </Text>
            )}
            <Button onPress={handleSubmit} title="LOGIN" disabled={!isValid} />
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
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});

export default Login;
