import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, BackHandler } from 'react-native'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'
import { NextIcon } from '../../../../components/Svgs'



export default function EditReviewReportStep2() {
    const [selectedReason, setSelectedReason] = useState('')
    const reasons = ['Physical assault', 'Sexual assualt', 'Harrassment', 'Privacy violation', 'Injury', 'other']


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.theme2}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"Please describe \nwhat happened?"}
                desc={"This information helps us get you to the right\n support team"}
                headerStyle={{ height: 250, justifyContent: 'flex-end', paddingBottom: 50, backgroundColor: acolors.theme2 }}
                descStyle={{ fontSize: 12, paddingEnd: 40, lineHeight: 25, }}
            />
            <View style={styles.contentContainer}>
                <ScrollView >
                    <View style={{ width: '90%', alignSelf: 'center', }}>
                        {reasons.map((e, i) => {
                            return (
                                <TouchableOpacity onPress={() => setSelectedReason(e)} key={i} style={e !== selectedReason ? styles.itemBox : [styles.itemBox, { backgroundColor: 'lightgray' }]} >
                                    <Text style={styles.textBold} >{e}</Text>
                                    <Text style={styles.text} >Reason description</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <View style={{ height: 300 }} ></View>
                </ScrollView>

            </View>

            <View style={styles.agreeBtn} >
                <TouchableOpacity
                    onPress={() => navigate('ReviewReportStep3')}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Next</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>

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
    text: {
        color: '#828282', fontFamily: fonts.MontRe, fontSize: 5, lineHeight: 6
    },
    textBold: {
        color: '#5D5760', fontFamily: fonts.MontBo, fontSize: 13, lineHeight: 22,
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
    itemBox: {
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowRadius: 2, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        elevation: 2,
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        height: 73,
        justifyContent: 'center',
        backgroundColor: 'white'


    }


})

