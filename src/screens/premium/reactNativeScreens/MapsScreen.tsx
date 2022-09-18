import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import screenNames from '@navdeep/utils/screenNames'
import localImages from '@navdeep/utils/localImages'
import Header from '@navdeep/components/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MapView, { Marker } from 'react-native-maps';

export default function MapsScreen(props: any) {
  const [searchText, setsearchText] = useState<string>('')
  const [location, setlocation] = useState<any>({
    latitude: 197,
    longitude: 100,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0221,
  })
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps={'handled'}>
        <Header title={'Maps'} props={props} />
        <MapView
          // initialRegion={{
          //   latitude: 0,
          //   longitude:0,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0221,
          // }}
          region={location}
          style={{ width: '100%', height: '80%', alignSelf: 'center' }}
          onRegionChange={region => setlocation(region)}
        >
          <Marker
            key={0}
            coordinate={{
              latitude: location?.latitude ?? 0,
              longitude: location?.longitude ?? 0
            }}
            title={'marker.title'}
            description={'marker.description'}
          />
        </MapView>
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
    paddingVertical: vh(10),
    marginHorizontal: vw(20),
    borderRadius: vw(100),
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: vh(20)
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