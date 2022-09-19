import { normalize } from '@navdeep/utils/dimensions';
import React from 'react';
import { ViewStyle, StyleSheet, StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from '@react-native-community/blur';

interface Props {
    showLoader?: boolean;
    visibleModal: boolean;
    modalStyle?: ViewStyle;
    enableBlur?: boolean;
    renderContent: Function;
    backdropOpacity?: number;
    onBackdropPress?: Function;
}
const RNModal = React.memo(function RNModal({
    renderContent,
    visibleModal,
    onBackdropPress = () => { },
}: Props) {
    return (
        <>
            <Modal
                animationIn="fadeIn"
                animationOut="fadeOut"
                useNativeDriver={true}
                isVisible={visibleModal}
                hideModalContentWhileAnimating={true}
                onBackdropPress={() => onBackdropPress()}
                style={styles.parentContainer}>
                <StatusBar />
                
                {renderContent()}
            </Modal>
        </>
    );
});

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        marginHorizontal: normalize(24),
    },
});

export default RNModal;
