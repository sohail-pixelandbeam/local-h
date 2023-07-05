// CC STANDS FOR CODE OF CONDUCT

import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, TextInput, ScrollView, BackHandler } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert'
import ReactNativeModal from 'react-native-modal'
import Modal from 'react-native-modal'
import { goBack, navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, CrossIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, TrashIcon, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'
import { Context } from '../../../../Context/DataContext'
import { urls } from '../../../../utils/Api_urls'
import { getHOLPreviousScreen, useForceUpdate } from '../../../../utils/functions'
import HappeningStep from '../../../../common/HappeningStep'
import AlertPopup from '../../../../common/AlertPopup'


var alertRef;
var textInputRef;
var modalAlertRef;

const CC4 = (props) => {


    const [hostedPoint, setHostedPoint] = useState(0);
    const [errorPopup, setErrorPopup] = useState(false);
    const [errorPopup4, setErrorPopup4] = useState(false);
    const [coHostInfoModal, setGetCoHostInfoModal] = useState(false)
    const [coHostDat, setCoHostData] = useState([]);
    const [selectedCoHost, setSelectedCoHost] = useState([]);
    const { state, setLocationHappeningData } = useContext(Context)

    const forceUpdate = useForceUpdate();



    // React.useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', function () {
    //         return true;
    //     })
    // }, []);

    function search(searchWord) {
        let url = urls.API + 'search-and-filter/filterUserByName/' + searchWord;
        console.log('url==', url)
        fetch(url, {
            method: 'GET'
        })
            .then((response) => response.json())
            // .then((response) => response.text())
            .then((responseJson) => {
                setCoHostData(responseJson.data?.length ? responseJson.data : [])
            })
    }

    function next() {

        if (!selectedCoHost.length) {
            modalAlertRef.alertWithType('error', 'Error', 'Please select any one co host')
            return;
        }
        const selected = selectedCoHost[0]
        const obj = {
            ...state.locationHappeningDraft,
            coHost: selected?.userId?.firstName?.concat(' ' + selected?.userId?.lastName)
        }
        setGetCoHostInfoModal(false);
        console.log('obj,', obj)
        setLocationHappeningData(obj);
        navigate('HappeningTheme')

    }


    const PopupButton = ({ onPress, title, btnStyle }) => (
        <TouchableOpacity
            style={[styles.popupBtn, btnStyle]}
            onPress={onPress}
        >
            <Text style={styles.popupBtnTitle}>{title ? title : "Next"}</Text>
        </TouchableOpacity>
    )



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

    const ErrorPopupModal4 = () => (
        <ReactNativeModal
            isVisible={errorPopup4}

        >
            <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 25, paddingBottom: 10, borderRadius: 20 }}>
                <Text style={[styles.popupHeading]}>We're very sorry, but at least one host should be present at the happening</Text>

                <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {
                            setErrorPopup4(false)
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
                        <TouchableOpacity
                            onPress={() => setHostedPoint(2)}
                            style={styles.pointsView}>
                            {hostedPoint == 2 ? <View style={styles.radioSelected}>
                                <TickIcon color="#fff" width={6.3} height={6.3} />
                            </View> :
                                <View style={styles.radioUnSelected} />}
                            <Text style={[styles.text, { marginLeft: 10 }]}>Yes, I am present at the location with one or more co-hosts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setHostedPoint(3)}
                            style={styles.pointsView}>
                            {hostedPoint == 3 ? <View style={styles.radioSelected}>
                                <TickIcon color="#fff" width={6.3} height={6.3} />
                            </View> :
                                <View style={styles.radioUnSelected} />}
                            <Text style={[styles.text, { marginLeft: 10 }]}>No, I am not present at the location, but another person is</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setHostedPoint(4)}
                            style={styles.pointsView}>
                            {hostedPoint == 4 ? <View style={styles.radioSelected}>
                                <TickIcon color="#fff" width={6.3} height={6.3} />
                            </View> :
                                <View style={styles.radioUnSelected} />}
                            <Text style={[styles.text, { marginLeft: 10 }]}>No, I am not present at the location nor is anybody else.</Text>
                        </TouchableOpacity>


                    </View>
                </ScrollView>

            </View>

            <HappeningStep
                nextText={"Next"}
                onPress={() => {
                    if (hostedPoint == 0) {
                        alertRef.alertWithType('error', "Error", "Please mark any one point")
                        return
                    }
                    if (hostedPoint == 2) {
                        console.log('ues')
                        setGetCoHostInfoModal(true)
                        return;
                    }
                    if (hostedPoint == 3) {
                        setErrorPopup(true);
                        return;
                    }
                    if (hostedPoint == 4) {
                        setErrorPopup4(true);
                        return;
                    }
                    navigate('HappeningTheme')
                }}
                step={props?.route?.params?.step}
            />

            {/* <TouchableOpacity
                onPress={() => {
                    if (hostedPoint == 0) {
                        alertRef.alertWithType('error', "Error", "Please mark any one point")
                        return
                    }
                    if (hostedPoint == 2) {
                        console.log('ues')
                        setGetCoHostInfoModal(true)
                        return;
                    }
                    if (hostedPoint == 3) {
                        setErrorPopup(true);
                        return;
                    }
                    navigate('HappeningTheme')
                }}
                activeOpacity={0.9}
                style={styles.agreeBtn}>
                <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Step {props.route.params?.step}/15</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Next</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </View>
            </TouchableOpacity> */}
            <ErrorPopupModal />
            <ErrorPopupModal4 />
            <AlertPopup ref={(ref) => alertRef = ref} />


            <Modal
                isVisible={coHostInfoModal}
                avoidKeyboard={true}
                backdropColor="#171515"
                backdropOpacity={0.5}
                style={{ margin: 0, }}
                // onBackdropPress={() => setPopup1(!popup1)}
                animationOut="slideOutDown"
            >
                <AlertPopup ref={(ref) => modalAlertRef = ref} />

                <View style={[styles.popupContainer, { paddingBottom: 10 }]}>
                    {/* <BackPopupBtn /> */}
                    {/* <CrossBtn /> */}
                    <TouchableOpacity
                        onPress={() => {
                            setGetCoHostInfoModal(false)
                        }}
                        style={styles.crossBtn}>
                        <CrossIcon />
                    </TouchableOpacity>
                    <Text style={styles.popupHeading}>Select a co-host</Text>
                    {/* <Text style={{ color: '#241414', fontFamily: fonts.MRe, fontSize: 12, }}>Who is going to be present at the happening</Text> */}
                    <View>
                        <TextInput
                            autoFocus={true}
                            placeholder='Search for fellows to join as host'
                            ref={(ref) => textInputRef = ref}
                            placeholderTextColor={"#7b7b7b"}
                            onChangeText={(v) => search(v)}
                            style={{
                                width: "100%", height: 47, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                                fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10, marginTop: 10
                            }}
                        />
                        {
                            coHostDat[0] &&
                            <View style={{ backgroundColor: 'white', elevation: 2, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10 }}>
                                {coHostDat?.map((v, i) => {
                                    console.log('map===', v)
                                    return (
                                        <TouchableOpacity
                                            key={i}
                                            onPress={() => {
                                                if (!selectedCoHost.includes(v)) setSelectedCoHost([...selectedCoHost, v])
                                                textInputRef.clear();
                                                setCoHostData([]);
                                            }}
                                            style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                                            <Image
                                                style={{ width: 30, height: 30, borderRadius: 15 }}
                                                source={{ uri: v?.profileImage }}
                                            />
                                            <Text style={{ color: "black", fontFamily: fonts.PRe, fontSize: 14, marginLeft: 10 }} key={i}>{v?.userId?.firstName?.concat(' ' + v?.userId?.lastName)}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        }
                        {
                            selectedCoHost &&
                            <View style={{}}>
                                {
                                    selectedCoHost?.map((v, i) => {
                                        return (
                                            <TouchableOpacity
                                                key={i}
                                                onPress={() => {
                                                    if (!selectedCoHost.includes(v)) setSelectedCoHost([...selectedCoHost, v])
                                                    textInputRef.clear();
                                                    setCoHostData([]);
                                                }}
                                                style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', alignItems: 'center' }}>
                                                <Image
                                                    style={{ width: 30, height: 30, borderRadius: 15 }}
                                                    source={{ uri: v?.profileImage }}
                                                />
                                                <Text style={{ color: "black", fontFamily: fonts.PRe, fontSize: 14, marginLeft: 10 }} key={i}>{v?.userId?.firstName?.concat(' ' + v?.userId?.lastName)}</Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        let arr = selectedCoHost;
                                                        let findIndex = arr.indexOf(selectedCoHost);
                                                        arr.splice(findIndex, 1);
                                                        setSelectedCoHost(arr);
                                                        forceUpdate();
                                                    }}
                                                    style={{ position: 'absolute', right: 0, width: 40, height: 30, }}>
                                                    <TrashIcon color="black" size={20} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        }

                    </View>
                    <PopupButton
                        onPress={() => next()}
                        btnStyle={{ position: 'relative', marginTop: 130, alignSelf: 'flex-end' }}
                        title="Next"
                    />
                </View>


            </Modal >
        </View >
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


    popupContainer: {
        width: "80%", paddingBottom: 60,
        borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.98)',
        // position: 'absolute', top: 5, 
        alignSelf: 'center', paddingHorizontal: 15
    },
    popupBtn: {
        width: 91, height: 32, borderRadius: 20, backgroundColor: '#5b4dbc',
        position: 'absolute', bottom: 15, right: 10,
        alignItems: 'center', justifyContent: 'center'
    },
    popupBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },
    popupDesc: {
        color: '#241414', fontFamily: fonts.MRe, fontSize: 12, marginTop: Platform.OS == 'ios' ? 5 : 0
    },
    crossBtn: {
        position: 'absolute', top: -20, right: -20, width: 43, height: 43, borderRadius: 43 / 2,
        backgroundColor: 'white', elevation: 2, alignItems: 'center', justifyContent: 'center'
    },

})

export default CC4
