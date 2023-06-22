import React, { useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView, StyleSheet, TextInput } from 'react-native'
import { Calendar } from 'react-native-calendars'
import DropdownAlert from 'react-native-dropdownalert'
import ReactNativeModal from 'react-native-modal'
import { goBack, navigate } from '../../../../Navigations'
import AlertMsg from '../../../common/AlertMsg'
import HappeningStep from '../../../common/HappeningStep'
import { BackIcon, CalenderHappeningIcon, ClockHappeningIcon, CrossIcon, DrinksIcon, FoodIcon, HappeningLocationIconSmall, HeartIcon, HeartWhiteIcon, InfoIcon, MaxFellowsIcon, NextIcon, PIcon, RattingStartIcon, ToiletIcon, TrashIcon, WifiIcon } from '../../../components/Svgs'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import { urls } from '../../../utils/Api_urls'
import { formatDate, useForceUpdate } from '../../../utils/functions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import GeneralStatusBar from '../../../components/GernalStatusBar'


var textInputRef;
var alertRef;
const GoingWith = (props) => {

    const [infoAlert, setInfoAlert] = useState(false)
    const [selectedDate, setSelectedDate] = useState();
    const [addedDates, setAddedDates] = useState();
    const [addDateModal, setAddDateModal] = useState(false);
    const [selectedYoungsters, setSelectedYoungsters] = useState([]);
    const [youngstersData, setYoungstersData] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const [childrens, setChildrens] = useState(0);
    const params = props.route.params?.data;
    const forceUpdate = useForceUpdate();


    function minusChildren() {
        if (childrens == 0) return;
        setChildrens((child) => { return child - 1 })
    }
    function addChildren() {
        setChildrens((child) => {
            // if ((child + 1) > 5) {
            //     alertRef.alertWithType('info', "", `You can bring max 5 childrens`)
            //     return child
            // }
            // else return 
            return child + 1
        })
    }


    function addYoungsters() {
        setChildrens((child) => {
            if ((child + 1) > parseInt(params?.maxPeopleThatAFellowCanBring)) {
                alertRef.alertWithType('info', "", `You can bring max ${params?.maxPeopleThatAFellowCanBring} fellows`)
                return child
            }
            else return child + 1
        })
    }

    function search(searchWord) {
        let url = urls.API + 'filterUserByName/' + searchWord;
        fetch(url, {
            method: 'GET'
        })
            .then((response) => response.json())
            // .then((response) => response.text())
            .then((responseJson) => {
                setYoungstersData(responseJson.data?.length ? responseJson.data : [])
            })
    }

    const ChildrenInfo = () => (
        <View style={[styles.shadow, { width: "98%", alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 80, alignItems: 'center', paddingLeft: 20, paddingRight: 10, borderRadius: 12, marginTop: 15 }]}>
            <View>
                <Text style={styles.headingText}>Children</Text>
                <Text style={[styles.regulareText, { fontSize: 10 }]}>below 18 years old</Text>
                {/* <Text style={[styles.regulareText, { fontSize: 10, marginTop: 12 }]}>You can bring a maximum of 5 children.</Text> */}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity
                    onPress={() => minusChildren()}
                    style={styles.addMinusBtn}>
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 11, color: '#5D5760', }}>-</Text>
                </TouchableOpacity>
                <View style={[styles.shadow, styles.quantityBox]}>
                    <Text style={styles.headingText}>{childrens}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => addChildren()}
                    style={styles.addMinusBtn}>
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 11, color: '#5D5760', }}>+</Text>
                </TouchableOpacity>
            </View>

            {/* <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}> */}
            {/* <TouchableOpacity
                    onPress={() => setChildrens(0)}
                >
                    <Text style={{ color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 10, textDecorationLine: 'underline', }}>reset</Text>
                </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.popupBtn}>
                    <Text style={[styles.popupBtnTitle, { margin: 0 }]}>Save</Text>
                </TouchableOpacity> */}

            {/* </View> */}
        </View>
    )





    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <GeneralStatusBar backgroundColor='#fff' barStyle='dark-content' />

            <DropdownAlert ref={(ref) => alertRef = ref} />

            <View style={{ width: "90%", alignSelf: 'center' }}>
                <TouchableOpacity
                    onPress={() => goBack()}
                    style={{ marginTop: 20 }} >
                    <BackIcon
                        color={"#5A4CBB"}
                    />
                </TouchableOpacity>

                <Text style={[{ color: '#5A4CBB', fontSize: 23, fontFamily: fonts.PBo, marginTop: 15 }]}>Are you going with{"\n"}children </Text>
                {/* or Youngsters? */}
                <Text style={[styles.regulareText, { fontSize: 11 }]}>From 18 years, people are requested to create their own profile.</Text>
                <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
                    {/* {params?.minAgeToParticipate <= 18 &&  */}
                    <ChildrenInfo />
                    {/* } */}
                </ScrollView>
            </View>

            <TouchableOpacity
                onPress={() => {
                    let obj = props.route.params?.data;
                    obj.childrens = 0;
                    navigate('ReviewJoining', {
                        data: obj,
                        fellowWantToComeAlone: true,
                    })
                }}
                style={[styles.shadow, { width: "90%", alignSelf: 'center', paddingVertical: 15, paddingLeft: 20, paddingRight: 10, borderRadius: 12, marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', bottom: 100 }]}>
                <Text style={[styles.headingText, { fontSize: 14 }]}>I'm not going with children</Text>
                {/* //or{"\n"}youngsters */}
                <NextIcon style={{ marginLeft: 10 }} />
            </TouchableOpacity>

            <HappeningStep
                onPress={() => {
                    let data = props.route.params?.data;
                    data.childrens = childrens
                    if (selectedYoungsters) {
                        let arr = [];
                        for (let key of selectedYoungsters) {
                            arr.push(key.userId._id)
                        }
                        console.log('arr', arr)
                        data.youngsters = arr;
                    }
                    navigate('ReviewJoining', {
                        data: data,
                        fellowWantToComeAlone: selectedYoungsters[0] ? false : true,
                    })
                }}
                showStep={false}
                // containerStyle={{ alignItems: 'flex-end', flexDirection: 'column', justifyContent: 'center' }}
                nextText={"Next"}
            />

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
        color: '#2A2A2A', fontFamily: fonts.PBo, fontSize: 12
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
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.7)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.3, elevation: 2,
        backgroundColor: 'white'
    },

    addMinusBtn: {
        width: 20, height: 20, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#707070'
    },

    quantityBox: {
        width: 52, height: 37, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10,
    }




})

