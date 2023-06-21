
import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, LocationIcon, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'


const Location1 = () => {

    const [confirmPopup, setConfirmPopup] = useState(false);
    const ConfirmLocationPopup = () => (
        <ReactNativeModal
            isVisible={confirmPopup}

        >
            <View style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingTop: 25, paddingBottom: 10, borderRadius: 20 }}>
                <Text style={[styles.popupHeading]}>Confirm this{"\n"}location?</Text>
                <Image
                    source={require('../../../../static_assets/map.png')}
                    style={{ width: "100%", marginTop: 10 }}
                />
                <View style={{ width: "90%", alignSelf: 'center', backgroundColor: 'white', elevation: 2, borderRadius: 18, paddingHorizontal: 10, paddingVertical: 20, marginTop: -15 }}>
                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 15, color: '#1A1A20', marginTop: 5 }}>131 Eve Road, A53 0GF, Amsterdam </Text>
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 8, color: '#9E9DA6', marginTop: 2 }}>Netherlands, Europe</Text>

                </View>

                <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => setConfirmPopup(false)}
                        style={[styles.tipsBtn, { backgroundColor: '#FBFBFB', borderWidth: 1, borderColor: '#5B4DBC', marginRight: 10 }]}>
                        <Text style={[styles.topsBtnTitle, { color: '#5B4DBC' }]}>Relocate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setConfirmPopup(false)
                            navigate('Duration1');
                        }}
                        style={styles.tipsBtn}>
                        <Text style={styles.topsBtnTitle}>Yes</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </ReactNativeModal>
    )

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"Where’s this happening?"}
                desc={"Provide the location information "}
            // headerStyle={{ paddingBottom: 30 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView contentContainerStyle={{ paddingBottom: 150 }} >

                    <Text style={{ fontFamily: fonts.MBo, fontSize: 15, color: '#2A2A2A' }}>Describe the location</Text>
                    <Text style={{ fontFamily: fonts.MRe, fontSize: 11, color: '#828282', marginTop: 5 }}>Get fellows excited about the location of the happening.</Text>

                    <View>
                        <TextInput
                            placeholder=''
                            textAlignVertical='top'
                            multiline={true}
                            placeholderTextColor={"#2A2A2A"}
                            style={{
                                width: "100%", height: 75, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1, marginTop: 10,
                                fontSize: 12, color: "#2A2A2A", fontFamily: fonts.MRe, paddingHorizontal: 15,
                            }}
                        />
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <LocationIcon />
                        <Text style={{ fontFamily: fonts.MBo, fontSize: 15, color: '#35208E', textDecorationLine: 'underline', marginLeft: 5 }}>Use my location <Text style={{ textDecorationLine: 'none' }}>or</Text></Text>
                    </TouchableOpacity>
                    <View>
                        <TextInput
                            placeholder='Enter Location'
                            textAlignVertical='top'
                            multiline={true}
                            placeholderTextColor={"#2A2A2A"}
                            style={{
                                width: "100%", height: 44, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1, marginTop: 10,
                                fontSize: 12, color: "#2A2A2A", fontFamily: fonts.MRe, paddingHorizontal: 15,
                            }}
                        />
                    </View>
                    <Image
                        source={require('../../../../static_assets/map.png')}
                        style={{ width: "100%", marginTop: 10 }}
                    />
                    <View style={{ width: "90%", alignSelf: 'center', backgroundColor: 'white', elevation: 2, borderRadius: 18, paddingHorizontal: 10, paddingVertical: 20, marginTop: -15 }}>
                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 15, color: '#1A1A20', marginTop: 5 }}>131 Eve Road, A53 0GF, Amsterdam </Text>
                        <Text style={{ fontFamily: fonts.PRe, fontSize: 8, color: '#9E9DA6', marginTop: 2 }}>Netherlands, Europe</Text>

                    </View>
                </ScrollView>

            </View>
            <TouchableOpacity
                onPress={() => setConfirmPopup(true)}
                activeOpacity={0.9}
                style={styles.agreeBtn}>
                <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Step 3/15</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Next</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </View>
            </TouchableOpacity>
            <ConfirmLocationPopup />
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
    popupHeading: {
        color: '#ffa183', fontFamily: fonts.PBo, fontSize: 21, marginTop: 20
    },


})

export default Location1

