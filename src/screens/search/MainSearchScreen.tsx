import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { vh, vw } from '@navdeep/utils/dimensions'
import fonts from '@navdeep/utils/fonts'
import localImages from '@navdeep/utils/localImages'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchList } from '@navdeep/actions'
import { useIsFocused } from '@react-navigation/native'
import actionNames from '@navdeep/utils/actionNames'
import Sound from 'react-native-sound'
import MiniPlayer from '@navdeep/components/MiniPlayer'
import screenNames from '@navdeep/utils/screenNames'

export default function MainSearch(props: any) {
  const dispatch = useDispatch()
  const isFocused = useIsFocused();

  const [searchText, setsearchText] = useState<string>('')
  const [searchList, setsearchList] = useState<any>([])
  const [page, setPage] = useState<number>(0);

  const { recentSearchesList } = useSelector((state: any) => state?.recentSearchesReducer);

  useEffect(() => {
    if (isFocused) {
      if (searchText?.length) {
        fetchSearchList(0)
        setPage(0)
      }
      else {
        setsearchList(recentSearchesList)
      }
    }
  }, [isFocused, searchText])


  const fetchSearchList = (page: number) => {
    let payload = {
      q: searchText,
      type: 'track',
      limit: 20,
      offset: page
    }
    //@ts-ignore
    dispatch(getSearchList(payload, (data: any) => {
      if (page === 0)
        setsearchList(data?.tracks?.items)
      else
        setsearchList(searchList?.concat(data?.tracks?.items))
    }))
  }

  const handleLoadMore = () => {
    if (searchList?.length % 20 === 0) {
      fetchSearchList(page + 1);
      setPage(page + 1);
    }
  }

  return (
    <View>
      <StatusBar backgroundColor={'#2a2a2a'} />
      <View style={styles.searchView}>
        <TouchableOpacity onPress={() => {
          props?.navigation?.goBack()
        }}>
          <Image
            source={localImages?.BACK}
            style={{ width: vw(18), height: vw(18) }}
          />
        </TouchableOpacity>
        <TextInput
          placeholder='Search query'
          placeholderTextColor='#bebebe'
          style={styles.textInput}
          value={searchText}
          onChangeText={(text: any) => setsearchText(text)}
          selectionColor={'white'}
        />
        {
          searchText?.length ?
            <TouchableOpacity onPress={() => setsearchText('')}>
              <Image
                source={localImages?.CROSS}
                style={{ width: vw(20), height: vw(20) }}
              />
            </TouchableOpacity> :
            <Image
              source={localImages?.SEARCH_UNFOCUSED}
              style={{ width: vw(20), height: vw(20), tintColor: 'white' }}
            />
        }
      </View>
      <View style={styles.container}>
        {
          !searchText?.length ?
            <Text style={styles.headingText}>Recent searches</Text> : null
        }
        <FlatList
          data={searchText?.length ? searchList : recentSearchesList}
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
                isRecentSearches={!searchText?.length}
                item={item}
                index={index}
                navigation={props?.navigation}
              />
            )
          }}
          keyExtractor={(item: any) => item}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          onEndReached={handleLoadMore}
          ListEmptyComponent={() => {
            if (searchText?.length) {
              return (
                <View style={{ marginTop: vh(200), paddingHorizontal: vw(20) }}>
                  <Text style={styles.emptyText1}>{`Couldn't find "${searchText}"`}</Text>
                  <Text style={styles.emptyText2}>Try Searching again using a different spelling or keyword</Text>
                </View>
              )
            }
            else
              return null
          }}
        />
      </View>
      {/* <MiniPlayer/> */}
    </View>
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
  container: {
    backgroundColor: '#121212',
    paddingHorizontal: vw(20),
    height: '93.9%',
    paddingTop: vh(20),
  },
  searchView: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: '#575757',
    paddingHorizontal: vw(15),
    paddingVertical: vh(10),
  },
  textInput: {
    fontFamily: fonts.SEMIBOLD,
    width: '89%',
    fontSize: vw(16),
    paddingVertical: vh(0),
    color: 'white',
  },
  headingText: {
    fontSize: vw(18),
    fontFamily: fonts.EXTRA_BOLD,
    color: 'white',
    marginBottom: vh(10)
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