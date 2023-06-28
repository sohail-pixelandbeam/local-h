import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, Text, TouchableOpacity, Image,
    TextInput, FlatList, ScrollView, StatusBar, SafeAreaView, Platform, Switch, RefreshControl, Keyboard,
    KeyboardAvoidingView
} from 'react-native'
import { BackIcon, CrossIcon, EditPencilIcon, FilterIcon, HeartWhiteIcon, PlusIcon, SearchIcon, TickIcon, TickIconWhite, HeartFilled } from '../../components/Svgs'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

import { fonts } from '../../constants/fonts';
import { acolors } from '../../constants/colors';
import Modal from "react-native-modal";
import PrivacyPicker from '../../components/PrivacyPicker';

import { getHeight, getUserLocation, getWidth, retrieveItem, storeItem, uploadSingleFile, useForceUpdate } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { urls } from '../../utils/Api_urls';
import { apiRequest } from '../../utils/apiCalls';
import { Context } from '../../Context/DataContext'

import RangeSlider from 'rn-range-slider';
import { goBack, navigate, navigateFromStack } from '../../../Navigations';
import HappeningFilterModal from '../../common/HappeningFilterModal';
import GeneralStatusBar from '../../components/GernalStatusBar';
import { useIsFocused } from '@react-navigation/native'
import ProfileCompletionSteps from '../../components/ProfileCompletionSteps'





