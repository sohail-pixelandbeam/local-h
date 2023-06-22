import React, { useState, useEffect, useContext, useRef } from 'react'
import {
    StyleSheet, View, Text, TouchableOpacity, Image,
    TextInput, FlatList, ScrollView, StatusBar, SafeAreaView, Platform, Switch, RefreshControl, Linking, Dimensions
} from 'react-native'
import { BackIcon, CrossIcon, DirectionArrow, FilterIcon, HeartBtmIcon, HeartFilled, HeartWhiteIcon, MarkerIcon, PlusIcon, SearchIcon, TickIcon, TickIconWhite } from '../../components/Svgs'
import { fonts } from '../../constants/fonts';
import { acolors } from '../../constants/colors';
import Modal, { ReactNativeModal } from "react-native-modal";

import { getHeight, getUserLocation, months, retrieveItem, storeItem, uploadSingleFile, useForceUpdate } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { urls } from '../../utils/Api_urls';
import { apiRequest } from '../../utils/apiCalls';
import { Context } from '../../Context/DataContext'
import MapView, { Callout, PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { goBack, navigate, navigateFromStack } from '../../../Navigations';
import HappeningFilterModal from '../../common/HappeningFilterModal';
import GeneralStatusBar from '../../components/GernalStatusBar';
import AlertMsg from '../../common/AlertMsg';
import GetLocation from 'react-native-get-location';
import { useIsFocused } from '@react-navigation/core';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';


var alertRef;
var modalAlertRef;
var textInputRef

const HappeningsMap = () => {

    const forceUpdate = useForceUpdate();
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
    const { state, setUserGlobal, userProfileData } = useContext(Context);
    const isFocused = useIsFocused();
    const [userSelectedLocation, setUserSelectedLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
        locationTitle: ''
    });

    const mapViewRef = useRef();
    const [isCalloutModal, setIsCalloutModal] = useState(false);
    const [calloutParams, setCalloutParams] = useState([]);

    const [filterModal, setFilterModal] = useState(false);
    const [filterType, setFilterType] = useState('');
    const [happeningData, setHappeningData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gpsSettingsPopup, setGpsSettingPopup] = useState(false);
    const userData = state.userData;
    const profileData = state.profileData;

    const [searchKeyword, setSearchKeyword] = useState('');
    const [calloutIndex, setCalloutIndex] = useState(0);

    const [whishListHappeningId, setWhishListHappeningId] = useState('');
    const [createWishListModal, setCreateWishListModal] = useState(false);
    const [isCreateNewWishlist, setIsCreateNewWishlist] = useState(false);
    const [createNewWishList, setCreateNewWishList] = useState([])
    const [newWhishListName, setNewWhishListName] = useState('');
    const [wishlistId, setWishlistId] = useState('');

    const [foundTheseModal, setFoundTheseModal] = useState(false);




    const nearByData = [
        { lat: 33.643497198724, lng: 73.088168073446, title: "Mughees" },
        { lat: 33.651148023765, lng: 73.077061381191, title: "Mughees Abbas" },
        { lat: 31.471123870604, lng: 74.250891599804, title: "Faisal" },
        { lat: 31.58363, lng: 74.998746, title: "Ahsan" },
    ];


    async function getHappeningDataFromServer() {

        setLoading(true);
        // const body = {
        //     latitude: lat,
        //     longitude: lng
        // }
        // allHappeningOnMapLocation
        apiRequest('', 'geotagging/allHappeningOnMapLocation', "GET")

            .then(data => {
                console.log('data.data', data.data)
                setLoading(false);
                let data1 = data.data;

                for (let key in data1) {

                    if (data1[key].location?.coordinates?.length) {
                        setCalloutParams(data1[key]);
                        setCalloutIndex(key);
                        setUserSelectedLocation({
                            ...userSelectedLocation,
                            latitude: data1[key].location?.coordinates[0],
                            longitude: data1[key].location?.coordinates[1],
                            // latitudeDelta: 0.1,
                            // longitudeDelta: 0.1,
                            locationTitle: ''
                        })
                        break
                    }
                }

                setHappeningData(data.data ?? []);
            })
            .catch(err => {
                console.log('errorr', err)
                setLoading(false)
            })
    }

    async function getNearbyHappenings(lat, lng) {

        setLoading(true);
        const body = {
            latitude: lat,
            longitude: lng
        }

        apiRequest(body, 'geotagging/GetAllNearestHappening', "GET")
            .then(data => {
                setLoading(false);

                var found = false;
                let data1 = data.data;

                for (let key in data1) {
                    if (data1[key].location?.coordinates?.length) {
                        found = true
                        setCalloutParams(data1[key]);
                        setCalloutIndex(key);
                        setUserSelectedLocation({
                            ...userSelectedLocation,
                            latitude: data1[key].location?.coordinates[0],
                            longitude: data1[key].location?.coordinates[1],
                            // latitudeDelta: 0.1,
                            // longitudeDelta: 0.1,
                            locationTitle: ''
                        })
                        break
                    }
                }
                if (!found) {
                    setCalloutParams([]);
                    setCalloutIndex(0);
                }


                setHappeningData(data.data ?? []);
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
        getNearbyHappenings(loc?.latitude, loc?.longitude)
        setUserSelectedLocation({
            ...userSelectedLocation,
            latitude: loc?.latitude,
            longitude: loc?.longitude
        })


    }


    function doFilter(body) {
        setLoading(true)
        const obj = {
            ...body,
            happeningOnLocation: true
        }
        apiRequest(obj, 'search-and-filter/search-happenings', 'GET')
            .then(data => {
                // console.log('data___', data)
                setLoading(false)
                if (data.status) {

                    var found = false;
                    let data1 = data.data;

                    for (let key in data1) {
                        if (data1[key].location?.coordinates?.length) {
                            found = true
                            setCalloutParams(data1[key]);
                            setCalloutIndex(key);
                            setUserSelectedLocation({
                                latitude: data1[key].location?.coordinates[0],
                                longitude: data1[key].location?.coordinates[1],
                                latitudeDelta: 0.1,
                                longitudeDelta: 0.1,
                                locationTitle: ''
                            })
                            break
                        }
                    }
                    if (!found) {
                        setCalloutParams([]);
                        setCalloutIndex(0);
                    }
                    setHappeningData(data?.data.reverse());
                }

            })
    }

    function searchHappening(keyword) {
        const body = {
            keyword: keyword,
            happeningOnLocation: true
        }
        setLoading(true)
        apiRequest(body, 'search-and-filter/search-happenings', 'GET')
            .then(data => {
                setLoading(false)
                if (data.status) {
                    setFoundTheseModal(true);
                    var found = false;
                    let data1 = data.data;

                    for (let key in data1) {
                        if (data1[key].location?.coordinates?.length) {
                            found = true
                            setCalloutParams(data1[key]);
                            setCalloutIndex(key);
                            setUserSelectedLocation({
                                ...userSelectedLocation,
                                latitude: data1[key].location?.coordinates[0],
                                longitude: data1[key].location?.coordinates[1],
                                // latitudeDelta: 0.1,
                                // longitudeDelta: 0.1,
                                locationTitle: ''
                            })
                            break
                        }
                    }
                    if (!found) {
                        setCalloutParams([]);
                        setCalloutIndex(0);
                    }

                    setHappeningData(data?.data.reverse());
                }
            })
            .catch(err => {
                setLoading(false)
            })

    }


    const createNewWhishList = (isAddHappeningToWhishList = false) => {

        if (newWhishListName == '') {
            alertRef.alertWithType('error', 'Error', 'Pleas enter whishlist name');
            return;
        }
        setLoading(true)
        const body = {
            wishlistName: newWhishListName
        };
        apiRequest(body, 'wishlist/create-new-wishlist')
            .then(data => {
                if (isAddHappeningToWhishList && data.status) {
                    addHappeningToWhishList(data.data);
                    setLoading(false)
                    return;
                }
                else {
                    setCreateWishListModal(false);
                    alertRef.alertWithType('error', 'Error', data.message);

                }
                setLoading(false);
            })
    }

    function addHappeningToWhishList(whisList) {

        setLoading(true);
        setCreateWishListModal(false)
        const body = {
            wishlistId: whisList._id ?? wishlistId,
            happeningId: whishListHappeningId,
            wishlistName: whisList?.wishlistName
        }
        apiRequest(body, 'wishlist/save-wishlist-item')
            .then(data => {
                setLoading(false);
                if (data.status == true) {
                    alertRef.alertWithType('success', 'Success', 'Happening added in wishlist');
                    getHappeningDataFromServer();
                    getWhishLists();
                    return
                }
                else {
                    alertRef.alertWithType('error', 'Error', data.message);
                    return
                }

            })
    }



    useEffect(() => {
        // getLocation()
        getHappeningDataFromServer()
    }, [isFocused]);


    const FoundTheseModalView = () => {
        return (
            <ReactNativeModal
                isVisible={foundTheseModal}
                style={{ margin: 0, alignItems: 'flex-end' }}
                swipeDirection={'down'}
                onSwipeComplete={() => setFoundTheseModal(false)}
                onBackdropPress={() => setFilterModal(false)}
                propagateSwipe={true}
            >
                <View style={{ width: "100%", height: getHeight(80), borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: 'white', alignSelf: 'flex-end', bottom: 0, position: 'absolute', paddingHorizontal: 25, paddingTop: 20 }}>
                    <View style={{
                        width: 70,
                        height: 5,
                        borderRadius: 10,
                        backgroundColor: '#EFEFEF',
                        alignSelf: 'center',
                        marginTop: -10
                    }} />
                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 18, color: '#222222', marginTop: 15 }}>We found these</Text>

                    <FlatList
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={happeningData}
                        contentContainerStyle={{ paddingBottom: 120 }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setFoundTheseModal(false);
                                        navigate('HappeningDetails', item)
                                    }}
                                    style={{ width: "48%", marginRight: 10, marginTop: 20 }}>
                                    <Image
                                        source={{ uri: item?.addPhotosOfYourHappening[0] }}
                                        style={styles.listImg}
                                    />

                                    <Text style={styles.listTile}>{item?.happeningTitle}</Text>
                                    <Text style={styles.distanceText}>{item?.distance}</Text>
                                </TouchableOpacity>
                            )
                        }}

                    />



                </View>

            </ReactNativeModal>
        )
    }





    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <FoundTheseModalView />
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


            {/* <View style={{ flexDirection: 'row', width: "90%", alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => goBack()} >
                    <BackIcon color="black" />
                </TouchableOpacity>
                {profileData?.profileImage &&
                    <Image
                        style={styles.avator}
                        source={{ uri: profileData?.profileImage }} // require('../../assets/img1.png')
                    />
                }
            </View> */}
            <View style={{ width: "90%", alignSelf: 'center', marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <View style={{ width: "86%" }}>
                    <View style={{ width: "92%", marginBottom: 10 }}>

                        <TextInput
                            ref={textInputRef}
                            onChangeText={(v) => setSearchKeyword(v)}
                            onSubmitEditing={() => searchHappening(searchKeyword)}
                            style={styles.textbox}
                            placeholder="Search happenings or location"
                            placeholderTextColor={"rgba(255,255,255,1)"}
                        />

                        {
                            searchKeyword.length > 0 ?
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        textInputRef.clear();
                                        setSearchKeyword('');
                                    }}
                                    style={{ position: 'absolute', right: 15, top: 8, }}>
                                    <Entypo name='cross' size={25} color="white" />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{ position: 'absolute', right: 25, top: 12, }}>
                                    <SearchIcon />
                                </TouchableOpacity>
                        }


                        {/* <TouchableOpacity style={{ position: 'absolute', right: 15, top: 10, }}>
                            <SearchIcon />
                        </TouchableOpacity> */}
                    </View>
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

            {/* <View style={{ marginLeft: "4%", flexDirection: 'row', marginTop: 10, width: "100%", marginBottom: 0 }}>
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
            </View> */}

            <View style={{ flex: 1, alignSelf: 'center', width: '100%', borderRadius: 30, overflow: 'hidden', marginTop: 25 }}>

                {isFocused &&
                    <MapView
                        ref={mapViewRef}
                        showsUserLocation={true}
                        // showsMyLocationButton={true}
                        region={userSelectedLocation}
                        provider={PROVIDER_GOOGLE}
                        userLocationAnnotationTitle={null}
                        style={{ width: '100%', height: '87%', flex: 1 }}
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
                                                forceUpdate();
                                                setCalloutParams(v)
                                            }}

                                        >
                                            <MarkerIcon />
                                        </Marker>
                                    )
                                }
                                else return null
                            }

                            )
                        }

                    </MapView>
                }


                {/* <Text style={{ color: '#121212', fontSize: 10, fontFamily: fonts.PBo, }}>{v.title}</Text> */}

                <TouchableOpacity
                    onPress={() => getLocation()}
                    style={{ position: 'absolute', width: "44%", flexDirection: 'row', top: 20, right: 20, alignSelf: 'center', padding: 10, backgroundColor: '#5b4dbc', borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}
                >
                    <Entypo
                        name="location-pin"
                        style={{ marginRight: 3 }}
                        color="white"
                        size={20}
                    />
                    <Text style={{ fontSize: 10, textAlign: 'center', fontFamily: fonts.PMe, color: 'white' }}>Show nearby happenings</Text>

                </TouchableOpacity>

            </View>

            {
                calloutParams?.addPhotosOfYourHappening &&
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigateFromStack('BookingStack', 'HappeningDetails', calloutParams)}
                    style={{ width: "88%", height: "14%", backgroundColor: 'white', alignSelf: 'center', bottom: 90, position: 'absolute', borderRadius: 20 }}>

                    <View style={{ flexDirection: 'row', width: "100%", flex: 1 }}>
                        <Image
                            style={{ width: "37%", height: "100%", borderTopLeftRadius: 20, borderBottomLeftRadius: 20, resizeMode: 'stretch', }}
                            source={{ uri: calloutParams?.addPhotosOfYourHappening && calloutParams?.addPhotosOfYourHappening[0] }
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
                                {
                                    state.userData._id &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            setWhishListHappeningId(calloutParams._id)
                                            if (!calloutParams.isFavorite) {
                                                setCreateWishListModal(true)
                                            }
                                        }}
                                    >
                                        {
                                            calloutParams.isFavorite ?
                                                <HeartFilled color={'red'} />
                                                :
                                                <HeartWhiteIcon color={"grey"} />
                                        }
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity
                                    onPress={() => navigateFromStack('BookingStack', 'HappeningDetails', calloutParams)}

                                    // onPress={() => {
                                    //     const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                                    //     const latLng = `${calloutParams?.location?.coordinates[0]},${calloutParams?.location?.coordinates[1]}`;
                                    //     const label = calloutParams?.happeningTitle;
                                    //     const url = Platform.select({
                                    //         ios: `${scheme}${label}@${latLng}`,
                                    //         android: `${scheme}${latLng}(${label})`
                                    //     });
                                    //     Linking.openURL(url);
                                    // }}
                                    style={{ flexDirection: 'row', alignItems: 'center', padding: 10, marginTop: -10, marginRight: -5 }}>
                                    <Text style={{ fontFamily: fonts.PBo, fontSize: 9, color: '#5B4DBC', marginRight: 5 }}>View happening</Text>
                                    <DirectionArrow />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    <TouchableOpacity
                        onPress={() => {
                            let x = parseInt(calloutIndex) + 1;
                            if (x == happeningData.length - 1) x = 0;
                            

                            if (happeningData[x].location?.coordinates[0]) {
                                setCalloutParams(happeningData[x]);
                                setCalloutIndex(x)
                                setUserSelectedLocation({
                                    ...userSelectedLocation,
                                    latitude: happeningData[x].location?.coordinates[0],
                                    longitude: happeningData[x].location?.coordinates[1],
                                    // latitudeDelta: 0.1,
                                    // longitudeDelta: 0.1,
                                    locationTitle: ''
                                })
                                return;
                            }
                        }}
                        style={{ position: 'absolute', width: "7%", right: 0, height: "100%", alignItems: 'center', justifyContent: 'center' }}
                    >
                        <AntDesign name='right' color={"black"} />
                    </TouchableOpacity>

                </TouchableOpacity>
            }

            <KeyboardAvoidingView
                behavior='position'
            >
                <Modal
                    isVisible={createWishListModal}
                    style={{ margin: 0, alignItems: 'flex-end', justifyContent: 'flex-end' }}
                >
                    {loading && <Loader />}
                    <GeneralStatusBar />

                    <View style={{ alignSelf: 'flex-end', backgroundColor: 'white', width: "100%", borderTopRightRadius: 15, borderTopLeftRadius: 15, padding: 20, minHeight: 400 }}>

                        <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 20, color: '#5D5760' }}>Name this Wishlist</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setCreateWishListModal(false)
                                    setIsCreateNewWishlist(false)
                                }}
                                style={{ width: 28, height: 28, borderRadius: 28 / 2, backgroundColor: '#F08F8F', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: fonts.MBo, color: '#241414', fontSize: 14, marginTop: -2 }}>x</Text>
                            </TouchableOpacity>
                        </View>


                        {
                            isCreateNewWishlist ?
                                <View style={{ height: 400 }}>

                                    <TextInput
                                        onChangeText={setNewWhishListName}
                                        placeholder='e.g. Summer Plans 2022'
                                        placeholderTextColor={'#7B7B7B'}
                                        style={{ width: "100%", height: 44, borderRadius: 12, borderWidth: 1, borderColor: '#2A2A2A', paddingHorizontal: 12, fontFamily: fonts.PRe, fontSize: 12, color: '#222222', marginTop: 20 }}
                                    // maxLength={50}
                                    />
                                    {/* <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: '#7B7B7B', marginTop: 5 }}>50 characters maximum</Text> */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            createNewWhishList(true);
                                            // setCreateNewWishList(false) 
                                        }}
                                        style={{ width: 157, height: 36, backgroundColor: '#5B4DBC', borderRadius: 25, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 50 }}>
                                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 12, color: '#FFFFFF', }}>Create & add</Text>
                                    </TouchableOpacity>




                                </View>
                                :

                                <>
                                    <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', marginTop: 20 }}>
                                        <TouchableOpacity
                                            onPress={() => { setIsCreateNewWishlist(true) }}
                                            style={{ width: 63, height: 52, borderRadius: 12, borderWidth: 1, borderColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center' }}>
                                            <PlusIcon />
                                        </TouchableOpacity>
                                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 20, color: '#5D5760', marginLeft: 10, }}>Create New</Text>
                                    </View>
                                    {state.whishLists && state.whishLists.length > 0 && <Text style={{ fontFamily: fonts.PSBo, fontSize: 15, color: '#5D5760', marginTop: 10, }}>or select from existing</Text>}
                                    <View style={{ maxHeight: 400 }}>
                                        <ScrollView contentContainerStyle={{ paddingBottom: 30 }} >
                                            {
                                                state.whishLists?.map((v, i) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => addHappeningToWhishList(v)}
                                                            style={[styles.shadow, { width: "95%", alignSelf: 'center', padding: 10, paddingVertical: 20, borderRadius: 10, marginTop: 20, flexDirection: 'row', alignItems: 'center' }]}
                                                        // onPress={() => navigate('AllWishList')}
                                                        >
                                                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 12, color: '#2A2A2A', marginLeft: 10 }}>{v.wishlistName}</Text>
                                                        </TouchableOpacity>
                                                        // <TouchableOpacity style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: acolors.lighGrey }}>
                                                        //     <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#2A2A2A', }}>{v.wishlistName}</Text>
                                                        // </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>
                                    {/* <TouchableOpacity
                                        style={[styles.shadow, { shadowColor: 'rgba(0,0,0,0.8)', padding: 10, borderRadius: 10, marginTop: 20, width: "100%", flexDirection: 'row', alignItems: 'center' }]}
                                    // onPress={() => navigate('AllWishList')}
                                    >
                                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 12, color: '#2A2A2A', marginLeft: 10 }}>Summer Plans Wishlist</Text>
                                    </TouchableOpacity> */}

                                    {/* <TouchableOpacity
                                        style={[styles.shadow, { shadowColor: 'rgba(0,0,0,0.8)', padding: 10, borderRadius: 10, marginTop: 20, width: "100%", flexDirection: 'row', alignItems: 'center' }]}
                                    // onPress={() => navigate('AllWishList')}
                                    >
                                        <View style={{ borderWidth: 1, borderColor: '#2A2A2A', width: "40%", borderRadius: 15, padding: 1 }}>
                                            <Image
                                                style={{ width: "100%", borderRadius: 10, height: 92 }}
                                                source={require('../../static_assets/wishListImg.png')}
                                            />
                                        </View>
                                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 12, color: '#2A2A2A', marginLeft: 10 }}>Winter Plans Wishlist</Text>
                                    </TouchableOpacity> */}
                                </>
                        }


                    </View>
                </Modal>
            </KeyboardAvoidingView>


            <HappeningFilterModal
                onDone={doFilter}
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
    listImg: {
        width: "100%", height: 231, borderRadius: 25,
        // resizeMode: 'stretch',
    },
    listTile: {
        color: '#5d5760', fontFamily: fonts.PMe, fontSize: 13, marginTop: 10
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