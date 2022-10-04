import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Modal, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@navdeep/components/Header'
import { vh, vw } from '@navdeep/utils/dimensions'
import fonts from '@navdeep/utils/fonts'
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import common from '@navdeep/utils/common'
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux'
import { setLoaderState } from '@navdeep/actions'
import Loader from '@navdeep/components/Loader'

export default function StoryScreen(props: any) {
    const [showModal, setshowModal] = useState<boolean>(false)
    const [storyData, setstoryData] = useState<any>([])
    const { isLoading } = useSelector((state: any) => state?.authReducer);

    useEffect(() => {
        const subscriber = firestore().collection('Story').onSnapshot(
            (QuerySnapshot: any) => {
                console.log('RESPONSE OF QUERY SNAPSHOT : ', QuerySnapshot);
                let arr = QuerySnapshot?._docs?.map((item: any) => ({ url: item?._data?.url ?? '' }))
                setstoryData(arr)
            },
            (error) => {
                console.log('ERROR OF QUERY SNAPSHOT : ', error);
            }
        );
        return () => subscriber();
    }, [])


    const onAddButton = () => {
        setshowModal(true)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
            <Header title={'Story'} props={props} />
            <FlatList
                data={storyData}
                renderItem={({ item }: any) => {
                    return (
                        <StoryCard url={item?.url ?? ''} />
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
            {isLoading ? <Loader /> : null}
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
                    <Image
                        style={{ width: '100%', height: '100%', borderRadius: vw(100) }}
                        source={{ uri: props?.url }}
                    />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const AddStoryModal = (props: any) => {

    const [url, seturl] = useState<any>('')
    const dispatch = useDispatch()

    const onPressTakePhoto = async () => {
        let options: CameraOptions = { mediaType: 'mixed' }
        launchCamera(options, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                //@ts-ignore
                dispatch(setLoaderState(true))
                uploadStoryToFireStore(response?.assets?.[0])
            }
        })

    }

    const onPressChooseFromGallery = () => {
        let options: ImageLibraryOptions = { mediaType: 'mixed' }
        launchImageLibrary(options, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                //@ts-ignore
                dispatch(setLoaderState(true))
                uploadStoryToFireStore(response?.assets?.[0])
            }
        })
    }

    const uploadStoryToFireStore = (image: any) => {
        console.log('SELECTED IMAGE INFORMATION : ', image);
        try {
            //UPLOADING MEDIA TO CLOUD STORAGE
            storage().ref('story/' + image?.fileName ?? 'filename').putFile(image?.uri)
                .then((response: any) => {
                    console.log('RESPONSE AFTER UPLOADING IMAGE ON FIREBASE STORAGE : ', response);
                    //GETTING DOWNLAODABLE URL FROM CLOUD STORAGE
                    storage().ref('story/' + image?.fileName ?? 'filename').getDownloadURL()
                        .then((response: any) => {
                            console.log('URL AFTER FETCHING FROM STORAGE', response);
                            seturl(response)
                            //@ts-ignore
                            dispatch(setLoaderState(false))
                        })
                        .catch((error: any) => {
                            console.log('ERROR OF URL WHILE FETCHING FROM STORAGE', error);
                        })
                })
                .catch((error: any) => {
                    console.log('ERROR WHILE UPLOADING IMAGE ON FIREBASE STORAGE : ', error);
                })
        } catch (error) {
            //@ts-ignore
            dispatch(setLoaderState(false))
            console.log('ERROR OF TRY-CATCH BLOCK', error);
        }
    }

    const onPressUpload = () => {
        if (url) {
            //@ts-ignore
            dispatch(setLoaderState(true))

            // UPLOADING MEDIA URL ON FIRESTORE
            firestore().collection('Story').doc().set({ url })
                .then(() => {
                    common.snackBar('Story uploaded')
                    console.log('MEDIA UPLOADED ON FIRESTORE DB');
                    //@ts-ignore
                    dispatch(setLoaderState(false))
                    seturl('')
                    props?.onRequestClose()
                })
                .catch((error: any) => {
                    //@ts-ignore
                    dispatch(setLoaderState(false))
                    common.snackBar('Error while uploading story')
                    console.log('ERROR WHILE UPLOADING ON FIRESTORE DB', error);
                })
        }
    }

    return (
        <Modal transparent={true} animationType='slide' visible={props?.showModal ?? false}>
            <TouchableOpacity onPress={() => props?.onRequestClose()} style={{ flex: 1 }} activeOpacity={1}>
                <View style={styles.modalBackground}>
                    <View style={styles.horizontalLine} />
                    <View style={styles.contentView}>
                        {
                            url ?
                                <>
                                    <Image
                                        style={{ width: '100%', height: '100%', borderRadius: vw(12) }}
                                        source={{ uri: url }}
                                    />
                                    <TouchableOpacity style={[styles.modalBtn, { position: 'absolute', bottom: vh(10) }]} onPress={onPressUpload}>
                                        <Text style={styles.modalBtnText}>📤 Upload</Text>
                                    </TouchableOpacity>
                                </>
                                :
                                <>
                                    <TouchableOpacity style={styles.modalBtn} onPress={onPressTakePhoto}>
                                        <Text style={styles.modalBtnText}>Take Photo</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalBtn} onPress={onPressChooseFromGallery}>
                                        <Text style={styles.modalBtnText}>Choose from Gallery</Text>
                                    </TouchableOpacity>
                                </>
                        }
                    </View>
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
        height: vh(400),
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        paddingTop: vh(15),
        paddingBottom: vh(35),
        paddingHorizontal: vw(20)
    },
    horizontalLine: {
        borderBottomWidth: vh(5),
        borderColor: 'gray',
        alignSelf: 'center',
        width: vw(45),
        borderRadius: vw(100),
        marginBottom: vh(15)
    },
    modalBtn: {
        paddingVertical: vh(15),
        paddingHorizontal: vw(25),
        backgroundColor: '#29d637',
        borderRadius: vw(50),
        marginVertical: vh(8)
    },
    modalBtnText: {
        fontSize: vw(14),
        fontFamily: fonts.BOLD,
        textAlign: "center",
        color: 'white'
    },
    contentView: {
        width: '100%',
        height: '100%',
        borderWidth: vw(2),
        borderRadius: vw(12),
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
    }
})