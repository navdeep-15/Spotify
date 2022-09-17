import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, ScrollView, Platform } from 'react-native'
import React from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import screenNames from '@navdeep/utils/screenNames'
import localImages from '@navdeep/utils/localImages'
import Header from '@navdeep/components/Header'
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title } from 'chart.js';

// ChartJS.register(LineElement, PointElement, LinearScale, Title);

const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "First dataset",
            data: [33, 53, 85, 41, 44, 65],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
        },
        {
            label: "Second dataset",
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            borderColor: "#742774",
            borderWidth: 1,
        }
    ]
};

export default function ChartScreen(props: any) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
            <Header title={'Charts'} props={props} />
            {/* <View style={{ backgroundColor: 'pink', width: '100%', height: '80%' }}> */}
            {/* <Line data={data} /> */}
            {/* </View> */}
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

})