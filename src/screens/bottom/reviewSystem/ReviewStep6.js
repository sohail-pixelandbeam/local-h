import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, TextInput, Keyboard } from 'react-native'
import { navigate } from '../../../../Navigations'
import HappeningHeader from '../../../common/HappeningHeader'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import { NextIcon } from '../../../components/Svgs'




export default function ReviewStep6({ route }) {
    let payload = route.params;

    let [selectedOpt, setSelectedOpt] = useState('Extremely accurate');
    let [selectedReasons, setSelectedReasons] = useState([]);
    let [inputVal, setInputVal] = useState('');
    const options = ['Not Accessible', 'Different place', 'Not as expected', 'Inaccurate location', 'other (Specify)']

    let [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            keyboardDidShow
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            keyboardDidHide
        );

        // Clean up the listeners when the component unmounts
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const keyboardDidShow = () => {
        setIsKeyboardOpen(true);
    };

    const keyboardDidHide = () => {
        setIsKeyboardOpen(false);
    };

    const selectBtn = (val) => {
        if (selectedReasons.includes(val)) {
            let remaining = selectedReasons.filter((e) => e !== val)
            setSelectedReasons(remaining);
        } else {
            selectedReasons.push(val);
            setSelectedReasons([...selectedReasons])
        }
    }

    // "mostly_accurate": [],
    // "not_at_all_accurate": null,
    // "im_not_sure": null,
    const moveNext = () => {
        if (selectedOpt === "Extremely accurate") {
            payload.extrimely_accurate = true
        } else if (selectedOpt === "Mostly accurate") {
            inputVal && selectedReasons.push(inputVal)
            selectedReasons = selectedReasons.filter((e) => e !== 'other (Specify)')
            payload.mostly_accurate = selectedReasons;
        } else if (selectedOpt === "Not at all accurate") {
            payload.not_at_all_accurate = true;
        } else {
            payload.im_not_sure = true;
        }
        navigate('ReviewStep7', payload)
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.theme2}
                barStyle={"light-content"}
            />
            <HappeningHeader
                heading={"Your Well-being \ncomes first"}
                headerStyle={{ height: 250, justifyContent: 'flex-end', paddingBottom: 30, backgroundColor: acolors.theme2 }}
            />
            <View style={styles.contentContainer}>
                <ScrollView>
                    <View style={{ width: '90%', alignSelf: 'center', }}>

                        <TouchableOpacity onPress={() => setSelectedOpt('Extremely accurate')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.unselected}>
                                <View style={selectedOpt === 'Extremely accurate' && styles.selected} ></View>
                            </View>
                            <Text style={styles.text} >Extremely accurate</Text>
                        </TouchableOpacity>
                        <View style={styles.line} />

                        <TouchableOpacity onPress={() => setSelectedOpt('Mostly accurate')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.unselected}>
                                <View style={selectedOpt === 'Mostly accurate' && styles.selected} ></View>
                            </View>
                            <Text style={styles.text} >Mostly accurate</Text>
                        </TouchableOpacity>
                        <View style={styles.btnsBox}>
                            {
                                options.map((val, index) => {
                                    return (
                                        <TouchableOpacity disabled={selectedOpt !== 'Mostly accurate'} onPress={() => selectBtn(val)} key={index} style={selectedReasons.includes(val) ? styles.btnActive : styles.btnInactive} >
                                            <Text style={styles.btnText} >{val}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <TextInput value={inputVal} onChangeText={(val) => setInputVal(val)} editable={selectedReasons.includes('other (Specify)')} style={styles.inputStyle} />

                        <TouchableOpacity onPress={() => setSelectedOpt('Not at all accurate')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.unselected}>
                                <View style={selectedOpt === 'Not at all accurate' && styles.selected} ></View>
                            </View>
                            <Text style={styles.text} >Not at all accurate</Text>
                        </TouchableOpacity>
                        <View style={styles.line} />

                        <TouchableOpacity onPress={() => setSelectedOpt("I'm not sure")} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.unselected}>
                                <View style={selectedOpt === "I'm not sure" && styles.selected} ></View>
                            </View>
                            <Text style={styles.text}>I'm not sure</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ height: 320 }} />
                </ScrollView>

            </View>

            {!isKeyboardOpen && <View style={styles.agreeBtn} >
                <TouchableOpacity
                    onPress={moveNext}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Next</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>}

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
        color: '#5D5760', fontFamily: fonts.PBo, fontSize: 13, lineHeight: 32, marginVertical: 10,
    },
    unselected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginEnd: 10,
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.16,
        shadowRadius: 1.51,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selected: {
        width: 6,
        height: 6,
        borderRadius: 6,
        backgroundColor: '#5D5760',
        // shadowColor: '#000000',
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.16,
        // shadowRadius: 1.51,
        // elevation: 2,
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
    line: {
        // borderWidth: 1,
        // borderColor: '#707070',
        height: 1,
        backgroundColor: '#707070'
    },
    btnsBox: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    btnActive: {
        backgroundColor: '#5B4DBC',
        borderRadius: 18,
        height: 28,
        paddingHorizontal: 10,
        justifyContent: 'center',
        marginEnd: 15,
        marginVertical: 5
    },
    btnInactive: {
        backgroundColor: '#B9B1F0',
        borderRadius: 18,
        height: 28,
        paddingHorizontal: 10,
        justifyContent: 'center',
        marginEnd: 15,
        marginVertical: 5
    },
    btnText: {
        fontSize: 7,
        fontFamily: fonts.MontBo,
        color: 'white'
    },
    inputStyle: {
        borderColor: '#2a2a2a',
        borderWidth: 1,
        borderRadius: 10,
        height: 39,
        marginVertical: 12,
        paddingHorizontal: 15,
        color: '#5D5760'
    }
})

