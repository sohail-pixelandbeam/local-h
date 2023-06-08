import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Btn({
    bgColor = '#5B4DBC',
    label,
    disabled,
    onPress,
    style,
    color = 'white',
    fontSize = 12,
}) {
    return (
        <TouchableOpacity
            style={[styles.btnBox, style, { backgroundColor: bgColor }]}
            disabled={disabled}
            onPress={onPress}>
            <Text style={{ color: color, fontSize: fontSize }}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnBox: {
        width: 112,
        height: 37,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
});
