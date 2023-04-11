import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList } from 'react-native'
import { navigate } from '../../../../Navigations'
import HappeningHeader from '../../../common/HappeningHeader'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, WELFAREICON } from '../../../components/Svgs'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'

const TypeHappening = () => {


    const conditionArr = [
        {
            Svg: HappeningLocationIcon, title: "Happening on location", desc: "Connect with fellows in a geographical location",
            navigate : 'MainScreenL'
            // 'GroupSizeHappeningL'
        },
        {
            Svg: OnlineHappeningIcon, title: "Online Happening", desc: "Connect with fellows through online meet software like Zoom, Teams etc. ",
            navigate : 'MainScreenO'
        },


    ]

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <HappeningHeader
                imageUrl={require('../../../assets/thingsConsiderHeaderImg.png')}
                heading={"What’s the type of\nyour happening ?"}
                desc={"Specify whether the happening is in a physical location or online."}
            />

            <View style={styles.contentContainer}>
                <FlatList
                    data={conditionArr}
                    contentContainerStyle={{ paddingBottom: 550 }}
                    renderItem={({ item, index }) => {
                        let Icon = item.Svg
                        return (
                            <TouchableOpacity 
                                onPress={()=>navigate(item.navigate)}
                                style={styles.content}>
                                <View style={{width:"20%"}}>
                                    <Icon />
                                </View>
                                <View style={{ width: "70%" }}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.desc}>{item.desc}</Text>
                                </View>
                                <View>
                                    <NextIcon />
                                </View>
                            </TouchableOpacity>


                        )
                    }}

                />


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
        width: "100%", paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'white', elevation: 5, marginTop: 15,
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
    },
    title: {
        fontFamily: fonts.MBo, fontSize: 9, color: '#2A2A2A', lineHeight: 15,
    },
    desc: {
        color: '#161615', fontFamily: fonts.MRe, fontSize: 7
    },
    agreeBtn: {
        width: "100%", position: 'absolute', bottom: 50, height: 70,
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 30, alignItems: 'center', justifyContent: 'flex-end',
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        elevation: 5
    }

})

export default TypeHappening
