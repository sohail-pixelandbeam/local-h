import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput, SafeAreaView, Switch, FlatList } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { ScrollView } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import { goBack, navigate } from '../../../../Navigations';
import { ArrowForward, BackIcon, PlusIcon, TickIcon } from '../../../components/Svgs';
import { acolors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { Context } from '../../../Context/DataContext';
import { apiFormDataRequest, apiRequest } from '../../../utils/apiCalls';
import Loader from '../../../utils/Loader';
import moment from 'moment-timezone';
import GeneralStatusBar from '../../../components/GernalStatusBar';
import { happeningStyles } from '../happening/styles';
import { retrieveItem, storeItem } from '../../../utils/functions';


var alertRef;
var textInputRef;

const Timezones = () => {

    const { state, userProfileData, setUserGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [timeZones, setTimeZones] = useState([]);
    const [tempTimeZones, setTempTimeZones] = useState([]);
    const [myTimeZone, setMyTimeZone] = useState(state.profileData?.timeZone);



    const getAllTimezones = () => {
        setTimeZones(moment.tz.names());
        setTempTimeZones(moment.tz?.names())
    };


    async function getProfileDetails() {
        apiRequest('', 'auth/getUserDetails', 'GET')
            .then(async data => {
                setLoading(false);
                if (data.status && data.data) {
                    let token = await retrieveItem('login_data');
                    let userData = { ...data.data.loginUser, token: token.token }
                    storeItem('login_data', userData)
                    storeItem('profile_data', data.data.userProfile)
                    setUserGlobal(data.data.loginUser)
                    userProfileData(data.data.userProfile)
                    goBack();
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    };


    const doUpdateTimeZone = () => {

        if (timeZones == '') {
            alertRef.alertWithType('error', 'Error', 'Please select time zone');
            return
        }
        setLoading(true);
        apiFormDataRequest({ timeZone: myTimeZone }, 'profile/update-profile')
            .then(data => {
                console.log('____data', data);

                if (data.status) {
                    alertRef.alertWithType('success', 'Success', 'Time zone updated');
                    getProfileDetails();
                    return;
                }
                setLoading(false);
            })
            .catch(err => {
                setLoading(false)
                console.log('notif update error', err)
            })
    }


    useEffect(() => {
        getAllTimezones();
        // setLoading(false)
    }, [])




    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <DropdownAlert ref={(ref) => alertRef = ref} />
            {loading && <Loader />}
            <GeneralStatusBar backgroundColor='#fff' barStyle='dark-content' />
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
                <Text style={{ fontFamily: fonts.PSBo, fontSize: 21, color: '#5B4DBC', marginTop: 10 }}>Time zones</Text>
                <Text style={{ fontFamily: fonts.PRe, fontSize: 21, color: '#414141' }}>Settings</Text>
                <Text style={{ fontFamily: fonts.PRe, fontSize: 11, color: '#414141', marginTop: 10 }}>Selected time zone: <Text style={{ color: 'black', fontFamily: fonts.PSBo }}>{myTimeZone}</Text></Text>

                <View style={{ backgroundColor: '#F8F8F8', width: "100%", borderRadius: 20, paddingTop: 20, paddingHorizontal: 10, paddingBottom: 10, marginTop: 20 }}>
                    <TextInput
                        placeholder='Search for a timezone'
                        placeholderTextColor={"#7b7b7b"}
                        style={{
                            width: "100%", height: 42, borderRadius: 10, borderColor: 'grey', borderWidth: 1,
                            fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10,
                        }}
                        onChangeText={(v) => {
                            let temp = tempTimeZones;
                            let filter = temp?.filter((item) => {
                                return (
                                    item?.toLocaleLowerCase().includes(v.toLocaleLowerCase())
                                    // indexOf(v.toLocaleLowerCase()) == 0
                                )
                            })
                            setTimeZones(filter)
                        }}
                    />
                    <FlatList
                        data={timeZones}
                        // initialNumToRender={20}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setMyTimeZone(item)}
                                    style={styles.themePickerContainer}>
                                    <View>
                                        <Text style={happeningStyles.happeningTitle2}>{item}</Text>
                                    </View>

                                    <View style={styles.languagePickerCircle}>
                                        {myTimeZone == item && <TickIcon width={17} height={12} />}
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>

            </View>
            <TouchableOpacity
                onPress={() => doUpdateTimeZone()}
                style={{ width: "90%", height: 47, borderRadius: 20, backgroundColor: '#5B4DBC', alignItems: 'center', justifyContent: 'center', marginTop: 40, alignSelf: 'center', position: 'absolute', bottom: 20, }}>
                <Text style={{ color: 'white', fontFamily: fonts.PMe, }}>Update</Text>
            </TouchableOpacity>
        </View >
    )
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.2)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 0, shadowOpacity: 0, elevation: 5,
        backgroundColor: 'white'
    },
    themePickerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14,
        shadowColor: 'rgba(0, 0, 0, 0)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 1, shadowOpacity: 0.2,
        elevation: 2,
        paddingRight: 5
    },
    languagePickerCircle: {
        width: 37, height: 37, borderRadius: 37 / 2,
        shadowColor: 'rgba(0, 0, 0, 0.3)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', elevation: 5
    },
})

export default Timezones

