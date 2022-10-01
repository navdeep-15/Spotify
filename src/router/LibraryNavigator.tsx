import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@navdeep/utils/screenNames';
import Library from '@navdeep/screens/library/LibraryScreen';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator()

export default function LibraryNavigator() {
  const { screenName } = useSelector((state: any) => state?.dynamicLinkReducer);
  return (
    <Stack.Navigator
      initialRouteName={screenName ?? screenNames?.LIBRARY_SCREEN}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames?.LIBRARY_SCREEN} component={Library} />
    </Stack.Navigator>
  )
}