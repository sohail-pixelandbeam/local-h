import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, BackHandler } from 'react-native'
import { goBack, navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'

import { Context } from '../../../../Context/DataContext'
import { storeItem, useForceUpdate } from '../../../../utils/functions'
import Loader from '../../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import { useFocusEffect } from '@react-navigation/native'
import { happeningStyles } from '../styles'


const GroupSizeHappeningL = () => {

    const forceUpdate = useForceUpdate();
    const { state, setLocationHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);


    const conditionArr = [
        {
            title: "1 - 15 fellows", desc: "For happenings where 1-15 fellows can work simultaneously", no: 15,
        },
        {
            title: "16 Fellows and more", desc: "For happenings where more than 16 fellows can work simultaneously", no: 16,
        },
    ];

    // useFocusEffect(React.useCallback(() => {
    //     BackHandler.addEventListener('hardwareBackPress', function () {
    //         console.log('returning')
    //         goBack();
    //         return false;
    //     })
    // }, [],
    // ))

    function next(fellow) {
        const obj = {
            ...state.locationHappeningDraft,
            fellowsOneToFifteen: fellow
        }
        setLocationHappeningData(obj);
        navigate('CC1')
    }




    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <HappeningHeader
                // imageUrl={require('../../../../assets/thingsConsiderHeaderImg.png')}
                heading={"Group size of happening on location"}
                desc={"How many fellows can attend at the same moment?"}
            />

            <View style={styles.contentContainer}>
                <FlatList
                    data={conditionArr}
                    contentContainerStyle={{ paddingBottom: 550 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => next(item.no)}
                                style={styles.content}>
                                <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ width: "80%" }}>
                                        <Text style={happeningStyles.happeningTitle2}>{item.title}</Text>
                                        <Text style={happeningStyles.happeningDesc}>{item.desc}</Text>
                                    </View>
                                    <NextIcon />
                                </View>
                                <Image
                                    style={{ width: "100%", height: 89, borderRadius: 16, marginTop: 20, }}
                                    source={index == 0 ? require('../../../../static_assets/pic1.png') : require('../../../../assets/16Fellows.png')}
                                />
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
        width: "100%", paddingHorizontal: 10, paddingVertical: 15, alignItems: 'center',
        backgroundColor: '#FFFFFF', elevation: 2, marginTop: 15, borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.09)',
        shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
    },
    title: {
        fontFamily: fonts.MBo, fontSize: 9, color: '#2A2A2A', lineHeight: 15,
    },
    desc: {
        color: '#161615', fontFamily: fonts.MRe, fontSize: 7
    },


})

export default GroupSizeHappeningL
