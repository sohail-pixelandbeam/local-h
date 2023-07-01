// CC STANDS FOR CODE OF CONDUCT

import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput, BackHandler } from 'react-native'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, DrinksIcon, FoodIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, PIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, ToiletIcon, WELFAREICON, WifiIcon } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'

import { Context } from '../../../../Context/DataContext'
import { storeItem, useForceUpdate } from '../../../../utils/functions'
import Loader from '../../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import HappeningStep from '../../../../common/HappeningStep'


var alertRef;
const BitMore = (props) => {


    const forceUpdate = useForceUpdate();

    const { state, setHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);
    const [communicateWithUs, setCommunicateWithUs] = useState('')
    const [needToBring, setNeedToBring] = useState('');
    const [onlineMeetingLink, setOnlineMeetingLink] = useState('');



    // React.useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', function () {
    //         return true;
    //     })
    // }, []);


    function next() {

        if (communicateWithUs == "") {
            alertRef.alertWithType('error', "Error", "Please enter `How will you communicate with fellows` ")
            return;
        }
        if (needToBring == "") {
            alertRef.alertWithType('error', "Error", "Please enter `What fellows need to bring` ")
            return;
        }
        // if (onlineMeetingLink == "") {
        //     alertRef.alertWithType('error', "Error", "Please enter meeting link ")
        //     return;
        // }
        const obj = {
            ...state.happeningDraft,
            howWillYouCommunicateWithFellows: communicateWithUs,
            whatDoTheFellowsNeedToBringToJoinThisOnlineHappening: needToBring,
            onlineMeetingLink
        }
        setHappeningData(obj);
        navigate('HappeningTheme');

    }



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"Tell us a bit more"}
            // desc={"What will you priovide by the end of the happening"}
            // headerStyle={{ paddingBottom: 30 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView contentContainerStyle={{ paddingBottom: 150 }} >
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
                        <Text style={{ marginTop: 20, fontFamily: fonts.MBo, color: '#2A2A2A', fontSize: 12 }}>How will you communicate with fellows?</Text>
                        <TextInput
                            placeholder=''
                            onChangeText={setCommunicateWithUs}
                            placeholderTextColor={"#A5A2A2"}
                            textAlignVertical="top"
                            multiline={true}
                            style={[styles.shadow, {
                                width: "100%", height: 55, borderRadius: 10, paddingTop: 10,
                                fontSize: 12, color: "#A5A2A2", fontFamily: fonts.MRe, paddingHorizontal: 10,
                                marginTop: 10
                            }]}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
                            <Text style={{ fontFamily: fonts.MBo, color: '#2A2A2A', fontSize: 12 }}>Meeting Link</Text>
                            <Text style={{ fontFamily: fonts.MRe, color: '#2A2A2A', fontSize: 12 }}>(Optional) </Text>
                        </View>
                        <TextInput
                            placeholder=''
                            onChangeText={setOnlineMeetingLink}
                            placeholderTextColor={"#A5A2A2"}
                            textAlignVertical="top"
                            multiline={true}
                            style={[styles.shadow, {
                                width: "100%", height: 55, borderRadius: 10, paddingTop: 10,
                                fontSize: 12, color: "#A5A2A2", fontFamily: fonts.MRe, paddingHorizontal: 10,
                                marginTop: 10
                            }]}
                        />
                        <Text style={{ marginTop: 20, fontFamily: fonts.MBo, color: '#2A2A2A', fontSize: 12 }}>What do the fellows need to bring to join this online happening</Text>
                        <TextInput
                            placeholder='Eg: Calculator for math, Dictionary '
                            onChangeText={setNeedToBring}
                            placeholderTextColor={"#A5A2A2"}
                            textAlignVertical="top"
                            multiline={true}
                            style={[styles.shadow, {
                                width: "100%", height: 125, borderRadius: 10,
                                fontSize: 12, color: "#A5A2A2", fontFamily: fonts.MRe, paddingHorizontal: 10,
                                marginTop: 10
                            }]}
                        />


                    </View>

                </ScrollView>

            </View>
            <HappeningStep
                nextText={"Next"}
                onPress={() => next()}
                step={props?.route?.params?.step}
            />
            {/* <TouchableOpacity
                onPress={() => next()}
                activeOpacity={0.9}
                style={styles.agreeBtn}>
                <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Step 1/15</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Next</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </View>
            </TouchableOpacity> */}
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
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14,
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        elevation: 2
    },
    themeText: {
        fontSize: 12, color: "#2a2a2a", fontFamily: fonts.MBo, letterSpacing: 0.18,
    },
    languagePickerCircle: {
        width: 37, height: 37, borderRadius: 37 / 2,
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', elevation: 5
    },
    subData: {
        fontFamily: fonts.MRe, color: '#828282', fontSize: 8
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.4)', shadowOffset: { width: 0.5, height: 0.5 }, shadowRadius: 1, shadowOpacity: 0.4, elevation: 2,
        backgroundColor: 'white'
    },


})

export default BitMore

