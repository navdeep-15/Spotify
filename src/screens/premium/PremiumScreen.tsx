import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import screenNames from '@navdeep/utils/screenNames'
import Carousel from 'react-native-snap-carousel';

export default function Premium() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Try Premium free for 1 month</Text>
        {/* <Carousel
          data={[1, 2, 3]}
          inactiveSlideScale={0.8}
          // sliderWidth={vw(350)}
          // itemWidth={vw(285)}
          renderItem={({ item, index }: any) => {
            return (
              null
            )
          }}
        /> */}

      </ScrollView>
    </View>
  )
}

const HorizontalCard = () => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", width: vw(280), marginRight: vw(-50) }}>
      <View style={{ flex: 0.5, paddingHorizontal: vw(12), backgroundColor: 'darkgray', height: vh(140), borderTopLeftRadius: vw(5), borderBottomLeftRadius: vw(5) }}>
        <Text style={styles.horizontalTitle}>FREE</Text>
        <Text style={styles.horizontalSubTitle}>Ad Breaks</Text>
      </View>
      <View style={{ flex: 0.5, paddingHorizontal: vw(12), backgroundColor: 'lightgreen', height: vh(140), borderTopRightRadius: vw(5), borderBottomRightRadius: vw(5) }}>
        <Text style={styles.horizontalTitle}>FREE</Text>
        <Text style={styles.horizontalSubTitle}>Ad-free music listening</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  heading: {
    fontSize: vw(28),
    fontFamily: fonts.EXTRA_BOLD,
    color: 'white',
    textAlign: "center",
    marginHorizontal: vw(40),
    marginTop: vh(50),
    marginBottom: vh(30)
  },
  horizontalTitle: {
    fontSize: vw(12.5),
    fontFamily: fonts.SEMIBOLD,
    color: 'gray',
    textAlign: "center",
    marginTop: vh(10)
  },
  horizontalSubTitle: {
    fontSize: vw(18),
    fontFamily: fonts.BOLD,
    color: 'white',
    textAlign: "center",
    marginTop: vh(25)
  }
})