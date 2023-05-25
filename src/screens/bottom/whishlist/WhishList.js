import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput, ScrollView } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import ReactNativeModal from 'react-native-modal';
import { goBack, navigate } from '../../../../Navigations';
import { BackIcon, PlusIcon } from '../../../components/Svgs';
import { acolors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { Context } from '../../../Context/DataContext';
import { apiRequest } from '../../../utils/apiCalls';
import Loader from '../../../utils/Loader';
import GeneralStatusBar from '../../../components/GernalStatusBar';
import { TrashIcon } from '../../../components/Svgs';
import AlertMsg from '../../../common/AlertMsg';

var alertRef;
var textInputRef;

const WhishList = () => {

    const [loading, setLoading] = useState(false);
    const [createWishListModal, setCreateWishListModal] = useState(false);
    const [wishListName, setWishListName] = useState('');
    const [wishList, setWishList] = useState([]);
    const [isDeletedModal, setIsDeleteModal] = useState(false);
    const [deletedId, setDeletedId] = useState('');
    const [newWhishListName, setNewWhishListName] = useState('');



    const { state, setWhishListsGlobal } = useContext(Context);


    const createNewWhishList = () => {

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
                if (data.status) {
                    getWhishLists();
                    setLoading(false)
                    return;
                }
                else {
                    alertRef.alertWithType('error', 'Error', data.message);

                }
                setLoading(false);
            })
    }

    function getWhishLists() {
        setCreateWishListModal(false)
        apiRequest('', 'wishlist/wishlist-list', 'GET')
            .then(data => {
                console.log('whishListdata====', data)
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

    function doDel() {
        setIsDeleteModal(false)
        setLoading(true)
        apiRequest({ wishlistId: deletedId }, 'wishlist/remove-wishlist',)
            .then(data => {
                setLoading(false);
                getWhishLists();
                if (data.status == true) {
                    alertRef.alertWithType('success', 'Deleted')
                }
                else {
                    alertRef.alertWithType('error', 'Error', data.message);
                    return
                }

            })
    }
    useEffect(() => {
        getWhishLists();
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <GeneralStatusBar
                backgroundColor='white'
                barStyle={"dark-content"}
            />

            <AlertMsg
                heading={"Are you sure you want to delete the wishlist ?"}
                isCross={false}
                desc=""
                renderBtn={false}
                // descStyle={{ lineHeight: 22, color: '#5D5760', fontFamily: fonts.PSBo }}
                btnTitle="Done"
                state={isDeletedModal}
                onBackdropPress={() => setBookingStatusAlert(false)}
                onPress={() => setBookingStatusAlert(false)}
                containerStyle={{ paddingHorizontal: 25, paddingBottom: 20, paddingTop: 10, width: "85%" }}
                children={(
                    <View style={{ flexDirection: 'row', width: "100%", marginTop: 20, justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            style={[styles.popupBtn]}
                            onPress={() => setIsDeleteModal(false)}
                        >
                            <Text style={styles.popupBtnTitle}>{"No"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.popupBtn, { borderWidth: 1, borderColor: '#5B4DBC', backgroundColor: 'white', marginLeft: 15 }]}
                            onPress={() => {
                                doDel();
                            }}
                        >
                            <Text style={[styles.popupBtnTitle, { color: '#5B4DBC' }]}>{"Yes"}</Text>
                        </TouchableOpacity>

                    </View>
                )
                }
            />

            <DropdownAlert ref={(ref) => alertRef = ref} />
            {loading && <Loader />}
            <View style={{ width: "90%", alignSelf: 'center' }}>

                <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-between', marginTop: 0 }}>
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
                    state.whishLists.length ?

                        <ScrollView contentContainerStyle={{ paddingBottom: 350 }} showsVerticalScrollIndicator={false} >
                            {
                                state.whishLists?.map((v, i) => {
                                    return (
                                        <TouchableOpacity
                                            style={[styles.shadow, { width: "95%", alignSelf: 'center', padding: 10, paddingVertical: 20, borderRadius: 10, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
                                            onPress={() => navigate('AllWishList', v)}
                                        >
                                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 12, color: '#2A2A2A', marginLeft: 10 }}>{v.wishlistName}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    console.log('v._id', v._id)
                                                    setDeletedId(v._id);
                                                    setIsDeleteModal(true)
                                                }}
                                                style={{ padding: 10 }}>
                                                <TrashIcon color={acolors.grey} />
                                            </TouchableOpacity>
                                        </TouchableOpacity>

                                    )
                                })
                            }

                        </ScrollView>
                        : <>


                            <View style={{ marginTop: 130, marginLeft: 10 }}>
                                <Text style={[{ fontFamily: fonts.PRe, fontSize: 21, color: '#000000' }]}>Create your first</Text>
                                <Text style={[{ fontFamily: fonts.PRe, fontSize: 21, color: '#FFA183' }]}>Wishlist</Text>
                                <Text style={[{ fontFamily: fonts.PRe, fontSize: 21, color: '#000000' }]}>and it’ll appear here.</Text>
                            </View>

                            {/* <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', marginTop: 20 }}>
                                <TouchableOpacity
                                    onPress={() => setCreateWishListModal(true)}
                                    style={{ width: 63, height: 52, borderRadius: 12, borderWidth: 1, borderColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center' }}>
                                    <PlusIcon />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 20, color: '#5D5760', marginLeft: 10, }}>Create New</Text>
                            </View> */}
                        </>
                }
                {/* {
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
                } */}

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
                        onChangeText={setNewWhishListName}
                        placeholder='Summer Plans 2022'
                        placeholderTextColor={'#7B7B7B'}
                        style={{ width: "100%", height: 44, borderRadius: 12, borderWidth: 1, borderColor: '#2A2A2A', paddingHorizontal: 12, fontFamily: fonts.PRe, fontSize: 12, color: '#222222', marginTop: 20 }}
                        maxLength={50}
                    />
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: '#7B7B7B', marginTop: 5 }}>50 characters maximum</Text>
                    <TouchableOpacity
                        onPress={() => {
                            createNewWhishList();
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
        shadowColor: acolors.lighGrey, shadowOffset: { width: 1, height: 1 }, shadowRadius: 3, shadowOpacity: 0.5, elevation: 2,
        backgroundColor: 'white'
    },
    popupBtn: {
        width: "30%", height: 34, borderRadius: 20, backgroundColor: '#5b4dbc',
        alignItems: 'center', justifyContent: 'center'
    },
    popupBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },

})

