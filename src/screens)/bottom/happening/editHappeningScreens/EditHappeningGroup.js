// CC STANDS FOR CODE OF CONDUCT

import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput, BackHandler } from 'react-native'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'

import { Context } from '../../../../Context/DataContext'
import { storeItem, useForceUpdate } from '../../../../utils/functions'
import Loader from '../../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import HappeningStep from '../../../../common/HappeningStep'
import { apiRequest } from '../../../../utils/apiCalls'
import GeneralStatusBar from '../../../../components/GernalStatusBar'
import AlertPopup from '../../../../common/AlertPopup'


var alertRef;
var textInputRef;
const EditHappeningGroup = (props) => {


    const forceUpdate = useForceUpdate();
    const { state, setLocationHappeningData, setHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);

    // console.log('props.route.params?.minAgeToParticipate',props.route.params?.minAgeToParticipate)

    const [minAgeToParticipate, setMinAgeToParticipate] = useState(props.route.params?.minAgeToParticipate?.toString());
    const [minPeopleRequiredForTheHappenig, setMinPeopleRequiredForTheHappenig] = useState(props.route.params?.minPeopleRequiredForTheHappenig?.toString());
    const [maxPeopleAllowedAtAGivenTime, setMaxPeopleAllowedAtAGivenTime] = useState(props.route.params?.maxPeopleAllowedAtAGivenTime?.toString());
    const [maxPeopleThatAFellowCanBring, setMaxPeopleThatAFellowCanBring] = useState(props.route.params?.maxPeopleThatAFellowCanBring?.toString());
    const [fellowMustComeAlone, setFellowMustComeAlone] = useState(props.route.params?.fellowMustComeAlonefalse ?? false?.toString());


    function next() {

        if (minAgeToParticipate == "") {
            alertRef.alertWithType('error', "Error", "Please enter minimum age to participate");
            return;
        }
        if (minPeopleRequiredForTheHappenig == "") {
            alertRef.alertWithType('error', "Error", "Please enter minimum people for the happening");
            return;
        }
        if (maxPeopleAllowedAtAGivenTime == "") {
            alertRef.alertWithType('error', "Error", "Please enter maximum people allowed at a given time");
            return;
        }

        if (parseInt(minPeopleRequiredForTheHappenig) > parseInt(maxPeopleAllowedAtAGivenTime)) {
            alertRef.alertWithType('error', "Error", "Min fellows required should not be greater than max fellows required");
            return;
        }

        const obj = {
            minAgeToParticipate: minAgeToParticipate,
            minPeopleRequiredForTheHappenig: minPeopleRequiredForTheHappenig,
            maxPeopleAllowedAtAGivenTime: maxPeopleAllowedAtAGivenTime,
            maxPeopleThatAFellowCanBring: maxPeopleThatAFellowCanBring,
            fellowMustComeAlone: fellowMustComeAlone,
        }

        const route = 'happening/update-happening/' + props.route.params._id;
        setLoading(true)
        apiRequest(obj, route)
            .then(data => {
                setLoading(false);
                if (data.status) {
                    alertRef.alertWithType('success', 'Updated');
                    setTimeout(() => {
                        props.navigation.popToTop();
                    }, 700);

                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })

    }




    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <GeneralStatusBar />
            <HappeningHeader
                heading={"Edit amount of people that can work at the same time"}
                desc={""}
            // headerStyle={{ paddingBottom: 30 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView contentContainerStyle={{ paddingBottom: 350 }}>
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.title}>Min age to participate</Text>
                            <TextInput
                                onChangeText={setMinAgeToParticipate}
                                value={minAgeToParticipate}
                                keyboardType='number-pad'
                                placeholderTextColor={"#7b7b7b"}
                                style={styles.textInput}
                                textAlign='center'
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.title}>Min people required{"\n"}at a given time</Text>
                            <TextInput
                                onChangeText={setMinPeopleRequiredForTheHappenig}
                                value={minPeopleRequiredForTheHappenig}
                                keyboardType='number-pad'
                                placeholderTextColor={"#7b7b7b"}
                                style={styles.textInput}
                                textAlign='center'
                            />
                        </View>
                        <Text style={styles.msgText}>*The Happening will be cancelled if the min people{"\n"}haven’t joined</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.title}>Max people allowed{"\n"}at a given time</Text>
                            <TextInput
                                onChangeText={setMaxPeopleAllowedAtAGivenTime}
                                value={maxPeopleAllowedAtAGivenTime}
                                keyboardType='number-pad'
                                placeholderTextColor={"#7b7b7b"}
                                style={styles.textInput}
                                textAlign='center'
                            />
                        </View>
                        <Text style={styles.msgText}>* Individuals less than the age of 18 do not count in{"\n"}Maxmimum number</Text>
                        <TouchableOpacity
                            onPress={() => next()}
                            style={{ width: "50%", height: 47, borderRadius: 20, backgroundColor: '#5B4DBC', alignItems: 'center', justifyContent: 'center', marginTop: 60, alignSelf: 'center' }}>
                            <Text style={{ color: 'white', fontFamily: fonts.PMe, }}>Update</Text>
                        </TouchableOpacity>

                        {/* <View style={styles.inputContainer}>
                            <Text style={styles.title}>Max people that a{"\n"}fellow can bring.</Text>
                            <TextInput
                                ref={(ref) => textInputRef = ref}
                                onChangeText={setMaxPeopleThatAFellowCanBring}
                                placeholder=''
                                placeholderTextColor={"#7b7b7b"}
                                style={styles.textInput}
                                textAlign='center'
                            />
                        </View> */}

                        {/* <TouchableOpacity
                            onPress={() => {
                                setFellowMustComeAlone(!fellowMustComeAlone);
                                textInputRef.clear();
                                forceUpdate();
                            }}
                            style={{ flexDirection: 'row', marginTop: 20, paddingBottom: 3, alignItems: 'center', }}>
                            <View style={{ width: 32, height: 32, borderRadius: 32 / 2, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', elevation: 2, shadowColor: 'rgba(0,0,0,0.3)', shadowOpacity: 0.5, shadowRadius: 1, shadowOffset: { width: 1, height: 2 } }}>
                                {fellowMustComeAlone && <TickIcon />}
                            </View>
                            <Text style={{ marginLeft: 10, fontFamily: fonts.MBo, fontSize: 14, color: '#7B7B7B' }}>Fellow must come alone</Text>
                        </TouchableOpacity> */}

                    </View>

                </ScrollView>


            </View>

            <HappeningStep
                nextText={"Next"}
                next={false}
                showStep={false}
                onPress={() => next()}
            />

            <AlertPopup ref={(ref) => alertRef = ref} />
            {loading && <Loader />}

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
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
    },
    title: {
        fontFamily: fonts.MBo, fontSize: 14, color: '#2A2A2A', lineHeight: 15,
    },
    textInput: {
        width: 70, height: 40, paddingHorizontal: 5, fontSize: 14, borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 10,
        color: "#7b7b7b", fontFamily: fonts.MRe,
    },
    msgText: {
        color: '#35208E', fontSize: 8, fontFamily: fonts.MBo, marginTop: 3
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
    inputContainer: {
        flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: 'space-between', marginTop: 15
    }




})

export default EditHappeningGroup
