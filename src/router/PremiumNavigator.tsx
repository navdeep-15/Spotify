import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@navdeep/utils/screenNames';
import Premium from '@navdeep/screens/premium/PremiumScreen';
import BrowserScreen from '@navdeep/screens/premium/BrowserScreen';
import ReactNativeTopicsScreen from '@navdeep/screens/premium/ReactNativeTopicsScreen';
import ChartScreen from '@navdeep/screens/premium/reactNativeScreens/ChartScreen';
import MapsScreen from '@navdeep/screens/premium/reactNativeScreens/MapsScreen';

const Stack = createNativeStackNavigator()

export default function PremiumNavigator(props: any) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames?.PREMIUM_SCREEN} component={Premium} />
      <Stack.Screen name={screenNames?.BROWSER_SCREEN} component={BrowserScreen} />
      <Stack.Screen name={screenNames?.REACT_NATIVE_TOPICS_SCREEN} component={ReactNativeTopicsScreen} />
      <Stack.Screen name={screenNames?.CHART_SCREEN} component={ChartScreen} />
      <Stack.Screen name={screenNames?.MAPS_SCREEN} component={MapsScreen} />
    </Stack.Navigator>
  )
}