var alertRef;
var modalAlertRef;
var textInputRef;
const Home = () => {


    const isFocused = useIsFocused();


    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal, userProfileData, setHappeningSubmissionDataGlobal, setWhishListsGlobal } = useContext(Context)
    const [loading, setLoading] = useState(false);




    const [loginData, setLoginData] = useState();
    const [profileData, setProfileData] = useState();

    // Preferences Popup


    // USER PROFILE DATA STATES TO STORE ON SERVER

    const [refreshing, setRefreshing] = React.useState(false);


    const [createWishListModal, setCreateWishListModal] = useState(false);

    const [isCreateNewWishlist, setIsCreateNewWishlist] = useState(false);


    const [filterModal, setFilterModal] = useState(false);
    const [filterType, setFilterType] = useState('');



    const [allHappenings, setAllHappenings] = useState([]);
    const [todayHappening, setTodayHappening] = useState([]);
    const [happeningForYou, setHappeningForYou] = useState([]);

    const [newWhishListName, setNewWhishListName] = useState('');
    const [whishListHappeningId, setWhishListHappeningId] = useState('');
    const [wishlistId, setWishlistId] = useState('');

    const [searchKeyword, setSearchKeyword] = useState('');

    const [isSearched, setIsSearched] = useState(false);

    const [localStories, setLocalStories] = useState([]);


    async function getProfileDetails() {
        setLoading(true);
        apiRequest('', 'auth/getUserDetails', 'GET')
            .then(async data => {
                setLoading(false);
                if (data.status && data.data) {
                    setLoginData(data.data?.userProfile?.userId);
                    let token = await retrieveItem('login_data');
                    let userData = { ...data.data.loginUser, token: token.token }
                    storeItem('login_data', userData)
                    storeItem('profile_data', data.data.userProfile)
                    setUserGlobal(data.data.loginUser)
                    userProfileData(data.data.userProfile)
                    // goBack();
                    setLoading(false);
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    };

    async function getHappeningDataFromServer(refresh = false) {

        if (!refresh) setLoading(true);
        // const userLocation = await getUserLocation();
        // const reqObj = { latitude: userLocation?.latitude, longitude: userLocation?.longitude, };
        // showAllhappning
        // setLoading(true);
        apiRequest('', 'showAllhappning', "GET")
            .then(data => {
                setLoading(false);
                setRefreshing(false)
                if (data.status) {
                    let data1 = data?.data;
                    console.log('_____________data______________', data1)
                    setAllHappenings(data1?.allHappenings.reverse());
                    setHappeningForYou(data1.happeningsLikeYou);
                    setTodayHappening(data1.todaysHappenings);
                    // setHappeningTodayData(data.today);
                    // setHappeningNearbyData(data.nearHappenings)
                }

            })
            .catch(err => {
                console.log('errorr', err)
                setLoading(false)
            })
    }


    async function getLocalStories(refresh = false) {
        if (!refresh) setLoading(true);
        apiRequest('', 'get-all-blog', "GET")
            .then(data => {
                setLoading(false);
                setRefreshing(false)
                if (data.status) {
                    let data1 = data?.data
                    setLocalStories(data1?.reverse());
                }
            })
            .catch(err => {
                console.log('errorr', err)
                setLoading(false)
            })
    }


    async function getHappeningSubmissionData(refresh = false) {

        setLoading(true);
        apiRequest('', 'getHappeningSubmissionData', "GET")
            .then(data => {
                setLoading(false);
                if (data.status) {
                    setHappeningSubmissionDataGlobal(data.data)
                }
            })
            .catch(err => {
                console.log('errorr', err)
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

    function getWhishLists() {

        setCreateWishListModal(false)
        apiRequest('', 'wishlist/wishlist-list', 'GET')
            .then(data => {
                setLoading(false);
                if (data.status == true) {
                    setWhishListsGlobal(data.data ? data.data.reverse() : []);
                }
                else {
                    alertRef.alertWithType('error', 'Error', data.message);
                    return
                }

            })
    }






    async function getLoginAndProfileDataFromLocal() {
        retrieveItem('login_data')
            .then(data => {
                setUserGlobal(data)
            })
        let profileData = await retrieveItem('profile_data')
        userProfileData(profileData)
        setProfileData(profileData);
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getHappeningDataFromServer(true)
        // wait(2000).then(() => setRefreshing(false));
    }, []);


    async function getLocation() {
        let loc = await getUserLocation();
    }





    function doFilter(body) {

        // const body = {
        //     // themeOfYourHappening: theme,
        //     startTime: fromTime,
        //     endTime: endTime
        // }
        console.log('___body___', body)
        setLoading(true)
        apiRequest(body, 'search-and-filter/search-happenings', 'GET')
            .then(data => {
                // console.log('data___', data)
                setLoading(false)
                if (data.status) {
                    setAllHappenings(data?.data.reverse());
                }

            })

    }

    function searchHappening(keyword) {

        const body = {
            keyword: keyword,
        }
        setLoading(true)
        apiRequest(body, 'search-and-filter/search-happenings', 'GET')
            .then(data => {
                setLoading(false)
                if (data.status) {
                    setIsSearched(true);
                    setAllHappenings(data?.data.reverse());
                }
            })
            .catch(err => {
                setLoading(false)
            })

    }


    useEffect(() => {
        // setPopup1(false)
        // setPopupCases()
        // setPopup1(false)
        // setPopupCases()
        getHappeningDataFromServer();
        getLocalStories()
        getHappeningSubmissionData();
        retrieveItem('login_data')
            .then(data => {
                if (data) {
                    // makeStaticArrays();
                    getLoginAndProfileDataFromLocal();
                    // checkProfileCompletionSteps()
                    FilterHeader.showCrossBtn = true;
                    getProfileDetails();
                    getWhishLists();

                }
            })
    }, [])

    useEffect(() => {
        getHappeningDataFromServer(true);
        getLocalStories(true)
    }, [isFocused])







    const FilterHeader = (props) => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={{ fontFamily: fonts.PSBo, fontSize: 20, color: '#5D5760', }}>{props.title}</Text>
            {
                props.showCrossBtn &&
                <TouchableOpacity
                    onPress={() => {
                        setFilterModal(false)
                    }}
                    style={{ width: 28, height: 28, borderRadius: 28 / 2, backgroundColor: '#F08F8F', alignItems: 'center', justifyContent: 'center' }}>
                    <CrossIcon width={10} height={18} color="#241414" />
                </TouchableOpacity>
            }

        </View>
    )

    if (isSearched) {
        return (
            <View style={{ backgroundColor: '#ffffff', flex: 1, }}>
                <GeneralStatusBar backgroundColor='#fff' barStyle='dark-content' />
                <ProfileCompletionSteps />
                <TouchableOpacity
                    disabled={true}
                    onPress={() => Keyboard.dismiss()}
                    activeOpacity={1}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setSearchKeyword('')
                            setIsSearched(false)
                        }}
                        style={{ width: "90%", alignSelf: 'center' }}>
                        <BackIcon color="black" />
                    </TouchableOpacity>
                    <View style={{ width: "90%", alignSelf: 'center', marginTop: loginData ? 10 : 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                        <View style={{ width: "92%", marginBottom: 10 }}>
                            <TextInput
                                style={styles.textbox}
                                onChangeText={(v) => setSearchKeyword(v)}
                                value={searchKeyword}
                                onSubmitEditing={() => searchHappening(searchKeyword)}
                                placeholder="Search happenings, fellows"
                                placeholderTextColor={"rgba(255,255,255,1)"}
                            />
                            {
                                searchKeyword.length > 0 ?
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => setSearchKeyword('')}
                                        style={{ position: 'absolute', right: 15, top: 15, }}>
                                        <Entypo name='cross' size={25} color="white" />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{ position: 'absolute', right: 25, top: 15, }}>
                                        <SearchIcon />
                                    </TouchableOpacity>
                            }
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setFilterType('All');
                                setFilterModal(true);
                            }}
                            style={{ marginRight: 10 }}>
                            <FilterIcon />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "90%", alignSelf: 'center' }}>
                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 18, color: '#222222', marginBottom: 10 }}>Found {allHappenings.length} results</Text>
                        <FlatList
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            data={allHappenings}
                            contentContainerStyle={{ paddingBottom: getHeight(44) }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => loginData ? navigateFromStack('BookingStack', 'HappeningDetails', item) : navigate('HappeningDetails', item)}

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


                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <GeneralStatusBar backgroundColor='#fff' barStyle='dark-content' />
            <ProfileCompletionSteps />
            <TouchableOpacity
                disabled={true}
                onPress={() => Keyboard.dismiss()}
                activeOpacity={1}
            >
                {
                    loginData &&

                    <View style={{ flexDirection: 'row', width: "90%", alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.hi}>Hi<Text style={styles.julesRobinson}> {loginData?.firstName} {loginData?.lastName} </Text></Text>
                            <Text style={styles.discoverWhat}>Discover what’s happening</Text>
                        </View>
                        {profileData?.profileImage &&
                            <TouchableOpacity
                                onPress={() => navigate('Profilee')}
                            >
                                <Image
                                    style={styles.avator}
                                    source={{ uri: profileData?.profileImage }} // require('../../assets/img1.png')
                                />
                            </TouchableOpacity>
                        }
                    </View>
                }
                <View style={{ width: "90%", alignSelf: 'center', marginTop: loginData ? 10 : 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                    <View style={{ width: "92%", marginBottom: 10 }}>
                        <TextInput
                            style={styles.textbox}
                            onChangeText={(v) => setSearchKeyword(v)}
                            value={searchKeyword}
                            onSubmitEditing={() => searchHappening(searchKeyword)}
                            placeholder="Search happenings, fellows"
                            placeholderTextColor={"rgba(255,255,255,1)"}
                        />
                        {
                            searchKeyword.length > 0 ?
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => setSearchKeyword('')}
                                    style={{ position: 'absolute', right: 15, top: 15, }}>
                                    <Entypo name='cross' size={25} color="white" />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{ position: 'absolute', right: 25, top: 15, }}>
                                    <SearchIcon />
                                </TouchableOpacity>
                        }
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setFilterType('All');
                            setFilterModal(true);
                        }}
                        style={{ marginRight: 10 }}>
                        <FilterIcon />
                    </TouchableOpacity>
                </View>
                {/* <View style={{ marginLeft: "4%", flexDirection: 'row', marginTop: 20, width: "100%", marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', width: "90%", alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.hi}>Hi<Text style={styles.julesRobinson}> {loginData?.firstName} {loginData?.lastName} </Text></Text>
                            <Text style={styles.discoverWhat}>Discover what’s happening</Text>
                        </View>
                        {profileData?.profileImage &&
                            <TouchableOpacity
                                onPress={() => navigate('Profilee')}
                            >
                                <Image
                                    style={styles.avator}
                                    source={{ uri: profileData?.profileImage }} // require('../../assets/img1.png')
                                />
                            </TouchableOpacity>
                        }
                    </View>
                }
                <View style={{ width: "90%", alignSelf: 'center', marginTop: loginData ? 10 : 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                    <View style={{ width: "92%", }}>
                        <TextInput
                            style={styles.textbox}
                            onChangeText={(v) => setSearchKeyword(v)}
                            value={searchKeyword}
                            onSubmitEditing={() => searchHappening(searchKeyword)}
                            placeholder="Search happenings, fellows"
                            placeholderTextColor={"rgba(255,255,255,1)"}
                        />
                        {
                            searchKeyword.length > 0 ?
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => setSearchKeyword('')}
                                    style={{ position: 'absolute', right: 15, top: 15, }}>
                                    <Entypo name='cross' size={25} color="white" />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{ position: 'absolute', right: 25, top: 15, }}>
                                    <SearchIcon />
                                </TouchableOpacity>
                        }
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setFilterType('All');
                            setFilterModal(true);
                        }}
                        style={{ marginRight: 10 }}>
                        <FilterIcon />
                    </TouchableOpacity>
                </View>
                {/* <View style={{ marginLeft: "4%", flexDirection: 'row', marginTop: 20, width: "100%", marginBottom: 10 }}>
                <FlatList
                    contentContainerStyle={{ paddingRight: 50 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={["Theme", "Time of day", "Online", "Languages Spoken"]}
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

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 450 }}
                >


                    <View style={{ width: "85%", alignSelf: 'center', }}>
                        {/* <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 0, justifyContent: 'space-between' }}> */}
                        {/* <Text style={styles.headingText}>Happening Today</Text> */}


                        {/* </View> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", alignSelf: 'center', marginVertical: 15, alignItems: 'center' }}>
                            {/* <View style={{ width: "85%", alignSelf: 'center', }}> */}
                            <Text style={[styles.headingText,]}>All<Text style={styles.heading2ndText}> Happenings</Text> </Text>
                            {/* </View> */}
                            <TouchableOpacity
                                onPress={() => {
                                    navigateFromStack('BookingStack', 'SeeAllHappeningsToday', {
                                        title: "All Happenings",
                                        data: allHappenings
                                    })
                                }}
                                style={{ alignSelf: 'flex-end' }} >
                                <Text style={styles.seeAll}>See all</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "100%" }}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                data={allHappenings}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => loginData ? navigateFromStack('BookingStack', 'HappeningDetails', item) : navigate('HappeningDetails', item)}
                                            style={{ width: getWidth(40), marginLeft: 10, }}
                                        >
                                            <Image
                                                source={{ uri: item.addPhotosOfYourHappening[0] }}
                                                style={styles.listImg}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setWhishListHappeningId(item._id)
                                                    if (!item.isFavorite) {
                                                        setCreateWishListModal(true)
                                                    }
                                                }}
                                                style={{ position: 'absolute', top: 10, right: 5, padding: 10 }}>
                                                {
                                                    item.isFavorite ?
                                                        <HeartFilled color={'red'} />
                                                        :
                                                        <HeartWhiteIcon color={"white"} />
                                                }

                                            </TouchableOpacity>
                                            {/* <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                    {
                                        [1, 2, 3, 4, 5].map((v, i) => (
                                            <View style={i == 4 ? styles.ratingCircleInActive : styles.ratingCircleActive}></View>
                                        ))
                                    }
                                    <Text style={styles.ratingsText}>34 Ratings</Text>
                                </View> */}
                                            <Text style={styles.listTile}>{item.happeningTitle}</Text>
                                            {/* <Text style={styles.distanceText}>{item.distance}</Text> */}
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                        {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%", justifyContent: 'space-between', marginTop: 10 }}>
                            {
                                allHappenings?.map((item, index) => {
                                    // if (index > 1) return;
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => loginData ? navigateFromStack('BookingStack', 'HappeningDetails', item) : navigate('HappeningDetails', item)}
                                            style={{ width: "48%", }}>
                                            <Image
                                                source={{ uri: item.addPhotosOfYourHappening[0] }}
                                                style={styles.listImg}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setWhishListHappeningId(item._id)
                                                    if (!item.isFavorite) {
                                                        setCreateWishListModal(true)
                                                    }
                                                }}
                                                style={{ position: 'absolute', top: 10, right: 5, padding: 10 }}>
                                                {
                                                    item.isFavorite ?
                                                        <HeartFilled color={'red'} />
                                                        :
                                                        <HeartWhiteIcon color={"white"} />
                                                }

                                            </TouchableOpacity>
                                            <Text style={styles.listTile}>{item.happeningTitle}</Text>
                                            <Text style={styles.distanceText}>{item.distance}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }




                        </View> */}
                    </View>





                    <View style={{ width: "85%", alignSelf: 'center', }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", alignSelf: 'center', marginVertical: 15, alignItems: 'center' }}>
                            {/* <View style={{ width: "85%", alignSelf: 'center', }}> */}
                            <Text style={[styles.headingText]}>Happening <Text style={styles.heading2ndText}>Today</Text> </Text>
                            {/* </View> */}
                            <TouchableOpacity
                                onPress={() => {
                                    navigateFromStack('BookingStack', 'SeeAllHappeningsToday', {
                                        title: "Happening today",
                                        data: todayHappening
                                    })
                                }}
                                style={{ padding: 10, alignSelf: 'flex-end' }} >
                                <Text style={styles.seeAll}>See all</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "100%" }}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                data={todayHappening}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => loginData ? navigateFromStack('BookingStack', 'HappeningDetails', item) : navigate('HappeningDetails', item)}
                                            style={{ width: getWidth(40), marginLeft: 10, }}
                                        >
                                            <Image
                                                source={{ uri: item.addPhotosOfYourHappening[0] }}
                                                style={styles.listImg}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setWhishListHappeningId(item._id)
                                                    if (!item.isFavorite) {
                                                        setCreateWishListModal(true)
                                                    }
                                                }}
                                                style={{ position: 'absolute', top: 10, right: 5, padding: 10 }}>
                                                {
                                                    item.isFavorite ?
                                                        <HeartFilled color={'red'} />
                                                        :
                                                        <HeartWhiteIcon color={"white"} />
                                                }
                                            </TouchableOpacity>
                                            {/* <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                    {
                                        [1, 2, 3, 4, 5].map((v, i) => (
                                            <View style={i == 4 ? styles.ratingCircleInActive : styles.ratingCircleActive}></View>
                                        ))
                                    }
                                    <Text style={styles.ratingsText}>34 Ratings</Text>
                                </View> */}
                                            <Text style={styles.listTile}>{item.happeningTitle}</Text>
                                            {/* <Text style={styles.distanceText}>{item.distance}</Text> */}
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                        {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%", justifyContent: 'space-between', marginTop: 10 }}>
                            {
                                allHappenings?.map((item, index) => {
                                    // if (index > 1) return;
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => loginData ? navigateFromStack('BookingStack', 'HappeningDetails', item) : navigate('HappeningDetails', item)}
                                            style={{ width: "48%", }}>
                                            <Image
                                                source={{ uri: item.addPhotosOfYourHappening[0] }}
                                                style={styles.listImg}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setWhishListHappeningId(item._id)
                                                    if (!item.isFavorite) {
                                                        setCreateWishListModal(true)
                                                    }
                                                }}
                                                style={{ position: 'absolute', top: 10, right: 5, padding: 10 }}>
                                                {
                                                    item.isFavorite ?
                                                        <HeartFilled color={'red'} />
                                                        :
                                                        <HeartWhiteIcon color={"white"} />
                                                }

                                            </TouchableOpacity>
                                            <Text style={styles.listTile}>{item.happeningTitle}</Text>
                                            <Text style={styles.distanceText}>{item.distance}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }




                        </View> */}
                    </View>

                    <View style={{ width: "85%", alignSelf: 'center', }}>
                        <Text style={[styles.headingText, { marginVertical: 15, }]}>Local<Text style={styles.heading2ndText}> Stories</Text></Text>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={localStories}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => navigate('StoryDetails', item)}
                                        style={{ width: getWidth(50), marginLeft: 10, }}
                                    >
                                        <Image
                                            source={{ uri: item.blog_photo[0] }}
                                            style={styles.listImg}
                                        />
                                        <View style={styles.storyTitleContainer}>
                                            <Text style={styles.storyTitle}>{item.blog_top_head_line}</Text>
                                        </View>
                                    </TouchableOpacity>

                                )
                            }}

                        />
                    </View>

                    <View style={{ width: "85%", alignSelf: 'center', }}>
                        {/* <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 0, justifyContent: 'space-between' }}> */}
                        {/* <Text style={styles.headingText}>Happening Today</Text> */}


                        {/* </View> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", alignSelf: 'center', marginVertical: 15, alignItems: 'center' }}>
                            {/* <View style={{ width: "85%", alignSelf: 'center', }}> */}
                            <Text style={[styles.headingText,]}>Happenings <Text style={styles.heading2ndText}>for you</Text> </Text>
                            {/* </View> */}
                            <TouchableOpacity
                                onPress={() => {
                                    navigateFromStack('BookingStack', 'SeeAllHappeningsToday', {
                                        title: "Happenings for you",
                                        data: happeningForYou
                                    })
                                }}
                                style={{ alignSelf: 'flex-end' }} >
                                <Text style={styles.seeAll}>See all</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "100%" }}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                data={happeningForYou}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => loginData ? navigateFromStack('BookingStack', 'HappeningDetails', item) : navigate('HappeningDetails', item)}
                                            style={{ width: getWidth(40), marginLeft: 10, }}
                                        >
                                            <Image
                                                source={{ uri: item.addPhotosOfYourHappening[0] }}
                                                style={styles.listImg}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setWhishListHappeningId(item._id)
                                                    if (!item.isFavorite) {
                                                        setCreateWishListModal(true)
                                                    }
                                                }}
                                                style={{ position: 'absolute', top: 10, right: 5, padding: 10 }}>
                                                {
                                                    item.isFavorite ?
                                                        <HeartFilled color={'red'} />
                                                        :
                                                        <HeartWhiteIcon color={"white"} />
                                                }

                                            </TouchableOpacity>
                                            {/* <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                    {
                                        [1, 2, 3, 4, 5].map((v, i) => (
                                            <View style={i == 4 ? styles.ratingCircleInActive : styles.ratingCircleActive}></View>
                                        ))
                                    }
                                    <Text style={styles.ratingsText}>34 Ratings</Text>
                                </View> */}
                                            <Text style={styles.listTile}>{item.happeningTitle}</Text>
                                            {/* <Text style={styles.distanceText}>{item.distance}</Text> */}
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                        {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%", justifyContent: 'space-between', marginTop: 10 }}>
                            {
                                allHappenings?.map((item, index) => {
                                    // if (index > 1) return;
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => loginData ? navigateFromStack('BookingStack', 'HappeningDetails', item) : navigate('HappeningDetails', item)}
                                            style={{ width: "48%", }}>
                                            <Image
                                                source={{ uri: item.addPhotosOfYourHappening[0] }}
                                                style={styles.listImg}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setWhishListHappeningId(item._id)
                                                    if (!item.isFavorite) {
                                                        setCreateWishListModal(true)
                                                    }
                                                }}
                                                style={{ position: 'absolute', top: 10, right: 5, padding: 10 }}>
                                                {
                                                    item.isFavorite ?
                                                        <HeartFilled color={'red'} />
                                                        :
                                                        <HeartWhiteIcon color={"white"} />
                                                }

                                            </TouchableOpacity>
                                            <Text style={styles.listTile}>{item.happeningTitle}</Text>
                                            <Text style={styles.distanceText}>{item.distance}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }




                        </View> */}
                    </View>





                    {/* <View style={{ width: "85%", alignSelf: 'center', }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                        <Text style={styles.headingText}>Happening Nearby</Text>
                        <TouchableOpacity style={{ padding: 10 }} >
                            <Text style={styles.seeAll}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', justifyContent: 'space-between' }}>
                        {
                            nearbyHappenings?.map((item, index) => (
                                <View style={{ width: "48%", }}>
                                    <Image
                                        source={item.img}
                                        style={styles.listImg}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setCreateWishListModal(true)}
                                        style={{ position: 'absolute', top: 10, right: 5, padding: 10 }}>
                                        <HeartWhiteIcon />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                        {
                                            [1, 2, 3, 4, 5].map((v, i) => (
                                                <View style={i == 4 ? styles.ratingCircleInActive : styles.ratingCircleActive}></View>
                                            ))
                                        }
                                        <Text style={styles.ratingsText}>34 Ratings</Text>
                                    </View>
                                    <Text style={styles.listTile}>{item.title}</Text>
                                    <Text style={styles.distanceText}>{item.distance}</Text>
                                </View>
                            ))
                        }





                    </View>
                </View> */}
                    {/* </ScrollView> */}
                </ScrollView>
                <KeyboardAvoidingView
                    behavior='position'
                >
                    <Modal
                        isVisible={createWishListModal}
                        style={{ margin: 0, alignItems: 'flex-end', justifyContent: 'flex-end' }}
                    >
                        {loading && <Loader />}
                        {/* <GeneralStatusBar backgroundColor='white' barStyle='dark-content' /> */}

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
                <HappeningFilterModal
                    onDone={doFilter}
                    isVisible={filterModal}
                    filterType={filterType}
                    setIsVisible={() => setFilterModal(false)}
                />


                {loading && <Loader />}
                <DropdownAlert ref={(ref) => alertRef = ref} />
            </TouchableOpacity >
        </View >
    )
}

