// CC STANDS FOR CODE OF CONDUCT

import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, BackHandler } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'

import { Context } from '../../../../Context/DataContext'
import { storeItem, useForceUpdate } from '../../../../utils/functions'
import Loader from '../../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import HappeningStep from '../../../../common/HappeningStep'



const CC3 = (props) => {


    const [hostedPoint, setHostedPoint] = useState(1);
    const [hostedPointTitle, setHostedPointTitle] = useState('Yes, I have hosted projects before and felt comfortable in doing so.');
    const [errorPopup, setErrorPopup] = useState(false)

    const forceUpdate = useForceUpdate();
    const { state, setHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);


    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function () {
            return true;
        })
    }, []);


    function next() {

        const obj = {
            ...state.happeningDraft,
            haveYouHostedOnlineMeetingsBefore: hostedPointTitle
        }
        setHappeningData(obj);
        navigate('CC4');

    }




    const ErrorPopupModal = () => (
        <ReactNativeModal
            isVisible={errorPopup}
            onBackdropPress={() => setErrorPopup(false)}

        >
            <View style={{ backgroundColor: 'white', paddingHorizontal: 30, paddingTop: 25, paddingBottom: 10, borderRadius: 20 }}>
                <Text style={[styles.popupHeading]}>We’re looking for hosts who have done this before</Text>

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
                heading={"Have you hosted online meetings before?"}
                headerStyle={{ paddingBottom: 30 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView>
                    <View style={{ width: '90%', alignSelf: 'center', }}>
                        <Image
                            style={{ width: "100%", height: 198, borderRadius: 10 }}
                            source={require('../../../../static_assets/CC3.png')}
                        />
                        <Text style={[styles.text, { marginTop: 20, marginBottom: 10 }]}>Fellows feel welcome and invited to contribute. </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setHostedPointTitle('Yes, I have hosted projects before and felt comfortable in doing so.');
                                setHostedPoint(1)
                            }}
                            style={styles.pointsView}>
                            {hostedPoint == 1 ? <View style={styles.radioSelected}>
                                <TickIcon color="#fff" width={6.3} height={6.3} />
                            </View> :
                                <View style={styles.radioUnSelected} />}
                            <Text style={[styles.text, { marginLeft: 10 }]}>Yes, I have hosted projects before and felt comfortable in doing so.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setHostedPointTitle('Yes, I have hosted projects a few times before.');
                                setHostedPoint(2)
                            }}
                            style={styles.pointsView}>
                            {hostedPoint == 2 ? <View style={styles.radioSelected}>
                                <TickIcon color="#fff" width={6.3} height={6.3} />
                            </View> :
                                <View style={styles.radioUnSelected} />}
                            <Text style={[styles.text, { marginLeft: 10 }]}>Yes, I have hosted projects a few times before.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setHostedPointTitle('No, I have not hosted projects before.');
                                setHostedPoint(3)
                            }}
                            style={styles.pointsView}>
                            {hostedPoint == 3 ? <View style={styles.radioSelected}>
                                <TickIcon color="#fff" width={6.3} height={6.3} />
                            </View> :
                                <View style={styles.radioUnSelected} />}
                            <Text style={[styles.text, { marginLeft: 10 }]}>No, I have not hosted projects before.</Text>
                        </TouchableOpacity>


                    </View>
                </ScrollView>

            </View>
            <HappeningStep
                nextText = {"Next"}
                onPress={() => {
                    if (hostedPoint == 3) {
                        setErrorPopup(true);
                        return;
                    }
                    next()

                }}
                step={props?.route?.params?.step}
            />
            {/* <TouchableOpacity
                
                activeOpacity={0.9}
                style={styles.agreeBtn}>
                <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Step 1/15</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Next</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </View>
            </TouchableOpacity> */}
            <ErrorPopupModal />
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

export default CC3
