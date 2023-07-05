import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, BackHandler } from 'react-native'
import { navigate } from '../../../../Navigations'
import HappeningHeader from '../../../common/HappeningHeader'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import { NextIcon } from '../../../components/Svgs'



export default function ReviewReportStep1() {



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.theme2}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"Your Well-being \ncomes first"}
                headerStyle={{ height: 250, justifyContent: 'flex-end', paddingBottom: 30, backgroundColor: acolors.theme2 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView>
                    <View style={{ width: '90%', alignSelf: 'center', }}>

                        <Text style={[styles.text, { marginTop: 20, marginBottom: 10 }]}>Information you share with us here will be used to connect to our safety team as quickly as possible. It will never appear in your public reviews or on your public profile. </Text>
                        <Text style={[styles.text, { marginTop: 25 }]}>What to expect. </Text>
                        <View style={styles.pointsView}>
                            <View style={styles.bullet} />
                            <Text style={[styles.text, { marginLeft: 10 }]}>We'll ask you select the type of incident you experienced. </Text>
                        </View>
                        <View style={styles.pointsView}>
                            <View style={styles.bullet} />
                            <Text style={[styles.text, { marginLeft: 10 }]}>You will have the option to add details.</Text>
                        </View>
                        <View style={styles.pointsView}>
                            <View style={styles.bullet} />
                            <Text style={[styles.text, { marginLeft: 10 }]}>We'll investigate and take appropriate action to protect the community.</Text>
                        </View>
                        <View style={styles.pointsView}>
                            <View style={styles.bullet} />
                            <Text style={[styles.text, { marginLeft: 10 }]}>We'll email or call you to follow up.</Text>
                        </View>


                    </View>
                </ScrollView>

            </View>

            <View style={styles.agreeBtn} >
                <TouchableOpacity
                    onPress={() => navigate('ReviewReportStep2')}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Next</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#FDFDFD',
        width: "100%", borderTopRightRadius: 30, borderTopLeftRadius: 30,
        marginTop: -30, paddingTop: 20, paddingHorizontal: 25
    },
    content: {
        width: "100%", paddingHorizontal: 10, paddingVertical: 15, alignItems: 'center',
        backgroundColor: '#FFFFFF', elevation: 2, marginTop: 15, borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.09)',
        shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
    },
    text: {
        color: '#5D5760', fontFamily: fonts.PMe, fontSize: 13
    },
    agreeBtn: {
        width: "100%", position: 'absolute', bottom: 0, height: 70,
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 50, alignItems: 'center', justifyContent: 'flex-end',
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        elevation: 5
    },
    bullet: {
        width: 5, height: 1, backgroundColor: '#222222',
    },
    pointsView: {
        flexDirection: 'row', alignItems: 'center', marginTop: 10
    }


})

