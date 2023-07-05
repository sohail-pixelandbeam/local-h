import { Text, Pressable, StatusBar, Dimensions, TextInput, SafeAreaView, Button, Image, TouchableOpacity, ScrollView, ImageBackground, View, StyleSheet } from 'react-native'
import React, { useState } from "react";
const { height, width } = Dimensions.get('window')
import { fonts } from '../../constants/fonts';
import { retrieveItem, storeItem } from '../../utils/functions';
import { navigate } from '../../../Navigations';
import { urls } from '../../utils/Api_urls';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { apiRequest } from '../../utils/apiCalls';
import { changeLoggedIn } from '../../../Common';
import AlertPopup from '../../common/AlertPopup';

// import Icon from 'react-native-vector-icons/FontAwesome';


var alertRef;
const Verifycode = (props) => {

    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');
    console.log('props.route.params.id', props.route.params)

    async function doVerifyCode() {

        if (code.length == 0) {
            alertRef.alertWithType("error", "Error", "Please enter a valid code");
            return;
        }
        // setLoading(true);
        let data = await retrieveItem('login_data')


        const reqObj = {
            otp: code,
            token: data?.token
        };


        apiRequest(reqObj, 'auth/verfiyOtpSent')
            .then(data => {
                setLoading(false);
                if (data.status) {
                    retrieveItem('login_data')
                        .then(data => {
                            let data1 = data;
                            alertRef.alertWithType("success", "Success", "Success");
                            data1.isVerify = true;
                            console.log('------data1', data1)
                            storeItem('login_data', data1);
                            setTimeout(() => {
                                changeLoggedIn.changeNow(1);
                                // navigate('BottomTabs');
                            }, 800);
                        })
                }
                else {
                    alertRef.alertWithType("error", "Error", data.message);
                }
            })
            .catch(err => {
                console.log('err', err)
                setLoading(false)
                alertRef.alertWithType("error", urls.error_title, urls.error);
            })

    }


    function doVerifyCodeForForgotPass() {

        if (code.length == 0) {
            alertRef.alertWithType("error", "Error", "Please enter a valid code");
            return;
        }

        setLoading(true);
        const reqObj = {
            otp: code,
            token: props.route.params?.id
        };
        console.log('seding this', reqObj);
        apiRequest(reqObj, 'verfiyOtpSent')
            .then(data => {
                console.log('OTPVerifie=====', data)
                setLoading(false);
                if (data.status) {
                    alertRef.alertWithType("success", "Success", "Success");
                    setTimeout(() => {
                        navigate('ChangePassword', props.route.params.id);
                    }, 800);

                }
                else {
                    alertRef.alertWithType("error", "Error", data.message);
                }
            })
            .catch(err => {
                setLoading(false)
                alertRef.alertWithType("error", urls.error_title, urls.error);
            })

    }


    async function resendOTP() {
        let data = await retrieveItem('login_data')
        const reqObj = {
            token: data?.token
        };
        setLoading(true)
        apiRequest(reqObj, 'resendOtp')
            .then(data => {
                setLoading(false);
                if (data.status == true) {
                    alertRef.alertWithType('success', 'Success', data.message);
                }
            })
            .catch(err => {
                setLoading(false);
            })

    }



    return (
        <View style={{ backgroundColor: 'white' }}>

            <ImageBackground
                style={{
                    width: 'auto',
                    height: 840,
                    backgroundColor: '#35208e',
                }}>

                <View style={{
                    marginTop: 80,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 20,
                }}>

                    <TouchableOpacity onPress={() => navigate('Signup')}>
                        <Image
                            style={{ width: 10, height: 20 }}
                            source={require('../../assets/button_back.png')}

                        />
                    </TouchableOpacity>

                </View>

                <Text>{'\n'}</Text>
                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                    }
                }>
                    <Text style={{ fontSize: 36, color: "white", textAlign: "center", fontFamily: fonts.PBo }}>Verification Code</Text>
                </View>

                <View style={{ width: "80%", alignSelf: 'center' }}>
                    <Text style={styles.text_3}>Please enter verification code send to your email address. Please check your spam folder if it's not in your inbox.</Text>
                </View>

                <View style={
                    { justifyContent: 'center', alignItems: 'center', marginTop: 15, }
                }>

                    <SafeAreaView>
                        <TextInput
                            onChangeText={setCode}
                            style={styles.input}
                            placeholder="Enter Your Verification Code"
                        />
                        <Pressable
                            style={{ position: 'absolute', right: 20, top: 25 }}
                            onPress={() => resendOTP()} >
                            <Text style={styles.text_2}>Resend</Text>
                        </Pressable>
                    </SafeAreaView>

                    <Text></Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 15, }}>
                    <Text style={styles.text_3}>Resend after 30 seconds</Text>
                </View>
                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                }>

                    <TouchableOpacity
                        onPress={() => {
                            if (props.route.params?.screen == 'forgotPass') {
                                doVerifyCodeForForgotPass();
                            }
                            else doVerifyCode()

                        }}
                        style={styles.button_3}>
                        <Text style={styles.text_1}>Next</Text>
                    </TouchableOpacity>

                </View>


            </ImageBackground>

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
        fontFamily: fonts.MSBo
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
        paddingHorizontal: 126,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#FFA183',

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
        width: 300,
        height: 51,
        margin: 10,
        borderWidth: 0,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 20,
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

});





export default Verifycode