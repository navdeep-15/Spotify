import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import screenNames from '@navdeep/utils/screenNames'
import Swiper from 'react-native-swiper'
import LinearGradient from 'react-native-linear-gradient';

const data = [
  {
    title1: 'Ad breaks',
    title2: 'Ad-free music listening'
  },
  {
    title1: 'Streaming only',
    title2: 'Download songs'
  },
  {
    title1: 'Listen alone',
    title2: 'Group session'
  }
]

export default function Premium(props: any) {

  const onPressTermsConditions = () => {
    // let url = 'https://www.spotify.com/us/legal/end-user-agreement/';
    // Linking.canOpenURL(url).then(response => {
    //   if (response) {
    //     Linking.openURL(url);
    //   } else {
    //     console.log("error");
    //   }
    // });
    props?.navigation?.navigate(screenNames?.BROWSER_SCREEN, { url: 'https://www.spotify.com/us/legal/end-user-agreement/' })
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Try Premium free for 1 month</Text>
        <Swiper
          style={{ height: vh(180) }}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          loop={false}
          key={data?.length}
        >
          {
            data?.map(item => {
              return <HorizontalCard title1={item?.title1} title2={item?.title2} />
            })
          }
        </Swiper>
        <TouchableOpacity style={styles.premiumBtn}>
          <Text style={styles.premiumBtnText}>GET PREMIUM</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          From ₹119/month after. Offer only for users who are new to Premium{'\n'}
          <Text style={{ fontFamily: fonts.EXTRA_BOLD, textDecorationLine: 'underline' }} onPress={onPressTermsConditions}>Terms and Conditions apply</Text>
        </Text>
      </ScrollView>
    </View>
  )
}

const HorizontalCard = (props: any) => {
  return (
    <View style={styles.cardStyle}>
      <View style={styles.subCardStyle1}>
        <Text style={styles.horizontalTitle}>FREE</Text>
        <Text style={styles.horizontalSubTitle}>{props?.title1}</Text>
      </View>
      <LinearGradient
        colors={['#065947', '#0ebe6d']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.subCardStyle2}>
        <Text style={styles.horizontalTitle}>FREE</Text>
        <Text style={styles.horizontalSubTitle}>{props?.title2}</Text>
      </LinearGradient>
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
    marginBottom: vh(15)
  },
  cardStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    width: vw(280),
    alignSelf: 'center'
  },
  subCardStyle1: {
    flex: 0.5,
    paddingHorizontal: vw(12),
    backgroundColor: '#333333',
    height: vh(140),
    borderTopLeftRadius: vw(5),
    borderBottomLeftRadius: vw(5)
  },
  subCardStyle2: {
    flex: 0.5,
    paddingHorizontal: vw(12),
    backgroundColor: 'lightgreen',
    height: vh(140),
    borderTopRightRadius: vw(5),
    borderBottomRightRadius: vw(5)
  },
  horizontalTitle: {
    fontSize: vw(12.5),
    fontFamily: fonts.SEMIBOLD,
    color: '#b5b5b5',
    textAlign: "center",
    marginTop: vh(10)
  },
  horizontalSubTitle: {
    fontSize: vw(18),
    fontFamily: fonts.BOLD,
    color: 'white',
    textAlign: "center",
    marginTop: vh(25)
  },
  dotStyle: {
    backgroundColor: '#b5b5b5',
    width: vw(5),
    height: vh(5),
    marginBottom: vh(-40),
  },
  activeDotStyle: {
    backgroundColor: 'white',
    width: vw(6.5),
    height: vh(6.5),
    marginBottom: vh(-40),
  },
  premiumBtn: {
    alignSelf: 'center',
    paddingVertical: vh(15),
    paddingHorizontal: vw(25),
    backgroundColor: 'white',
    borderRadius: vw(50),
    marginVertical: vh(16)
  },
  premiumBtnText: {
    fontSize: vw(14),
    fontFamily: fonts.BOLD,
    textAlign: "center",
    color: 'black'
  },
  termsText: {
    fontSize: vw(10),
    fontFamily: fonts.REGULAR,
    textAlign: "center",
    color: 'white',
    paddingHorizontal: vw(16),
    lineHeight: vh(15)
  }
})