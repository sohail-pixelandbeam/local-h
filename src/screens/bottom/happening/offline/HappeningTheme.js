// CC STANDS FOR CODE OF CONDUCT

import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput, BackHandler } from 'react-native'
import { goBack, navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import HappeningStep from '../../../../common/HappeningStep'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, TickIcon, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'
import { Context } from '../../../../Context/DataContext'
import { getHOLPreviousScreen, useForceUpdate } from '../../../../utils/functions'
import { happeningStyles } from '../styles'


const HappeningTheme = (props) => {

    const forceUpdate = useForceUpdate();
    const [theme, setTheme] = useState('Art & cultural projects');
    const { state, setLocationHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [themes, setThemes] = useState(state.happeningSubmissionData?.happeningTheme);
    const [tempThmes, setTempThemes] = useState(state.happeningSubmissionData?.happeningTheme);

    function next() {
        const obj = {
            ...state.locationHappeningDraft,
            themeOfYourHappening: [theme]
        }
        console.log('obj,', obj)
        setLocationHappeningData(obj);
        navigate('Title1')

    }

    // React.useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', function () {
    //         return true;
    //     })
    // }, []);






    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"What’s the theme of your happening ?"}
                desc={"Specify the catergory of the happening."}
            // headerStyle={{ paddingBottom: 30 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView>

                    <TextInput
                        placeholder='Search for a theme'
                        placeholderTextColor={"#7b7b7b"}
                        style={{
                            width: "100%", height: 62, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                            fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10,
                        }}
                        onChangeText={(v) => {
                            let temp = tempThmes;
                            let filter = temp?.filter((item) => {
                                return (
                                    item.happeningThemeName?.toLocaleLowerCase().indexOf(v.toLocaleLowerCase()) == 0
                                )
                            })
                            setThemes(filter)
                        }}
                    />
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
                        <View style={{
                            elevation: 2, backgroundColor: 'white', borderTopRightRadius: 10, borderTopLeftRadius: 10, padding: 15,
                            shadowColor: 'rgba(0, 0, 0, 0.09)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
                            marginBottom: 10, paddingBottom: 25
                        }}>

                            {
                                themes?.map((v, i) => {
                                    return (
                                        <TouchableOpacity
                                            key={i}
                                            onPress={() => setTheme(v?.happeningThemeName)}
                                            style={styles.themePickerContainer}>
                                            <View>
                                                <Text style={happeningStyles.happeningTitle2}>{v?.happeningThemeName}</Text>
                                                {/* <Text style={styles.subData}>sub data</Text> */}
                                            </View>

                                            <View style={styles.languagePickerCircle}>
                                                {theme == v?.happeningThemeName && <TickIcon width={17} height={12} />}
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }

                            {/* <TouchableOpacity
                                onPress={() => setTheme('Agricultural help')}
                                style={styles.themePickerContainer}>
                                <View>
                                    <Text style={styles.themeText}>Agricultural help</Text>
                                    <Text style={styles.subData}>sub data</Text>
                                </View>
                                <View style={styles.languagePickerCircle}>
                                    {theme == 'Agricultural help' && <TickIcon width={17} height={12} />}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setTheme('Animal welfare')}
                                style={styles.themePickerContainer}>
                                <View>
                                    <Text style={styles.themeText}>Animal welfare</Text>
                                    <Text style={styles.subData}>sub data</Text>
                                </View>
                                <View style={styles.languagePickerCircle}>
                                    {theme == 'Animal welfare' && <TickIcon width={17} height={12} />}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setTheme('Clean ups')}
                                style={styles.themePickerContainer}>
                                <View>
                                    <Text style={styles.themeText}>Clean ups</Text>
                                    <Text style={styles.subData}>sub data</Text>
                                </View>
                                <View style={styles.languagePickerCircle}>
                                    {theme == 'Clean ups' && <TickIcon width={17} height={12} />}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setTheme('Collecting materials')}
                                style={styles.themePickerContainer}>
                                <View>
                                    <Text style={styles.themeText}>Collecting materials</Text>
                                    <Text style={styles.subData}>sub data</Text>
                                </View>
                                <View style={styles.languagePickerCircle}>
                                    {theme == 'Collecting materials' && <TickIcon width={17} height={12} />}
                                </View>
                            </TouchableOpacity> */}


                        </View>
                    </View>
                </ScrollView>

            </View>
            <HappeningStep
                nextText={"Next"}
                onPress={() => next()}
                step={props?.route?.params?.step}
            />
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
        shadowColor: 'rgba(0, 0, 0, 0.3)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', elevation: 5
    },
    subData: {
        fontFamily: fonts.MRe, color: '#828282', fontSize: 8
    }


})

export default HappeningTheme

