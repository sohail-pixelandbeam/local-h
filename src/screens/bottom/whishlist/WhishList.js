import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import ReactNativeModal from 'react-native-modal';
import { goBack, navigate } from '../../../../Navigations';
import { BackIcon, PlusIcon } from '../../../components/Svgs';
import { acolors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { Context } from '../../../Context/DataContext';
import { apiRequest } from '../../../utils/apiCalls';
import Loader from '../../../utils/Loader';

var alertRef;
var textInputRef;

const WhishList = () => {

    const [loading, setLoading] = useState(false);
    const [createWishListModal, setCreateWishListModal] = useState(false);
    const [wishListName, setWishListName] = useState('');
    const [wishList, setWishList] = useState([]);


    const { state } = useContext(Context);


    function createWishList() {

        if (wishListName == '') {
            alertRef.alertWithType('error', "Error", "Please enter a valid wishlist name");
            return;
        }
        // console.log(wishListName)
        // return;
        setLoading(true);
        const reqObj = {
            userId: state.userData._id,
            wishlistName: wishListName
        }
        console.log(reqObj)
        apiRequest(reqObj, 'createWishlist')
            .then(data => {
                setLoading(false);
                getWishLists();
                if (data.status) {
                    alertRef.alertWithtype('success', "Success", "Added successfully");
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    function getWishLists() {
        setLoading(true);
        apiRequest('', 'getWishlist/' + state.userData._id, 'GET')
            .then(data => {
                console.log(data.data);
                setLoading(false)
                if (data.status) {
                    setWishList(data.data)
                }
            })
            .catch(err => {
                setLoading(false)
            })
    }

    useEffect(() => {

        getWishLists()
        return () => {
            setWishList([]);
        }

    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                {
                    !wishList.length ?
                        <View style={{ marginTop: 50 }}>
                            <TouchableOpacity
                                onPress={() => navigate('AllWishList')}
                            >
                                <Image
                                    style={{ width: "100%", }}
                                    source={require('../../../static_assets/wishListImg.png')}
                                />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: fonts.PBo, fontSize: 12, color: '#2A2A2A', marginTop: 10 }}>Winter Plans Wishlist</Text>
                            <View style={[styles.shadow, { flexDirection: 'row', width: "100%", flexDirection: 'row', borderRadius: 10, padding: 10, marginTop: 20 }]}>
                                <TouchableOpacity
                                    onPress={() => navigate('AllWishList')}
                                    style={{ width: "40%", }}>
                                    <Image
                                        style={{ width: "100%", height: 120 }}
                                        resizeMode="stretch"
                                        source={require('../../../static_assets/wishListImg.png')}
                                    />
                                </TouchableOpacity>
                                <View style={{ width: "58%", marginLeft: "2%", }}>
                                    <TouchableOpacity
                                        onPress={() => navigate('AllWishList')}
                                    >
                                        <Image
                                            style={{ width: "100%", height: 59 }}
                                            resizeMode="stretch"
                                            source={require('../../../static_assets/wishListImg.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigate('AllWishList')}
                                    >
                                        <Image
                                            style={{ width: "100%", height: 59, marginTop: 2 }}
                                            resizeMode="stretch"
                                            source={require('../../../static_assets/wishListImg.png')}
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <Text style={{ fontFamily: fonts.PBo, fontSize: 12, color: '#2A2A2A', marginTop: 10 }}>Summer Plans Wishlist</Text>
                        </View>
                        :
                        <>


                            <View style={{ marginTop: 130, marginLeft: 10 }}>
                                <Text style={[{ fontFamily: fonts.PRe, fontSize: 21, color: '#000000' }]}>Create your first</Text>
                                <Text style={[{ fontFamily: fonts.PRe, fontSize: 21, color: '#FFA183' }]}>Wishlist</Text>
                                <Text style={[{ fontFamily: fonts.PRe, fontSize: 21, color: '#000000' }]}>and it’ll appear here.</Text>
                            </View>

                            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', marginTop: 20 }}>
                                <TouchableOpacity
                                    onPress={() => setCreateWishListModal(true)}
                                    style={{ width: 63, height: 52, borderRadius: 12, borderWidth: 1, borderColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center' }}>
                                    <PlusIcon />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 20, color: '#5D5760', marginLeft: 10, }}>Create New</Text>
                            </View>
                        </>
                }

            </View>

            <ReactNativeModal
                isVisible={createWishListModal}
                style={{ margin: 0, }}
            >
                <DropdownAlert ref={(ref) => alertRef = ref} />
                {loading && <Loader />}
                <View style={{ position: 'absolute', bottom: 0, alignSelf: 'flex-end', backgroundColor: 'white', width: "100%", height: 350, borderTopRightRadius: 15, borderTopLeftRadius: 15, padding: 20 }}>
                    <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 20, color: '#5D5760' }}>Name this Wishlist</Text>
                        <TouchableOpacity
                            onPress={() => setCreateWishListModal(false)}
                            style={{ width: 28, height: 28, borderRadius: 28 / 2, backgroundColor: '#F08F8F', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: fonts.MBo, color: '#241414', fontSize: 14, marginTop: -2 }}>x</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        ref={(ref) => textInputRef = ref}
                        onChangeText={setWishListName}
                        placeholder='Summer Plans 2022'
                        placeholderTextColor={'#7B7B7B'}
                        style={{ width: "100%", height: 44, borderRadius: 12, borderWidth: 1, borderColor: '#2A2A2A', paddingHorizontal: 12, fontFamily: fonts.PRe, fontSize: 12, color: '#222222', marginTop: 20 }}
                        maxLength={50}
                    />
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: '#7B7B7B', marginTop: 5 }}>50 characters maximum</Text>
                    <TouchableOpacity
                        onPress={() => {
                            createWishList();
                            // setWishList([1]);
                            setCreateWishListModal(false)
                        }}
                        style={{ width: 107, height: 36, backgroundColor: '#5B4DBC', borderRadius: 25, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 100 }}>
                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 12, color: '#FFFFFF', }}>Create</Text>
                    </TouchableOpacity>
                </View>


            </ReactNativeModal>


        </View >
    )
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.8)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 0, shadowOpacity: 0, elevation: 5,
        backgroundColor: 'white'
    },
})

export default WhishList