export default WhishList



// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput } from 'react-native'
// import DropdownAlert from 'react-native-dropdownalert';
// import ReactNativeModal from 'react-native-modal';
// import { goBack, navigate } from '../../../../Navigations';
// import { BackIcon, PlusIcon } from '../../../components/Svgs';
// import { acolors } from '../../../constants/colors';
// import { fonts } from '../../../constants/fonts';
// import { Context } from '../../../Context/DataContext';
// import { apiRequest } from '../../../utils/apiCalls';
// import Loader from '../../../utils/Loader';

// var alertRef;
// var textInputRef;

// const WhishList = () => {

//     const [loading, setLoading] = useState(false);
//     const [createWishListModal, setCreateWishListModal] = useState(false);
//     const [wishListName, setWishListName] = useState('');
//     const [wishList, setWishList] = useState([]);


//     const { state } = useContext(Context);


//     function createWishList() {

//         if (wishListName == '') {
//             alertRef.alertWithType('error', "Error", "Please enter a valid wishlist name");
//             return;
//         }
//         // console.log(wishListName)
//         // return;
//         setLoading(true);
//         const reqObj = {
//             userId: state.userData._id,
//             wishlistName: wishListName
//         }
//         console.log(reqObj)
//         apiRequest(reqObj, 'createWishlist')
//             .then(data => {
//                 setLoading(false);
//                 getWishLists();
//                 if (data.status) {
//                     alertRef.alertWithtype('success', "Success", "Added successfully");
//                 }
//             })
//             .catch(err => {
//                 setLoading(false)
//                 console.log(err)
//             })
//     }

//     function getWishLists() {
//         setLoading(true);
//         apiRequest('', 'getWishlist/' + state.userData._id, 'GET')
//             .then(data => {
//                 console.log(data.data);
//                 setLoading(false)
//                 if (data.status) {
//                     setWishList(data.data)
//                 }
//             })
//             .catch(err => {
//                 setLoading(false)
//             })
//     }

//     useEffect(() => {

//         getWishLists()
//         return () => {
//             setWishList([]);
//         }

//     }, [])

//     return (
//         <View style={{ flex: 1, backgroundColor: 'white' }}>
//             <DropdownAlert ref={(ref) => alertRef = ref} />
//             {loading && <Loader />}
//             <StatusBar
//                 backgroundColor={'white'}
//                 barStyle={"dark-content"}
//             />
//             <View style={{ width: "90%", alignSelf: 'center' }}>

