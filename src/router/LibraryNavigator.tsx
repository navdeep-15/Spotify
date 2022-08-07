import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@navdeep/utils/screenNames';
import Library from '@navdeep/screens/library/LibraryScreen';

const Stack = createNativeStackNavigator()

export default function LibraryNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames?.LIBRARY_SCREEN} component={Library} />
    </Stack.Navigator>
  )
}