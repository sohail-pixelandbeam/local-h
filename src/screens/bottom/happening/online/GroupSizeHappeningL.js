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
import AlertPopup from '../../../../common/AlertPopup'

var alertRef;
const GroupSizeHappeningL = () => {

    const forceUpdate = useForceUpdate();
    const { state, setHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);


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
            ...state.happeningDraft,

            fellowsOneToFifteen: fellow

        }
        setHappeningData(obj);
        navigate('CC1')
    }




    const conditionArr = [
        {
            title: "1 - 15 fellows", no: 15, desc: "Connect with fellows through online meet software like Zoom, Teams etc. "
        },
        {
            title: "16 Fellows and more", no: 16, desc: "Connect with fellows in a geographical location"
        },

    ]

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <HappeningHeader
                // imageUrl={require('../../../../assets/thingsConsiderHeaderImg.png')}
                heading={"Group size online happening"}
                desc={"How many fellows can attend at the same moment?"}
            />

            <View style={styles.contentContainer}>
                <FlatList
                    data={conditionArr}
                    contentContainerStyle={{ paddingBottom: 550, paddingHorizontal: 10 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => next(item.no)}
                                style={[styles.content]}>
                                <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ fontFamily: fonts.MBo, fontSize: 12, color: '#2A2A2A' }}>{item.title}</Text>
                                        <Text style={{ fontFamily: fonts.MRe, fontSize: 8, color: '#828282', marginTop: 5 }}>Between 1 and 15 fellows can work simultaneously. </Text>
                                    </View>
                                    <NextIcon />
                                </View>
                                <Image
                                    style={{ width: "100%", height: 89, borderRadius: 16, marginTop: 20 }}
                                    source={index == 0 ? require('../../../../static_assets/pic1.png') : require('../../../../assets/16Fellows.png')}
                                />
                            </TouchableOpacity>


                        )
                    }}

                />


            </View>
            <AlertPopup ref={(ref) => alertRef = ref} />
            {loading && <Loader />}
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
        shadowColor: 'rgba(0,0,0,0.5)',
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
