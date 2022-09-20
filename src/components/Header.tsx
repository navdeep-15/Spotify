import { StyleSheet, Text, TouchableOpacity, View, Image, Platform } from 'react-native'
import React from 'react'
import localImages from '@navdeep/utils/localImages'
import { vh, vw } from '@navdeep/utils/dimensions'
import fonts from '@navdeep/utils/fonts'

export default function Header(props: any) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: vh(10), marginTop: Platform.OS === 'android' ? vh(40) : null }}>
            <TouchableOpacity onPress={() => props?.props?.navigation?.goBack()}>
                <Image
                    source={localImages?.BACK}
                    style={{ width: vw(25), height: vw(25), marginRight: vw(12), marginLeft: vw(5) }}
                />
            </TouchableOpacity>
            <Text style={styles.screenHeading}>{props?.title ?? ''}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screenHeading: {
        fontSize: vw(20),
        fontFamily: fonts.BOLD,
        color: 'white',
        textAlign: 'center',
        width: vw(300),
    },
})