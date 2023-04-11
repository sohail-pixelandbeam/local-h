// CC STANDS FOR CODE OF CONDUCT

import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, BackHandler } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert'
import ReactNativeModal from 'react-native-modal'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'
import { getHOLPreviousScreen, useForceUpdate } from '../../../../utils/functions'


var alertRef;
const CC4 = () => {


    const [hostedPoint, setHostedPoint] = useState(0);
    const [errorPopup, setErrorPopup] = useState(false);
    const forceUpdate = useForceUpdate();



    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function () {
            navigate('CC3');
            return true;
        })
    }, []);


    const ErrorPopupModal = () => (
        <ReactNativeModal
            isVisible={errorPopup}

        >
            <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 25, paddingBottom: 10, borderRadius: 20 }}>
                <Text style={[styles.popupHeading]}>Sorry! You cannot
                    proceed. Your presence
                    is required at the place.
                    Either make yourself
                    available or find a
                    co-host who is available
                    at the location.
                    We love to see you back!</Text>

                <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {
                            setErrorPopup(false)
                            // navigate('Duration1');
                        }}
                        style={styles.tipsBtn}>
                        <Text style={styles.topsBtnTitle}>Done</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </ReactNativeModal>
    )


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            
            <HappeningHeader
                heading={"Presence at the location"}
                headerStyle={{ paddingBottom: 30 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView>
                    <View style={{ width: '90%', alignSelf: 'center', }}>
                        <Image
                            style={{ width: "100%", height: 198, borderRadius: 10 }}
                            source={require('../../../../static_assets/pic5.png')}
                        />
                        <Text style={[styles.text, { marginTop: 20, marginBottom: 10 }]}>You realize you need to be present at the location during the happening. You may also appoint extra representatives. These persons also need to be registered as members of Local Happinez and have complete profiles. You assign them as co-hosts later during the submission.</Text>
                        <TouchableOpacity
                            onPress={() => setHostedPoint(1)}
                            style={styles.pointsView}>
                            {hostedPoint == 1 ? <View style={styles.radioSelected}>
                                <TickIcon color="#fff" width={6.3} height={6.3} />
                            </View> :
                                <View style={styles.radioUnSelected} />}
                            <Text style={[styles.text, { marginLeft: 10 }]}>Yes, I am present at the location</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            onPress={() => setHostedPoint(2)}
                            style={styles.pointsView}>
                            {hostedPoint == 2 ? <View style={styles.radioSelected}>
                                <TickIcon color="#fff" width={6.3} height={6.3} />
                            </View> :
                                <View style={styles.radioUnSelected} />}
                            <Text style={[styles.text, { marginLeft: 10 }]}>Yes, I am present at the location with one or more co-hosts</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={() => setHostedPoint(3)}
                            style={styles.pointsView}>
                            {hostedPoint == 3 ? <View style={styles.radioSelected}>
                                <TickIcon color="#fff" width={6.3} height={6.3} />
                            </View> :
                                <View style={styles.radioUnSelected} />}
                            <Text style={[styles.text, { marginLeft: 10 }]}>No, I am not present at the location, but another person is</Text>
                        </TouchableOpacity>


                    </View>
                </ScrollView>

            </View>
            <TouchableOpacity
                onPress={() => {
                    if (hostedPoint == 0) {
                        alertRef.alertWithType('error', "Error", "Please mark any one point")
                        return
                    }
                    if (hostedPoint == 3) {
                        setErrorPopup(true);
                        return;
                    }
                    navigate('HappeningTheme')
                }}
                activeOpacity={0.9}
                style={styles.agreeBtn}>
                <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Step 1/15</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Next</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </View>
            </TouchableOpacity>
            <ErrorPopupModal />
            <DropdownAlert ref={(ref) => alertRef = ref} />
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
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowRadius: 3, shadowOpacity: 0.5,
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
    radioUnSelected: {
        width: 15.92, height: 15.92, borderRadius: 15.92 / 2, borderWidth: 1, borderColor: '#35208E',

    },
    radioSelected: {
        width: 15.92, height: 15.92, borderRadius: 15.92 / 2, backgroundColor: '#35208E', alignItems: 'center', justifyContent: 'center'
    },
    pointsView: {
        flexDirection: 'row', alignItems: 'center', marginTop: 10

    },
    popupHeading: {
        color: '#ffa183', fontFamily: fonts.PBo, fontSize: 21, marginTop: 20
    },
    tipsBtn: {
        width: 91, height: 32, borderRadius: 20, backgroundColor: '#5b4dbc',
        alignItems: 'center', justifyContent: 'center',
        marginTop: 20, alignSelf: 'flex-end'
    },
    topsBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },


})

export default CC4
