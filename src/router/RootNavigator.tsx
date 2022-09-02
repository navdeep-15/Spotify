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

export default function RootNavigator() {
    const dispatch = useDispatch()
    const { loginInfo } = useSelector((state: any) => state?.authReducer);

    useEffect(() => {

        //@ts-ignore
        dispatch(getAccessToken())

        //@ts-ignore
        dispatch(setLoaderState(false))

        NetInfo.addEventListener(state => {
            dispatch({
                type: actionNames?.AUTH_REDUCER,
                payload: {
                    isConnectedToInternet: state.isConnected
                }
            })
            !state.isConnected ? common?.snackBar(`You're offline, please check your internet`, true) : null
        });
    }, [])

    return (
        <NavigationContainer ref={navigationRef}>
            {
                loginInfo?.status ? <BottomNavigator /> : <AuthNavigator />
            }
            {
                loginInfo?.status ? <MiniPlayer /> : null
            }
        </NavigationContainer>
    )
}