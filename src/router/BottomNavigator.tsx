import { StyleSheet, Text, Image, BackHandler, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import screenNames from '@navdeep/utils/screenNames';
import { vw, vh } from '@navdeep/utils/dimensions';
import localImages from '@navdeep/utils/localImages';
import fonts from '@navdeep/utils/fonts';
import LinearGradient from 'react-native-linear-gradient';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';
import LibraryNavigator from './LibraryNavigator';
import PremiumNavigator from './PremiumNavigator';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold On', 'Are you sure you want to exit', [
                { text: "No", onPress: () => null, style: "cancel" },
                { text: 'Yes', onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                lazy: true,
                tabBarBackground: () => {
                    return (
                        <LinearGradient
                            colors={['transparent','#121212']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 0.25 }}
                            style={{ flex: 1 }}
                        />
                    )
                },
                tabBarAllowFontScaling: true,
                tabBarHideOnKeyboard: true,
            }}>
            <Tab.Screen
                name={screenNames?.HOME_NAVIGATOR}
                component={HomeNavigator}
                options={{
                    tabBarStyle: styles.tabStyle,
                    tabBarLabel: ({ focused }) => <Text style={focused ? { ...styles.tabBarLabelStyle, fontFamily: fonts.EXTRA_BOLD, color: 'white' } : styles.tabBarLabelStyle}>Home</Text>,
                    tabBarIcon: ({ focused }) => <Image style={!focused ? styles.tabBarIcon : { ...styles.tabBarIcon, tintColor: 'white' }} source={focused ? localImages.HOME_FOCUSED : localImages.HOME_UNFOCUSED} />
                }}
            />
            <Tab.Screen
                name={screenNames?.SEARCH_NAVIGATOR}
                component={SearchNavigator}
                options={{
                    tabBarStyle: styles.tabStyle,
                    tabBarLabel: ({ focused }) => <Text style={focused ? { ...styles.tabBarLabelStyle, fontFamily: fonts.EXTRA_BOLD, color: 'white' } : styles.tabBarLabelStyle}>Search</Text>,
                    tabBarIcon: ({ focused }) => <Image style={!focused ? styles.tabBarIcon : { ...styles.tabBarIcon, tintColor: 'white' }} source={focused ? localImages.SEARCH_FOCUSED : localImages.SEARCH_UNFOCUSED} />
                }}
            />
            <Tab.Screen
                name={screenNames?.LIBRARY_NAVIGATOR}
                component={LibraryNavigator}
                options={{
                    tabBarStyle: styles.tabStyle,
                    tabBarLabel: ({ focused }) => <Text style={focused ? { ...styles.tabBarLabelStyle, fontFamily: fonts.EXTRA_BOLD, color: 'white' } : styles.tabBarLabelStyle}>Your Library</Text>,
                    tabBarIcon: ({ focused }) => <Image style={!focused ? styles.tabBarIcon : { ...styles.tabBarIcon, tintColor: 'white' }} source={focused ? localImages.LIBRARY_FOCUSED : localImages.LIBRARY_UNFOCUSED} />
                }}
            />
            <Tab.Screen
                name={screenNames?.PREMIUM_NAVIGATOR}
                component={PremiumNavigator}
                options={{
                    tabBarStyle: styles.tabStyle,
                    tabBarLabel: ({ focused }) => <Text style={focused ? { ...styles.tabBarLabelStyle, fontFamily: fonts.EXTRA_BOLD, color: 'white' } : styles.tabBarLabelStyle}>Premium</Text>,
                    tabBarIcon: ({ focused }) => <Image style={!focused ? styles.tabBarIcon : { ...styles.tabBarIcon, tintColor: 'white' }} source={focused ? localImages.PREMIUM : localImages.PREMIUM} />
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBarLabelStyle: {
        fontSize: vw(12),
        fontFamily: fonts.SEMIBOLD,
        color: '#cbcbcb'
    },
    tabBarIcon: {
        width: vw(24),
        height: vw(24),
        tintColor: '#cbcbcb',
        marginBottom:vh(5)
    },
    tabStyle: {
        height: vh(60),
        paddingBottom: vh(15),
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'transparent',
        borderTopWidth: 0,
        position: 'absolute',
        elevation: 0
    }
})