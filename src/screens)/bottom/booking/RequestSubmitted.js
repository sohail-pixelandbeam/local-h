import React from 'react'
import { StatusBar, View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, } from 'react-native'
import { RequestSubmittedSvg } from '../../../components/Svgs'
import { fonts } from '../../../constants/fonts'
import { navigateFromStack } from '../../../../Navigations'

const RequestSubmitted = (props) => {
    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <StatusBar
                barStyle={"dark-content"}
                // // translucent={false}
                backgroundColor={"white"}
            />
            <Text style={[styles.heading, { marginTop: 50 }]}>Join request</Text>
            <Text style={{ fontSize: 31, fontFamily: fonts.PBo, color: '#5B4DBC', alignSelf: 'center' }}>Submitted</Text>
            <View style={[styles.shadow, { width: 160, height: 160, borderRadius: 80, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 50 }]}>
                <RequestSubmittedSvg />
            </View>
            <Text style={{ fontSize: 18, fontFamily: fonts.PBo, color: '#5B4DBC', alignSelf: 'center', textAlign: 'center', marginTop: 100 }}>You’ll be notified{"\n"}once the host accepts{"\n"}your join request</Text>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('BottomTabs', {
                        screen: 'Profilee',
                        params: {
                            screen: 'Profile',
                            params : {
                                focused : 'Bookings'
                            },
                            // Additional parameters to pass
                            userId: '123',
                            username: 'JohnDoe',
                        },
                    });
                }}
                style={[styles.chooseBtn, { marginTop: 50, alignSelf: 'center' }]}>
                <Text style={{ color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 14, }}>Done</Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    heading: {
        color: '#ffa183', fontFamily: fonts.PBo, fontSize: 31, marginTop: 20, alignSelf: 'center'
    },
    chooseBtn: {
        width: "60%", alignItems: 'center', justifyContent: 'center', height: 43.48, borderRadius: 18, backgroundColor: '#5B4DBC',
        alignSelf: 'center'
    },
    shadow: {
        shadowColor: '#dedede', shadowOffset: { width: 2, height: 2, }, shadowRadius: 1, shadowOpacity: 1, elevation: 5,
        backgroundColor: 'white'
    },

})
export default RequestSubmitted
