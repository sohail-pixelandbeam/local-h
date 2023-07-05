import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView, StyleSheet, Platform } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert'
import { FlatList } from 'react-native-gesture-handler'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { goBack, navigate, navigateFromStack } from '../../../../Navigations'
import CarouselDots from '../../../components/CarouselDots'
import { BackIcon, CalenderHappeningIcon, ClockHappeningIcon, DrinksIcon, FoodIcon, HappeningLocationIconSmall, HeartIcon, HeartWhiteIcon, InfoIcon, MarkerIcon1, MaxFellowsIcon, PIcon, RattingStartIcon, ToiletIcon, WifiIcon } from '../../../components/Svgs'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import { apiRequest } from '../../../utils/apiCalls'
import { getHeight, getWidth, months, retrieveItem } from '../../../utils/functions'
import Loader from '../../../utils/Loader'
import GeneralStatusBar from '../../../components/GernalStatusBar'
import AlertPopup from '../../../common/AlertPopup'


var alertRef;
const StoryDetails = (props) => {


    const item = props.route.params?.params ?? props.route.params ?? {};

    const ref = React.useRef();

    const [loading, setLoading] = useState(false);
    const [happeningDetails, setHappeningDetails] = useState({});
    const [indicator2, setIndicator2] = useState(0);
    const [user, setUser] = useState([]);
    const [remaningDays, setRemaningDays] = useState([]);
    const { width: screenWidth } = Dimensions.get("window");


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

    const onScrollEnd2 = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        setIndicator2(pageNum);
    };



    useEffect(() => {
        getUserData();
    }, [])






    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <GeneralStatusBar backgroundColor='#fff' barStyle='dark-content' />
            <AlertPopup ref={(ref) => alertRef = ref} />
            {loading && <Loader />}

            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >

                <FlatList
                    ref={ref}
                    data={item?.blog_photo}
                    // pagingEnabled
                    // onMomentumScrollEnd={(e) => onScrollEnd2(e)}
                    horizontal
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={1900}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    width: screenWidth,
                                    paddingBottom: 10,
                                    alignSelf: "center",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={{ uri: item }}
                                    style={{ height: 300, resizeMode: 'cover', top: 0, width: "100%" }}
                                />

                            </View>
                        );
                    }}
                />


                <SafeAreaView style={{ marginTop: 22, backgroundColor: 'white', marginTop: -40, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    {/* <CarouselDots
                        selectedIndex={indicator2}
                        count={happeningDetails?.addPhotosOfYourHappening?.length}
                        style={{ alignSelf: "center", marginTop: -30 }}
                    /> */}
                    {/* <ScrollView contentContainerStyle={{ paddingBottom: 800 }}> */}
                    <View style={{ width: '85%', alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'row', width: "100%", marginTop: 15 }}>
                            <Text
                                style={[styles.title, { width: "80%" }]}>{item?.blog_top_head_line}</Text>
                        </View>

                        <View style={[styles.sepearatorHorizontal, { marginTop: 20 }]} />

                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigate('ProfilePublicView', {
                                        data: happeningDetails
                                    })
                                }}
                            >
                                <Image
                                    style={{ width: 60, height: 60, borderRadius: 60 / 2, marginRight: 10 }}
                                    // source={{ uri: happeningDetails?.userProfileId?.profileImage }}
                                    source={require('../../../static_assets/profileImg.png')}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.xxSmallSemiBoldText}>Hosted by</Text>
                                <Text style={[styles.headingText, { fontSize: 12, marginTop: 0 }]}>{"Admin"}</Text>
                                <View style={{ marginTop: 0, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ paddingHorizontal: 10, paddingVertical: 2, backgroundColor: '#F65997', borderRadius: 10, }}>
                                        <Text style={{ color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 9 }}>Rated 4.6 </Text>
                                    </View>
                                    <Text style={[styles.xxSmallSemiBoldText, { marginLeft: 10, color: '#5B4DBC' }]}>Typically replies in 30 mins</Text>
                                </View>
                            </View>
                        </View> */}
                        {/* <View style={[styles.sepearatorHorizontal, { marginTop: 20 }]} /> */}

                        <Text style={styles.headLine}>{item.blog_middle_head_line}</Text>
                        <Text style={styles.headLineDesc}>{item.blog_middle_head_line_description}</Text>

                        <FlatList
                            ref={ref}
                            style={{ marginLeft: -getWidth(3), marginTop: getHeight(1.5),borderRadius:10 }}
                            data={item?.blog_photo}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <Image
                                        source={{ uri: item }}
                                        style={{ height: getHeight(20), resizeMode: 'cover', top: 0, width: getWidth(53), borderRadius: 10, marginLeft: getWidth(3) }}
                                    />

                                );
                            }}
                        />


                        <Text style={styles.headLine}>{item.blog_bottom_head_line}</Text>
                        <Text style={styles.headLineDesc}>{item.blog_bottom_head_line_description}</Text>
                        <TouchableOpacity
                            // disabled
                            onPress={() => {
                                goBack();
                            }} //SelectDate
                            style={{ width: "50%", alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', height: 43.48, borderRadius: 18, backgroundColor: '#5B4DBC', marginTop: 20 }}>
                            <Text style={{ color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 14 }}>Browse happenign</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ position: 'absolute', top: 40, width: 34, left: 10, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(0.5,0.5,0.5,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                <BackIcon />
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#4F4E50', fontFamily: fonts.PBo, fontSize: 23,
    },

    headingText: {
        color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 16
    },

    xxSmallSemiBoldText: {
        color: '#766BC3', fontFamily: fonts.PSBo, fontSize: 10
    },

    sepearatorHorizontal: {
        backgroundColor: '#E5E3E3', width: "100%", height: 1, borderRadius: 2
    },

    headLine: {
        fontFamily: fonts.PSBo,
        fontSize: 18,
        color: acolors.primaryLight,
        marginTop: 15,
    },
    headLineDesc: {
        fontFamily: fonts.PRe,
        fontSize: 14,
        color: 'black',
        lineHeight: 24,
        marginTop: 10
    }



})

export default StoryDetails

