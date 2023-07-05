
import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput, BackHandler } from 'react-native'
import { navigate } from '../../../../Navigations'
import HappeningHeader from '../../../common/HappeningHeader'
import { ArrowForward, BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, WELFAREICON } from '../../../components/Svgs'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'


import { Context } from '../../../Context/DataContext'
import { storeItem, useForceUpdate } from '../../../utils/functions'
import Loader from '../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import HappeningStep from '../../../common/HappeningStep'
import GeneralStatusBar from '../../../components/GernalStatusBar'
import AlertPopup from '../../../common/AlertPopup'


var alertRef;

const EditHappening = (props) => {

    const { state, setHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);
    const [makeYouBest, setMakesYouBest] = useState('');
    const [titleWords, setTitleWords] = useState(0);
    console.log('props.route.params===', props.route.params)

    const settings = [
        { name: "Title", navigateTo: 'EditTitle' },
        { name: "Description", navigateTo: 'EditDescription' },
        { name: "Photos", navigateTo: 'EditPhotos' },
        { name: "Facilities", navigateTo: 'EditFacilities' },
        { name: "Skills Required", navigateTo: 'EditSkills' },
        { name: "What will Fellows get", navigateTo: 'EditFellowsGetBack' },
        { name: "Duration ", navigateTo: 'EditDuration' },
        { name: "Max People ", navigateTo: 'EditHappeningGroup' },
        // { name: "About you ", navigateTo: 'NotificationSettings' },
    ];
    if (props.route.params?.happeningOnline) {
        delete settings[3];
    }


    const SettingsTab = () => (
        <View style={{ backgroundColor: '#F8F8F8', width: "100%", borderRadius: 20, paddingTop: 20, paddingHorizontal: 10, height: "100%", marginTop: 30 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
                <View style={{ width: "90%", alignSelf: 'center' }}>
                    {
                        settings.map((v, i) => {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => navigate(v.navigateTo, props.route.params)}
                                    style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>{v.name}</Text>
                                    <ArrowForward />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    );


    function next() {

        if (titleWords < 75 || titleWords > 150) {
            alertRef.alertWithType('error', "Error", "Please enter a description between 100-300 words");
            return;
        }
        const obj = {
            ...state.happeningDraft,
            whatMakesYouIdealTohostThisHappening: makeYouBest
        }
        setHappeningData(obj);
        navigate('Duration1')
    }


    function getTitleWordsCount(text) {
        if (text == "") {
            setTitleWords(0)
            return;
        }
        let count = text.trim().split(/\s+/).length
        setTitleWords(count)
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <GeneralStatusBar />
            <HappeningHeader
                heading={"What do you\nwant to Edit"}
            // desc={"Tell fellows about yourself."}
            // headerStyle={{ paddingBottom: 30 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView>
                    <SettingsTab />
                </ScrollView>

            </View>
            <HappeningStep
                nextText={"Next"}
                onPress={() => next()}
                showStep={false}
                next={false}
            // step={props?.route?.params?.step}
            />

            <AlertPopup ref={(ref) => alertRef = ref} />

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
    tipsBtn: {
        width: 91, height: 32, borderRadius: 20, backgroundColor: '#5b4dbc',
        alignItems: 'center', justifyContent: 'center',
        marginTop: 20, alignSelf: 'flex-end'
    },
    topsBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },


})

export default EditHappening

