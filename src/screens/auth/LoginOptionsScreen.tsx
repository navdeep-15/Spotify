import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, BackHandler, ImageBackground, } from 'react-native'
import React, { useEffect, useState } from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import localImages from '@navdeep/utils/localImages'
import screenNames from '@navdeep/utils/screenNames'
import common from '@navdeep/utils/common'
import { useDispatch, useSelector } from 'react-redux'
import actionNames from '@navdeep/utils/actionNames'
import { setLoaderState } from '@navdeep/actions'

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import Loader from '@navdeep/components/Loader'
import ReactNativeBiometrics from 'react-native-biometrics';

export default function LoginOptionsScreen(props: any) {

    const dispatch = useDispatch()

    const { isLoading } = useSelector((state: any) => state?.authReducer);
    const [sensorType, setsensorType] = useState('')

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

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '330146167767-8tnmj713gjnn2253mg0ham1in54l3tik.apps.googleusercontent.com',
        });
    }, [])

    useEffect(() => {
        ReactNativeBiometrics.isSensorAvailable()
            .then((response) => {
                console.log('response of biometrics', response);
                if (response?.available) {
                    if (response?.biometryType === ReactNativeBiometrics.TouchID) {
                        setsensorType('touchid')
                    } else if (response?.biometryType === ReactNativeBiometrics.FaceID) {
                        setsensorType('faceid')
                    } else if (response?.biometryType === ReactNativeBiometrics.Biometrics) {
                        setsensorType('biometric')
                    }
                }
                else {
                    common?.snackBar(`Sensor not available`)
                    setTimeout(()=>common?.snackBar(response?.error),2000)
                }
            })
            .catch((error) => {
                console.log('error of biometrics', error);
                common?.snackBar('error while checking sensor')
            })
    }, [])



    const onPressSignUpFree = () => {
        props?.navigation?.navigate(screenNames?.SIGNUP_SCREEN)
    }

    const onPressContinueWithPhoneNumber = () => {
        props?.navigation?.navigate(screenNames?.PHONE_NUMBER_LOGIN_SCREEN)
    }

    const onPressContinueWithGoogle = async () => {
        //@ts-ignore
        dispatch(setLoaderState(true))
        GoogleSignin.signIn()
            .then((res: any) => {
                const googleCredential = auth.GoogleAuthProvider.credential(res?.idToken);
                auth().signInWithCredential(googleCredential)
                    .then((response: any) => {
                        console.log('response of google signin', response);
                        if (response?.user?._user?.uid?.length > 0) {
                            dispatch({
                                type: actionNames?.AUTH_REDUCER,
                                payload: {
                                    loginInfo: {
                                        status: true,
                                        currentUser: { name: response?.user?._user?.displayName, email: response?.user?._user?.email }
                                    }
                                }
                            })
                            //@ts-ignore
                            dispatch(setLoaderState(false))
                            common?.snackBar(`Signin successful`)
                        }
                    })
                    .catch((error) => {
                        //@ts-ignore
                        dispatch(setLoaderState(false))
                        console.log('error while signing in', error);
                        common?.snackBar(`error while signing in`)
                    })
            })
            .catch((e) => {
                //@ts-ignore
                dispatch(setLoaderState(false))
                console.log('error while fetching user', e);
                common?.snackBar(`error while fetching user`)
            })
    }

    const onPressContinueWithFacebook = async () => {
        //@ts-ignore
        dispatch(setLoaderState(true))
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
            throw 'Something went wrong obtaining access token';
        }
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        auth().signInWithCredential(facebookCredential)
            .then((response: any) => {
                console.log('response of facebook', response);
                if (response?.user?._user?.uid?.length > 0) {
                    dispatch({
                        type: actionNames?.AUTH_REDUCER,
                        payload: {
                            loginInfo: {
                                status: true,
                                currentUser: { name: response?.user?._user?.displayName, email: response?.user?._user?.email }
                            }
                        }
                    })
                    //@ts-ignore
                    dispatch(setLoaderState(false))
                    common?.snackBar(`Signin successful`)
                }
            })
            .catch((error: any) => {
                //@ts-ignore
                dispatch(setLoaderState(false))
                console.log('error while signing with facebook', error);
                common?.snackBar(`error while signing in`)
            })
    }

    const onPressContinueWithBiometrics = async () => {
        let message = sensorType === 'biometric' ? 'Confirm fingerprint' : sensorType === 'faceid' ? 'Confirm FaceID' : 'Confirm TouchID'
        ReactNativeBiometrics.simplePrompt({ promptMessage: message })
            .then((response) => {
                console.log('response of simplePrompt', response);
                if (response?.success) {
                    dispatch({
                        type: actionNames?.AUTH_REDUCER,
                        payload: {
                            loginInfo: {
                                status: true,
                                currentUser: { name: 'Anonymous User', email: 'anonymous@anonymous.com' }
                            }
                        }
                    })
                    common?.snackBar(`Signin successful`)
                }
            })
            .catch((error) => {
                console.log('error of simplePrompt', error);
            })
    }

    const onPressLogin = () => {
        props?.navigation?.navigate(screenNames?.LOGIN_SCREEN)
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={localImages.ARTIST_BACKGROUND}
                style={{ width: '100%', height: sensorType ? vh(350) : vh(400), }}
                resizeMode='cover'
            >
                <View style={{ alignItems: 'center', position: 'absolute', alignSelf: 'center', bottom: vh(-40), }}>
                    <Image
                        source={localImages.PREMIUM}
                        style={{ width: vw(70), height: vw(70) }}
                    />
                    <Text style={styles.titleText}>Millions of songs.{'\n'}Free on Spotify.</Text>
                </View>
            </ImageBackground>


            <View style={styles.btnGroup}>
                <TouchableOpacity style={styles.signUpBtn} onPress={onPressSignUpFree}>
                    <Text style={{ ...styles.btnText, color: 'black' }}>Sign up free</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialSignInBtn} onPress={onPressContinueWithPhoneNumber}>
                    <Image
                        source={localImages.PHONE}
                        style={{ width: vw(25), height: vh(25), tintColor: 'white' }}
                    />
                    <Text style={{ ...styles.btnText, flex: 1 }}>Continue with phone number</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialSignInBtn} onPress={onPressContinueWithGoogle}>
                    <Image
                        source={localImages.GOOGLE}
                        style={{ width: vw(25), height: vh(25) }}
                    />
                    <Text style={{ ...styles.btnText, flex: 1 }}>Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialSignInBtn} onPress={onPressContinueWithFacebook}>
                    <Image
                        source={localImages.FACEBOOK}
                        style={{ width: vw(25), height: vh(25) }}
                    />
                    <Text style={{ ...styles.btnText, flex: 1 }}>Continue with Facebook</Text>
                </TouchableOpacity>
                {
                    sensorType ?
                        <TouchableOpacity style={styles.socialSignInBtn} onPress={onPressContinueWithBiometrics}>
                            <Image
                                source={(sensorType === 'faceid') ? localImages.FACE_ID : localImages.FINGERPRINT}
                                style={{ width: vw(25), height: vh(25), tintColor: (sensorType === 'faceid') ? 'skyblue' : null }}
                            />
                            <Text style={{ ...styles.btnText, flex: 1 }}>
                                {
                                    sensorType === 'biometric' ? 'Continue with Fingerprint' : sensorType === 'faceid' ? 'Continue with FaceID' : 'Continue with TouchID'
                                }
                            </Text>
                        </TouchableOpacity> : null
                }
                <TouchableOpacity style={styles.logInBtn} onPress={onPressLogin}>
                    <Text style={styles.btnText}>Log in</Text>
                </TouchableOpacity>
            </View>
            {isLoading ? <Loader /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center'
    },
    titleText: {
        fontSize: vw(34),
        fontFamily: fonts.BOLD,
        color: 'white',
        textAlign: 'center',
        marginTop: vh(10)
    },
    btnGroup: {
        width: '100%',
        paddingHorizontal: vw(30),
        position: 'absolute',
        bottom: vw(20),
    },
    signUpBtn: {
        backgroundColor: '#1cd05d',
        borderRadius: vw(100),
        marginBottom: vh(15),
        padding: vw(10)
    },
    socialSignInBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: vw(1.5),
        borderRadius: vw(100),
        borderColor: 'gray',
        marginBottom: vh(15),
        padding: vw(10)
    },
    logInBtn: {
        marginBottom: vh(15),
        padding: vw(10)
    },
    btnText: {
        color: 'white',
        fontSize: vw(18),
        fontFamily: fonts.BOLD,
        textAlign: 'center'
    }
})