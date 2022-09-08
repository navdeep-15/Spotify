import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Linking, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import screenNames from '@navdeep/utils/screenNames'
import Swiper from 'react-native-swiper'
import LinearGradient from 'react-native-linear-gradient';
import MiniPlayer from '@navdeep/components/MiniPlayer'

const horizontalData = [
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

const verticalData = [
  {
    title: 'premium individual',
    price: '₹0',
    duration: 'for 3 months',
    description: 'Ad-free music listening · Download to listen offline · Debit and Credit cards accepted',
    buttonTitle: 'try 3 months free',
    termsAndConditions: `Individual plan only ₹119/month after, Open only to users who haven't alreday tried Premium. Terms and conditions apply. Offer end s 9/11/22.`,
    color1: '#065947',
    color2: '#0ebe6d',
  },
  {
    title: 'premium student',
    price: '₹0',
    duration: 'for 3 months',
    description: 'Ad-free music listening · Download to listen offline',
    buttonTitle: 'try 3 months free',
    termsAndConditions: `Offer available only to students at accrediated higher education institutions who haven't alreday tried Premium. Terms and conditions apply. Offer end s 9/11/22.`,
    color1: '#F39925',
    color2: '#CA7E52',
  },
  {
    title: 'mini',
    price: 'from ₹7',
    duration: 'for 1 day',
    description: '1 day and 1 week plans · Ad-free music listening · Download 30 songs one 1 mobile device · Mobile only plan',
    buttonTitle: 'view plans',
    termsAndConditions: `Prices vary according to duration of plan. Terms and conditions apply.`,
    color1: '#4E95F1',
    color2: '#2E48BB',
  },
  {
    title: 'premium family',
    price: 'free',
    duration: 'for 1 month',
    description: 'Ad-free music listening · Choose 1, 3, 6 or 12 months of Premium · Debit and Credit cards accepted',
    buttonTitle: 'view plans',
    termsAndConditions: `Offer only for users who are new to Premium. Terms and conditions apply.`,
    color1: '#253166',
    color2: '#A92893',
  },
  {
    title: 'premium duo',
    price: 'free',
    duration: 'for 1 month',
    description: '2 Premium accounts · For couples who live together · Ad-free music listening · Choose 1, 3, 6 or 12 months of Premium · Debit and Credit cards accepted',
    buttonTitle: 'view plans',
    termsAndConditions: `Offer only for users who are new to Premium. Terms and conditions apply.`,
    color1: '#588FBF',
    color2: '#343560',
  },

]

export default function Premium(props: any) {

  const onPressTermsConditions = (url: any) => {
    props?.navigation?.navigate(screenNames?.BROWSER_SCREEN, { url })
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
          key={horizontalData?.length}
        >
          {
            horizontalData?.map(item => {
              return <HorizontalCard title1={item?.title1} title2={item?.title2} />
            })
          }
        </Swiper>
        <TouchableOpacity style={styles.premiumBtn} onPress={() => onPressTermsConditions('https://www.spotify.com/us/purchase/offer/2022-q3-global-trial-3m/?marketing-campaign-id=q3-2022&country=US')}>
          <Text style={styles.premiumBtnText}>GET PREMIUM</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          From ₹119/month after. Offer only for users who are new to Premium{'\n'}
          <Text style={{ fontFamily: fonts.EXTRA_BOLD, textDecorationLine: 'underline' }} onPress={() => onPressTermsConditions('https://www.spotify.com/us/legal/end-user-agreement/')}>Terms and Conditions apply</Text>
        </Text>
        <View style={styles.freeView}>
          <Text style={styles.freeText1}>Spotify Free</Text>
          <Text style={styles.freeText2}>CURRENT PLAN</Text>
        </View>
        <View style={{ paddingBottom: vh(120) }}>
          {
            verticalData?.map((item: any) => {
              return (
                <VerticalCard
                  title={item?.title}
                  price={item?.price}
                  duration={item?.duration}
                  description={item?.description}
                  btnText={item?.buttonTitle}
                  termsText={item?.termsAndConditions}
                  color1={item?.color1}
                  color2={item?.color2}
                  onPress={() => onPressTermsConditions('https://www.spotify.com/us/purchase/offer/2022-q3-global-trial-3m/?marketing-campaign-id=q3-2022&country=US')}
                />
              )
            })
          }
        </View>
      </ScrollView>
      {/* <MiniPlayer /> */}
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

const VerticalCard = (props: any) => {
  return (
    <LinearGradient
      colors={[props?.color1, props?.color2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.verticalCardStyle}>
      <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', width: '100%' }}>
        <Text style={styles.titleText}>{props?.title}</Text>
        <View>
          <Text style={styles.priceText}>{props?.price}</Text>
          <Text style={styles.durationText}>{props?.duration}</Text>
        </View>
      </View>
      <Text style={styles.descriptionText}>{props?.description}</Text>
      <TouchableOpacity style={styles.buttonView} onPress={() => props?.onPress()}>
        <Text style={styles.btnText}>{props?.btnText}</Text>
      </TouchableOpacity>
      <Text style={styles.tandcText}>{props?.termsText}</Text>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: vh(16)
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
  },
  freeView: {
    paddingVertical: vh(14),
    paddingHorizontal: vw(20),
    backgroundColor: '#333333',
    borderRadius: vw(5),
    flexDirection: "row",
    alignItems: 'center',
    marginHorizontal: vw(20),
    justifyContent: 'space-between',
    marginVertical: vh(15)
  },
  freeText1: {
    fontSize: vw(18),
    fontFamily: fonts.EXTRA_BOLD,
    color: 'white',
  },
  freeText2: {
    fontSize: vw(10),
    fontFamily: fonts.REGULAR,
    color: '#b5b5b5',
  },
  verticalCardStyle: {
    paddingTop: vh(30),
    paddingBottom: vh(15),
    paddingHorizontal: vw(20),
    borderRadius: vw(5),
    marginHorizontal: vw(20),
    marginVertical: vh(12),
    alignItems: 'center',
  },
  titleText: {
    fontSize: vw(18),
    fontFamily: fonts.BOLD,
    color: 'white',
    textTransform: "capitalize"
  },
  priceText: {
    fontSize: vw(22),
    fontFamily: fonts.EXTRA_BOLD,
    color: 'white',
    textTransform: "capitalize",
    textAlign: 'right'
  },
  durationText: {
    fontSize: vw(10),
    fontFamily: fonts.REGULAR,
    color: 'white',
    textTransform: 'uppercase'
  },
  descriptionText: {
    fontSize: vw(15),
    fontFamily: fonts.SEMIBOLD,
    color: 'white',
    marginTop: vh(32),
    textAlign: 'center'
  },
  buttonView: {
    marginTop: vh(20),
    paddingHorizontal: vw(20),
    paddingVertical: vh(12),
    borderRadius: vw(50),
    backgroundColor: 'white'
  },
  btnText: {
    fontSize: vw(16),
    fontFamily: fonts.SEMIBOLD,
    textTransform: 'uppercase',
    color: 'black'
  },
  tandcText: {
    marginTop: vh(10),
    fontSize: vw(10),
    fontFamily: fonts.REGULAR,
    color: 'white',
    lineHeight: vh(15),
    textAlign: 'center'
  }
})