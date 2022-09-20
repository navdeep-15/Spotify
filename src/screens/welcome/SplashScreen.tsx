import React, { useEffect, useState } from 'react'
import SplashComponent from '@navdeep/components/SplashComponent'
import screenNames from '@navdeep/utils/screenNames'
import common from '@navdeep/utils/common';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export default function SplashScreen(props: any) {

    const [toScreen, settoScreen] = useState<any>('')

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
                props?.navigation?.navigate(screenNames?.ROOT_NAVIGATOR, { toScreen })
            }, 4000);
        }
    }

    const handleDynamicLink = () => {
        {/************************** FOREGROUND STATE ***************************/ }
        dynamicLinks().onLink((link: any) => {
            console.log('DYNAMIC LINK (FOREGROUND): ', link);
            onFetchDynamicLink(link)
        })

        {/************************** BACKGROUND STATE ***************************/ }
        dynamicLinks().getInitialLink()
            .then(link => {
                console.log('DYNAMIC LINK (BACKGROUND): ', link);
                onFetchDynamicLink(link)
            })
            .catch(error => {
                console.log('Error while fetching dynamic link ', error);
            })
    }

    const onFetchDynamicLink = (link: any) => {
        if (link?.url > 0) {
            let screenName = link?.url?.split('?')?.[1]?.split('=')?.[1]
            switch (screenName) {
                case 'mapsScreen': settoScreen(screenNames.MAPS_SCREEN)
                    break;
                default: settoScreen('')
                    break;
            }
        }
    }

    return (
        <SplashComponent />
    )
}

