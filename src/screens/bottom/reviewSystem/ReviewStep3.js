import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Keyboard, StatusBar, FlatList, ScrollView, BackHandler, TextInput } from 'react-native'
import { navigate } from '../../../../Navigations'
import HappeningHeader from '../../../common/HappeningHeader'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import { NextIcon } from '../../../components/Svgs'
import DropdownAlert from 'react-native-dropdownalert';


var alertRef;
export default function ReviewStep3({ route }) {
    const payload = route.params;
    let [reviewTxt, setReviewTxt] = useState("");

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

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.theme2}
                barStyle={"light-content"}
            />
            {!isKeyboardOpen && <HappeningHeader
                heading={"Write a public \nreview"}
                desc={"Ater the review period ends, we’ll publish this \nreview in sann-de-wit’s happening. "}
                headerStyle={{ height: 250, justifyContent: 'flex-end', paddingBottom: 50, backgroundColor: acolors.theme2 }}
                descStyle={{ fontSize: 12, paddingEnd: 40, lineHeight: 20, }}
            />}
            <View style={styles.contentContainer}>
                <ScrollView >
                    <Text style={styles.text} >Please describe what happened</Text>
                    <View style={{ width: '100%', alignSelf: 'center', }}>
                        <TextInput
                            placeholder=''
                            keyboardType="default"
                            returnKeyType="done"
                            value={reviewTxt}
                            // onKeyPress={() => Keyboard.dismiss()}
                            multiline={true}
                            onChangeText={(val) => setReviewTxt(val)}
                            placeholderTextColor={"#7b7b7b"}
                            textAlignVertical="top"
                            style={{
                                width: "100%", minHeight: 300, borderRadius: 10, paddingTop: 10, borderColor: '#2a2a2a', borderWidth: 1,
                                fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10,
                            }}
                        />
                    </View>
                </ScrollView>

            </View>

            {!isKeyboardOpen && <View style={styles.agreeBtn} >
                <TouchableOpacity
                    onPress={() => {
                        if (reviewTxt) {
                            payload.write_a_public_review = reviewTxt;
                            navigate('ReviewStep4', payload)
                        } else {
                            alertRef.alertWithType('error', "Error", 'Please describe what happened');
                        }
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Next</Text>
                    <NextIcon style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>}
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
        color: '#5D5760', fontFamily: fonts.PMe, fontSize: 12, marginTop: 40, marginBottom: 10
    },
    textBold: {
        color: '#5D5760', fontFamily: fonts.PMe, fontSize: 18, fontWeight: 'bold'
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
        shadowColor: 'rgba(0, 0, 0, 0.09)',
        shadowRadius: 2, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        elevation: 2,
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,

    }


})

