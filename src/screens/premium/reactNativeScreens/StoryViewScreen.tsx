import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Modal, Image } from 'react-native'
import React from 'react'
import { vh, vw } from '@navdeep/utils/dimensions'
import fonts from '@navdeep/utils/fonts'
import Header from '@navdeep/components/Header'

export default function StoryViewScreen(props:any) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title={'Story View'} props={props} />
            <Image
                style={{ height: '70%' }}
                source={{ uri: props?.route?.params?.url }}
                resizeMode='contain'
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})