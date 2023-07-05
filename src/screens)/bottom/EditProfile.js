import React, { useEffect, useState } from 'react'

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { } from 'react-native-gesture-handler';
import { navigate } from '../../../Navigations';
import { RattingStartIcon } from '../../components/Svgs';
import { fonts } from '../../constants/fonts';
import { uploadSingleFile, useForceUpdate } from '../../utils/functions';
import GeneralStatusBar from '../../components/GernalStatusBar';



var textInputRef;
var alertRef;
const EditProfile = (props) => {

    const forceUpdate = useForceUpdate();
    const [tabs, setTabs] = useState('host');
    const item = props.data;
    const photos = Array.isArray(item?.userHappeningPhotos) ? item?.userHappeningPhotos[0]?.addPhotosOfYourHappening ?? [] : [];
    const [bioCount, setBioCount] = useState(0);
    const [bio, setBio] = useState(item?.userProfile?.bio);

    const [skillsArr, setSkillsArr] = useState(item?.userProfile?.addSkills ?? []);
    const [skill, setSkill] = useState(''); // FOR INPUT
    const [profession, setProfession] = useState(item?.userProfile?.profession ?? '');

    const [languageKnown, setLanguageKnown] = useState(''); // FOR INPUT
    const [languageKnownArr, setLanguageKnownArr] = useState(item?.userProfile?.LanguagesKnown ?? []); // TO SEND IT TO SERVER





    function getBioWordCount(text) {
        if (text == "") {
            setBioCount(0)
            return;
        }
        let count = text.trim().split(/\s+/).length
        console.log(count);
        setBioCount(count)
    }



    function doSpliceSkills(v) {
        let arr = skillsArr;
        let foundIndex = arr.indexOf(v);
        if (foundIndex !== -1) arr.splice(foundIndex, 1);
        setSkillsArr(arr);
        forceUpdate();
    }


    function doMakeKnownLanguages() {
        let arr = languageKnownArr;
        arr.push(languageKnown);
        setLanguageKnownArr(arr);
        setLanguageKnown('');
        forceUpdate();
    }


    function doSpliceLanguageKnown(v) {
        let arr = languageKnownArr;
        let foundIndex = arr.indexOf(v);
        if (foundIndex !== -1) arr.splice(foundIndex, 1);
        setLanguageKnownArr(arr);
        forceUpdate();
    }


    function doMakeSkills() {
        let arr = skillsArr;
        arr.push(skill);
        setSkillsArr(arr);
        setSkill('');
        forceUpdate();
    }



    function validateFields() {

        if (bioCount < 75 || bioCount > 150) {
            props.alert('error', "Error", 'Bio must be min 75 to 150 words');
            // alertRef.alertWithType()
            return
        }
        if (skillsArr.length == 0) {
            alertRef.alertWithType('error', "Error", "Please enter atleast one skill");
            return;
        }
        if (profession.length < 3) {
            alertRef.alertWithType('error', "Error", "Please enter a valid profession")
            return;
        }
        if (languageKnownArr.length == 0) {
            alertRef.alertWithType('error', "Error", "Please enter atleast one language")
            return;
        }

        props?.onPressEdit({
            bio: bio,
            skills: skillsArr,
            profession,
            languageKnown: languageKnownArr
        })
    }








    useEffect(() => {
        getBioWordCount(item?.userProfile?.bio)
    }, [])


    return (
        <View style={{ flex: 1, }}>

            <View style={[styles.shadow, { backgroundColor: 'white', width: "100%", borderRadius: 12, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 20, marginTop: 10, }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
                    <Text style={[styles.aboutHeading, { marginTop: 0 }]}>Bio</Text>
                </View>

                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <TextInput
                        placeholder=''
                        keyboardType="default"
                        returnKeyType="done"
                        value={bio}
                        // onKeyPress={() => Keyboard.dismiss()}
                        multiline={true}
                        onChangeText={(v) => {
                            setBio(v)
                            getBioWordCount(v)
                        }}
                        placeholderTextColor={"#7b7b7b"}
                        textAlignVertical="top"
                        style={{
                            width: "100%", height: 140, borderRadius: 10, paddingTop: 10, borderColor: '#2a2a2a', borderWidth: 1,
                            fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10,
                        }}
                    />
                    <Text style={{ backgroundColor: 'white', position: 'absolute', bottom: 5, right: 20, fontSize: 12, color: "#2A2A2A", fontFamily: fonts.MRe, }}>{bioCount ?? 0}/150</Text>
                </View>
                <Text style={styles.aboutHeading}>Skills</Text>

                <View>
                    <TextInput
                        placeholder=''
                        ref={(ref) => textInputRef = ref}
                        placeholderTextColor={"#7b7b7b"}
                        onChangeText={(v) => setSkill(v)}
                        style={{
                            width: "100%", height: 47, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                            fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10, marginTop: 10
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            if (skill.length > 1) {
                                textInputRef.clear();
                                doMakeSkills()
                            }

                        }}
                        style={{ position: 'absolute', padding: 10, marginTop: 0, right: 0 }}>
                        <Text style={{ fontSize: 34, color: '#241414', fontFamily: fonts.MRe, }}>+</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', width: "100%", marginTop: 10, flexWrap: 'wrap' }}>
                        {
                            skillsArr.map((v) => {
                                return (
                                    <View style={{
                                        paddingHorizontal: 8, height: 28, borderRadius: 18, backgroundColor: '#b9b1f0', flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10
                                    }}>
                                        <Text style={{ color: '#ffffff', fontFamily: fonts.MRe, fontSize: 8, }}>{v}</Text>
                                        <TouchableOpacity
                                            onPress={() => doSpliceSkills(v)}
                                        >
                                            <Text style={{ color: '#ffffff', fontFamily: fonts.MMe, fontSize: 9, marginLeft: 10 }}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                <Text style={styles.aboutHeading}>Works as</Text>
                <TextInput
                    placeholder=''
                    value={profession}
                    onChangeText={setProfession}
                    placeholderTextColor={"#7b7b7b"}
                    style={{
                        width: "100%", height: 38, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                        fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10, marginTop: 5
                    }}
                />

                {/* <Text style={styles.aboutDesc}>{item?.userProfile?.profession}</Text> */}
                <Text style={styles.aboutHeading}>Languages Known</Text>

                <View>
                    <TextInput
                        ref={input => { textInputRef = input }}
                        onChangeText={setLanguageKnown}
                        placeholderTextColor={"#7b7b7b"}
                        onSubmitEditing={() => {
                            if (languageKnown.length > 1) {
                                forceUpdate();
                                doMakeKnownLanguages();
                                textInputRef.clear();
                            }
                        }}
                        onBlur={() => {
                            if (languageKnown.length > 3) {
                                setLanguageKnown('');
                                forceUpdate();
                                doMakeKnownLanguages();
                                textInputRef.clear();
                            }
                        }}
                        style={{
                            width: "100%", height: 47, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                            fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10, marginTop: 10
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            if (languageKnown.length > 3) {
                                setLanguageKnown('');
                                forceUpdate();
                                doMakeKnownLanguages();
                                textInputRef.clear();
                            }
                        }}
                        style={{ position: 'absolute', padding: 10, marginTop: 0, right: 0 }}>
                        <Text style={{ fontSize: 34, color: '#241414', fontFamily: fonts.MRe, }}>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', width: "100%", marginTop: 10, }}>
                    {
                        languageKnownArr?.map((v, i) => {
                            return (
                                <View style={{
                                    paddingHorizontal: 8, height: 28, borderRadius: 18, backgroundColor: '#b9b1f0', flexDirection: 'row', alignItems: 'center',
                                }}>
                                    <Text style={{ color: '#ffffff', fontFamily: fonts.MRe, fontSize: 8, }}>{v}</Text>
                                    <TouchableOpacity
                                        onPress={() => doSpliceLanguageKnown(v)}
                                    >
                                        <Text style={{ color: '#ffffff', fontFamily: fonts.MMe, fontSize: 9, marginLeft: 4 }}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View>
                <TouchableOpacity
                    style={[styles.popupBtn]}
                    onPress={() => validateFields()}
                >
                    <Text style={styles.popupBtnTitle}>{"Save"}</Text>
                </TouchableOpacity>
            </View>
            <AlertPopup ref={(ref) => alertRef = ref} />
        </View>

    )
}




const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.4)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 0, shadowOpacity: 0, elevation: 5,
        backgroundColor: 'white'
    },
    aboutHeading: {
        fontFamily: fonts.PBo, fontSize: 15, color: '#ffa183', marginTop: 10
    },
    aboutDesc: {
        fontFamily: fonts.PRe, fontSize: 11, color: '#5D5760', lineHeight: 25
    },
    heading: {
        fontFamily: fonts.PSBo, fontSize: 16, color: '#ffa183', marginTop: 10
    },
    popupBtn: {
        width: 91, height: 35, borderRadius: 20, backgroundColor: '#5b4dbc', marginTop: 20, alignSelf: 'flex-end',
        // position: 'absolute', bottom: 15, right: 10,
        alignItems: 'center', justifyContent: 'center'
    },
    popupBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },
    popupDesc: {
        color: '#241414', fontFamily: fonts.MRe, fontSize: 12, marginTop: Platform.OS == 'ios' ? 5 : 0
    },
})

export default EditProfile