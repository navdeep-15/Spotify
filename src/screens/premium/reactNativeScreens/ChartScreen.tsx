import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, ScrollView, Platform } from 'react-native'
import React from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import screenNames from '@navdeep/utils/screenNames'
import localImages from '@navdeep/utils/localImages'
import Header from '@navdeep/components/Header'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from 'recharts'

export default function ChartScreen(props: any) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
            <Header title={'Charts'} props={props} />
            <View>
                <LineChart
                    width={400}
                    height={400}
                    //data={data}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
                    <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
                </LineChart>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})