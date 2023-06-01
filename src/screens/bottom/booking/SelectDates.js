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
import { formatDate, months } from '../../../utils/functions';
import GeneralStatusBar from '../../../components/GernalStatusBar'


const SelectDate = ({ route }) => {

    const [infoAlert, setInfoAlert] = useState(false)
    const [selectedDate, setSelectedDate] = useState();
    const [addedDates, setAddedDates] = useState();
    const [addDateModal, setAddDateModal] = useState(false);
    const [dates, setDates] = useState(route.params.dates ?? []);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <GeneralStatusBar
                barStyle={"dark-content"}
                // // translucent={false}
                backgroundColor={"white"}
            />

            <AlertMsg
                heading='Recursive Happening'
                desc="Recursive Happenings happen 
                repeatedly at a specific time - 
                Every day, week, month or year."
                descStyle={{ lineHeight: 22, color: '#5D5760', fontFamily: fonts.PSBo }}
                btnTitle="Done"
                state={infoAlert}
                onBackdropPress={() => setInfoAlert(false)}
                onPress={() => setInfoAlert(false)}

                containerStyle={{ paddingHorizontal: 30, paddingBottom: 70, paddingTop: 20 }}

            />
            <View style={{ width: "90%", alignSelf: 'center' }}>
                <TouchableOpacity
                    onPress={() => goBack()}
                >
                    <BackIcon
                        color={"#5A4CBB"}
                    />

                </TouchableOpacity>
                <Text style={[{ color: '#5A4CBB', fontSize: 23, fontFamily: fonts.PBo, marginTop: 15 }]}>Select dates</Text>
                {/* <Text style={[styles.regulareText, { fontSize: 11 }]}>Contact Sanne de Wit for the dates and times not listed, or if you want to book a larger group</Text> */}
                {/* <Text style={{ color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 13, textDecorationLine: 'underline', marginTop: 10 }} >Request Avaliability</Text> */}
                {/* <TouchableOpacity
                    onPress={() => setAddDateModal(true)}
                    style={[styles.categoriesView, { marginTop: 15 }]}>
                    <Text numberOfLines={1} style={styles.categoriesText}>Add dates</Text>
                </TouchableOpacity>

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <Text style={[styles.headingText]}>This Happening is Recursive</Text>
                        <TouchableOpacity
                            onPress={() => setInfoAlert(true)}
                        >
                            <InfoIcon style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, justifyContent: 'space-between', height: 46, borderRadius: 15, backgroundColor: 'rgba(91,77,188,0.5)', width: "89%", marginTop: 10 }}>
                        <Text style={{ color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 9 }}>Join  Every Thurdsay</Text>
                        <TouchableOpacity style={styles.chooseBtn}>
                            <Text style={{ color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 9 }}>Choose</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}

                <Text style={[styles.headingText, { marginTop: 15 }]}>Choose from avaliable dates</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 500 }} >
                    {
                        dates.map((v, i) => {
                            let date = new Date(v.startingDate)
                            const dayOfWeek = daysOfWeek[(date.getDay() + 1) % 7];
                            return (
                                <View
                                    key={i}
                                    style={{ width: "100%", padding: 20, borderWidth: 1, borderColor: '#40054F', borderRadius: 20, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ width: "50%" }}>
                                        <Text style={[styles.headingText, { fontSize: 10 }]}>{dayOfWeek + ", " + date.getDate() + " " + months[date.getMonth()]} </Text>
                                        <Text style={[styles.headingText, { fontSize: 18 }]}>{v.startTime} - {v.endTime}</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                let obj = route.params.happening;
                                                obj.startingDate = v.startingDate;
                                                obj.endDate = v.endDate;
                                                obj.startTime = v.startTime;
                                                obj.endTime = v.endTime;
                                                obj._id = v._id
                                                navigate('BeforeYouJoin', {
                                                    data: obj
                                                })
                                            }}
                                            style={[styles.chooseBtn, { marginTop: 2 }]}>
                                            <Text style={{ color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 9 }}>Choose</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={[[styles.regulareText, { fontSize: 10 }]]}>{v.joinedFellow} joined, {v.spotsAvaliable} spots remaining</Text>
                                    </View>
                                </View>
                            )
                        })


                    }
                </ScrollView>
            </View>
            {/* <HappeningStep
                onPress={() => navigate('BeforeYouJoin')}
                showStep={false}
                containerStyle={{ alignItems: 'flex-end', flexDirection: 'column', justifyContent: 'center' }}
                nextText={"Next"}
            /> */}

            <ReactNativeModal
                isVisible={addDateModal}
                onBackdropPress={() => setAddDateModal(false)}

            >
                <View style={{ backgroundColor: 'white', borderRadius: 5, paddingRight: 10 }}>
                    <TouchableOpacity
                        onPress={() => setAddDateModal(false)}
                        style={styles.crossBtn}>
                        <CrossIcon />
                    </TouchableOpacity>
                    <Calendar
                        style={{ width: "100%", alignSelf: 'center', backgroundColor: 'white', }}
                        // onDayPress={(day) => { console.log('selected day', day) }}
                        onDayPress={(day) => { setAddedDates(day.dateString) }}
                        current={formatDate(new Date)}
                        minDate={formatDate(new Date)}
                        enableSwipeMonths={true}
                        // markingType={'custom'}
                        // disableArrowLeft={true}
                        theme={{
                            calendarBackground: 'white',


                            selectedDayBackgroundColor: '#5A4CBB',
                            selectedDayTextColor: "white",
                            selectedDotColor: "#ffffff",

                            arrowColor: '#5A4CBB',
                            todayTextColor: '#5A4CBB',
                            dayTextColor: '#5A4CBB',
                            textDayFontFamily: fonts.PMe,
                            textDisabledColor: '#CCC4CE',

                            // MONTH E.G JANUARY, FEB,
                            monthTextColor: '#5A4CBB',
                            textDayFontSize: 10, // dates 1 ,2,3,4
                            textMonthFontSize: 14, // month name dec 2021
                            textMonthFontFamily: fonts.PSBo,


                            //  these are the monday, tuesday, wed headings
                            textSectionTitleColor: '#857389',
                            textDayHeaderFontSize: 14,
                            textDayHeaderFontFamily: fonts.PRe

                        }}
                        markedDates={{
                            [addedDates]: {
                                selected: true,
                                marked: true,
                                customStyles: {
                                    container: {
                                        backgroundColor: acolors.white,
                                        height: 30,
                                        width: 30,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        borderRadius: 15,
                                    },
                                    text: {
                                        color: 'white',
                                        alignSelf: 'center',
                                        fontFamily: fonts.PMe,
                                        fontSize: 14
                                    }
                                }
                            },

                        }}
                    />
                    <TouchableOpacity
                        style={[styles.popupBtn]}
                        onPress={() => { }}
                    >
                        <Text style={styles.popupBtnTitle}>{"Save"}</Text>
                    </TouchableOpacity>
                </View>
            </ReactNativeModal>
        </View>
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

export default SelectDate
