import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView, StyleSheet, Platform } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert'
import { FlatList } from 'react-native-gesture-handler'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { goBack, navigate, navigateFromStack, navigateReplace } from '../../../../Navigations'
import CarouselDots from '../../../components/CarouselDots'
import { BackIcon, CalenderHappeningIcon, ChatIcon, ClockHappeningIcon, DrinksIcon, FoodIcon, HappeningLocationIconSmall, HeartIcon, HeartWhiteIcon, InfoIcon, MarkerIcon1, MaxFellowsIcon, PIcon, RattingStartIcon, ToiletIcon, WifiIcon } from '../../../components/Svgs'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import { apiRequest } from '../../../utils/apiCalls'
import { getWidth, months, retrieveItem } from '../../../utils/functions'
import Loader from '../../../utils/Loader'
import GeneralStatusBar from '../../../components/GernalStatusBar'
import ImageSliderModal from '../../../components/ImageSliderModal'


var alertRef;
const HappeningDetails = (props) => {


    let item = props.route.params?.params ?? props.route.params ?? null;

    const [happeningLikeThis, setHappeningLikeThis] = useState([]);
    const [happeningNearby, setHappeningNearBy] = useState([]);
    const sdgFlatlistRef = useRef()
    const languageForYourHappening = item?.languageSpokenAtHappening?.toString();
    const languageForYourHappeningArr = item?.languageSpokenAtHappening
    const { width: screenWidth } = Dimensions.get("window");
    const ref = React.useRef();

    const scrollViewRef = useRef(null);
    const textRef = useRef(null);


    const [scrollEnabled, setScrollEnabled] = useState(true);


    const [loading, setLoading] = useState(false);
    const [happeningDetails, setHappeningDetails] = useState({});
    const [indicator2, setIndicator2] = useState(0);
    const [user, setUser] = useState([]);
    const [remaningDays, setRemaningDays] = useState([]);
    const [imageSliderModal, setImageSliderModal] = useState(false);
    const [initialSliderIndex, setInitialSliderIndex] = useState(false);

    const activeSDGIndex = useRef(0);

    // const [activeSDGIndex, setActiveSDGIndex] = useState(0);


    // const autoScrollSDG = () => {
    //     if (sdgFlatlistRef.current) {

    //         const offset = activeSDGIndex * 70;
    //         sdgFlatlistRef.current?.scrollToOffset({ offset });
    //         if (activeSDGIndex + 1 == happeningDetails?.addPhotosOfYourHappening?.length - 1) setActiveSDGIndex(0);
    //         setActiveSDGIndex(activeSDGIndex + 1);
    //         // setSelectedAlphabet(alphabet)
    //     }
    // };

    useEffect(() => {
        const interval = setInterval(() => {

            const offset = activeSDGIndex.current * 80;
            sdgFlatlistRef.current?.scrollToOffset({ offset: offset, animated: true });

            if (activeSDGIndex.current == happeningDetails?.whatSDGIsThisHappeningLinkedTo?.length) {
                sdgFlatlistRef.current?.scrollToOffset({ offset: 0, animated: true });
                activeSDGIndex.current = 0;
                return;
            }
            activeSDGIndex.current = activeSDGIndex.current + 1

        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [happeningDetails?.addPhotosOfYourHappening]);


    useEffect(() => {
        setInterval(() => {
            // autoScrollSDG();
        }, 1000);
    }, [])

    const facilitesArr = [
        { title: "WI-FI", icon: WifiIcon },
        { title: "Parking", icon: PIcon },
        { title: "Drinks", icon: DrinksIcon },
        { title: "Toilet", icon: ToiletIcon }
    ]


    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;

        if (scrollViewRef.current && textRef.current) {
            textRef.current.measure((x, y, width, height, pageX, pageY) => {
                // Calculate the target position
                const targetPosition = pageY + height + 20;

                if (scrollPosition >= targetPosition) {
                    setScrollEnabled(false);
                } else {
                    setScrollEnabled(true);
                }
            });
        }
    };


    // const handleScroll = (event) => {
    //     const scrollPosition = event.nativeEvent.contentOffset.y;
    //     const targetPosition = a// calculate the position of the target element

    //     if (scrollPosition >= targetPosition) {
    //         setScrollEnabled(false);
    //     } else {
    //         setScrollEnabled(true);
    //     }
    // };



    function getHappeningDetails() {

        setLoading(true);
        apiRequest('', 'getHappningDetails/' + item?._id, "GET")
            .then(data => {

                setLoading(false);

                if (data.status) {
                    setHappeningDetails(data.data.happningDetails);
                    setRemaningDays(data.data?.remaningDayHappening ?? []);
                    setHappeningLikeThis(data.data.happeningsLikeThis)
                    setHappeningNearBy(data.data.happeningsNearby)
                    // console.log(data.data[1].addSkills)
                }
            })
            .catch(err => {
                setLoading(false);
            })
    }

    function makeFromToMonthDate() {

        let startingDate = happeningDetails?.startingDate;
        let endingDate = happeningDetails?.endDate;
        let getMonth = endingDate?.substring(5, 7);
        if (getMonth && getMonth[0] == 0) { getMonth = months[getMonth[1] - 1] } else getMonth = months[getMonth - 1];
        if (startingDate && endingDate) return startingDate?.substring(startingDate?.length, startingDate?.length - 2) + "-" + endingDate?.substring(endingDate?.length, endingDate?.length - 2) + "\n" + getMonth;
        else return "12-25\n Dec";
    }

    function getHappeningHours() {
        let startTime, endTime = [];
        startTime = happeningDetails?.startTime?.split(':')
        endTime = happeningDetails?.endTime?.split(':')
        if (startTime && endTime) return parseInt(endTime[0]) - parseInt(startTime[0]);
        else return 0;


    }

    function getUserData() {
        retrieveItem('login_data')
            .then(data => {
                setUser(data)
            })
    }


    useEffect(() => {
        getUserData();
        getHappeningDetails();
    }, [])



    const onScrollEnd2 = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        setIndicator2(pageNum);
    };



    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <GeneralStatusBar backgroundColor='#fff' barStyle='dark-content' />
            <DropdownAlert ref={(ref) => alertRef = ref} />
            {loading && <Loader />}


            <ScrollView
                ref={scrollViewRef}
                // onScroll={handleScroll}
                // scrollEnabled={scrollEnabled}
                contentContainerStyle={{ paddingBottom: 100 }}>
                {/* <Image
                    // source={require('../../../static_assets/image.png')}
                    source={happeningDetails?.addPhotosOfYourHappening ? { uri: happeningDetails?.addPhotosOfYourHappening[0] } : require('../../../static_assets/image.png')}
                    style={{ height: 320, resizeMode: 'cover', top: 0, width: "100%" }}
                /> */}
                <FlatList
                    ref={ref}
                    data={happeningDetails?.addPhotosOfYourHappening}
                    pagingEnabled
                    onMomentumScrollEnd={(e) => onScrollEnd2(e)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={1900}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setInitialSliderIndex(index);
                                    setImageSliderModal(true)
                                }}
                                style={{
                                    width: screenWidth,
                                    paddingBottom: 10,
                                    paddingBottom: 10,
                                    alignSelf: "center",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    // source={require('../../../static_assets/image.png')}
                                    source={{ uri: item }}
                                    style={{ height: 300, resizeMode: 'cover', top: 0, width: "100%" }}
                                />

                            </TouchableOpacity>
                        );
                    }}
                />


                <SafeAreaView style={{ marginTop: 22, backgroundColor: 'white', marginTop: -40, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    <CarouselDots
                        selectedIndex={indicator2}
                        count={happeningDetails?.addPhotosOfYourHappening?.length}
                        style={{ alignSelf: "center", marginTop: -30 }}
                    />
                    {/* <ScrollView contentContainerStyle={{ paddingBottom: 800 }}> */}
                    <View style={{ width: '85%', alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'row', width: "100%", marginTop: 15 }}>
                            <Text
                                ref={textRef}
                                // onLayout={handleScroll}
                                style={[styles.title, { width: "80%" }]}>{happeningDetails?.happeningTitle}</Text>
                            {
                                happeningDetails.whatSDGIsThisHappeningLinkedTo &&
                                <View style={{ width: 80 }}>
                                    <FlatList
                                        data={happeningDetails.whatSDGIsThisHappeningLinkedTo}
                                        horizontal={true}
                                        ref={sdgFlatlistRef}
                                        pagingEnabled={true}
                                        style={{ width: 80 }}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <Image
                                                    style={{ width: 80, height: 80, borderRadius: 10 }}
                                                    source={{ uri: item }}
                                                />
                                            )
                                        }}
                                    />
                                </View>

                            }
                            {/* <Image
                                source={require('../../../static_assets/fish.png')}
                            /> */}
                        </View>
                        {
                            !happeningDetails?.happeningOnline &&

                            <View style={{ flexDirection: 'row', width: "50%", justifyContent: 'space-between', marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <HappeningLocationIconSmall width={12} height={18} style={{ marginTop: 5 }} />
                                    <Text numberOfLines={2} style={[styles.regulareText, { marginLeft: 5 }]}>{happeningDetails?.conformHappeningLocation}</Text>
                                </View>

                                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RattingStartIcon style={{ marginBottom: 5 }} />
                                <Text style={[styles.regulareText, { marginLeft: 3 }]}>5.0</Text>
                            </View> */}
                            </View>
                        }

                        <View style={[styles.sepearatorHorizontal, { marginTop: 20 }]} />

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigate('ProfilePublicView', {
                                        data: happeningDetails
                                    })
                                }}
                            >
                                <Image
                                    style={{ width: 60, height: 60, borderRadius: 60 / 2, marginRight: 10 }}
                                    source={{ uri: happeningDetails?.userProfileId?.profileImage }}
                                // source={require('../../../static_assets/profileImg.png')}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.xxSmallSemiBoldText}>Hosted by</Text>
                                <Text style={[styles.headingText, { fontSize: 12, marginTop: 0 }]}>{happeningDetails?.userProfileId?.userId?.firstName.concat(' ' + happeningDetails?.userProfileId?.userId?.lastName)}</Text>
                                <View style={{ marginTop: 0, flexDirection: 'row', alignItems: 'center' }}>
                                    {/* <View style={{ paddingHorizontal: 10, paddingVertical: 2, backgroundColor: '#F65997', borderRadius: 10, }}>
                                        <Text style={{ color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 9 }}>Rated 4.6 </Text>
                                    </View>
                                    <Text style={[styles.xxSmallSemiBoldText, { marginLeft: 10, color: '#5B4DBC' }]}>Typically replies in 30 mins</Text> */}
                                </View>
                            </View>

                        </View>

                        <View style={[styles.sepearatorHorizontal.backgroundColor, { marginTop: 15 }]} />

                        <View style={[styles.happeningDetilsInfo1, { marginTop: 15 }]}>
                            <View style={{ alignItems: 'center' }}>
                                <CalenderHappeningIcon />
                                <Text style={[styles.labelBoldText, { marginTop: 2 }]}>{makeFromToMonthDate()}</Text>
                            </View>
                            <View style={styles.sepearatorVertical} />
                            <View style={{ alignItems: 'center' }}>
                                <ClockHappeningIcon />
                                <Text style={[styles.xxSmallText, { marginTop: 3 }]}>Hours</Text>
                                <Text style={[styles.labelBoldText, { marginTop: 0 }]}>{getHappeningHours()}</Text>
                            </View>
                            <View style={styles.sepearatorVertical} />
                            <View style={{ alignItems: 'center' }}>
                                <MaxFellowsIcon />
                                <Text style={[styles.xxSmallText, { marginTop: 3 }]}>Min Fellows </Text>
                                <Text style={[styles.labelBoldText, { marginTop: 0 }]}>{happeningDetails?.minPeopleRequiredForTheHappenig}</Text>
                            </View>
                            <View style={styles.sepearatorVertical} />
                            <View style={{ alignItems: 'center' }}>
                                <MaxFellowsIcon />
                                <Text style={[styles.xxSmallText, { marginTop: 3 }]}>Max Fellows </Text>
                                <Text style={[styles.labelBoldText, { marginTop: 0 }]}>{happeningDetails?.maxPeopleAllowedAtAGivenTime}</Text>
                            </View>
                        </View>

                        <View style={[styles.spaceBetweenView, { marginTop: 25 }]}>
                            <Text style={styles.headingText}>Theme</Text>
                            <Text style={styles.textRed}>{happeningDetails?.themeOfYourHappening}</Text>
                        </View>
                        <View style={styles.spaceBetweenView}>
                            <Text style={styles.headingText}>Skills Required</Text>
                            <Text style={styles.textRed}>{happeningDetails?.addSkill?.length ? happeningDetails?.addSkill?.toString() : "No skills required"}</Text>
                        </View>
                        <View style={styles.spaceBetweenView}>
                            <Text style={styles.headingText}>Minimum Age</Text>
                            <Text style={styles.textRed}>{happeningDetails?.minAgeToParticipate}</Text>
                        </View>
                        <View style={[styles.spaceBetweenView, { alignItems: 'flex-start' }]}>
                            <Text style={styles.headingText}>Languages </Text>
                            <View style={{ flexDirection: 'row', width: '40%', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                {
                                    languageForYourHappeningArr.map((v, i) => {
                                        return (
                                            <Text style={styles.textRed}>{v}, </Text>
                                        )
                                    })
                                }
                            </View>
                            {/* <Text style={styles.textRed}>{languageForYourHappening}</Text> */}
                        </View>
                        <View style={styles.spaceBetweenView}>
                            <Text style={styles.headingText}>Happening type</Text>
                            <Text style={styles.textRed}>{happeningDetails?.happeningOnline ? "Online" : "On location"}</Text>
                        </View>


                        <View style={[styles.sepearatorHorizontal, { marginTop: 15 }]} />

                        <Text style={[styles.headingText, { marginTop: 15 }]}>What’s Happening</Text>
                        <Text style={[styles.regulareText, { marginTop: 0 }]}>{happeningDetails?.DiscribeOfYourHappening}</Text>

                        <Text style={[styles.headingText, { marginTop: 15 }]}>What will the fellows get back?</Text>
                        <Text style={[styles.regulareText, { marginTop: 0 }]}>{happeningDetails?.whatFellowsGet}</Text>


                        {
                            !happeningDetails?.happeningOnline && happeningDetails?.Facilities?.length > 0 &&
                            <>
                                <Text style={[styles.headingText, { marginTop: 15 }]}>Facilities</Text>
                                <View style={[styles.happeningDetilsInfo1, { opacity: 1, flexWrap: 'wrap', justifyContent: 'flex-start' }]}>
                                    {
                                        happeningDetails?.Facilities?.map((v, i) => {
                                            let Icon = facilitesArr.find((item) => item.title.toLowerCase() == v.toLowerCase());


                                            // let Icon = v.icon
                                            return (
                                                <View
                                                    // onPress={() => console.log(happeningDetails?.whatAreTheFacilitiesAtYourHappening)}
                                                    key={i}
                                                    // disabled={!providingFacilities}
                                                    // onPress={() => addRemoveFacilities(v.title)}
                                                    style={{ alignItems: 'center', marginLeft: 20, marginTop: 5 }}>
                                                    <View style={{ width: 50, height: 50, borderRadius: 50 / 2, backgroundColor: '#5B4DBC', alignItems: 'center', justifyContent: 'center' }}>

                                                        {Icon ? <Icon.icon color={"#fff"} /> :
                                                            <Text style={{ color: 'white', fontSize: 18, fontFamily: fonts.PSBo, textTransform: 'capitalize' }}>{v[0]}</Text>
                                                        }
                                                    </View>
                                                    <Text style={{ fontFamily: fonts.MSBo, fontSize: 11, color: '#222222', marginTop: 2, textTransform: 'capitalize' }}>{v}</Text>

                                                </View>
                                            )
                                        })
                                    }
                                </View>



                                {/* <Text style={[styles.headingText, { marginTop: 15 }]}>Additional Facilities</Text>
                                <Text style={[styles.regulareText, { marginTop: 0 }]}>Scuba diving kit will be provided for all the divers</Text> */}
                            </>
                        }

                        <TouchableOpacity
                            onPress={() => {
                                navigate('ProfilePublicView', {
                                    data: happeningDetails
                                })
                                // navigateFromStack('', 'HappeningStack', 'ProfilePublicView')
                            }}
                            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>

                            <Image
                                style={{ width: 60, height: 60, borderRadius: 60 / 2, marginRight: 10 }}
                                source={{ uri: happeningDetails?.userProfileId?.profileImage }}
                            // source={require('../../../static_assets/profileImg.png')}
                            />

                            <View style={{ width: "90%" }}>
                                <Text style={styles.headingText}>About the Host{"\n"}{happeningDetails?.userProfileId?.userId?.firstName + " " + happeningDetails?.userProfileId?.userId?.lastName}</Text>
                            </View>
                        </TouchableOpacity>

                        <Text style={[styles.regulareText, { marginTop: 10 }]}>{happeningDetails?.userProfileId?.bio}</Text>

                        <Text style={[styles.headingText, { marginTop: 15 }]}>Photos & Videos</Text>

                        <View style={{ flexDirection: 'row', width: "100%" }}>
                            <View style={{ width: "60%", flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                {
                                    happeningDetails?.addPhotosOfYourHappening?.map((v, i) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setInitialSliderIndex(i);
                                                    setImageSliderModal(true)
                                                }}
                                            >
                                                <Image
                                                    key={i}
                                                    style={{ width: "40%", marginLeft: 5, height: 120, aspectRatio: 2 / 2, marginTop: 10, borderRadius: 10 }}
                                                    source={{ uri: v }}
                                                />
                                            </TouchableOpacity>
                                        )
                                    })

                                }
                            </View>
                            {/* <View style={{ width: "40%", marginLeft: 10 }}>
                                {
                                    [{ img: require('../../../static_assets/p2.png') }, { img: require('../../../static_assets/p3.png') }, { img: require('../../../static_assets/p5.png') }]
                                        .map((v, i) => {
                                            return (
                                                <Image
                                                    key={i}
                                                    style={{ width: "100%", marginTop: 10, borderRadius: 10 }}
                                                    source={v.img}
                                                />
                                            )
                                        })

                                }
                            </View> */}
                        </View>
                        {!happeningDetails?.happeningOnline &&
                            <>
                                <Text style={[styles.headingText, { marginTop: 15 }]}>About the Location :</Text>
                                <Text style={[styles.regulareText, { marginTop: 10 }]}>{happeningDetails?.discribeTheLocaltion}</Text>


                                <>
                                    {/* <Text style={[styles.headingText, { marginTop: 15 }]}>Location</Text> */}
                                    <View
                                        pointerEvents='none'
                                        style={{
                                            flex: 1, alignSelf: 'center', width: '100%',
                                            height: 200, borderRadius: 30, overflow: 'hidden', marginTop: 25,
                                        }}>
                                        <MapView
                                            ref={ref => map = ref}
                                            showsUserLocation={false}
                                            showsMyLocationButton={false}
                                            region={{
                                                latitude: happeningDetails?.location?.coordinates[0] ?? 0,
                                                longitude: happeningDetails?.location?.coordinates[1] ?? 0,
                                                latitudeDelta: 0.01,
                                                longitudeDelta: 0.01,
                                                locationTitle: ''
                                            }}
                                            provider={PROVIDER_GOOGLE}
                                            userLocationAnnotationTitle={null}
                                            style={{ width: '100%', height: '100%', }}
                                        // onPress={() => setIsCalloutModal(false)}
                                        >


                                            {/* <Marker
                                                coordinate={{
                                                    latitude: happeningDetails?.location?.coordinates[0] ?? 0,
                                                    longitude: happeningDetails?.location?.coordinates[1] ?? 0,
                                                    latitudeDelta: 0.1,
                                                    longitudeDelta: 0.1,
                                                }}
                                                pinColor={acolors.primary}
                                                description="custom"
                                                onPress={() => {
                                                    // setIsCalloutModal(true)
                                                    // setCalloutParams(v)
                                                }}

                                            > */}

                                            {/* </Marker> */}
                                            {/* <Text style={{ color: '#121212', fontSize: 10, fontFamily: fonts.PBo, }}>{v.title}</Text> */}

                                        </MapView>
                                        <View style={{
                                            width: 80, height: 80, alignItems: 'center', justifyContent: 'center',
                                            marginTop: -150, alignSelf: 'center', backgroundColor: acolors.mapPointerBg, borderRadius: 50
                                        }}>
                                            <MarkerIcon1 width={25} height={29} />
                                        </View>
                                    </View>
                                    <View onPress={() => console.log(happeningDetails)}
                                        style={{ width: "100%", alignSelf: 'center', backgroundColor: 'white', elevation: 2, borderRadius: 18, paddingHorizontal: 10, paddingVertical: 10, marginTop: -25 }}>
                                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 15, color: '#1A1A20', marginTop: 5 }}>{happeningDetails?.conformHappeningLocation}</Text>
                                        <Text style={{ fontFamily: fonts.PRe, fontSize: 8, color: '#9E9DA6', marginTop: 2 }}>{happeningDetails?.city}, {happeningDetails?.country}</Text>
                                    </View>
                                </>

                            </>
                        }
                        {/* {
                            remaningDays?.length > 1 ?
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                        <Text style={[styles.headingText]}>This Happening is Recursive</Text>
                                        <TouchableOpacity>
                                            <InfoIcon style={{ marginLeft: 10 }} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, justifyContent: 'space-between', height: 46, borderRadius: 15, backgroundColor: 'rgba(91,77,188,0.5)', width: "89%", marginTop: 10 }}>
                                        <TouchableOpacity
                                            onPress={() => navigate('SelectDate', {
                                                dates: remaningDays,
                                                happening: happeningDetails
                                            })}
                                            style={styles.chooseBtn}>
                                            <Text style={{ color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 9 }}>Choose</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> : null} */}

                        {/* <Text style={{ color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 9 }}>Join  Every Thurdsay</Text> */}

                        {/* <TouchableOpacity
                            // disabled
                            onPress={() => {
                                if (!user) {
                                    navigate('AuthStack')
                                    return;
                                }
                                if (remaningDays?.length > 1) {
                                    navigate('SelectDate', {
                                        dates: remaningDays,
                                        happening: happeningDetails
                                    })
                                    return;
                                }
                                navigate('BeforeYouJoin', {
                                    data: happeningDetails
                                })
                            }} //SelectDate
                            style={{ width: "100%", alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: 43.48, borderRadius: 18, backgroundColor: '#5B4DBC', marginTop: 20 }}>
                            <Text style={{ color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 14 }}>Join Happening</Text>
                        </TouchableOpacity> */}







                        {/* <Text style={[styles.headingText, { marginTop: 15 }]}>Choose from avaliable dates</Text>
                        <View style={{ width: "90%", padding: 20, borderWidth: 1, borderColor: '#40054F', borderRadius: 20, marginTop: 10 }}>
                            <Text style={[styles.headingText, { fontSize: 10 }]}>Tue, 29 Mar</Text>
                            <Text style={[styles.regulareText]}>3 joined, 7 spots remaining</Text>
                            <TouchableOpacity
                                onPress={() => navigate('SelectDate')}
                                style={[styles.chooseBtn, { marginTop: 10 }]}>
                                <Text style={{ color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 9 }}>Choose</Text>
                            </TouchableOpacity>
                        </View> */}

                        {/* <View>
                            <Text style={[styles.headingText, { marginTop: 15 }]}>Reviews</Text>
                            <Image
                                // style={{width:40,height:40,borderRadius:20}}
                                source={require('../../../static_assets/peopleJoinedImages.png')}
                            />
                            <View style={{ width: '100%', flexDirection: 'row', marginTop: 20 }}>
                                <Image
                                    style={{ width: 44, height: 44, borderRadius: 22 }}
                                    source={require('../../../static_assets/p6.png')}
                                />
                                <View style={{ marginLeft: 15, width: "85%", }}>
                                    <Text style={styles.regulareText}>What a cool project this was. We spent 6 hours on and in the ocean, in the middle of the fish, the coral. I will definitely go back.</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <RattingStartIcon style={{ marginTop: -5 }} />
                                        <Text style={[styles.regulareText, { marginLeft: 3 }]}>5.0</Text>
                                    </View>
                                </View>
                            </View>
                        </View> */}
                        {/* Happening like this */}
                        <View>
                            <View style={{ width: "100%", alignSelf: 'center', }}>
                                <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                                    <Text style={styles.headingText}>Happenings like this</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigateFromStack('BookingStack', 'SeeAllHappeningsToday', {
                                                title: "Happenings like this",
                                                data: happeningLikeThis
                                            })
                                        }}
                                        style={{ padding: 10 }} >
                                        <Text style={styles.seeAll}>See all</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: "100%" }}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        horizontal={true}
                                        data={happeningLikeThis}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity
                                                    key={index}
                                                    onPress={() => navigateReplace('HappeningDetails', item)}
                                                    style={{ width: getWidth(40), marginLeft: 10, }}
                                                >
                                                    <Image
                                                        source={{ uri: item.addPhotosOfYourHappening[0] }}
                                                        style={styles.listImg}
                                                    />

                                                    <Text style={styles.listTile}>{item.happeningTitle}</Text>
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />
                                </View>
                            </View>


                            {/* <View style={{ width: "100%", alignSelf: 'center', }}>
                                <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                                    <Text style={styles.headingText}>More Happenings{"\n"}nearby this location</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

                                    {
                                        [
                                            { img: require('../../../assets/bg_color.png'), title: "Maintenance of Olive Trees", distance: "5 Miles Away" },
                                            { img: require('../../../assets/bg_color-2.png'), title: "Help to make sanitation pads for school girls", distance: 'Dusseldorf, Germany' }
                                        ]
                                            .map((item, index) => (
                                                <View
                                                    key={index}
                                                    style={{ width: "48%", }}>
                                                    <Image
                                                        source={item.img}
                                                        style={styles.listImg}
                                                    />
                                                    <TouchableOpacity style={{ position: 'absolute', top: 10, right: 5, padding: 10 }}>
                                                        <HeartWhiteIcon />
                                                    </TouchableOpacity>
                                                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                                        {
                                                            [1, 2, 3, 4, 5].map((v, i) => (
                                                                <View
                                                                    key={i}
                                                                    style={i == 4 ? styles.ratingCircleInActive : styles.ratingCircleActive}></View>
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
                        </View>
                        {/* Happenings nearby */}
                        <View>
                            <View style={{ width: "100%", alignSelf: 'center', }}>
                                <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                                    <Text style={styles.headingText}>Happenings nearby</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigateFromStack('BookingStack', 'SeeAllHappeningsToday', {
                                                title: "Happenings like this",
                                                data: happeningLikeThis
                                            })
                                        }}
                                        style={{ padding: 10 }} >
                                        <Text style={styles.seeAll}>See all</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: "100%" }}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        horizontal={true}
                                        data={happeningNearby}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity
                                                    key={index}
                                                    onPress={() => navigateReplace('HappeningDetails', item)}
                                                    style={{ width: getWidth(40), marginLeft: 10, }}
                                                >
                                                    <Image
                                                        source={{ uri: item.addPhotosOfYourHappening[0] }}
                                                        style={styles.listImg}
                                                    />
                                                    <Text style={styles.listTile}>{item.happeningTitle}</Text>

                                                </TouchableOpacity>
                                            )
                                        }}
                                    />
                                </View>
                            </View>


                            {/* <View style={{ width: "100%", alignSelf: 'center', }}>
                                <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                                    <Text style={styles.headingText}>More Happenings{"\n"}nearby this location</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

                                    {
                                        [
                                            { img: require('../../../assets/bg_color.png'), title: "Maintenance of Olive Trees", distance: "5 Miles Away" },
                                            { img: require('../../../assets/bg_color-2.png'), title: "Help to make sanitation pads for school girls", distance: 'Dusseldorf, Germany' }
                                        ]
                                            .map((item, index) => (
                                                <View
                                                    key={index}
                                                    style={{ width: "48%", }}>
                                                    <Image
                                                        source={item.img}
                                                        style={styles.listImg}
                                                    />
                                                    <TouchableOpacity style={{ position: 'absolute', top: 10, right: 5, padding: 10 }}>
                                                        <HeartWhiteIcon />
                                                    </TouchableOpacity>
                                                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                                        {
                                                            [1, 2, 3, 4, 5].map((v, i) => (
                                                                <View
                                                                    key={i}
                                                                    style={i == 4 ? styles.ratingCircleInActive : styles.ratingCircleActive}></View>
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
                        </View>

                    </View>
                    {/* </ScrollView> */}
                </SafeAreaView >
            </ScrollView >
            <View style={{ position: 'absolute', top: Platform.OS == 'ios' ? 30 : 10, }}>
                <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width, }}>

                    {/* <TouchableOpacity
                        onPress={() => {
                            // doFav()
                            // setFav(fav == 1 ? 0 : 1)
                            // forceUpdate()
                        }}
                        activeOpacity={0.8}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            // fav == 1 ? <AntDesign size={20} name='heart' color={"red"} /> : 
                            <HeartIcon />
                        }

                    </TouchableOpacity> */}
                </View>
            </View>
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ position: 'absolute', top: 40, width: 34, left: 10, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(0.5,0.5,0.5,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                <BackIcon />
            </TouchableOpacity>

            <ImageSliderModal
                data={happeningDetails?.addPhotosOfYourHappening}
                isVisible={imageSliderModal}
                initialScrollIndex={initialSliderIndex}
                onClose={() => setImageSliderModal(false)}
            />

            <View style={[styles.shadow, { backgroundColor: 'white', width: "100%", alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0, alignItems: 'center', paddingVertical: 20, paddingHorizontal: 20, borderTopRightRadius: 15, borderTopLeftRadius: 15 }]}>
                <View
                    style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <ChatIcon />
                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 16, color: '#5B4DBC', marginLeft: 10 }}>Chat with{"\n"}host</Text>
                </View>

                <TouchableOpacity
                    // disabled
                    onPress={() => {
                        if (!user) {
                            navigate('AuthStack')
                            return;
                        }
                        if (remaningDays?.length > 1) {
                            navigate('SelectDate', {
                                dates: remaningDays,
                                happening: happeningDetails
                            })
                            return;
                        }
                        navigate('BeforeYouJoin', {
                            data: happeningDetails
                        })
                    }} //SelectDate
                    style={{
                        width: "50%", alignSelf: 'center', alignItems: 'center', justifyContent: 'center',
                        borderRadius: 18, backgroundColor: '#5B4DBC', height: 43.48,
                    }}>
                    <Text style={{ color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 14 }}>Join Happening</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    onPress={() => navigate('BookingCancelling', {
                        params: happeningDetail,
                        cancelRoute: 'booking',
                        bookingId: params.booking._id
                    })}
                >
                    <Text style={{ color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 10, textDecorationLine: 'underline' }}>cancel booking</Text>
                </TouchableOpacity> */}
            </View>


        </View >
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
        color: '#5B4DBC', fontFamily: fonts.PRe, fontSize: 10
    },
    xxSmallSemiBoldText: {
        color: '#766BC3', fontFamily: fonts.PSBo, fontSize: 10
    },
    textRed: {
        color: '#BC4D85', fontFamily: fonts.PSBo, fontSize: 11
    },
    spaceBetweenView: {
        width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10
    },
    happeningDetilsInfo1: {
        width: "100%", backgroundColor: 'rgba(238,238,238,0.4)', borderRadius: 10, padding: 10,
        flexDirection: 'row', justifyContent: 'space-around',
    },
    sepearatorVertical: {
        backgroundColor: '#766BC3', height: "100%", width: 1.5, borderRadius: 2
    },
    sepearatorHorizontal: {
        backgroundColor: '#E5E3E3', width: "100%", height: 1, borderRadius: 2
    },
    chooseBtn: {
        width: "35%", alignItems: 'center', justifyContent: 'center', height: 23.48, borderRadius: 18, backgroundColor: '#5B4DBC'
    },
    listImg: {
        width: "100%", height: 231, borderRadius: 25,
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
        // color: '#5d5760', fontFamily: fonts.PMe, fontSize: 13,
        color: '#5d5760', fontFamily: fonts.PMe, fontSize: 13, marginTop: 5
    },
    distanceText: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10, color: '#5d5760', fontFamily: fonts.PMe, fontSize: 6, letterSpacing: 0.3,
    },




})

export default HappeningDetails
