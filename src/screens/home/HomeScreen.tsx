import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { vw, vh } from '@navdeep/utils/dimensions'
import localImages from '@navdeep/utils/localImages'
import screenNames from '@navdeep/utils/screenNames'
import fonts from '@navdeep/utils/fonts';
import MiniPlayer from '@navdeep/components/MiniPlayer';


export default function Home() {
  return (
    <LinearGradient
      colors={['#8FA01F', '#121212']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.25, y: 0.25 }}
      style={styles.container}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.screenHeading}>Home</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <Image
              source={localImages?.RECENT}
              style={{ width: vw(25), height: vw(25), marginRight: vw(12) }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={localImages?.SETTINGS}
              style={{ width: vw(25), height: vw(25) }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <MiniPlayer/>
    </LinearGradient>
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
    marginBottom:vh(18)
  }
})