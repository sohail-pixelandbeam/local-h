import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput, SafeAreaView } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { ScrollView, Switch } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import { goBack, navigate } from '../../../../Navigations';
import { ArrowForward, BackIcon, PlusIcon, TickIcon } from '../../../components/Svgs';
import { acolors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { Context } from '../../../Context/DataContext';
import { apiRequest } from '../../../utils/apiCalls';
import Loader from '../../../utils/Loader';
import GeneralStatusBar from '../../../components/GernalStatusBar';

var alertRef;
var textInputRef;

const TranslationSettings = () => {

    const [loading, setLoading] = useState(false);
    const [translationSwitch, setTranslationSwitch] = useState(false);
    const [language, setLanguage] = useState('English')


    const { state } = useContext(Context);



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <GeneralStatusBar backgroundColor='#fff' barStyle='dark-content' />
            <DropdownAlert ref={(ref) => alertRef = ref} />
            {loading && <Loader />}
            <View style={{ width: "90%", alignSelf: 'center' }}>

                <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-between', marginTop: 0 }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ padding: 10 }}>
                        <BackIcon color="#5B4DBC" />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: state.profileData?.profileImage }}
                        style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                    />
                </View>
                <Text style={{ fontFamily: fonts.PSBo, fontSize: 21, color: '#5B4DBC', marginTop: 10 }}>Translation</Text>
                <Text style={{ fontFamily: fonts.PRe, fontSize: 21, color: '#414141' }}>Settings</Text>

                <View style={{ backgroundColor: '#F8F8F8', width: "100%", borderRadius: 20, paddingTop: 20, paddingHorizontal: 10, paddingBottom: 10 }}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >

                        <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                            <View style={{ width: "80%" }}>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Transalation </Text>
                                <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>The translation for the content in the app</Text>
                            </View>
                            <Switch
                                style={{ elevation: 2 }}
                                trackColor={{ false: "#767577", true: "white" }}
                                thumbColor={translationSwitch ? "#5B4DBC" : "#f4f3f4"}
                                onValueChange={() => setTranslationSwitch(!translationSwitch)}
                                value={translationSwitch}
                                ios_backgroundColor="#707070"
                            />
                        </View>
                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760', marginTop: 20 }}>Change translation language</Text>


                        <View style={{
                            elevation: 2, backgroundColor: 'white', borderTopRightRadius: 10, borderTopLeftRadius: 10, padding: 10, marginTop: 20,
                            shadowColor: 'rgba(0, 0, 0, 0.09)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
                        }}>
                            <TouchableOpacity
                                onPress={() => setLanguage('English')}
                                style={styles.languagePickerContainer}>
                                <Text style={styles.languageText}>English</Text>
                                <View style={styles.languagePickerCircle}>
                                    {language == 'English' && <TickIcon />}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setLanguage('Chinese')}
                                style={styles.languagePickerContainer}>
                                <Text style={styles.languageText}>Chinese</Text>
                                <View style={styles.languagePickerCircle}>
                                    {language == 'Chinese' && <TickIcon />}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setLanguage('Dutch')}
                                style={styles.languagePickerContainer}>
                                <Text style={styles.languageText}>Dutch</Text>
                                <View style={styles.languagePickerCircle}>
                                    {language == 'Dutch' && <TickIcon />}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setLanguage('Japanese')}
                                style={styles.languagePickerContainer}>
                                <Text style={styles.languageText}>Japanese</Text>
                                <View style={styles.languagePickerCircle}>
                                    {language == 'Japanese' && <TickIcon />}
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={[styles.popupBtn]}
                        // onPress={onPress}
                        >
                            <Text style={styles.popupBtnTitle}>{"Update"}</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>

            </View >
        </View >
    )
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.8)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 0, shadowOpacity: 0, elevation: 5,
        backgroundColor: 'white'
    },

    languagePickerCircle: {
        width: 37, height: 37, borderRadius: 37 / 2,
        shadowColor: 'rgba(0, 0, 0, 0.5)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', elevation: 5
    },
    languagePickerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14
    },
    languageText: {
        fontSize: 9, color: "#2a2a2a", fontFamily: fonts.MSBo, letterSpacing: 0.18,
    },

    popupBtn: {
        width: 91, height: 32, borderRadius: 20, backgroundColor: '#5b4dbc',
        alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', marginTop: 20
    },
    popupBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },


})

export default TranslationSettings

