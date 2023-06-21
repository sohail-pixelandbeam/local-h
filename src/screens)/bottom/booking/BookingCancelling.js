import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ScrollView, } from 'react-native'
import { goBack } from '../../../../Navigations'
import { BackIcon, ChatIcon, NextIcon, RequestSubmittedSvg } from '../../../components/Svgs'
import { fonts } from '../../../constants/fonts'
import { apiRequest } from '../../../utils/apiCalls'
import GeneralStatusBar from '../../../components/GernalStatusBar'
import DropdownAlert from 'react-native-dropdownalert'
import Loader from '../../../utils/Loader'
import { Context } from '../../../Context/DataContext'



let alertRef;
const BookingCancelling = (props) => {


    const [cancelled, setCacnelled] = useState(false);
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);

    const { state } = useContext(Context);

    // console.log(state.userData._id)

    const params = props.route.params.params;
    const cancelRoute = props.route.params?.cancelRoute == 'booking' ? 'booking/fellowCanCancleBooking' : 'happening/cancel-happening';


    function doCancelHappening() {

        if (reason.length < 3) {
            alertRef.alertWithType('error', 'Error', 'Please enter a valid cancelling reason');
            return
        }
        const body = {
            happeningId: params?._id,
            cancelHappeningResion: reason
        }
        setLoading(true);
        apiRequest(body, cancelRoute)
            .then(data => {
                setLoading(false);
                if (data.status) {
                    setCacnelled(true);
                }
            })
            .catch(err => {
                setLoading(false)
            })

    }

    function doCancelBooking() {

        if (reason.length < 3) {
            alertRef.alertWithType('error', 'Error', 'Please enter a valid cancelling reason');
            return
        }

        const body = {
            // cancelHappeningResion: reason,
            userId: state.userData._id,
            happeningId: params?._id,
            bookingId: props.route.params?.bookingId
        }

        setLoading(true);
        apiRequest(body, cancelRoute, 'PUT')
            .then(data => {
                console.log('the booking ', data)
                setLoading(false);
                if (data.status || data.bookingId) {
                    setCacnelled(true);
                }
            })
            .catch(err => {
                setLoading(false)
            })
    }

    useEffect(() => {
        return () => {
            setCacnelled(false)
        }
    }, [])


    if (cancelled) {
        return (
            <View style={{ backgroundColor: '#FFA183', flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 }}>
                <StatusBar hidden />
                <Text style={{ fontFamily: fonts.PBo, fontSize: 29, color: 'white', }} >Your request for
                    cancellation
                    has been noted,
                    the update will be
                    live in <Text style={{ color: '#5B4DBC' }}>48 hours</Text>
                </Text>
                <TouchableOpacity
                    onPress={() => goBack()}
                    style={{ width: 90, height: 31, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#5B4DBC', alignSelf: 'flex-end', marginTop: 30 }}>
                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: "white" }}>Done</Text>
                </TouchableOpacity>
            </View>
        )
    }
    else
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
                        <Text style={{ fontFamily: fonts.PBo, fontSize: 29, color: '#FFA183', }}>Why are you{"\n"}cancelling ?</Text>
                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760', marginTop: 15 }}>Please enter reason</Text>
                        <TextInput
                            onChangeText={setReason}
                            style={{ width: "100%", height: 42, borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 12, fontFamily: fonts.PMe, fontSize: 14, color: '#5D5760', marginTop: 10, paddingHorizontal: 10 }}
                        />
                        {/* <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760', marginTop: 15 }}>Please describe what happened</Text>
                        <TextInput
                            style={{ width: "100%", height: 152, borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 12, fontFamily: fonts.PMe, fontSize: 14, color: '#5D5760', marginTop: 10, paddingHorizontal: 15, paddingTop: 10 }}
                            multiline={true}
                            textAlignVertical="top"
                        /> */}
                        <TouchableOpacity
                            onPress={() => props.route.params?.cancelRoute == 'booking' ? doCancelBooking() : doCancelHappening()}
                            style={{ width: 90, height: 31, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#5B4DBC', alignSelf: 'flex-end', marginTop: 30 }}>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 9, color: "white" }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
                <DropdownAlert ref={(ref) => alertRef = ref} />
                {loading && <Loader />}

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
    }

})
export default BookingCancelling
