import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, BackHandler } from 'react-native'
import { navigate } from '../../../../Navigations'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import Btn from '../../../components/verificationComponents/Btn'



export default function ReviewStep9() {

    return (
        <View style={styles.contentContainer}>
            <StatusBar
                backgroundColor={acolors.theme2}
                barStyle={"light-content"}
            />

            <Text style={styles.heading} >{'Your review has\nbeen submitted, \nwill be published\nafter review.'}</Text>
            <Image source={require('../../../assets/hurrah.png')} style={styles.img} />

            <View style={styles.btns} >
                <Btn label='Done' onPress={() => navigate('ReviewStep1')} style={styles.btn} bgColor={acolors.primaryLight} />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: acolors.theme2,
        width: "100%",
        height: '100%',
        paddingHorizontal: 25,
        paddingTop: 50,
        justifyContent: 'space-evenly'

    },
    content: {
        width: "100%", paddingHorizontal: 10, paddingVertical: 15, alignItems: 'center',
        backgroundColor: '#FFFFFF', elevation: 2, marginTop: 15, borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.09)',
        shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
    },
    text: {
        color: 'gray', fontFamily: fonts.PMe, fontSize: 12, marginBottom: 40
    },
    textBold: {
        color: '#5D5760', fontFamily: fonts.PMe, fontSize: 18, fontWeight: 'bold'
    },
    heading: {
        fontFamily: fonts.PBo, fontSize: 29,
        lineHeight: 43, color: 'white'
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    img: {
        alignSelf: 'center'
    },
    btn: {
        marginEnd: 20,
        height: 40,
        width: 110,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: acolors.primaryLight
    }
})