export default GoingWith



// {params?.minAgeToParticipate <= 18 && <View style={[styles.shadow, { width: "100%", paddingVertical: 15, paddingLeft: 20, paddingRight: 10, borderRadius: 12, marginTop: 15 }]}>
// <View>
//     <Text style={styles.headingText}>Youngsters</Text>
//     <Text style={[styles.regulareText, { fontSize: 10 }]}>12-18 years old</Text>
//     <Text style={[styles.regulareText, { fontSize: 10, marginTop: 4 }]}>You can bring a maximum of 5 children.</Text>
// </View>
// <View>
//     <View>
//         <TextInput
//             placeholder='Search for youngsters to join'
//             ref={(ref) => textInputRef = ref}
//             placeholderTextColor={"#7b7b7b"}
//             onChangeText={(v) => search(v)}
//             style={{
//                 width: "100%", height: 47, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
//                 fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10, marginTop: 10
//             }}
//         />
//         {
//             youngstersData[0] &&
//             <View style={{ backgroundColor: 'white', elevation: 2, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10 }}>
//                 {youngstersData?.map((v, i) => {
//                     return (
//                         <TouchableOpacity
//                             onPress={() => {
//                                 if (!selectedYoungsters.includes(v)) setSelectedYoungsters([...selectedYoungsters, v])
//                                 textInputRef.clear();
//                                 setYoungstersData([]);
//                             }}
//                             style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
//                             <Image
//                                 style={{ width: 30, height: 30, borderRadius: 15 }}
//                                 source={{ uri: v?.profileImage }}
//                             />
//                             <Text style={{ color: "black", fontFamily: fonts.PRi, fontSize: 14, marginLeft: 10 }} key={i}>{v.userId?.userName}</Text>
//                         </TouchableOpacity>
//                     )
//                 })}
//             </View>
//         }
//     </View>
//     {
//         selectedYoungsters &&
//         <View style={{}}>
//             {
//                 selectedYoungsters?.map((v, i) => {
//                     return (
//                         <TouchableOpacity
//                             key={i}
//                             onPress={() => {
//                                 if (!selectedYoungsters.includes(v)) setSelectedYoungsters([...selectedYoungsters, v])
//                                 textInputRef.clear();
//                                 setYoungstersData([]);
//                             }}
//                             style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
//                             <Image
//                                 style={{ width: 30, height: 30, borderRadius: 15 }}
//                                 source={{ uri: v?.profileImage }}
//                             />
//                             <Text style={{ color: "black", fontFamily: fonts.PRe, fontSize: 14, marginLeft: 10 }} key={i}>{v.userId?.userName}</Text>
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     let arr = selectedYoungsters;
//                                     let findIndex = arr.indexOf(selectedYoungsters);
//                                     arr.splice(findIndex, 1);
//                                     setSelectedYoungsters(arr);
//                                     forceUpdate();
//                                 }}
//                                 style={{ position: 'absolute', right: 0, width: 40, height: 30, }}>
//                                 <TrashIcon color="red" />
//                             </TouchableOpacity>
//                         </TouchableOpacity>
//                     )
//                 })
//             }
//         </View>
//     }
//     {/* <TouchableOpacity
//         onPress={() => {
//             // if (skill.length > 1) {
//             // textInputRef.clear();
//             // doMakeSkills()
//             // }

//         }}
//         style={{ position: 'absolute', padding: 10, marginTop: 0, right: 0 }}>
//         <Text style={{ fontSize: 34, color: '#241414', fontFamily: fonts.MRe, }}>+</Text>
//     </TouchableOpacity> */}
// </View>

// <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
//     <TouchableOpacity
//         onPress={() => setSelectedYoungsters([])}
//         style={{ marginTop: 20 }}>
//         <Text style={{ color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 10, textDecorationLine: 'underline', }}>reset</Text>
//     </TouchableOpacity>
//     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         {/* <TouchableOpacity style={{ height: 23, borderRadius: 10, paddingHorizontal: 10, justifyContent: 'center', borderWidth: 1, borderColor: '#5B4DBC', marginRight: 10 }}>
//             <Text style={{ color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 10, }}>share happening</Text>
//         </TouchableOpacity> */}

//         {/* <TouchableOpacity style={[styles.popupBtn, { margin: 0 }]}>
//             <Text style={[styles.popupBtnTitle,]}>Save</Text>
//         </TouchableOpacity> */}
//     </View>
// </View>
// </View >}