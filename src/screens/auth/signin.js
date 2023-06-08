import {
    Text, Pressable, StatusBar, Dimensions, TextInput,
    SafeAreaView, Button, Image, TouchableOpacity, ScrollView, ImageBackground, View, StyleSheet
} from 'react-native'
import React, { useState } from "react";
const { height, width } = Dimensions.get('window')
import { fonts } from '../../constants/fonts';
import { acolors } from '../../constants/colors';

import Icon from 'react-native-vector-icons/FontAwesome';
import PasswordSH from 'react-native-vector-icons/Entypo';
import { FbIcon, InstaIcon, LinkedinIcon } from '../../components/Svgs';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { storeItem, validateEmail } from '../../utils/functions';
import { apiRequest } from '../../utils/apiCalls';
import { goBack, navigate } from '../../../Navigations';
import { changeLoggedIn } from '../../../Common';
import GeneralStatusBar from '../../components/GernalStatusBar';



let alertRef;

const Signin = ({ navigation }) => {

    const [isSelected, setSelection] = useState(false);
    const [email, setEmail] = useState(''); // test@test.com
    const [password, setPassword] = useState(''); // Mb12345678@
    const [loading, setLoading] = useState(false);


    function doSignIn() {

        var e = email;
        // e = e.trim();

        if (!validateEmail(e)) {
            alertRef.alertWithType("error", "Error", "Please provide a valid email address");
            return;
        }

        if (password.length == "") {
            alertRef.alertWithType("error", "Error", "Please enter password");
            return;
        }


        setLoading(true);
        const reqObj = {
            userEmail: e,
            userPassword: password,
        };


        apiRequest(reqObj, 'auth/userSignIn')
            .then(data => {
                console.log(data);
                setLoading(false);
                if (data.status) {
                    
                    let userData = data.data?.user
                    userData["token"] = data.data.token
                    storeItem('login_data', userData);
                    storeItem('profile_data', data.data?.profileData);
                    changeLoggedIn.changeNow(1);
                    navigate('BottomTabs');
                }
                else {
                    alertRef.alertWithType("error", "Error", data.message);
                    setLoading(false)
                }
            })
            .catch(err => {
                setLoading(false);
                alertRef.alertWithType("error", "Error", "Network Error");
            })

    }




    return (
        <View style={{ flex: 1, backgroundColor: "#35208e" }}>
            <GeneralStatusBar/>
            <Image
                source={require('../../assets/signinMask.png')}
                style={{
                    width: "100%", resizeMode: 'contain', position: 'absolute', bottom: 0,
                    // height: 350,
                    // resizeMode: 'cover'
                }} />

            <View style={{
                // marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 20,
            }}>


                <TouchableOpacity onPress={() => goBack()}>
                    <Image
                        style={{ width: 10, height: 20 }}
                        source={require('../../assets/button_back.png')}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 15, color: "white", textAlign: "center", fontFamily: fonts.MSBo }} onPress={() => navigation.navigate('Signup')} >Sign Up</Text>

            </View>
            <ScrollView >

                <Text></Text>
                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 80,
                    }
                }>

                    <Text style={{ fontSize: 36, color: "white", textAlign: "center", fontFamily: fonts.PBo }}>Sign In</Text>
                </View>

                {/* <View style={{
                    marginTop: 10, width: "85%", alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'
                }}>

                    <TouchableOpacity style={styles.button_1} >
                        <Text style={styles.text_1}>Google</Text>
                    </TouchableOpacity>
                    <Pressable style={styles.button_2}>
                        <FbIcon />
                    </Pressable>
                    <Pressable style={styles.button_2}>
                        <InstaIcon />
                    </Pressable>
                    <Pressable style={styles.button_2}>
                        <LinkedinIcon />
                    </Pressable>
                </View> */}

                {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25, }}>
                    <Text style={styles.text_3}>Or with Email</Text>
                </View> */}

                <View style={
                    { justifyContent: 'center', alignItems: 'center', marginTop: 15, }
                }>

                    <SafeAreaView>
                        <TextInput
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            style={styles.input}
                            placeholder="Your Email"
                            placeholderTextColor={acolors.grey}
                        />
                        <View>
                            <TextInput
                                onChangeText={setPassword}
                                secureTextEntry={true}
                                placeholder="Password"
                                placeholderTextColor={acolors.grey}
                                style={styles.input}
                            />
                            <Pressable
                                style={{ position: 'absolute', right: 20, top: 25 }}
                                onPress={() => navigation.navigate('Forgetpassword')} >
                                <Text style={styles.text_2}>Forgot?</Text>
                            </Pressable>
                        </View>

                    </SafeAreaView>

                    <Text></Text>
                </View>
                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                }>

                    <Pressable style={styles.button_3} onPress={() => doSignIn()}>
                        <Text style={styles.text_1}>Sign In</Text>
                    </Pressable>

                </View>

                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                }>

                </View>
            </ScrollView >

            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />


        </View >
    )

}

const styles = StyleSheet.create({
    button_1: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 51,
        // paddingVertical: 12,
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
        height: 51,
        paddingHorizontal: 16,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#17161A',

    },

    button_3: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 51,
        paddingHorizontal: 115,
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
        fontFamily: fonts.MRe,
    },

    input: {
        width: 300,
        height: 51,
        margin: 10,
        borderWidth: 0,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        fontFamily: fonts.MRe,
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
        fontFamily: fonts.MRe,
        color: 'white'
    },

});





export default Signin





