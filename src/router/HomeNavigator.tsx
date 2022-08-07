import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@navdeep/utils/screenNames';
import Home from '@navdeep/screens/home/HomeScreen';

const Stack = createNativeStackNavigator()

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames?.HOME_SCREEN} component={Home} />
    </Stack.Navigator>
  )
}