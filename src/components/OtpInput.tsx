import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'

export default function OtpInput(props: any) {

    const [OTP, setOTP] = useState<any>({ p1: null, p2: null, p3: null, p4: null, p5: null, p6: null })

    const p1 = useRef(null), p2 = useRef(null), p3 = useRef(null), p4 = useRef(null), p5 = useRef(null), p6 = useRef(null)

    useEffect(() => {
        p1.current.focus()
    }, [])

    useEffect(() => {
        if (OTP.p1 && OTP.p2 && OTP.p3 && OTP.p4 && OTP.p5 && OTP.p6) {
            let completeOTP = OTP.p1 + OTP.p2 + OTP.p3 + OTP.p4 + OTP.p5 + OTP.p6
            props?.setOTP(completeOTP)
        }
    }, [OTP])


    return (
        <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginVertical: vh(10) }}>
            <TextInput
                ref={p1}
                onChangeText={(text: any) => {
                    setOTP({ ...OTP, p1: text })
                    text?.length ? p2.current.focus() : null
                }}
                value={OTP.p1}
                style={OTP.p1 ? {...styles.numberInputText,borderColor:'#1cd05d'} :styles.numberInputText}
                keyboardType='numeric'
                selectionColor={'white'}
                maxLength={1}
            />
            <TextInput
                ref={p2}
                onChangeText={(text: any) => {
                    setOTP({ ...OTP, p2: text })
                    text?.length ? p3.current.focus() : null
                }}
                value={OTP.p2}
                style={OTP.p2 ? {...styles.numberInputText,borderColor:'#1cd05d'} :styles.numberInputText}
                keyboardType='numeric'
                selectionColor={'white'}
                maxLength={1}
            />
            <TextInput
                ref={p3}
                onChangeText={(text: any) => {
                    setOTP({ ...OTP, p3: text })
                    text?.length ? p4.current.focus() : null
                }}
                value={OTP.p3}
                style={OTP.p3 ? {...styles.numberInputText,borderColor:'#1cd05d'} :styles.numberInputText}
                keyboardType='numeric'
                selectionColor={'white'}
                maxLength={1}
            />
            <TextInput
                ref={p4}
                onChangeText={(text: any) => {
                    setOTP({ ...OTP, p4: text })
                    text?.length ? p5.current.focus() : null
                }}
                value={OTP.p4}
                style={OTP.p4 ? {...styles.numberInputText,borderColor:'#1cd05d'} :styles.numberInputText}
                keyboardType='numeric'
                selectionColor={'white'}
                maxLength={1}
            />
            <TextInput
                ref={p5}
                onChangeText={(text: any) => {
                    setOTP({ ...OTP, p5: text })
                    text?.length ? p6.current.focus() : null
                }}
                value={OTP.p5}
                style={OTP.p5 ? {...styles.numberInputText,borderColor:'#1cd05d'} :styles.numberInputText}
                keyboardType='numeric'
                selectionColor={'white'}
                maxLength={1}
            />
            <TextInput
                ref={p6}
                onChangeText={(text: any) => {
                    setOTP({ ...OTP, p6: text })
                }}
                value={OTP.p6}
                style={OTP.p6 ? {...styles.numberInputText,borderColor:'#1cd05d'} :styles.numberInputText}
                keyboardType='numeric'
                selectionColor={'white'}
                maxLength={1}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    numberInputText: {
        fontSize: vw(18),
        fontFamily: fonts.BOLD,
        color: 'white',
        borderWidth: 0.5,
        borderColor: 'gray',
        width: vw(40),
        textAlign: 'center',
        paddingVertical: vh(10),
        marginHorizontal: vw(5),
        borderRadius: vw(6)
    },
})