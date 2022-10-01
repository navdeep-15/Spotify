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
            const screenName = onFetchDynamicLink(link)
            dispatch({
                type: actionNames?.DYNAMIC_LINK_REDUCER,
                payload: {
                    screenName: screenName
                }
            })
        }
        else {
            dynamicLinks().onLink((link: any) => {                    // FOR FOREGROUND STATE
                console.log('DYNAMIC LINK (FOREGROUND): ', link);
                const screenName = onFetchDynamicLink(link)
                dispatch({
                    type: actionNames?.DYNAMIC_LINK_REDUCER,
                    payload: {
                        screenName: screenName
                    }
                })
            })
        }
    }

    const onFetchDynamicLink = (link: any) => {
        if (link?.url) {
            let screenName = link?.url?.split('?')?.[1]?.split('=')?.[1]
            switch (screenName) {
                case 'mapsScreen': return screenNames.MAPS_SCREEN
                default: return ''
            }
        }
        return ''
    }

    return (
        <SplashComponent />
    )
}

