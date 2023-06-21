
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
import TipsButton from '../../../../components/TipsButton'
import GeneralStatusBar from '../../../../components/GernalStatusBar'
import { apiRequest } from '../../../../utils/apiCalls'


var alertRef;

const EditDescription = (props) => {

    const { state, setHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState(props.route.params.DiscribeOfYourHappening);
    console.log('props.route.params', props.route.params)
    const [titleWords, setTitleWords] = useState(0);



    function next() {
        const body = {
            DiscribeOfYourHappening: description
        }
        const route = 'happening/update-happening/' + props.route.params._id;
        setLoading(true)
        apiRequest(body, route)
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


    function getTitleWordsCount(text) {
        if (text == "") {
            setTitleWords(0)
            return;
        }
        let count = text.trim().split(/\s+/).length
        setTitleWords(count)
    }


    React.useEffect(() => {
        getTitleWordsCount(props.route.params.DiscribeOfYourHappening)
    }, [])




    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <GeneralStatusBar />
            <HappeningHeader
                heading={"Edit Description"}
                desc={""}
            // headerStyle={{ paddingBottom: 30 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView>
                    <View>
                        <TextInput
                            onChangeText={(v) => {
                                setDescription(v)
                                getTitleWordsCount(v)
                            }}
                            placeholder='Describe your happening in about min 100-300 words'
                            value={description}
                            // maxLength={300}
                            textAlignVertical='top'
                            multiline={true}
                            placeholderTextColor={"#2A2A2A"}
                            style={{
                                width: "100%", height: 160, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1, marginTop: 50,
                                fontSize: 12, color: "#2A2A2A", fontFamily: fonts.MRe, paddingHorizontal: 15,
                            }}
                        />
                        <Text style={{ color: '#2A2A2A', fontSize: 14, fontFamily: fonts.PRe, position: 'absolute', bottom: 5, left: 10, backgroundColor: 'white' }}>{titleWords}/300</Text>

                    </View>
                </ScrollView>

            </View>
            <TouchableOpacity
                onPress={() => next()}
                style={{ width: "50%", height: 47, borderRadius: 20, backgroundColor: '#5B4DBC', alignItems: 'center', justifyContent: 'center', marginTop: 60, alignSelf: 'center' }}>
                <Text style={{ color: 'white', fontFamily: fonts.PMe, }}>Update</Text>
            </TouchableOpacity>
            <HappeningStep
                nextText={"Next"}
                next={false}

                onPress={() => next()}
                showStep={false}
            />
            <DropdownAlert ref={(ref) => alertRef = ref} />
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


})

export default EditDescription

