
// CC STANDS FOR CODE OF CONDUCT

import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView } from 'react-native'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import HappeningStep from '../../../../common/HappeningStep'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'




const CC1 = (props) => {


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"What we are\nlooking for "}
                headerStyle={{ paddingBottom: 30 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView contentContainerStyle={{ paddingBottom: 350 }} >
                    <View style={{ width: '90%', alignSelf: 'center', }}>
                        <Image
                            style={{ width: "100%", height: 198, borderRadius: 10 }}
                            source={require('../../../../static_assets/CC1.png')}
                        />
                        <Text style={[styles.text, { marginTop: 20 }]}>Online hosts are representatives of a local NGO or citizens. They face a sustainable challenge for which they seek expertise, tips, and networks. As a host, you must meet the following criteria & skills:
                        </Text>
                        {/* <Text style={[styles.text, { marginTop: 20 }]}>You must meet the following criteria & skills:
                        </Text> */}
                        <Text style={[styles.text, { marginTop: 20 }]}><Text style={styles.headingText}>Communication skills:</Text>You feel comfortable talking to people in an online environment.
                        </Text>
                        <Text style={[styles.text, { marginTop: 20 }]}><Text style={styles.headingText}>Technical skills & requirements:</Text>you know how to set up an online meeting and have the proper tooling.
                        </Text>
                        <Text style={[styles.text, { marginTop: 10 }]}>Examples of online happenings:</Text>
                        <View style={styles.pointsView}>
                            <View style={styles.bullet} />
                            <Text style={[styles.text, { marginLeft: 10 }]}>you feel comfortable talking to one or more people</Text>
                        </View>
                        <View style={styles.pointsView}>
                            <View style={styles.bullet} />
                            <Text style={[styles.text, { marginLeft: 10 }]}>your communication skills facilitate exchanges of information and discussions</Text>
                        </View>


                    </View>
                </ScrollView>

            </View>
            <HappeningStep
                onPress={() => navigate('CC2')}
                step={props?.route?.params?.step}
            />
            {/* <TouchableOpacity
                onPress={() => navigate('CC2')}
                activeOpacity={0.9}
                style={styles.agreeBtn}>
                <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Step {props?.route?.params?.step}/15</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Get Started</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </View>
            </TouchableOpacity> */}
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

export default CC1
