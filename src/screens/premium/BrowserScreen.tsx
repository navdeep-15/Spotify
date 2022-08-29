import { StyleSheet, Text, TouchableOpacity, View, Image, Platform } from 'react-native'
import { WebView } from 'react-native-webview';
import React from 'react'
import { vw, vh } from '@navdeep/utils/dimensions'
import localImages from '@navdeep/utils/localImages';

export default function BrowserScreen(props: any) {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.headerStyle} onPress={() => props?.navigation?.goBack()}>
        <Image
          source={localImages?.CROSS}
          style={{ width: vw(25), height: vw(25), tintColor: 'white',marginTop:Platform.OS==='ios'? vh(25):null }}
        />
      </TouchableOpacity>
      <WebView source={{ uri: props?.route?.params?.url }} />
    </View>
  )
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#121212',
    padding: vh(10),
  }
})