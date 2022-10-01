import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@navdeep/utils/screenNames';
import Search from '@navdeep/screens/search/SearchScreen';
import MainSearch from '@navdeep/screens/search/MainSearchScreen';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator()

export default function SearchNavigator() {
  const { screenName } = useSelector((state: any) => state?.dynamicLinkReducer);
  return (
    <Stack.Navigator
      initialRouteName={screenName ?? screenNames?.SEARCH_SCREEN}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames?.SEARCH_SCREEN} component={Search} />
      <Stack.Screen name={screenNames?.MAIN_SEARCH_SCREEN} component={MainSearch} />
    </Stack.Navigator>
  )
}