//                 <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
//                     <TouchableOpacity
//                         onPress={() => goBack()}
//                         style={{ padding: 10 }}>
//                         <BackIcon color="#5B4DBC" />
//                     </TouchableOpacity>
//                     <Image
//                         source={{ uri: state.profileData?.profileImage }}
//                         style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
//                     />
//                 </View>
//                 {
//                     !wishList.length ?
//                         <View style={{ marginTop: 50 }}>
//                             <TouchableOpacity
//                                 onPress={() => navigate('AllWishList')}
//                             >
//                                 <Image
//                                     style={{ width: "100%", }}
//                                     source={require('../../../static_assets/wishListImg.png')}
//                                 />
//                             </TouchableOpacity>
//                             <Text style={{ fontFamily: fonts.PBo, fontSize: 12, color: '#2A2A2A', marginTop: 10 }}>Winter Plans Wishlist</Text>
//                             <View style={[styles.shadow, { flexDirection: 'row', width: "100%", flexDirection: 'row', borderRadius: 10, padding: 10, marginTop: 20 }]}>
//                                 <TouchableOpacity
//                                     onPress={() => navigate('AllWishList')}
//                                     style={{ width: "40%", }}>
//                                     <Image
//                                         style={{ width: "100%", height: 120 }}
//                                         resizeMode="stretch"
//                                         source={require('../../../static_assets/wishListImg.png')}
//                                     />
//                                 </TouchableOpacity>
//                                 <View style={{ width: "58%", marginLeft: "2%", }}>
//                                     <TouchableOpacity
//                                         onPress={() => navigate('AllWishList')}
//                                     >
//                                         <Image
//                                             style={{ width: "100%", height: 59 }}
//                                             resizeMode="stretch"
//                                             source={require('../../../static_assets/wishListImg.png')}
//                                         />
//                                     </TouchableOpacity>
//                                     <TouchableOpacity
//                                         onPress={() => navigate('AllWishList')}
//                                     >
//                                         <Image
//                                             style={{ width: "100%", height: 59, marginTop: 2 }}
//                                             resizeMode="stretch"
//                                             source={require('../../../static_assets/wishListImg.png')}
//                                         />
//                                     </TouchableOpacity>
//                                 </View>

//                             </View>
//                             <Text style={{ fontFamily: fonts.PBo, fontSize: 12, color: '#2A2A2A', marginTop: 10 }}>Summer Plans Wishlist</Text>
//                         </View>
//                         :
//                         <>


//                             <View style={{ marginTop: 130, marginLeft: 10 }}>
//                                 <Text style={[{ fontFamily: fonts.PRe, fontSize: 21, color: '#000000' }]}>Create your first</Text>
//                                 <Text style={[{ fontFamily: fonts.PRe, fontSize: 21, color: '#FFA183' }]}>Wishlist</Text>
//                                 <Text style={[{ fontFamily: fonts.PRe, fontSize: 21, color: '#000000' }]}>and it’ll appear here.</Text>
//                             </View>

//                             <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', marginTop: 20 }}>
//                                 <TouchableOpacity
//                                     onPress={() => setCreateWishListModal(true)}
//                                     style={{ width: 63, height: 52, borderRadius: 12, borderWidth: 1, borderColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center' }}>
//                                     <PlusIcon />
//                                 </TouchableOpacity>
//                                 <Text style={{ fontFamily: fonts.PSBo, fontSize: 20, color: '#5D5760', marginLeft: 10, }}>Create New</Text>
//                             </View>
//                         </>
//                 }

//             </View>

//             <ReactNativeModal
//                 isVisible={createWishListModal}
//                 style={{ margin: 0, }}
//             >
//                 <DropdownAlert ref={(ref) => alertRef = ref} />
//                 {loading && <Loader />}
//                 <View style={{ position: 'absolute', bottom: 0, alignSelf: 'flex-end', backgroundColor: 'white', width: "100%", height: 350, borderTopRightRadius: 15, borderTopLeftRadius: 15, padding: 20 }}>
//                     <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//                         <Text style={{ fontFamily: fonts.PSBo, fontSize: 20, color: '#5D5760' }}>Name this Wishlist</Text>
//                         <TouchableOpacity
//                             onPress={() => setCreateWishListModal(false)}
//                             style={{ width: 28, height: 28, borderRadius: 28 / 2, backgroundColor: '#F08F8F', alignItems: 'center', justifyContent: 'center' }}>
//                             <Text style={{ fontFamily: fonts.MBo, color: '#241414', fontSize: 14, marginTop: -2 }}>x</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <TextInput
//                         ref={(ref) => textInputRef = ref}
//                         onChangeText={setWishListName}
//                         placeholder='Summer Plans 2022'
//                         placeholderTextColor={'#7B7B7B'}
//                         style={{ width: "100%", height: 44, borderRadius: 12, borderWidth: 1, borderColor: '#2A2A2A', paddingHorizontal: 12, fontFamily: fonts.PRe, fontSize: 12, color: '#222222', marginTop: 20 }}
//                         maxLength={50}
//                     />
//                     <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: '#7B7B7B', marginTop: 5 }}>50 characters maximum</Text>
//                     <TouchableOpacity
//                         onPress={() => {
//                             createWishList();
//                             // setWishList([1]);
//                             setCreateWishListModal(false)
//                         }}
//                         style={{ width: 107, height: 36, backgroundColor: '#5B4DBC', borderRadius: 25, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 100 }}>
//                         <Text style={{ fontFamily: fonts.PSBo, fontSize: 12, color: '#FFFFFF', }}>Create</Text>
//                     </TouchableOpacity>
//                 </View>


//             </ReactNativeModal>


//         </View >
//     )
// }


// const styles = StyleSheet.create({
//     shadow: {
//         shadowColor: 'rgba(0, 0, 0, 0.8)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 0, shadowOpacity: 0, elevation: 5,
//         backgroundColor: 'white'
//     },
// })

// export default WhishList

