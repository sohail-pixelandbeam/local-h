
import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput, BackHandler } from 'react-native'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, CrossIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'
import { uploadMultipleFiles } from '../../../../utils/functions';

import { Context } from '../../../../Context/DataContext'
import { storeItem, useForceUpdate } from '../../../../utils/functions'
import Loader from '../../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import HappeningStep from '../../../../common/HappeningStep'
import { urls } from '../../../../utils/Api_urls'
import TipsButton from '../../../../components/TipsButton'




var alertRef;


const Images1 = (props) => {

    const { state, setHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);
    const [media, setMedia] = useState(state?.happeningDraft?.addPhotosOfYourHappening ?? []);
    const forceUpdate = useForceUpdate();





    async function uploadMedia() {
        const res = await uploadMultipleFiles('allFiles');
        console.log(res);
        setMedia(res);
    }

    function next() {

        if (media.length == 0 || media.length < 6) {
            alertRef.alertWithType('error', "Error", "Please upload minimum 6 images");
            return;
        }

        let formData = new FormData();
        for (let key in media) {
            formData.append('file[]', media[key]);
        }

        const obj = {
            ...state.happeningDraft,
            happeningImages: formData
        }
        setHappeningData(obj);
        navigate('Duration1');
        return;

        try {
            setLoading(true);
            let formData = new FormData();
            for (let key in media) {
                formData.append('file[]', media[key]);
            }
            const url = urls.API + "imageUpload"
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'multipart/form-data',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            })
                .then(data => data.json())
                .then(data => {
                    console.log('data----', data);
                    setLoading(false)
                    if (data.status) {
                        const obj = {
                            ...state.happeningDraft,
                            addPhotosOfYourHappening: data?.data
                        }
                        setHappeningData(obj);
                        // navigate('AboutHost');
                        navigate('Duration1');
                    }
                    else {
                        alertRef.alertWithType('error', "Error", data.message);
                    }

                })
                .catch(err => {
                    console.log('err', err)
                    setLoading(false)
                    alertRef.alertWithType('error', "Error", urls.error);
                })
        }
        catch (err) {
            console.log('err', err)
        }


    }




    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"Add media to your happening"}
                desc={"upload photos describing your happening."}
            // headerStyle={{ paddingBottom: 30 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView>

                    <TouchableOpacity
                        onPress={() => uploadMedia()}
                        style={styles.addPicCircle}>
                        <Text style={{ fontSize: 50, color: '#241414', fontFamily: fonts.MRe }}>+</Text>
                    </TouchableOpacity>
                    <Text style={{ fontFamily: fonts.MRe, fontSize: 12, color: '#241414', marginTop: 20, alignSelf: 'center' }}>Upload min of 6 and max of 8 images</Text>


                    <View style={{ width: "85%", alignSelf: 'center', paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: "#F5F5F5", borderRadius: 15, marginTop: 30 }}>
                        {
                            media?.map((v, i) => {
                                return (
                                    <View
                                        key={i}
                                        style={{
                                            width: 48, height: 48, borderRadius: 16, borderWidth: 1, borderColor: '#5B4DBC', backgroundColor: 'white', marginLeft: 10, marginTop: 10
                                        }}>
                                        <Image
                                            style={{ width: "100%", height: "100%", borderRadius: 16, }}
                                            source={{ uri: v.uri }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => {
                                                let arr = media;
                                                let index = media?.indexOf(v)
                                                arr.splice(index, 1)
                                                setMedia(arr)
                                                forceUpdate();

                                            }}
                                            style={{ position: 'absolute', right: -5, top: -10, backgroundColor: 'white', width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                            <CrossIcon />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <Text style={{ fontFamily: fonts.MRe, fontSize: 11, textAlign: 'center', color: '#241414', marginTop: 15, alignSelf: 'center' }}>uploading images might take a while depending{"\n"}on your internet connection. Please stay with us</Text>


                    <TipsButton
                        onPress={() => navigate('Images2')}
                    />
                </ScrollView>

            </View>
            <HappeningStep
                nextText={"Next"}
                onPress={() => next()}
                step={props?.route?.params?.step}
            />

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
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
    },

    agreeBtn: {
        width: "100%", position: 'absolute', bottom: 0, height: 70,
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 30, alignItems: 'center', justifyContent: 'space-between',
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        shadowColor: 'rgba(0, 0, 0, 0.09)',
        shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        elevation: 5
    },

    addPicCircle: {
        alignSelf: 'center', width: 69, height: 69, shadowColor: 'rgba(0, 0, 0, 0.5)', shadowOpacity: 0.5,
        shadowOffset: { width: 8, height: 5 }, elevation: 5,
        shadowRadius: 40, borderRadius: 69 / 2, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center',
        marginTop: 30,
    },

    tipsBtn: {
        width: 91, height: 32, borderRadius: 20, backgroundColor: '#5b4dbc',
        alignItems: 'center', justifyContent: 'center',
        marginTop: 20, alignSelf: 'flex-end'
    },
    topsBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },


})

export default Images1

