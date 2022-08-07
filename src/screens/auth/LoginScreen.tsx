import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import localImages from '@navdeep/utils/localImages'
import screenNames from '@navdeep/utils/screenNames'
import common from '@navdeep/utils/common'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import actionNames from '@navdeep/utils/actionNames'

export default function Login(props: any) {

  const [email, setemail] = useState<string>('')
  const [password, setpassword] = useState<string>('')

  const dispatch = useDispatch()

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold On', 'Are you sure you want to exit', [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: 'Yes', onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []);

  const onSignIn = async () => {
    let payload = { email, password }
    let errorType = common?.validateInput('signin', payload)
    if (errorType?.length)
      common?.snackBar(`${errorType} is empty or invalid`)
    else {
      try {
        let value: any = await AsyncStorage.getItem(email)
        if (value != null) {
          value = JSON.parse(value)
          if (value?.password === password) {
            dispatch({
              type: actionNames?.AUTH_REDUCER,
              payload: {
                loginInfo: {
                  status: true,
                  currentUser: value,
                }
              }
            })
          }
          else
            common?.snackBar('Username or Password is wrong')
        }
        else
          common?.snackBar('User not Found')
      } catch (error) {
        console.warn(error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: vh(80) }}>
        <Image
          source={localImages?.APP_LOGO}
          style={{ width: vw(55), height: vw(55) }}
        />
        <Text style={styles.titleText}>Spotify</Text>
      </View>
      <Text style={styles.loginText}>Log in to continue.</Text>
      <TextInput
        onChangeText={(text: any) => setemail(text)}
        keyboardType='email-address'
        value={email}
        placeholder='Email'
        placeholderTextColor={'gray'}
        style={styles.inputText}
        selectionColor={'white'}
      />
      <TextInput
        onChangeText={(text: any) => setpassword(text)}
        value={password}
        placeholder='Password'
        placeholderTextColor={'gray'}
        style={styles.inputText}
        selectionColor={'white'}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={onSignIn}>
        <Text style={styles.loginBtnText}>LOG IN</Text>
      </TouchableOpacity>
      <Text style={styles.bottomText}>
        Don't have an account?{' '}
        <Text style={{ textDecorationLine: 'underline', color: '#1cd05d' }} onPress={() => props?.navigation?.navigate(screenNames?.SIGNUP_SCREEN)}>SIGNUP</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: vw(20)
  },
  titleText: {
    fontSize: vw(28),
    fontFamily: fonts.EXTRA_BOLD,
    color: 'white',
    marginLeft: vw(5)
  },
  loginText: {
    fontSize: vw(32),
    color: 'white',
    textAlign: 'center',
    marginTop: vh(40),
    fontFamily: fonts.BOLD,
    marginBottom: vh(10)
  },
  inputText: {
    fontFamily: fonts.SEMIBOLD,
    fontSize: vw(16),
    color: 'white',
    backgroundColor: '#404040',
    padding: vw(10),
    marginTop: vh(15),
    borderRadius: vw(10)
  },
  loginBtn: {
    marginTop: vh(40),
    backgroundColor: 'white',
    paddingVertical: vh(10),
    borderRadius: vw(50)
  },
  loginBtnText: {
    fontSize: vw(16),
    fontFamily: fonts.EXTRA_BOLD,
    letterSpacing: vw(1),
    textAlign: 'center'
  },
  bottomText: {
    fontSize: vw(12),
    fontFamily: fonts.SEMIBOLD,
    color: 'white',
    marginTop: vh(250),
    textAlign: 'center',
    letterSpacing: vw(1.5)
  },
})