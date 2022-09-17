import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import localImages from '@navdeep/utils/localImages'
import { vw } from '@navdeep/utils/dimensions'
import { useSelector } from 'react-redux'
import Slider from '@react-native-community/slider';

export default function Player(props: any) {
    const [isFavourite, setisFavourite] = useState(false)
    const { songIcon, songTitle, songSubTitle, songURL, isPlaying, soundObject } = useSelector((state: any) => state?.currentSongReducer);
    return (
        <View style={{ marginTop: 200 }}>
            <View style={styles.flexRow}>
                <View>
                    <Text>title</Text>
                    <Text>singer</Text>
                </View>
                <Image
                    source={isFavourite ? localImages?.HEART_FILLED : localImages?.HEART_UNFILLED}
                    style={{ width: vw(25), height: vw(25), marginRight: vw(12), tintColor: isFavourite ? '#1cd05d' : 'white' }}
                />
            </View>
            <Slider
                style={{}}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#2a2a2a"
                tapToSeek
            />
            <View style={styles.flexRow}>
                <Text>start</Text>
                <Text>end</Text>
            </View>
            <View style={styles.flexRow}>
                <TouchableOpacity>
                    <Image
                        source={localImages.SHUFFLE}
                        style={styles.extraBtn}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={localImages.NEXT_BACK}
                        style={[styles.nextBackBtn, { transform: [{ rotate: '180deg' }] }]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.playPauseBtn}>
                    <Image
                        source={isPlaying ? localImages?.PAUSE : localImages?.PLAY}
                        style={{ width: vw(30), height: vw(30), tintColor: 'black', alignSelf: 'center' }}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={localImages.NEXT_BACK}
                        style={styles.nextBackBtn}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={localImages.LOOP}
                        style={styles.extraBtn}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    playPauseBtn: {
        width: vw(60),
        height: vw(60),
        backgroundColor: 'white',
        padding: vw(10),
        borderRadius: vw(100),
        justifyContent: 'center',
    },
    nextBackBtn: {
        width: vw(35),
        height: vw(35),
        tintColor: 'white'
    },
    extraBtn: {
        width: vw(25),
        height: vw(25),
        tintColor: 'white'
    }
})