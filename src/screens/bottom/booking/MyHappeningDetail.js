import React, { useEffect, useState } from 'react'
import { StatusBar, View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ScrollView, } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { goBack, navigate } from '../../../../Navigations'
import { BackIcon, ChatIcon, CrossIcon, NextIcon, RequestSubmittedSvg } from '../../../components/Svgs'
import { fonts } from '../../../constants/fonts'
import { capitalizeFirstLetter } from '../../../utils/functions'
import GeneralStatusBar from '../../../components/GernalStatusBar'
import Loader from '../../../utils/Loader'
import { apiRequest } from '../../../utils/apiCalls'
import DropdownAlert from 'react-native-dropdownalert'
import AlertPopup from '../../../common/AlertPopup'


var alertRef;
const MyHappeningDetails = (props) => {

    const showCancellItems = null
    // props.route.params?.params ?? null



    const [tabs, setTabs] = useState(showCancellItems ?? 'pendings')
    const [removeModal, setRemoveModal] = useState(false);
    const [removedNext, setRemovedNext] = useState(false);
    const [data, setData] = useState(props.route.params?.data);
    const [loading, setLoading] = useState(false);
    const [removingUser, setRemovingUser] = useState('');

    const [removingReason, setRemovingReason] = useState('');

    const params = props.route?.params?.params;


    console.log('paramsasd___', data);



    async function getHostingDetails() {
        setLoading(true);
        apiRequest('', 'booking/getFellowBookingByHost/' + params._id, 'GET')
            .then(data => {
                setLoading(false)
                setLoading(false)
                if (data.status) {
                    setData(data.data);
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    };


    function doAcceptRequest(userId, happening) {
        const body = {
            fellowUserId: userId,
            happeningId: happening.happeningId,
            bookingId: happening._id,
            timeZone: happening.timeZone,
            startTime: happening.startTime,
            endTime: happening.endTime,
            startingDate: happening.startingDate,
            endDate: happening.endDate,
        }
        setLoading(true)
        apiRequest(body, 'booking/hostAcceptJoinRequest')
            .then(data => {
                console.log('data___', data)
                if (data.status) {
                    alertRef.alertWithType('success', 'Success', data.message)
                    getHostingDetails();
                    setTabs('joined')

                }
                else {
                    setLoading(false)
                    alertRef.alertWithType('error', 'Error', data.message)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })

    }


    function doRejectRequest(userId, happening) {
        const body = {
            fellowUserId: userId,
            fellowBookingId: happening._id,
            Reject: true
        }
        setLoading(true)
        apiRequest(body, 'booking/hostRejectToFellow', 'PUT')
            .then(data => {
                setLoading(false)
                console.log('data___', data)
                if (data.status) {
                    alertRef.alertWithType('success', 'Success', data.message)
                    getHostingDetails();
                    setTabs('joined')

                }
                else {
                    alertRef.alertWithType('error', 'Error', data.message)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })

    }

    function doRemoveFellow() {

        if (removingReason.length < 3) {
            alertRef.alertWithType('error', 'Error', 'Please enter a valid removing reason');
            return;
        }
        const body = {
            fellowBookingId: removingUser._id,
            noShow: true,
            bookingCancellationReasons: removingReason
        }
        setLoading(true)
        apiRequest(body, 'booking/NoShowByHostToFellow', 'PUT')
            .then(data => {
                setLoading(false)
                console.log('data___', data)
                if (data.status) {
                    alertRef.alertWithType('success', 'Success', data.message);
                    setRemovedNext(true);
                    getHostingDetails();

                }
                else {
                    alertRef.alertWithType('error', 'Error', data.message);
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })

    }

    useEffect(() => {
        // setLoading(false)
        // getHostingDetails()
    }, [])


    const RenderDetails = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'center', marginTop: 20 }}>
                    {
                        showCancellItems ?
                            <>
                                <View
                                    style={styles.activeTab}>
                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 33, color: 'white' }}>3</Text>
                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: 'white', marginTop: -12, textAlign: 'center' }}>Pending{"\n"}Requests</Text>
                                </View>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 24, color: '#5B4DBC', marginLeft: 20 }}>Unfortunately{"\n"}min fellows{"\n"}aren’t met</Text>
                            </>
                            :
                            <>
                                <TouchableOpacity
                                    onPress={() => setTabs('pendings')}
                                    style={tabs == 'pendings' ? styles.activeTab : styles.inActiveTab}>
                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 33, color: tabs == 'pendings' ? 'white' : '#5B4DBC', }}>{data?.pendingFellow?.length}</Text>
                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: tabs == 'pendings' ? 'white' : '#5B4DBC', marginTop: -8, textAlign: 'center' }}>Pending{"\n"}Requests</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setTabs('joined')}
                                    style={[tabs == 'joined' ? styles.activeTab : styles.inActiveTab, { marginLeft: 12 }]}>
                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 33, color: tabs == 'joined' ? 'white' : '#5B4DBC', }}>{data?.totalJoinFellow}</Text>
                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: tabs == 'joined' ? 'white' : '#5B4DBC', marginTop: -12, textAlign: 'center' }}>Fellows{"\n"}Joined</Text>
                                </TouchableOpacity>
                            </>
                    }

                </View>

                {
                    showCancellItems ?
                        <View style={{ width: "75%", backgroundColor: '#D94A55', borderRadius: 17, marginTop: 20, paddingVertical: 7, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 11, color: 'white', textAlign: 'center' }}>This Happening has been cancelled</Text>
                        </View>
                        :
                        <View style={{ width: "75%", borderWidth: 1, borderColor: '#707070', backgroundColor: '#EBC2FC', borderRadius: 17, marginTop: 20, paddingVertical: 7, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 11, color: '#5B4DBC', textAlign: 'center' }}>{data?.requireFellow} more fellows for this booking to start</Text>
                        </View>
                }


                {
                    tabs == 'pendings' &&
                    <>
                        <Text style={[styles.heading, { marginTop: 10, color: '#FFA183' }]}>Join{"\n"}Requests</Text>
                        {
                            data?.pendingFellow?.map((v, i) => {

                                return (
                                    <View
                                        key={i}
                                        style={[styles.shadow, { width: '100%', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, marginTop: 10, minHeight: 60 }]}>
                                        <Image
                                            style={{ width: 42, height: 42, borderRadius: 42 / 2 }}
                                            source={{ uri: v?.profileAndTimeline?.profileImage }}
                                        />
                                        <Text style={{ fontFamily: fonts.PBo, fontSize: 12, color: "#2A2A2A", marginLeft: 10 }}>{v?.userId?.firstName} {v?.userId?.lastName} </Text>
                                        <View style={{ position: 'absolute', right: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => doAcceptRequest(v.profileAndTimeline.userId, v)}
                                                style={{ width: 85, height: 27, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#5B4DBC' }}>
                                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: 'white' }}>Accept</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => doRejectRequest(v.profileAndTimeline.userId, v)}

                                                style={{ width: 85, height: 27, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#5B4DBC', marginTop: 5 }}>
                                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: '#5B4DBC' }}>Reject</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }

                        {/* <View style={[styles.shadow, { width: '100%', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, marginTop: 10, minHeight: 60 }]}>
                                <Image
                                    style={{ width: 42, height: 42, borderRadius: 42 / 2 }}
                                    source={require('../../../static_assets/profileImg.png')}
                                />
                                <Text style={{ fontFamily: fonts.PBo, fontSize: 12, color: "#2A2A2A", marginLeft: 10 }}>Ahmed Akram</Text>
                                <View style={{ position: 'absolute', right: 10 }}>
                                    <TouchableOpacity style={{ width: 85, height: 27, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#5B4DBC' }}>
                                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: 'white' }}>Accept</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: 85, height: 27, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#5B4DBC', marginTop: 5 }}>
                                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: '#5B4DBC' }}>Reject</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> */}
                    </>
                }
                {
                    tabs == 'joined' &&
                    <>
                        <Text style={[styles.heading, { marginTop: 10, color: '#FFA183' }]}>Fellows</Text>
                        {
                            data?.approvedFellow?.map((v, i) => {
                                console.log(v.profileAndTimeline)
                                return (
                                    <View
                                        key={i}
                                        style={[styles.shadow, { width: '100%', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, marginTop: 10, minHeight: 60 }]}>
                                        <Image
                                            style={{ width: 42, height: 42, borderRadius: 42 / 2 }}
                                            source={{ uri: v?.profileAndTimeline?.profileImage }}
                                        />
                                        <Text style={{ fontFamily: fonts.PBo, fontSize: 12, color: "#2A2A2A", marginLeft: 10 }}>{v?.userId?.firstName} {v?.userId?.lastName} </Text>
                                        <View style={{ position: 'absolute', right: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    console.log(v);
                                                    navigate('Conversation', {
                                                        user: {
                                                            ...v.userId,
                                                            profileImage:v?.profileAndTimeline?.profileImage
                                                        }
                                                    })

                                                }}
                                                style={{ width: 85, height: 27, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#5B4DBC' }}>
                                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: 'white' }}>Message</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setRemovingUser(v);
                                                    setRemoveModal(true);
                                                }}
                                                style={{ width: 85, height: 27, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#5B4DBC', marginTop: 5 }}>
                                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: '#5B4DBC' }}>Remove</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }

                    </>
                }
                {
                    tabs == 'cancelled' &&
                    <>
                        <Text style={[styles.heading, { marginTop: 10, color: '#FFA183' }]}>Fellows</Text>
                        {
                            [1, 2, 3, 4].map((v, i) => {
                                return (
                                    <View
                                        key={i}
                                        style={[styles.shadow, { width: '100%', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, marginTop: 10, minHeight: 60 }]}>
                                        <Image
                                            style={{ width: 42, height: 42, borderRadius: 42 / 2 }}
                                            source={require('../../../static_assets/profileImg.png')}
                                        />
                                        <Text style={{ fontFamily: fonts.PBo, fontSize: 12, color: "#2A2A2A", marginLeft: 10 }}>Ahmed Akram</Text>
                                        <View style={{ position: 'absolute', right: 10 }}>
                                            <TouchableOpacity style={{ width: 85, height: 27, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#5B4DBC', marginTop: 5 }}>
                                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: '#5B4DBC' }}>send message</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }


                    </>
                }



            </View>
        )
    }

    const RenderCompletedDetails = () => {
        return (
            <>
                <Text style={[styles.heading, { marginTop: 10, color: '#FFA183' }]}>Fellows</Text>
                {
                    data?.approvedFellow?.map((v, i) => {
                        return (
                            <View
                                key={i}
                                style={[styles.shadow, { width: '100%', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, marginTop: 10, minHeight: 60 }]}>
                                <Image
                                    style={{ width: 42, height: 42, borderRadius: 42 / 2 }}
                                    source={{ uri: v?.profileAndTimeline?.profileImage }}
                                />
                                <Text style={{ fontFamily: fonts.PBo, fontSize: 12, color: "#2A2A2A", marginLeft: 10 }}>{v?.userId?.firstName} {v?.userId?.lastName} </Text>
                                <View style={{ position: 'absolute', right: 10 }}>
                                    <TouchableOpacity style={{ width: 85, height: 27, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#5B4DBC' }}>
                                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: 'white' }}>Message</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // console.log('item',v);
                                            // console.log('happeningId',params._id);
                                            navigate('HostReviewFellow', {
                                                _id: params?._id,
                                                fellowId: v.userId?._id
                                            });
                                        }}
                                        style={{ width: 85, height: 27, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#5B4DBC', marginTop: 5 }}>
                                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: '#5B4DBC' }}>{v.is_reviewed ? "Reviewed" : "Review"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }

            </>
        )
    }


    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <GeneralStatusBar backgroundColor='#fff' barStyle='dark-content' />
            {loading && <Loader />}
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ padding: 20, paddingTop: 0 }} >
                <BackIcon
                    color={"#5A4CBB"}
                />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ paddingBottom: 150 }} >
                <View style={{ width: "90%", alignSelf: 'center' }}>
                    <View
                        style={styles.bookingCard}>
                        <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-around' }}>
                            <View>
                                {
                                    showCancellItems ?
                                        <>
                                            <Text style={styles.bookingDate}>This booking is</Text>
                                            <Text style={styles.bookingTime}>Cancelled</Text>
                                        </>
                                        :
                                        <>
                                            <Text style={styles.bookingDate}>{params.startingDate} - {params.happeningOnLocation ? "On Location" : "Online"}</Text>
                                            <Text style={styles.bookingTime}>{params.startTime} - {params?.endTime}</Text>
                                            {/* <Text style={styles.bookingDate}>Tue, 29 Mar - Online</Text>
                                            <Text style={styles.bookingTime}>{params.startTime} - {params?.endTime}</Text> */}
                                        </>
                                }

                                <Text style={styles.peopleWhoJoinedText}>{capitalizeFirstLetter(params.happeningTitle)}</Text>
                            </View>
                            <Image
                                source={{ uri: params?.addPhotosOfYourHappening[0] }}
                                style={{ width: "30%", height: 75, borderRadius: 21, }}
                            />

                        </View>

                    </View>
                    {
                        params?.status?.toLowerCase() == 'completed' ? <RenderCompletedDetails />
                            :
                            <RenderDetails />
                    }




                </View>
            </ScrollView>

            <ReactNativeModal
                isVisible={removeModal}
                // isVisible={true}
                backdropOpacity={0.5}
            >



                {
                    removedNext ?
                        <View style={{ width: "100%", alignSelf: 'center', backgroundColor: 'white', padding: 15, paddingVertical: 25, borderRadius: 12 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setRemoveModal(false);
                                }}
                                style={styles.crossBtn}>
                                <CrossIcon />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: fonts.PBo, fontSize: 21, color: '#FFA183' }}>Your request to
                                remove the fellow
                                has been submitted.{"\n"}{"\n"}
                                The fellow will be
                                removed
                                after our consideration </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setRemoveModal(false)
                                    setRemovedNext(false)
                                }}
                                style={{ width: 90, height: 31, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#5B4DBC', alignSelf: 'flex-end', marginTop: 30 }}>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: "white" }}>Next</Text>
                            </TouchableOpacity>

                        </View>
                        :

                        <View style={{ width: "100%", alignSelf: 'center', backgroundColor: 'white', padding: 15, borderRadius: 12 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setRemoveModal(false);
                                }}
                                style={styles.crossBtn}>
                                <CrossIcon />
                            </TouchableOpacity>

                            <Text style={{ fontFamily: fonts.PBo, fontSize: 21, color: '#FFA183' }}>Remove fellow from{"\n"}Happening?</Text>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760', marginTop: 15 }}>Please enter reason</Text>
                            <TextInput
                                onChangeText={setRemovingReason}
                                style={{ width: "100%", height: 42, borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 12, fontFamily: fonts.PMe, fontSize: 14, color: '#5D5760', marginTop: 10, paddingHorizontal: 10 }}
                            />
                            {/* <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760', marginTop: 15 }}>Please describe what happened</Text>
                            <TextInput
                                style={{ width: "100%", height: 152, borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 12, fontFamily: fonts.PMe, fontSize: 14, color: '#5D5760', marginTop: 10, paddingHorizontal: 15, paddingTop: 10 }}
                                multiline={true}
                                textAlignVertical="top"
                            /> */}
                            <TouchableOpacity
                                onPress={() => doRemoveFellow()}
                                style={{ width: 90, height: 31, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#5B4DBC', alignSelf: 'flex-end', marginTop: 30 }}>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: "white" }}>Next</Text>
                            </TouchableOpacity>

                        </View>
                }

            </ReactNativeModal>
            <AlertPopup ref={(ref) => alertRef = ref} />


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
        width: "101%", marginTop: 20, borderWidth: 1, borderRadius: 17, borderColor: '#707070', backgroundColor: 'white', padding: 10,
    },
    bookingDate: {
        fontFamily: fonts.PSBo, fontSize: 10, color: '#5B4DBC'
    },
    bookingTime: {
        color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 18
    },
    peopleWhoJoinedText: {
        color: '#484658', fontSize: 10, fontFamily: fonts.PSBo,
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

    activeTab: {
        width: "27%", height: 98, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 32, borderWidth: 1, borderColor: '#5B4DBC', backgroundColor: '#FFA183'
    },
    inActiveTab: {
        width: "27%", height: 98, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 32, borderWidth: 1, borderColor: '#5B4DBC', backgroundColor: 'white', marginLeft: 15
    },

    crossBtn: {
        position: 'absolute', top: -20, right: -20, width: 43, height: 43, borderRadius: 43 / 2,
        backgroundColor: 'white', elevation: 2, alignItems: 'center', justifyContent: 'center'
    },



})
export default MyHappeningDetails
