import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import localImages from '@navdeep/utils/localImages'
import common from '@navdeep/utils/common'
import screenNames from '@navdeep/utils/screenNames'

export default function PhoneNumberLoginScreen(props: any) {

    const [number, setNumber] = useState<string>('')

    const onPressNext = async () => {
        let errorType = common?.validateInput('signInUsingNumber', { number })
        if (errorType?.length)
            common?.snackBar(`${errorType} is empty or invalid`)
        else {
            props?.navigation?.navigate(screenNames?.OTP_SCREEN, { number })
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
            <Text style={styles.loginText}>Enter phone number</Text>
            <View style={styles.inputView}>
                <TouchableOpacity style={{ padding: vw(12), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: vw(1), borderColor: 'white' }} activeOpacity={1}>
                    <Text style={styles.inputText}>India</Text>
                    <Image
                        source={localImages?.BACK}
                        style={{ width: vw(18), height: vw(18), transform: [{ rotate: '180deg' }] }}
                    />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ padding: vw(12), borderRightWidth: vw(1), borderColor: 'white' }}>
                        <Text style={styles.inputText}>+91</Text>
                    </View>
                    <TextInput
                        onChangeText={(text: any) => setNumber(text)}
                        keyboardType='numeric'
                        value={number}
                        placeholder='Phone Number'
                        placeholderTextColor={'lightgray'}
                        style={styles.numberInputText}
                        selectionColor={'white'}
                        maxLength={10}
                    />
                </View>
            </View>
            <Text style={styles.termsText}>
                We'll send you a code by SMS to confirm your phone number.{'\n\n'}
                We may occasionally send you service-based message.
            </Text>
            <TouchableOpacity style={!(number?.length > 0) ? { ...styles.nextBtn, backgroundColor: "gray" } : styles.nextBtn} onPress={onPressNext} disabled={!(number?.length > 0)}>
                <Text style={styles.nextBtnText}>Next</Text>
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
        width: vw(250)
    },
    termsText: {
        fontSize: vw(12.5),
        fontFamily: fonts.BOLD,
        color: 'white',
        marginTop: vh(10)
    },
    nextBtn: {
        marginTop: vh(60),
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
})