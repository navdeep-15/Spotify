import React, { useEffect } from 'react'
import SplashComponent from '@navdeep/components/SplashComponent'
import screenNames from '@navdeep/utils/screenNames'
import common from '@navdeep/utils/common';

export default function SplashScreen(props: any) {

    useEffect(() => {
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

    return (
        <SplashComponent />
    )
}

