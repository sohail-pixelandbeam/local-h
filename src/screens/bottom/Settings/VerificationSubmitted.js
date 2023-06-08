import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import Heading from '../../../components/verificationComponents/Heading';

export default function VerificationSubmitted({ navigation }) {
    return (
        <ScrollView style={styles.mainContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image source={require('../../../components/verificationComponents/assets/img/arrowBackWhite.png')} />
            </TouchableOpacity>
            <View style={styles.contentBox}>
                <Heading style={styles.heading}>Request Submitted!</Heading>
                <Heading style={styles.heading1}>We'll contact you soon</Heading>
                <View style={styles.circle}>
                    <Image source={require('../../../components/verificationComponents/assets/img/checkoutSuccess.png')} />
                </View>
            </View>
            <View style={{ height: 50 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#35208E',
        padding: 20,
        paddingTop: 45,
    },
    contentBox: {
        alignItems: 'center',
        marginTop: 50,
    },
    heading: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
    heading1: {
        fontSize: 30,
        color: 'white',
        fontWeight: '800',
        textAlign: 'center',
    },
    circle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'white',
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
