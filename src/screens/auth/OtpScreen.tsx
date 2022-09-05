import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import localImages from '@navdeep/utils/localImages'
import common from '@navdeep/utils/common'
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux'
import actionNames from '@navdeep/utils/actionNames'
import OtpInput from '@navdeep/components/OtpInput'
import { setLoaderState } from '@navdeep/actions'
import Loader from '@navdeep/components/Loader'

export default function OtpScreen(props: any) {

    const dispatch = useDispatch()

    const { isLoading } = useSelector((state: any) => state?.authReducer);

    const [confirm, setConfirm] = useState<any>(null);
    const [OTP, setOTP] = useState<any>(null)

    useEffect(() => {
        (async () => {
            const confirmation = await auth().signInWithPhoneNumber('+91' + props?.route?.params?.number)
            console.log('confirmation-->',confirmation);
            setConfirm(confirmation)
        })();
    }, [])

    const onPressNext = async () => {
        try {
            //@ts-ignore
            dispatch(setLoaderState(true))
            let response = await confirm.confirm(OTP);
            if (response?.user?._user?.uid?.length > 0) {
                dispatch({
                    type: actionNames?.AUTH_REDUCER,
                    payload: {
                        loginInfo: {
                            status: true,
                            currentUser: { name: '+91 ' + props?.route?.params?.number }
                        }
                    }
                })
            }
        } catch (error) {
            common?.snackBar(`Invalid OTP`)
            console.log('error of OTP-->>', error);
        }
        finally {
            //@ts-ignore
            dispatch(setLoaderState(false))
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
            <Text style={styles.loginText}>Enter your code</Text>
            <OtpInput setOTP={(value: any) => setOTP(value)} />
            <Text style={styles.termsText}>
                We sent an SMS with a 6-digit code to{'\n'}
                {props?.route?.params?.number ?? ''}
            </Text>
            <TouchableOpacity style={!OTP ? { ...styles.nextBtn, backgroundColor: "gray" } : styles.nextBtn} onPress={onPressNext} disabled={!OTP}>
                <Text style={styles.nextBtnText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: vh(40), }} onPress={() => props?.navigation?.goBack()}>
                <Image
                    source={localImages?.EDIT_PEN}
                    style={{ width: vw(20), height: vw(20), marginRight: vw(8) }}
                />
                <Text style={styles.editPhoneText}>Edit phone number</Text>
            </TouchableOpacity>
            {isLoading ? <Loader /> : null}
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