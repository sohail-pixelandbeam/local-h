import { Text, Pressable, StatusBar, Dimensions, TextInput, SafeAreaView, Button, Image, TouchableOpacity, ScrollView, ImageBackground, View, StyleSheet } from 'react-native'
import React, { useState } from "react";
const { height, width } = Dimensions.get('window')
import { fonts } from '../../constants/fonts';
 


const Verifysuccess = ({ navigation }) => {

    const [isSelected, setSelection] = useState(false);

    
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

                    <Pressable onPress={() => navigation.navigate('Verifycode')}>
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

                    <Text style={{ fontSize: 30, color: "white", textAlign: "center", fontFamily: fonts.PBo }}>
                     Verification Success
                    </Text>

                </View>


                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 15,
                    }
                }>
                    <Text style={styles.text_3}>Resend after 30 seconds</Text>
                </View>

                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 50,
                    }
                }>
                    <ImageBackground
                        source={require('../../assets/success.png')}
                        style={{

                            width: 200,
                            height: 250,
                            resizeMode: 'cover'
                        }}>

                    </ImageBackground>
                </View>


                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 15,
                    }
                }>
                    <Text style={styles.text_1}>Signing up..</Text>
                </View>


            </ImageBackground>




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





export default Verifysuccess





