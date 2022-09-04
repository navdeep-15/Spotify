import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, ScrollView, Switch } from 'react-native'
import React from 'react'
import localImages from '@navdeep/utils/localImages'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import screenNames from '@navdeep/utils/screenNames'
import { useDispatch, useSelector } from 'react-redux'
import actionNames from '@navdeep/utils/actionNames'
import auth from '@react-native-firebase/auth';
import DeviceInfo from 'react-native-device-info';
import common from '@navdeep/utils/common'

export default function SettingsScreen(props: any) {
  const dispatch = useDispatch()

  const { loginInfo } = useSelector((state: any) => state?.authReducer);

  const onPressTermsConditions = (url: any) => {
    props?.navigation?.navigate(screenNames?.BROWSER_SCREEN, { url })
  }

  const onPressLogOut = () => {
    auth().signOut()
      .then(() => {
        common?.snackBar('Signed out successfully!')
        dispatch({
          type: actionNames?.AUTH_REDUCER,
          payload: {
            loginInfo: {
              status: false,
              currentUser: {},
            }
          }
        })
      })
      .catch(error => {
        console.error(error);

      })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: vh(10) }}>
        <TouchableOpacity onPress={() => props?.navigation?.goBack()}>
          <Image
            source={localImages?.BACK}
            style={{ width: vw(25), height: vw(25), marginRight: vw(12), marginLeft: vw(5) }}
          />
        </TouchableOpacity>
        <Text style={styles.screenHeading}>Settings</Text>
      </View>

      <ScrollView style={{ paddingHorizontal: vw(20), marginBottom: vh(80), }} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenHeading2}>Free Account</Text>

        <TouchableOpacity style={styles.premiumBtn} onPress={() => onPressTermsConditions('https://www.spotify.com/us/purchase/offer/2022-q3-global-trial-3m/?marketing-campaign-id=q3-2022&country=US')}>
          <Text style={styles.premiumBtnText}>Go Premium</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: vh(10) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.nameImage} >
              <Text style={styles.nameImageText}>{loginInfo?.currentUser?.name?.charAt(0)?.toUpperCase() ?? ''}</Text>
            </View>
            <View>
              <Text style={styles.nameHeading}>{loginInfo?.currentUser?.name}</Text>
              <Text style={styles.nameSubHeading}>View Profile</Text>
            </View>
          </View>
          <Image
            source={localImages?.BACK}
            style={{ width: vw(18), height: vw(18), transform: [{ rotate: '180deg' }] }}
          />
        </TouchableOpacity>

        {
          settingsData?.map((item: any) => {
            return (
              <View style={{ marginVertical: vh(18) }}>
                <Text style={styles.listHeading}>{item?.heading ?? ''}</Text>
                {
                  item?.data?.map((subItem: any) => {
                    return (
                      <TouchableOpacity
                        onPress={subItem?.title?.toLowerCase() === 'log out' ? onPressLogOut : () => { }}
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: vh(15) }}>
                        <View>
                          <Text style={styles.listSubHeading}>{subItem?.title ?? ''}</Text>
                          <Text style={styles.listDesc} numberOfLines={2}>{subItem?.desc ?? ''}{subItem?.title?.toLowerCase() === 'log out' ? loginInfo?.currentUser?.name : null}</Text>
                        </View>
                        {
                          subItem?.toggle ?
                            <Switch
                              style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                              trackColor={{ false: "#767577", true: "#094804" }}
                              thumbColor={true ? "#00ff3c" : "#f4f3f4"}
                              value={true}
                            />
                            : null
                        }
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            )
          })
        }

      </ScrollView>

    </SafeAreaView>
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
  screenHeading2: {
    fontSize: vw(20),
    fontFamily: fonts.EXTRA_BOLD,
    color: 'white',
    textAlign: 'center',
    marginTop: vh(35)
  },
  premiumBtn: {
    alignSelf: 'center',
    paddingVertical: vh(14),
    paddingHorizontal: vw(40),
    backgroundColor: 'white',
    borderRadius: vw(50),
    marginVertical: vh(20)
  },
  premiumBtnText: {
    fontSize: vw(14),
    fontFamily: fonts.BOLD,
    textAlign: "center",
    color: 'black'
  },
  nameImage: {
    width: vw(55),
    height: vw(55),
    backgroundColor: '#00ff3c',
    borderRadius: vw(100),
    marginRight: vw(12),
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameImageText: {
    fontSize: vw(22),
    fontFamily: fonts.BOLD,
    color: '#121212',
  },
  nameHeading: {
    fontSize: vw(24),
    fontFamily: fonts.BOLD,
    color: 'white',
    letterSpacing: vw(1)
  },
  nameSubHeading: {
    fontSize: vw(12),
    fontFamily: fonts.REGULAR,
    color: 'white',
    letterSpacing: vw(0.8)
  },
  listHeading: {
    fontSize: vw(18),
    fontFamily: fonts.EXTRA_BOLD,
    color: 'white',
    textTransform: 'capitalize',
    letterSpacing: vw(0.9)
  },
  listSubHeading: {
    fontSize: vw(16),
    fontFamily: fonts.BOLD,
    color: 'white',
    textTransform: 'capitalize'
  },
  listDesc: {
    fontSize: vw(14),
    fontFamily: fonts.REGULAR,
    color: 'white',
    width: vw(270),
    marginTop: vh(5)
  }
})

const settingsData = [
  {
    heading: 'data saver',
    data: [
      {
        title: 'audio quality',
        desc: 'Sets you audio quality to low and disables artist canvases',
        toggle: true
      }
    ]
  },
  {
    heading: 'video podcasts',
    data: [
      {
        title: 'download audio only',
        desc: 'Save video podcasts as audio only',
        toggle: true
      },
      {
        title: 'stream audio only',
        desc: 'Play video podcasts as audio only when not on WiFi',
        toggle: true
      }
    ]
  },
  {
    heading: 'playback',
    data: [
      {
        title: 'crossfade',
        desc: 'Allows you to crossfade between range'
      },
      {
        title: 'gapless',
        desc: 'Allow gapless playback',
        toggle: true
      },
      {
        title: 'allow explicit content',
        desc: 'Turn on to play explicit content Explicit content is labeled with E tag',
        toggle: true
      }
    ]
  },
  {
    heading: 'about',
    data: [
      {
        title: 'Version',
        desc: DeviceInfo.getVersion()
      },
      {
        title: 'third-party software',
        desc: 'Sweet software that helped us'
      },
      {
        title: 'terms and conditions',
        desc: 'All the stuff you need to know'
      },
      {
        title: 'privacy policy',
        desc: 'Important for both of us'
      }
    ]
  },
  {
    heading: 'other',
    data: [
      {
        title: 'storage',
        desc: 'Choose where to store your music data'
      },
      {
        title: 'log out',
        desc: `You are logged in as `
      }
    ]
  },
]