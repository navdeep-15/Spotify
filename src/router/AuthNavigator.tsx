import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@navdeep/utils/screenNames';
import Login from '@navdeep/screens/auth/LoginScreen';
import Signup from '@navdeep/screens/auth/SignupScreen';

const Stack = createNativeStackNavigator()

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={screenNames?.LOGIN_SCREEN} component={Login} />
            <Stack.Screen name={screenNames?.SIGNUP_SCREEN} component={Signup} />
        </Stack.Navigator>
    )
}