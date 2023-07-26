
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput, Platform, BackHandler } from 'react-native'
import { Switch } from 'react-native-gesture-handler'
import ReactNativeModal from 'react-native-modal'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { ArrowDown, BackIcon, CalenderIcon, CrossIcon, HappeningLocationIcon, LOCALCOMMUNITIES, LocationIcon, NextIcon, NONCOMMERCIALACTIVITIES, NotifIcon, OnlineHappeningIcon, RELIABLENONPROFITS, RepeatIcon, SUPPORTICON, TickIcon, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'

import { Context } from '../../../../Context/DataContext'
import { capitalizeFirstLetter, formatDate, getHOLPreviousScreen, getHeight, getWidth, storeItem, useForceUpdate } from '../../../../utils/functions'
import Loader from '../../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import { Calendar } from 'react-native-calendars'
import CalanderComponent from '../../../../components/calander.component'
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from 'react-native-date-picker'
// import TimePickercomponent from './timePicker.component'
import PrivacyPicker from '../../../../components/PrivacyPicker'
import HappeningStep from '../../../../common/HappeningStep'
import GeneralStatusBar from '../../../../components/GernalStatusBar'
import AlertPopup from '../../../../common/AlertPopup'


var alertRefInner;
var alertRef;

const DurationRepeat = (props) => {

    const forceUpdate = useForceUpdate();
    const { state, setLocationHappeningData, setHappeningData } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const [confirmPopup, setConfirmPopup] = useState(false);

    const [dNRP, setDNRPosition] = useState() // DOES NOT REPEAT PICKER POSITION
    const [xOffset, setXOffset] = useState(); // SETTING MODAL POSITION FOR DOESNOT REPEAT PICKER
    const [yOffset, setYOffset] = useState();// SETTING MODAL POSITION FOR DOESNOT REPEAT PICKER
    const [repeatOn, setRepeatOn] = useState('');
    const [dNRModal, setDNRModal] = useState(false);
    const currentDateObj = new Date();

    const [dailyRepeatModal, setDailyRepeatModal] = useState(false);
    const [weeklyRepeatModal, setWeeklyRepeatModal] = useState(false);
    const [monthlyRepeatModal, setMonthlyRepeatModal] = useState(false)
    const [yearlyRepeatModal, setYearlyRepeatModal] = useState(false)

    const [selectedWeek, setSelectedWeek] = useState(['Tues']);

    const repeatOptions = ["Daily", "Weekly", "Monthly"]//"Monthly", "Repeat yearly"
    const [calenderModal, setCalenderModal] = useState(false);
    const [dailyRepeatCalanderModal, setDailyRepeatCalanderModal] = useState(false);
    const [dailyEndRepeatCalanderModal, setDailyEndRepeatCalanderModal] = useState(false)
    const [weeklyRepeatCalanderModal, setWeeklyRepeatCalanderModal] = useState(false);
    const [weeklyEndCalanderModal, setWeeklyEndCalanderModal] = useState(false);

    const [monthlyRepeatCalanderModal, setMonthlyRepeatCalanderModal] = useState(false);
    const [monthlyEndCalanderModal, setMonthlyEndCalanderModal] = useState(false);

    const [yearlyRepeatCalanderModal, setYearlyRepeatCalanderModal] = useState(false);

    const [daysArr, setDayArr] = useState([]);
    const [yearsArr, setYearArr] = useState([]);


    const [dateOfDuration, setDateOfDuration] = useState('');
    const [fromTimeModal, setFromTimeModal] = useState(false);
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [toTimeModal, setToTimeModal] = useState(false);
    const [fromPickerTime, setFromPickerTime] = useState(new Date());
    const [toPickerTime, setToPickerTime] = useState(new Date());

    const [doesNotRepeat, setDoesNotRepeat] = useState('Daily');
    const [allDay, setAllDay] = useState(false);
    const [messageBeforeHappeningStarting, setMessageBeforeHappeningStarting] = useState('');



    const [repeatDaily, setRepeatDaily] = useState({
        startingDate: "",
        repeat: 'Daily',
        every: '1',
        end: ""
    });

    const [repeatWeekly, setRepeatWeekly] = useState({
        startingDate: "",
        repeat: 'Weekly',
        every: '1',
        on: [],
        end: ""
    });

    const [repeatBiWeekly, setRepeatBiWeekly] = useState({
        startingDate: "",
        repeat: 'Bi-Weekly',
        every: '14',
        on: [],
        end: ""
    });

    const [repeatMonthly, setRepeatMonthly] = useState({
        startingDate: "",
        repeat: 'Weekly',
        every: '1',
        on: '',
        end: ""
    })

    const [repeatQ, setRepeatQ] = useState({
        startingDate: "",
        repeat: 'Weekly',
        every: '1',
        on: '',
        end: ""
    })


    // React.useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', function () {
    //         return true;
    //     })
    // }, []);

    function next() {

        if (doesNotRepeat == "Daily") if (!doValidateDailyRepeatFields()) return;
        if (doesNotRepeat == 'Weekly') if (!doValidateWeeklyRepeatFields()) return;;
        if (doesNotRepeat == 'Bi-Weekly') if (!doValidateBiWeeklyRepeatFields()) return;;
        if (doesNotRepeat == 'Monthly') if (!doValidateMonthlyFields()) return;

        let repeat = makeDoesNotRepeat();
        if (!repeat) return;

        if (repeat?.startingDate == "") {
            alertRef.alertWithType('error', "Error", "Please enter date of duration");
            return;
        }
        if (fromTime == "") {
            alertRef.alertWithType('error', "Error", "Please enter from time");
            return;
        }
        if (toTime == "") {
            alertRef.alertWithType('error', "Error", "Please enter to time");
            return;
        }

        var body = {
            ...state.locationHappeningDraft,
            startTime: fromTime,
            endTime: toTime,
            startingDate: repeat?.startingDate,
            endDate: repeat?.end,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
        if (doesNotRepeat) {
            if (doesNotRepeat == 'Daily') {
                body.repeatEvery = repeat.every
            }
            else if (doesNotRepeat == 'Weekly') {
                body.daysOfWeek = repeat.on;
            }
            else if (doesNotRepeat == 'Monthly') {
                body.daysOfMonth = repeat.on;
                body.repeat = '1';
            }
            else if (doesNotRepeat == 'Bi-Weekly') {
                body.daysOfWeek = repeat.on;
                body.repeatEvery = 14;
            }
            else if (doesNotRepeat == 'Quarterly') { // do validation
                body.daysOfMonth = repeat.on;
                body.repeat = '3';
            }
        }
        setLocationHappeningData(body);
        navigate('HappeningLanguages')
        return;
    }

    function makeDoesNotRepeat() {

        switch (doesNotRepeat) {
            case 'Daily':
                return repeatDaily;
            case 'Weekly':
                return repeatWeekly;
            case 'Bi-Weekly':
                return repeatBiWeekly;
            case 'Monthly':
                return repeatMonthly
                alertRef.alertWithType('error', 'Error', "Monthly and Yearly recurrence is under development")
            case 'Repeat yearly':
                alertRef.alertWithType('error', 'Error', "Yearly recurrence is under development")
                return false;
            default: return null;
        }

    }

    function doSetRepeatOption(v) {
        setDNRModal(false);
        setDoesNotRepeat(v);
        switch (v) {
            case 'Daily':
                setDailyRepeatModal(true);
                return;
            case 'Weekly':
                setWeeklyRepeatModal(true);
                return;
            case 'Monthly':
                setMonthlyRepeatModal(true);
                return;
            case 'Repeat yearly':
                setYearlyRepeatModal(true);
                return;
            default: return null;
        }

    }

    function doAddWeek(v) {
        let arr = selectedWeek;
        if (arr.includes(v)) {
            let foundIndex = arr.indexOf(v);
            arr.splice(foundIndex, 1);
        }
        else arr.push(v);
        setSelectedWeek(arr)
        // setSelectedWeek(v);
        forceUpdate();
    }

    function makeTime(date) {
        // 12-23.59 pm // 0-11.59 am
        var time;
        let hours = date.getHours();
        console.log('date.getMinutes()', date.getMinutes()?.length)
        let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        time = hours + ":" + minutes;
        // hours = parseInt(hours);
        // if (hours >= 12 && hours < 24) { // pm
        //     hours = hours - 12;
        //     if (hours < 10) hours = "0" + hours;
        //     time = hours.toString() + ":" + minutes + " PM";
        // }
        // else {
        //     if (hours == 0) hours = "0";
        //     if (hours < 10) hours = "0" + hours;
        //     time = hours.toString() + ":" + minutes + " AM";
        // }
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

    function doValidateDailyRepeatFields() {
        if (!repeatDaily.startingDate) {
            alertRef.alertWithType('error', "Error", "Please enter starting date")
            return false;
        }
        if (!repeatDaily.end) {
            alertRef.alertWithType('error', "Error", "Please enter end date")
            return false;
        }
        setDailyRepeatModal(false);
        return true
    }

    function doValidateWeeklyRepeatFields() {
        if (!repeatWeekly.startingDate) {
            alertRef.alertWithType('error', "Error", "Please enter starting date")
            return false;
        }
        if (selectedWeek.length == 0) {
            alertRef.alertWithType('error', "Error", "Please select `on` days")
            return false;
        }
        if (!repeatWeekly.end) {
            alertRef.alertWithType('error', "Error", "Please enter end date")
            return false;
        }
        setRepeatWeekly({
            ...repeatWeekly,
            on: selectedWeek
        })
        return true
    }

    function doValidateBiWeeklyRepeatFields() {
        if (!repeatBiWeekly.startingDate) {
            alertRef.alertWithType('error', "Error", "Please enter starting date")
            return false;
        }
        if (selectedWeek.length == 0) {
            alertRef.alertWithType('error', "Error", "Please select `on` days")
            return false;
        }
        if (!repeatBiWeekly.end) {
            alertRef.alertWithType('error', "Error", "Please enter end date")
            return false;
        }
        setRepeatBiWeekly({
            ...repeatBiWeekly,
            on: selectedWeek
        })
        return true
    }

    function doValidateMonthlyFields() {
        if (!repeatMonthly.startingDate) {
            alertRef.alertWithType('error', "Error", "Please enter starting date")
            return false;
        }
        if (!repeatMonthly.on) {
            alertRef.alertWithType('error', "Error", "Please select 'of the month'")
            return false;
        }
        if (!repeatMonthly.end) {
            alertRef.alertWithType('error', "Error", "Please enter end date")
            return false;
        }

        return true

    }

    useEffect(() => {
        makeStaticArrays();
    }, []);

    const RepeatOnPopup = () => (
        <ReactNativeModal
            isVisible={dNRModal}
            onBackdropPress={() => setDNRModal(false)}
        >
            <View style={{ marginTop: yOffset, marginLeft: xOffset, backgroundColor: '#35208E', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, width: "56%" }}>
                {
                    repeatOptions.map((v, i) => {
                        return (
                            <View
                                key={i}
                            >
                                <TouchableOpacity
                                    onPress={() => doSetRepeatOption(v)}
                                    style={{ width: "100%", paddingVertical: 7 }}>
                                    <Text style={styles.popupTitle}>{v}</Text>
                                </TouchableOpacity>
                                <View style={styles.pickerSeperator} />
                            </View>
                        )
                    })
                }
            </View>

        </ReactNativeModal>
    )

    const FromDateTimePicker = () => (

        <>
            <DateTimePicker
                modal
                open={fromTimeModal}
                date={fromPickerTime}
                minuteInterval={15}
                mode={'time'}
                theme='dark'
                onConfirm={(date) => {
                    if (date) {
                        let time = makeTime(date);
                        setFromTimeModal(false);
                        setFromTime(time);
                        setFromPickerTime(date)

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
            date={toPickerTime}
            minuteInterval={15}
            mode={'time'}
            theme='dark'
            onConfirm={(date) => {
                if (date) {
                    let time = makeTime(date);
                    setToTimeModal(false);
                    setToTime(time);
                }
                setToPickerTime(date);
            }}
            onCancel={() => {
                setToTimeModal(false)
            }}
        />
        // <DateTimePicker
        //     value={new Date(-1232403882588)}
        //     mode='time'
        //     display='spinner'
        //     minuteInterval={15}
        //     themeVariant="dark"
        //     style={{ backgroundColor: acolors.primary, color: 'red' }}
        //     onChange={(event, date) => {
        //         if (date) {
        //             let time = makeTime(date);
        //             setToTimeModal(false);
        //             setToTime(time);
        //         }

        //     }}
        // />
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
            <GeneralStatusBar />
            <HappeningHeader
                heading={"When is this happening?"}
                desc={"select the duration and the date of the happening."}
            />

            <View style={styles.contentContainer}>
                <Text style={styles.recurrenceText}>Recurrence - {doesNotRepeat}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={styles.pickerTitle}>Repeat</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[styles.shadow, styles.pickerContainer, { marginLeft: 0, width: getWidth(25), marginVertical: 1 }]}>
                            <PrivacyPicker
                                selected={{ title: doesNotRepeat }}
                                data={[
                                    { title: "Daily" }, { title: "Weekly" }, { title: 'Bi-Weekly' }, { title: "Monthly" }, { title: "Quarterly" }, { title: "Repeat yearly" },

                                ]}
                                onValueChange={(i, v) => {
                                    setDoesNotRepeat(v.title)
                                    doSetRepeatOption(v.title);
                                    forceUpdate();
                                }}
                            />
                        </View>
                    </View>
                </View>

                {
                    doesNotRepeat == 'Daily' &&

                    <View tyle={{ margin: 0 }}>
                        <View style={{ backgroundColor: '#fff', paddingHorizontal: 0, paddingVertical: 10, borderRadius: 10, width: "100%", alignSelf: 'center' }}>

                            {
                                dailyRepeatCalanderModal ?
                                    <View style={{ marginTop: 0, width: "110%", marginLeft: "-5%" }}>
                                        <TouchableOpacity
                                            onPress={() => setDailyRepeatCalanderModal(false)}
                                            style={{ backgroundColor: 'black', width: 30, height: 30, borderRadius: 30 / 2, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                                            <BackIcon width={7} height={18} />
                                        </TouchableOpacity>
                                        <CalanderComponent
                                            selectedDate={repeatDaily?.startingDate}
                                            onDayPress={(v) => {
                                                setRepeatDaily({
                                                    ...repeatDaily,
                                                    startingDate: v.dateString
                                                })
                                                setDailyRepeatCalanderModal(false);
                                            }}
                                        />
                                    </View>
                                    :
                                    dailyEndRepeatCalanderModal ?
                                        <View style={{ marginTop: 0, width: "110%", marginLeft: "-5%" }}>
                                            <TouchableOpacity
                                                onPress={() => setDailyEndRepeatCalanderModal(false)}
                                                style={{ backgroundColor: 'black', width: 20, height: 20, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                                <BackIcon width={7} height={18} />
                                            </TouchableOpacity>
                                            <CalanderComponent
                                                minDate={repeatDaily.startingDate}
                                                selectedDate={repeatDaily?.end}
                                                onDayPress={(v) => {
                                                    console.log(v)
                                                    setRepeatDaily({
                                                        ...repeatDaily,
                                                        end: v.dateString
                                                    })
                                                    setDailyEndRepeatCalanderModal(false);
                                                }}
                                            />
                                        </View>
                                        :

                                        <>
                                            {/* <Text style={styles.recurrenceText}>Recurrence - Daily</Text> */}
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: getHeight(1) }}>
                                                <Text style={styles.pickerTitle}>Start</Text>
                                                <TouchableOpacity
                                                    onPress={() => setDailyRepeatCalanderModal(true)}
                                                    style={[styles.shadow, styles.pickerContainer, { marginLeft: 0 }]}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Text style={styles.pickerTitle}>{repeatDaily.startingDate}</Text>
                                                        <CalenderIcon style={{ marginLeft: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                                                <Text style={styles.pickerTitle}>Every</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={[styles.shadow, styles.pickerContainer, { marginLeft: 0, width: 60 }]}>
                                                        <PrivacyPicker
                                                            selected={{ title: repeatDaily.every }}
                                                            data={daysArr}
                                                            onValueChange={(i, v) => {
                                                                setRepeatDaily({
                                                                    ...repeatDaily,
                                                                    every: v.title
                                                                });
                                                            }}
                                                        />

                                                    </View>
                                                    <Text style={[styles.pickerTitle, { marginLeft: 5 }]}>Day(s)</Text>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                                                <Text style={styles.pickerTitle}>End</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <TouchableOpacity
                                                        onPress={() => setDailyEndRepeatCalanderModal(true)}
                                                        style={[styles.shadow, styles.pickerContainer,]}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <Text style={styles.pickerTitle}>{repeatDaily.end}</Text>
                                                            <CalenderIcon style={{ marginLeft: 10 }} />
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </>
                            }
                        </View>
                    </View >
                }
                {
                    doesNotRepeat == 'Weekly' &&
                    <View style={{ backgroundColor: '#fff', paddingHorizontal: 0, paddingVertical: 10, borderRadius: 10, width: "100%", alignSelf: 'center' }}>
                        {
                            weeklyRepeatCalanderModal ?
                                <View style={{ marginTop: 0, width: "110%", marginLeft: "-5%" }}>
                                    <TouchableOpacity
                                        onPress={() => setWeeklyRepeatCalanderModal(false)}
                                        style={{ backgroundColor: 'black', width: 30, height: 30, borderRadius: 30 / 2, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                                        <BackIcon width={7} height={18} />
                                    </TouchableOpacity>
                                    <CalanderComponent
                                        selectedDate={repeatWeekly?.startingDate}
                                        onDayPress={(v) => {
                                            setRepeatWeekly({
                                                ...repeatWeekly,
                                                startingDate: v.dateString
                                            })
                                            setWeeklyRepeatCalanderModal(false);
                                        }}
                                    />
                                </View>
                                :
                                weeklyEndCalanderModal ?
                                    <View style={{ marginTop: 0, width: "110%", marginLeft: "-5%" }}>
                                        <TouchableOpacity
                                            onPress={() => setWeeklyEndCalanderModal(false)}
                                            style={{ backgroundColor: 'black', width: 20, height: 20, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                            <BackIcon width={7} height={18} />
                                        </TouchableOpacity>
                                        <CalanderComponent
                                            minDate={repeatDaily.startingDate}
                                            selectedDate={repeatDaily?.end}
                                            onDayPress={(v) => {
                                                console.log(v)
                                                setRepeatWeekly({
                                                    ...repeatWeekly,
                                                    end: v.dateString
                                                })
                                                setWeeklyEndCalanderModal(false);
                                            }}
                                        />
                                    </View>
                                    :

                                    <>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: getHeight(1) }}>
                                            <Text style={styles.pickerTitle}>Start</Text>
                                            <TouchableOpacity
                                                onPress={() => setWeeklyRepeatCalanderModal(true)}
                                                style={[styles.shadow, styles.pickerContainer, { marginLeft: 0 }]}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Text style={styles.pickerTitle}>{repeatWeekly.startingDate}</Text>
                                                    <CalenderIcon style={{ marginLeft: 5 }} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                                            <Text style={styles.pickerTitle}>On</Text>
                                            {
                                                ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"].map((v, i) => (
                                                    <TouchableOpacity
                                                        key={i}
                                                        onPress={() => doAddWeek(v)}
                                                        style={[styles.shadow, styles.weekContainer, selectedWeek.includes(v) && { backgroundColor: '#B9B1F0' }]}>
                                                        <Text style={[styles.pickerTitle, { fontSize: 7 }]}>{v}</Text>
                                                    </TouchableOpacity>
                                                ))
                                            }

                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                                            <Text style={styles.pickerTitle}>End</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                {/* <TouchableOpacity style={[styles.shadow, styles.pickerContainer,]}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={styles.pickerTitle}>On this day</Text>
                                                    <ArrowDown style={{ marginLeft: 5 }} />
                                                </View>
                                            </TouchableOpacity> */}
                                                <TouchableOpacity
                                                    onPress={() => setWeeklyEndCalanderModal(true)}
                                                    style={[styles.shadow, styles.pickerContainer,]}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Text style={styles.pickerTitle}>{repeatWeekly.end}</Text>
                                                        <CalenderIcon style={{ marginLeft: 10 }} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </>
                        }
                    </View>
                }

                {
                    doesNotRepeat == 'Bi-Weekly' &&
                    <View style={{ backgroundColor: '#fff', paddingHorizontal: 0, paddingVertical: 10, borderRadius: 10, width: "100%", alignSelf: 'center' }}>
                        {
                            weeklyRepeatCalanderModal ?
                                <View style={{ marginTop: 0, width: "110%", marginLeft: "-5%" }}>
                                    <TouchableOpacity
                                        onPress={() => setWeeklyRepeatCalanderModal(false)}
                                        style={{ backgroundColor: acolors.primary, width: 30, height: 30, borderRadius: 30 / 2, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                                        <BackIcon width={8} height={18} />
                                    </TouchableOpacity>
                                    <CalanderComponent
                                        selectedDate={repeatBiWeekly?.startingDate}
                                        onDayPress={(v) => {
                                            setRepeatBiWeekly({
                                                ...repeatBiWeekly,
                                                startingDate: v.dateString
                                            })
                                            // setWeeklyRepeatCalanderModal(false);
                                        }}
                                    />
                                </View>
                                :
                                weeklyEndCalanderModal ?
                                    <View style={{ marginTop: 0, width: "110%", marginLeft: "-5%" }}>
                                        <TouchableOpacity
                                            onPress={() => setWeeklyEndCalanderModal(false)}
                                            style={{ backgroundColor: acolors.primary, width: 30, height: 30, borderRadius: 30 / 2, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                                            <BackIcon width={7} height={18} />
                                        </TouchableOpacity>
                                        <CalanderComponent
                                            minDate={new Date(repeatBiWeekly.startingDate)?.setDate(new Date(repeatBiWeekly.startingDate).getDate() + 14)}
                                            selectedDate={repeatBiWeekly.end}
                                            currentDateObj={new Date(repeatBiWeekly.startingDate)?.setDate(new Date(repeatBiWeekly.startingDate).getDate() + 14)}
                                            onDayPress={(v) => {
                                                setRepeatBiWeekly({
                                                    ...repeatBiWeekly,
                                                    end: v.dateString
                                                })
                                                // setWeeklyEndCalanderModal(false);
                                            }}
                                        />
                                    </View>
                                    :

                                    <>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: getHeight(1) }}>
                                            <Text style={styles.pickerTitle}>Start</Text>
                                            <TouchableOpacity
                                                onPress={() => setWeeklyRepeatCalanderModal(true)}
                                                style={[styles.shadow, styles.pickerContainer, { marginLeft: 0 }]}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Text style={styles.pickerTitle}>{repeatBiWeekly.startingDate}</Text>
                                                    <CalenderIcon style={{ marginLeft: 5 }} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                                            <Text style={styles.pickerTitle}>On</Text>
                                            {
                                                ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"].map((v, i) => (
                                                    <TouchableOpacity
                                                        key={i}
                                                        onPress={() => doAddWeek(v)}
                                                        style={[styles.shadow, styles.weekContainer, selectedWeek.includes(v) && { backgroundColor: '#B9B1F0' }]}>
                                                        <Text style={[styles.pickerTitle, { fontSize: 7 }]}>{v}</Text>
                                                    </TouchableOpacity>
                                                ))
                                            }

                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                                            <Text style={styles.pickerTitle}>End</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                {/* <TouchableOpacity style={[styles.shadow, styles.pickerContainer,]}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={styles.pickerTitle}>On this day</Text>
                                                    <ArrowDown style={{ marginLeft: 5 }} />
                                                </View>
                                            </TouchableOpacity> */}
                                                <TouchableOpacity
                                                    onPress={() => setWeeklyEndCalanderModal(true)}
                                                    style={[styles.shadow, styles.pickerContainer,]}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Text style={styles.pickerTitle}>{repeatBiWeekly.end}</Text>
                                                        <CalenderIcon style={{ marginLeft: 10 }} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </>
                        }
                    </View>
                }



                {
                    doesNotRepeat == 'Monthly' &&
                    <View style={{ backgroundColor: '#fff', paddingHorizontal: 0, paddingVertical: 10, borderRadius: 10, width: "100%", alignSelf: 'center' }}>
                        {
                            monthlyRepeatCalanderModal ?
                                <View style={{ marginTop: 0, width: "110%", marginLeft: "-5%" }}>
                                    <TouchableOpacity
                                        onPress={() => setMonthlyRepeatCalanderModal(false)}
                                        style={{ backgroundColor: 'black', width: 30, height: 30, borderRadius: 30 / 2, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                                        <BackIcon width={7} height={18} />
                                    </TouchableOpacity>
                                    <CalanderComponent
                                        selectedDate={repeatMonthly?.startingDate}
                                        onDayPress={(v) => {
                                            setRepeatMonthly({
                                                ...repeatMonthly,
                                                startingDate: v.dateString
                                            })
                                            setMonthlyRepeatCalanderModal(false);
                                        }}
                                    />
                                </View>
                                :
                                monthlyEndCalanderModal ?
                                    <View style={{ marginTop: 0, width: "110%", marginLeft: "-5%" }}>
                                        <TouchableOpacity
                                            onPress={() => setMonthlyEndCalanderModal(false)}
                                            style={{ backgroundColor: 'black', width: 20, height: 20, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                            <BackIcon width={7} height={18} />
                                        </TouchableOpacity>
                                        <CalanderComponent
                                            minDate={repeatDaily.startingDate}
                                            selectedDate={repeatDaily?.end}
                                            onDayPress={(v) => {
                                                setRepeatMonthly({
                                                    ...repeatMonthly,
                                                    end: v.dateString
                                                })
                                                setMonthlyEndCalanderModal(false);
                                            }}
                                        />
                                    </View>
                                    :

                                    <>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: getHeight(1) }}>
                                            <Text style={styles.pickerTitle}>Start</Text>
                                            <TouchableOpacity
                                                onPress={() => setMonthlyRepeatCalanderModal(true)}
                                                style={[styles.shadow, styles.pickerContainer, { marginLeft: 0 }]}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Text style={styles.pickerTitle}>{repeatMonthly.startingDate}</Text>
                                                    <CalenderIcon style={{ marginLeft: 5 }} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                                            <Text style={styles.pickerTitle}>On</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={[styles.shadow, styles.pickerContainer, { marginLeft: 0, width: 60 }]}>
                                                    <PrivacyPicker
                                                        selected={{ title: repeatMonthly.on ?? '' }}
                                                        data={daysArr}
                                                        onValueChange={(i, v) => {
                                                            setRepeatMonthly({
                                                                ...repeatMonthly,
                                                                on: v.title
                                                            });
                                                        }}
                                                    />

                                                </View>
                                                <Text style={[styles.pickerTitle, { marginLeft: 5 }]}>of the{"\n"}month</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                                            <Text style={styles.pickerTitle}>End</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <TouchableOpacity
                                                    onPress={() => setMonthlyEndCalanderModal(true)}
                                                    style={[styles.shadow, styles.pickerContainer,]}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Text style={styles.pickerTitle}>{repeatMonthly.end}</Text>
                                                        <CalenderIcon style={{ marginLeft: 10 }} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </>
                        }
                    </View>
                }
                {
                    doesNotRepeat == 'Quarterly' &&
                    <View style={{ backgroundColor: '#fff', paddingHorizontal: 0, paddingVertical: 10, borderRadius: 10, width: "100%", alignSelf: 'center' }}>
                        {
                            monthlyRepeatCalanderModal ?
                                <View style={{ marginTop: 0, width: "110%", marginLeft: "-5%" }}>
                                    <TouchableOpacity
                                        onPress={() => setMonthlyRepeatCalanderModal(false)}
                                        style={{ backgroundColor: 'black', width: 30, height: 30, borderRadius: 30 / 2, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                                        <BackIcon width={7} height={18} />
                                    </TouchableOpacity>
                                    <CalanderComponent
                                        selectedDate={repeatMonthly?.startingDate}
                                        onDayPress={(v) => {
                                            setRepeatMonthly({
                                                ...repeatMonthly,
                                                startingDate: v.dateString
                                            })
                                            setMonthlyRepeatCalanderModal(false);
                                        }}
                                    />
                                </View>
                                :
                                monthlyEndCalanderModal ?
                                    <View style={{ marginTop: 0, width: "110%", marginLeft: "-5%" }}>
                                        <TouchableOpacity
                                            onPress={() => setMonthlyEndCalanderModal(false)}
                                            style={{ backgroundColor: 'black', width: 20, height: 20, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                            <BackIcon width={7} height={18} />
                                        </TouchableOpacity>
                                        <CalanderComponent
                                            minDate={repeatDaily.startingDate}
                                            selectedDate={repeatDaily?.end}
                                            onDayPress={(v) => {
                                                setRepeatMonthly({
                                                    ...repeatMonthly,
                                                    end: v.dateString
                                                })
                                                setMonthlyEndCalanderModal(false);
                                            }}
                                        />
                                    </View>
                                    :
                                    <>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: getHeight(1) }}>
                                            <Text style={styles.pickerTitle}>Start</Text>
                                            <TouchableOpacity
                                                onPress={() => setMonthlyRepeatCalanderModal(true)}
                                                style={[styles.shadow, styles.pickerContainer, { marginLeft: 0 }]}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Text style={styles.pickerTitle}>{repeatMonthly.startingDate}</Text>
                                                    <CalenderIcon style={{ marginLeft: 5 }} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                                            <Text style={styles.pickerTitle}>On</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={[styles.shadow, styles.pickerContainer, { marginLeft: 0, width: 60 }]}>
                                                    <PrivacyPicker
                                                        selected={{ title: repeatMonthly.on ?? '' }}
                                                        data={daysArr}
                                                        onValueChange={(i, v) => {
                                                            setRepeatMonthly({
                                                                ...repeatMonthly,
                                                                on: v.title
                                                            });
                                                        }}
                                                    />

                                                </View>
                                                <Text style={[styles.pickerTitle, { marginLeft: 5 }]}>of the{"\n"}month</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                                            <Text style={styles.pickerTitle}>End</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <TouchableOpacity
                                                    onPress={() => setMonthlyEndCalanderModal(true)}
                                                    style={[styles.shadow, styles.pickerContainer,]}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Text style={styles.pickerTitle}>{repeatMonthly.end}</Text>
                                                        <CalenderIcon style={{ marginLeft: 10 }} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </>
                        }
                    </View>
                }


                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => setFromTimeModal(true)}
                        style={[styles.shadow, styles.pickerContainer, { flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: getWidth(20) }]}>
                        <Text style={{ fontFamily: fonts.MBo, fontSize: 7, color: '#2A2A2A' }}>From</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%" }}>
                            <Text style={styles.pickerTitle}>{fromTime} </Text>
                            <ArrowDown />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setToTimeModal(true)}
                        style={[styles.shadow, styles.pickerContainer, { flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: getWidth(20) }]}>
                        <Text style={{ fontFamily: fonts.MBo, fontSize: 7, color: '#2A2A2A' }}>To</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%" }}>
                            <Text style={styles.pickerTitle}>{toTime} </Text>
                            <ArrowDown />
                        </View>
                    </TouchableOpacity>
                </View>


                {/* <View style={{ alignSelf: 'flex-end' }}>
                    <TouchableOpacity
                        onPress={() => {
                            doValidateWeeklyRepeatFields()

                            doValidateDailyRepeatFields()
                        }}
                        style={[styles.tipsBtn, {}]}>
                        <Text style={[styles.topsBtnTitle, { fontSize: 12 }]}>Save</Text>
                    </TouchableOpacity>
                </View> */}




            </View>
            <HappeningStep
                nextText={"Next"}
                onPress={() => next()}
                step={props?.route?.params?.step}
            />


            {/* POPUPS */}
            <RepeatOnPopup />

            {/* WEEKLY WEEKLY POPUP */}
            {/* <ReactNativeModal
                isVisible={weeklyRepeatModal}
                onBackdropPress={() => setDNRModal(false)}
                backdropOpacity={0.2}
                style={{ margin: 0 }}

            >
             


            </ReactNativeModal > */}
            {/* MONTHLY POPUP */}
            {/* <RepeatMonthlyPopup /> */}
            {/* <RepeatYearlyPopup /> */}
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
            <AlertPopup ref={(ref) => alertRefInner = ref} />
            <AlertPopup ref={(ref) => alertRef = ref} />
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

export default DurationRepeat




// {/* <ScrollView
// contentContainerStyle={{ paddingBottom: 300 }} >
// <Text style={[styles.pickerTitle, { marginTop: 20, marginLeft: 6, marginTop: 50, marginLeft: 5 }]}>{"Single happening"}</Text>
// <View style={{ flexDirection: 'row', marginTop: 10 }}>
//     <TouchableOpacity
//         onPress={() => setCalenderModal(true)}
//         style={[styles.shadow, styles.pickerContainer, { marginLeft: 0 }]}>
//         <Text style={styles.pickerTitle}>{dateOfDuration ? dateOfDuration : "Date of happening"}</Text>
//         <CalenderIcon style={{ marginLeft: 5 }} />
//     </TouchableOpacity>
//     <TouchableOpacity
//         onPress={() => setFromTimeModal(true)}
//         style={[styles.shadow, styles.pickerContainer, { flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }]}>
//         <Text style={{ fontFamily: fonts.MBo, fontSize: 7, color: '#2A2A2A' }}>from</Text>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text style={styles.pickerTitle}>{fromTime} </Text>
//             <ArrowDown style={{ marginLeft: 5 }} />
//         </View>
//     </TouchableOpacity>
//     <TouchableOpacity
//         onPress={() => setToTimeModal(true)}
//         style={[styles.shadow, styles.pickerContainer, { flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }]}>
//         <Text style={{ fontFamily: fonts.MBo, fontSize: 7, color: '#2A2A2A' }}>To</Text>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text style={styles.pickerTitle}>{toTime}</Text>
//             <ArrowDown style={{ marginLeft: 5 }} />
//         </View>
//     </TouchableOpacity>
// </View>
// <Text style={[styles.pickerTitle, { marginTop: 20, marginLeft: 6 }]}>{"Recurring happening"}</Text>
// <View style={{ flexDirection: 'row', marginTop: 10 }}>
//     <TouchableOpacity
//         ref={view => setDNRPosition(view)}
//         onPress={() => {
//             dNRP.measure((fx, fy, width, height, px, py) => {
//                 if (Platform.OS == 'ios') {
//                     setYOffset(fy)
//                     setXOffset(px + 1)
//                 }
//                 else {
//                     setYOffset(fy - 50)
//                     setXOffset(px - 10)
//                 }

//             })
//             forceUpdate();
//             setDNRModal(true);
//         }}
//         style={[styles.shadow, styles.pickerContainer, { marginLeft: 0 }]}>
//         <RepeatIcon style={{ marginRight: 5 }} />
//         <Text style={styles.pickerTitle}>{doesNotRepeat ? doesNotRepeat : "Does not repeat"}</Text>
//         <ArrowDown style={{ marginLeft: 5 }} />
//     </TouchableOpacity>
//     {/* <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center' }}>
//         <Text style={[styles.pickerTitle, { marginRight: 10 }]}>All day</Text>
//         <Switch
//             trackColor={{ false: "#767577", true: "rgba(0,0,0,0.5)" }}
//             thumbColor={allDay ? "#ffa183" : "#f4f3f4"}
//             onValueChange={() => setAllDay(!allDay)}
//             value={allDay}
//             // thumbColor={"#fffffff"}
//             ios_backgroundColor="#3e3e3e"
//         />
//     </View> */}

// </View>


// {/* <TextInput
//     placeholder='Message before starting happening'
//     placeholderTextColor={acolors.grey}
//     onChangeText={setMessageBeforeHappeningStarting}
//     textAlignVertical="top"
//     multiline={true}
//     style={[{ width: "85%", height: 59, borderWidth: 0.5, borderColor: acolors.grey, borderRadius: 12, marginTop: 10, paddingHorizontal: 10, fontSize: 12, color: acolors.grey, fontFamily: fonts.PRe, marginHorizontal: 3 }]}
// /> */}
// {/* <TouchableOpacity
//     style={[styles.shadow, styles.pickerContainer, { marginLeft: 0, paddingHorizontal: 15, marginTop: 15 }]}>
//     <NotifIcon style={{ marginRight: 5 }} />
//     <Text style={styles.pickerTitle}>15 mins before starting</Text>
//     <ArrowDown style={{ marginLeft: 5 }} />
// </TouchableOpacity> */}


// </ScrollView> */}