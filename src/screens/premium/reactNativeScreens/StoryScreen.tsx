import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useState } from 'react'
import Header from '@navdeep/components/Header'
import { vh, vw } from '@navdeep/utils/dimensions'
import fonts from '@navdeep/utils/fonts'
import LinearGradient from 'react-native-linear-gradient';

export default function StoryScreen(props: any) {
    const [showModal, setshowModal] = useState<boolean>(false)

    const onAddButton = () => {
        setshowModal(true)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
            <Header title={'Story'} props={props} />
            <FlatList
                data={[1, 2, 3, 4]}
                renderItem={() => {
                    return (
                        <StoryCard />
                    )
                }}
                keyExtractor={(item: any) => item}
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{ padding: vw(20) }}
                ItemSeparatorComponent={() => {
                    return <View style={{ width: vw(20) }} />
                }}
                style={{ flexGrow: 0 }}
            />
            <TouchableOpacity style={styles.addBtn} onPress={onAddButton}>
                <Text style={styles.addBtnText}>ADD STORY</Text>
            </TouchableOpacity>
            <AddStoryModal
                showModal={showModal}
                props={props}
                onRequestClose={() => setshowModal(false)}
            />
        </SafeAreaView>
    )
}

const StoryCard = (props: any) => {
    return (
        <TouchableOpacity>
            <LinearGradient
                colors={['#fefc75', '#88fa1e', '#29d637', '#238b1d', '#0a690b']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientView}>
                <View style={styles?.storyCard}>

                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const AddStoryModal = (props: any) => {
    return (
        <Modal transparent={true} animationType='slide' visible={props?.showModal ?? false}>
            <TouchableOpacity onPress={() => props?.onRequestClose()} style={{ flex: 1 }} activeOpacity={1}>
                <View style={styles.modalBackground}>
                    <View style={styles.horizontalLine} />
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    addBtn: {
        alignSelf: 'center',
        paddingVertical: vh(15),
        paddingHorizontal: vw(25),
        backgroundColor: 'white',
        borderRadius: vw(50),
        marginVertical: vh(16)
    },
    addBtnText: {
        fontSize: vw(14),
        fontFamily: fonts.BOLD,
        textAlign: "center",
        color: 'black'
    },
    gradientView: {
        width: vw(90),
        height: vw(90),
        borderRadius: vw(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    storyCard: {
        width: vw(84),
        height: vw(84),
        borderRadius: vw(100),
        borderWidth: vw(1),
        borderColor: 'gray',
        backgroundColor: "white"
    },
    modalBackground: {
        borderTopLeftRadius: vw(12),
        borderTopRightRadius: vw(12),
        borderBottomLeftRadius: vw(12),
        borderBottomRightRadius: vw(12),
        height: vh(400),
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        paddingVertical: vh(15),
        paddingHorizontal: vw(20)
    },
    horizontalLine: {
        borderBottomWidth: vh(5),
        borderColor: 'gray',
        alignSelf: 'center',
        width: vw(45),
        borderRadius: vw(100)
    }
})