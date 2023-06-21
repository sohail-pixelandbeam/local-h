import { Text, Pressable, StatusBar, Dimensions, TextInput, SafeAreaView, Button, Image, TouchableOpacity, ScrollView, ImageBackground, View, StyleSheet } from 'react-native'
import React, { useState } from "react";
const { height, width } = Dimensions.get('window')
import { fonts } from '../../constants/fonts';
import { acolors } from '../../constants/colors';

import Icon from 'react-native-vector-icons/FontAwesome';
import PasswordSH from 'react-native-vector-icons/Entypo';
import { FbIcon, InstaIcon, LinkedinIcon, TickIcon } from '../../components/Svgs';
import Svg, { ClipPath, Defs, Path } from 'react-native-svg';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { goBack, navigate } from '../../../Navigations';
import { storeItem, validateEmail } from '../../utils/functions';
import { apiRequest } from '../../utils/apiCalls';
import GeneralStatusBar from '../../components/GernalStatusBar';


let alertRef;

const Signup = ({ navigation }) => {

    const [isSelected, setSelection] = useState(false);
    const [username, setUsername] = useState(''); //Mughees
    const [email, setEmail] = useState(''); //mughees.abbas@gmail.com
    const [password, setPassword] = useState(''); //Mughees123@
    const [loading, setLoading] = useState(false);
    const [agree, setAgree] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');



    function doSignUp() {

        var e = email;
        // e = e.trim();
        // if (username.length < 3) {
        //     alertRef.alertWithType("error", "Error", "Please provide a valid username");
        //     return;
        // }
        if (firstName.length < 3) {
            alertRef.alertWithType("error", "Error", "Please provide a valid username");
            return;
        }
        if (lastName.length < 3) {
            alertRef.alertWithType("error", "Error", "Please provide a valid username");
            return;
        }
        if (!validateEmail(e)) {
            alertRef.alertWithType("error", "Error", "Please provide a valid email address");
            return;
        }
        if (password.length < 8) {
            alertRef.alertWithType("error", "Error", "Please provide at least 8 characters as your password");
            return;
        }

        if (!agree) {
            alertRef.alertWithType("error", "Error", "Please mark terms and condition button");
            return;
        }


        setLoading(true);
        const reqObj = {
            firstName: firstName,
            lastName: lastName,
            userEmail: e,
            // userName: username, 
            userPassword: password, agreeButton: agree
        };

        apiRequest(reqObj, 'auth/userSignUp')
            .then(data => {
                console.log('data====', data)
                if (data.status) {
                    alertRef.alertWithType('success', "Success", "Signup Successfully")
                    data.isVerify = false
                    storeItem('login_data', data);
                    setTimeout(() => {
                        navigate('Verifycode', data);
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
        <View style={{ flex: 1, backgroundColor: "#35208e" }}>
            <GeneralStatusBar />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <View style={{
                marginTop: 20,
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
                <Text style={{ fontSize: 15, color: "white", textAlign: "center", fontFamily: fonts.MSBo }} onPress={() => navigation.navigate('Signin')} >Sign in</Text>

            </View>
            <ScrollView >

                <Text></Text>
                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                    }
                }>

                    <Text style={{ fontSize: 36, color: "white", textAlign: "center", fontFamily: fonts.PBo }}>Sign Up</Text>
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
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25, }}>
                    <Text style={styles.text_3}>Or with Email</Text>
                </View> */}

                <View style={
                    { justifyContent: 'center', alignItems: 'center', marginTop: 15, }
                }>
                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
                        <SafeAreaView>

                            <TextInput
                                onChangeText={setFirstName}
                                style={styles.input}
                                placeholder="First name"
                                placeholderTextColor={acolors.grey}
                            />
                            <TextInput
                                onChangeText={setLastName}
                                style={styles.input}
                                placeholder="Last name"
                                placeholderTextColor={acolors.grey}
                            />
                            {/* <TextInput
                                onChangeText={setUsername}
                                style={styles.input}
                                placeholder="Username"
                                placeholderTextColor={acolors.grey}
                            /> */}
                            <TextInput
                                onChangeText={setEmail}
                                style={styles.input}
                                placeholder="Your Email"
                                autoCapitalize='none'
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
                                {/* <Pressable
                                    style={{ position: 'absolute', right: 20, top: 25 }}
                                    onPress={() => navigation.navigate('Forgetpassword')} >
                                    <Text style={styles.text_2}>Forgot?</Text>
                                </Pressable> */}
                            </View>

                        </SafeAreaView>

                        <Text></Text>
                        <View style={styles.checkboxContainer}>
                            <TouchableOpacity
                                onPress={() => setAgree(!agree)}
                                style={{ width: 32, height: 32, borderRadius: 32 / 2, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                                {agree && <TickIcon />}
                            </TouchableOpacity>
                            <Text style={styles.label}>I agree with the <Text style={{ textDecorationLine: 'underline', fontFamily: fonts.PSBo }} onPress={() => navigation.navigate('Termandcondition')} >terms and conditions</Text></Text>
                        </View>
                        <View style={
                            {
                                justifyContent: 'center',
                                alignItems: 'center',
                            }
                        }>

                            <TouchableOpacity style={styles.button_3}
                                onPress={() => doSignUp()}>
                                <Text style={styles.text_1}>Sign Up</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </View>




                <View style={{ justifyContent: 'center', alignItems: 'center', }}>

                </View>
            </ScrollView >



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
        fontFamily: fonts.PRe,
        color: acolors.grey,
    },



    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxContainer: {
        flexDirection: "row",
        marginTop: 0,
        marginBottom: 30

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





export default Signup








