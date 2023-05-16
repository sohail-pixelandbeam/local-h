import { Text, Pressable, StatusBar, Dimensions, TextInput, SafeAreaView, Button, Image, TouchableOpacity, ScrollView, ImageBackground, View, StyleSheet } from 'react-native'
import React, { useState } from "react";
const { height, width } = Dimensions.get('window')
import { fonts } from '../../constants/fonts';
import { storeItem, validateEmail } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { apiRequest } from '../../utils/apiCalls';
import { navigate } from '../../../Navigations';




var alertRef;
const Forgetpassword = ({ navigation }) => {

    // const [isSelected, setSelection] = useState(false);
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');


    function doSendOTP() {

        var e = email;
        // e = e.trim()
        if (!validateEmail(e)) {
            alertRef.alertWithType("error", "Error", "Please provide a valid email address");
            return;
        }

        setLoading(true);
        const reqObj = { userEmail: e, };

        apiRequest(reqObj, 'forgotPassword')
            .then(data => {
                setLoading(false);
                if (data.status) {
                    alertRef.alertWithType('success', "OTP send", "OTP send to your email");
                    console.log('data', data)
                    storeItem('login_data', { token: data?.token })
                    setTimeout(() => {
                        navigate('Verifycode', {
                            screen: 'forgotPass',
                            id: data?.token
                        });
                    }, 800);
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
        <ScrollView style={{ backgroundColor: 'white' }}>

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

                    <Pressable onPress={() => navigation.navigate('Signin')}>
                        <Image
                            style={{ width: 10, height: 20 }}
                            source={require('../../assets/button_back.png')}

                        />
                    </Pressable>

                </View>

                <Text>{'\n'}</Text>
                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                    }
                }>

                    <Text style={{ fontSize: 36, color: "white", textAlign: "center", fontFamily: fonts.PBo }}>Forgot Password</Text>

                </View>


                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, }}>
                    <Text style={styles.text_3}>We will send the code to your email</Text>
                </View>

                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 15,


                    }
                }>

                    <SafeAreaView>
                        <TextInput
                            onChangeText={setEmail}
                            autoCapitalize='none'
                            style={styles.input}
                            placeholder="Your Email"
                        />
                    </SafeAreaView>

                    <Text></Text>
                </View>
                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                }>

                    <TouchableOpacity
                        onPress={() => doSendOTP()}
                        style={styles.button_3} >
                        <Text style={styles.text_1}>Send</Text>
                    </TouchableOpacity>

                </View>

                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 50,
                    }
                }>
                    <ImageBackground
                        source={require('../../assets/forgetpasswordIg.png')}
                        style={{

                            width: 350,
                            height: 350,
                            resizeMode: 'cover'
                        }}>

                    </ImageBackground>
                </View>



            </ImageBackground>

            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />


        </ScrollView>
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
        fontFamily: 'MontserratRegular',

    },

    text_3: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
        fontFamily: 'MontserratRegular',
    },

    input: {
        width: 300,
        height: 51,
        margin: 10,
        borderWidth: 0,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        fontFamily: 'MontserratRegular',
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
        fontFamily: 'MontserratRegular',
        color: 'white'
    },

});





export default Forgetpassword





