import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Platform, } from 'react-native'


import { Context } from '../../../Context/DataContext';
import { storeItem, useForceUpdate } from '../../../utils/functions'
import Loader from '../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import { acolors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { goBack, navigate, navigateFromStack } from '../../../../Navigations';
import { changeLoggedIn } from '../../../../Common';
import { ArrowForward, BackIcon, EditPencilIcon, InfoIcon, NextIcon, RecursionIcon, SettingsIcon } from '../../../components/Svgs';
import AlertMsg from '../../../common/AlertMsg';
import { apiRequest } from '../../../utils/apiCalls';



var alertRef;

const SettingsScreen = () => {

    const { state, setHappeningData } = useContext(Context)

    const settings = [
        { name: "Personal Info", navigateTo: 'PersonalInfo' },
        { name: "Notifications", navigateTo: 'NotificationSettings' },
        { name: "Translation", navigateTo: 'TranslationSettings' },
        { name: "Login & Security", navigateTo: 'LoginSecuritySettings' },
        { name: "Time Zones", navigateTo: 'PersonalInfo' },
        { name: "Get Verified", navigateTo: 'NotificationSettings' },
        { name: "Help & Tips ", navigateTo: 'NotificationSettings' },
    ];


    const SettingsTab = () => (
        <View style={{ backgroundColor: '#F8F8F8', width: "100%", borderRadius: 20, paddingTop: 20, paddingHorizontal: 10, height: "100%", marginTop: 30 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
                <View style={{ width: "90%", alignSelf: 'center' }}>
                    {
                        settings.map((v, i) => {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => navigate(v.navigateTo)}
                                    style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>{v.name}</Text>
                                    <ArrowForward />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    );


    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor={"white"}
            />

            <View>
                <Image
                    style={{ width: 115, height: 115, borderRadius: 115 / 2, borderWidth: 5, borderColor: acolors.primary, alignSelf: 'center', marginTop: 20 }}
                    source={{ uri: state?.profileData?.profileImage }}
                />
                <Text style={[{ color: '#FFA183', fontFamily: fonts.PBo, fontSize: 30, marginTop: 20, alignSelf: 'center' }]}>{state?.userData?.userName}</Text>
                <SettingsTab />
                <TouchableOpacity 
                    onPress={()=>goBack()}
                    style={{ position: 'absolute', top: 20, left: 20,padding:10 }}>
                    <BackIcon color="#000" />
                </TouchableOpacity>
            </View>



        </SafeAreaView>
    )
}

export default SettingsScreen;