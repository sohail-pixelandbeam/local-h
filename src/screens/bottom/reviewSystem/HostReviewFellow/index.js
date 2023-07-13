import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, BackHandler, TextInput } from 'react-native'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'
import { NextIcon } from '../../../../components/Svgs'
import { AirbnbRating } from 'react-native-ratings'
import { getHeight, uploadMultipleFiles } from '../../../../utils/functions'
import Label from '../../../../components/verificationComponents/Label'
import AlertPopup from '../../../../common/AlertPopup'
import { apiFormDataRequest, apiRequest } from '../../../../utils/apiCalls'
import Loader from '../../../../utils/Loader'




let alertRef;

export default function HostReviewFellow({ route }) {


    const params = route.params;
    const [selectedRating, setSelectedRating] = useState(3);
    const [reviewText,setReviewText] = useState('');
    const [selectedPics, setSelectedPics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imgs, setImgs] = useState([1, 2, 3, 4, 5, 6, 7, 8])

    const ratingOptions = ['Disappointed', 'Not Bad', 'Good', 'Lovely', 'Super Lovely'];
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


    const doReview = (images) => {


        const body = {
            happeningId: params?._id,
            fellowId: params?.fellowId,
            rating_experience_count_no: selectedRating,
            write_a_public_review: reviewText,
            Add_your_Memories_to_the_Review: images
        }
        console.log('boduy',body);
        setLoading(true)
        apiRequest(body, 'rating-and-review/host-review-a-fellow')
        .then(data=>{
            setLoading(false)
            console.log('data___',data);
            if(data.status){
                alertRef.alertWithType('success','Success',data.message);
                navigate('Profilee')
            }
        })
        .catch(err=>{
            setLoading(false);
        })

    }


    const savePhotos = () => {
        if(reviewText.length < 3){
            alertRef.alertWithType('error','Error','Please enter a valid review');
            return;
        }
        if (selectedPics.length > 1) {
            const images = [
                "https://localhappinez-photo-bucket.s3.eu-central-1.amazonaws.com/LHDevelopment/939817622098166E506A20.jpg",
                 "https://localhappinez-photo-bucket.s3.eu-central-1.amazonaws.com/LHDevelopment/180238586049030E733E41.jpg"
            ];
            doReview(images);
            return;
            setLoading(true)
            apiFormDataRequest(selectedPics, 'imageUpload')
                .then(data => {
                    if (data.status) {
                        doReview(data.data);
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

// useEffect(()=>{
//     setLoading(false)
// })


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.theme2}
                barStyle={"light-content"}
            />
            <HappeningHeader
            titleStyle={{fontSize:24}}
                heading={"How was your Experience with the Fellow? "}
                headerStyle={{ height: 200, justifyContent: 'flex-end', paddingBottom: 30, backgroundColor: acolors.theme2 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView>
                    <View style={{ width: '90%', alignSelf: 'center' }}>
                        <View style={{ marginTop: 10 }} >
                            <AirbnbRating
                                selectedColor='#5B4DBC'
                                unSelectedColor='#CECAEB'
                                size={20}
                                starContainerStyle={{ flexDirection: 'row', width: 150, justifyContent: 'space-between',alignSelf:'flex-start' }}
                                reviews={ratingOptions}
                                onFinishRating={(index) => setSelectedRating(index)}
                                showRating={false}
                            />

                        </View>
                        <TextInput
                            onChangeText={setReviewText}
                            placeholder='Write a public review'
                            style={{ width: "100%", borderWidth: 0.5, borderColor: '#222222', height: 120, borderRadius: 10, marginTop: getHeight(2), paddingHorizontal: 10, paddingTop: 10 }}
                            multiline={true}
                            textAlignVertical='top'
                            placeholderTextColor={acolors.grey}
                        />
                        <Text style={{ fontFamily: fonts.PMe, fontSize: 18, color: '#222222', marginTop: getHeight(2) }}>Add your Memories to the Review </Text>
                        <View style={styles.imgUploadBox}>
                            <TouchableOpacity onPress={selectMultiplePictures} style={styles.plus}>
                                <Image source={require('../../../../components/verificationComponents/assets/img/+.png')} />
                            </TouchableOpacity>
                            <Label style={{ fontSize: 10 }}>Upload</Label>
                        </View>

                        <View style={styles.imgsBox}>
                          

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
                    onPress={() => savePhotos()}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Next</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>
            
{loading && <Loader/>}
            <AlertPopup ref={(ref) => alertRef = ref} />
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#FDFDFD', flex: 1,
        width: "100%", borderTopRightRadius: 30, borderTopLeftRadius: 30,
        marginTop: -30, paddingTop: 20, paddingHorizontal: 25,
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
    bullet: {
        width: 5, height: 1, backgroundColor: '#222222',
    },
    pointsView: {
        flexDirection: 'row', alignItems: 'center', marginTop: 10
    },
    imgUploadBox: {
        alignItems: 'center',
        paddingTop: 20,
        // backgroundColor:'#fcfcfc',
        // width:100,height:100,borderRadius:150/2,justifyContent:'center',alignSelf:'center'

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

