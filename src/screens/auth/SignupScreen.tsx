import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import localImages from '@navdeep/utils/localImages'
import common from '@navdeep/utils/common'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signup(props: any) {

  const [name, setName] = useState<string>('')
  const [email, setemail] = useState<string>('')
  const [number, setNumber] = useState<string>('')
  const [password, setpassword] = useState<string>('')

  const onSignUp = async () => {
    let payload = { name, email, number, password }
    let errorType = common?.validateInput('signup', payload)
    if (errorType?.length)
      common?.snackBar(`${errorType} is empty or invalid`)
    else {
      try {
        await AsyncStorage.setItem(email, JSON.stringify(payload))
        common?.snackBar('Signup Successfull')
        props?.navigation?.goBack()
      } catch (error) {
        common?.snackBar('Error while Signing-up')
        console.warn(error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ marginTop: vh(20) }} onPress={() => props?.navigation?.goBack()}>
        <Image
          source={localImages?.BACK}
          style={{ width: vw(35), height: vw(35) }}
        />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: vh(25) }}>
        <Image
          source={localImages?.APP_LOGO}
          style={{ width: vw(55), height: vw(55) }}
        />
        <Text style={styles.titleText}>Spotify</Text>
      </View>
      <Text style={styles.loginText}>Sign up to continue.</Text>
      <TextInput
        onChangeText={(text: any) => setName(text)}
        keyboardType='default'
        value={name}
        placeholder='Name'
        placeholderTextColor={'gray'}
        style={styles.inputText}
        selectionColor={'white'}
      />
      <TextInput
        onChangeText={(text: any) => setemail(text)}
        keyboardType='email-address'
        value={email}
        placeholder='Email'
        placeholderTextColor={'gray'}
        style={styles.inputText}
        selectionColor={'white'}
        autoCapitalize='none'
      />
      <TextInput
        onChangeText={(text: any) => setNumber(text)}
        keyboardType='numeric'
        value={number}
        placeholder='Phone Number'
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
      <TouchableOpacity style={styles.loginBtn} onPress={onSignUp}>
        <Text style={styles.loginBtnText}>SIGN UP</Text>
      </TouchableOpacity>
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