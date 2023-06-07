import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, Text, TouchableOpacity, Image,
    TextInput, FlatList, ScrollView, StatusBar, SafeAreaView, Platform, Switch, RefreshControl, Linking, Dimensions
} from 'react-native'
import { BackIcon, CrossIcon, DirectionArrow, FilterIcon, HeartBtmIcon, HeartWhiteIcon, MarkerIcon, PlusIcon, SearchIcon, TickIcon, TickIconWhite } from '../../components/Svgs'
import { fonts } from '../../constants/fonts';
import { acolors } from '../../constants/colors';
import Modal, { ReactNativeModal } from "react-native-modal";

import { getUserLocation, months, retrieveItem, storeItem, uploadSingleFile, useForceUpdate } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { urls } from '../../utils/Api_urls';
import { apiRequest } from '../../utils/apiCalls';
import { Context } from '../../Context/DataContext'
import MapView, { Callout, PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { goBack, navigateFromStack } from '../../../Navigations';
import HappeningFilterModal from '../../common/HappeningFilterModal';
import GeneralStatusBar from '../../components/GernalStatusBar';
import AlertMsg from '../../common/AlertMsg';
import GetLocation from 'react-native-get-location';
import { useIsFocused } from '@react-navigation/core';




var alertRef;
var modalAlertRef;
var textInputRef

const HappeningsMap = () => {

    const forceUpdate = useForceUpdate();
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
    const { state, setUserGlobal, userProfileData } = useContext(Context);
    const isFocused = useIsFocused();
    const [userSelectedLocation, setUserSelectedLocation] = useState({
        latitude: 0.00,
        longitude: 0.11,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
        locationTitle: ''
    });

    const [isCalloutModal, setIsCalloutModal] = useState(false);
    const [calloutParams, setCalloutParams] = useState([]);

    const [filterModal, setFilterModal] = useState(false);
    const [filterType, setFilterType] = useState('');
    const [happeningData, setHappeningData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gpsSettingsPopup, setGpsSettingPopup] = useState(false);
    const userData = state.userData;
    const profileData = state.profileData;

    const nearByData = [
        { lat: 33.643497198724, lng: 73.088168073446, title: "Mughees" },
        { lat: 33.651148023765, lng: 73.077061381191, title: "Mughees Abbas" },
        { lat: 31.471123870604, lng: 74.250891599804, title: "Faisal" },
        { lat: 31.58363, lng: 74.998746, title: "Ahsan" },
    ]


    async function getHappeningDataFromServer(lat, lng) {

        setLoading(true);
        const body = {
            latitude: lat,
            longitude: lng
        }
        apiRequest(body , 'geotagging/GetAllNearestHappening', "GET")
            .then(data => {
                setLoading(false);
                if (data.status) {
                    console.log('_____data', data)
                    setHappeningData(data.data);
                }

            })
            .catch(err => {
                console.log('errorr', err)
                setLoading(false)
            })
    }


    function makeFromToMonthDate() {

        let startingDate = calloutParams?.startingDate;
        let endingDate = calloutParams?.endDate;
        let getMonth = endingDate?.substring(5, 7);
        if (getMonth && getMonth[0] == 0) { getMonth = months[getMonth[1] - 1] } else getMonth = months[getMonth];
        if (startingDate && endingDate) return startingDate?.substring(startingDate?.length, startingDate?.length - 2) + "-" + endingDate?.substring(endingDate?.length, endingDate?.length - 2) + "\n" + getMonth;
        else return "12-25\n Dec";

    }


    async function getLocation() {
        let loc = await getUserLocation();
        if (loc?.error == '1') {
            console.log('error_____ ')
            setGpsSettingPopup(true);
            return
        }
        getHappeningDataFromServer(loc?.latitude, loc?.longitude)
        setUserSelectedLocation({
            ...userSelectedLocation,
            latitude: loc?.latitude,
            longitude: loc?.longitude
        })


    }

    useEffect(() => {
        getLocation()
    }, [isFocused])


    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1, }}>
            {loading && <Loader />}
            <GeneralStatusBar backgroundColor='#fff' barStyle='dark-content' />
            <AlertMsg
                heading={"Please enable location to see nearby happenings"}
                desc=""
                isCross={true}
                renderBtn={true}
                // descStyle={{ lineHeight: 22, color: '#5D5760', fontFamily: fonts.PSBo }}
                btnTitle="Enable"
                state={gpsSettingsPopup}
                onBackdropPress={() => setGpsSettingPopup(false)}
                onPress={() => {
                    setGpsSettingPopup(false)
                    GetLocation.openGpsSettings();
                }}

                containerStyle={{ paddingHorizontal: 25, paddingBottom: 50, paddingTop: 10 }}
            />


            <View style={{ flexDirection: 'row', width: "90%", alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => goBack()} >
                    <BackIcon color="black" />
                </TouchableOpacity>
                {profileData?.profileImage &&
                    <Image
                        style={styles.avator}
                        source={{ uri: profileData?.profileImage }} // require('../../assets/img1.png')
                    />
                }
            </View>
            <View style={{ width: "90%", alignSelf: 'center', marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <View style={{ width: "86%" }}>
                    <TextInput
                        style={styles.textbox}
                        placeholder="Search happenings or location"
                        placeholderTextColor={"rgba(255,255,255,1)"}
                    />
                    <TouchableOpacity style={{ position: 'absolute', right: 15, top: 10, }}>
                        <SearchIcon />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setFilterModal(true);
                        setFilterType('All')
                    }}
                    style={{ marginRight: 10 }}>
                    <FilterIcon />
                </TouchableOpacity>
            </View>

            <View style={{ marginLeft: "4%", flexDirection: 'row', marginTop: 10, width: "100%", marginBottom: 0 }}>
                <FlatList
                    contentContainerStyle={{ paddingRight: 50 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={["Categories", "Time of day", "Online", "Languages Spoken"]}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setFilterType(item);
                                setFilterModal(true);
                            }}
                            style={[styles.categoriesView]}>
                            <Text numberOfLines={1} style={styles.categoriesText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <View style={{ flex: 1, alignSelf: 'center', width: '100%', borderRadius: 30, overflow: 'hidden', marginTop: 25 }}>
                <MapView
                    ref={ref => map = ref}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    region={userSelectedLocation}
                    provider={PROVIDER_GOOGLE}
                    userLocationAnnotationTitle={null}
                    style={{ width: '100%', height: '100%', }}
                    onPress={() => setIsCalloutModal(false)}
                >
                    {
                        happeningData?.map((v, i) => {

                            if (v?.location?.coordinates) {
                                return (
                                    <Marker
                                        key={i}
                                        title={v.happeningTitle}
                                        coordinate={{
                                            latitude: v.location?.coordinates[0],
                                            //  parseInt(v.sal_lat),
                                            longitude: v.location?.coordinates[1],
                                            // parseInt(v.sal_lng),
                                            latitudeDelta: 0.1,
                                            longitudeDelta: 0.1,
                                            // locationTitle: 'asd'
                                        }}
                                        pinColor={acolors.primary}
                                        description=""
                                        onPress={() => {
                                            setIsCalloutModal(true)
                                            setCalloutParams(v)
                                        }}

                                    >
                                        <MarkerIcon />
                                        <Text style={{ color: '#121212', fontSize: 10, fontFamily: fonts.PBo, }}>{v.title}</Text>
                                    </Marker>
                                )
                            }
                            else return null
                        }

                        )
                    }

                </MapView>
            </View>

            {
                isCalloutModal &&
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigateFromStack('BookingStack', 'HappeningDetails', calloutParams)}
                    style={{ width: "85%", height: "14%", backgroundColor: 'white', alignSelf: 'center', bottom: 80, position: 'absolute', borderRadius: 20 }}>
                    <View style={{ flexDirection: 'row', width: "100%", flex: 1 }}>
                        <Image
                            style={{ width: "37%", height: "100%", borderTopLeftRadius: 20, borderBottomLeftRadius: 20, resizeMode: 'stretch', }}
                            source={{ uri: calloutParams?.addPhotosOfYourHappening[0] }
                                // require('../../static_assets/FeaturedImage1.png')
                            }
                        />
                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 13, color: '#222222', width: "60%" }}>{calloutParams?.happeningTitle}</Text>
                            <View style={{ paddingVertical: 2, paddingHorizontal: 10, backgroundColor: '#CADCFE', borderRadius: 5, marginTop: 5, width: "60%" }}>
                                <Text style={{ fontFamily: fonts.PBo, fontSize: 9, color: '#5B4DBC' }}>{makeFromToMonthDate()} - {calloutParams?.startTime} - {calloutParams?.endTime}</Text>
                            </View>
                            <View style={{ width: "60%", height: 1.5, backgroundColor: 'rgba(112,112,112,0.2)', marginVertical: 7 }} />
                            <View style={{ width: "60%", flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                                <TouchableOpacity>
                                    <HeartBtmIcon width={16.98} height={15.71} color="#5B4DBC" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                                        const latLng = `${calloutParams?.location?.coordinates[0]},${calloutParams?.location?.coordinates[1]}`;
                                        const label = calloutParams?.happeningTitle;
                                        const url = Platform.select({
                                            ios: `${scheme}${label}@${latLng}`,
                                            android: `${scheme}${latLng}(${label})`
                                        });
                                        Linking.openURL(url);
                                    }}
                                    style={{ flexDirection: 'row', alignItems: 'center', padding: 10, marginTop: -10, marginRight: -5 }}>
                                    <Text style={{ fontFamily: fonts.PBo, fontSize: 9, color: '#5B4DBC', marginRight: 5 }}>Direction</Text>
                                    <DirectionArrow />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </TouchableOpacity>
            }
            <HappeningFilterModal
                isVisible={filterModal}
                filterType={filterType}
                setIsVisible={() => setFilterModal(false)}
            />


        </View >
    )
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5, elevation: 2,
        backgroundColor: 'white'
    },
    hi: { color: '#000000', fontFamily: fonts.PSBo, fontSize: 18 },
    julesRobinson: {
        fontFamily: fonts.PSBo, color: '#ffa183', fontSize: 18
    },
    discoverWhat: {
        color: '#5d5760', fontFamily: fonts.PRe, fontSize: 13,
        // lineHeight: 36,
    },
    avator: {
        width: 56, height: 56, opacity: 0.86, borderRadius: 56 / 2,
        // borderColor: '#7e73c9',
        // borderWidth: 5,
    },
    textbox: {
        width: "100%", height: 44, borderRadius: 22, backgroundColor: '#5b4dbc', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, color: '#ffffff', fontFamily: fonts.PRe, fontSize: 11,
    },
    categoriesView: {
        width: 93, height: 27, maxWidth: 391, borderRadius: 18, borderColor: '#b9b1f0', borderWidth: 3, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', marginLeft: 10,
    },
    categoriesText: {
        color: '#5d5760', fontFamily: fonts.PRe, fontSize: 10,
    },
    headingText: {
        color: '#5d5760', fontFamily: fonts.PSBo, fontSize: 20,
    },

});

