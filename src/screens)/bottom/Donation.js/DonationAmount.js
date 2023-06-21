import React, { useState } from 'react'
import { StatusBar, View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../../Navigations';
import { BackIcon } from '../../../components/Svgs'
import { fonts } from '../../../constants/fonts';
import { useForceUpdate } from '../../../utils/functions';

const DonationAmount = () => {

    const { width: viewPortWidth, viewPortHeight: height } = Dimensions.get('window');
    const [selectedAmount, setSelectedAmount] = useState('');
    const forceUpdate = useForceUpdate();

    return (
        <View style={{ flex: 1, backgroundColor: '#35208E' }}>
            <View style={{ width: "140%", left: "-20%", backgroundColor: 'rgba(235,194,252,0.3)', height: 370, marginTop: -80, borderBottomRightRadius: viewPortWidth / 1.5, borderBottomLeftRadius: viewPortWidth / 1.5, }} />
            <StatusBar
                hidden={true}
            />
            <View style={{ position: 'absolute', width: "100%" }}>
                <TouchableOpacity
                    style={{ padding: 18 }}
                    onPress={() => goBack()}
                >
                    <BackIcon color="#fff" />
                </TouchableOpacity>
                <Image
                    source={require('../../../assets/donation1.png')}
                    style={{ width: '110%', resizeMode: 'contain', marginLeft: -20, marginTop: -20 }}
                />
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
                <View style={{ width: "90%", alignSelf: 'center' }}>
                    <Text style={{ fontFamily: fonts.PBo, fontSize: 29, color: '#fff', marginTop: 10 }}>Help LocalHappinez
                        and contribute to
                        create a more
                        sustainable world. </Text>
                    <View style={{ flexDirection: 'row', width: "100%", marginLeft: '-3%' }}>
                        {
                            ["10", "20", "50", "100"]
                                .map((v, i) => {
                                    return (
                                        <TouchableOpacity
                                            key={i}
                                            onPress={() => {
                                                setSelectedAmount(v)
                                                forceUpdate()
                                            }}
                                            style={[selectedAmount == v ? styles.selectedAmountView : styles.unSelectedAmountView, styles.amountViewComman]}>
                                            <Text style={[styles.amountText, selectedAmount == v && { color: '#35208E' }]}>$ {v}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                        }
                    </View>
                    <TextInput
                        placeholder={"Enter Amount"}
                        value={selectedAmount}
                        onChangeText={(v) => setSelectedAmount(v)}
                        placeholderTextColor="#7B7B7B"
                        style={{ width: '50%', height: 38, borderRadius: 20, backgroundColor: 'white', marginTop: 10, fontFamily: fonts.PRe, fontSize: 12, color: '#7B7B7B', padding: 10,paddingBottom:0 }}
                        
                    />
                    <Text style={{ fontFamily: fonts.PMe, fontSize: 14, color: '#A69FD9', marginTop: 10 }}>* This donation is for the platform, not the{"\n"}happenning </Text>
                    <TouchableOpacity
                        onPress={() => navigate('DonationPaymentMethod')}
                        style={{ backgroundColor: '#5B4DBC', width: "100%", height: 39, borderRadius: 20, marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
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

export default DonationAmount
