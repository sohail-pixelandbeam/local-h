import React, { useState, useEffect, useContext } from 'react'
import { StatusBar, View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ScrollView, } from 'react-native'
import { goBack, navigate } from '../../../../Navigations'
import { BackIcon, ChatIcon, NextIcon, RequestSubmittedSvg } from '../../../components/Svgs'
import { fonts } from '../../../constants/fonts'
import { Context } from '../../../Context/DataContext'
import { apiRequest } from '../../../utils/apiCalls'
import { capitalizeFirstLetter, formatDateToString } from '../../../utils/functions';
import GeneralStatusBar from '../../../components/GernalStatusBar'

const AllBookings = (props) => {

    const { state, setHappeningData } = useContext(Context)
    const item = props.route.params?.params ?? {};
    const [loading, setLoading] = useState(false);
    const [happeningDetails, setHappeningDetails] = useState([]);



    async function getHostingDetails() {
        setLoading(true);
        // console.log('getMyHosting/' + item.userData._id)
        // apiRequest('', 'getMyHosting/' + state.userData._id, 'GET')
        apiRequest('', 'booking/getFellowBookingByHost/' + props.route.params?.params._id, 'GET')
            .then(data => {
                setLoading(false)
                if (data.status) {
                    setHappeningDetails(data.data)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    };

    useEffect(() => {
        getHostingDetails()


    }, [])


    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <GeneralStatusBar
                barStyle={"dark-content"}
                // // translucent={false}
                backgroundColor={"white"}
            />
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ padding: 20 }} >
                <BackIcon
                    color={"#5A4CBB"}
                />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ paddingBottom: 150 }} >
                <View style={{ width: "90%", alignSelf: 'center' }}>

                    <Text style={[styles.heading, { marginTop: 20, lineHeight: 35, color: '#ffa183' }]}>{capitalizeFirstLetter(item.happeningTitle)}</Text>

                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <View style={{ width: "49%" }}>
                            <Image
                                source={require('../../../static_assets/content.png')}
                                style={{ width: '100%', height: 230, borderRadius: 10, }}
                            />
                            <View style={{ position: 'absolute', bottom: 20, width: "70%", height: 37, borderRadius: 18, backgroundColor: '#FFFFFF', borderWidth: 3, borderColor: '#B9B1F0', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: fonts.PRe, fontSize: 11, color: '#5D5760' }}>Active</Text>
                            </View>
                        </View>
                        <View
                            style={[styles.shadow, { width: '47%', height: 230, borderRadius: 10, backgroundColor: '#675AC1' }]}
                        >
                            <View style={{ height: 40, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: fonts.PBo, fontSize: 15, color: 'white', marginLeft: 10, }}>Next Booking</Text>
                            </View>
                            <View style={{ height: 195, backgroundColor: 'white', padding: 10, marginTop: -5, borderRadius: 10 }}>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 19, color: '#5B4DBC' }}>Tue, 29 Mar</Text>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 19, color: '#5B4DBC' }}>11:00 - 16:00</Text>
                                <View style={{ width: "100%", height: 35, backgroundColor: '#EBC2FC', alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginTop: 35 }}>
                                    <Text style={{ fontFamily: fonts.PBo, fontSize: 10, color: '#5B4DBC' }}>2 new requests </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigate('MyHappeningDetails')}
                                    style={{ marginTop: 20, flexDirection: 'row', alignSelf: 'flex-end', }}>
                                    <Text style={{ fontFamily: fonts.PBo, fontSize: 10, color: '#5B4DBC', marginRight: 10 }}>Details</Text>
                                    <NextIcon style={{ marginRight: 10 }} />
                                </TouchableOpacity>

                            </View>

                        </View>

                    </View>
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 13, color: '#5D5760', marginTop: 10 }}>Restore coral reefs in{"\n"}open sea</Text>
                    <Text style={[styles.heading, { marginTop: 10 }]}>Bookings</Text> */}

                    <TouchableOpacity
                        onPress={() => navigate('MyHappeningDetails', {
                            params: props.route.params?.params,
                            data: happeningDetails
                        })}
                        style={styles.bookingCard}>
                        <View style={{ flexDirection: 'row', width: "100%", }}>
                            <View style={{ width: "50%" }}>
                                <Text style={styles.bookingDate}>{item.startingDate} - {item.happeningOnLocation ? "On Location" : "Online"}</Text>
                                <Text style={styles.bookingTime}>{item.startTime} - {item?.endTime}</Text>

                                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                    {
                                        happeningDetails.approvedFellow?.map((v, i) => {
                                            return (
                                                <>
                                                    <Image
                                                        style={{ width: 40, height: 40, borderRadius: 20, marginLeft: -15 }}
                                                        source={{ uri: v?.profileAndTimeline?.profileImage }}
                                                    />
                                                </>
                                            )
                                        })
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: -12 }}>

                                    {
                                        happeningDetails?.approvedFellow?.map((v, i) => {
                                            // console.log('fellowLength', fellowLength)
                                            return (
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[styles.peopleWhoJoinedText]}>{v?.profileAndTimeline?.userId?.firstName ?? ""} </Text>
                                                    {/* {fellowLength !== i + 1 && v?.profileAndTimeline?.userId?.firstName && <Text style={[styles.peopleWhoJoinedText]}>, </Text>} */}
                                                </View>
                                            )
                                        })
                                    }
                                </View>


                                {/* <Image
                                    // style={{width:40,height:40,borderRadius:20}}
                                    style={{ marginTop: 10 }}
                                    source={require('../../../static_assets/peopleJoinedImages.png')}
                                />
                                <Text style={styles.peopleWhoJoinedText}>Akram, Ton, Vamsi and 4 others</Text> */}
                                {happeningDetails?.approvedFellow && happeningDetails?.approvedFellow[0] && <Text style={styles.seeAll}>See all</Text>}
                                <TouchableOpacity
                                    style={[styles.bookingStatusContainer, { borderColor: '#E53535' }]}>
                                    <Text style={[styles.bookingStatus, { color: '#E53535' }]}>{happeningDetails?.totalJoinFellow} joined Awaiting {happeningDetails?.requireFellow} more </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "49%", marginLeft: 10 }}>
                                <View style={{ width: "70%", height: 118, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 32, backgroundColor: '#5B4DBC', }}>
                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 33, color: 'white', }}>{happeningDetails?.joinRequest}</Text>
                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: 'white', marginTop: -5, textAlign: 'center' }}>Join{"\n"}Requests</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigate('BookingCancelling', {
                                        params: props.route.params?.params,
                                        data: happeningDetails
                                    })}
                                    // style={{ position: 'absolute', bottom: 0, alignSelf: 'center', padding: 5 }}
                                    style={{ alignSelf: 'flex-end', padding: 5, marginRight: 20, marginTop: 5 }}
                                >
                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 11, color: '#5B4DBC', textDecorationLine: 'underline' }}>Cancel </Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </TouchableOpacity>





                </View>
            </ScrollView>

        </View>

    )
}


const styles = StyleSheet.create({
    heading: {
        color: '#675AC1', fontFamily: fonts.PBo, fontSize: 29, marginTop: 20,
    },
    chooseBtn: {
        width: "20%", alignItems: 'center', justifyContent: 'center', height: 23.48, borderRadius: 18, backgroundColor: '#5B4DBC',
        alignSelf: 'center'
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.8)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 0, shadowOpacity: 0, elevation: 5,
        backgroundColor: 'white'
    },
    meetDetailsHeadings: {
        fontFamily: fonts.PBo, fontSize: 12, color: '#675AC1', marginTop: 5
    },
    meetDetailsLables: {
        fontFamily: fonts.PBo, fontSize: 12, color: '#626161', marginTop: 0
    },

    bookingCard: {
        width: "101%", marginTop: 20, elevation: 5, backgroundColor: 'white', padding: 10, shadowColor: 'rgba(0,0,0,0.3)', shadowOpacity: 0.4, paddingBottom: 20, borderRadius: 10
    },
    bookingDate: {
        fontFamily: fonts.PSBo, fontSize: 10, color: '#5B4DBC'
    },
    bookingTime: {
        color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 16
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

})
export default AllBookings
