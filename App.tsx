import React, { useEffect, useState } from 'react'
import { LogBox, StatusBar } from 'react-native'
import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import { store, persistor } from '@navdeep/store';
import { PersistGate } from 'redux-persist/integration/react'
import SplashComponent from '@navdeep/components/SplashComponent';
import Router from '@navdeep/router/Router';

function App() {

  const CodePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
    updateDialog: {
      appendReleaseDescription: true,
      title: `a new update is available!`
    }
  }

  useEffect(() => {
    checkForUpdate()
  }, [])

  const checkForUpdate = async () => {
    await codePush.sync(CodePushOptions, (syncStatus: any) => {
      switch (syncStatus) {
        case codePush.SyncStatus.UP_TO_DATE:
          console.log('codePush.SyncStatus.UP_TO_DATE');
          break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
          console.log('codePush.SyncStatus.UPDATE_INSTALLED');
          break;
        case codePush.SyncStatus.UNKNOWN_ERROR:
          console.log('codePush.SyncStatus.UNKNOWN_ERROR');
          break;
        case codePush.SyncStatus.SYNC_IN_PROGRESS:
          console.log('codePush.SyncStatus.SYNC_IN_PROGRESS');
          break;
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          console.log('codePush.SyncStatus.CHECKING_FOR_UPDATE');
          break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          console.log('codePush.SyncStatus.DOWNLOADING_PACKAGE');
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          console.log('codePush.SyncStatus.INSTALLING_UPDATE');
          break;
      }
    })
  }

  LogBox.ignoreAllLogs(true)

  return (
    <Provider store={store}>
      <PersistGate loading={<SplashComponent />} persistor={persistor}>
        <StatusBar backgroundColor="#121212" barStyle="light-content" translucent={true} />
        <Router />
      </PersistGate>
    </Provider>
  )
}

export default codePush(App)