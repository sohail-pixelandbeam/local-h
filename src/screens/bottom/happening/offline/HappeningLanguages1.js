// CC STANDS FOR CODE OF CONDUCT

import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput, BackHandler } from 'react-native'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'

import { Context } from '../../../../Context/DataContext'
import { getHOLPreviousScreen, storeItem, useForceUpdate } from '../../../../utils/functions'
import Loader from '../../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import HappeningStep from '../../../../common/HappeningStep'
import AlertPopup from '../../../../common/AlertPopup'


var alertRef;

const HappeningLanguages1 = (props) => {


    const forceUpdate = useForceUpdate();
    const { state, setLocationHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState('English');
    const [selectedLanguages, setSelectedLanguages] = useState(['English'])

    const [languages, setLanguages] = useState(state?.happeningSubmissionData?.languages);
    const [languagesTemp, setLanguageTemp] = useState(state?.happeningSubmissionData?.languages);

    // React.useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', function () {
    //         return true;
    //     })
    // }, []);


    function addRemoveLanguage(v) {

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

        if (selectedLanguages.length == 0) {
            alertRef.alertWithType('error', "Error", "Please select language");
            return;
        }

        const obj = {
            ...state.locationHappeningDraft,
            languageForYourHappening: selectedLanguages
        }
        setLocationHappeningData(obj);
        navigate('HappeningSkills')
        // navigate('Description1')
    }



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"languages for your happening?"}
                desc={"Select the language spoken at your language"}
            // headerStyle={{ paddingBottom: 30 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView>

                    <TextInput
                        placeholder='Search for a language'
                        placeholderTextColor={"#7b7b7b"}
                        style={{
                            width: "100%", height: 62, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                            fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10,
                        }}
                        onChangeText={(v) => {
                            let lanArr = Object.values(languagesTemp);

                            let filter = lanArr.filter((item) => {
                                return (
                                    item.toLocaleLowerCase().indexOf(v.toLocaleLowerCase()) == 0
                                )
                            })
                            setLanguages(filter)
                        }}
                    />
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
                        <View style={{
                            elevation: 2, backgroundColor: 'white', borderTopRightRadius: 10, borderTopLeftRadius: 10, padding: 15,
                            shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
                            marginBottom: 10, paddingBottom: 25
                        }}>
                            {
                                Object.values(languages).map((v, i) => {
                                    return (
                                        <TouchableOpacity
                                            key={i}
                                            onPress={() => addRemoveLanguage(v)}
                                            style={styles.themePickerContainer}>
                                            <View>
                                                <Text style={styles.themeText}>{v}</Text>
                                            </View>

                                            <View style={styles.languagePickerCircle}>
                                                {selectedLanguages.includes(v) && <TickIcon width={17} height={12} />}
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>

            </View>
            <HappeningStep
                nextText={"Next"}
                onPress={() => next()}
                step={props?.route?.params?.step}
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
        shadowColor: 'rgba(0,0,0,0.3)', shadowRadius: 2, shadowOpacity: 0.5,
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
        // shadowColor: 'rgba(0,0,0,0.5)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        elevation: 2
    },
    themeText: {
        fontSize: 12, color: "#2a2a2a", fontFamily: fonts.MBo, letterSpacing: 0.18,
    },
    languagePickerCircle: {
        width: 37, height: 37, borderRadius: 37 / 2,
        shadowColor: 'rgba(0,0,0,0.5)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.2,
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', elevation: 5
    },
    subData: {
        fontFamily: fonts.MRe, color: '#828282', fontSize: 8
    }


})

export default HappeningLanguages1

