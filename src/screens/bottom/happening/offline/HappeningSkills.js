// CC STANDS FOR CODE OF CONDUCT

import React, { useState, useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput, BackHandler } from 'react-native'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, DrinksIcon, FoodIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, PIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, ToiletIcon, WELFAREICON, WifiIcon } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'


import { Context } from '../../../../Context/DataContext'
import { getHOLPreviousScreen, storeItem, useForceUpdate } from '../../../../utils/functions'
import Loader from '../../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import HappeningStep from '../../../../common/HappeningStep'


var alertRef;
var textInputRef;

const HappeningSkills = (props) => {


    const forceUpdate = useForceUpdate();
    const { state, setLocationHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);


    const [selectedFacilties, setSelectedFacilties] = useState(['Drinks']);
    const [providingFacilities, setProvidingFacilities] = useState(true);
    const [selectedSkils, setSelectedSkils] = useState('');

    const [skillsArr, setSkillsArr] = useState([]); // TO SEND IT TO SERVER
    const [skill, setSkill] = useState(''); // FOR INPUT


    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function () {
            // navigate('HappeningLanguages1');
            return true;
        })
    }, []);



    function doMakeSkills() {
        let arr = skillsArr;
        arr.push(skill);
        console.log(skill);
        setSkillsArr(arr);
        setSkill('');
        forceUpdate();
    }

    function doSpliceSkills(v) {
        let arr = skillsArr;
        let foundIndex = arr.indexOf(v);
        if (foundIndex !== -1) arr.splice(foundIndex, 1);
        setSkillsArr(arr);
        forceUpdate();
    }



    function addRemoveFacilities(v) {


        var arr = selectedFacilties;
        if (arr.includes(v)) {
            if (selectedFacilties.length == 1) return;
            let foundIndex = arr.indexOf(v);
            arr.splice(foundIndex, 1);
        }
        else {
            arr.push(v);
        }
        setSelectedFacilties(arr);
        forceUpdate();


    }

    function next() {

        if (skillsArr.length == 0 && providingFacilities) {
            alertRef.alertWithType('error', "Error", "Please enter atleast one skill");
            return;
        }

        var obj = {};
        if (!providingFacilities) {
            obj = {
                ...state.locationHappeningDraft,
                RequirmentToJoinYourHappening: {
                    thisHappeningDoesntRequireAnySkills: true
                }
            }
        }
        else obj = {
            ...state.locationHappeningDraft,
            addSkill: skillsArr,
            skillLevel: selectedSkils

        }
        setLocationHappeningData(obj);
        navigate('HappeningFacilites');
    }





    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />

            <HappeningHeader
                heading={"Skills Required to join your Happening"}
                desc={"skill set of the fellows to join your happening."}
            // headerStyle={{ paddingBottom: 30 }}
            />
            <DropdownAlert ref={(ref) => alertRef = ref} />
            {loading && <Loader />}
            <View style={styles.contentContainer}>
                <ScrollView>
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
                        <Text style={{ marginTop: 20, fontFamily: fonts.MBo, color: '#2A2A2A', fontSize: 14 }}>Add a Skill </Text>
                        <View>
                            <TextInput
                                placeholder=''
                                ref={(ref) => textInputRef = ref}
                                placeholderTextColor={"#7b7b7b"}
                                onChangeText={(v) => setSkill(v)}
                                style={{
                                    width: "100%", height: 47, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                                    fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10, marginTop: 10
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    if (skill.length > 1) {
                                        textInputRef.clear();
                                        doMakeSkills()
                                    }

                                }}
                                style={{ position: 'absolute', padding: 10, marginTop: 0, right: 0 }}>
                                <Text style={{ fontSize: 34, color: '#241414', fontFamily: fonts.MRe, }}>+</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', width: "100%", marginTop: 10, flexWrap: 'wrap' }}>
                                {
                                    skillsArr.map((v, i) => {
                                        return (
                                            <View
                                                key={i}
                                                style={{
                                                    paddingHorizontal: 8, height: 28, borderRadius: 18, backgroundColor: '#b9b1f0', flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10
                                                }}>
                                                <Text style={{ color: '#ffffff', fontFamily: fonts.MRe, fontSize: 8, }}>{v}</Text>
                                                <TouchableOpacity
                                                    onPress={() => doSpliceSkills(v)}
                                                >
                                                    <Text style={{ color: '#ffffff', fontFamily: fonts.MMe, fontSize: 9, marginLeft: 10 }}>X</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>





                        <Text style={{ marginTop: 20, fontFamily: fonts.MBo, color: '#2A2A2A', fontSize: 14 }}>Add a Skill </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                            <TouchableOpacity
                                onPress={() => setSelectedSkils('Beginner')}
                                style={{ paddingHorizontal: 15, height: 38, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: selectedSkils == 'Beginner' ? 0 : 3, borderColor: '#B9B1F0', backgroundColor: selectedSkils == 'Beginner' ? '#B9B1F0' : 'white' }}>
                                <Text style={{ color: selectedSkils == 'Beginner' ? 'white' : '#222222', fontSize: 12, fontFamily: fonts.MBo }}>Beginner </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setSelectedSkils('Amateur')}
                                style={{ paddingHorizontal: 15, height: 38, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: selectedSkils == 'Amateur' ? 0 : 3, borderColor: '#B9B1F0', backgroundColor: selectedSkils == 'Amateur' ? '#B9B1F0' : 'white' }}>
                                <Text style={{ color: selectedSkils == 'Amateur' ? 'white' : '#222222', fontSize: 12, fontFamily: fonts.MBo }}>Amateur </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setSelectedSkils('Pro')}
                                style={{ paddingHorizontal: 15, height: 38, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: selectedSkils == 'Pro' ? 0 : 3, borderColor: '#B9B1F0', backgroundColor: selectedSkils == 'Pro' ? '#B9B1F0' : 'white' }}>
                                <Text style={{ color: selectedSkils == 'Pro' ? 'white' : '#222222', fontSize: 12, fontFamily: fonts.MBo }}>Pro </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setProvidingFacilities(!providingFacilities)
                            if (providingFacilities) setSkillsArr([]);
                            textInputRef.clear();
                            forceUpdate();
                        }}
                        style={{ flexDirection: 'row', marginTop: 20, paddingBottom: 3, alignItems: 'center', marginLeft: 12 }}>
                        <View style={{ width: 32, height: 32, borderRadius: 32 / 2, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', elevation: 2, shadowColor: 'rgba(0,0,0,0.3)', shadowOpacity: 0.5, shadowRadius: 1, shadowOffset: { width: 1, height: 2 } }}>
                            {!providingFacilities && <TickIcon />}
                        </View>
                        <Text style={{ marginLeft: 10, fontFamily: fonts.MBo, fontSize: 14, color: '#7B7B7B' }}>This Happening doesn’t require any Skills</Text>
                    </TouchableOpacity>
                </ScrollView>

            </View>
            <HappeningStep
                nextText={"Next"}
                onPress={() => next()}
                step={props?.route?.params?.step}
            />


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
    }


})

export default HappeningSkills

// placeholder='eg- driving, scuba diving, IT '