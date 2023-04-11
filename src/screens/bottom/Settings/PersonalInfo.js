import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput, SafeAreaView } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { ScrollView } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import { goBack, navigate } from '../../../../Navigations';
import { ArrowForward, BackIcon, PlusIcon } from '../../../components/Svgs';
import { acolors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { Context } from '../../../Context/DataContext';
import { apiRequest } from '../../../utils/apiCalls';
import Loader from '../../../utils/Loader';

var alertRef;
var textInputRef;

const PersonalInfo = () => {

    const [loading, setLoading] = useState(false);
    const [createWishListModal, setCreateWishListModal] = useState(false);
    const [wishListName, setWishListName] = useState('');
    const [wishList, setWishList] = useState([]);


    const { state } = useContext(Context);



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <DropdownAlert ref={(ref) => alertRef = ref} />
            {loading && <Loader />}
            <StatusBar
                backgroundColor={'white'}
                barStyle={"dark-content"}
            />
            <View style={{ width: "90%", alignSelf: 'center' }}>

                <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
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
                <Text style={{ fontFamily: fonts.PSBo, fontSize: 21, color: '#5B4DBC', marginTop: 30 }}>Personal</Text>
                <Text style={{ fontFamily: fonts.PRe, fontSize: 21, color: '#414141' }}>Info</Text>

                <View style={{ backgroundColor: '#F8F8F8', width: "100%", borderRadius: 20, paddingTop: 20, paddingHorizontal: 10, paddingBottom: 10 }}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >

                        <TouchableOpacity
                            style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                            <View>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Legal name</Text>
                                <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>Jules Robinson</Text>
                            </View>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                            <View>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Date of Birth</Text>
                                <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>01/01/1992</Text>
                            </View>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                            <View>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Email address</Text>
                                <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>julesrobinson@gmail.com</Text>
                            </View>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                            <View>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Phone numbers</Text>
                                <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>+44 98 98 4565</Text>
                            </View>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                            <View>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Address</Text>
                                <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>Not Provided</Text>
                            </View>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                            <View>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Emergency Contact</Text>
                                <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>Not Provided</Text>
                            </View>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Edit</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>

            </View>
        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.8)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 0, shadowOpacity: 0, elevation: 5,
        backgroundColor: 'white'
    },
})

export default PersonalInfo

