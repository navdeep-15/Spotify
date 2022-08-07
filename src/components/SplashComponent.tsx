import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { vw, vh } from '@navdeep/utils/dimensions'
import localImages from '@navdeep/utils/localImages'
import LottieView from 'lottie-react-native';

export default function SplashComponent() {
    return (
        <View style={styles.container}>
            {/* <Image
                source={localImages?.APP_LOGO}
                style={{ width: vw(155), height: vw(155) }}
            /> */}
            <LottieView
                resizeMode='contain'
                source={localImages.SPOTIFY_LOGO_LOTTIE}
                style={{ width: vw(200), height: vw(200) }}
                autoPlay
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212'
    }
})