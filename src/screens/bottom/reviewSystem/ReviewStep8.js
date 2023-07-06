import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, BackHandler } from 'react-native'
import { navigate } from '../../../../Navigations'
import HappeningHeader from '../../../common/HappeningHeader'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import { NextIcon } from '../../../components/Svgs'
import Loader from '../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import { apiRequest } from '../../../utils/apiCalls'


var alertRef;
export default function ReviewStep8({ route }) {
    const payload = route.params;
    const [loading, setLoading] = useState(false);
    const [selectedReason, setSelectedReason] = useState('')
    const reasons = ['Parking', 'Wifi', 'Toilets', 'Food', 'Drinks']
    const [options, setOptions] = useState({
        Parking: 'NA',
        Wifi: 'NA',
        Toilets: 'NA',
        Food: 'NA',
        Drinks: 'NA',
    })

    const handleVal = (val, status) => {
        options[val] = status;
        console.log(options)
        setOptions({ ...options })
    }

    const submitReview = () => {
        setLoading(true);
        payload.Drinks = options.Drinks;
        payload.Food = options.Food;
        payload.Toilets = options.Toilets;
        payload.Wifi = options.Wifi;
        payload.Parking = options.Parking;
        payload.reviewedAt = new Date().toString()
        console.log("step 8", payload)

        apiRequest(payload, 'rating-and-review/fellow-review-a-host')
            .then(data => {
                if (data.status) {
                    setLoading(true);
                    navigate('ReviewStep9')
                }
                else {
                    alertRef.alertWithType("error", "Error", data.message);
                    setLoading(false);
                }
            })
            .catch(err => {
                setLoading(false)
                alertRef.alertWithType("error", "Error", "Network Error");
            })
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.theme2}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"Were these \namenities at the \nhappening?"}
                headerStyle={{ height: 250, justifyContent: 'flex-end', paddingBottom: 20, backgroundColor: acolors.theme2 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView >
                    <View style={{ width: '90%', alignSelf: 'center', }}>
                        {reasons.map((e, i) => {
                            return (
                                // <TouchableOpacity onPress={() => setSelectedReason(e)} key={i} style={e !== selectedReason ? styles.itemBox : [styles.itemBox, { backgroundColor: 'lightgray' }]} >
                                <View key={i} style={options[e] === 'NA' ? styles.itemBox : options[e] ? [styles.itemBox, { backgroundColor: 'lightgray' }] : [styles.itemBox, { backgroundColor: 'lightpink' }]} >
                                    <Text style={styles.textBold} >{e}</Text>
                                    <View style={styles.btnsBox} >
                                        <TouchableOpacity onPress={() => handleVal(e, true)} style={styles.yesBtn} >
                                            <Text style={styles.btnText} >Yes</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleVal(e, false)} style={styles.noBtn} >
                                            <Text style={styles.btnText} >No</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            )
                        })}
                    </View>
                    <View style={{ height: 320 }} ></View>
                </ScrollView>

            </View>

            <View style={styles.agreeBtn} >
                <TouchableOpacity
                    onPress={submitReview}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Next</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>

            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
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
        color: 'gray', fontFamily: fonts.PMe, fontSize: 10
    },
    textBold: {
        color: '#5D5760', fontFamily: fonts.MontBo, fontSize: 13,
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
    itemBox: {
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowRadius: 2, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        elevation: 2,
        marginBottom: 18,
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 73,
        backgroundColor: 'white',
    },
    btnsBox: {
        flexDirection: 'row',
    },
    noBtn: {
        width: 51,
        height: 31,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#BC4D67',
        borderWidth: 1,
        borderRadius: 16
    },
    yesBtn: {
        width: 51,
        height: 31,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#5B4DBC',
        borderWidth: 1,
        borderRadius: 16,
        marginEnd: 15
    },
    btnText: {
        fontSize: 13,
        color: '#5D5760',
        fontFamily: fonts.MontBo
    }

})

