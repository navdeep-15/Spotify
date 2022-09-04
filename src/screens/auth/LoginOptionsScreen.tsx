import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, BackHandler, ImageBackground, } from 'react-native'
import React, { useEffect } from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import localImages from '@navdeep/utils/localImages'
import screenNames from '@navdeep/utils/screenNames'

export default function LoginOptionsScreen(props: any) {

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

    const onPressSignUpFree = () => {
        props?.navigation?.navigate(screenNames?.SIGNUP_SCREEN)
    }

    const onPressContinueWithPhoneNumber = () => {
        props?.navigation?.navigate(screenNames?.PHONE_NUMBER_LOGIN_SCREEN)
    }

    const onPressContinueWithGoogle = () => {

    }

    const onPressContinueWithFacebook = () => {

    }

    const onPressLogin = () => {
        props?.navigation?.navigate(screenNames?.LOGIN_SCREEN)
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={localImages.ARTIST_BACKGROUND}
                style={{ width: '100%', height: vh(400), }}
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
                <TouchableOpacity style={styles.logInBtn} onPress={onPressLogin}>
                    <Text style={styles.btnText}>Log in</Text>
                </TouchableOpacity>
            </View>
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