import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Platform, TouchableOpacityComponent, } from 'react-native'

import { Context } from '../../Context/DataContext';
import { capitalizeFirstLetter, getHeight, months, retrieveItem, storeItem, uploadSingleFile, useForceUpdate } from '../../utils/functions'
import Loader from '../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import { acolors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { navigate, navigateFromStack } from '../../../Navigations';
import { changeLoggedIn } from '../../../Common';
import { ArrowForward, CrossIcon, DonationIcon, EditPencilIcon, HappeningLocationIconSmall, InfoIcon, LocationIcon, NextIcon, RecursionIcon, SettingsIcon } from '../../components/Svgs';
import AlertMsg from '../../common/AlertMsg';
import { apiRequest } from '../../utils/apiCalls';
import ProfileTab from './ProfileTab';
import { ReviewedHappening } from '../../components/NotificationCards';
import { AddedPhotosTimeLine, EditBioSkillsTimeLine, LiveHappeningTimeLine, ReviewedHappeningTimeLine, SubmitHappeningTimeLine, UpdatedPhotoTimeLine } from '../../components/TimeLineCards';
import { RefreshControl } from 'react-native';
import EditProfile from './EditProfile';
import { urls } from '../../utils/Api_urls';
import GeneralStatusBar from '../../components/GernalStatusBar';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';
import AlertPopup from '../../common/AlertPopup';



var alertRef;

