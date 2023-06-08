import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { acolors } from '../../../../constants/colors'
import GeneralStatusBar from '../../../../components/GernalStatusBar'
import { BackIcon } from '../../../../components/Svgs'
import { fonts } from '../../../../constants/fonts'
import { apiRequest } from '../../../../utils/apiCalls'
import { navigate } from '../../../../../Navigations'
import Loader from '../../../../utils/Loader'


const AccountDeActivated = ({ route }) => {

    const [loading, setLoading] = useState(false);

    const sendOtp = () => {

        setLoading(true)
        const body = {
            userEmail: route.params.userEmail
        };

        apiRequest(body, 'auth/activate-account-send-otp')
            .then(data => {
                console.log('data____', data)
                setLoading(false)
                if (data.status) {
                    navigate('ActivateAccountVerifyOTP', {
                        data: {
                            token: data.data?.token,
                            email: route.params.userEmail
                        }
                    })
                }
            })
            .catch(err => {
                setLoading(false)
            })

    }


    // useEffect(() => {
    //     setLoading(false);
    // }, [])

    return (
        <View style={{ flex: 1, backgroundColor: acolors.primary }}>
            <GeneralStatusBar />
            {loading && <Loader />}
            <View style={{ width: "90%", alignSelf: 'center' }}>
                <TouchableOpacity style={{ padding: 5 }}>
                    <BackIcon />
                </TouchableOpacity>
                <Text style={{ fontFamily: fonts.PSBo, fontSize: 32, color: 'white', textAlign: 'center', marginTop: 50 }}>This account has been deacitvated,</Text>
                <Text style={{ fontFamily: fonts.PSBo, fontSize: 32, color: 'white', textAlign: 'center', marginTop: 50 }}>Do you wish to{"\n"}reactivate?</Text>
            </View>
            <TouchableOpacity
                onPressIn={() => sendOtp()}
                style={styles.button_3} onPress={() => sendOtp()}>
                <Text style={styles.text_1}>Reactivate</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    button_3: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 51,
        paddingHorizontal: 115,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#FFA183',
        position: 'absolute',
        bottom: 80,
        width: "90%",
        alignSelf: 'center'
    },
    text_1: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
        fontFamily: fonts.PSBo
    },
})

export default AccountDeActivated