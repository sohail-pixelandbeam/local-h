import React, { useContext, useState } from 'react'
import {
    StatusBar, SafeAreaView, View, Text, FlatList,
    TouchableOpacity, Image, StyleSheet, Keyboard,
    ScrollView
} from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { goBack, navigate } from '../../../Navigations';
import { BackIcon, HeartFilled, HeartWhiteIcon, PlusIcon } from '../../components/Svgs';
import { fonts } from '../../constants/fonts';
import Loader from '../../utils/Loader';
import GeneralStatusBar from '../../components/GernalStatusBar';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import ReactNativeModal from 'react-native-modal';
import { Context } from '../../Context/DataContext';
import { apiRequest } from '../../utils/apiCalls';



var alertRef;

const SeeAllHappeningsToday = (props) => {

    const [allHappeningsToday, setAllHappenings] = useState(props?.route?.params.params.data);

    const { state } = useContext(Context)

    const title = props.route.params?.params?.title

    const [loading, setLoading] = useState(false);

    const [createWishListModal, setCreateWishListModal] = useState(false);
    const [wishList, setWishList] = useState([]);
    const [createNewWishList, setCreateNewWishList] = useState([])
    const [isCreateNewWishlist, setIsCreateNewWishlist] = useState(false);
    const [newWhishListName, setNewWhishListName] = useState('');
    const [whishListHappeningId, setWhishListHappeningId] = useState('');


    const createNewWhishList = (isAddHappeningToWhishList = false) => {
        if (newWhishListName == '') {
            alertRef.alertWithType('error', 'Error', 'Pleas enter whishlist name');
            return;
        }
        setLoading(true)
        const body = {
            wishlistName: newWhishListName
        };
        apiRequest(body, 'wishlist/create-new-wishlist')
            .then(data => {
                if (isAddHappeningToWhishList && data.status) {
                    addHappeningToWhishList(data.data);
                    setLoading(false)
                    return;
                }
                else {
                    setCreateWishListModal(false);
                    alertRef.alertWithType('error', 'Error', data.message);

                }
                setLoading(false);
            })
    }

    function addHappeningToWhishList(whisList) {

        setLoading(true);
        setCreateWishListModal(false)
        const body = {
            wishlistId: whisList._id ?? wishlistId,
            happeningId: whishListHappeningId,
            wishlistName: whisList?.wishlistName
        }
        apiRequest(body, 'wishlist/save-wishlist-item')
            .then(data => {
                setLoading(false);
                if (data.status == true) {
                    alertRef.alertWithType('success', 'Success', 'Happening added in wishlist');
                    getHappeningDataFromServer();
                    getWhishLists();
                    return
                }
                else {
                    alertRef.alertWithType('error', 'Error', data.message);
                    return
                }

            })
    }

    function getWhishLists() {

        setCreateWishListModal(false)
        apiRequest('', 'wishlist/wishlist-list', 'GET')
            .then(data => {
                setLoading(false);
                if (data.status == true) {
                    setWhishListsGlobal(data.data ? data.data.reverse() : []);
                }
                else {
                    alertRef.alertWithType('error', 'Error', data.message);
                    return
                }

            })
    }

    async function getHappeningDataFromServer(refresh = false) {

        if (!refresh) setLoading(true);
        apiRequest('', 'showAllhappning', "GET")
            .then(data => {
                setLoading(false);
                if (data.status) {
                    let data1 = data?.data
                    setAllHappenings(data1?.reverse());
                }

            })
            .catch(err => {
                console.log('errorr', err)
                setLoading(false)
            })
    }





    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <GeneralStatusBar backgroundColor='white' barStyle='dark-content' />


            

            <View style={{ width: "85%", alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-between', marginTop: 0 }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ padding: 10, marginLeft: -10 }}>
                        <BackIcon color="#5B4DBC" />
                    </TouchableOpacity>
                    {/* <Image
                        source={{ uri: state.profileData?.profileImage }}
                        style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                    /> */}
                </View>

                <View style={{ marginVertical: 10, }}>
                    <Text style={[{ fontFamily: fonts.PSBo, fontSize: 21, color: '#FFA183' }]}>{title}</Text>
                </View>
            </View>

            <View style={{ width: "90%", alignSelf: 'center', flex: 1 }}>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={allHappeningsToday}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigate('HappeningDetails', item)}
                                style={{ width: "48%", marginRight: 10, marginTop: 20 }}>
                                <Image
                                    source={{ uri: item?.addPhotosOfYourHappening[0] }}
                                    style={styles.listImg}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        setWhishListHappeningId(item._id)
                                        if (!item.isFavorite) {
                                            setCreateWishListModal(true)
                                        }
                                    }}
                                    style={{ position: 'absolute', top: 10, right: 5, padding: 10 }}>
                                    {
                                        item.isFavorite ?
                                            <HeartFilled color={'red'} />
                                            :
                                            <HeartWhiteIcon color={"white"} />
                                    }

                                </TouchableOpacity>
                                {/* <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                    {
                                        [1, 2, 3, 4, 5].map((v, i) => (
                                            <View key={i} style={index == 4 ? styles.ratingCircleInActive : styles.ratingCircleActive}></View>
                                        ))
                                    }
                                    <Text style={styles.ratingsText}>34 Ratings</Text>
                                </View> */}
                                <Text style={styles.listTile}>{item?.happeningTitle}</Text>
                                <Text style={styles.distanceText}>{item?.distance}</Text>
                            </TouchableOpacity>
                        )
                    }}

                />


            </View>


            <KeyboardAvoidingView
                behavior='position'
            >
                <ReactNativeModal
                    isVisible={createWishListModal}
                    style={{ margin: 0, alignItems: 'flex-end', justifyContent: 'flex-end' }}
                    onBackdropPress={() => {
                        Keyboard.dismiss()
                    }}

                >



                    {loading && <Loader />}
                    <GeneralStatusBar barStyle='dark-content' />

                    <View style={{ alignSelf: 'flex-end', backgroundColor: 'white', width: "100%", borderTopRightRadius: 15, borderTopLeftRadius: 15, padding: 20, minHeight: 400 }}>
                        <TouchableOpacity
                            onPress={() => Keyboard.dismiss()}
                            activeOpacity={1}
                        >

                            <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 20, color: '#5D5760' }}>Name this Wishlist</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setCreateWishListModal(false)
                                        setIsCreateNewWishlist(false)
                                    }}
                                    style={{ width: 28, height: 28, borderRadius: 28 / 2, backgroundColor: '#F08F8F', alignItems: 'center', justifyContent: 'center' }}>

                                    <Text style={{ fontFamily: fonts.MBo, color: '#241414', fontSize: 14, marginTop: -2 }}>x</Text>
                                </TouchableOpacity>
                            </View>

                        </TouchableOpacity>
                        {
                            isCreateNewWishlist ?
                                <View style={{ height: 400 }}>

                                    <TextInput
                                        onChangeText={setNewWhishListName}
                                        placeholder='e.g. Summer Plans 2022'
                                        placeholderTextColor={'#7B7B7B'}
                                        style={{ width: "100%", height: 44, borderRadius: 12, borderWidth: 1, borderColor: '#2A2A2A', paddingHorizontal: 12, fontFamily: fonts.PRe, fontSize: 12, color: '#222222', marginTop: 20 }}
                                    // maxLength={50}
                                    />
                                    {/* <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: '#7B7B7B', marginTop: 5 }}>50 characters maximum</Text> */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            createNewWhishList(true);
                                            // setCreateNewWishList(false) 
                                        }}
                                        style={{ width: 157, height: 36, backgroundColor: '#5B4DBC', borderRadius: 25, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 50 }}>
                                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 12, color: '#FFFFFF', }}>Create & add</Text>
                                    </TouchableOpacity>




                                </View>
                                :

                                <>
                                    <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', marginTop: 20 }}>
                                        <TouchableOpacity
                                            onPress={() => { setIsCreateNewWishlist(true) }}
                                            style={{ width: 63, height: 52, borderRadius: 12, borderWidth: 1, borderColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center' }}>
                                            <PlusIcon />
                                        </TouchableOpacity>
                                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 20, color: '#5D5760', marginLeft: 10, }}>Create New</Text>
                                    </View>
                                    {state.whishLists && state.whishLists.length > 0 && <Text style={{ fontFamily: fonts.PSBo, fontSize: 15, color: '#5D5760', marginTop: 10, }}>or select from existing</Text>}
                                    <View style={{ maxHeight: 400 }}>
                                        <ScrollView contentContainerStyle={{ paddingBottom: 30 }} >
                                            {
                                                state.whishLists?.map((v, i) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => addHappeningToWhishList(v)}
                                                            style={[styles.shadow, { width: "95%", alignSelf: 'center', padding: 10, paddingVertical: 20, borderRadius: 10, marginTop: 20, flexDirection: 'row', alignItems: 'center' }]}
                                                        // onPress={() => navigate('AllWishList')}
                                                        >
                                                            {
                                                                v.happeningId && v.happeningId[0] &&
                                                                <Image
                                                                    style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
                                                                    source={{ uri: v.happeningId[0].addPhotosOfYourHappening[0] }}
                                                                />
                                                            }
                                                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 12, color: '#2A2A2A', marginLeft: 10 }}>{v.wishlistName}</Text>
                                                        </TouchableOpacity>
                                                        // <TouchableOpacity style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: acolors.lighGrey }}>
                                                        //     <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#2A2A2A', }}>{v.wishlistName}</Text>
                                                        // </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>
                                    {/* <TouchableOpacity
                                        style={[styles.shadow, { shadowColor: 'rgba(0,0,0,0.8)', padding: 10, borderRadius: 10, marginTop: 20, width: "100%", flexDirection: 'row', alignItems: 'center' }]}
                                    // onPress={() => navigate('AllWishList')}
                                    >
                                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 12, color: '#2A2A2A', marginLeft: 10 }}>Summer Plans Wishlist</Text>
                                    </TouchableOpacity> */}

                                    {/* <TouchableOpacity
                                        style={[styles.shadow, { shadowColor: 'rgba(0,0,0,0.8)', padding: 10, borderRadius: 10, marginTop: 20, width: "100%", flexDirection: 'row', alignItems: 'center' }]}
                                    // onPress={() => navigate('AllWishList')}
                                    >
                                        <View style={{ borderWidth: 1, borderColor: '#2A2A2A', width: "40%", borderRadius: 15, padding: 1 }}>
                                            <Image
                                                style={{ width: "100%", borderRadius: 10, height: 92 }}
                                                source={require('../../static_assets/wishListImg.png')}
                                            />
                                        </View>
                                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 12, color: '#2A2A2A', marginLeft: 10 }}>Winter Plans Wishlist</Text>
                                    </TouchableOpacity> */}
                                </>
                        }


                    </View>

                </ReactNativeModal>
            </KeyboardAvoidingView>
            <DropdownAlert ref={(ref) => alertRef = ref} />
            {loading && <Loader />}


        </View>
    )
}


const styles = StyleSheet.create({
    listImg: {
        // width: "100%", height: 231, borderRadius: 25, resizeMode: 'stretch',
        width: "100%", height: 231, borderRadius: 25,
    },
    ratingCircleActive: {
        width: 7, height: 7, backgroundColor: '#f4327f', borderRadius: 7 / 2, marginLeft: 3
    },
    ratingCircleInActive: {
        width: 7, height: 7, backgroundColor: 'rgba(244, 50, 127, 0.4)', borderRadius: 7 / 2, marginLeft: 3
    },
    ratingsText: {
        color: '#5d5760', fontFamily: fonts.PMe, fontSize: 7, marginLeft: 5
    },
    listTile: {
        color: '#5d5760', fontFamily: fonts.PMe, fontSize: 13,
    },
    distanceText: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10, color: '#5d5760', fontFamily: fonts.PMe, fontSize: 6, letterSpacing: 0.3,
    },
})

export default SeeAllHappeningsToday


