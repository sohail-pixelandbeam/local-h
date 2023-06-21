
// CC STANDS FOR CODE OF CONDUCT

import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView } from 'react-native'
import { navigate } from '../../../../Navigations'
import HappeningHeader from '../../../common/HappeningHeader'
import HappeningStep from '../../../common/HappeningStep'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, WELFAREICON } from '../../../components/Svgs'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import GeneralStatusBar from '../../../components/GernalStatusBar'




const Presence = (props) => {


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <GeneralStatusBar />
            <HappeningHeader
                showBackBtn={true}
                heading={"Presence"}
                // headerStyle={{ paddingBottom: 90 }}
                titleStyle={{ }}
            />
            <View style={styles.contentContainer}>
                <ScrollView contentContainerStyle={{ paddingBottom: 350 }} >
                    <View style={{ width: '90%', alignSelf: 'center', }}>
                        <TouchableOpacity style={{ width: "100%", borderWidth: 1, borderRadius: 20, height: 170, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: fonts.PMe, fontSize: 12, color: '#5D5760' }}>Image Here</Text>
                        </TouchableOpacity>
                        <Text style={[styles.text, { marginTop: 20 }]}>The host has put in a lot of time and effort to make this happen. Please arrive on time. If you are unable to attend the event, please cancel your reservation as soon as possible. The host may have to travel long distances to host the event. It’s important to realize this.</Text>
                    </View>
                </ScrollView>

            </View>
            <HappeningStep
                onPress={() => navigate('AttitudeEffort', {
                    data: props.route.params?.data
                })}
                showStep={false}
                // containerStyle={{ alignItems: 'flex-end', flexDirection: 'column', justifyContent: 'center' }}
                nextText={"Next"}
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
        shadowColor: 'rgba(0, 0, 0, 0.09)',
        shadowRadius: 3, shadowOpacity: 0.5,
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
    bullet: {
        width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: '#222222',
    },
    pointsView: {
        flexDirection: 'row', alignItems: 'center', marginTop: 10
    }


})

export default Presence
