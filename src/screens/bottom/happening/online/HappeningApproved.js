import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput } from 'react-native'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'
import { useForceUpdate } from '../../../../utils/functions'


const HappeningApproved = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#35208E' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <View style={{ width: "85%", alignSelf: 'center' }}>
                <Image
                    style={{ alignSelf: 'center', marginTop: 20 }}
                    source={require('../../../../assets/happeningApproved.png')}
                />
                <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
                    <Text style={{ fontSize: 29, color: 'white', fontFamily: fonts.PBo, marginTop: 50 }}>Wohoo!{"\n"}Your Happening{"\n"}got approved</Text>
                    <Text style={{ fontSize: 29, color: '#A69FD9', fontFamily: fonts.PBo, marginTop: 10 }}>Upon careful consideration your happening has been approved and is live on LocalHappinez</Text>
                </ScrollView>
            </View>

            <TouchableOpacity
                onPress={() => navigate('HappeningRejected')}
                activeOpacity={0.9}
                style={styles.agreeBtn}>
                <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}></Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Go to Profile</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </View>
            </TouchableOpacity>


        </View>
    )
}


const styles = StyleSheet.create({

    agreeBtn: {
        width: "100%", position: 'absolute', bottom: 0, height: 60,
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 30, alignItems: 'center', justifyContent: 'space-between',
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        shadowColor: 'rgba(0, 0, 0, 0.09)',
        shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        elevation: 5
    },


})


export default HappeningApproved
