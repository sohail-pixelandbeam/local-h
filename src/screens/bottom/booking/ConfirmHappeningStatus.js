import React from 'react'
import { StatusBar, View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ScrollView, } from 'react-native'
import { goBack, navigate } from '../../../../Navigations'
import { BackIcon, ChatIcon, RequestSubmittedSvg } from '../../../components/Svgs'
import { fonts } from '../../../constants/fonts'

const ConfirmHappeningStatus = (props) => {


    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <StatusBar
                barStyle={"dark-content"}
                // // translucent={false}
                backgroundColor={"white"}
            />
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ padding: 20 }} >
                <BackIcon
                    color={"#5A4CBB"}
                />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ paddingBottom: 150 }} >
                <View style={{ width: "90%", alignSelf: 'center' }}>

                    <Text style={[styles.heading, { marginTop: 20, lineHeight: 35, color: '#ffa183' }]}>Upcoming{"\n"}Happening</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <Image
                            source={require('../../../static_assets/content.png')}
                            style={{ width: '49%', height: 230, borderRadius: 10, }}
                        />
                        <View
                            style={[styles.shadow, { width: '49%', height: 230, borderRadius: 10, backgroundColor: '#675AC1' }]}
                        >
                            <View style={{ height: 40, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: fonts.PBo, fontSize: 15, color: 'white', marginLeft: 10, }}>Meet Details</Text>
                            </View>
                            <View style={{ height: 195, backgroundColor: 'white', padding: 10, marginTop: -5, borderRadius: 10 }}>
                                <Text style={styles.meetDetailsHeadings}>Software :</Text>
                                <Text style={styles.meetDetailsLables}>Teams</Text>
                                <Text style={styles.meetDetailsHeadings}>link :</Text>
                                <Text style={styles.meetDetailsLables}>http:/omgmeet.com</Text>
                                <Text style={styles.meetDetailsHeadings}>Things to bring :</Text>
                                <Text style={styles.meetDetailsLables}>http:/omgmeet.com</Text>
                            </View>

                        </View>

                    </View>
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 13, color: '#5D5760', marginTop: 10 }}>Restore coral reefs in{"\n"}open sea</Text>
                    <Text style={[styles.heading, { marginTop: 10 }]}>Fellows</Text>
                    <Text style={{ fontFamily: fonts.PBo, fontSize: 12, color: '#626161', marginTop: 0 }}>3 Fellows</Text>
                    <View style={[styles.shadow, { width: '100%', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, marginTop: 10 }]}>
                        <Image
                            style={{ width: 42, height: 42, borderRadius: 42 / 2 }}
                            source={require('../../../static_assets/profileImg.png')}
                        />
                        <Text style={{ fontFamily: fonts.PBo, fontSize: 12, color: "#2A2A2A", marginLeft: 10 }}>Ahmed Akram</Text>
                    </View>
                    <View style={[styles.shadow, { width: '100%', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, marginTop: 10 }]}>
                        <Image
                            style={{ width: 42, height: 42, borderRadius: 42 / 2 }}
                            source={require('../../../static_assets/profileImg.png')}
                        />
                        <Text style={{ fontFamily: fonts.PBo, fontSize: 12, color: "#2A2A2A", marginLeft: 10 }}>Ahmed Akram</Text>
                    </View>


                </View>
            </ScrollView>
            <View style={[styles.shadow, { width: "100%", alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0, alignItems: 'center', paddingVertical: 20, paddingHorizontal: 20, borderTopRightRadius: 15, borderTopLeftRadius: 15 }]}>
                <TouchableOpacity
                    onPress={() => navigate('BookingCancelling')}
                    style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <ChatIcon />
                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 16, color: '#5B4DBC', marginLeft: 10 }}>Chat with{"\n"}host</Text>
                </TouchableOpacity>
                <Text style={{ color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 10, textDecorationLine: 'underline' }}>cancel booking</Text>
            </View>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    heading: {
        color: '#675AC1', fontFamily: fonts.PBo, fontSize: 29, marginTop: 20,
    },
    chooseBtn: {
        width: "20%", alignItems: 'center', justifyContent: 'center', height: 23.48, borderRadius: 18, backgroundColor: '#5B4DBC',
        alignSelf: 'center'
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.8)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 0, shadowOpacity: 0, elevation: 5,
        backgroundColor: 'white'
    },
    meetDetailsHeadings: {
        fontFamily: fonts.PBo, fontSize: 12, color: '#675AC1', marginTop: 5
    },
    meetDetailsLables: {
        fontFamily: fonts.PBo, fontSize: 12, color: '#626161', marginTop: 0
    }

})
export default ConfirmHappeningStatus
