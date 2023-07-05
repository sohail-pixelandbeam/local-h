import { Text, Pressable, StatusBar, Dimensions, TextInput, SafeAreaView, Button, Image, TouchableOpacity, ScrollView, ImageBackground, View, StyleSheet } from 'react-native'
import React, { useState } from "react";
const { height, width } = Dimensions.get('window')
import { fonts } from '../../constants/fonts';
import { storeItem, validateEmail } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { apiRequest } from '../../utils/apiCalls';
import { goBack, navigate } from '../../../Navigations';
import GeneralStatusBar from '../../components/GernalStatusBar';
import { changeLoggedIn } from '../../../Common';
import AlertMsg from '../../common/AlertMsg';
import { BackIcon } from '../../components/Svgs';
import { acolors } from '../../constants/colors';
import AlertPopup from '../../common/AlertPopup';




var alertRef;

const EditPassword = (props) => {

    const [passChangeModal, setPassChangeModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [newPass, setNewPassword] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [cPass, setCPass] = useState('');




    function doChangePass() {


        if (oldPass == '') {
            alertRef.alertWithType("error", "Error", "Please enter old password");
            return;
        }
        if (newPass.length < 8) {
            alertRef.alertWithType("error", "Error", "Please provide at least 8 characters as your password");
            return;
        }
        if (newPass !== cPass) {
            alertRef.alertWithType("error", "Error", "Confirm password not matched");
            return;
        }



        setLoading(true);
        const reqObj = {
            "oldPassword": oldPass,
            "newPassword": newPass,
            "confirmPassword": cPass
        };

        console.log('reqObj', reqObj)
        apiRequest(reqObj, 'auth/editPassword')
            .then(data => {
                if (data.status) {
                    setPassChangeModal(true);
                    storeItem('login_data', '');
                    storeItem('profile_data', '');
                    // storeItem('login_data', '');
                    // storeItem('profile_data', '');
                    // changeLoggedIn.changeNow(2);
                }
                else {
                    alertRef.alertWithType("error", "Error", data.message);
                    setLoading(false);
                }
            })
            .catch(err => {

                setLoading(false)
                alertRef.alertWithType("error", "Error", "Network Error");
            })

    }



    return (
        <View style={{ backgroundColor: 'white',flex:1 }}>

            <AlertMsg
                heading={"Your password has been successfully changed\n\nPlease login again!"}
                desc=""
                isCross={false}
                renderBtn={true}
                // descStyle={{ lineHeight: 22, color: '#5D5760', fontFamily: fonts.PSBo }}
                btnTitle="Login"
                state={passChangeModal}
                onBackdropPress={() => { }}
                onPress={() => {
                    setPassChangeModal(true)
                    
                    changeLoggedIn.changeNow(2);
                }}
                containerStyle={{ paddingHorizontal: 25, paddingBottom: 50, paddingTop: 10 }}
            />
            <GeneralStatusBar backgroundColor='white' barStyle='dark-content' />

            <View style={{ width: "90%", alignSelf: 'center' }}>

                <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ padding: 10 }}>
                        <BackIcon color="#5B4DBC" />
                    </TouchableOpacity>
                    {/* <Image
                        source={{ uri: state.profileData?.profileImage }}
                        style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                    /> */}
                </View>
                <Text style={{ fontFamily: fonts.PSBo, fontSize: 21, color: '#5B4DBC', marginTop: 30 }}>Login & Security</Text>
                <Text style={{ fontFamily: fonts.PRe, fontSize: 21, color: '#414141' }}>Settings</Text>
                {/* <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 15,
                    }
                }>
                    <Text style={styles.text_3}>We will send the code to your email</Text>
                </View> */}



                <SafeAreaView>
                    <Text style={styles.inputLabel}>Old password</Text>
                    <TextInput
                        onChangeText={setOldPass}
                        autoCapitalize='none'
                        style={styles.input}
                        placeholderTextColor="#000000"
                    // placeholder="Enter Old password"
                    />
                    <Text style={styles.inputLabel}>Enter new password</Text>
                    <TextInput
                        onChangeText={setNewPassword}
                        autoCapitalize='none'
                        style={styles.input}
                        placeholderTextColor="#000000"
                    // placeholder="Enter New password"
                    />
                    <Text style={styles.inputLabel}>Enter confirm password</Text>
                    <TextInput
                        onChangeText={setCPass}
                        autoCapitalize='none'
                        style={styles.input}
                        placeholderTextColor="#000000"
                    // placeholder="Enter Confirm password"
                    />
                </SafeAreaView>
                <TouchableOpacity
                    onPress={() => doChangePass()}
                    style={styles.button_3} >
                    <Text style={styles.text_1}>Change</Text>
                </TouchableOpacity>
            </View>
            {loading && <Loader />}
            <AlertPopup ref={(ref) => alertRef = ref} />


        </View>
    )

}

const styles = StyleSheet.create({
    button_1: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#ECC35A',

    },
    text_1: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
        fontFamily: fonts.PSBo
    },

    button_2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#17161A',

    },

    button_3: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#5B4DBC',
        marginTop: 30,
        width: "100%",
        alignSelf: 'center'

    },

    text_2: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#5d5760',
        fontFamily: fonts.PRe,

    },

    text_3: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
        fontFamily: fonts.PRe,
    },

    input: {
        width: "100%",
        borderWidth: 0.5,
        borderColor: '#111111',
        height: 45,
        marginTop: 10,
        // margin: 10,
        padding: 10,
        borderRadius: 10,
        fontFamily: fonts.PRe,
        color: '#5d5760',
    },



    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxContainer: {
        flexDirection: "row",

    },
    checkbox: {
        alignSelf: "center",
        borderRadius: 20,
        padding: 15,
        backgroundColor: "#ffffff",
        borderWidth: 0,
    },
    label: {
        margin: 8,
        fontFamily: fonts.PRe,
        color: 'white'
    },

    inputLabel: {
        fontFamily: fonts.PMe,
        fontSize: 14,
        color: '#222222',
        marginTop:15
    }

});





export default EditPassword





