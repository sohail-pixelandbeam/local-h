// CC STANDS FOR CODE OF CONDUCT

import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput, PermissionsAndroid, Alert, BackHandler } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import HappeningStep from '../../../../common/HappeningStep'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'
import { Context } from '../../../../Context/DataContext'
import { apiRequest } from '../../../../utils/apiCalls'
import { urls } from '../../../../utils/Api_urls'
import { retrieveItem, useForceUpdate } from '../../../../utils/functions'
import Loader from '../../../../utils/Loader'

import Geolocation from '@react-native-community/geolocation';


var alertRef;

const TermsAndLaws = (props) => {


    const forceUpdate = useForceUpdate();
    const { state, setHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);

    const [language, setLanguage] = useState('English');
    const [selectedLanguages, setSelectedLanguages] = useState(['No offense and criminal activities or effecting beliefs'])

    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    const languages = [
        "No offense and criminal activities or effecting beliefs",
        "No offense and criminal activities or effecting beliefs",
        "No offense and criminal activities or effecting beliefs",
        "No offense and criminal activities or effecting beliefs",
        "No offense and criminal activities or effecting beliefs",
        "No offense and criminal activities or effecting beliefs",
        "No offense and criminal activities or effecting beliefs",
        "No offense and criminal activities or effecting beliefs",
    ];


    


    function addRemoveTermsLaws(v) {

        var arr = selectedLanguages;
        if (arr.includes(v)) {
            let foundIndex = arr.indexOf(v);
            arr.splice(foundIndex, 1);
        }
        else {
            arr.push(v);
        }
        setSelectedLanguages(arr);
        forceUpdate();


    }

    function next() {
        doSubmitHappening();
    }

    async function doSubmitHappening() {

        setLoading(true);
        // reqObj.happeningTypeOnlineOrOffline.happeningOnline = Object.assign({}, state.happeningDraft)


        const loginData = await retrieveItem('login_data');
        const profileData = await retrieveItem('profile_data');

        // const date = new Date();
        console.log('profileData', profileData);
        let reqObj = Object.assign({}, state.locationHappeningDraft);
        reqObj.AgreeAndContinue = true;
        // reqObj.UserId = loginData?._id;
        // reqObj.userProfileId = profileData?._id;
        reqObj.happeningOnLocation = true;
        reqObj.happeningAccessibility = "nothing";
        reqObj.fellowMustComeAlone = true;
        // reqObj.daysOfWeek = null;
        // console.log(reqObj.daysOfWeek);

        apiRequest(reqObj, 'createHappeningOnLocation')
            .then(data => {
                setLoading(false)
                console.log('data-------asd', data)
                if (data.status) {
                    navigate('SuccessfullySubmitted');
                }
                else alertRef.alertWithType('error', 'Error', data.message);
                console.log(data)
            })
            .catch(erro => {
                setLoading(false)
                console.log(erro)
            })
        return;

    }






    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />

            <HappeningHeader
                heading={"Terms and\nLocal Laws"}
                desc={"Tell fellows about yourself."}
            // headerStyle={{ paddingBottom: 30 }}
            />
            {loading && <Loader />}
            <View style={styles.contentContainer}>

                <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
                    <View style={{
                        elevation: 2, backgroundColor: 'white', borderTopRightRadius: 10, borderTopLeftRadius: 10, padding: 15,
                        shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
                        marginBottom: 10, paddingBottom: 25
                    }}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 350 }} >
                            {
                                languages.map((v, i) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => addRemoveTermsLaws(v)}
                                            style={styles.themePickerContainer}>
                                            <View style={styles.languagePickerCircle}>
                                                {selectedLanguages.includes(v) && <TickIcon color={"#5B4DBC"} width={15} height={12} />}
                                            </View>
                                            <View style={{ width: "80%" }}>
                                                <Text style={[styles.themeText, { marginLeft: 20 }]}>{v}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>

            </View>
            <HappeningStep
                nextText={"Next"}
                onPress={() => next()}
                step={props?.route?.params?.step}
            />
            <DropdownAlert ref={(ref) => alertRef = ref} />


        </View >
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
    title: {
        fontFamily: fonts.MBo, fontSize: 9, color: '#2A2A2A', lineHeight: 15,
    },
    text: {
        color: '#5D5760', fontFamily: fonts.PMe, fontSize: 12
    },
    headingText: {
        color: '#5D5760', fontFamily: fonts.PBo, fontSize: 12
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
    radioUnSelected: {
        width: 15.92, height: 15.92, borderRadius: 15.92 / 2, borderWidth: 1, borderColor: '#35208E',

    },
    radioSelected: {
        width: 15.92, height: 15.92, borderRadius: 15.92 / 2, backgroundColor: '#35208E', alignItems: 'center', justifyContent: 'center'
    },
    pointsView: {
        flexDirection: 'row', alignItems: 'center', marginTop: 10

    },
    themePickerContainer: {
        flexDirection: 'row', alignItems: 'center', marginTop: 18,
        // shadowColor: 'rgba(0, 0, 0, 0.09)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        elevation: 2
    },
    themeText: {
        fontSize: 12, color: "#2a2a2a", fontFamily: fonts.MBo, letterSpacing: 0.18, lineHeight: 20
    },
    languagePickerCircle: {
        width: 37, height: 37, borderRadius: 37 / 2,
        shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', elevation: 5
    },
    subData: {
        fontFamily: fonts.MRe, color: '#828282', fontSize: 8
    },
    tipsBtn: {
        width: 91, height: 32, borderRadius: 20, backgroundColor: '#5b4dbc',
        alignItems: 'center', justifyContent: 'center',
    },
    topsBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },


})

export default TermsAndLaws




