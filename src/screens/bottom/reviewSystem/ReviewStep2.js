import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, BackHandler } from 'react-native'
import { navigate } from '../../../../Navigations'
import HappeningHeader from '../../../common/HappeningHeader'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import { NextIcon } from '../../../components/Svgs'
import { AirbnbRating } from 'react-native-ratings'



export default function ReviewStep2({ route }) {
    let [ratingCommunication, setRatingCommunication] = useState(3)
    let [ratingFriendliness, setRatingFriendliness] = useState(3)
    let [ratingPunctuality, setRatingPunctuality] = useState(3)
    let [ratingInteraction, setRatingInteraction] = useState(3)
    const ratingOptions = ['Disappointed', 'Not Bad', 'Good', 'Lovely', 'Super Lovely'];

    const payload = route.params;
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.theme2}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"Share how things \nwent with the host(s)"}
                headerStyle={{ height: 250, justifyContent: 'flex-end', paddingBottom: 30, backgroundColor: acolors.theme2 }}
                desc={"Tell your host and the future fellows, what you \nliked during the happening"}
                descStyle={{ fontSize: 12, paddingEnd: 40, lineHeight: 25, marginBottom: 20 }}

            />
            <View style={styles.contentContainer}>
                <ScrollView>
                    <View style={{ width: '90%', alignSelf: 'center', }}>

                        <View style={{ marginTop: 5 }} >
                            <Text style={{ fontSize: 21, lineHeight: 49, fontFamily: fonts.PSBo, color: '#5D5760' }} >Communication</Text>
                            <AirbnbRating
                                selectedColor='#5B4DBC'
                                unSelectedColor='#CECAEB'
                                size={40}
                                starContainerStyle={{ flexDirection: 'row', width: 320, justifyContent: 'space-evenly' }}
                                reviews={ratingOptions}
                                onFinishRating={(index) => setRatingCommunication(index)}
                                showRating={false}
                            />
                            <View style={{ width: 280, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, alignSelf: 'center' }}>
                                {ratingOptions.map((e, i) => {
                                    return (
                                        <Text key={i} style={{ fontSize: 6, fontFamily: fonts.PRe, width: 45, color: '#5D5760', textAlign: 'center' }}  >{e}</Text>
                                    )
                                })}
                            </View>
                        </View>
                        <View style={{ marginTop: 5 }} >
                            <Text style={{ fontSize: 21, lineHeight: 49, fontFamily: fonts.PSBo, color: '#5D5760' }} >Friendliness</Text>
                            <AirbnbRating
                                selectedColor='#5B4DBC'
                                unSelectedColor='#CECAEB'
                                size={40}
                                starContainerStyle={{ flexDirection: 'row', width: 320, justifyContent: 'space-evenly' }}
                                reviews={ratingOptions}
                                onFinishRating={(index) => setRatingFriendliness(index)}
                                showRating={false}
                            />
                            <View style={{ width: 280, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, alignSelf: 'center' }}>
                                {ratingOptions.map((e, i) => {
                                    return (
                                        <Text key={i} style={{ fontSize: 6, fontFamily: fonts.PRe, width: 45, color: '#5D5760', textAlign: 'center' }}  >{e}</Text>
                                    )
                                })}
                            </View>
                        </View>
                        <View style={{ marginTop: 5 }} >
                            <Text style={{ fontSize: 21, lineHeight: 49, fontFamily: fonts.PSBo, color: '#5D5760' }} >Punctuality</Text>
                            <AirbnbRating
                                selectedColor='#5B4DBC'
                                unSelectedColor='#CECAEB'
                                size={40}
                                starContainerStyle={{ flexDirection: 'row', width: 320, justifyContent: 'space-evenly' }}
                                reviews={ratingOptions}
                                onFinishRating={(index) => setRatingPunctuality(index)}
                                showRating={false}
                            />
                            <View style={{ width: 280, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, alignSelf: 'center' }}>
                                {ratingOptions.map((e, i) => {
                                    return (
                                        <Text key={i} style={{ fontSize: 6, fontFamily: fonts.PRe, width: 45, color: '#5D5760', textAlign: 'center' }}  >{e}</Text>
                                    )
                                })}
                            </View>
                        </View>
                        <View style={{ marginTop: 5 }} >
                            <Text style={{ fontSize: 21, lineHeight: 49, fontFamily: fonts.PSBo, color: '#5D5760' }} >Interaction</Text>
                            <AirbnbRating
                                selectedColor='#5B4DBC'
                                unSelectedColor='#CECAEB'
                                size={40}
                                starContainerStyle={{ flexDirection: 'row', width: 320, justifyContent: 'space-evenly' }}
                                reviews={ratingOptions}
                                onFinishRating={(index) => setRatingInteraction(index)}
                                showRating={false}
                            />
                            <View style={{ width: 280, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, alignSelf: 'center' }}>
                                {ratingOptions.map((e, i) => {
                                    return (
                                        <Text key={i} style={{ fontSize: 6, fontFamily: fonts.PRe, width: 45, color: '#5D5760', textAlign: 'center' }}  >{e}</Text>
                                    )
                                })}
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 350 }} ></View>
                </ScrollView>

            </View>

            <View style={styles.agreeBtn} >
                <TouchableOpacity
                    onPress={() => {
                        payload.rating_communication_count = ratingCommunication;
                        payload.rating_friendliness_count = ratingFriendliness;
                        payload.rating_intaction_count = ratingInteraction;
                        payload.rating_punctuality_count = ratingPunctuality;
                        navigate("ReviewStep3", payload)
                        console.log('Step 2', payload)
                    }}
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