export default HappeningsMap


// {/* <View
// onPress={() => {
//     // setIsMapView(false)
//     // forceUpdate();
//     // navigate('SalonDetails', v)
// }}
// style={{ flexDirection: 'row', alignItems: 'center', height: 150, backgroundColor: 'white', width: viewportWidth - 20, borderRadius: 8, paddingVertical: 15, paddingLeft: 15, paddingRight: 10, }}>
// <Text style={{ height: 170, marginTop: -80, }}>
//     {/* <Image
//         style={{ flex: 1, height: 150, borderRadius: 10, width: 130, resizeMode: 'stretch', }}
//         source={{ uri: v?.sal_profile_pic }}
//     /> */}
// </Text>
// <View style={{ marginLeft: 10, flex: 1 }}>
//     <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FCFCFC', }}>{v?.sal_name}</Text>
//     {/* <TouchableOpacity
//         onPress={() => {
//             Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=&destination=${v?.sal_address + ", " + v?.sal_city + ", " + v?.sal_country}`);
//         }} style={{ flexDirection: 'row' }}>
//         <Text numberOfLines={3} style={{ fontFamily: 'PRe', textDecorationLine: 'underline', fontSize: 12, color: '#FCFCFC', marginTop: 5, }}>{v?.sal_address}</Text>
//     </TouchableOpacity> */}
//     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         {/* {v?.sal_ratings == 0 ? <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{"*** (0)"}</Text> :
//             <>
//                 <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{v?.sal_ratings}</Text>
//                 <RattingStarIcon />
//             </>
//         } */}
//         {/* <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{v?.sal_ratings}</Text>
//         <RattingStarIcon /> */}
//         <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View>
//         {/* <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>{v?.distance?.toString() + " mi"}</Text> */}
//     </View>
// </View>
// {/* <View style={{ marginTop: 40 }}>
//     <ArrowForward />
// </View> */}


