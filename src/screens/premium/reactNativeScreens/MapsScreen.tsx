import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, TextInput, FlatList, Keyboard, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh, screenWidth } from '@navdeep/utils/dimensions'
import screenNames from '@navdeep/utils/screenNames'
import localImages from '@navdeep/utils/localImages'
import Header from '@navdeep/components/Header'
import MapView, { Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux'
import { getLocationList } from '@navdeep/actions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function MapsScreen(props: any) {
  const dispatch = useDispatch()
  const [searchText, setsearchText] = useState<string>('')
  const [showSearchModal, setshowSearchModal] = useState<any>(false)
  const [locationData, setlocationData] = useState<any>([])
  const [markerCoordinates, setmarkerCoordinates] = useState<any>({})
  const [location, setlocation] = useState<any>({
    latitude: 28.704060,
    longitude: 77.102493,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0221,
  })

  useEffect(() => {
    if (searchText) {
      let payload = { searchText, latitude: location?.latitude, longitude: location?.longitude }
      //@ts-ignore
      dispatch(getLocationList(payload, (data: any) => {
        setlocationData(data)
      }))
    }
  }, [searchText])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps={'handled'}>
        <Header title={'Maps'} props={props} />
        <View style={styles.searchView}>
          <TextInput
            placeholder='Search'
            placeholderTextColor='#bebebe'
            style={styles.textInput}
            value={searchText}
            onChangeText={(text: any) => setsearchText(text)}
            selectionColor={'#17bb3d'}
          />
          {
            searchText?.length ?
              <TouchableOpacity onPress={() => setsearchText('')}>
                <Image
                  source={localImages?.CROSS}
                  style={{ width: vw(25), height: vw(25), alignSelf: 'center', tintColor: 'black' }}
                />
              </TouchableOpacity> :
              <Image
                source={localImages?.SEARCH_UNFOCUSED}
                style={{ width: vw(25), height: vw(25), alignSelf: 'center' }}
              />
          }
        </View>
        <MapView
          style={{ width: '100%', height: '90%', alignSelf: 'center' }}
          region={{
            latitude: markerCoordinates?.latitude ?? 0,
            longitude: markerCoordinates?.longitude ?? 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0221,
          }}
        >
          <Marker
            key={0}
            coordinate={{
              latitude: markerCoordinates?.latitude ?? 0,
              longitude: markerCoordinates?.longitude ?? 0
            }}
            title={'marker.title'}
            description={'marker.description'}
          />
        </MapView>
        {
          (searchText && locationData) ?
            <View style={styles.modal}>
              <FlatList
                data={locationData ?? []}
                renderItem={({ item, index }: any) => {
                  return (
                    <TouchableOpacity
                      style={{ paddingHorizontal: vw(12), paddingVertical: vh(10) }}
                      onPress={() => {
                        setmarkerCoordinates(item?.coordinate)
                        setlocationData([])
                      }}>
                      <Text style={styles.locationText}>{item?.title}</Text>
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={(item: any) => item}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={false}
                ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
              />
            </View> : null
        }
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  searchView: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: 'white',
    paddingHorizontal: vw(15),
    paddingVertical: Platform?.OS === 'ios' ? vh(6) : null,
    marginHorizontal: vw(20),
    borderRadius: vw(6),
    justifyContent: 'space-between',
    marginBottom: vh(20)
  },
  textInput: {
    fontFamily: fonts.SEMIBOLD,
    width: '90%',
    fontSize: vw(16),
    color: 'black',
  },
  searchBtn: {
    backgroundColor: '#17bb3d',
    borderRadius: vw(100),
    width: vw(30),
    height: vw(30),
    justifyContent: 'center'
  },
  modal: {
    width: screenWidth - vw(40),
    maxHeight: vh(250),
    backgroundColor: 'white',
    borderRadius: vw(6),
    position: 'absolute',
    alignSelf: 'center',
    top: Platform?.OS==='android' ? vh(150) : vh(85)
  },
  seperator: {
    borderWidth: vw(0.8),
    borderColor: '#b5b5b550',
  },
  locationText: {
    fontFamily: fonts.REGULAR,
    fontSize: vw(14),
  }
})