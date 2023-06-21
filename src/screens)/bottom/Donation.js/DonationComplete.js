import React, { useState } from 'react'
import { StatusBar, View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../../Navigations';
import HappeningStep from '../../../common/HappeningStep';
import { BackIcon } from '../../../components/Svgs'
import { fonts } from '../../../constants/fonts';
import { useForceUpdate } from '../../../utils/functions';

const DonationComplete = (props) => {

    return (
        <View style={{ flex: 1, backgroundColor: '#35208E' }}>
            <StatusBar
                hidden={true}
            />
            <TouchableOpacity
                style={{ padding: 18 }}
                onPress={() => goBack()}
            >
                <BackIcon color="#fff" />
            </TouchableOpacity>
            <View style={{ width: "91%", alignSelf: 'center' }}>
                <Image
                    style={{ alignSelf: 'center', marginTop: 150 }}
                    source={require('../../../assets/shakeHandHeart.png')}
                />
                <Text style={{ fontFamily: fonts.PBo, fontSize: 29, color: '#fff', marginTop: 50, }}>Thanks for you{"\n"}
                    help! Your contribution
                    will be used to make
                    this world a better{"\n"}place
                </Text>
            </View>
            <HappeningStep
                nextText = {"Go to Profile"}
                onPress={() => props.navigation.popToTop()}
                showStep={false}
                containerStyle ={{alignItems:'flex-end',flexDirection:'column',justifyContent:'center',height:68}}
            />

        </View>
    )
}

export default DonationComplete
