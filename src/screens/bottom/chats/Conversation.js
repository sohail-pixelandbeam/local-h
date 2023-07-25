import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { io } from 'socket.io-client';
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';


import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, TextInput, Share, SafeAreaView, Pressable, StatusBar, Image, TouchableOpacity, Keyboard, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

// import { Svgs } from '../../assets/svgFiles/Svgs';
// import { navigate, navigateFromStack } from '../../../utils/Navigations';
import { getHeight, getWidth, retrieveItem } from '../../../utils/functions';
import { apiRequest } from '../../../utils/apiCalls';
import { routes } from '../../../utils/routes';
import { Context } from '../../../Context/DataContext'
import { SendIcon } from '../../../components/Svgs';
import { acolors } from '../../../constants/colors';
import GeneralStatusBar from '../../../components/GernalStatusBar';
import { fonts } from '../../../constants/fonts';
import Loader from '../../../utils/Loader';
import { goBack } from '../../../../Navigations';
import { urls } from '../../../utils/Api_urls';
import socketServices from './socketServices';


const Conversation = (props) => {

    const params = props.route.params.user;
    const { state } = useContext(Context);
    const user = state.userData;


    // const socket = io("http://52.57.23.48:3001");


    // io(SOCKET_URL);

    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [sms, setSms] = useState('');

    const navigation = useNavigation();

    const sendChat = async (sms) => {

        const body = {
            "receiver_id": params?._id,
            "message": sms
        };
        socketServices.emit("newMessage", { text: sms, recipientId: params?._id })

        // socket.emit('newMessage', body);
        // return;
        // setLoading(true)
        // apiRequest(body, routes.createChat)
        //     .then(data => {
        //         setLoading(true)
        //         setSms('')
        //         console.log('here is data', data)
        //         getChat();

        //     })
        //     .catch(err => {
        //         setLoading(false)
        //         console.log('err', err)
        //     })
        // const body = {
        //     message: sms,
        //     id: params?._id,
        //     sender: user?._id,
        //     senderName: user?.first_name
        // }
        // // console.log('body____', body);
        // socket.emit('chat', body);
        // setSms('');
        // getChat();
    };





    const getChat = async () => {
        setLoading(true);
        const body = {
            "receiver_id": params?._id,
        }
        apiRequest(body, routes.getChat, 'GET')
            .then(data => {

                let newArr = [];
                for (let key of data.data) {
                    newArr.push({
                        _id: key._id,
                        text: key.message,
                        name: key.sender_id._id == user?._id ? key.sender_id?.firstName : key.receiver_id.firstName,
                        isSender: key.sender_id._id == user?._id ? true : false,
                        user: {
                            _id: key.sender_id._id == user?._id ? key.sender_id._id : key.sender_id._id,
                            name: key.sender_id._id == user?._id ? key.sender_id?.firstName : key.receiver_id.firstName,
                        }
                    })
                }
                setLoading(false);
                setMessages(newArr)
                // console.log('these are the chats', newArr);
            })
    }




    useEffect(() => {
        // socket.on("connect", (res) => {
        //     console.log('res', res)
        //     console.log('connect to server');
        // });
        retrieveItem('login_data')
            .then(data => {
                // console.log('state.userData.token', state.userData.token)
                socketServices.initializeSocket()
                // getChat();

                const body = {
                    token: data.token,
                    receiver_id: params?._id
                }
                socketServices.on("connect", () => {
                    socketServices.emit("join", { token: data.token, receiver_id: params?._id })
                })


                socketServices.emit("newMessage", body);
                socketServices.on("chatHistory", (data) => {
                    let newArr = [];
                    for (let key of data) {
                        newArr.push({
                            _id: key._id,
                            text: key.message,
                            name: key.sender_id._id == user?._id ? key.sender_id?.firstName : key.receiver_id.firstName,
                            isSender: key.sender_id._id == user?._id ? true : false,
                            user: {
                                _id: key.sender_id._id == user?._id ? key.sender_id._id : key.sender_id._id,
                                name: key.sender_id._id == user?._id ? key.sender_id?.firstName : key.receiver_id.firstName,
                            }
                        })
                    }
                    setLoading(false);
                    setMessages(newArr)

                })
                socketServices.on("newMessage", (data) => {
                    console.log('new icoming message', data);
                })
            });



        // const joinBody = {
        //     id: params._id,
        // }
        // // console.log('joinBody', joinBody)
        // socket.emit('join', joinBody);
        // socket.on('newMessage', payload => {

        //     console.log('here is the payload I get,', payload)
        //     console.log('payload___', payload);
        //     // const obj = [{
        //     //     ...payload,
        //     //     text: payload.message,
        //     //     name: payload.senderName,
        //     //     group: payload.group,
        //     //     user: {
        //     //         _id: payload.sender,
        //     //         name: payload.senderName
        //     //     },
        //     // }]
        //     // setMessages((previousMessages) =>
        //     //     GiftedChat.append(previousMessages, obj),
        //     // );
        // });
    }, [])

    const renderMessage = (props) => {

        let isSender = props.currentMessage?.isSender;
        // props.currentMessage?.user?._id == user?._id

        if (!props.currentMessage.text) return null;
        return (
            <View style={{ marginTop: getHeight(1), marginHorizontal: 10 }}>
                <View style={isSender ? styles.senderBubble : styles.recieverBubble}>
                    <Text style={isSender ? styles.senderText : styles.recieverText}>{props.currentMessage.text}</Text>
                </View>

            </View>
        )


    };



    const renderBubble = (props) => {
        return <Bubble

            {...props}
            wrapperStyle={{
                left: {
                    backgroundColor: '#f0f0f0',
                },
                right: {
                    backgroundColor: '#4F56ED',
                },
            }}
            textStyle={{
                right: {
                    fontFamily: 'DMSans-Regular',
                    color: 'white'
                },
                left: {
                    fontFamily: 'DMSans-Regular'
                }
            }}

        />
    };



    return (

        <View style={{ flex: 1, backgroundColor: '#fefefe' }}>
            <GeneralStatusBar backgroundColor='white' />
            {loading && <Loader />}
            <View style={{ flexDirection: 'row', backgroundColor: 'white', width: "95%", alignSelf: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => goBack()}
                >
                    <Ionicons name="chevron-back" color={acolors.btnSecondry} size={30} />
                </TouchableOpacity>
                <Image
                    style={{ width: 45, height: 45, borderRadius: 45 / 2, }}
                    source={{ uri: params?.profileImage }}
                />
                <View style={{ marginLeft: getWidth(2), }}>
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 16, color: 'black', letterSpacing: 1 }}>{params?.firstName + " " + params?.lastName}</Text>
                    {/* <Text style={{fontFamily:fonts.PRe,fontSize:14,color:'black',letterSpacing:1}}></Text> */}

                </View>

            </View>


            <View style={{ height: getHeight(5), }} />
            <GiftedChat
                renderChatFooter={() => (
                    <View style={{ paddingBottom: 10 }} />
                )}
                messages={messages}
                messagesContainerStyle={{ marginTop: -getHeight(5), }}
                user={user}
                renderMessage={renderMessage}
                renderBubble={renderBubble}

                renderInputToolbar={() => (
                    <View style={styles.footer}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputs}
                                value={sms}
                                placeholder="Type something...."
                                textAlignVertical='center'
                                // multiline={true}
                                placeholderTextColor={'#222222'}
                                // underlineColorAndroid="transparent"
                                onChangeText={e => setSms(e)}
                                onSubmitEditing={() => Keyboard.dismiss()}
                            />

                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                sendChat(sms);
                            }}
                            style={styles.btnSend}
                        >
                            <SendIcon />
                        </TouchableOpacity>

                    </View>
                )}
                renderUsernameOnMessage
                showAvatarForEveryMessage
            />
        </View>
    );
};
export default Conversation;


