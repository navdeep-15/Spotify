import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useState } from 'react'
import Header from '@navdeep/components/Header'
import { vh, vw } from '@navdeep/utils/dimensions'
import fonts from '@navdeep/utils/fonts'
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

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

    const onPressTakePhoto = async () => {
        let options: CameraOptions = {
            mediaType: 'mixed'
        }
        launchCamera(options, async (response: any) => {
            console.log('Response of image camera= ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                try {
                    let reference=await storage().ref('story/'+response?.assets?.[0]?.fileName ?? 'filename')
                    if(reference){
                        reference.putFile(response?.assets?.[0]?.uri)
                    }
                    // await storage().ref('story/'+response?.assets?.[0]?.fileName ?? 'filename').getDownloadURL().then((url)=>{
                    //     console.log('downloaded url-->>',url);
                        
                    // })
                } catch (error) {
                    console.log(error);

                }
            }
        })

    }

    const onPressChooseFromGallery = () => {
        let options: ImageLibraryOptions = {
            mediaType: 'mixed'
        }
        launchImageLibrary(options, (response: any) => {
            console.log('Response of image gallery= ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
            }
        })
    }

    return (
        <Modal transparent={true} animationType='slide' visible={props?.showModal ?? false}>
            <TouchableOpacity onPress={() => props?.onRequestClose()} style={{ flex: 1 }} activeOpacity={1}>
                <View style={styles.modalBackground}>
                    <View style={styles.horizontalLine} />
                    <TouchableOpacity style={styles.modalBtn} onPress={onPressTakePhoto}>
                        <Text style={styles.modalBtnText}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalBtn} onPress={onPressChooseFromGallery}>
                        <Text style={styles.modalBtnText}>Choose from Gallery</Text>
                    </TouchableOpacity>
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
        borderRadius: vw(100),
        marginBottom: vh(10)
    },
    modalBtn: {
        alignSelf: 'center',
        paddingVertical: vh(15),
        paddingHorizontal: vw(25),
        backgroundColor: '#29d637',
        borderRadius: vw(50),
        marginBottom: vh(8)
    },
    modalBtnText: {
        fontSize: vw(14),
        fontFamily: fonts.BOLD,
        textAlign: "center",
        color: 'white'
    },
})