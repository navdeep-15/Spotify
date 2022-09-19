import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, TextInput, FlatList, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import screenNames from '@navdeep/utils/screenNames'
import localImages from '@navdeep/utils/localImages'
import Header from '@navdeep/components/Header'
import MapView, { Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux'
import { getLocationList } from '@navdeep/actions'

export default function MapsScreen(props: any) {
  const dispatch = useDispatch()
  const [searchText, setsearchText] = useState<string>('')
  const [showSearchModal, setshowSearchModal] = useState<any>(true)
  const [locationData, setlocationData] = useState<any>([])
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
      // dispatch(getLocationList(payload, (data: any) => {

      // }))
    }
  }, [searchText])

  const handleLoadMore = () => {

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
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
                style={{ width: vw(20), height: vw(20), alignSelf: 'center', tintColor: 'black' }}
              />
            </TouchableOpacity> :
            <TouchableOpacity style={styles.searchBtn}>
              <Image
                source={localImages?.SEARCH_UNFOCUSED}
                style={{ width: vw(20), height: vw(20), tintColor: 'white', alignSelf: 'center' }}
              />
            </TouchableOpacity>
        }
      </View>
      <MapView
        // initialRegion={{
        //   latitude: 0,
        //   longitude:0,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0221,
        // }}
        //region={location}
        style={{ width: '100%', height: '82%', alignSelf: 'center' }}
        onRegionChange={region => setlocation(region)}
      >
        <Marker
          draggable
          //key={0}
          coordinate={{
            latitude: location?.latitude ?? 0,
            longitude: location?.longitude ?? 0
          }}
          title={'marker.title'}
          description={'marker.description'}
        />
      </MapView>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => setshowSearchModal(false)}
        visible={showSearchModal}
      >
        <View style={{ maxHeight: vh(200), backgroundColor: 'white', marginHorizontal: vw(20), marginTop: vh(95), borderRadius: vw(6), }}>
          <FlatList
            data={locationData ?? []}
            renderItem={({ item, index }: any) => {
              return (
                <></>
              )
            }}
            keyExtractor={(item: any) => item}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.2}
            onEndReached={handleLoadMore}
            ListEmptyComponent={() => {
              return (
                <></>
              )
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  searchView: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: 'white',
    paddingHorizontal: vw(15),
    paddingVertical: vh(6),
    marginHorizontal: vw(20),
    borderRadius: vw(6),
    justifyContent: 'space-between',
    marginBottom: vh(20)
  },
  textInput: {
    fontFamily: fonts.SEMIBOLD,
    width: '90%',
    fontSize: vw(16),
    paddingVertical: vh(0),
    color: 'black'
  },
  searchBtn: {
    backgroundColor: '#17bb3d',
    borderRadius: vw(100),
    width: vw(30),
    height: vw(30),
    justifyContent: 'center'
  }
})