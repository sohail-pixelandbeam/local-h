import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, BackHandler } from 'react-native'
import { navigate } from '../../../../Navigations'
import HappeningHeader from '../../../common/HappeningHeader'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import { NextIcon } from '../../../components/Svgs'



export default function ReviewReportStep4() {

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.theme2}
                barStyle={"light-content"}
            />
            <View style={styles.backBtn} >
                <TouchableOpacity onPress={() => navigate("ReviewStep1")} >
                    <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={require('../../../components/verificationComponents/assets/img/buttonBack.png')} />
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <Text style={[styles.heading, { color: acolors.theme2 }]} >{'Your incident is \nreported. Our team \nwill get back to you.'}</Text>
                <Text style={styles.text} >This usually takes 48 hours.</Text>
                <Text style={[styles.heading, { color: acolors.theme2 }]} >{'In case of a legal\nviolation please\nreport to the\nlocal police.'}</Text>
            </View>

            <View style={styles.agreeBtn} >
                <TouchableOpacity
                    onPress={() => navigate('ReviewStep1')}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Done</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#FDFDFD',
        width: "100%",
        height: '100%',
        paddingHorizontal: 25,
        marginTop: 100

    },
    content: {
        width: "100%", paddingHorizontal: 10, paddingVertical: 15, alignItems: 'center',
        backgroundColor: '#FFFFFF', elevation: 2, marginTop: 15, borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.09)',
        shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
    },
    text: {
        color: 'gray', fontFamily: fonts.PMe, fontSize: 12, marginBottom: 40
    },
    textBold: {
        color: '#5D5760', fontFamily: fonts.PMe, fontSize: 18, fontWeight: 'bold'
    },
    heading: {
        fontFamily: fonts.PBo, fontSize: 29,
        lineHeight: 43,
    },
    agreeBtn: {
        width: "100%", position: 'absolute', bottom: 0, height: 70,
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 50, alignItems: 'center', justifyContent: 'flex-end',
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        elevation: 5
    },
    backBtn: {
        marginTop: 80,
        marginLeft: 20
    }
})

