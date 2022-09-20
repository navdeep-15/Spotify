import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, ScrollView, Platform } from 'react-native'
import React from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import screenNames from '@navdeep/utils/screenNames'
import localImages from '@navdeep/utils/localImages'
import Header from '@navdeep/components/Header'

export default function ReactNativeTopicsScreen(props: any) {
    const onPressButton = (id: any) => {
        switch (id) {
            case 1: props?.navigation?.navigate(screenNames?.CHART_SCREEN)
                break
            case 2: props?.navigation?.navigate(screenNames?.MAPS_SCREEN)
                break
            default: break
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
            <Header title={'React Native'} props={props} />
            <ScrollView style={{marginTop:vh(5)}}>
                {
                    buttonData?.map((item: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => onPressButton(item?.id)}
                                style={{ marginTop: vh(35), paddingHorizontal: vw(20) }}>
                                <Text style={styles.listHeading}>{item?.title ?? ''}</Text>
                                <Text style={styles.listDesc} numberOfLines={2}>{item?.description}</Text>
                            </TouchableOpacity>

                        )
                    })
                }

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: vh(16)
    },
    listHeading: {
        fontSize: vw(18),
        fontFamily: fonts.EXTRA_BOLD,
        color: 'white',
        textTransform: 'capitalize',
        letterSpacing: vw(0.9)
    },
    listSubHeading: {
        fontSize: vw(16),
        fontFamily: fonts.BOLD,
        color: 'white',
        textTransform: 'capitalize'
    },
    listDesc: {
        fontSize: vw(14),
        fontFamily: fonts.REGULAR,
        color: 'white',
        width: vw(270),
        marginTop: vh(5)
    }
})

const buttonData = [
    {
        id: 1,
        title: 'Chart',
        description: 'Line Graph and Pie Chart'
    },
    {
        id: 2,
        title: 'Maps',
        description: 'Google maps'
    },
]