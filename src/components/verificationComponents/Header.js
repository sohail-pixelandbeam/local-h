import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function Header({ onBack }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack}>
                <Image source={require('./assets/img/buttonBack.png')} />
            </TouchableOpacity>
            <Image source={require('./assets/img/accountImg.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
