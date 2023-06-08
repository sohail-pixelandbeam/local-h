import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Platform, } from 'react-native'


import { Context } from '../../../../Context/DataContext';
import { storeItem, useForceUpdate } from '../../../../utils/functions'
import Loader from '../../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import { acolors } from '../../../../constants/colors';
import { fonts } from '../../../../constants/fonts';
import { goBack, navigate, navigateFromStack } from '../../../../../Navigations';
import { changeLoggedIn } from '../../../../../Common';
import { ArrowForward, BackIcon, EditPencilIcon, InfoIcon, NextIcon, RecursionIcon, SettingsIcon } from '../../../../components/Svgs';
import AlertMsg from '../../../../common/AlertMsg';
import { apiRequest } from '../../../../utils/apiCalls';
import GeneralStatusBar from '../../../../components/GernalStatusBar';
import { styles } from './styles';



var alertRef;

const DActiveBooking = () => {

    const { state, setHappeningData } = useContext(Context)


    const settings = [
        { name: "Personal Info", },
        { name: "Notifications", },
        { name: "Translation", },
        { name: "Login & Security", },
        { name: "Time Zones", },
        { name: "Get Verified", },
        { name: "Help & Tips ", },
    ];


    const SettingsTab = () => (
        <View style={{ backgroundColor: '#F8F8F8', width: "100%", alignSelf: 'center', borderRadius: 20, paddingVertical: 20, paddingHorizontal: 20, marginTop: 30 }}>
            <Text style={styles.deactivateHeading}>Uh! Oh</Text>
            <Text style={[styles.deactivateHeading, { marginTop: 5 }]}>You have Active Bookings,</Text>
            <Text style={{ fontFamily: fonts.PRe, fontSize: 15, color: '#222222', lineHeight: 23, marginTop: 5 }}>can't deactivate your account with active bookings. If you wish to deactivate, cancel the bookings</Text>
            <TouchableOpacity
                onPress={() => navigate('Profile', {
                    focused: 'Bookings'
                })}
                style={{ width: "40%", alignSelf: 'flex-end', backgroundColor: acolors.primaryLight, borderRadius: 20, height: 35, marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: fonts.PMe, color: '#fff', fontSize: 12 }}>My Bookings</Text>
            </TouchableOpacity>


            {/* <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
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
            </ScrollView> */}
        </View>
    );


    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <GeneralStatusBar
                barStyle={"dark-content"}
                backgroundColor={"white"}
            />
            <View style={{ width: "90%", alignSelf: 'center' }}>
                <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{}}>
                        <BackIcon color="#000" />
                    </TouchableOpacity>
                    <Image
                        style={{ width: 40, height: 40, borderRadius: 60 / 2, marginTop: 0 }}
                        source={{ uri: state?.profileData?.profileImage }}
                    />
                </View>
                <Text style={styles.deactivateHeading}>Deactivate your account</Text>



                <SettingsTab />
            </View>



        </View>
    )
}

export default DActiveBooking;