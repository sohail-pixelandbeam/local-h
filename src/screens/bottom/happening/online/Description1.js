
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
import AlertPopup from '../../../../common/AlertPopup'


var alertRef;

const Description1 = (props) => {

    const { state, setHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState(state?.happeningDraft?.DiscribeOfYourHappening ?? '');
    const [titleWords, setTitleWords] = useState(0);



    function next() {

        if (titleWords < 100 || titleWords > 300) {
            alertRef.alertWithType('error', "Error", "Please enter a description between 100-300 words");
            return;
        }
        const obj = {
            ...state.happeningDraft,
            DiscribeOfYourHappening: description
        }
        setHappeningData(obj);
        navigate('Images1')
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
        getTitleWordsCount(state?.happeningDraft?.DiscribeOfYourHappening ?? '')
    }, [])




    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"Describe your happening"}
                desc={"Tell the fellows what they are going to do. Also, don’t forget to tell them about the impact of your happening and their efforts to the environment!"}
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
                    <TipsButton
                        onPress={() => navigate('Description2')}
                    />
                </ScrollView>

            </View>
            <HappeningStep
                nextText={"Next"}
                onPress={() => next()}
                step={props?.route?.params?.step}
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

export default Description1

