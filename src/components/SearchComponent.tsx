import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import localImages from '@navdeep/utils/localImages'

export default function SearchComponent(props: any) {
    return (
        <TouchableOpacity style={styles.container} onPress={props?.onPressSearch}>
            <Image
                source={localImages?.SEARCH_UNFOCUSED}
                style={{ width: vw(25), height: vw(25), tintColor: '#121212' }}
            />
            <Text style={styles.textInput} >Artists, songs, or podcasts</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: vw(10),
        backgroundColor: 'white',
        borderRadius: vw(5),
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        fontSize: vw(16),
        fontFamily: fonts.BOLD,
        color: '#121212aa',
        marginLeft: vw(5),
        width: '90%',
    }
})