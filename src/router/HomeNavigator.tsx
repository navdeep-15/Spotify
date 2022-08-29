import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@navdeep/utils/screenNames';
import Home from '@navdeep/screens/home/HomeScreen';
import RecentlyPlayedScreen from '@navdeep/screens/home/RecentlyPlayedScreen';
import SettingsScreen from '@navdeep/screens/home/SettingsScreen';

const Stack = createNativeStackNavigator()

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames?.HOME_SCREEN} component={Home} />
      <Stack.Screen name={screenNames?.RECENTLY_PLAYED_SCREEN} component={RecentlyPlayedScreen} />
      <Stack.Screen name={screenNames?.SETTINGS_SCREEN} component={SettingsScreen} />
    </Stack.Navigator>
  )
}