// Text style for "Hi"
const styles = StyleSheet.create({
    shadow: {
        shadowColor: acolors.lighGrey, shadowOffset: { width: 1, height: 1 }, shadowRadius: 3, shadowOpacity: 0.5, elevation: 2,
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
        width: "98%", height: 56, borderRadius: 22, backgroundColor: '#5b4dbc', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, color: '#ffffff', fontFamily: fonts.PRe, fontSize: 14,
    },
    categoriesView: {
        width: 93, height: 27, maxWidth: 391, borderRadius: 18, borderColor: '#b9b1f0', borderWidth: 3, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', marginLeft: 10
    },
    categoriesText: {
        color: '#5d5760', fontFamily: fonts.PRe, fontSize: 10,
    },
    headingText: {
        color: '#5d5760', fontFamily: fonts.PSBo, fontSize: 20,
    },
    seeAll: {
        color: '#5b4dbc', fontFamily: fonts.PRe, fontSize: 14, letterSpacing: -0.14,
        textDecorationLine: 'underline', marginRight: -3
    },
    listImg: {
        width: "100%", height: 231, borderRadius: 25,
        // resizeMode: 'stretch',
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
        color: '#5d5760', fontFamily: fonts.PMe, fontSize: 13, marginTop: 5
    },
    storyTitle: {
        color: 'white', fontFamily: fonts.PMe, fontSize: 13, marginTop: 5
    },
    storyTitleContainer: {
        position: 'absolute',
        bottom: getHeight(2),
        left: getWidth(2),
        backgroundColor: acolors.storyTitleContainerBg,
        paddingHorizontal: getWidth(2),
        width: getWidth(35),
        // paddingVertical: getHeight(2),
        paddingTop: 5,
        paddingBottom: 10,
        borderRadius: 13,


    },
    distanceText: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
        color: '#5d5760',
        fontFamily: fonts.PMe,
        fontSize: 6, letterSpacing: 0.3,
    },
    popupContainer: {
        width: "80%", paddingBottom: 60,
        borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.98)',
        position: 'absolute', bottom: 5, alignSelf: 'center', paddingHorizontal: 15
    },
    popupHeading: {
        color: '#ffa183', fontFamily: fonts.PBo, fontSize: 21, marginTop: 20
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
    languagePickerCircle: {
        width: 37, height: 37, borderRadius: 37 / 2,
        shadowColor: 'rgba(0, 0, 0, 0.5)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', elevation: 5
    },
    languagePickerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14
    },
    languageText: {
        fontSize: 9, color: "#2a2a2a", fontFamily: fonts.MSBo, letterSpacing: 0.18,
    },
    addPicCircle: {
        alignSelf: 'center', width: 69, height: 69, shadowColor: 'rgba(0, 0, 0, 0.05)', shadowOpacity: 0.5,
        shadowOffset: { width: 8, height: 5 }, elevation: 5,
        shadowRadius: 40, borderRadius: 69 / 2, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center'
    },
    crossBtn: {
        position: 'absolute', top: -20, right: -20, width: 43, height: 43, borderRadius: 43 / 2,
        backgroundColor: 'white', elevation: 2, alignItems: 'center', justifyContent: 'center'
    },
    dateOfBirthPicker: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 36, borderRadius: 10,
        maxWidth: 90, paddingLeft: 8
    },
    genderRadioBtn: {
        width: 22, height: 22, borderRadius: 22 / 2, backgroundColor: '#ffa183', alignItems: 'center', justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowOffset: { width: 3, height: 0 }, shadowRadius: 40, shadowOpacity: 0.8, elevation: 1,
    },
    genderSelectionContainer: {
        flexDirection: 'row', alignItems: 'center', width: "50%"
    },
    genderText: {
        fontSize: 12, color: "#241414", fontFamily: fonts.MRe, marginLeft: 10
    },
    themePickerContainer: {
        paddingHorizontal: 12, height: 28, borderRadius: 18, borderColor: '#5b4dbc', borderWidth: 1,
        backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginLeft: 10
    },
    linkSocialTitle: {
        color: '#2a2a2a', fontFamily: fonts.MBo, fontSize: 12,
    },
    connect: {
        color: '#5b4dbc', fontFamily: fonts.MBo, fontSize: 12, textDecorationLine: 'underline',
    },
    linkSocialRowView: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30
    },

    filterThemePickerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14,
        // shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        elevation: 2
    },
    themeText: {
        fontSize: 12, color: "#2a2a2a", fontFamily: fonts.MBo, letterSpacing: 0.18,
    },
    subData: {
        fontFamily: fonts.MRe, color: '#828282', fontSize: 8
    },
    heading2ndText: {
        color: acolors.btnPrimary
    }

})



export default Home