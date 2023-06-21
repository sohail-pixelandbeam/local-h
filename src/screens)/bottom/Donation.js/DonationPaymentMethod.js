import React, { useState } from 'react'
import { StatusBar, View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../../Navigations';
import { BackIcon } from '../../../components/Svgs'
import { fonts } from '../../../constants/fonts';
import { useForceUpdate } from '../../../utils/functions';

const DonationPaymentMethod = () => {

    const { width: viewPortWidth, viewPortHeight: height } = Dimensions.get('window');
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const forceUpdate = useForceUpdate();

    return (
        <View style={{ flex: 1, backgroundColor: '#35208E' }}>
            <View style={{ position: 'absolute', top: 0, width: "140%", left: "-20%", backgroundColor: 'rgba(235,194,252,0.3)', height: 350, borderBottomRightRadius: viewPortWidth / 1.5, borderBottomLeftRadius: viewPortWidth / 1.5, }} />
            <StatusBar
                hidden={true}
            />
            <TouchableOpacity
                style={{ padding: 18 }}
                onPress={() => goBack()}
            >
                <BackIcon color="#fff" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
                <View style={{ width: "90%", alignSelf: 'center' }}>
                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 16, color: '#fff', marginTop: 10 }}>Payment Method</Text>
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 13, color: '#fff', marginTop: 0 }}>Click one of your payment</Text>
                    <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', marginTop: 15 }}>
                        <TouchableOpacity
                            onPress={() => setPaymentMethod('credit')}
                            style={{ width: 18, height: 18, borderRadius: 18 / 2, borderWidth: 1, borderColor: '#5D5760', backgroundColor: '#141416', alignItems: 'center', justifyContent: 'center' }}>
                            {paymentMethod == "credit" && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFA183' }} ></View>}
                        </TouchableOpacity>
                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: 'white', marginLeft: 5 }}>Credit Card</Text>
                        <TouchableOpacity
                            onPress={() => setPaymentMethod('paypal')}
                            style={{ width: 18, height: 18, borderRadius: 18 / 2, borderWidth: 1, borderColor: '#5D5760', backgroundColor: '#141416', alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
                            {paymentMethod == "paypal" && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFA183' }} ></View>}
                        </TouchableOpacity>
                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: 'white', marginLeft: 5 }}>Paypal</Text>
                    </View>
                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 16, color: 'white', marginTop: 50 }}>Add Card Details</Text>
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: 'white', marginTop: 10 }}>CARD HOLDER NAME</Text>
                    <TextInput
                        placeholder={"TONY NGUYEN"}
                        placeholderTextColor="#FFFFFF"
                        style={{ width: '100%', height: 45, borderRadius: 15, backgroundColor: '#1A1A20', marginTop: 10, fontFamily: fonts.PRe, fontSize: 14, color: '#FFFFFF', padding: 10, }}
                    />
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: 'white', marginTop: 20 }}>CARD NUMBER</Text>
                    <TextInput
                        placeholder={"3445     5666     4555     4452"}
                        placeholderTextColor="#FFFFFF"
                        style={{ width: '100%', height: 45, borderRadius: 15, backgroundColor: '#1A1A20', marginTop: 10, fontFamily: fonts.PRe, fontSize: 14, color: '#FFFFFF', padding: 10, }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
                        <View style={{ width: "45%" }}>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: 'white', marginTop: 20 }}>VALID UNTIL</Text>
                            <TextInput
                                placeholder={"04/2024"}
                                placeholderTextColor="#FFFFFF"
                                style={{ width: '100%', height: 45, borderRadius: 15, backgroundColor: '#1A1A20', marginTop: 10, fontFamily: fonts.PRe, fontSize: 14, color: '#FFFFFF', padding: 10, }}
                            />
                        </View>
                        <View style={{ width: "45%" }}>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: 'white', marginTop: 20 }}>CVC</Text>
                            <TextInput
                                placeholder={"***"}
                                placeholderTextColor="#FFFFFF"
                                style={{ width: '100%', height: 45, borderRadius: 15, backgroundColor: '#1A1A20', marginTop: 10, fontFamily: fonts.PRe, fontSize: 14, color: '#FFFFFF', padding: 10, }}
                            />
                        </View>
                    </View>

                    <View style={{ width: "80%", alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 50 }}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/applePay.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/googlePay.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/paypalPay.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigate('DonationComplete')}
                        style={{ backgroundColor: '#5B4DBC', width: "100%", height: 39, borderRadius: 20, marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 13, color: '#FFFFFF' }}>Donate</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>



        </View>
    )
}

const styles = StyleSheet.create({
    selectedAmountView: {
        backgroundColor: 'white',
    },
    unSelectedAmountView: {
        borderWidth: 1, borderColor: 'white',
    },
    amountViewComman: {
        alignItems: 'center', justifyContent: 'center', width: "24%", height: 36, marginLeft: "2%", borderRadius: 20
    },
    amountText: {
        fontFamily: fonts.MBo, fontSize: 12
    }


})

export default DonationPaymentMethod
