import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, BackHandler } from 'react-native'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'
import { NextIcon } from '../../../../components/Svgs'
import Label from '../../../../components/verificationComponents/Label'
import DocumentPicker from 'react-native-document-picker';
import DropdownAlert from 'react-native-dropdownalert';
import { apiFormDataRequest } from '../../../../utils/apiCalls'
import Loader from '../../../../utils/Loader'
import { uploadMultipleFiles } from '../../../../utils/functions'
var alertRef;



export default function EditReviewStep4({ route }) {
    const payload = route.params;

    const [selectedPics, setSelectedPics] = useState([]);
    let [imgs, setImgs] = useState([1, 2, 3, 4, 5, 6, 7, 8])
    const [loading, setLoading] = useState(false);
    const MAX_PHOTOS = 8;



    async function selectMultiplePictures() {
        const res = await uploadMultipleFiles('allFiles');
        let arr = [];
        for (let key in res) {
            arr.push(res[key])
        }
        setSelectedPics(arr);
        // forceUpdate();
    }


    // const selectMultiplePictures = async () => {
    //     try {
    //         const results = await DocumentPicker.pickMultiple({
    //             type: [DocumentPicker.types.images],
    //         });

    //         let updatedPics = [...selectedPics]; // Create a copy of the existing selected pictures

    //         // Add the newly picked pictures to the updatedPics array
    //         updatedPics = updatedPics.concat(results);

    //         // Limit the selection to a maximum of 8 pictures
    //         if (updatedPics.length > MAX_PHOTOS) {
    //             updatedPics = updatedPics.slice(0, MAX_PHOTOS);
    //             alertRef.alertWithType('warn', "Warning", 'Maximum limit of 8 photos reached');

    //         }

    //         // Update the selectedPics state with the updated array
    //         setSelectedPics(updatedPics);

    //         // Do something with the updatedPics array
    //     } catch (error) {
    //         // Handle any error that occurred during document picking
    //         console.log(error);
    //         alertRef.alertWithType('error', "Error", 'Sorry, Failed to upload photos.');
    //     }
    // };

    const savePhotos = () => {
        if (selectedPics.length > 1) {
            setLoading(true)
            apiFormDataRequest(selectedPics, 'imageUpload')
                .then(data => {
                    if (data.status) {
                        console.log('this is daa ',data.data)
                        setLoading(false)
                        payload.Add_your_Memories_to_the_Review = data.data;
                        navigate('ReviewStep5', payload)

                    }
                    else {
                        alertRef.alertWithType("error", "Error", "Server Error");
                        setLoading(false);
                    }
                })
                .catch(err => {
                    setLoading(false)
                    alertRef.alertWithType("error", "Error", "Network Error");
                })


        } else {
            alertRef.alertWithType('error', "Error", 'Minimum 2 photos are required.');

        }
    }




    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.theme2}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"Add your \nMemories to the \nReview "}
                headerStyle={{ height: 250, justifyContent: 'flex-end', paddingBottom: 30, backgroundColor: acolors.theme2 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView>
                    <View style={{ width: '95%', alignSelf: 'center', }}>

                        <View style={styles.imgUploadBox}>
                            <TouchableOpacity onPress={selectMultiplePictures} style={styles.plus}>
                                <Image source={require('../../../../components/verificationComponents/assets/img/+.png')} />
                            </TouchableOpacity>
                            <Label style={{ fontSize: 10 }}>Upload</Label>
                        </View>

                        <View style={styles.imgsBox}>
                            {
                                !selectedPics.length && imgs.map((e, i) => {
                                    return (
                                        <View key={i} style={styles.imgBox} >
                                            {selectedPics[i] && <Image source={{ uri: selectedPics[i].uri }} style={styles.imgStyle} />}
                                        </View>
                                    )
                                })
                            }

                            {
                                selectedPics?.map((v, i) => {
                                    console.log('v', v)
                                    return (
                                        <View key={i} style={styles.imgBox} >
                                            <Image
                                                source={{ uri: v.uri }} style={styles.imgStyle} />
                                        </View>
                                    )
                                })
                            }
                        </View>

                    </View>
                </ScrollView>


            </View>


            <View style={styles.agreeBtn} >
                <TouchableOpacity
                    onPress={savePhotos}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Next</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>
            <DropdownAlert ref={(ref) => alertRef = ref} />

            {loading && <Loader />}
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#FDFDFD',
        width: "100%", borderTopRightRadius: 30, borderTopLeftRadius: 30,
        marginTop: -30, paddingTop: 20, paddingHorizontal: 25
    },
    content: {
        width: "100%", paddingHorizontal: 10, paddingVertical: 15, alignItems: 'center',
        backgroundColor: '#FFFFFF', elevation: 2, marginTop: 15, borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.09)',
        shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
    },
    text: {
        color: '#5D5760', fontFamily: fonts.PMe, fontSize: 13
    },
    textBold: {
        color: '#5D5760', fontFamily: fonts.PMe, fontSize: 12, borderBottomColor: 'black', borderBottomWidth: 1, fontWeight: 'bold'
    },
    agreeBtn: {
        width: "100%", position: 'absolute', bottom: 0, height: 70,
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 50, alignItems: 'center', justifyContent: 'flex-end',
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        elevation: 5
    },
    imgUploadBox: {
        alignItems: 'center',
        paddingTop: 20,
    },
    plus: {
        backgroundColor: 'white',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.16,
        shadowRadius: 1.51,
        elevation: 2,
    },
    imgsBox: {
        width: '100%',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
    },
    imgBox: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        margin: 8,
        borderColor: acolors.primary,
        borderWidth: 1,
        borderRadius: 15,
        overflow: 'hidden'
    },
    imgStyle: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'white',
        // borderColor: acolors.primary,
        // borderWidth: 1,
        // borderRadius: 15
    }



})