const Profile = (props) => {

    const { state, setHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState('Profile');

    const forceUpdate = useForceUpdate();
    const isFocused = useIsFocused();
    const [bookingStatusAlert, setBookingStatusAlert] = useState(false)
    const [bookingStatusAlertMsg, setBookingStatusAlertMsg] = useState('');

    const [myHostings, setMyHostings] = useState([]);

    const [confirmSignOut, setConfirmSignOut] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [myBookings, setMyBookings] = useState([]);
    const [profileData, setProfileData] = useState({});

    const [isEditProfile, setEditProfile] = useState(false);
    const [profilePic, setProfilePic] = useState(''); // WHEN EDITING THE PROFILE
    const [fellows, setFellows] = useState([]);
    const [seeAllModal, setSeeAllModal] = useState(false);
    const [isGuest, setIsGuest] = useState(false);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const loginData = state.userData;



    // "Timeline",
    const tabs = ["Profile", "My Hostings", "Bookings", "Timeline"];

    const happeningStatuses = ["underReview", "approved", "rejected", "cancelled"];

    const happeningStatusesText = {
        underReview: {
            status: "Under Review",
            text: "view details"
        },
        approved: {
            status: "approved"
        },
        rejected: {
            status: "Rejected"
        },
        cancelled: {
            status: "Cancelled"
        }

    }

    async function uploadPic() {
        const res = await uploadSingleFile();
        setProfilePic(res);

    }

    function makeFromToMonthDate(item) {

        let startingDate = item?.startingDate;
        let endingDate = item?.endDate;
        let getMonth = endingDate?.substring(5, 7);
        if (getMonth && getMonth[0] == 0) { getMonth = months[getMonth[1] - 1] } else getMonth = months[getMonth - 1];
        if (startingDate && endingDate) return startingDate?.substring(startingDate?.length, startingDate?.length - 2) + " " + getMonth;
        else return "12-25\n Dec";
    }

    async function doEditProfile(v) {


        try {
            setLoading(true)
            const loginData = await retrieveItem('login_data');
            var data = new FormData();

            const reqObj = {
                token: loginData?.token,
                bio: v.bio,
                LanguagesKnown: v.languageKnown,
                profession: v.profession,
                addSkills: v.skills,
                profileImage: profilePic
            }


            if (!reqObj.profileImage) delete reqObj.profileImage;
            for (let key in reqObj) {
                data.append(key, reqObj[key]);
            }
            let url = urls.API + "profile/update-profile";
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
                    setLoading(false)
                    if (data.status) {
                        // alertRef.alertWithType('success', 'Success', 'Profile Updated')
                        setEditProfile(false)
                        getProfileDetails();
                        storeItem('profile_data', data.data)
                    }
                    else {
                        alertRef.alertWithType('error', "Error", data.message)
                    }
                })
                .catch(error => {
                    console.log('error', error)
                    alertRef.alertWithType('error', urls.error_title, urls.error)
                    setLoading(false)
                })
        }
        catch (err) {
            console.log('errpr', err)
            setLoading(false)
        }

    }

    async function getMyHostings(refreshing = false) {
        !refreshing && setLoading(true);
        // console.log('getMyHosting/' + state.userData._id)
        apiRequest('', 'booking/getMyHosting/', 'GET')
            .then(data => {
                setLoading(false);
                setRefreshing(false);
                if (data.status) {
                    setMyHostings(data.data)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    };

    async function getProfileDetails(refreshing = false) {
        !refreshing && setLoading(true);
        // console.log('getMyHosting/' + state.userData._id)
        apiRequest('', 'auth/getUserDetails', 'GET')
            .then(data => {

                setLoading(false);
                if (data.status) {
                    setProfileData(data.data)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    };

    async function getMyBookings(refreshing = false) {
        !refreshing && setLoading(true);
        // console.log('getMyHosting/' + state.userData._id)
        apiRequest('', 'booking/getUserBookingDetails', 'GET')
            .then(data => {
                setLoading(false);
                setRefreshing(false);

                // if (data.status) {
                setMyBookings(data?.data.reverse())
                // }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getMyHostings(true)
        // wait(2000).then(() => setRefreshing(false));
    }, []);

    async function getLocationByIp() {
        let publicIp = await fetch('https://api.ipify.org/?format=json')
        publicIp = await publicIp.json();
    }

    useEffect(() => {
        setLoading(true);
        retrieveItem('login_data')
            .then(data => {
                console.log('login_data', data);
                if (data) {
                    getProfileDetails();
                    getMyHostings();
                }
                else {
                    setIsGuest(true)
                    setLoading(false);
                }
            })


        // getLocationByIp();
    }, []);

    useEffect(() => {
        if (props.route.params?.focused) {
            setSelectedTab(props.route.params?.focused);
            forceUpdate()
            getMyBookings();
            getMyHostings();

        }


    }, [tabs == 'My Hostings', isFocused])


    const BookingsTab = () => (
        <>
            {/* <TouchableOpacity
                onPress={() => navigateFromStack('BookingStack', 'RecursionDates')}
                style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }} >
                <View style={{ backgroundColor: '#9086D0', height: 15, alignItems: 'center', justifyContent: 'center', borderRadius: 20, width: 30, }}>
                    <RecursionIcon />
                </View>
                <Text style={{ marginLeft: 5, fontFamily: fonts.PSBo, fontSize: 8, color: '#5B4DBC', textDecorationLine: 'underline' }}>View all recursions</Text>
            </TouchableOpacity> */}
            {
                // [{ status: 'Confirmed' }, { status: 'Pending' }, { status: 'Cancelled' },
                // { status: 'awaiting 4 fellows' }, { status: 'Rejected' }, { status: 'Cancellation request pending' }]
                myBookings?.map((v, i) => {

                    let fellowLength = v?.fellow?.length;
                    let happening = v.booking?.happeningId;
                    const date = new Date(happening?.startingDate)
                    const dayOfWeek = daysOfWeek[(date.getDay() + 1) % 7];
                    const dateString = dayOfWeek + ", " + date.getDate() + " " + months[date.getMonth()];
                    if (i == 0) console.log(happening?.happeningOnLocation)

                    return (
                        <View
                            key={i}
                            style={styles.bookingCard}>
                            <View style={{ flexDirection: 'row', width: "100%", }}>
                                <View style={{ width: "50%" }}>
                                    <Text style={styles.bookingDate}>{dateString} - {happening?.happeningOnLocation ? "On Location" : "Online"}</Text>
                                    <Text style={styles.bookingTime}>{happening?.startTime} - {happening.endTime}</Text>
                                    {/* <Image
                                        // style={{width:40,height:40,borderRadius:20}}
                                        source={require('../../static_assets/peopleJoinedImages.png')}
                                    /> */}
                                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                        {
                                            v.fellow.map((v, i) => {

                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => {

                                                            const body = {
                                                                data: {
                                                                    userProfileId: {
                                                                        userId: {
                                                                            _id: v?.profileAndTimeline?.userId?._id
                                                                        }
                                                                    }
                                                                }

                                                            }
                                                            // console.log(body?.data?.userProfileId?.userId)
                                                            // return;
                                                            navigateFromStack('BookingStack', 'ProfilePublicView', body)
                                                        }}
                                                    >
                                                        <Image
                                                            style={{ width: 40, height: 40, borderRadius: 20, marginLeft: -15 }}
                                                            source={{ uri: v?.profileAndTimeline?.profileImage }}
                                                        />
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                    <View style={{ flexDirection: 'row', }}>

                                        {
                                            v?.fellow?.map((v, i) => {
                                                return (
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={[styles.peopleWhoJoinedText]}>{v?.profileAndTimeline?.userId?.firstName ?? ""} </Text>
                                                        {fellowLength !== i + 1 && v?.profileAndTimeline?.userId?.firstName && <Text style={[styles.peopleWhoJoinedText]}>, </Text>}
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                    {
                                        v.fellow?.length > 0 &&
                                        <TouchableOpacity
                                            onPress={() => {
                                                setFellows(v.fellow);
                                                setSeeAllModal(true);

                                            }}
                                        >
                                            <Text style={styles.seeAll}>See all</Text>
                                        </TouchableOpacity>
                                    }
                                    <TouchableOpacity
                                        onPress={() => {
                                            // console.log('v.booking.status',v)
                                            // return;
                                            switch (v.booking.status) {

                                                case 'approved':
                                                    navigateFromStack('BookingStack', 'ConfirmHappeningStatus', v)
                                                    return;
                                                case 'pending':
                                                    setBookingStatusAlertMsg('The host needs to approve your join request for the booking. ')
                                                    break
                                                case 'awaiting 4 fellows':
                                                    navigateFromStack('BookingStack', 'AwaitingFellows')
                                                    return
                                                case 'Reject':
                                                    setBookingStatusAlertMsg('The host has rejected your request for joining. ')
                                                    break
                                                case 'Cancellation request pending':
                                                    setBookingStatusAlertMsg('Your cancellation request is under review.')
                                                    break
                                                case 'cancelled':
                                                    setBookingStatusAlertMsg('This booking has been cancelled by you.')
                                                    break
                                                default: break

                                            }
                                            setBookingStatusAlert(true)

                                        }}

                                        style={[styles.bookingStatusContainer, v.booking.status !== 'approved' && { borderColor: '#E53535' }]}>
                                        <Text style={[styles.bookingStatus, v.booking.status !== 'approved' && { color: '#E53535' }]}>{v.booking.status == 'Reject' ? 'Rejected' : capitalizeFirstLetter(v.booking?.status)} </Text>
                                        {v.booking.status !== 'approved' ?
                                            <InfoIcon color="#E53535" />

                                            :
                                            <Text style={[styles.bookingStatus, { textDecorationLine: 'underline' }]}>Get meet details</Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: "49%", marginLeft: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigateFromStack('BookingStack', 'HappeningDetails', happening)
                                        }}
                                    >
                                        <Image
                                            source={{ uri: happening?.addPhotosOfYourHappening[0] }}
                                            style={{ width: "100%", height: 103, borderRadius: 21, }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={[styles.bookingTitle, { width: "90%" }]}>{happening?.happeningTitle}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                const body = {
                                                    data: happening
                                                }
                                                navigateFromStack('BookingStack', 'ProfilePublicView', body)
                                            }}
                                        >
                                            <Image
                                                style={{ width: 33, height: 33, borderRadius: 33 / 2, marginRight: 10 }}
                                                source={{ uri: happening?.userProfileId?.profileImage }}
                                            />
                                        </TouchableOpacity>
                                        <Text style={[styles.hostedBy, { width: "80%" }]}>Hosted by{"\n"}{happening?.userProfileId?.userId?.firstName + " " + happening?.userProfileId?.userId?.lastName}</Text>
                                    </View>
                                </View>

                            </View>

                        </View>
                    )

                })
            }

        </>
    );

    const HostingTab = () => (
        <>
            <FlatList
                data={myHostings}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ paddingBottom: 500 }}
                renderItem={({ item, index }) => {
                    // item.startingDate
                    // console.log('item==',item)
                    // console.log('item.addPhotosOfYourHappening', item._id)
                    return (
                        <TouchableOpacity
                            activeOpacity={1}
                            // disabled={true}
                            onPress={() => {
                                item.status == 'happening canceled' ? navigateFromStack('BookingStack', 'MyHappeningDetails', { params: 'cancelled' }) :
                                    navigateFromStack('BookingStack', 'AllBookings', item)
                            }}
                            style={{ width: "48%", marginTop: 20, }}>
                            <View>
                                <Image
                                    // source={require('../../static_assets/content.png')}
                                    source={item.addPhotosOfYourHappening ? { uri: typeof item.addPhotosOfYourHappening[0] == 'string' ? item.addPhotosOfYourHappening[0] : '' } : require('../../static_assets/content.png')}
                                    style={{ width: '100%', height: 230, borderRadius: 10, }}
                                />
                                <View style={[styles.shadow, { position: 'absolute', bottom: 10, width: "85%", alignSelf: 'center', borderRadius: 20, backgroundColor: '#675AC1', }
                                    // , index == 2 && { backgroundColor: '#FFA183' }, item == 'cancelled' && { backgroundColor: '#D94A55' }
                                ]}
                                >

                                    <View style={[{ flexDirection: 'row', height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 20, }, item == 'underReview' && { borderWidth: 3, borderColor: '#B9B1F0' }]}>
                                        <Text style={{ fontFamily: fonts.PBo, fontSize: 14, color: item.status == 'happening canceled' ? 'red' : '#675AC1', textTransform: 'capitalize' }}>
                                            {item.status == 'happening canceled' ? 'Cancelled' : item.status}
                                            {/* {index == 3 || 2 ? "view details" : index == 0 ? "under review" : "2 new requests"} */}
                                        </Text>
                                        {/* {index != 0 && <NextIcon />} */}
                                    </View>
                                </View>
                            </View>
                            <Text style={{ fontFamily: fonts.PMe, fontSize: 11, color: '#5D5760', marginTop: 10 }}>{item.happeningTitle}</Text>
                            <View
                                style={{ position: 'absolute', top: 8, right: 8, width: 100, overflow: 'visible', paddingHorizontal: 10, height: 30, borderRadius: 15, backgroundColor: '#FFFFFF', borderColor: '#707070', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Text style={{ fontFamily: fonts.PMe, fontSize: 12, color: acolors.btnSecondry, textTransform: 'capitalize' }}>
                                    {makeFromToMonthDate(item)}
                                    {/* {index == 3 || 2 ? "view details" : index == 0 ? "under review" : "2 new requests"} */}
                                </Text>
                                {/* <EditPencilIcon /> */}
                            </View>
                            <TouchableOpacity
                                onPress={() => navigate('EditHappening', item)}
                                style={{ position: 'absolute', top: -10, right: 0, backgroundColor: 'rgba(255,255,255,1)', elevation: 4, borderRadius: 35 / 2, width: 35, height: 35, alignItems: 'center', justifyContent: 'center', shadowOpacity: 0.5, shadowColor: 'rgba(0,0,0,0.5)' }} >
                                <EditPencilIcon />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )
                }}

            />
        </>
    )

    const CrossBtn = () => (
        <TouchableOpacity
            onPress={() => {
                setSeeAllModal(false);
            }}
            style={[styles.crossBtn, styles.shadow]}>
            <CrossIcon />
        </TouchableOpacity>
    )


    const SeeAllModalView = () => {
        return <ReactNativeModal
            isVisible={seeAllModal}
        >
            <View style={[styles.shadow, { width: '100%', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 15, }]}>
                <CrossBtn />
                <Text style={[styles.heading, { marginTop: 10 }]}>Fellows</Text>
                {
                    fellows.length && fellows.map((v, i) => {
                        return (
                            <>

                                <TouchableOpacity
                                    onPress={() => {
                                        const body = {
                                            data: {
                                                userProfileId: {
                                                    userId: {
                                                        _id: v?.profileAndTimeline?.userId?._id
                                                    }
                                                }
                                            }

                                        }
                                        setSeeAllModal(false);
                                        navigateFromStack('BookingStack', 'ProfilePublicView', body);
                                    }}
                                    style={[{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 10 }]}>
                                    <Image
                                        style={{ width: 42, height: 42, borderRadius: 42 / 2 }}
                                        source={{ uri: v?.profileAndTimeline?.profileImage }}
                                    />
                                    <Text style={{ fontFamily: fonts.PBo, fontSize: 12, color: "#2A2A2A", marginLeft: 10 }}>{v?.profileAndTimeline?.userId?.firstName} {v?.profileAndTimeline?.userId?.lastName} </Text>
                                </TouchableOpacity>
                            </>
                        )
                    })

                }
            </View>

        </ReactNativeModal>
    }


    if (isGuest) {
        return (
            <View style={{ backgroundColor: '#ffffff', flex: 1, }}>
                <GeneralStatusBar backgroundColor='white' barStyle="light-content" />
                {loading && <Loader />}

                <View
                    style={{ width: 115, height: 115, alignSelf: 'center' }}
                >
                    <Image
                        style={{ width: 115, height: 115, borderRadius: 115 / 2, borderWidth: 5, borderColor: acolors.primary, alignSelf: 'center', marginTop: 20 }}
                        source={{ uri: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png' }}
                    // source={{ uri: profilePic.uri ?? profileData?.userProfile?.profileImage }}
                    />
                </View>
                <Text style={[styles.headingText, { marginTop: 5, alignSelf: 'center', marginTop: 20 }]}>{"Guest"}</Text>

                <View style={{ position: 'absolute', bottom: Platform.OS == 'ios' ? 80 : 50, paddingTop: 10, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingHorizontal: 20, elevation: 5, alignItems: 'center', paddingBottom: 10, shadowOffset: { width: 1, height: 1 } }}>

                    <TouchableOpacity onPress={() => navigate('AuthStack')}>
                        <Text style={styles.signOut}>Sign up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('ThingsConsider')}
                        style={styles.submitHappeningBtn}>
                        <Text style={styles.submitHappeningText}>+ Submit a Happening</Text>
                    </TouchableOpacity>


                </View>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <GeneralStatusBar backgroundColor='white' barStyle="light-content" />
            {loading && <Loader />}

            <AlertMsg
                heading={bookingStatusAlertMsg}
                desc=""
                renderBtn={false}
                // descStyle={{ lineHeight: 22, color: '#5D5760', fontFamily: fonts.PSBo }}
                btnTitle="Done"
                state={bookingStatusAlert}
                onBackdropPress={() => setBookingStatusAlert(false)}
                onPress={() => setBookingStatusAlert(false)}
                containerStyle={{ paddingHorizontal: 25, paddingBottom: 10, paddingTop: 10 }}
            />
            <AlertMsg
                heading={"Do you really want to sign out ?"}
                desc=""
                renderBtn={false}
                // descStyle={{ lineHeight: 22, color: '#5D5760', fontFamily: fonts.PSBo }}
                btnTitle="Done"
                state={confirmSignOut}
                onBackdropPress={() => setConfirmSignOut(false)}
                onPress={() => setConfirmSignOut(false)}
                containerStyle={{ paddingHorizontal: 25, paddingBottom: 50, paddingTop: 20 }}
                children={(
                    <View style={{ flexDirection: 'row', width: "100%", marginTop: 0, justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            style={[styles.popupBtn]}
                            onPress={() => setConfirmSignOut(false)}
                        >
                            <Text style={styles.popupBtnTitle}>{"No, I’ll stay"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.popupBtn, { borderWidth: 1, borderColor: '#5B4DBC', backgroundColor: 'white' }]}
                            onPress={() => {
                                storeItem('login_data', '');
                                storeItem('profile_data', '');
                                changeLoggedIn.changeNow(2);
                            }}
                        >
                            <Text style={[styles.popupBtnTitle, { color: '#5B4DBC' }]}>{"Sign out"}</Text>
                        </TouchableOpacity>

                    </View>
                )
                }
            />


            {

                <View style={{ flexDirection: 'row', width: "90%", alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.hi}>Hi<Text style={styles.julesRobinson}> {loginData?.firstName} {loginData?.lastName} </Text></Text>
                        <Text style={styles.discoverWhat}>Discover what’s happening</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigate('Profilee')}
                    >
                        <Image
                            style={styles.avator}
                            source={{ uri: state.profileData?.profileImage }} // require('../../assets/img1.png')
                        />
                    </TouchableOpacity>
                </View>
            }
            <View style={{ width: "90%", alignSelf: 'center', marginTop: getHeight(3), marginBottom: getHeight(2) }}>
                <Text style={{ fontFamily: fonts.PBo, fontSize: 28, color: acolors.primary }}>My Wall</Text>
            </View>

            <TouchableOpacity onPress={() => navigate("ReviewStep1", {
                happeningId: "64782983acf030ad8211a6d0",
                location: {
                    "type": "Point",
                    "coordinates": [
                        34.05223511,
                        -118.24368311
                    ]
                },
            })} >
                <Text style={{ color: 'black', fontSize: 20, alignSelf: 'center' }} >Fellow Rating & Review</Text>
            </TouchableOpacity>

            {/* <View
                style={{ width: 115, height: 115, alignSelf: 'center' }}
            >
                <TouchableOpacity
                    onPress={() => setSelectedTab('Profile')}
                >
                    <Image
                        style={{ width: 115, height: 115, borderRadius: 115 / 2, borderWidth: 5, borderColor: acolors.primary, alignSelf: 'center', marginTop: 20 }}
                        source={{ uri: isEditProfile == true && profilePic?.uri ? profilePic.uri : profileData?.userProfile?.profileImage }}
                    // source={{ uri: profilePic.uri ?? profileData?.userProfile?.profileImage }}
                    />
                </TouchableOpacity>
                {isEditProfile &&
                    <TouchableOpacity
                        disabled={!isEditProfile}
                        onPress={() => uploadPic()}
                        style={{ position: 'absolute', right: 0, bottom: -10, alignSelf: 'center', width: 30, height: 30, borderRadius: 15, backgroundColor: '#9086d0', alignItems: 'center', justifyContent: 'center' }}>
                        <EditPencilIcon width={12} height={20} color={'white'} />
                    </TouchableOpacity>

                }
            </View> */}

            {/* {
                !isEditProfile &&
                <TouchableOpacity
                    onPress={() => navigate('SettingsScreen')}
                    style={{ position: 'absolute', top: 60, right: 20, alignItems: 'center' }}>
                    <SettingsIcon />
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 10, color: '#000000', marginTop: 2 }}>Settings</Text>
                </TouchableOpacity>
            } */}
            {/* <TouchableOpacity
                    onPress={() => navigate('DonationAmount')}
                    style={{ position: 'absolute', top: 20, left: 20, alignItems: 'center' }}>
                    <DonationIcon />
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 10, color: '#000000', marginTop: 2 }}>Donate</Text>
                </TouchableOpacity> */}

            {
                isEditProfile &&
                <>
                    <TouchableOpacity
                        onPress={() => setEditProfile(false)}
                        style={{ position: 'absolute', top: 60, right: 20, alignItems: 'center' }}>
                        <Text style={{ fontFamily: fonts.PMe, fontSize: 14, color: '#000000', }}>Cancel</Text>
                    </TouchableOpacity>
                </>
            }

            {/* {profileData?.userProfile?.address !== "Not Provided" || profileData?.userProfile?.address !== '' && <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 30 }}>
                <HappeningLocationIconSmall width={11} height={14} />
                <Text style={{ fontFamily: fonts.MSBo, fontSize: 9, color: '#5B4DBC', marginLeft: 5, }}>{profileData?.userProfile?.address} </Text>
            </View>
            } */}
            {/* <Text style={[styles.headingText, { marginTop: 5, alignSelf: 'center', marginTop: 20 }]}>{profileData?.userProfile?.userId?.firstName.concat(' ' + profileData?.userProfile?.userId?.lastName)}</Text> */}
            <View style={{ width: "90%", alignSelf: 'center', marginTop: 10 }}>
                {
                    !isEditProfile &&

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            horizontal={true}>
                            {
                                tabs.map((v, i) => {
                                    return (
                                        <TouchableOpacity
                                            style={{ marginBottom: 5, marginLeft: 15 }}
                                            onPress={() => {
                                                v == "My Hostings" && getMyHostings();
                                                v == "Bookings" && getMyBookings();
                                                setSelectedTab(v)

                                            }}
                                            key={i}
                                        >
                                            <Text style={[selectedTab == v ? styles.selectedTabText : styles.unSelectedTabText]} >{v}</Text>
                                            {selectedTab == v && <View style={{ marginTop: 5, width: 20, backgroundColor: '#5B4DBC', height: 3, borderRadius: 10, }}></View>}
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                }


                {
                    selectedTab == "Bookings" &&
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 500 }} >
                        <BookingsTab />
                    </ScrollView>
                }

                {
                    selectedTab == "My Hostings" &&
                    <HostingTab />
                }
                {
                    selectedTab == "Profile" &&
                    <ScrollView contentContainerStyle={{ paddingBottom: isEditProfile ? 400 : 500 }} showsVerticalScrollIndicator={false} >
                        {isEditProfile ? <EditProfile
                            alert={(val1, val2, val3) => alertRef.alertWithType(val1, val2, val3)}
                            data={profileData}
                            onPressEdit={(obj) => doEditProfile(obj)}
                        /> : <ProfileTab data={profileData} onPressEdit={() => setEditProfile(true)} />}
                    </ScrollView>
                }
                {
                    selectedTab == 'Timeline' &&
                    <ScrollView contentContainerStyle={{ paddingBottom: 400 }} showsVerticalScrollIndicator={false} >
                        <View style={{ position: 'absolute', left: 20, top: 0, width: 4, height: "100%", backgroundColor: "rgba(34,34,34,0.15)", borderRadius: 2 }} />
                        <ReviewedHappeningTimeLine key={"Reviewed a Happening"} cardTitle="Reviewed a Happening" title="Fishing Line Cleanup" reviewText="Awesome Experience !" reviewDesc="Nunc justo eros, vehicula vel vehicula ut, lacinia a erat. Nam fringilla eros..." />
                        <SubmitHappeningTimeLine containerStyle={{ marginTop: 15 }} />
                        <AddedPhotosTimeLine containerStyle={{ marginTop: 15 }} />
                        <EditBioSkillsTimeLine key={"Edited her bio"} title="Edited her bio" desc={"Nunc justo eros, vehicula vel vehicula ut, lacinia a erat. Nam fringilla eros..."} containerStyle={{ marginTop: 15 }} />
                        <EditBioSkillsTimeLine key={"Edited her Skills"} title="Edited her Skills" desc={"Painting, Designing, Driving Diving"} containerStyle={{ marginTop: 15 }} />
                        <ReviewedHappeningTimeLine key={"ReceivedReview"} containerStyle={{ marginTop: 15 }} cardTitle="Received a review" title="Restore coral reefs in open sea" reviewText="Wonderful Host!" reviewDesc="Nunc justo eros, vehicula vel vehicula ut, lacinia a erat. Nam fringilla eros..." />
                        <ReviewedHappeningTimeLine key={"Reviewed"} containerStyle={{ marginTop: 15 }} cardTitle="Reviewed" title="Akram" reviewText="Wonderful Host!" reviewDesc="Nunc justo eros, vehicula vel vehicula ut, lacinia a erat. Nam fringilla eros..." />
                        <ReviewedHappeningTimeLine key={"Reviewed by"} containerStyle={{ marginTop: 15 }} cardTitle="Reviewed by" title="Akram" reviewText="Wonderful Host!" reviewDesc="Nunc justo eros, vehicula vel vehicula ut, lacinia a erat. Nam fringilla eros..." />
                        <LiveHappeningTimeLine key={1} containerStyle={{ marginTop: 15 }} cardTitle="Has a Live Happening at Dubai" title="Restore coral reefs in open sea" />
                        <LiveHappeningTimeLine key={2} containerStyle={{ marginTop: 15 }} cardTitle="is Live in Akram’s Happening in London" title="Restore coral reefs in open sea" />
                        <UpdatedPhotoTimeLine containerStyle={{ marginTop: 15 }} cardTitle="is Live in Akram’s Happening in London" title="Restore coral reefs in open sea" />
                    </ScrollView>
                }

            </View>
            <View style={{ position: 'absolute', bottom: Platform.OS == 'ios' ? 80 : 50, paddingTop: 10, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingHorizontal: 20, elevation: 5, alignItems: 'center', paddingBottom: 10, shadowOffset: { width: 1, height: 1 } }}>
                {
                    !isEditProfile &&
                    <>
                        <TouchableOpacity onPress={() => setConfirmSignOut(true)}>
                            <Text style={styles.signOut}>Sign Out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigate('ThingsConsider')}
                            style={styles.submitHappeningBtn}>
                            <Text style={styles.submitHappeningText}>+ Submit a Happening</Text>
                        </TouchableOpacity>

                    </>
                }
            </View>


            <AlertPopup ref={(ref) => alertRef = ref} />
            <SeeAllModalView />
        </View>
    )
}


const styles = StyleSheet.create({
    headingText: {
        color: '#FFA183', fontFamily: fonts.PBo, fontSize: 30,
    },
    selectedTabText: {
        fontFamily: fonts.PSBo, fontSize: 14, color: '#5B4DBC'
    },
    unSelectedTabText: {
        fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760',
    },
    bookingCard: {
        width: "98%", alignSelf: 'center', marginTop: 20, elevation: 5, backgroundColor: 'white', padding: 10,
        shadowColor: '#dedede', shadowOpacity: 0.4, margin: 5, borderRadius: 10, paddingHorizontal: 14
    },
    bookingDate: {
        fontFamily: fonts.PSBo, fontSize: 10, color: '#5B4DBC'
    },
    bookingTime: {
        color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 18
    },
    peopleWhoJoinedText: {
        color: '#484658', fontSize: 10, fontFamily: fonts.PSBo, marginTop: 10
    },
    seeAll: {
        color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 12, textDecorationLine: 'underline'
    },
    bookingStatusContainer: {
        height: 29, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10,
        borderWidth: 1, borderColor: '#5B4DBC', borderRadius: 25, marginTop: 10
    },
    bookingStatus: {
        color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 8
    },
    bookingTitle: {
        color: '#4F4E50', fontFamily: fonts.PBo, fontSize: 10, marginTop: 10,
    },
    hostedBy: {
        color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 9,
    },
    signOut: {
        color: '#5D5760', fontFamily: fonts.PRe, fontSize: 14,
    },
    submitHappeningBtn: {
        width: "50%", height: 47, borderRadius: 20, backgroundColor: '#5B4DBC', alignItems: 'center', justifyContent: 'center',
    },
    submitHappeningText: {
        color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 13,
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.8)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 0, shadowOpacity: 0, elevation: 5,
        backgroundColor: 'white'
    },
    popupBtn: {
        width: "49%", height: 29, borderRadius: 20, backgroundColor: '#5b4dbc',
        alignItems: 'center', justifyContent: 'center'
    },
    popupBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },
    heading: {
        color: '#675AC1', fontFamily: fonts.PBo, fontSize: 29, marginTop: 20,
    },
    crossBtn: {
        position: 'absolute', top: -20, right: -10, width: 43, height: 43, borderRadius: 43 / 2,
        backgroundColor: 'white', elevation: 2, alignItems: 'center', justifyContent: 'center',
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



})
export default Profile

