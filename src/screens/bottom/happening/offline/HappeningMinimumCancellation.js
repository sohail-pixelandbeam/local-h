// CC STANDS FOR CODE OF CONDUCT

import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput, Platform, BackHandler, SafeAreaView } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { ArrowDown, BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'

import { Context } from '../../../../Context/DataContext'
import { storeItem, useForceUpdate } from '../../../../utils/functions'
import Loader from '../../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import HappeningStep from '../../../../common/HappeningStep'
import AlertPopup from '../../../../common/AlertPopup'


var alertRef;

const HappeningMinimumCancellation = (props) => {


    const forceUpdate = useForceUpdate();

    const { state, setLocationHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);


    const [dNRP, setDNRPosition] = useState() // DOES NOT REPEAT PICKER POSITION
    const [xOffset, setXOffset] = useState(); // SETTING MODAL POSITION FOR DOESNOT REPEAT PICKER
    const [yOffset, setYOffset] = useState();// SETTING MODAL POSITION FOR DOESNOT REPEAT PICKER
    const [pickerModal, setPickerModal] = useState(false);

    const [minimumCancellationPeriod, setMinimumCancellationPeriod] = useState('Hours');
    const [minCancellationTime, setMinCancellationTime] = useState('');

    const repeatOptions = ["Hours ", "Days"];



    // React.useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', function () {
    //         return true;
    //     })
    // }, []);


    function next() {

        if (minimumCancellationPeriod == "") {
            alertRef.alertWithType('error', "Error", "Please enter minimum cancellation period");
            return;
        }
        if (minCancellationTime == "") {
            alertRef.alertWithType('error', "Error", "Please enter minimum cancellation time");
            return;
        }

        const obj = {
            ...state.locationHappeningDraft,
            numberCancellationPeriod: minCancellationTime,
            string: minimumCancellationPeriod
        }
        setLocationHappeningData(obj);
        navigate('SDGLinked')
    }




    const RepeatOnPopup = () => (
        <ReactNativeModal
            isVisible={pickerModal}
            onBackdropPress={() => setPickerModal(false)}
        >
            {/* marginTop: yOffset-50, marginLeft: xOffset+80, */}
            <View style={{  backgroundColor: '#35208E', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, width: "40%" }}>
                {
                    repeatOptions.map((v, i) => {
                        return (
                            <View
                                key={i}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log(v)
                                        setMinimumCancellationPeriod(v)
                                        setPickerModal(false)
                                    }}
                                    style={{ width: "100%", paddingVertical: 7 }}>
                                    <Text style={styles.popupTitle}>{v}</Text>
                                </TouchableOpacity>
                                <View style={styles.pickerSeperator} />
                                <View style={styles.pickerSeperator} />
                            </View>
                        )
                    })
                }
            </View>

        </ReactNativeModal>
    )



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"Cancellation period"}
                desc={"Until when can the fellow cancel"}
                headerStyle={{ paddingTop: 40 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView contentContainerStyle={{ paddingBottom: 350 }}>
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TextInput
                                onChangeText={setMinCancellationTime}
                                keyboardType='number-pad'
                                // placeholder='4'
                                placeholderTextColor={"rgba(0,0,0,0.5)"}
                                style={styles.textInput}
                                textAlign='center'
                            />
                            <TouchableOpacity
                                ref={view => setDNRPosition(view)}
                                onPress={() => {
                                    dNRP.measure((fx, fy, width, height, px, py) => {
                                        if (Platform.OS == 'ios') {
                                            setYOffset(fy)
                                            setXOffset(px + 1)
                                        }
                                        else {
                                            setYOffset(py - 400)
                                            setXOffset(px - 100)
                                        }

                                    })
                                    forceUpdate();
                                    setPickerModal(true)
                                }}
                                style={[styles.shadow, styles.pickerContainer, { marginLeft: 0 }]}>
                                <Text style={[styles.popupTitle, { color: '#2A2A2A' }]}>{minimumCancellationPeriod ?? "Days"}</Text>
                                <ArrowDown style={{ marginLeft: 10 }} />
                            </TouchableOpacity>
                        </View>

                    </View>

                </ScrollView>


            </View>
            <HappeningStep
                nextText={"Next"}
                onPress={() => next()}
                step={props?.route?.params?.step}
            />
            <RepeatOnPopup />
            <AlertPopup ref={(ref) => alertRef = ref} />
            {loading && <Loader />}

        </SafeAreaView>
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
        fontFamily: fonts.MBo, fontSize: 14, color: '#2A2A2A', lineHeight: 15,
    },
    textInput: {
        width: 70, height: 40, paddingHorizontal: 5, fontSize: 14, borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 10,
        color: "#7b7b7b", fontFamily: fonts.MRe,
    },
    msgText: {
        color: '#35208E', fontSize: 8, fontFamily: fonts.MBo, marginTop: 3
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
    inputContainer: {
        flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: 'space-between', marginTop: 15
    },
    textInput: {
        width: 70, height: 40, paddingHorizontal: 5, fontSize: 14, borderRadius: 10, backgroundColor: '#B9B1F0',
        color: "#2A2A2A", fontFamily: fonts.MBo,
    },

    pickerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 36, borderRadius: 10,
        paddingLeft: 8, paddingHorizontal: 10, marginLeft: 10, backgroundColor: '#B9B1F0'
    },
    pickerSeperator: {
        width: "100%", height: 0.5, backgroundColor: 'white',
    },
    popupTitle: {
        fontFamily: fonts.MBo, fontSize: 12, color: 'white'
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.8)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5, elevation: 2,
        backgroundColor: 'white'
    },





})

export default HappeningMinimumCancellation

