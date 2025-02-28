import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput, SafeAreaView, Switch } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { ScrollView } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import { goBack, navigate } from '../../../../Navigations';
import { ArrowForward, BackIcon, PlusIcon } from '../../../components/Svgs';
import { acolors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { Context } from '../../../Context/DataContext';
import { apiFormDataRequest, apiRequest } from '../../../utils/apiCalls';
import Loader from '../../../utils/Loader';
import GeneralStatusBar from '../../../components/GernalStatusBar';
import AlertPopup from '../../../common/AlertPopup';

var alertRef;
var textInputRef;

const NotificationSettings = () => {

    const { state } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [emailR, setEmailR] = useState(state.userData.happening_reminder_mail) // EMAIL REMAINDERS
    const [smsR, setSMSR] = useState(false) // SMS REMAINDERS



    const doChangeNotifStatus = () => {

        setLoading(true);
        apiFormDataRequest({ happening_reminder_mail: !emailR }, 'update-profile')
            .then(data => {
                console.log('data ===', data);
                setLoading(false)
                setEmailR(!emailR)
            })
            .catch(err => {
                setLoading(false)
                console.log('notif update error', err)
            })
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <GeneralStatusBar backgroundColor='white' barStyle='dark-content' />

            <AlertPopup ref={(ref) => alertRef = ref} />
            {loading && <Loader />}
            
            <View style={{ width: "90%", alignSelf: 'center' }}>

                <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-between', marginTop: 0 }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ padding: 10 }}>
                        <BackIcon color="#5B4DBC" />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: state.profileData?.profileImage }}
                        style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                    />
                </View>
                <Text style={{ fontFamily: fonts.PSBo, fontSize: 21, color: '#5B4DBC', marginTop: 10 }}>Notification</Text>
                <Text style={{ fontFamily: fonts.PRe, fontSize: 21, color: '#414141' }}>Settings</Text>

                <View style={{ backgroundColor: '#F8F8F8', width: "100%", borderRadius: 20, paddingTop: 20, paddingHorizontal: 10, paddingBottom: 10, marginTop: 20 }}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
                        <View>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Reminders</Text>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>Turn on/off important remainders of happenings</Text>

                            <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Email</Text>
                                <Switch

                                    style={{ elevation: 2 }}
                                    trackColor={{ false: "#dedede", true: "#dedede" }}
                                    thumbColor={emailR ? "#5B4DBC" : "#f4f3f4"}
                                    onValueChange={() => doChangeNotifStatus()}
                                    value={emailR}
                                    ios_backgroundColor="#dedede"
                                />
                            </View>
                            {/* <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>SMS</Text>
                                <Switch
                                    style={{ elevation: 2 }}
                                    trackColor={{ false: "#767577", true: "white" }}
                                    thumbColor={smsR ? "#5B4DBC" : "#f4f3f4"}
                                    onValueChange={() => setSMSR(!smsR)}
                                    value={smsR}
                                    ios_backgroundColor="#707070"
                                />
                            </View> */}
                        </View>


                        {/* <View>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760',marginTop:70 }}>Notifications</Text>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>notifications about messages from hosts or fellows</Text>

                            <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Email</Text>
                                <Switch
                                    style={{ elevation: 2 }}
                                    trackColor={{ false: "#767577", true: "white" }}
                                    thumbColor={emailR ? "#5B4DBC" : "#f4f3f4"}
                                    onValueChange={() => setEmailR(!emailR)}
                                    value={emailR}
                                    ios_backgroundColor="#707070"
                                />
                            </View>
                            <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>SMS</Text>
                                <Switch
                                    style={{ elevation: 2 }}
                                    trackColor={{ false: "#767577", true: "white" }}
                                    thumbColor={smsR ? "#5B4DBC" : "#f4f3f4"}
                                    onValueChange={() => setSMSR(!smsR)}
                                    value={smsR}
                                    ios_backgroundColor="#707070"
                                />
                            </View>
                        </View> */}


                    </ScrollView>
                </View>

            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.8)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 0, shadowOpacity: 0, elevation: 5,
        backgroundColor: 'white'
    },
})

export default NotificationSettings

