import React, { useEffect } from 'react'
import SplashComponent from '@navdeep/components/SplashComponent'

import screenNames from '@navdeep/utils/screenNames'

export default function SplashScreen(props: any) {

    useEffect(() => {
        setTimeout(() => {
            props?.navigation?.navigate(screenNames?.ROOT_NAVIGATOR)
        }, 2000);
    }, [])

    return (
        <SplashComponent />
    )
}

