import React, { useEffect } from 'react'
import SplashComponent from '@navdeep/components/SplashComponent'

import screenNames from '@navdeep/utils/screenNames'

export default function Splash(props: any) {

    useEffect(() => {
        // setTimeout(() => {
        //     props?.navigation?.navigate(screenNames?.AUTH_NAVIGATOR)
        // }, 2000);
        props?.navigation?.navigate(screenNames?.AUTH_NAVIGATOR)
    }, [])

    return (
        <SplashComponent />
    )
}

