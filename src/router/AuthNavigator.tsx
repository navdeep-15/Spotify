import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@navdeep/utils/screenNames';
import Login from '@navdeep/screens/auth/LoginScreen';
import Signup from '@navdeep/screens/auth/SignupScreen';
import LoginOptionsScreen from '@navdeep/screens/auth/LoginOptionsScreen';
import PhoneNumberLoginScreen from '@navdeep/screens/auth/PhoneNumberLoginScreen';
import OtpScreen from '@navdeep/screens/auth/OtpScreen';

const Stack = createNativeStackNavigator()

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={screenNames?.LOGIN_OPTIONS_SCREEN} component={LoginOptionsScreen} />
            <Stack.Screen name={screenNames?.LOGIN_SCREEN} component={Login} />
            <Stack.Screen name={screenNames?.PHONE_NUMBER_LOGIN_SCREEN} component={PhoneNumberLoginScreen} />
            <Stack.Screen name={screenNames?.OTP_SCREEN} component={OtpScreen} />
            <Stack.Screen name={screenNames?.SIGNUP_SCREEN} component={Signup} />
        </Stack.Navigator>
    )
}