import { StyleSheet, Text, View, Image } from 'react-native'
import codePush from 'react-native-code-push';
import React, { useEffect, useState } from 'react'
import RNRestart from 'react-native-restart'
import localImages from '@navdeep/utils/localImages';
import { vh, vw } from '@navdeep/utils/dimensions';
import fonts from '@navdeep/utils/fonts';
import LottieView from 'lottie-react-native';

const CodePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
}

export default function CodePushScreen() {
    const [updateInfo, setupdateInfo] = useState({
        updateAvailable: false,
        loading: false,
        updateInstalled: false,
    })
    const [downloadProgress, setdownloadProgress] = useState<any>(0)

    useEffect(() => {
        checkForUpdate()
    }, [updateInfo?.loading, updateInfo?.updateAvailable])

    const checkForUpdate = async () => {
        codePush.sync(CodePushOptions,
            (syncStatus: any) => {
                switch (syncStatus) {
                    case codePush.SyncStatus.UP_TO_DATE:
                        console.log('codePush.SyncStatus.UP_TO_DATE');
                        setTimeout(() => {
                            setupdateInfo({
                                ...updateInfo,
                                loading: false,
                            });
                        }, 1000);
                        break;
                    case codePush.SyncStatus.UPDATE_INSTALLED:
                        console.log('codePush.SyncStatus.UPDATE_INSTALLED');
                        setTimeout(() => {
                            RNRestart?.Restart()
                        }, 5000);
                        break;
                    case codePush.SyncStatus.UNKNOWN_ERROR:
                        console.log('codePush.SyncStatus.UNKNOWN_ERROR');
                        setTimeout(() => {
                            setupdateInfo({
                                ...updateInfo,
                                loading: false,
                            });
                        }, 1000);
                        break;
                    case codePush.SyncStatus.SYNC_IN_PROGRESS:
                        console.log('codePush.SyncStatus.SYNC_IN_PROGRESS');
                        setTimeout(() => {
                            setupdateInfo({
                                ...updateInfo,
                                loading: true,
                            });
                        }, 1000);
                        break;
                    case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                        console.log('codePush.SyncStatus.CHECKING_FOR_UPDATE');
                        setTimeout(() => {
                            setupdateInfo({
                                ...updateInfo,
                                loading: true,
                            });
                        }, 1000);
                        break;
                    case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                        console.log('codePush.SyncStatus.DOWNLOADING_PACKAGE');
                        setTimeout(() => {
                            setupdateInfo({
                                ...updateInfo,
                                loading: true,
                            });
                        }, 1000);
                        break;
                    case codePush.SyncStatus.INSTALLING_UPDATE:
                        console.log('codePush.SyncStatus.INSTALLING_UPDATE');
                        setTimeout(() => {
                            setupdateInfo({
                                ...updateInfo,
                                loading: false,
                            });
                        }, 1000);
                        break;
                }
            },
            ({ receivedBytes, totalBytes }) => {
                console.log('receivedBytes, totalBytes', receivedBytes, totalBytes);

                setdownloadProgress((receivedBytes / totalBytes) * 100)
            })
            .then((res: any) => {
                console.log('Response of codePush.sync', res);

            })
            .catch((error: any) => {
                console.log('Error of codePush.sync', error);

            })
    }
    return (
        <View style={styles.container}>
            <Image
                source={localImages?.APP_LOGO}
                style={{ width: vw(150), height: vw(150), position: 'absolute' }}
            />
            <LottieView
                resizeMode='contain'
                source={localImages.DOWNLOADING_LOADER}
                autoPlay
                loop
                speed={2}
                style={{ opacity: 0.65 }}
            />
            <View style={{ position: 'absolute', bottom: vh(100) }}>
                <Text style={styles.heading}>We’re updating your app for better experience</Text>
                <Text style={styles.heading}>Please wait...</Text>
                {/* <Text style={styles.heading}>{downloadProgress ?? 0}%</Text> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
        paddingHorizontal: vw(20)
    },
    heading: {
        fontSize: vw(18),
        fontFamily: fonts.BOLD,
        color: 'white',
        textAlign: 'center',
        marginTop: vh(50)
    }
})