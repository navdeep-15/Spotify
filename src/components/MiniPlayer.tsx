import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { vw, vh } from '@navdeep/utils/dimensions'
import localImages from '@navdeep/utils/localImages'
import screenNames from '@navdeep/utils/screenNames'
import fonts from '@navdeep/utils/fonts';
import { useSelector, useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import Sound from 'react-native-sound'
import actionNames from '@navdeep/utils/actionNames'

export default function MiniPlayer() {
    const [isFavourite, setisFavourite] = useState(false)
    const isFocused = useIsFocused();
    const dispatch = useDispatch()
    const { songIcon, songTitle, songSubTitle, songURL, isPlaying, soundObject } = useSelector((state: any) => state?.currentSongReducer);

    Sound.setCategory('Playback');

    useEffect(() => {
        if (isFocused && soundObject) {
            if (isPlaying) {
                soundObject?.play((success: any) => {
                    if (success) {
                        dispatch({
                            type: actionNames?.CURRENT_SONG_REDUCER,
                            payload: {
                                isPlaying: false,
                            }
                        })
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }
            else {
                soundObject?.pause();
            }
        }
    }, [isFocused, isPlaying, soundObject])

    const onPressPlayPause = () => {
        if (isPlaying) {
            dispatch({
                type: actionNames?.CURRENT_SONG_REDUCER,
                payload: {
                    isPlaying: false,
                }
            })
        }
        else {
            dispatch({
                type: actionNames?.CURRENT_SONG_REDUCER,
                payload: {
                    isPlaying: true,
                }
            })
        }
    }

    if (soundObject) {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Image
                        source={{ uri: songIcon ?? '' }}
                        style={styles.thumbnail}
                    />
                </TouchableOpacity>
                <View style={{ width: vw(232) }}>
                    <Text style={styles.titleText}>{songTitle ?? ''}</Text>
                    <Text style={styles.subTitleText}>{songSubTitle ?? ''}</Text>
                </View>
                <TouchableOpacity onPress={() => setisFavourite(!isFavourite)}>
                    <Image
                        source={isFavourite ? localImages?.HEART_FILLED : localImages?.HEART_UNFILLED}
                        style={{ width: vw(25), height: vw(25), marginRight: vw(12), tintColor: isFavourite ? '#1cd05d' : 'white' }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressPlayPause}>
                    <Image
                        source={isPlaying ? localImages?.PAUSE : localImages?.PLAY}
                        style={{ width: vw(25), height: vw(25), marginRight: vw(12) }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    else
        return null
}

const styles = StyleSheet.create({
    container: {
        padding: vw(6),
        position: 'absolute',
        width: Dimensions.get('window').width - vw(20),
        bottom: vh(70),
        alignSelf: 'center',
        borderRadius: vw(5),
        flexDirection: 'row',
        alignItems: "center",
        flex: 1,
        backgroundColor: 'chocolate'
    },
    titleText: {
        fontSize: vw(16),
        fontFamily: fonts.BOLD,
        color: 'white',
    },
    subTitleText: {
        fontSize: vw(10),
        fontFamily: fonts.SEMIBOLD,
        color: 'white',
    },
    thumbnail: {
        width: vw(35),
        height: vw(35),
        marginRight: vw(12),
        borderRadius: vw(2),
        resizeMode: 'contain'
    }
})