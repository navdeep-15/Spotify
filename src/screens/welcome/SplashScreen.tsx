import React, { useEffect, useState } from 'react'
import SplashComponent from '@navdeep/components/SplashComponent'
import screenNames from '@navdeep/utils/screenNames'
import common from '@navdeep/utils/common';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { useDispatch } from 'react-redux';
import actionNames from '@navdeep/utils/actionNames';

export default function SplashScreen(props: any) {

    const dispatch = useDispatch()

    useEffect(() => {
        handleDynamicLink()
        codePushCheck()
    }, [])

    const codePushCheck = async () => {
        const isUpdate = await common?.checkForUpdate()
        if (isUpdate) {
            setTimeout(() => {
                props?.navigation?.navigate(screenNames?.CODEPUSH_SCREEN)
            }, 4000);
        }
        else {
            setTimeout(() => {
                props?.navigation?.navigate(screenNames?.ROOT_NAVIGATOR)
            }, 4000);
        }
    }

    const handleDynamicLink = async () => {
        const link = await dynamicLinks().getInitialLink()            // FOR BACKGROUND STATE
        if (link?.url) {
            console.log('DYNAMIC LINK (BACKGROUND): ', link);
            let obj = onFetchDynamicLink(link)
            dispatch({
                type: actionNames?.DYNAMIC_LINK_REDUCER,
                payload: {
                    screenName: obj?.screen ?? '',
                    navigatorName: obj?.navigator ?? ''
                }
            })
        }
        else {
            dynamicLinks().onLink((link: any) => {                    // FOR FOREGROUND STATE
                console.log('DYNAMIC LINK (FOREGROUND): ', link);
                let obj = onFetchDynamicLink(link)
                dispatch({
                    type: actionNames?.DYNAMIC_LINK_REDUCER,
                    payload: {
                        screenName: obj?.screen ?? '',
                        navigatorName: obj?.navigator ?? ''
                    }
                })
            })
        }
    }

    const onFetchDynamicLink = (link: any) => {
        if (link?.url) {
            let screen = '', navigator = ''
            let temp = link?.url?.split('?')?.[1]?.split('&')
            let temp_screen = temp?.[0]?.split('=')?.[1]
            let temp_navigator = temp?.[1]?.split('=')?.[1]

            switch (temp_screen) {
                case 'mapsScreen': screen = screenNames.MAPS_SCREEN
                    break;
                default: screen = ''
                    break;
            }
            switch (temp_navigator) {
                case 'premiumNavigator': navigator = screenNames?.PREMIUM_NAVIGATOR
                    break;
                default: navigator = ''
                    break;
            }
            return { screen, navigator }
        }
        return {}
    }

    return (
        <SplashComponent />
    )
}

