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
import AlertPopup from '../../../../common/AlertPopup';



var alertRef;

const DReason = () => {

    const { state, setHappeningData } = useContext(Context);
    const [reason, setReason] = useState('');


    const settings = [
        { name: "There are no happenings to my likings", },
        { name: "My happenings don't attract fellows", },
        { name: "I don't use the app", },
        { name: "I find it too difficult to use", },
        { name: "Others", },
    ];


    const SettingsTab = () => (
        <View style={{ backgroundColor: '#F8F8F8', width: "100%", alignSelf: 'center', borderRadius: 20, paddingVertical: 20, paddingHorizontal: 10, marginTop: 30 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 30 }} >
                <View style={{ width: "90%", alignSelf: 'center' }}>
                    {
                        settings.map((v, i) => {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => {
                                        setReason(v.name)
                                    }}
                                    style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                                    <Text style={[{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }, v.name == reason && { fontFamily: fonts.PSBo, color: acolors.primary }]}>{v.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
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
                <Text style={[styles.deactivateHeading, { fontSize: 12, fontFamily: fonts.PRe, marginTop: 5 }]}>Account will be deleted after 30 days of{"\n"}deactivation you can wish to retrieve your account within in time</Text>
                <SettingsTab />
                <TouchableOpacity
                    onPress={() => {
                        if (reason == '') {
                            alertRef.alertWithType('error', 'Error', 'Please select reason');
                            return;
                        }
                        navigate('DFinal', reason)
                    }}
                    style={{ width: "40%", alignSelf: 'flex-end', backgroundColor: acolors.primaryLight, borderRadius: 10, height: 39, marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: fonts.PMe, color: '#fff', fontSize: 12 }}>Next</Text>
                </TouchableOpacity>
            </View>


            <AlertPopup ref={(ref) => alertRef = ref} />

        </View>
    )
}

export default DReason;