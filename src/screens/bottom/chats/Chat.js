
import React, { useCallback, useState, useEffect, useContext } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, Alert, StatusBar, ScrollView } from 'react-native'
// import { Header } from '../../Components/Header';
import { ChatSearchIcon } from '../../../components/Svgs'



import { doConsole, getTimeAgo, retrieveItem, storeItem, validateEmail } from "../../../utils/functions";
import { apiRequest, doPost, doPostDoc } from "../../../utils/apiCalls";
import DropdownAlert from "react-native-dropdownalert";
import Loader from '../../../utils/Loader';
// import { acolors } from '../../../Components/AppColors';
import { goBack, navigate } from '../../../../Navigations';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { fonts } from '../../../constants/fonts';
import { AcceptedJoinRequestNotif, EditHappeningNotif, GernalNotif, HappeningApprovedNotif, HappeningBookingCancelledNotif, HappeningRejectedNotif, LikedHappeningReview, LikedYourReview, RejectedJoinRequestNotif, ReviewedHappening, SentYouRequestNotif, SomeOneAddedNewHappening, SomeOneCancelledHappeningBookingNotif } from '../../../components/NotificationCards';
import AlertPopup from '../../../common/AlertPopup';
import { routes } from '../../../utils/routes';


var alertRef;

const Chat = (props) => {

    const isFocused = useIsFocused();
    const [chatBg, setChatBg] = useState(false)
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState()
    const [chatsData, setChatData] = useState([1, 2, 3, 4, 5, 6]);
    const [tabs, setTabs] = useState('chat');
    const [notifCount, setNotifCount] = useState('');
    const [notifications, setNotifications] = useState('');
    const [tempNotif, setTempNotif] = useState([]);

    const [chatList, setChatList] = useState([]);


    const getNotifCount = () => {
        apiRequest('', routes.getNotifCount, 'GET')
            .then(data => {
                setNotifCount(data.data);
            })
    }

    const getNotifications = () => {
        setLoading(true)
        apiRequest('', routes.getNotifications, 'GET')
            .then(data => {
                setNotifications(data.data)
                setTempNotif(data.data);
                setLoading(false);

            })
            .catch(err => {
                console.log('___err___', err)
            })
    }
    const getChats = () => {
        setLoading(true)
        apiRequest('', routes.getChatList, 'GET')
            .then(data => {
                console.log('data', data.data);
                setChatList(data.data);
                setLoading(false)
            })
            .catch(err => {
                console.log('___err___', err)
            })
    }

    useEffect(() => {
        getNotifCount();
        getNotifications();

    }, []);

    useEffect(() => {
        getChats();
    }, [isFocused])


    // useFocusEffect(useCallback(() => {
    //     retrieveItem("login_data").then((data) => {
    //         setUser(data)

    //         const reqObj = {
    //             token: data.token
    //         }
    //         console.log(reqObj)
    //         setLoading(true)
    //         apiRequest(reqObj, "get_chats")
    //             .then(data => {
    //                 console.log('data is')
    //                 console.log(data)
    //                 setLoading(false)
    //                 if (data.action == 'success') {
    //                     setChatData(data.chats)
    //                 }
    //                 else {
    //                     alertRef.alertWithType('error', 'Error', data.error)

    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //                 alertRef.alertWithType('error', 'Error', 'Internet Error')
    //             })
    //     })
    // }, [],
    // ))




    const keyExtractor = useCallback((item, index) => index.toString(), []);



    const renderChats = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity

                onPress={() => {
                    navigate('Conversation', {
                        user: item
                    });
                    // item.selected = true
                    // setChatBg(!chatBg)
                    // console.log(item)
                }}
                style={{ width: "100%", height: 68.67, marginTop: 20, flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                <Image
                    style={{ width: 48, height: 48, borderRadius: 48 / 2, marginTop: -15 }}
                    source={{ uri: item.sender_profile_photo }}
                />
                <View
                    style={{ width: "90%", }}

                // style={[!item.selected ? styles.chatSelected : styles.chatUnselected]}>
                // style={[styles.chatUnselected]}
                >
                    <Text style={{ marginLeft: 12, fontFamily: fonts.MSBo, fontSize: 14, color: '#222222' }}>{item.sender_name}</Text>
                    <Text style={{ marginLeft: 12, fontFamily: fonts.MSBo, fontSize: 12, }}>{item.message}</Text>
                    <Text style={{ marginLeft: 12, fontFamily: fonts.MBo, fontSize: 9, color: '#222222', position: 'absolute', right: 20, top: 15 }}>{getTimeAgo(item.timestamp)}</Text>
                    <View style={{ width: "90%", height: 1, backgroundColor: 'rgba(34,34,34,0.2)', marginTop: 20 }}></View>
                </View>


            </TouchableOpacity>)
    }, [chatBg])


    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                style={{ width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingRight: 2 }}
                onPress={() => goBack()}
            >
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: fonts.PSBo, fontSize: 20.67, color: 'white' }}>Chat</Text>
            <Text></Text>

        </View >
    )

    return (



        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View>
                <AlertPopup ref={ref => alertRef = ref} />
            </View>
            {loading && <Loader />}

            <View style={{ width: "90%", alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Platform.OS == 'ios' ? 35 : 25, }}>
                    <StatusBar
                        barStyle={"dark-content"}
                        backgroundColor={"white"}
                    />
                </View>
            </View>

            {
                !loading && !chatsData.length ?
                    <Text style={{ fontFamily: fonts.PBo, fontSize: 25, color: 'white', alignSelf: 'center', marginTop: 20 }}>You have no chats</Text>
                    : null
            }

            <View style={{ width: "90%", alignSelf: 'center', marginTop: 15, }}>
                <View style={{ flexDirection: 'row', width: "80%", alignSelf: 'center', backgroundColor: '#EEEEEE', borderRadius: 40 }}>
                    <TouchableOpacity
                        onPress={() => setTabs('chat')}
                        style={{ width: "49%", height: 31, backgroundColor: tabs == 'chat' ? '#5B4DBC' : '#EEEEEE', justifyContent: 'center', alignItems: 'center', borderRadius: 40 }}>
                        <Text style={{ fontFamily: fonts.MSBo, fontSize: 8, color: tabs == 'chat' ? '#FFFFFF' : '#222' }}>28 New messages</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setTabs('notif')}
                        style={{ width: "49%", height: 31, backgroundColor: tabs == 'notif' ? '#5B4DBC' : '#EEEEEE', justifyContent: 'center', alignItems: 'center', borderRadius: 40 }}>
                        <Text style={{ fontFamily: fonts.MSBo, fontSize: 8, color: tabs == 'notif' ? '#FFFFFF' : '#222' }}>{notifCount} New notification{parseInt(notifCount) > 1 && "s"} </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TextInput
                onChangeText={(t) => {
                    let arr = tempNotif;
                    const filter = arr.filter((v) => v.notif_title?.toLowerCase()?.includes(t.toLowerCase()) || v.user_name?.toLowerCase().includes(t.toLowerCase()));
                    setNotifications(filter);

                }}
                placeholder="Search for notifications"
                placeholderTextColor="#222222"
                style={{ fontSize: 13, fontFamily: fonts.PSBo, width: "90%", alignSelf: 'center', borderRadius: 23, backgroundColor: '#EEEEEE', height: 46, marginTop: 20, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}
            />
            {/* <View style={{ width: "90%", alignSelf: 'center', borderRadius: 23, backgroundColor: '#EEEEEE', height: 46, marginTop: 20, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <ChatSearchIcon />
                <Text style={{ color: "#222222", fontSize: 13, fontFamily: fonts.PSBo, marginLeft: 10 }}>{tabs == 'notif' ? "Search for notifications" : "Search for a conversation fellows"}</Text>
            </View> */}

            <View style={{ backgroundColor: 'rgba(238,238,238,0.5)', height: "100%", marginTop: 10 }}>
                <View style={{ width: "90%", alignSelf: 'center' }}>
                    {
                        tabs == 'chat' ?

                            <FlatList
                                data={chatList}
                                contentContainerStyle={{ paddingBottom: 200 }}
                                keyExtractor={keyExtractor}
                                showsVerticalScrollIndicator={false}
                                renderItem={renderChats}
                            />
                            :
                            <View style={{ marginTop: 20 }}>

                                <FlatList
                                    data={notifications}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <GernalNotif
                                                data={item}
                                            />
                                        )
                                    }}
                                />
                                {/* <ScrollView contentContainerStyle={{ paddingBottom: 300 }} showsVerticalScrollIndicator={false} >
                                    <View style={{ position: 'absolute', left: 20, top: 20, width: 4, height: "95%", backgroundColor: "rgba(34,34,34,0.10)", }} />
                                    <ReviewedHappening />
                                    <LikedYourReview happeningTitle='Fishing Line Cleanup' />
                                    <SentYouRequestNotif headingName='Emma Watson' title='Sent a join request' seperator={true} />
                                    <EditHappeningNotif headingName='Emma Watson' title='Edited the happening' />
                                    <AcceptedJoinRequestNotif headingName='Emma Watson' title='Accepted your join request' seperator={true} />
                                    <RejectedJoinRequestNotif headingName='Emma Watson' title='Rejected your join request' seperator={true} />
                                    <LikedHappeningReview headingName='Emma Watson' title='Liked your Happening' seperator={true} />
                                    <HappeningApprovedNotif headingName='Your Happening got Approved' title='' seperator={true} />
                                    <HappeningRejectedNotif headingName='Your Happening got Rejected' title='' seperator={true} />
                                    <HappeningBookingCancelledNotif headingName='Your Happening booking is' title='cancelled' seperator={true} />
                                    <SomeOneCancelledHappeningBookingNotif headingName='Emma Watson' title='Cancelled the happening booking' seperator={true} />
                                    <SomeOneAddedNewHappening headingName='Emma Watson' title='added a new happening' seperator={false} />
                                </ScrollView> */}
                            </View>
                    }
                </View>
            </View>


        </View >

    )
}
const styles = StyleSheet.create({
    chatSelected: {
        width: '90%',
        // marginLeft: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        height: "100%",
        borderRadius: 9,
        backgroundColor: '#000000'
    },
    chatUnselected: {
        width: '90%',
        // marginLeft: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        height: "100%",
        borderRadius: 9,
        // backgroundColor: '#A047C8'
        backgroundColor: 'rgba(0,0,0,0.2)'
    }
})
export default Chat





