import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput, SafeAreaView, Switch } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { ScrollView } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import { goBack, navigate } from '../../../../Navigations';
import { ArrowForward, BackIcon, PCIcon, PhoneIcon, PlusIcon } from '../../../components/Svgs';
import { acolors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { Context } from '../../../Context/DataContext';
import { apiRequest } from '../../../utils/apiCalls';
import Loader from '../../../utils/Loader';
import GeneralStatusBar from '../../../components/GernalStatusBar';
import AlertPopup from '../../../common/AlertPopup';

var alertRef;
var textInputRef;

const LoginSecuritySettings = () => {

    const [loading, setLoading] = useState(false);
    const [emailR, setEmailR] = useState(false) // EMAIL REMAINDERS
    const [smsR, setSMSR] = useState(false) // SMS REMAINDERS



    const { state } = useContext(Context);


    const doDeactivate = () => {
        navigate('DReason')
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
                <Text style={{ fontFamily: fonts.PSBo, fontSize: 21, color: '#5B4DBC', marginTop: 10 }}>Login & Security</Text>
                <Text style={{ fontFamily: fonts.PRe, fontSize: 21, color: '#414141' }}>Settings</Text>

                <View style={{ backgroundColor: '#F8F8F8', width: "100%", borderRadius: 20, paddingTop: 20, paddingHorizontal: 10, paddingBottom: 10, marginTop: 20 }}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 400 }} >
                        <View>

                            <TouchableOpacity
                                onPress={() => navigate('EditPassword')}
                                style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Password</Text>
                                <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Edit</Text>
                            </TouchableOpacity>

                            {/* <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Hide Timestamps</Text>
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>hide last active time on timeline</Text>
                                </View>
                                <Switch
                                    style={{ elevation: 2 }}
                                    trackColor={{ false: "#767577", true: "white" }}
                                    thumbColor={emailR ? "#5B4DBC" : "#f4f3f4"}
                                    onValueChange={() => setEmailR(!emailR)}
                                    value={emailR}
                                    ios_backgroundColor="#707070"
                                />
                            </View> */}

                            {/* <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                                <View style={{ width: "70%" }}>
                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Facebook</Text>
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>Not connected</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Connect</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                                <View style={{ width: "70%" }}>
                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Google</Text>
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>Not connected</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Connect</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                                <View style={{ width: "70%" }}>
                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Instagram</Text>
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>Not connected</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Connect</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                                <View style={{ width: "70%" }}>
                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Twitter</Text>
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>Not connected</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Disconnect</Text>
                                </TouchableOpacity>
                            </View> */}



                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760', marginTop: 10 }}>Device History</Text>
                            <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, marginTop: 10 }}>
                                <View style={{ width: "50%", flexDirection: 'row', alignItems: 'center' }}>
                                    <PCIcon />
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760', marginLeft: 8 }}>OS X  Chrome</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Log out device</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 0 }}>
                                <View style={{ width: "50%", flexDirection: 'row', alignItems: 'center' }}>
                                    <PhoneIcon />
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760', marginLeft: 8 }}>Iphone</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Log out device</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                                <View style={{ width: "70%" }}>
                                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Account</Text>
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>Deactivate your account</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        doDeactivate()
                                    }}
                                >
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Deactivate</Text>
                                </TouchableOpacity>
                            </View>







                        </View>


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

export default LoginSecuritySettings

