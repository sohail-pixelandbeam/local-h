import React, { useEffect, useState } from 'react';

import { View, TouchableOpacity, Text, StyleSheet,Keyboard } from 'react-native'
import { navigate } from '../../Navigations'
import { NextIcon } from '../components/Svgs'
import { fonts } from '../constants/fonts'

const HappeningStep = ({ onPress, step, nextText, showStep = true,containerStyle }) => {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    if (isKeyboardVisible) return null;
    return (
        <TouchableOpacity
            onPress={() => onPress()}
            activeOpacity={0.9}
            style={[styles.agreeBtn,containerStyle]}>
            {showStep && <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Step {step}/16</Text>}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>{nextText ?? "Get Started"} </Text>
                <NextIcon style={{ marginLeft: 10 }} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    agreeBtn: {
        width: "100%", position: 'absolute', bottom: 0, height: 70,
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 30, alignItems: 'center', justifyContent: 'space-between',
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        shadowColor: 'rgba(0, 0, 0, 0.09)',
        shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        elevation: 5
    },
})
export default HappeningStep
