
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput, Platform, BackHandler } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { ArrowDown, BackIcon, CalenderIcon, CrossIcon, HappeningLocationIcon, LOCALCOMMUNITIES, LocationIcon, NextIcon, NONCOMMERCIALACTIVITIES, NotifIcon, OnlineHappeningIcon, RELIABLENONPROFITS, RepeatIcon, SUPPORTICON, TickIcon, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'

import { Context } from '../../../../Context/DataContext'
import { formatDate, getHOLPreviousScreen, storeItem, useForceUpdate } from '../../../../utils/functions'
import Loader from '../../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'

import CalanderComponent from '../../../../components/calander.component'
import DateTimePicker from 'react-native-date-picker'

import PrivacyPicker from '../../../../components/PrivacyPicker'
import HappeningStep from '../../../../common/HappeningStep'


var alertRefInner;
const Duration1 = (props) => {

    const forceUpdate = useForceUpdate();
    const { state, setLocationHappeningData, setHappeningData } = useContext(Context)
    

    const [loading, setLoading] = useState(false);

    const repeatOptions = ["Repeat daily", "Repeat Weekly", "Repeat monthly"]//"Repeat monthly", "Repeat yearly"
    const [calenderModal, setCalenderModal] = useState(false);

    const [daysArr, setDayArr] = useState([]);
    const [yearsArr, setYearArr] = useState([]);


    const [dateOfDuration, setDateOfDuration] = useState('');
    const [fromTimeModal, setFromTimeModal] = useState(false);
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [toTimeModal, setToTimeModal] = useState(false);


    function next() {

        if (dateOfDuration == "") {
            alertRefInner.alertWithType('error', "Error", "Please enter date of duration");
            return;
        }
        if (fromTime == "") {
            alertRefInner.alertWithType('error', "Error", "Please from time");
            return;
        }
        if (toTime == "") {
            alertRefInner.alertWithType('error', "Error", "Please enter to time");
            return;
        }

        var body = {
            ...state.locationHappeningDraft,
            startTime: fromTime,
            endTime: toTime,
            startingDate: dateOfDuration,
            endDate: dateOfDuration,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }

        setLocationHappeningData(body);
        navigate('HappeningLanguages')
        return;

    }



    function makeTime(date) {
        // 12-23.59 pm // 0-11.59 am
        var time;
        let hours = date.getHours();
        let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        time = hours + ":" + minutes;
        return time;
    }


    function makeStaticArrays() {
        let arr = [];
        for (let i = 1; i <= 31; i++) {
            arr.push({
                title: i.toString()
            })
        }
        setDayArr(arr);
        arr = [];
        for (let i = 1990; i <= 2022; i++) {
            arr.push({
                title: i
            });
        }
        setYearArr(arr);
    }





    useEffect(() => {
        makeStaticArrays();
    }, [])


    const FromDateTimePicker = () => (

        <>
            <DateTimePicker
                modal
                open={fromTimeModal}
                date={new Date(-1232403882588)}
                mode={'time'}
                theme='dark'
                onConfirm={(date) => {
                    if (date) {
                        let time = makeTime(date);
                        setFromTimeModal(false);
                        setFromTime(time);

                    }
                }}
                onCancel={() => {
                    setFromTimeModal(false)
                }}
            />
        </>
    )

    const ToDateTimePicker = () => (
        <DateTimePicker
            modal
            open={toTimeModal}
            date={new Date(-1232403882588)}
            minuteInterval={15}
            mode={'time'}
            theme='dark'
            onConfirm={(date) => {
                if (date) {
                    let time = makeTime(date);
                    setToTimeModal(false);
                    setToTime(time);
                }
            }}
            onCancel={() => {
                setToTimeModal(false)
            }}
        />

    )

    const CrossBtn = ({ onPress }) => (
        <TouchableOpacity
            onPress={() => onPress()}
            style={styles.crossBtn}>
            <CrossIcon />
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1, backgroundColor: '#FDFDFD' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />



            <HappeningHeader
                heading={"When is this happening?"}
                desc={"select the duration and the date of the happening."}
            />
            <View style={styles.contentContainer}>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 300 }} >
                    <Text style={[styles.pickerTitle, { marginTop: 20, marginLeft: 6, marginTop: 50, marginLeft: 5 }]}>{""}</Text>
                    {/* Single happening */}
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity
                            onPress={() => setCalenderModal(true)}
                            style={[styles.shadow, styles.pickerContainer, { marginLeft: 0 }]}>
                            <Text style={styles.pickerTitle}>{dateOfDuration ? dateOfDuration : "Date of happening"}</Text>
                            <CalenderIcon style={{ marginLeft: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setFromTimeModal(true)}
                            style={[styles.shadow, styles.pickerContainer, { flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }]}>
                            <Text style={{ fontFamily: fonts.MBo, fontSize: 7, color: '#2A2A2A' }}>from</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.pickerTitle}>{fromTime} </Text>
                                <ArrowDown style={{ marginLeft: 5 }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setToTimeModal(true)}
                            style={[styles.shadow, styles.pickerContainer, { flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }]}>
                            <Text style={{ fontFamily: fonts.MBo, fontSize: 7, color: '#2A2A2A' }}>To</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.pickerTitle}>{toTime}</Text>
                                <ArrowDown style={{ marginLeft: 5 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>


            </View>
            <HappeningStep
                nextText={"Next"}
                onPress={() => next()}
                step={props?.route?.params?.step}
            />


            {/* POPUPS */}
            <ReactNativeModal
                isVisible={calenderModal}
                onBackdropPress={() => setCalenderModal(false)}
            >
                <View style={{}}>
                    <CalanderComponent
                        selectedDate={dateOfDuration}
                        onDayPress={(day) => {
                            setDateOfDuration(day.dateString)
                        }}

                    />
                    <CrossBtn onPress={() => setCalenderModal(false)} />
                </View>
            </ReactNativeModal>

            {fromTimeModal && <FromDateTimePicker />}
            {toTimeModal && <ToDateTimePicker />}
            <DropdownAlert ref={(ref) => alertRefInner = ref} />
            {loading && <Loader />}
        </View >
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
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
    },
    title: {
        fontFamily: fonts.MBo, fontSize: 9, color: '#2A2A2A', lineHeight: 15,
    },
    text: {
        color: '#5D5760', fontFamily: fonts.PMe, fontSize: 12
    },
    headingText: {
        color: '#5D5760', fontFamily: fonts.PBo, fontSize: 12
    },
    agreeBtn: {
        width: "100%", position: 'absolute', bottom: 0, height: 70,
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 30, alignItems: 'center', justifyContent: 'space-between',
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        shadowColor: 'rgba(0, 0, 0, 0.09)',
        shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        elevation: 5
    },
    radioUnSelected: {
        width: 15.92, height: 15.92, borderRadius: 15.92 / 2, borderWidth: 1, borderColor: '#35208E',

    },
    radioSelected: {
        width: 15.92, height: 15.92, borderRadius: 15.92 / 2, backgroundColor: '#35208E', alignItems: 'center', justifyContent: 'center'
    },
    pointsView: {
        flexDirection: 'row', alignItems: 'center', marginTop: 10

    },
    themePickerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14,
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        elevation: 2
    },
    themeText: {
        fontSize: 12, color: "#2a2a2a", fontFamily: fonts.MBo, letterSpacing: 0.18,
    },
    languagePickerCircle: {
        width: 37, height: 37, borderRadius: 37 / 2,
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', elevation: 5
    },
    subData: {
        fontFamily: fonts.MRe, color: '#828282', fontSize: 8
    },
    tipsBtn: {
        width: 91, height: 32, borderRadius: 20, backgroundColor: '#5b4dbc',
        alignItems: 'center', justifyContent: 'center',
        marginTop: 20, alignSelf: 'flex-end'
    },
    topsBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },
    popupHeading: {
        color: '#ffa183', fontFamily: fonts.PBo, fontSize: 21, marginTop: 20
    },
    pickerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 36, borderRadius: 10,
        paddingLeft: 8, paddingHorizontal: 10, marginLeft: 10
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.4)', shadowOffset: { width: 0.5, height: 0.5 }, shadowRadius: 2, shadowOpacity: 0.5, elevation: 2,
        backgroundColor: 'white'
    },
    pickerTitle: {
        fontFamily: fonts.MBo, fontSize: 12, color: '#2A2A2A'
    },
    popupTitle: {
        fontFamily: fonts.MBo, fontSize: 12, color: '#FFFFFF'
    },
    pickerSeperator: {
        width: "100%", height: 0.5, backgroundColor: 'white',
    },
    recurrenceText: {
        fontFamily: fonts.MBo, fontSize: 20, color: '#35208E'
    },
    weekContainer: {
        width: 30, height: 30, borderRadius: 30 / 2, backgroundColor: 'white', elevation: 2, alignItems: 'center', justifyContent: 'center'
    },
    crossBtn: {
        position: 'absolute', top: -20, right: -20, width: 43, height: 43, borderRadius: 43 / 2,
        backgroundColor: 'white', elevation: 2, alignItems: 'center', justifyContent: 'center'
    },



})

export default Duration1