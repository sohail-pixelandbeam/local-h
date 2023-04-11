import React, { useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'
import ReactNativeModal from 'react-native-modal'
import { goBack, navigate } from '../../../../Navigations'
import AlertMsg from '../../../common/AlertMsg'
import HappeningStep from '../../../common/HappeningStep'
import { BackIcon, CalenderHappeningIcon, ClockHappeningIcon, CrossIcon, DrinksIcon, FoodIcon, HappeningLocationIconSmall, HeartIcon, HeartWhiteIcon, InfoIcon, MaxFellowsIcon, PIcon, RattingStartIcon, ToiletIcon, WifiIcon } from '../../../components/Svgs'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import { formatDate } from '../../../utils/functions';


const RecursionDates = () => {

    const [infoAlert, setInfoAlert] = useState(false)
    const [selectedDate, setSelectedDate] = useState();
    const [addedDates, setAddedDates] = useState();
    const [addDateModal, setAddDateModal] = useState(false)
    const [cancelAlert, setCancelAlert] = useState(false)


    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <StatusBar
                barStyle={"dark-content"}
                // // translucent={false}
                backgroundColor={"white"}
            />

            <AlertMsg
                heading='Your cancellation request is under review.'
                desc=""
                renderBtn={false}
                // descStyle={{ lineHeight: 22, color: '#5D5760', fontFamily: fonts.PSBo }}
                btnTitle="Done"
                state={cancelAlert}
                onBackdropPress={() => setCancelAlert(false)}
                onPress={() => setCancelAlert(false)}

                containerStyle={{ paddingHorizontal: 25, paddingBottom: 10, paddingTop: 10 }}

            />
            <View style={{ width: "90%", alignSelf: 'center' }}>
                <TouchableOpacity
                    onPress={() => goBack()}
                    style={{ marginTop: 20 }} >
                    <BackIcon
                        color={"#5A4CBB"}
                    />

                </TouchableOpacity>
                <Text style={[{ color: '#5A4CBB', fontSize: 23, fontFamily: fonts.PBo, marginTop: 15 }]}>This happening is recursive{"\n"}and happening in these{"\n"}dates</Text>
                <Text style={[styles.regulareText, { fontSize: 11 }]}>Contact Sanne de Wit for the dates and times not listed, or if you want to book a larger group</Text>
                <ScrollView contentContainerStyle={{ paddingBottom: 500 }} >
                    {
                        [1, 2, 3, 4, 5, 10, 123].map((v, i) => {
                            return (
                                <View
                                    key={i}
                                    style={{ width: "100%", padding: 20, borderWidth: 1, borderColor: '#40054F', borderRadius: 20, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ width: "50%" }}>
                                        <Text style={[styles.headingText, { fontSize: 10 }]}>Tue, 29 Mar</Text>
                                        <Text style={[styles.headingText, { fontSize: 18 }]}>11:00 - 16:00</Text>
                                    </View>
                                    <View>
                                        <Text style={[[styles.regulareText, { fontSize: 10 }]]}>Join 5 other fellows{"\n"}4 more spots avaliable</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => setCancelAlert(true)}
                                        style={{ position: 'absolute', bottom: 10, right: 30 }}>
                                        <Text style={{ color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 10, textDecorationLine: 'underline' }}>cancel</Text>
                                    </TouchableOpacity>

                                </View>
                            )
                        })


                    }
                </ScrollView>
            </View>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#4F4E50', fontFamily: fonts.PBo, fontSize: 23,
    },
    labelBoldText: {
        color: '#766BC3', fontFamily: fonts.PEBo, fontSize: 12, textAlign: 'center',
    },
    regulareText: {
        color: '#5D5760', fontFamily: fonts.PRe, fontSize: 13
    },
    headingText: {
        color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 16
    },
    xxSmallText: {
        color: '#766BC3', fontFamily: fonts.PRe, fontSize: 8
    },
    xxSmallSemiBoldText: {
        color: '#766BC3', fontFamily: fonts.PSBo, fontSize: 8
    },
    textRed: {
        color: '#BC4D85', fontFamily: fonts.PSBo, fontSize: 11
    },
    spaceBetweenView: {
        width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10
    },
    happeningDetilsInfo1: {
        width: "100%", backgroundColor: 'rgba(238,238,238,0.4)', borderRadius: 10, padding: 10, opacity: 0.7,
        flexDirection: 'row', justifyContent: 'space-around',
    },
    sepearatorVertical: {
        backgroundColor: '#766BC3', height: "100%", width: 1.5, borderRadius: 2
    },
    sepearatorHorizontal: {
        backgroundColor: '#E5E3E3', width: "100%", height: 1, borderRadius: 2
    },
    chooseBtn: {
        width: "35%", alignItems: 'center', justifyContent: 'center', height: 23.48, borderRadius: 18, backgroundColor: '#5B4DBC'
    },
    listImg: {
        width: "100%", height: 231, borderRadius: 25, resizeMode: 'stretch'
    },
    ratingCircleActive: {
        width: 7, height: 7, backgroundColor: '#f4327f', borderRadius: 7 / 2, marginLeft: 3
    },
    ratingCircleInActive: {
        width: 7, height: 7, backgroundColor: 'rgba(244, 50, 127, 0.4)', borderRadius: 7 / 2, marginLeft: 3
    },
    ratingsText: {
        color: '#5d5760', fontFamily: fonts.PMe, fontSize: 7, marginLeft: 5
    },
    listTile: {
        color: '#5d5760', fontFamily: fonts.PMe, fontSize: 13,
    },
    distanceText: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10, color: '#5d5760', fontFamily: fonts.PMe, fontSize: 6, letterSpacing: 0.3,
    },

    categoriesView: {
        width: 93, height: 27, maxWidth: 391, borderRadius: 18, borderColor: '#b9b1f0', borderWidth: 3, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', marginLeft: 0
    },
    categoriesText: {
        color: '#5d5760', fontFamily: fonts.PRe, fontSize: 10,
    },

    popupBtn: {
        width: 91, height: 32, borderRadius: 20, backgroundColor: '#5b4dbc', marginTop: 15, alignSelf: 'flex-end', marginBottom: 20,
        // position: 'absolute', bottom: 15, right: 10,
        alignItems: 'center', justifyContent: 'center'
    },
    popupBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },

    crossBtn: {
        position: 'absolute', top: -20, right: -20, width: 43, height: 43, borderRadius: 43 / 2,
        backgroundColor: 'white', elevation: 2, alignItems: 'center', justifyContent: 'center'
    },




})

export default RecursionDates
