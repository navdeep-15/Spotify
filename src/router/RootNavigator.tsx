import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import BottomNavigator from './BottomNavigator';
import { useDispatch, useSelector } from 'react-redux'
import NetInfo from "@react-native-community/netinfo";
import actionNames from '@navdeep/utils/actionNames';
import common from '@navdeep/utils/common';
import { getAccessToken } from '@navdeep/actions';
import { navigationRef } from '@navdeep/utils/navigationService';
import MiniPlayer from '@navdeep/components/MiniPlayer';
import { setLoaderState } from '@navdeep/actions'

export default function RootNavigator(props: any) {
    const { loginInfo } = useSelector((state: any) => state?.authReducer);
    // return (
    //     <NavigationContainer ref={navigationRef}>
    //         {
    //             loginInfo?.status ? <BottomNavigator /> : <AuthNavigator />
    //         }
    //         {
    //             loginInfo?.status ? <MiniPlayer /> : null
    //         }
    //     </NavigationContainer>
    // )
    return loginInfo?.status ? <BottomNavigator /> : <AuthNavigator />
}