import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import localImages from '@navdeep/utils/localImages'
import screenNames from '@navdeep/utils/screenNames'
import { useSelector } from 'react-redux'
import MiniPlayer from '@navdeep/components/MiniPlayer'

export default function Library() {

  const { loginInfo } = useSelector((state: any) => state?.authReducer);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: vh(18) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <View style={styles.nameImage} >
              <Text style={styles.nameImageText}>{loginInfo?.currentUser?.name?.charAt(0)?.toUpperCase() ?? ''}</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.screenHeading}>Your Library</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <Image
              source={localImages?.SEARCH_UNFOCUSED}
              style={{ width: vw(25), height: vw(25), marginRight: vw(12), tintColor: 'white' }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={localImages?.PLUS}
              style={{ width: vw(25), height: vw(25) }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>

      </ScrollView>
      <MiniPlayer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: vh(25),
    paddingHorizontal: vw(20)
  },
  screenHeading: {
    fontSize: vw(24),
    fontFamily: fonts.BOLD,
    color: 'white',
    //marginBottom:vh(18)
  },
  nameImage: {
    width: vw(25),
    height: vw(25),
    backgroundColor: '#1cd05d',
    borderRadius: vw(100),
    marginRight: vw(12),
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameImageText: {
    fontSize: vw(16),
    fontFamily: fonts.BOLD,
    color: '#121212',
  }
})