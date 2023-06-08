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

const DFinal = ({ route }) => {

    const { state, setHappeningData } = useContext(Context);
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);


    const params = route.params;


    const doDeActivate = () => {
        setLoading(true);
        const body = {
            account_status: 'inactive',
            deactivate_reason: params
        }
        apiRequest(body, "auth/set-account-status")
            .then(data => {
                console.log('___data', data)
                if (data.status) {
                    alertRef?.alertWithType('success', 'Success', 'Account deactivated successfully')
                    storeItem('login_data', '');
                    storeItem('profile_data', '');
                    changeLoggedIn.changeNow(2);
                }
                else {
                    if (data.message == 'You have pending booking, please cancel your booking first') {
                        navigate('DActiveBooking');
                        return;
                    }
                    alertRef.alertWithType('error', 'Error', data.message)
                }
                setLoading(false);


            })
    }


    // useEffect(() => {
    //     setLoading(false);
    // }, [])



    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <GeneralStatusBar
                barStyle={"dark-content"}
                backgroundColor={"white"}
            />

            {loading && <Loader />}
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
                <Text style={[styles.deactivateHeading, { fontSize: 26, marginTop: 120 }]}>Host and fellows{"\n"}will miss you!</Text>
                <Text style={{ fontSize: 20, color: '#222222', fontFamily: fonts.PRe, marginTop: 10 }}>Do you really wish{"\n"}to deactivate ?</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => navigate('DFinal')}
                        style={{ width: "35%", alignSelf: 'flex-end', backgroundColor: acolors.primaryLight, borderRadius: 20, height: 35, marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: fonts.PMe, color: '#fff', fontSize: 12 }}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => doDeActivate()}
                        style={{ width: "35%", alignSelf: 'flex-end', borderColor: acolors.primaryLight, borderWidth: 1, marginLeft: 10, borderRadius: 20, height: 35, marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: fonts.PMe, color: '#222222', fontSize: 12 }}>Yes</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <DropdownAlert ref={(ref) => alertRef = ref} />
        </View>
    )
}

export default DFinal;