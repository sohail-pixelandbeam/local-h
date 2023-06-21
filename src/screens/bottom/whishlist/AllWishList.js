import React, { useContext, useState } from 'react'
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, StatusBar } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { goBack, navigate, navigateFromStack } from '../../../../Navigations';
import { BackIcon, HeartWhiteIcon, TrashIcon } from '../../../components/Svgs'
import { fonts } from '../../../constants/fonts'
import { Context } from '../../../Context/DataContext';
import Loader from '../../../utils/Loader';
import GeneralStatusBar from '../../../components/GernalStatusBar';
import { acolors } from '../../../constants/colors';
import { apiRequest } from '../../../utils/apiCalls';
import AlertMsg from '../../../common/AlertMsg';


var alertRef;
const AllWishList = ({ route }) => {

    const [loading, setLoading] = useState(false);
    const [whishlist, setWhishList] = useState(route.params);

    const [isDeletedModal, setIsDeleteModal] = useState(false);
    const [deletedId, setDeletedId] = useState('');

    const { state } = useContext(Context);


    function getWhishListsDetails() {
        apiRequest({ wishlistId: whishlist._id }, 'wishlist/view-wishlist-details', 'POST')
            .then(data => {
                setLoading(false);
                if (data.status == true) {
                    setWhishList(data.data)
                }
                else {
                    alertRef.alertWithType('error', 'Error', data.message);
                    return
                }

            })
    }

    function doDel(id) {
        setLoading(true)
        const body = {
            wishlistId: whishlist._id,
            happeningId: id ?? deletedId
        }
        apiRequest(body, 'wishlist/reomve-single-wishlist-item',)
            .then(data => {
                getWhishListsDetails();
                if (data.status == true) {
                    alertRef.alertWithType('success', 'Deleted')
                }
                else {
                    alertRef.alertWithType('error', 'Error', data.message);
                    return
                }

            })
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <AlertMsg
                heading={"Are you sure you want to delete the wishlist ?"}
                isCross={false}
                desc=""
                renderBtn={false}
                // descStyle={{ lineHeight: 22, color: '#5D5760', fontFamily: fonts.PSBo }}
                btnTitle="Done"
                state={isDeletedModal}
                onBackdropPress={() => setIsDeleteModal(false)}
                onPress={() => setIsDeleteModal(false)}
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
                                // setDeletedId(v._id);
                                // setIsDeleteModal(true)
                                setIsDeleteModal(false)
                                doDel();
                                
                            }}
                        >
                            <Text style={[styles.popupBtnTitle, { color: '#5B4DBC' }]}>{"Yes"}</Text>
                        </TouchableOpacity>

                    </View>
                )
                }
            />



            <GeneralStatusBar backgroundColor='white' />
            <DropdownAlert ref={(ref) => alertRef = ref} />
            {loading && <Loader />}


            <View style={{ width: "85%", alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-between', }}>
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

                <View style={{ marginTop: 20, }}>
                    <Text style={[{ fontFamily: fonts.PRe, fontSize: 21, color: '#22222' }]}>{whishlist.wishlistName}</Text>
                    <Text style={[{ fontFamily: fonts.PMe, fontSize: 21, color: '#FFA183', marginTop: 0 }]}>Wishlist</Text>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 200 }} >
                <View style={{ width: "85%", alignSelf: 'center', }}>



                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', justifyContent: 'space-between', marginTop: 20 }}>

                        {/* {
                            [{ img: require('../../../assets/bg_color.png'), title: "Maintenance of Olive Trees", distance: "5 Miles Away" }, { img: require('../../../assets/bg_color-2.png'), title: "Help to make sanitation pads for school girls", distance: 'Dusseldorf, Germany' }]
                                .map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => navigate('BookingStack')}
                                        style={{ width: "48%", }}>
                                        <Image
                                            source={item.img}
                                            style={styles.listImg}
                                        />
                                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 5, padding: 10 }}>
                                            <HeartWhiteIcon />
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                            {
                                                [1, 2, 3, 4, 5].map((v, i) => (
                                                    <View style={i == 4 ? styles.ratingCircleInActive : styles.ratingCircleActive}></View>
                                                ))
                                            }
                                            <Text style={styles.ratingsText}>34 Ratings</Text>
                                        </View>
                                        <Text style={styles.listTile}>{item.title}</Text>
                                        <Text style={styles.distanceText}>{item.distance}</Text>
                                    </TouchableOpacity>
                                ))
                        } */}





                    </View>
                </View>

                <View style={{ width: "85%", alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%", justifyContent: 'space-between', marginTop: 10 }}>

                        {
                            // [{ img: require('../../assets/bg_color.png'), title: "Maintenance of Olive Trees", distance: "5 Miles Away" }, { img: require('../../assets/bg_color-2.png'), title: "Help to make sanitation pads for school girls", distance: 'Dusseldorf, Germany' }]
                            whishlist.happeningId?.map((item, index) => {
                                // if (index > 1) return;
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => navigateFromStack('BookingStack', 'HappeningDetails', item)}
                                        style={{ width: "48%", }}>
                                        <Image
                                            source={{ uri: item.addPhotosOfYourHappening[0] }}
                                            style={styles.listImg}
                                        />

                                        <TouchableOpacity
                                            onPress={() => {
                                                setDeletedId(item._id);
                                                setIsDeleteModal(true)

                                                // doDel(item._id);
                                            }}
                                            style={{ position: 'absolute', top: 5, right: 5, padding: 10, }}>
                                            <TrashIcon width={30} height={20} color={'white'} />
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity
                                        onPress={() => {
                                            console.log('item._id', item._id)
                                            setWhishListHappeningId(item._id)
                                            setCreateWishListModal(true)
                                        }}
                                        style={{ position: 'absolute', top: 10, right: 5, padding: 10 }}>
                                        <HeartWhiteIcon color="rgba(0,0,0,0.8)" />
                                    </TouchableOpacity> */}
                                        {/* <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                            {
                                                [1, 2, 3, 4, 5].map((v, i) => (
                                                    <View style={i == 4 ? styles.ratingCircleInActive : styles.ratingCircleActive}></View>
                                                ))
                                            }
                                            <Text style={styles.ratingsText}>34 Ratings</Text>
                                        </View> */}
                                        <Text style={styles.listTile}>{item.happeningTitle}</Text>
                                        <Text style={styles.distanceText}>{item.distance}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>

                    {/* <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                        <Text style={styles.headingText}>Happening Nearby</Text>
                        <TouchableOpacity style={{ padding: 10 }} >
                            <Text style={styles.seeAll}>See all</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', justifyContent: 'space-between' }}>

                        {/* {
                            [
                                { img: require('../../../assets/bg_color.png'), title: "Maintenance of Olive Trees", distance: "5 Miles Away" },
                                { img: require('../../../assets/bg_color-2.png'), title: "Help to make sanitation pads for school girls", distance: 'Dusseldorf, Germany' }
                            ]
                                .map((item, index) => (
                                    <View style={{ width: "48%", }}>
                                        <Image
                                            source={item.img}
                                            style={styles.listImg}
                                        />
                                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 5, padding: 10 }}>
                                            <HeartWhiteIcon />
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                            {
                                                [1, 2, 3, 4, 5].map((v, i) => (
                                                    <View style={i == 4 ? styles.ratingCircleInActive : styles.ratingCircleActive}></View>
                                                ))
                                            }
                                            <Text style={styles.ratingsText}>34 Ratings</Text>
                                        </View>
                                        <Text style={styles.listTile}>{item.title}</Text>
                                        <Text style={styles.distanceText}>{item.distance}</Text>
                                    </View>
                                ))
                        } */}






                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    listImg: {
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
        color: '#5d5760', fontFamily: fonts.PMe, fontSize: 13, marginTop: 5
    },
    distanceText: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10, color: '#5d5760', fontFamily: fonts.PMe, fontSize: 6, letterSpacing: 0.3,
    },

    popupBtn: {
        width: "30%", height: 34, borderRadius: 20, backgroundColor: '#5b4dbc',
        alignItems: 'center', justifyContent: 'center'
    },
    popupBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },

})

export default AllWishList
