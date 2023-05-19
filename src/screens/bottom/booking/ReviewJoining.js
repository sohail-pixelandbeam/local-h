import React, { useContext, useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'
import DropdownAlert from 'react-native-dropdownalert'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import ReactNativeModal from 'react-native-modal'
import { Marker } from 'react-native-svg'
import { goBack, navigate } from '../../../../Navigations'
import AlertMsg from '../../../common/AlertMsg'
import HappeningStep from '../../../common/HappeningStep'
import { BackIcon, CalenderHappeningIcon, ClockHappeningIcon, CrossIcon, DrinksIcon, FoodIcon, HappeningLocationIconSmall, HeartIcon, HeartWhiteIcon, InfoIcon, MarkerIcon1, MaxFellowsIcon, PIcon, RattingStartIcon, TickIcon, ToiletIcon, WifiIcon } from '../../../components/Svgs'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import { Context } from '../../../Context/DataContext'
import { apiRequest } from '../../../utils/apiCalls'
import { formatDate } from '../../../utils/functions';
import Loader from '../../../utils/Loader'


var alertRef;
const ReviewJoining = (props) => {

    const { state } = useContext(Context)
    const [infoAlert, setInfoAlert] = useState(false)

    const [agree, setAgree] = useState(false);
    const params = props.route.params?.data;
    const user = params?.userProfileId?.userId;
    const [loading, setLoading] = useState(false);


    function doSendRequest() {

        const reqObj = {
            // "userId": state.userData?._id,
            "happeningId": params?._id,
            "youngsters": params?.youngsters?.length ? params?.youngsters : undefined,
            // "profileAndTimeline": state.profileData?._id,
            "timeZone": params?.timeZone,
            "startTime": params?.startTime,
            "endTime": params?.endTime,
            "startingDate": params?.startingDate,
            "endDate": params?.endDate,
            "fellowWantToComeAlone": props.route.params?.fellowWantToComeAlone,
            "childrens": params?.childrens > 0 ? params?.childrens : undefined,
        }
        setLoading(true);
        apiRequest(reqObj, 'booking/fellowBookingSingleDate')
            .then(data => {
                setLoading(false)
                console.log('data===', data)
                if (data.status) {
                    navigate('RequestSubmitted');
                }
                else {
                    alertRef.alertWithType('error', "Error", data.message)
                }
            })
            .catch(err => {
                console.log('error', err)
                setLoading(false);
            })

    }

    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff', flex: 1, }}>
            {loading && <Loader />}
            <StatusBar
                barStyle={"dark-content"}
                // // translucent={false}
                backgroundColor={"white"}
            />
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <AlertMsg
                heading='Recursive Happening'
                desc="Recursive Happenings happen 
                repeatedly at a specific time - 
                Every day, week, month or year."
                descStyle={{ lineHeight: 22, color: '#5D5760', fontFamily: fonts.PSBo }}
                btnTitle="Done"
                state={infoAlert}
                onBackdropPress={() => setInfoAlert(false)}
                onPress={() => setInfoAlert(false)}
                containerStyle={{ paddingHorizontal: 30, paddingBottom: 70, paddingTop: 20 }}
            />
            <View style={{ width: "90%", alignSelf: 'center' }}>

                <TouchableOpacity
                    onPress={() => goBack()}
                    style={{ marginTop: 20 }} >
                    <BackIcon
                        color={"#5A4CBB"}
                    />
                </TouchableOpacity>

                <Text style={[{ color: '#5A4CBB', fontSize: 23, fontFamily: fonts.PBo, marginTop: 15 }]}>Review Your Joining</Text>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
                    <View style={{ width: "100%", flexDirection: 'row' }}>
                        <Image
                            source={require('../../../static_assets/FeaturedImage.png')}
                            style={{ width: "40%", height: 103, borderRadius: 21, }}
                        />
                        <View style={{ marginLeft: 10, width: "58%" }}>
                            <Text style={[styles.bookingTitle, { width: "90%" }]}>{params?.happeningTitle}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 33, height: 33, borderRadius: 33 / 2, marginRight: 10 }}
                                    source={require('../../../static_assets/profileImg.png')}
                                />
                                <Text style={styles.hostedBy}>Hosted by{"\n"}{user?.userName}</Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{ width: "100%", padding: 20, borderWidth: 1, borderColor: '#40054F', borderRadius: 20, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ width: "50%" }}>
                            {/* <Text style={[styles.headingText, { fontSize: 10 }]}>Every Thursday from 29th Mar</Text> */}
                            <Text style={[styles.headingText, { fontSize: 18 }]}>{params?.startTime} - {params?.endTime}</Text>
                            <Text style={[[styles.regulareText, { fontSize: 10 }]]}>Joining 2 others, 3 more spots avalible</Text>
                        </View>
                        <View>
                            {/* <Text style={[{ color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 12 }]}>1 Adult, 1 youngster{"\n"}2 Children</Text> */}
                        </View>
                    </View>

                    {/* <TouchableOpacity style={[styles.chooseBtn, { marginTop: 5, alignSelf: 'flex-end' }]}>
                        <Text style={{ color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 9, }}>Add dates</Text>
                    </TouchableOpacity> */}
                    {!params?.happeningOnline &&
                        <>
                            <Text style={[styles.headingText, { fontSize: 18, marginTop: 15 }]}>Meet host at</Text>
                            <View
                                // pointerEvents='none'
                                style={{ flex: 1, alignSelf: 'center', width: '100%', height: 200, borderRadius: 30, overflow: 'hidden', marginTop: 15 }}>
                                <MapView
                                    ref={ref => map = ref}
                                    showsUserLocation={false}
                                    showsMyLocationButton={false}
                                    region={{
                                        latitude: params?.location?.coordinates[0] ?? 0,
                                        longitude: params?.location?.coordinates[1] ?? 0,
                                        latitudeDelta: 0.01,
                                        longitudeDelta: 0.01,
                                        locationTitle: ''
                                    }}
                                    provider={PROVIDER_GOOGLE}
                                    userLocationAnnotationTitle={null}
                                    style={{ width: '100%', height: '100%', }}
                                // onPress={() => setIsCalloutModal(false)}
                                >

                                    <Marker
                                        coordinate={{
                                            latitude: params?.location?.coordinates[0] ?? 0,
                                            longitude: params?.location?.coordinates[1] ?? 0,
                                            latitudeDelta: 0.1,
                                            longitudeDelta: 0.1,
                                        }}
                                        pinColor={acolors.primary}
                                        description="custom"
                                        onPress={() => {
                                            // setIsCalloutModal(true)
                                            // setCalloutParams(v)
                                        }}

                                    >
                                        <MarkerIcon1 />
                                        {/* <Text style={{ color: '#121212', fontSize: 10, fontFamily: fonts.PBo, }}>{v.title}</Text> */}
                                    </Marker>

                                </MapView>
                            </View>
                            <View onPress={() => console.log(params)}
                                style={{ width: "100%", alignSelf: 'center', backgroundColor: 'white', elevation: 2, borderRadius: 18, paddingHorizontal: 10, paddingVertical: 10, marginTop: -25 }}>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 15, color: '#1A1A20', marginTop: 5 }}>{params?.conformHappeningLocation}</Text>
                                <Text style={{ fontFamily: fonts.PRe, fontSize: 8, color: '#9E9DA6', marginTop: 2 }}>{params?.city}, {params?.country}</Text>
                            </View>
                        </>}


                    {/* <Image
                        style={{ width: "100%", marginTop: 5, resizeMode: 'stretch' }}
                        source={require('../../../static_assets/location1.png')}
                    /> */}
                    <View style={[styles.shadow, { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginTop: 10 }]}>
                        <Text style={[styles.regulareText, { fontSize: 10, textAlign: 'center' }]}>* This joining can only be cancelled {params?.numberCancellationPeriod} {params?.string} before the start time of happenning.</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity
                            onPress={() => setAgree(!agree)}
                            style={[styles.shadow, { width: 32, height: 32, borderRadius: 32 / 2, alignItems: 'center', justifyContent: 'center' }]}>
                            {agree && <TickIcon />}
                        </TouchableOpacity>
                        <Text style={styles.label}>I agree with the <Text style={{ fontFamily: fonts.PSBo, color: '#5B4DBC' }} onPress={() => navigate('Termandcondition')} >terms and conditions</Text></Text>
                    </View>

                    <View style={[{ marginTop: 30, paddingTop: 10, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingHorizontal: 20, alignItems: 'center', paddingBottom: 10, }]}>
                        <TouchableOpacity
                            onPress={() => {
                                // storeItem('login_data', '');
                                // storeItem('profile_data', '');
                                // changeLoggedIn.changeNow(2);
                            }}
                        >
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 10, color: '#5B4DBC', textDecorationLine: 'underline' }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => doSendRequest()}
                            style={styles.submitHappeningBtn}>
                            <Text style={styles.submitHappeningText}>Send Join Request</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#4F4E50', fontFamily: fonts.PBo, fontSize: 23,
    },
    labelBoldText: {
        color: '#766BC3', fontFamily: fonts.PEBo, fontSize: 12, textAlign: 'center',
    },
    regulareText: {
        color: '#5D5760', fontFamily: fonts.PRe, fontSize: 13
    },
    headingText: {
        color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 16
    },
    xxSmallText: {
        color: '#766BC3', fontFamily: fonts.PRe, fontSize: 8
    },
    xxSmallSemiBoldText: {
        color: '#766BC3', fontFamily: fonts.PSBo, fontSize: 8
    },
    textRed: {
        color: '#BC4D85', fontFamily: fonts.PSBo, fontSize: 11
    },
    spaceBetweenView: {
        width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10
    },
    happeningDetilsInfo1: {
        width: "100%", backgroundColor: 'rgba(238,238,238,0.4)', borderRadius: 10, padding: 10, opacity: 0.7,
        flexDirection: 'row', justifyContent: 'space-around',
    },
    sepearatorVertical: {
        backgroundColor: '#766BC3', height: "100%", width: 1.5, borderRadius: 2
    },
    sepearatorHorizontal: {
        backgroundColor: '#E5E3E3', width: "100%", height: 1, borderRadius: 2
    },
    chooseBtn: {
        width: "20%", alignItems: 'center', justifyContent: 'center', height: 23.48, borderRadius: 18, backgroundColor: '#5B4DBC'
    },
    listImg: {
        width: "100%", height: 231, borderRadius: 25, resizeMode: 'stretch'
    },
    ratingCircleActive: {
        width: 7, height: 7, backgroundColor: '#f4327f', borderRadius: 7 / 2, marginLeft: 3
    },
    ratingCircleInActive: {
        width: 7, height: 7, backgroundColor: 'rgba(244, 50, 127, 0.4)', borderRadius: 7 / 2, marginLeft: 3
    },
    ratingsText: {
        color: '#5d5760', fontFamily: fonts.PMe, fontSize: 7, marginLeft: 5
    },
    listTile: {
        color: '#5d5760', fontFamily: fonts.PMe, fontSize: 13,
    },
    distanceText: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10, color: '#5d5760', fontFamily: fonts.PMe, fontSize: 6, letterSpacing: 0.3,
    },

    categoriesView: {
        width: 93, height: 27, maxWidth: 391, borderRadius: 18, borderColor: '#b9b1f0', borderWidth: 3, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', marginLeft: 0
    },
    categoriesText: {
        color: '#5d5760', fontFamily: fonts.PRe, fontSize: 10,
    },

    popupBtn: {
        width: 91, height: 32, borderRadius: 20, backgroundColor: '#5b4dbc', marginTop: 15, alignSelf: 'flex-end', marginBottom: 20,
        // position: 'absolute', bottom: 15, right: 10,
        alignItems: 'center', justifyContent: 'center'
    },
    popupBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },

    crossBtn: {
        position: 'absolute', top: -20, right: -20, width: 43, height: 43, borderRadius: 43 / 2,
        backgroundColor: 'white', elevation: 2, alignItems: 'center', justifyContent: 'center'
    },

    bookingTitle: {
        color: '#4F4E50', fontFamily: fonts.PBo, fontSize: 19, marginTop: 10,
    },
    hostedBy: {
        color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 11,
    },

    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.8)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5, elevation: 2,
        backgroundColor: 'white'
    },

    checkboxContainer: {
        flexDirection: "row",
        marginTop: 30,
        marginBottom: 10,

    },
    checkbox: {
        alignSelf: "center",
        borderRadius: 20,
        padding: 15,
        backgroundColor: "#ffffff",
        borderWidth: 0,
    },
    label: {
        margin: 8,
        fontFamily: fonts.PSBo,

        color: '#2A2A2A'
    },
    submitHappeningBtn: {
        width: "50%", height: 47, borderRadius: 20, backgroundColor: '#5B4DBC', alignItems: 'center', justifyContent: 'center',
    },
    submitHappeningText: {
        color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 13,
    }



})

export default ReviewJoining
