import React, { useEffect, useState } from 'react';

import { View, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native'
import { goBack, navigate } from '../../Navigations'
import { BackIcon, NextIcon } from '../components/Svgs'
import { fonts } from '../constants/fonts'

const HappeningStep = ({ onPress, step, nextText, showStep = true, containerStyle }) => {

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
        <View
            activeOpacity={0.9}
            style={[styles.agreeBtn, containerStyle]}>
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <NextIcon
                    style={{
                        transform: [{ rotate: '180deg' }],
                    }}
                    color="#000" />
                <Text style={{ marginLeft: 10, color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>{"Back"} </Text>
            </TouchableOpacity>
            {showStep && <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Step {step}/19</Text>}
            <TouchableOpacity
                onPress={() => onPress()}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>{nextText ?? "Get Started"} </Text>
                <NextIcon style={{ marginLeft: 10 }} />
            </TouchableOpacity>
        </View>
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
