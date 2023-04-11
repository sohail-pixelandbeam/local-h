

import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput, BackHandler } from 'react-native'
import { goBack, navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'


const Description2 = (props) => {


    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function () {
            return true;
        })
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"Key Tips for\nthe Description "}
                desc={"Key tips to consider while giving a title to the happening ."}
            // headerStyle={{ paddingBottom: 30 }}
            />
            <View style={styles.contentContainer}>

                <ScrollView contentContainerStyle={{ paddingBottom: 400 }} >
                    <Text style={{ color: '#2A2A2A', fontSize: 15, fontFamily: fonts.MBo, marginTop: 20 }}>Here are some good recommendations </Text>
                    <FlatList
                        data={[
                            { img: require('../../../../static_assets/pic6.png'), title: 'Restore coral reefs in open sea' },
                        ]}
                        renderItem={({ item }) => (
                            <View style={{ height: 145, width: "100%", marginTop: 30 }}>
                                <Image
                                    style={{ width: "100%", height: "100%", borderRadius: 21 }}
                                    source={item.img}
                                />
                                <Image
                                    style={{ width: "100%", height: "100%", position: 'absolute', borderRadius: 21 }}
                                    source={require('../../../../static_assets/mask1.png')}
                                />
                                <View style={{ position: 'absolute', bottom: 15, left: 10, width: "45%" }}>
                                    <Text style={{ fontFamily: fonts.MSBo, fontSize: 15, color: '#FFFFFF' }}>{item.title}</Text>
                                </View>


                            </View>
                        )}
                    />

                    <Text style={{ fontSize: 12, color: '#7B7B7B', fontFamily: fonts.MRe, lineHeight: 15, marginTop: 10 }}>Bring the science of reefs to life and do your part to rescue threatened and endangered ecosystems and species. Perfect for families, single divers, vacationers, school groups, and more! As reefs around the world face the threat of die-off, you can make a measurable difference to help out degraded reefs and endangered species. Not only will you make a positive impact on Bonaire’s reefs, but you will also even have fun and learn new skills in the process!</Text>
                    <View style={{ height: 145, width: "100%", marginTop: 30 }}>
                        <Image
                            style={{ width: "100%", height: "100%", borderRadius: 21 }}
                            source={require('../../../../static_assets/pic7.png')}
                        />
                        <Image
                            style={{ width: "100%", height: "100%", position: 'absolute', borderRadius: 21 }}
                            source={require('../../../../static_assets/mask1.png')}
                        />
                        <View style={{ position: 'absolute', bottom: 15, left: 10, width: "45%" }}>
                            <Text style={{ fontFamily: fonts.MSBo, fontSize: 15, color: '#FFFFFF' }}>{"Fight Food Waste With Local Communities"}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                        <TouchableOpacity style={{
                            width: 23, height: 23, borderRadius: 23 / 2, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
                            elevation: 2, shadowColor: 'rgba(0, 0, 0, 0.09)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
                        }}>
                            <TickIcon width={8} heigh={6} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 9, color: '#2A2A2A', fontFamily: fonts.MBo, marginLeft: 10 }}>No offensive text and all the titles are checked by our team</Text>
                    </View>


                    <TouchableOpacity
                        style={[styles.tipsBtn]}
                        onPress={() => navigate('Description1')}
                    >
                        <Text style={styles.topsBtnTitle}>{"Got it"}</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>

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
        marginTop: 20, alignSelf: 'center',

    },
    topsBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },


})

export default Description2

