import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@navdeep/utils/screenNames';
import RootNavigator from './RootNavigator';
import SplashScreen from '@navdeep/screens/welcome/SplashScreen';
import { useDispatch } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import actionNames from '@navdeep/utils/actionNames';
import common from '@navdeep/utils/common';
import { getAccessToken } from '@navdeep/actions';
import { setLoaderState } from '@navdeep/actions'
import CodePushScreen from '@navdeep/screens/welcome/CodePushScreen';

const Stack = createNativeStackNavigator()

export default function Router() {
    const dispatch = useDispatch()

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
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={screenNames?.SPLASH_SCREEN} component={SplashScreen} />
                <Stack.Screen name={screenNames?.CODEPUSH_SCREEN} component={CodePushScreen} />
                <Stack.Screen name={screenNames?.ROOT_NAVIGATOR} component={RootNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}