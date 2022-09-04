import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import localImages from '@navdeep/utils/localImages'
import common from '@navdeep/utils/common'
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux'
import actionNames from '@navdeep/utils/actionNames'
import firestore from '@react-native-firebase/firestore';

export default function OtpScreen(props: any) {

    // useEffect(() => {
    //     (async () => {
    //         let x = await auth().signInWithPhoneNumber('+918287601852')
    //     })();
    // }, [])

    const onPressNext = async () => {
        // let errorType = common?.validateInput('signInUsingNumber', { number })
        // if (errorType?.length)
        //     common?.snackBar(`${errorType} is empty or invalid`)
        // else {
        //     console.log('phone login res-->>', x);
        // }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ marginTop: vh(20) }} onPress={() => props?.navigation?.goBack()}>
                <Image
                    source={localImages?.BACK}
                    style={{ width: vw(35), height: vw(35) }}
                />
            </TouchableOpacity>
            <Text style={styles.loginText}>Enter your code</Text>
            <Text style={styles.termsText}>
                We sent an SMS with a 6-digit code to{'\n'}
                {props?.route?.params?.number ?? ''}
            </Text>
            <TouchableOpacity style={true ? { ...styles.nextBtn, backgroundColor: "gray" } : styles.nextBtn} onPress={onPressNext} disabled={true}>
                <Text style={styles.nextBtnText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: vh(40), }} onPress={() => props?.navigation?.goBack()}>
                <Image
                    source={localImages?.EDIT_PEN}
                    style={{ width: vw(20), height: vw(20), marginRight: vw(8) }}
                />
                <Text style={styles.editPhoneText}>Edit phone number</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: vw(20),
        paddingTop: vh(25)
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
        marginTop: vh(40),
        fontFamily: fonts.BOLD,
        marginBottom: vh(10)
    },
    inputView: {
        backgroundColor: '#747474',
        borderRadius: vw(6)
    },
    inputText: {
        fontSize: vw(18),
        fontFamily: fonts.BOLD,
        color: 'white',
    },
    numberInputText: {
        fontSize: vw(18),
        fontFamily: fonts.BOLD,
        color: 'white',
        padding: vw(12),
    },
    termsText: {
        fontSize: vw(14),
        fontFamily: fonts.BOLD,
        color: 'white',
        marginTop: vh(15),
        textAlign: 'center',
    },
    nextBtn: {
        marginTop: vh(40),
        backgroundColor: '#1cd05d',
        paddingVertical: vh(10),
        borderRadius: vw(50),
        width: '40%', alignSelf: 'center'
    },
    nextBtnText: {
        fontSize: vw(16),
        fontFamily: fonts.EXTRA_BOLD,
        letterSpacing: vw(1),
        textAlign: 'center',
        color: 'white'
    },
    editPhoneText: {
        fontSize: vw(18),
        fontFamily: fonts.BOLD,
        color: 'white',
        textAlign: 'center',
    },
})