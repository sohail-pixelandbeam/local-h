
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




const ChildrenTeenagers = (props) => {

    console.log('propsareeads', props.route.params)
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <GeneralStatusBar />
            <HappeningHeader
                showBackBtn
                heading={"Children and\nteenagers"}
                headerStyle={{ paddingBottom: 30 }}
                titleStyle={{ marginBottom: 20, }}
            />
            <View style={styles.contentContainer}>
                <ScrollView contentContainerStyle={{ paddingBottom: 350 }} >
                    <View style={{ width: '90%', alignSelf: 'center', }}>
                        <TouchableOpacity style={{ width: "100%", borderWidth: 1, borderRadius: 20, height: 170, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: fonts.PMe, fontSize: 12, color: '#5D5760' }}>Image Here</Text>
                        </TouchableOpacity>
                        <Text style={[styles.text,]}>Children over the age of 12 are required to create their own profiles, which adults should be aware of. If you do not want your child to create a profile, please notify the host that you will be bringing a child.</Text>
                        <Text style={[styles.text, { marginTop: 2 }]}>When children reach the age of 18, they can submit and participate in events on their own.</Text>
                    </View>
                </ScrollView>

            </View>
            <HappeningStep
                onPress={() => {
                    const params = props.route.params?.data;
                    if (params?.minAgeToParticipate > 18) {
                        navigate('ReviewJoining', {
                            data: params,
                            fellowWantToComeAlone: true,
                        })
                    }
                    else {
                        navigate('GoingWith', {
                            data: params,
                        })
                    }
                }}
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
        color: '#5D5760', fontFamily: fonts.PMe, fontSize: 12, marginTop: 20
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

export default ChildrenTeenagers
