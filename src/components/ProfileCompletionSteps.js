import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, Text, TouchableOpacity, Image,
    TextInput, FlatList, ScrollView, StatusBar, SafeAreaView, Platform, Switch, RefreshControl, Keyboard,
    KeyboardAvoidingView
} from 'react-native'
import { BackIcon, CrossIcon, EditPencilIcon, FilterIcon, HeartWhiteIcon, PlusIcon, SearchIcon, TickIcon, TickIconWhite, HeartFilled } from '../components/Svgs'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

import { fonts } from '../constants/fonts';
import { acolors } from '../constants/colors';
import Modal from "react-native-modal";
import PrivacyPicker from '../components/PrivacyPicker';

import { getUserLocation, getWidth, retrieveItem, storeItem, uploadSingleFile, useForceUpdate } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { urls } from '../utils/Api_urls';
import { apiRequest } from '../utils/apiCalls';
import { Context } from '../Context/DataContext'

import RangeSlider from 'rn-range-slider';
import { navigate, navigateFromStack } from '../../Navigations';
import HappeningFilterModal from '../common/HappeningFilterModal';
import GeneralStatusBar from '../components/GernalStatusBar';
import { useIsFocused } from '@react-navigation/native'
import AlertPopup from '../common/AlertPopup'





var alertRef;
var modalAlertRef;
var textInputRef;
const ProfileCompletionSteps = () => {


    const isFocused = useIsFocused()

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal, userProfileData, setHappeningSubmissionDataGlobal, setWhishListsGlobal } = useContext(Context)
    const [loading, setLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [popup1, setPopup1] = useState(false);
    const [popupCases, setPopupCases] = useState(1);
    const [daysArr, setDayArr] = useState([]);
    const monthsArr = [
        { title: "January" },
        { title: "February" },
        { title: "March" },
        { title: "April" },
        { title: "May" },
        { title: "June" },
        { title: "July" },
        { title: "August" },
        { title: "September" },
        { title: "October" },
        { title: "November" },
        { title: "December" },
    ]

    const [loginData, setLoginData] = useState();
    const [profileData, setProfileData] = useState();
    const [yearsArr, setYearArr] = useState([]);
    const [ccArr, setCcArr] = useState([]); // COUNTRY CODES ARRAY

    // Preferences Popup
    const [distanceUnit, setDistanceUnit] = useState('miles')
    const [distance, setDistance] = useState("");

    // USER PROFILE DATA STATES TO STORE ON SERVER
    const [language, setLanguage] = useState('English');
    const [refreshing, setRefreshing] = React.useState(false);
    const [profilePic, setProfilePic] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [countryCode, setCountryCode] = useState('+44')
    const [phn, setPhone] = useState('');
    const [gender, setGender] = useState('Male');
    const [languageKnownArr, setLanguageKnownArr] = useState([]); // TO SEND IT TO SERVER
    const [languageKnown, setLanguageKnown] = useState(''); // FOR INPUT
    const [profession, setProfession] = useState('');
    const [skillsArr, setSkillsArr] = useState([]); // TO SEND IT TO SERVER
    const [skill, setSkill] = useState(''); // FOR INPUT
    const [themesLike, setThemesLike] = useState([]);
    const [displayProfile, setDisplayProfile] = useState(false);
    const [alertHappening, setAlertHappening] = useState(false);



    const [filterModal, setFilterModal] = useState(false);
    const [bio, setBio] = useState('');

    const [allHappenings, setAllHappenings] = useState([]);
    const [bioCount, setBioCount] = useState(0);

    const [newWhishListName, setNewWhishListName] = useState('');
    const [whishListHappeningId, setWhishListHappeningId] = useState('');
    const [wishlistId, setWishlistId] = useState('');


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
                    goBack();
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
        apiRequest('', 'happening/getAllHappning', "GET")
            .then(data => {
                console.log(data.data)
                setLoading(false);
                setRefreshing(false)
                if (data.status) {
                    let data1 = data?.data;
                    setAllHappenings(data1?.reverse());
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


    function getBioWordCount(text) {
        if (text == "") {
            setBioCount(0)
            return;
        }
        let count = text.trim().split(/\s+/).length
        setBioCount(count)
    }

    function makeStaticArrays() {
        let arr = [];
        for (let i = 1; i <= 31; i++) {
            arr.push({
                title: i.toString()
            })
        }
        setDayArr(arr);
        arr = [];
        for (let i = 1910; i <= 2023; i++) {
            arr.push({
                title: i
            });
        }
        setYearArr(arr);
        arr = [];
        for (let i = 1; i <= 500; i++) {
            arr.push({
                title: i
            });
        }
        setCcArr(arr);
    }


    function doMakeKnownLanguages() {
        let arr = languageKnownArr;
        arr.push(languageKnown);
        setLanguageKnownArr(arr);
        setLanguageKnown('');
        forceUpdate();
    }

    async function uploadPic() {
        const res = await uploadSingleFile();
        setProfilePic(res);

    }

    function doSpliceLanguageKnown(v) {
        let arr = languageKnownArr;
        let foundIndex = arr.indexOf(v);
        if (foundIndex !== -1) arr.splice(foundIndex, 1);
        setLanguageKnownArr(arr);
        forceUpdate();
    }


    function doMakeSkills() {
        let arr = skillsArr;
        arr.push(skill);
        setSkillsArr(arr);
        setSkill('');
        forceUpdate();
    }

    function doSpliceSkills(v) {
        let arr = skillsArr;
        let foundIndex = arr.indexOf(v);
        if (foundIndex !== -1) arr.splice(foundIndex, 1);
        setSkillsArr(arr);
        forceUpdate();
    }


    async function doUploadProfileData() {
        try {
            setModalLoading(true);
            const loginData = await retrieveItem('login_data');
            const profileTempData = await retrieveItem('profile_temp_data');
            var data = new FormData();

            const reqObj = {
                language: "Removed",
                // profileTempData?.language.language
                dateOfBirth: profileTempData?.dateOfBirth.dateOfBirth,
                profileImage: profileTempData?.profileImage.profileImage,
                phoneNumber: "6123123123",
                // profileTempData?.phoneNumber.phoneNumber,
                Gender: profileTempData?.gender,
                LanguagesKnown: profileTempData?.LanguagesKnown?.LanguagesKnown,
                profession: profileTempData?.profession,
                addSkills: profileTempData?.addSkills.addSkills,
                themesYouLikes: profileTempData?.themesYouLikes.themesYouLikes,
                // id: loginData?._id,
                displayMyProfileToEveryOne: displayProfile,
                alertWhenHappningsAreNearMe: alertHappening,
                token: loginData.token,
                bio: bio,
                // }
            }
            for (let key in reqObj) {
                data.append(key, reqObj[key]);
            }
            let url = urls.API + "profile/create-profile";
            setModalLoading(true)
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'multipart/form-data',
                    'Content-Type': 'multipart/form-data',
                },
                body: data
            })
                .then(data => data.json())
                // .then(data => data.text())
                .then(data => {
                    setModalLoading(false)
                    if (data.status) {
                        storeItem('profile_data', data.data)
                        getProfileDetails();
                        setPopupCases(11)
                    }
                    else {
                        modalAlertRef.alertWithType('error', "Error", data.message)
                    }
                })
                .catch(error => {
                    setModalLoading(false);
                    modalAlertRef.alertWithType('error', urls.error_title, urls.error)
                    setLoading(false)
                })
        }
        catch (error) {
            console.log('error===', error)
            setLoading(false)
        }
    }

    async function saveTempProfileDataToLocal(key, value) {

        let localProfileData = await retrieveItem('profile_temp_data');
        if (!localProfileData) localProfileData = {};
        if (typeof key == 'object') {
            let keyValues = key;
            Object.keys(keyValues).forEach((v, i) => {
                localProfileData['' + v + ''] = keyValues[v]
            })
            storeItem('profile_temp_data', localProfileData)
            return;
        }
        localProfileData['' + key + ''] = value
        localProfileData.popupCase = value.nextCase;
        storeItem('profile_temp_data', localProfileData)

    }


    async function checkProfileCompletionSteps() {
        setLoading(true)
        const data = await retrieveItem('profile_data')
        if (!data) {
            const data1 = await retrieveItem('profile_temp_data')
            if (data1?.popupCase) {
                setPopup1(true);
                setPopupCases(1);
            }
            else {
                setPopup1(true);
                setPopupCases(1);
            }
            // setProfilePic(data1?.profileImage?.profileImage)
            setBio(data1?.bio?.bio)
            setDateOfBirth(data1?.dateOfBirth?.dateOfBirth)
            setDateOfBirth(data1?.dateOfBirth?.dateOfBirth)
            setPhone(data1?.phoneNumber?.phoneNumber)
            setGender(data1?.gender)
            setProfession(data1?.profession);
            setLanguageKnownArr(data1?.LanguagesKnown?.LanguagesKnown ?? [])
            setSkillsArr(data1?.addSkills?.addSkills ?? [])
            setThemesLike(data1?.themesYouLikes?.themesYouLikes ?? [])


            setLoading(false);
            return;
        }
        setLoading(false)

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
        retrieveItem('login_data')
            .then(data => {
                if (data) {
                    makeStaticArrays();
                    getLoginAndProfileDataFromLocal();
                    checkProfileCompletionSteps()
                    FilterHeader.showCrossBtn = true;
                    // getProfileDetails();
                    // getWhishLists();

                }
            })



        // retrieveItem('login_data')
        //     .then(data => {
        //         setUserGlobal(data)
        //     })
        // retrieveItem('profile_data')
        //     .then(profileData => {
        //         console.log('profileDaasdasdasta', profileData)
        //         userProfileData(profileData)
        //         setProfileData(profileData);
        //     })



    }, [])

    useEffect(() => {
        getHappeningDataFromServer(true);
        getLocalStories(true)
    }, [isFocused])



    const PopupButton = ({ onPress, title, btnStyle }) => (
        <TouchableOpacity
            style={[styles.popupBtn, btnStyle]}
            onPress={onPress}
        >
            <Text style={styles.popupBtnTitle}>{title ? title : "Next"}</Text>
        </TouchableOpacity>
    )

    const BackPopupBtn = () => (
        <TouchableOpacity
            onPress={() => {
                let popupCase = parseInt(popupCases)
                setPopupCases(popupCase == 5 ? 3 : popupCase - 1);
            }}
            style={[styles.crossBtn, { left: -15 }]}>
            <BackIcon color="#000" />
        </TouchableOpacity>
    )

    const CrossBtn = () => (
        <TouchableOpacity
            onPress={() => {
                setPopupCases(1);
                setPopup1(false)
            }}
            style={styles.crossBtn}>
            <CrossIcon />
        </TouchableOpacity>
    )

    const LanguagePopup = () => (
        <View style={styles.popupContainer}>

            <Text style={styles.popupHeading}>Language</Text>
            <Text style={styles.popupDesc}>Choose the language you want to{"\n"}use the app in </Text>
            <Text style={[styles.popupDesc, { marginTop: 5 }]}>*the content will be translated</Text>
            <View style={{
                elevation: 2, backgroundColor: 'white', borderTopRightRadius: 10, borderTopLeftRadius: 10, padding: 10,
                shadowColor: 'rgba(0, 0, 0, 0.09)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
            }}>
                {/* <TextInput
                    placeholder='Enter Language'
                    placeholderTextColor={"#7b7b7b"}
                    style={{
                        width: "100%", height: 35, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                        fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10,
                    }}
                /> */}
                <TouchableOpacity
                    onPress={() => setLanguage('English')}
                    style={styles.languagePickerContainer}>
                    <Text style={styles.languageText}>English</Text>
                    <View style={styles.languagePickerCircle}>
                        {language == 'English' && <TickIcon />}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setLanguage('Chinese')}
                    style={styles.languagePickerContainer}>
                    <Text style={styles.languageText}>Chinese</Text>
                    <View style={styles.languagePickerCircle}>
                        {language == 'Chinese' && <TickIcon />}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setLanguage('Dutch')}
                    style={styles.languagePickerContainer}>
                    <Text style={styles.languageText}>Dutch</Text>
                    <View style={styles.languagePickerCircle}>
                        {language == 'Dutch' && <TickIcon />}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setLanguage('Japanese')}
                    style={styles.languagePickerContainer}>
                    <Text style={styles.languageText}>Japanese</Text>
                    <View style={styles.languagePickerCircle}>
                        {language == 'Japanese' && <TickIcon />}
                    </View>
                </TouchableOpacity>
                <PopupButton
                    onPress={() => {
                        let data = {
                            language: language,
                            nextCase: 2
                        }
                        saveTempProfileDataToLocal('language', data);
                        setPopupCases(2)
                    }}
                    btnStyle={{ position: 'relative', marginTop: 30, alignSelf: 'flex-end' }}
                    title="Next"
                />
            </View>

        </View>
    )

    const AddPicturePopup = () => (
        <View style={[styles.popupContainer, profilePic && { height: 350, justifyContent: 'center', }]}>
            {/* <BackPopupBtn /> */}
            {/* <CrossBtn /> */}
            {
                !profilePic?.uri &&
                <>
                    <Text style={styles.popupHeading}>Add your Best{"\n"}Picture!</Text>
                    <TouchableOpacity
                        onPress={() => uploadPic()}
                        style={styles.addPicCircle}>
                        <Text style={{ fontSize: 50, color: '#241414', fontFamily: fonts.MRe }}>+</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, color: acolors.grey, fontFamily: fonts.MRe, alignSelf: 'center', marginTop: 14 }}>Add a profile photo</Text>
                    <Text style={{ fontSize: 12, color: '#241414', fontFamily: fonts.MBo, alignSelf: 'center', marginTop: 14, textAlign: "center" }}>Please use a recent picture that{"\n"}shows your face clearly</Text>
                </>
            }
            {
                profilePic?.uri &&
                <>

                    <Text style={[styles.popupHeading]}>You look great!</Text>
                    <View
                        style={{ width: 102, height: 102, borderRadius: 102 / 2, alignSelf: 'center' }}

                    >
                        <Image
                            style={{ width: 102, height: 102, borderRadius: 102 / 2, alignSelf: 'center', marginTop: 12, borderWidth: 5, borderColor: '#9086d0' }}
                            source={{ uri: profilePic.uri }}
                        // require('../../static_assets/profileImg.png')
                        />
                        <TouchableOpacity
                            onPress={() => uploadPic()}
                            style={{ position: 'absolute', right: 0, bottom: -10, alignSelf: 'center', width: 30, height: 30, borderRadius: 15, backgroundColor: '#9086d0', alignItems: 'center', justifyContent: 'center' }}>
                            <EditPencilIcon width={12} height={20} color={'white'} />
                        </TouchableOpacity>
                    </View>
                </>
            }
            <PopupButton
                onPress={() => {
                    if (!profilePic?.uri) {
                        modalAlertRef.alertWithType('error', "Error", "Please upload pic");
                        return;
                    }
                    let data = {
                        profileImage: profilePic,
                        nextCase: 2
                    }
                    saveTempProfileDataToLocal('profileImage', data);
                    setPopupCases(2)
                }}
                // btnStyle={{ position: 'relative', marginTop: 20, alignSelf: 'flex-end' }}
                title="Next"
            />
        </View >
    )

    const AddDateOfBirthPopup = () => (
        <View style={[styles.popupContainer, { paddingBottom: 10 }]}>
            <BackPopupBtn />
            {/* <CrossBtn /> */}
            <Text style={styles.popupHeading}>Add date of birth</Text>
            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-evenly', marginTop: 20 }}>
                <View style={[styles.shadow, styles.dateOfBirthPicker]}>
                    <PrivacyPicker
                        selected={{ title: day ?? "Date" }}
                        data={daysArr}
                        onValueChange={(i, v) => { setDay(v.title); }}
                    />
                </View>
                <View style={[styles.shadow, styles.dateOfBirthPicker]}>
                    <PrivacyPicker
                        selected={{ title: month.title ?? "Month" }}
                        data={monthsArr}
                        onValueChange={(i, v) => {
                            setMonth(v);
                        }}
                    />
                </View>
                <View style={[styles.shadow, styles.dateOfBirthPicker]}>
                    <PrivacyPicker
                        selected={{ title: year ?? "Year" }}
                        data={yearsArr}
                        onValueChange={(i, v) => { setYear(v.title); }}
                    />
                </View>

            </View>
            <PopupButton
                onPress={() => {
                    // setPopupCases(4);
                    if (!day || !month || !year) {
                        modalAlertRef.alertWithType('error', "Error", "Please enter a valid date of birth");
                        return;
                    }
                    else {
                        const d = new Date();
                        setDateOfBirth(day + " " + (monthsArr.indexOf(month) + 1) + " " + year);

                        let calcYear = d.getFullYear() - parseInt(year);
                        let data = {
                            dateOfBirth: day + " " + (monthsArr.indexOf(month) + 1) + " " + year,
                            nextCase: calcYear < 18 ? 4 : 5
                        }
                        saveTempProfileDataToLocal('dateOfBirth', data);
                        if (calcYear < 18) setPopupCases(4);
                        else setPopupCases(5);
                    }

                }}
                btnStyle={{ position: 'relative', marginTop: 100, alignSelf: 'flex-end' }}
                title="Next"
            />
        </View>
    )

    const Under18Popup = () => (
        <View style={styles.popupContainer}>
            <BackPopupBtn />
            <CrossBtn />
            <Text style={styles.popupHeading}>Hey Jules!</Text>
            <Text style={styles.popupHeading}>You are under  18
                {"\n"}years old.{"\n"}
                You can’t host or book
                happenings yourself, but
                you can join adults.</Text>
            <Text style={[styles.headingText, { marginTop: 40, marginBottom: 50, fontSize: 14 }]}>And still have an account :)</Text>
            <PopupButton
                onPress={() => setPopupCases(5)}
                title="Next"
            />
        </View>
    )

    const ThemesLikePopup = () => (
        <View style={[styles.popupContainer, { paddingBottom: 10 }]}>
            <BackPopupBtn />
            {/* <CrossBtn /> */}
            <Text style={styles.popupHeading}>Themes you like</Text>
            <Text style={{ color: '#241414', fontFamily: fonts.MRe, fontSize: 12, }}>choose min of  three themes you like</Text>

            <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        // ["Business Support", "Clean Energy and Air", "Community Work", "Construction Work ", "Art", "Harvesting & Farming", "Health & Medical", "Land Conservation", "Marine Protection"]
                        state.happeningSubmissionData?.happeningTheme?.map((v, i) => {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => {
                                        let arr = themesLike;
                                        if (arr.includes(v)) {
                                            let foundIndex = arr.indexOf(v);
                                            arr.splice(foundIndex, 1);
                                        }
                                        else {
                                            arr.push(v)
                                        }
                                        setThemesLike(arr);
                                        forceUpdate();

                                    }}
                                    style={[styles.themePickerContainer, { backgroundColor: themesLike?.includes(v) ? "#5b4dbc" : "white" }]}>
                                    <Text style={{ color: themesLike.includes(v) ? "white" : "#5b4dbc", fontFamily: fonts.MRe, fontSize: 8, }}>{v?.happeningThemeName}</Text>
                                </TouchableOpacity>
                            )
                        })
                        // }}
                        // style={[styles.themePickerContainer, { backgroundColor: themesLike?.includes(v) ? "#5b4dbc" : "white" }]}>
                        // <Text style={{ color: themesLike.includes(v) ? "white" : "#5b4dbc", fontFamily: fonts.MRe, fontSize: 8, }}>{v?.happeningThemeName}</Text>
                        // </TouchableOpacity>
                        // )
                        // })

                    }
                </View>
            </ScrollView>
            <PopupButton
                onPress={() => {
                    if (themesLike.length > 2) {
                        console.log(themesLike)
                        let data = {
                            themesYouLikes: themesLike,
                            nextCase: 9
                        }
                        saveTempProfileDataToLocal('themesYouLikes', data);
                        setPopupCases(9)
                    } else {
                        modalAlertRef.alertWithType('error', "Error", 'Please, Select atleast 3 themes.')
                        return
                    }
                }}
                btnStyle={{ position: 'relative', marginTop: 120, alignSelf: 'flex-end' }}
                title="Next"
            />

        </View>
    )

    const LinkSocialPopup = () => (
        <View style={[styles.popupContainer, { paddingBottom: 10, paddingHorizontal: 20 }]}>
            <BackPopupBtn />
            <CrossBtn />
            <Text style={styles.popupHeading}>Link with socials</Text>
            <Text style={{ color: '#241414', fontFamily: fonts.MRe, fontSize: 12, }}>connect your social media accounts</Text>
            <View style={styles.linkSocialRowView}>
                <Text style={styles.linkSocialTitle}>Facebook</Text>
                <Text style={styles.connect}>Connect</Text>
            </View>
            <View style={styles.linkSocialRowView}>
                <Text style={styles.linkSocialTitle}>Google</Text>
                <Text style={styles.connect}>Connect</Text>
            </View>
            <View style={styles.linkSocialRowView}>
                <Text style={styles.linkSocialTitle}>Twitter</Text>
                <Text style={styles.connect}>Connect</Text>
            </View>
            <View style={styles.linkSocialRowView}>
                <Text style={styles.linkSocialTitle}>Instagram</Text>
                <Text style={styles.connect}>Connect</Text>
            </View>
            <View style={styles.linkSocialRowView}>
                <Text style={styles.linkSocialTitle}>Share my activities on{"\n"}Facebook</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }} // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"} // onValueChange={toggleSwitch}// value={isEnabled}
                    thumbColor={"#fffffff"} ios_backgroundColor="#3e3e3e"
                />
            </View>
            <View style={styles.linkSocialRowView}>
                <Text style={styles.linkSocialTitle}>Publish my saves on{"\n"}Facebook</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }} // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"} // onValueChange={toggleSwitch}// value={isEnabled}
                    thumbColor={"#fffffff"} ios_backgroundColor="#3e3e3e"
                />
            </View>
            <View style={styles.linkSocialRowView}>
                <Text style={styles.linkSocialTitle}>Share my activities on{"\n"}Instagram</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }} // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"} // onValueChange={toggleSwitch}// value={isEnabled}
                    thumbColor={"#fffffff"} ios_backgroundColor="#3e3e3e"
                />
            </View>
            <View style={styles.linkSocialRowView}>
                <Text style={styles.linkSocialTitle}>Share my activities on {"\n"}Twitter</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }} // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"} // onValueChange={toggleSwitch}// value={isEnabled}
                    thumbColor={"#fffffff"} ios_backgroundColor="#3e3e3e"
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 50, width: "95%", alignSelf: 'center' }}>
                <TouchableOpacity>
                    <Text style={{ color: '#5b4dbc', fontFamily: fonts.MSBo, fontSize: 12, }}>I’ll do it later</Text>
                </TouchableOpacity>
                <PopupButton
                    onPress={() => setPopupCases(10)}
                    btnStyle={{ position: 'relative', top: 0, right: 0 }}
                    title="Next"
                />

            </View>
        </View>
    )

    const FinishPopup = () => (
        <View style={[styles.popupContainer, { paddingBottom: 10, paddingHorizontal: 20 }]} >
            <CrossBtn />
            <Text style={[styles.popupHeading, { fontSize: 30 }]}>You are good to{"\n"}go <Text style={{ color: acolors.primary }}>{loginData?.userName}</Text></Text>
            <View style={{ marginTop: 30, alignSelf: 'center' }}>
                <Image
                    style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
                    source={profilePic ? { uri: profilePic.uri } : require('../static_assets/profileLarge.png')}
                />

                <View style={{
                    position: 'absolute', right: -10, bottom: -10, width: 52,
                    height: 52,
                    borderRadius: 52 / 2,
                    backgroundColor: '#9086d0',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image
                        source={require('../assets/tick.png')}
                    />

                </View>
            </View>
            <PopupButton
                onPress={() => {
                    setPopupCases(1);
                    setPopup1(false)
                    navigate('Profilee')
                }}
                btnStyle={{ position: 'relative', alignSelf: 'center', marginTop: 130 }}
                title="View Profile"
            />
        </View>
    )

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

    return (



        <TouchableOpacity
            disabled={true}
            onPress={() => Keyboard.dismiss()}
            activeOpacity={1}
        >
            {/* <GeneralStatusBar backgroundColor='#fff' barStyle='dark-content' /> */}
            <Modal
                isVisible={popup1}
                avoidKeyboard={true}
                backdropColor="#171515"
                backdropOpacity={0.5}
                style={{ margin: 0, }}
                onBackdropPress={() => Keyboard.dismiss()}
                // onBackdropPress={() => setPopup1(!popup1)}
                animationOut="slideOutDown"
            >
                <AlertPopup ref={(ref) => modalAlertRef = ref} />
                {modalLoading && <Loader />}
                {
                    // popupCases == 1 ?
                    //     <LanguagePopup />
                    //     :
                    popupCases == 1 ?
                        <AddPicturePopup />
                        :
                        popupCases == 2 ? <View
                            pointerEvents='box-none'
                            style={[styles.popupContainer, { paddingBottom: 10 }]}>
                            <BackPopupBtn />
                            {/* <CrossBtn /> */}
                            <Text style={styles.popupHeading}>Your Bio</Text>
                            <Text style={{ color: '#241414', fontFamily: fonts.MRe, fontSize: 12, }}>Tell something about yourself, your organization (if any) and share a link to your organization</Text>
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <TextInput
                                    placeholder=''
                                    keyboardType="default"
                                    returnKeyType="done"
                                    value={bio}
                                    // onKeyPress={() => Keyboard.dismiss()}
                                    multiline={true}
                                    onChangeText={(v) => {
                                        setBio(v)
                                        getBioWordCount(v)
                                    }}
                                    placeholderTextColor={"#7b7b7b"}
                                    textAlignVertical="top"
                                    style={{
                                        width: "100%", height: 140, borderRadius: 10, paddingTop: 10, borderColor: '#2a2a2a', borderWidth: 1,
                                        fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10,
                                    }}
                                />
                                <Text style={{ backgroundColor: 'white', position: 'absolute', bottom: 5, right: 20, fontSize: 12, color: "#2A2A2A", fontFamily: fonts.MRe, }}>{bioCount ?? 0}/150</Text>
                            </View>
                            <PopupButton
                                onPress={() => {
                                    if (bioCount < 50 || bioCount > 150) {
                                        modalAlertRef.alertWithType('error', "Error", 'Bio must be min 50 to 150 words')
                                        return
                                    }

                                    let data = {
                                        bio: bio,
                                        nextCase: 3
                                    }
                                    saveTempProfileDataToLocal('bio', data)
                                    setPopupCases(3)
                                }}
                                btnStyle={{ position: 'relative', marginTop: 130, alignSelf: 'flex-end' }}
                                title="Next"
                            />
                        </View>

                            : popupCases == 3 ?
                                <AddDateOfBirthPopup />
                                :
                                popupCases == 4 ?
                                    <Under18Popup />
                                    :
                                    popupCases == 5 ? // LINK YOUR PHONE POPUP
                                        <View style={[styles.popupContainer, { paddingBottom: 10, }]}>
                                            <BackPopupBtn />
                                            {/* <CrossBtn /> */}
                                            <Text style={styles.popupHeading}>Link your phone</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
                                                <View style={{
                                                    flexDirection: 'row', width: "23%", height: 40, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1, alignItems: 'center',
                                                }}>
                                                    <PrivacyPicker
                                                        selected={{ title: countryCode }}
                                                        data={ccArr}
                                                        onValueChange={(i, v) => {
                                                            setCountryCode('+' + v.title);
                                                        }}
                                                        titleStyle={{ fontFamily: fonts.PRe }}
                                                    />
                                                </View>
                                                <TextInput
                                                    placeholder=''
                                                    autoFocus={true}
                                                    value={phn}
                                                    onChangeText={setPhone}
                                                    keyboardType='number-pad'
                                                    placeholderTextColor={"#7b7b7b"}
                                                    style={{
                                                        width: "75%", height: 40, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                                                        fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10,
                                                    }}
                                                />
                                            </View>
                                            {/* <Text style={{ fontFamily: fonts.MRe, fontSize: 12, color: acolors.grey, marginTop: 10 }}>Country Code</Text> */}
                                            {/* <Text style={styles.popupHeading}>Please enter the OTP</Text> */}
                                            {/* <TextInput
                                                placeholder=''
                                                placeholderTextColor={"#7b7b7b"}
                                                style={{
                                                    width: "75%", height: 40, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                                                    fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10,
                                                }}
                                            /> */}
                                            <PopupButton
                                                onPress={() => {
                                                    if (phn?.length < 10) {
                                                        modalAlertRef.alertWithType('error', "Error", 'Please enter a valid 10 digit phone no')
                                                        return
                                                    }
                                                    if (!countryCode) {
                                                        modalAlertRef.alertWithType('error', "Error", 'Please select your country code');
                                                        return
                                                    }
                                                    let data = {
                                                        phoneNumber: phn,
                                                        nextCase: 6
                                                    }
                                                    saveTempProfileDataToLocal('phoneNumber', data)
                                                    setPopupCases(6)
                                                }}
                                                btnStyle={{ position: 'relative', marginTop: 130, alignSelf: 'flex-end' }}
                                                title="Next"
                                            />
                                        </View>
                                        :
                                        popupCases == 6 ? // GENDER, LANGUAGES KNOWN, PROFESSION POPUP
                                            <View style={[styles.popupContainer, { paddingBottom: 10 }]}>
                                                <BackPopupBtn />
                                                {/* <CrossBtn /> */}
                                                <Text style={styles.popupHeading}>Gender</Text>
                                                <View style={{ flexDirection: 'row', width: "100%", marginTop: 12, }}>
                                                    <TouchableOpacity
                                                        onPress={() => setGender('Male')}
                                                        style={styles.genderSelectionContainer}>
                                                        <View style={[styles.genderRadioBtn, { backgroundColor: gender == "Male" ? "#fea082" : "rgba(255, 161, 131,0.4)" }]}>
                                                            {gender == "Male" && <TickIcon width={9} height={7} />}
                                                        </View>
                                                        <Text style={styles.genderText}>Male</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => setGender('Female')}
                                                        style={styles.genderSelectionContainer}>
                                                        <View style={[styles.genderRadioBtn, { backgroundColor: gender == "Female" ? "#fea082" : "rgba(255, 161, 131,0.4)" }]}>
                                                            {gender == "Female" && <TickIcon width={9} height={7} />}
                                                        </View>
                                                        <Text style={styles.genderText}>Female</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flexDirection: 'row', width: "100%", marginTop: 12, }}>
                                                    <TouchableOpacity
                                                        onPress={() => setGender('Other')}
                                                        style={styles.genderSelectionContainer}>
                                                        <View style={[styles.genderRadioBtn, { backgroundColor: gender == "Other" ? "#fea082" : "rgba(255, 161, 131,0.4)" }]}>
                                                            {gender == "Other" && <TickIcon width={9} height={7} />}
                                                        </View>
                                                        <Text style={styles.genderText}>Other</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => setGender('Rather not Say')}
                                                        style={styles.genderSelectionContainer}>
                                                        <View style={[styles.genderRadioBtn, { backgroundColor: gender == "Rather not Say" ? "#fea082" : "rgba(255, 161, 131,0.4)" }]}>
                                                            {gender == "Rather not Say" && <TickIcon width={9} height={7} />}
                                                        </View>
                                                        <Text style={styles.genderText}>Rather not Say</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <Text style={styles.popupHeading}>Languages Known</Text>
                                                <Text style={{
                                                    marginTop: 10, color: '#241414', fontFamily: fonts.MRe, fontSize: 12,
                                                }}>What languages you speak</Text>
                                                <View>
                                                    <TextInput
                                                        ref={input => { textInputRef = input }}
                                                        onChangeText={setLanguageKnown}
                                                        placeholderTextColor={"#7b7b7b"}
                                                        onSubmitEditing={() => {
                                                            if (languageKnown.length > 1) {
                                                                forceUpdate();
                                                                doMakeKnownLanguages();
                                                                textInputRef.clear();
                                                            }
                                                        }}
                                                        onBlur={() => {
                                                            if (languageKnown.length > 3) {
                                                                setLanguageKnown('');
                                                                forceUpdate();
                                                                doMakeKnownLanguages();
                                                                textInputRef.clear();
                                                            }
                                                        }}
                                                        style={{
                                                            width: "100%", height: 47, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                                                            fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10, marginTop: 10
                                                        }}
                                                    />
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            if (languageKnown.length > 3) {
                                                                setLanguageKnown('');
                                                                forceUpdate();
                                                                doMakeKnownLanguages();
                                                                textInputRef.clear();
                                                            }
                                                        }}
                                                        style={{ position: 'absolute', padding: 10, marginTop: 0, right: 0 }}>
                                                        <Text style={{ fontSize: 34, color: '#241414', fontFamily: fonts.MRe, }}>+</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                {/* <View style={{ marginTop: 10}}>
                                                <TextInput
                                                    placeholder=''
                                                    
                                                    style={{
                                                        width: "100%", height: 47, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                                                        fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10,                                                    }}
                                                />
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        if (languageKnown.length > 3) {
                                                            setLanguageKnown('');
                                                            forceUpdate();
                                                            doMakeKnownLanguages();
                                                            textInputRef.clear();
                                                        }
                                                    }}
                                                    style={{ position: 'absolute', right: 12, backgroundColor: 'red', alignSelf: 'center', top: 0, width: 30, height: 47, alignItems: 'center', justifyContent: 'center' }}>
                                                    <PlusIcon />
                                                </TouchableOpacity>
                                            </View> */}

                                                <View style={{ flexDirection: 'row', width: "100%", marginTop: 10 }}>
                                                    {
                                                        languageKnownArr.map((v, i) => {
                                                            return (
                                                                <View
                                                                    key={i}
                                                                    style={{
                                                                        paddingHorizontal: 8, height: 28, borderRadius: 18, backgroundColor: '#b9b1f0', flexDirection: 'row', alignItems: 'center',
                                                                    }}>
                                                                    <Text style={{ color: '#ffffff', fontFamily: fonts.MRe, fontSize: 8, }}>{v}</Text>
                                                                    <TouchableOpacity
                                                                        onPress={() => doSpliceLanguageKnown(v)}
                                                                    >
                                                                        <Text style={{ color: '#ffffff', fontFamily: fonts.MMe, fontSize: 9, marginLeft: 4 }}>X</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            )
                                                        })
                                                    }

                                                    {/* <View style={{
                                                paddingHorizontal: 8, height: 28, borderRadius: 18, backgroundColor: '#b9b1f0', flexDirection: 'row', alignItems: 'center', marginLeft: 10,
                                            }}>
                                                <Text style={{ color: '#ffffff', fontFamily: fonts.MRe, fontSize: 8, }}>Dutch</Text>
                                                <Text style={{ color: '#ffffff', fontFamily: fonts.MMe, fontSize: 9, marginLeft: 4 }}>X</Text>
                                            </View> */}
                                                </View>
                                                <Text style={styles.popupHeading}>Profession</Text>
                                                <TextInput
                                                    placeholder=''
                                                    value={profession}
                                                    onChangeText={setProfession}
                                                    placeholderTextColor={"#7b7b7b"}
                                                    style={{
                                                        width: "100%", height: 38, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                                                        fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10, marginTop: 5
                                                    }}
                                                />
                                                <PopupButton
                                                    onPress={() => {
                                                        Keyboard.dismiss()
                                                        if (languageKnownArr.length == 0) {
                                                            modalAlertRef.alertWithType('error', "Error", "Please enter atleast one language")
                                                            return;
                                                        }
                                                        if (profession?.length < 3 || !profession) {
                                                            modalAlertRef.alertWithType('error', "Error", "Please enter a valid profession")
                                                            return;
                                                        }
                                                        let data = {
                                                            LanguagesKnown: languageKnownArr,
                                                            nextCase: 7
                                                        }

                                                        let keyAndValues = {
                                                            "LanguagesKnown": data,
                                                            "gender": gender,
                                                            "profession": profession
                                                        }


                                                        saveTempProfileDataToLocal(keyAndValues);
                                                        // saveTempProfileDataToLocal('gender', gender);
                                                        // saveTempProfileDataToLocal('profession', profession);
                                                        setPopupCases(7)
                                                    }}
                                                    btnStyle={{ position: 'relative', marginTop: 50, alignSelf: 'flex-end' }}
                                                    title="Next"
                                                />
                                            </View>
                                            :
                                            popupCases == 7 ? // ADD SKILLS
                                                <View style={[styles.popupContainer, { paddingBottom: 20 }]}>
                                                    <BackPopupBtn />
                                                    {/* <CrossBtn /> */}
                                                    <Text style={styles.popupHeading}>Add skills</Text>
                                                    <Text style={{ color: '#241414', fontFamily: fonts.MRe, fontSize: 12, }}>choose the best skills and qualifications you have</Text>
                                                    <View>
                                                        <TextInput
                                                            placeholder=''
                                                            ref={(ref) => textInputRef = ref}
                                                            placeholderTextColor={"#7b7b7b"}
                                                            onChangeText={(v) => setSkill(v)}
                                                            style={{
                                                                width: "100%", height: 47, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                                                                fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10, marginTop: 10
                                                            }}
                                                        />
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                if (skill.length > 0) {
                                                                    textInputRef.clear();
                                                                    doMakeSkills()
                                                                }

                                                            }}
                                                            style={{ position: 'absolute', padding: 10, marginTop: 0, right: 0 }}>
                                                            <Text style={{ fontSize: 34, color: '#241414', fontFamily: fonts.MRe, }}>+</Text>
                                                        </TouchableOpacity>
                                                        <View style={{ flexDirection: 'row', width: "100%", marginTop: 10, flexWrap: 'wrap' }}>
                                                            {

                                                                skillsArr.map((v, i) => {
                                                                    return (
                                                                        <View
                                                                            key={i}
                                                                            style={{
                                                                                paddingHorizontal: 8, height: 28, borderRadius: 18, backgroundColor: '#b9b1f0', flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10
                                                                            }}>
                                                                            <Text style={{ color: '#ffffff', fontFamily: fonts.MRe, fontSize: 8, }}>{v}</Text>
                                                                            <TouchableOpacity
                                                                                onPress={() => doSpliceSkills(v)}
                                                                            >
                                                                                <Text style={{ color: '#ffffff', fontFamily: fonts.MMe, fontSize: 9, marginLeft: 10 }}>X</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )
                                                                })
                                                            }
                                                        </View>


                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 150, width: "95%", alignSelf: 'center' }}>
                                                        {/* <TouchableOpacity>
                                                            <Text style={{ color: '#5b4dbc', fontFamily: fonts.MSBo, fontSize: 12, }}>I’ll do it later</Text>
                                                        </TouchableOpacity> */}
                                                        <PopupButton
                                                            onPress={() => {
                                                                if (skillsArr.length == 0) {
                                                                    modalAlertRef.alertWithType('error', "Error", "Please enter atleast one skill");
                                                                    return;
                                                                }
                                                                let data = {
                                                                    addSkills: skillsArr,
                                                                    nextCase: 8
                                                                }
                                                                saveTempProfileDataToLocal('addSkills', data)
                                                                setPopupCases(8)
                                                            }}
                                                            btnStyle={{ position: 'relative', top: 0, right: 0 }}
                                                            title="Next"
                                                        />

                                                    </View>
                                                </View >
                                                :
                                                popupCases == 8 ?
                                                    <ThemesLikePopup />
                                                    :
                                                    // popupCases == 9 ?
                                                    //     <LinkSocialPopup />
                                                    //     :
                                                    popupCases == 9 || popupCases == 10 ? // PREFERENCE POPUP
                                                        <View style={[styles.popupContainer, { paddingBottom: 10, paddingHorizontal: 20 }]} >
                                                            <BackPopupBtn />
                                                            {/* <CrossBtn /> */}
                                                            <Text style={styles.popupHeading}>Preferences</Text>
                                                            <Text style={{ color: '#241414', fontFamily: fonts.MRe, fontSize: 12, }}>Set your app preferences</Text>
                                                            <View style={styles.linkSocialRowView}>
                                                                <Text style={styles.linkSocialTitle}>Display my profile{"\n"}to everyone</Text>
                                                                <Switch
                                                                    trackColor={{ false: "#767577", true: "rgba(0,0,0,0.5)" }}
                                                                    thumbColor={displayProfile ? "#ffa183" : "#f4f3f4"}
                                                                    onValueChange={() => setDisplayProfile(!displayProfile)}
                                                                    value={displayProfile}
                                                                    // thumbColor={"#fffffff"}
                                                                    ios_backgroundColor="#3e3e3e"
                                                                />
                                                            </View>
                                                            <Text style={{ color: '#241414', fontFamily: fonts.MRe, fontSize: 12, }}>* Your Profile Information can’t be hidden
                                                                to hosts and fellows you have bookings
                                                                with</Text>
                                                            <View style={styles.linkSocialRowView}>
                                                                <Text style={styles.linkSocialTitle}>Alert when happenings{"\n"}are near me</Text>
                                                                <Switch
                                                                    trackColor={{ false: "#767577", true: "rgba(0,0,0,0.5)" }}
                                                                    thumbColor={alertHappening ? "#ffa183" : "#f4f3f4"}
                                                                    onValueChange={() => setAlertHappening(!alertHappening)}
                                                                    value={alertHappening}
                                                                    // thumbColor={"#fffffff"}
                                                                    ios_backgroundColor="#3e3e3e"
                                                                />
                                                            </View>
                                                            {/* <Text style={{ color: '#5d5760', fontFamily: fonts.PSBo, fontSize: 17, alignSelf: 'center', marginTop: 20 }}>6 Miles</Text> */}
                                                            <TextInput
                                                                placeholder={distanceUnit}
                                                                value={distance}
                                                                onChangeText={setDistance}
                                                                keyboardType='number-pad'
                                                                placeholderTextColor={"#7b7b7b"}
                                                                style={{
                                                                    width: "90%", height: 40, textTransform: 'capitalize', marginVertical: 15, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                                                                    fontSize: 14, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10,
                                                                }}
                                                            />
                                                            {/* <Image
                                                                    style={{ marginVertical: -15, alignSelf: 'center' }}
                                                                    source={require('../../static_assets/bar.png')}
                                                                /> */}
                                                            <View style={{ flexDirection: 'row', width: "30%", height: 18, alignSelf: 'center', backgroundColor: 'white', borderWidth: 1, borderRadius: 20, borderColor: '#707070' }}>
                                                                <TouchableOpacity
                                                                    onPress={() => setDistanceUnit('Miles')}
                                                                    style={{ width: "50%", height: "100%", alignItems: 'center', justifyContent: 'center', backgroundColor: distanceUnit == 'miles' ? '#5b4dbc' : "white", borderRadius: 20 }}>
                                                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: distanceUnit == 'miles' ? 'white' : "#5b4dbc" }}>Miles</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                    onPress={() => setDistanceUnit('Kms')}
                                                                    style={{ width: "50%", height: "100%", alignItems: 'center', justifyContent: 'center', backgroundColor: distanceUnit == 'Kms' ? '#5b4dbc' : "white", borderRadius: 20 }}>
                                                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: distanceUnit == 'Kms' ? 'white' : "#5b4dbc" }}>Kms</Text>
                                                                </TouchableOpacity>

                                                            </View>
                                                            <PopupButton
                                                                onPress={() => {
                                                                    if (distance == "" && alertHappening) {
                                                                        modalAlertRef.alertWithType('error', "Error", "Please enter distance")
                                                                        return
                                                                    }
                                                                    doUploadProfileData();
                                                                }}
                                                                btnStyle={{ position: 'relative', alignSelf: 'flex-end', marginTop: 30 }}
                                                                title="Next"
                                                            />
                                                        </View >
                                                        :
                                                        popupCases == 11 ?
                                                            <FinishPopup />
                                                            :
                                                            <View style={styles.popupContainer}>
                                                                <Text style={styles.popupHeading}>Hey Jules!</Text>
                                                                <Text style={styles.popupHeading}>You are under  12 years old. Unfortunately, You cannot have a Local Happinez account!</Text>
                                                                <PopupButton
                                                                    onPress={() => setPopup1(false)}
                                                                    title="Next"
                                                                />
                                                            </View>

                }



            </Modal>
            {loading && <Loader />}
            <AlertPopup ref={(ref) => alertRef = ref} />
        </TouchableOpacity >

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
    }


})



export default ProfileCompletionSteps
