import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@navdeep/utils/screenNames';
import Premium from '@navdeep/screens/premium/PremiumScreen';

const Stack = createNativeStackNavigator()

export default function PremiumNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames?.PREMIUM_SCREEN} component={Premium} />
    </Stack.Navigator>
  )
}