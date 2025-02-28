// CC STANDS FOR CODE OF CONDUCT

import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput } from 'react-native'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, DrinksIcon, FoodIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, PIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, ToiletIcon, WELFAREICON, WifiIcon } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'
import { useForceUpdate } from '../../../../utils/functions'


const HappeningFacilites = () => {


    const forceUpdate = useForceUpdate();
    const [selectedFacilties, setSelectedFacilties] = useState(['Drinks']);
    const [providingFacilities, setProvidingFacilities] = useState(true);

    const facilitesArr = [
        { title: "WI-FI", icon: WifiIcon },
        { title: "Parking", icon: PIcon },
        { title: "Drinks", icon: DrinksIcon },
        { title: "Food", icon: FoodIcon },
        { title: "Toilet", icon: ToiletIcon }
    ]



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


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"What are the facilities at your Happening?"}
                desc={"facilites offered and some requirements for the happening."}
            // headerStyle={{ paddingBottom: 30 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView>
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', width: "100%", flexWrap: 'wrap', marginTop: 10, marginLeft: -20 }}>
                            {
                                facilitesArr?.map((v, i) => {
                                    let Icon = v.icon
                                    return (
                                        <TouchableOpacity
                                            key={i}
                                            disabled={!providingFacilities}
                                            onPress={() => addRemoveFacilities(v.title)}
                                            style={{ alignItems: 'center', marginLeft: 20, marginTop: 20 }}>
                                            <View style={{ width: 54, height: 54, borderRadius: 54 / 2, borderWidth: selectedFacilties.includes(v?.title) ? 0 : 2, backgroundColor: selectedFacilties.includes(v.title) ? '#5B4DBC' : 'white', borderColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' }}>
                                                <Icon color={selectedFacilties.includes(v.title) ? "#fff" : "#222222"} />
                                            </View>
                                            <Text style={{ fontFamily: fonts.MSBo, fontSize: 11, color: '#222222', marginTop: 2 }}>{v.title}</Text>

                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <Text style={{ marginTop: 10, fontFamily: fonts.MBo, color: '#7B7B7B', fontSize: 14 }}>Additional Facilities you Provide</Text>
                        <TextInput
                            placeholder=''
                            placeholderTextColor={"#7b7b7b"}
                            multiline={true}
                            style={{
                                width: "100%", height: 79, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                                fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10,
                                marginTop: 10
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setProvidingFacilities(!providingFacilities)
                            if (providingFacilities) setSelectedFacilties([]);
                            forceUpdate();
                        }}
                        style={{ flexDirection: 'row', marginTop: 15, paddingBottom: 3, alignItems: 'center' ,marginLeft:12}}>
                        <View style={{ width: 32, height: 32, borderRadius: 32 / 2, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', elevation: 2 }}>
                            {!providingFacilities && <TickIcon />}
                        </View>
                        <Text style={{ marginLeft: 10, fontFamily: fonts.MBo, fontSize: 14, color: '#7B7B7B' }}>Im not providing any facilities</Text>
                    </TouchableOpacity>
                </ScrollView>

            </View>
            <TouchableOpacity
                onPress={() => navigate('HappeningAccessibilty')}
                activeOpacity={0.9}
                style={styles.agreeBtn}>
                <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Step 6/15</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Next</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </View>
            </TouchableOpacity>
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

export default HappeningFacilites

