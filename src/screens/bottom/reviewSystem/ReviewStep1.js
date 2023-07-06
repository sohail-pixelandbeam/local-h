import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, BackHandler } from 'react-native'
import { navigate } from '../../../../Navigations'
import HappeningHeader from '../../../common/HappeningHeader'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import { NextIcon } from '../../../components/Svgs'
import { AirbnbRating } from 'react-native-ratings'





export default function ReviewStep1({ route }) {

    let [selectedRating, setSelectedRating] = useState(3);

    const ratingOptions = ['Disappointed', 'Not Bad', 'Good', 'Lovely', 'Super Lovely'];
    const msgs = ["We're sorry, you are dissapointed!", "We're glad you are not dissapointed!", "We're glad you had a good experience!", "We're glad you had a good experience!", "We're glad you had a good experience!",];


    const payload = {
        "Add_your_Memories_to_the_Review": [],
        "extrimely_accurate": null,
        "mostly_accurate": [],
        "not_at_all_accurate": null,
        "im_not_sure": null,
        "isDeleted": false
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.theme2}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"How was your \nExperience with \nthe Happening? "}
                headerStyle={{ height: 250, justifyContent: 'flex-end', paddingBottom: 30, backgroundColor: acolors.theme2 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView>
                    <View style={{ width: '90%', alignSelf: 'center' }}>

                        <View style={{ marginTop: 100 }} >
                            <AirbnbRating
                                selectedColor='#5B4DBC'
                                unSelectedColor='#CECAEB'
                                size={40}
                                starContainerStyle={{ flexDirection: 'row', width: 320, justifyContent: 'space-evenly' }}
                                reviews={ratingOptions}
                                onFinishRating={(index) => setSelectedRating(index)}
                                showRating={false}
                            />
                            <View style={{ width: 280, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignSelf: 'center' }}>
                                {ratingOptions.map((e, i) => {
                                    return (
                                        <Text key={i} style={{ fontSize: 6, fontFamily: fonts.PRe, width: 45, color: '#5D5760', textAlign: 'center' }}  >{e}</Text>
                                    )
                                })}
                            </View>
                            <Text style={{ color: '#5D5760', fontSize: 39, fontFamily: fonts.PMe, lineHeight: 91, alignSelf: 'center' }} >{ratingOptions[selectedRating - 1]}</Text>
                            <Text style={{ color: '#5D5760', fontSize: 11, fontFamily: fonts.PMe, alignSelf: 'center', lineHeight: 26 }} >{msgs[selectedRating - 1]}</Text>
                        </View>
                    </View>
                </ScrollView>


            </View>

            <TouchableOpacity onPress={() => navigate('ReviewReportStep1')} style={{ position: 'absolute', bottom: 90, right: 40 }}>
                <Text style={styles.textBold}>Report Inappropriate behavior</Text>
            </TouchableOpacity>

            <View style={styles.agreeBtn} >
                <TouchableOpacity
                    onPress={() => {
                        payload.happeningId = route.params.happeningId;
                        payload.location = { "latitude": route.params.location.coordinates[0], "latitudeDelta": 0.01, "locationTitle": "", "longitude": route.params.location.coordinates[1], "longitudeDelta": 0.01 };
                        payload.rating_experience_count_no = selectedRating;
                        navigate('ReviewStep2', payload)
                        console.log('Step 1', payload)

                    }
                    }
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
        marginTop: -30, paddingTop: 20, paddingHorizontal: 25,
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
    textBold: {
        color: '#5D5760', fontFamily: fonts.PMe, fontSize: 12, borderBottomColor: 'black', borderBottomWidth: 1, fontWeight: 'bold'
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