// </View> */}

// {/* <Callout>
// <View style={{ width: viewportWidth / 2, height: 240, borderRadius: 20, borderRadius: 30, overflow: 'visible', alignItems: 'center', }}>

//     {/* <Text style={{ height: 170, marginTop: -80, }}>
//         <Image
//             style={{ flex: 1, height: 150, borderRadius: 10, width: 130, resizeMode: 'stretch', }}
//             source={require('../../static_assets/FeaturedImage.png')}
//         />
//     </Text> */}

//     <Text style={{ height: 200, marginTop: -100, }}>
//         <Image
//             source={require('../../static_assets/FeaturedImage.png')}
//             style={{ height: 200, width: viewportWidth / 2, borderRadius: 10, resizeMode: 'stretch', borderRadius: 30, }}
//         />
//     </Text>
//     {/* <Text style={[{ width: "90%", color: '#5B4DBC', fontSize: 7, fontFamily: fonts.MBo, marginTop: 10 }]}>OCEAN CLEANING</Text>
//     <Text style={[{ width: "90%", color: '#222222', fontSize: 13, fontFamily: fonts.PSBo, marginTop: 10 }]}>Restore coral reefs in open sea</Text>
//     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <Image
//             style={{ width: 33, height: 33, borderRadius: 33 / 2, marginRight: 10 }}
//             source={require('../../static_assets/profileImg.png')}
//         />
//         <Text style={styles.hostedBy}>Hosted by{"\n"}Sanne de Wit</Text>
//     </View> */}
// </View>
// </Callout> */}