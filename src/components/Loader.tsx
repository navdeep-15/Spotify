import React from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import localImages from '@navdeep/utils/localImages'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'

const Loader = (props: any) => {
    return (
        <Modal transparent={true} animationType='slide' visible={true}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <View style={{ width: vw(250), height: vh(150) }}>
                        <LottieView
                            resizeMode='contain'
                            source={localImages.LOADER}
                            autoPlay
                            loop
                            style={{ transform: [{ scale: 1.2 }] }}
                        />
                    </View>
                    {/* <Text style={styles.loaderText}>{'Please wait...'}</Text> */}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    activityIndicatorWrapper: {
        alignItems: 'center',
    },
    loaderText: {
        fontSize: vw(20),
        fontFamily: fonts.SEMIBOLD,
        color: 'white',
        marginTop: vh(-20)
    },
});

export default Loader;
