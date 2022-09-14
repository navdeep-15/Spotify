import React from 'react'
import { LogBox, StatusBar } from 'react-native'
import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import { store, persistor } from '@navdeep/store';
import { PersistGate } from 'redux-persist/integration/react'
import SplashComponent from '@navdeep/components/SplashComponent';
import Router from '@navdeep/router/Router';

function App() {

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