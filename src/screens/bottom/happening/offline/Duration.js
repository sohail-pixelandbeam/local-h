import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList } from 'react-native'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'
import GeneralStatusBar from '../../../../components/GernalStatusBar'
import { getHeight, retrieveItem } from '../../../../utils/functions'
import AlertMsg from '../../../../common/AlertMsg'
import HappeningStep from '../../../../common/HappeningStep'

const Duration = (props) => {


    const conditionArr = [
        {
            title: "Yes, the happening repeats", desc: "Happens every day, week, 2 weeks, month, quarter,year etc.",
            navigate: 'DurationRepeat'
            // 'GroupSizeHappeningL'
        },
        {
            title: "No, the happening takes place only once",
            navigate: 'Duration1'
        },


    ]



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <GeneralStatusBar />

            <HappeningHeader
                // imageStyle={{ marginTop: -20 }}
                // imageUrl={require('../../../../assets/thingsConsiderHeaderImg.png')}
                heading={"When is this\nHappening?"}
                desc={"Select the duration and the date of the happening."}
            />

            <View style={styles.contentContainer}>
                <Text style={{ color: '#222222', fontSize: 22, fontFamily: fonts.PBo, marginTop: getHeight(2) }}>Does this happening{"\n"}When</Text>
                <FlatList
                    data={conditionArr}
                    contentContainerStyle={{ paddingBottom: 550 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigate(item.navigate)
                                }}
                                style={[styles.content]}>

                                <View style={{ width: "94%" }}>
                                    <Text style={[styles.title]}>{item.title}</Text>
                                    <Text style={styles.desc}>{item.desc}</Text>
                                </View>

                            </TouchableOpacity>


                        )
                    }}

                />


            </View>

            {/* <HappeningStep
                nextText={"Next"}
                onPress={() => next()}
                step={props?.route?.params?.step}
            /> */}
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
        width: "99%", paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'white', elevation: 5, marginTop: 15,
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        marginHorizontal: 1, borderRadius: 10
    },
    title: {
        fontFamily: fonts.MBo, fontSize: 14, color: '#2A2A2A', lineHeight: 15,
    },
    desc: {
        color: '#161615', fontFamily: fonts.MRe, fontSize: 10, marginTop: 5
    },
    agreeBtn: {
        width: "100%", position: 'absolute', bottom: 50, height: 70,
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 30, alignItems: 'center', justifyContent: 'flex-end',
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        elevation: 5
    },
    popupBtn: {
        width: "49%", height: 29, borderRadius: 20, backgroundColor: '#5b4dbc',
        alignItems: 'center', justifyContent: 'center'
    },

})

export default Duration
