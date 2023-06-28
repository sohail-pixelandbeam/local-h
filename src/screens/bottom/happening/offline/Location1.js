
import Geolocation from '@react-native-community/geolocation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput, PermissionsAndroid, Alert, Dimensions, BackHandler, Platform } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import ReactNativeModal from 'react-native-modal'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import HappeningStep from '../../../../common/HappeningStep'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, LocationIcon, MarkerIcon, MarkerIcon1, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'
import { getHOLPreviousScreen, getUserLocation, useForceUpdate } from '../../../../utils/functions'
import Loader from '../../../../utils/Loader'
import { GooglePlacesAutocomplete } from "fiction-places-autocomplete";
import { Context } from '../../../../Context/DataContext'
import AlertMsg from '../../../../common/AlertMsg'
import GetLocation from 'react-native-get-location'
import { useIsFocused } from '@react-navigation/native'


//  NEXT SCREEN Duration1;

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
var addressTextInputRef;

const Location1 = (props) => {

    const isFocused = useIsFocused();
    const { state, setLocationHappeningData } = useContext(Context)
    const forceUpdate = useForceUpdate();
    const mapViewRef = useRef();
    const googleMapsKey = "AIzaSyCBRIKQu3tgtuEIhUAkIRy1N8pHu_wFYBk"

    const [confirmPopup, setConfirmPopup] = useState(false);
    const [locationDescription, setLocationDescription] = useState('');
    const [selectOnMap, setSelectOnMap] = useState(false);

    const [gpsSettingsPopup, setGpsSettingPopup] = useState(false);

    const [loading, setLoading] = useState(false);
    const [userCoords, setUserCoords] = useState({
        latitude: 0.1,
        longitude: 0.2,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
        locationTitle: ''
    });

    const [userAddress, setUserAddress] = useState({
        country: '', address: '', city: ''
    })



    const requestLocationPermission = async () => {

        var granted;
        if (Platform.OS == 'ios') {
            Geolocation.requestAuthorization()
            return 'granted';
        }

        else {
            granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Access Required',
                    message: 'This App needs to Access your event location',
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                },
            );
        }
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return 'granted';
        } else {
            return 'denied';
        }

        // const granted = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        //     {
        //         title: 'Location Access Required',
        //         message: 'This App needs to Access your event location',
        //         buttonNeutral: "Ask Me Later",
        //         buttonNegative: "Cancel",
        //         buttonPositive: "OK"
        //     },
        // );
        // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //     return 'granted';
        // } else {
        //     return 'denied';
        // }


    }


    function getOneTimeLocation() {

        Geolocation.getCurrentPosition(
            (position) => {
                console.log('position', position)
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                return {
                    lat: currentLatitude,
                    lng: currentLongitude,
                }
            },
            (error) => {
                console.log('this is the error', error)
                Alert.alert('Please enable location');
            },
            {
                enableHighAccuracy: false,
                // timeout: 20000,
                // maximumAge: 20000
            },
        ).catch(error => {
            consle.log('their', error)
        });

    }


    // React.useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', function () {
    //         return true;
    //     })
    // }, []);



    async function handleUserLocation(locationObj) {

        try {
            setLoading(true);

            let loc = await getUserLocation();
            if (loc?.error == '1') {
                setGpsSettingPopup(true);
                return
            }

            const locationObj = {
                latitude: loc.latitude,
                longitude: loc.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
                locationTitle: ''
            }
            setUserCoords(locationObj)
        
            var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + locationObj?.latitude + "," + locationObj?.longitude + "&key=" + googleMapsKey;

            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([]),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    setLoading(false)
                    console.log("I get:");
                    console.log(responseJson.status)

                    if (responseJson.status == "OK") {
                        const address_components = responseJson.results[0].address_components;
                        // let state = address_components[address_components.length - 2].long_name;
                        const country = address_components[address_components.length - 1].long_name;
                        const city = address_components[address_components.length - 3].long_name;
                        const address = responseJson.results[0].formatted_address;
                        setUserAddress({
                            ...userAddress,
                            address: address,
                            city: city,
                            country: country
                        });
                        // forceUpdate();
                        // console.log(userAddress)
                    }

                })
                .catch((error) => {
                    setLoading(false)
                });
            forceUpdate();
        }
        catch (err) {
            setLoading(false)
        }
    }

    function next() {

        // if (locationDescription == '') {
        //     alertRef.alertWithType('error', 'Error', "Please enter happening location description")
        //     return;
        // }
        if (!userCoords?.latitude) {
            alertRef.alertWithType('error', 'Error', 'Please enter or select happening location')
            return;
        }
        if (userAddress.address == '') {
            alertRef.alertWithType('error', 'Error', 'Unfortunately we cannot pickup your address. Please enter address manually')
            addressTextInputRef?.focus();
            return;
        }
        const obj = {
            ...state.locationHappeningDraft,
            enterALocation: userAddress.address,
            conformHappeningLocation: userAddress.address,
            // discribeTheLocaltion: locationDescription,
            location: {
                type: "Point",
                coordinates: [userCoords.latitude, userCoords.longitude]
            },
            // location: {
            //     type: "Point",
            //     coordinates: [userCoords.latitude, userCoords.longitude]
            // }
        }
        setLocationHappeningData(obj);
        navigate('Duration')


    }

    useEffect(() => {
        handleUserLocation();
    }, [isFocused])



    const ConfirmLocationPopup = () => (
        <ReactNativeModal
            isVisible={confirmPopup}
            style={{ flex: 1 }}

        >
            <View style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingTop: 25, paddingBottom: 10, borderRadius: 20, flex: 1 }}>
                <Text style={[styles.popupHeading]}>Confirm this{"\n"}location?</Text>
                <View
                    pointerEvents='none'
                    style={{ flex: 1, alignSelf: 'center', width: '100%', height: 100, borderRadius: 30, overflow: 'hidden', }}>
                    <MapView
                        ref={ref => map = ref}
                        showsUserLocation={false}
                        showsMyLocationButton={false}
                        region={userCoords}
                        provider={PROVIDER_GOOGLE}
                        userLocationAnnotationTitle={null}
                        style={{ width: '100%', height: '100%', }}
                    >
                        <Marker
                            coordinate={{
                                latitude: userCoords.latitude,
                                longitude: userCoords.longitude,
                                latitudeDelta: 0.1,
                                longitudeDelta: 0.1,
                                // locationTitle: 'asd'
                            }}
                            pinColor={acolors.primary}
                            description="custom"
                        >
                            <MarkerIcon1 />
                        </Marker>

                    </MapView>
                </View>

                <View style={{ width: "90%", alignSelf: 'center', backgroundColor: 'white', elevation: 2, borderRadius: 18, paddingHorizontal: 10, paddingVertical: 20, marginTop: -25 }}>
                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 15, color: '#1A1A20', marginTop: 5 }}>{userAddress?.address}</Text>
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 8, color: '#9E9DA6', marginTop: 2 }}>{userAddress?.city}, {userAddress?.country}</Text>
                </View>

                <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => setConfirmPopup(false)}
                        style={[styles.tipsBtn, { backgroundColor: '#FBFBFB', borderWidth: 1, borderColor: '#5B4DBC', marginRight: 10 }]}>
                        <Text style={[styles.topsBtnTitle, { color: '#5B4DBC' }]}>Relocate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setConfirmPopup(false)
                            next()
                        }}
                        style={styles.tipsBtn}>
                        <Text style={styles.topsBtnTitle}>Yes</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ReactNativeModal>
    )


    if (selectOnMap == true) {
        return (
            <ReactNativeModal
                isVisible={selectOnMap}
                style={{ margin: 0, }}
            >
                <View style={{ width: "100%", height: "100%", backgroundColor: 'white' }}>
                    <View style={[{ flex: 1, }]}>
                        {
                            selectOnMap ?
                                <View>
                                    <View style={{
                                        position: "relative", marginTop: 30, borderTopLeftRadius: 10, overflow: "hidden", borderTopRightRadius: 10,
                                    }}>


                                        
                                        <MapView
                                            ref={mapViewRef}
                                            initialRegion={userCoords}
                                            showsUserLocation={true}
                                            showsMyLocationButton={true}
                                            // onRegionChangeComplete={region => {
                                            //     setUserCoords(region)
                                            // }}
                                            region={userCoords}
                                            provider={PROVIDER_GOOGLE}
                                            style={{ width: '100%', height: '100%' }}
                                        >
                                            <Marker
                                                coordinate={{
                                                    latitude: userCoords.latitude,
                                                    longitude: userCoords.longitude,
                                                    latitudeDelta: 0.1,
                                                    longitudeDelta: 0.1,
                                                }}
                                                pinColor={acolors.primary}
                                                description="custom"

                                            >
                                                <MarkerIcon1 />
                                            </Marker>
                                        </MapView>
                                    </View>

                                    <View
                                        style={{ width: viewportWidth, position: 'absolute', top: 30 }}
                                    >
                                        <GooglePlacesAutocomplete
                                            // ref={map}
                                            placeholder={'Search'}
                                            placeholderTextColor="black"
                                            minLength={2} // minimum length of text to search
                                            autoFocus={false}
                                            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                            keyboardAppearance={''} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                                            listViewDisplayed={false}    // true/false/undefined
                                            fetchDetails={true}
                                            renderDescription={row => row.description} // custom description render
                                            onPress={(data, details) => { // 'details' is provided when fetchDetails = true
                                                setUserCoords({
                                                    ...userCoords,
                                                    latitude: details.geometry.location.lat,
                                                    longitude: details.geometry.location.lng,
                                                    locationTitle: data.description
                                                })
                                                forceUpdate();
                                            }}
                                            query={{
                                                // available options: https://developers.google.com/places/web-service/autocomplete
                                                key: googleMapsKey,
                                                language: 'en', // language of the results
                                                // types: '(cities)' // default: 'geocode'
                                                // components: "country:us|country:pk"
                                            }}

                                            styles={{
                                                textInputContainer: {
                                                    width: viewportWidth * (80 / 100), marginLeft: 20, color: 'black', backgroundColor: "#fff",
                                                    borderWidth: 1, borderTopWidth: 1, zIndex: 22, borderBottomWidth: 1, borderBottomColor: "#2a2a2a",
                                                    borderTopColor: "#2a2a2a", borderLeftColor: "#2a2a2a", borderRightColor: "#2a2a2a", marginTop: 10, borderRadius: 4,
                                                },
                                                row: { paddingLeft: viewportWidth * (5 / 100), color: 'black' },
                                                listView: { backgroundColor: "#fff", },
                                                description: { fontFamily: fonts.PMe, color: 'black' },
                                                predefinedPlacesDescription: { color: 'black' },
                                                container: { width: viewportWidth, alignSelf: "center", zIndex: 55555 }
                                            }}
                                            textInput={{ color: 'black' }}
                                            // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                                            // currentLocationLabel="Current location"
                                            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                            GooglePlacesSearchQuery={{
                                                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                                rankby: 'distance',
                                                type: 'cafe'
                                            }}


                                            GooglePlacesDetailsQuery={{
                                                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                                                fields: ['formatted_address', 'geometry'],
                                            }}

                                            // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                                            // predefinedPlaces={[cancel]}

                                            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                                            renderLeftButton={() => (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setSelectOnMap(false)
                                                    }}
                                                    style={{ justifyContent: "center", marginLeft: 15 }}>
                                                    <BackIcon color="black" />
                                                </TouchableOpacity>
                                            )}
                                            renderRightButton={() => null}
                                        />
                                    </View>
                                </View>
                                : null
                        }

                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            forceUpdate();
                            // console.log(userSelectedLocation)
                            handleUserLocation(userCoords);
                            setSelectOnMap(false)

                        }}
                        style={{ height: 49, width: "80%", alignSelf: 'center', position: 'absolute', bottom: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: acolors.primary, marginTop: 20, borderRadius: 9 }}>
                        <Text style={{ fontFamily: fonts.PMe, fontSize: 18, color: '#FFFFFF' }}>Done</Text>
                    </TouchableOpacity>
                </View>

            </ReactNativeModal>


        )
    }



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>


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


            <HappeningHeader
                heading={"Where’s this happening?"}
                desc={"Provide the location information "}
            // headerStyle={{ paddingBottom: 30 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView style={{ flex: 1, }} contentContainerStyle={{ paddingBottom: 100, }} >

                    {/* <Text style={{ fontFamily: fonts.PSBo, fontSize: 15, color: '#2A2A2A' }}>Describe the location</Text> */}
                    {/* <Text style={{ fontFamily: fonts.PRe, fontSize: 11, color: '#828282', marginTop: 5 }}>Get fellows excited about the location of the happening.</Text> */}

                    <View>
                        {/* <TextInput
                            onChangeText={setLocationDescription}
                            placeholder=''
                            textAlignVertical='top'
                            multiline={true}
                            placeholderTextColor={"#2A2A2A"}
                            style={{
                                width: "100%", height: 75, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1, marginTop: 10,
                                fontSize: 12, color: "#2A2A2A", fontFamily: fonts.PRe, paddingHorizontal: 15,
                            }}
                        /> */}
                    </View>
                    <TouchableOpacity
                        onPress={() => handleUserLocation()}
                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <LocationIcon width={10} height={16} />
                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 15, color: '#35208E', textDecorationLine: 'underline', marginLeft: 5 }}>Use my location <Text style={{ textDecorationLine: 'none' }}>or</Text></Text>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity
                            placeholder='Enter Location'
                            onPress={() => setSelectOnMap(true)}
                            textAlignVertical='top'
                            multiline={true}
                            placeholderTextColor={"#2A2A2A"}
                            style={{
                                width: "100%", height: 44, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1, marginTop: 10,
                                fontSize: 12, color: "#2A2A2A", fontFamily: fonts.PRe, paddingHorizontal: 15, justifyContent: 'center'
                            }}
                        >
                            <Text style={{ fontSize: 12, color: "#2A2A2A", fontFamily: fonts.PRe, }}>Enter Location</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        pointerEvents='none'
                        style={{ flex: 1, alignSelf: 'center', width: '100%', height: 200, borderRadius: 30, overflow: 'hidden', marginTop: 25 }}>
                        <MapView
                            ref={ref => map = ref}
                            showsUserLocation={false}
                            showsMyLocationButton={false}
                            region={userCoords}
                            provider={PROVIDER_GOOGLE}
                            userLocationAnnotationTitle={null}
                            style={{ width: '100%', height: '100%', }}
                        // onPress={() => setIsCalloutModal(false)}
                        >

                            <Marker
                                coordinate={{
                                    latitude: userCoords.latitude,
                                    longitude: userCoords.longitude,
                                    latitudeDelta: 0.1,
                                    longitudeDelta: 0.1,
                                }}
                                pinColor={acolors.primary}
                                description="custom"
                                onPress={() => {
                                    setIsCalloutModal(true)
                                    setCalloutParams(v)
                                }}

                            >
                                <MarkerIcon1 />
                                {/* <Text style={{ color: '#121212', fontSize: 10, fontFamily: fonts.PBo, }}>{v.title}</Text> */}
                            </Marker>

                        </MapView>
                    </View>
                    {
                        userAddress &&
                        <View style={{ width: "90%", alignSelf: 'center', backgroundColor: 'white', elevation: 2, borderRadius: 18, paddingHorizontal: 10, paddingVertical: 20, marginTop: -25 }}>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 15, color: '#1A1A20', marginTop: 5 }}>{userAddress?.address}</Text>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 8, color: '#9E9DA6', marginTop: 2 }}>{userAddress?.city}, {userAddress?.country}</Text>
                        </View>
                    }
                </ScrollView>

            </View >

            <HappeningStep
                nextText={"Next"}
                onPress={() => {

                    // if (locationDescription == '') {
                    //     alertRef.alertWithType('error', 'Error', "Please enter happening location description")
                    //     return;
                    // }
                    if (!userCoords?.latitude) {
                        alertRef.alertWithType('error', 'Error', 'Please enter or select happening location')
                        return;
                    }
                    if (userAddress.address == '') {
                        alertRef.alertWithType('error', 'Error', 'Unfortunately we cannot pickup your address. Please enter address manually')
                        addressTextInputRef?.focus();
                        return;
                    }

                    setConfirmPopup(true)
                }}
                step={props?.route?.params?.step}
            />

            {/* <TouchableOpacity
                onPress={() => setConfirmPopup(true)}
                activeOpacity={0.9}
                style={styles.agreeBtn}>
                <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.PRe }}>Step 3/15</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.PRe }}>Next</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </View>
            </TouchableOpacity> */}
            <ConfirmLocationPopup />
            <DropdownAlert ref={(ref) => alertRef = ref} />
            {loading && <Loader />}
        </View >
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#FDFDFD', flex: 1,
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
    themePickerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14,
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        elevation: 2
    },
    themeText: {
        fontSize: 12, color: "#2a2a2a", fontFamily: fonts.MBo, letterSpacing: 0.18,
    },
    languagePickerCircle: {
        width: 37, height: 37, borderRadius: 37 / 2,
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', elevation: 5
    },
    subData: {
        fontFamily: fonts.PRe, color: '#828282', fontSize: 8
    },
    tipsBtn: {
        width: 91, height: 32, borderRadius: 20, backgroundColor: '#5b4dbc',
        alignItems: 'center', justifyContent: 'center',
        marginTop: 20, alignSelf: 'flex-end'
    },
    topsBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },
    popupHeading: {
        color: '#ffa183', fontFamily: fonts.PBo, fontSize: 21, marginTop: 20
    },


})

export default Location1
