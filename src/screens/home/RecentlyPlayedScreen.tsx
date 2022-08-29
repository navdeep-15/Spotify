import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import localImages from '@navdeep/utils/localImages'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import screenNames from '@navdeep/utils/screenNames'
import { useDispatch, useSelector } from 'react-redux'
import actionNames from '@navdeep/utils/actionNames'
import Sound from 'react-native-sound'

export default function RecentlyPlayedScreen(props: any) {
    const { recentSearchesList } = useSelector((state: any) => state?.recentSearchesReducer);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: vh(10) }}>
                <TouchableOpacity onPress={() => props?.navigation?.goBack()}>
                    <Image
                        source={localImages?.BACK}
                        style={{ width: vw(25), height: vw(25), marginRight: vw(12), marginLeft: vw(5) }}
                    />
                </TouchableOpacity>
                <Text style={styles.screenHeading}>Recently Played</Text>
            </View>
            <FlatList
                data={recentSearchesList}
                renderItem={({ item, index }: any) => {
                    let artistName = '';
                    item?.artists?.map((item: any) => {
                        artistName = artistName + ' ' + item?.name ?? ''
                    })
                    return (
                        <ListItem
                            icon={item?.album?.images?.[0]?.url ?? ''}
                            title={item?.name ?? ''}
                            subTitle={`Song · ${artistName}` ?? ''}
                            url={item?.preview_url ?? ''}
                            isRecentSearches={true}
                            item={item}
                            index={index}
                            navigation={props?.navigation}
                        />
                    )
                }}
                contentContainerStyle={{paddingHorizontal:vw(20),marginTop:vh(15)}}
                keyExtractor={(item: any) => item}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.2}
                //onEndReached={handleLoadMore}
                ListEmptyComponent={() => {
                    return (
                        <View style={{ marginTop: vh(200), paddingHorizontal: vw(20) }}>
                            <Text style={styles.emptyText1}>No recent History</Text>
                            <Text style={styles.emptyText2}>Try Searching song or artist from search bar</Text>
                        </View>
                    )
                }}
            />
        </SafeAreaView>
    )
}

const ListItem = (props: any) => {

    const dispatch = useDispatch()
    const { recentSearchesList } = useSelector((state: any) => state?.recentSearchesReducer);
    const { isPlaying, soundObject } = useSelector((state: any) => state?.currentSongReducer);

    const stopCurrentSong = async () => {
        if (isPlaying) {
            await soundObject?.stop()
        }
    }

    const onPressSong = () => {

        stopCurrentSong()

        let tempRecentSearchList = [...recentSearchesList ?? []] ?? []
        tempRecentSearchList?.unshift(props?.item)
        const songObject = new Sound(
            props?.url,
            null,
            (error: any) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
            }
        )

        dispatch({
            type: actionNames?.CURRENT_SONG_REDUCER,
            payload: {
                songIcon: props?.icon,
                songTitle: props?.title,
                songSubTitle: props?.subTitle,
                songURL: props?.url,
                soundObject: songObject,
                isPlaying: true,
            }
        })

        if (!props?.isRecentSearches) {
            dispatch({
                type: actionNames?.RECENT_SEARCHES_REDUCER,
                payload: {
                    recentSearchesList: tempRecentSearchList
                }
            })
        }
        setTimeout(() => {
            props?.navigation?.navigate(screenNames?.HOME_NAVIGATOR, { screen: screenNames?.HOME_SCREEN })
        }, 100)
    }

    const onPressDelete = () => {
        let tempRecentSearchList = recentSearchesList ?? []
        if (props?.index > -1)
            tempRecentSearchList.splice(props?.index, 1)
        dispatch({
            type: actionNames?.RECENT_SEARCHES_REDUCER,
            payload: {
                recentSearchesList: tempRecentSearchList
            }
        })
    }

    return (
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: vh(10), justifyContent: 'space-between' }} onPress={onPressSong}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={{ uri: props?.icon }}
                    style={{ width: vw(50), height: vw(50) }}
                />
                <View style={{ marginLeft: vw(10), width: vw(245) }}>
                    <Text style={styles.titleText} numberOfLines={1}>{props?.title}</Text>
                    <Text style={styles.subTitleText} numberOfLines={1}>{props?.subTitle}</Text>
                </View>
            </View>
            {
                props?.isRecentSearches ?
                    <TouchableOpacity onPress={onPressDelete}>
                        <Image
                            source={localImages?.CROSS}
                            style={{ width: vw(25), height: vw(25), tintColor: '#bebebe' }}
                        />
                    </TouchableOpacity> : null
            }
        </TouchableOpacity>
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
    titleText: {
        fontSize: vw(16),
        fontFamily: fonts.BOLD,
        color: 'white',
        maxWidth: vw(240),
    },
    subTitleText: {
        fontSize: vw(12),
        fontFamily: fonts.REGULAR,
        color: 'white',
        maxWidth: vw(240)
    },
    emptyText1: {
        fontSize: vw(20),
        fontFamily: fonts.BOLD,
        color: 'white',
        textAlign: 'center'
    },
    emptyText2: {
        fontSize: vw(14),
        fontFamily: fonts.REGULAR,
        color: '#a6a6a6',
        marginTop: vh(10),
        textAlign: 'center'
    }
})