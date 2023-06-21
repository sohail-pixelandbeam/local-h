import { Text, Pressable, StatusBar, Dimensions, Button, Image, TouchableOpacity, ScrollView, View, StyleSheet } from 'react-native'
import React from 'react'
const { height, width } = Dimensions.get('window')
import { fonts } from '../../constants/fonts';
import { acolors } from '../../constants/colors';




const Start = ({ navigation }) => {


    return (
        <View style={{ backgroundColor: acolors.primary, flex: 1 }}>
            <Image
                source={require('../../assets/page_img.png')}
                style={{
                    width: "100%",
                    resizeMode: 'contain',
                    position: 'absolute',
                    bottom: 0,
                    // height: 350,
                    // resizeMode: 'cover'
                }} />

            <View style={{ width: "85%", alignSelf: 'center', marginTop: 20 }}>
                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 80,
                    }
                }>

                    <Text style={{ fontSize: 36, color: "white", textAlign: "center", fontFamily: fonts.PBo }}>Get started to experience happiness</Text>

                </View>

                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                    }
                }>
                    <TouchableOpacity style={styles.button_1} onPress={() => navigation.navigate('Signin')}>
                        <Text style={styles.text_1}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                <View style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                    }
                }>
                    <TouchableOpacity style={styles.button_2} onPress={() => navigation.navigate('Signup')} >
                        <Text style={styles.text_2}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text></Text>
                    {/* <Text style={styles.text_3} onPress={() => navigation.navigate('Signin')}>I’ll do this later</Text> */}
                </View>

                <Text></Text>
            </View>

            {/* <Image

                source={require('../../assets/page_img.png')}
                style={{
                    position: 'absolute',
                    bottom: 0
                    // width: 350,
                    // height: "100%",
                    // backgroundColor:'blue',
                    // resizeMode: 'stretch'
                }}
            /> */}

        </View>
    )

}

const styles = StyleSheet.create({
    button_1: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 70,
        borderRadius: 20,
        elevation: 3,
        borderWidth:1,
        borderColor:'white',
        backgroundColor: acolors.primary,

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
        paddingHorizontal: 70,
        borderRadius: 20,
        elevation: 3,
        borderWidth:1,
        borderColor:'white',
        backgroundColor: acolors.primary,

    },
    text_2: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
        fontFamily: fonts.MSBo,

    },

    text_3: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
        fontFamily: fonts.MSBo,
        textDecorationLine: 'underline',
    },
});




export default Start





