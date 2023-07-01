import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { } from 'react-native-gesture-handler';
import { navigate } from '../../../Navigations';
import { RattingStartIcon } from '../../components/Svgs';
import { fonts } from '../../constants/fonts';
import ImageSliderModal from '../../components/ImageSliderModal';

const ProfileTab = (props) => {

    const [tabs, setTabs] = useState('host');
    const item = props.data;
    const photos = Array.isArray(item?.userHappeningPhotos) ? item?.userHappeningPhotos[0]?.addPhotosOfYourHappening ?? [] : [];

    const [imageSliderModal, setImageSliderModal] = useState(false);
    const [initialSliderIndex, setInitialSliderIndex] = useState(false);


    return (
        <View style={{ flex: 1, }}>

            <View style={[styles.shadow, { backgroundColor: 'white', width: "100%", borderRadius: 12, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 20, marginTop: 10, }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
                    <Text style={[styles.aboutHeading, { marginTop: 0 }]}>Bio</Text>
                    <TouchableOpacity onPress={() => props?.onPressEdit()}>
                        <Text style={{ fontFamily: fonts.PBo, fontSize: 15, color: '#5A4CBA', textDecorationLine: 'underline' }}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.aboutDesc}>{item?.userProfile?.bio}</Text>
                <Text style={styles.aboutHeading}>Skills</Text>
                <Text style={styles.aboutDesc}>{item?.userProfile?.addSkills?.toString()}</Text>
                <Text style={styles.aboutHeading}>Works as</Text>
                <Text style={styles.aboutDesc}>{item?.userProfile?.profession}</Text>
                <Text style={styles.aboutHeading}>Languages Known</Text>
                <Text style={styles.aboutDesc}>{item?.userProfile?.LanguagesKnown?.toString()}</Text>
            </View>
            {/* <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                <Text style={styles.heading}>Reviews</Text>
                <View style={{ flexDirection: 'row', width: "50%", alignSelf: 'center', backgroundColor: '#EEEEEE', borderRadius: 40 }}>
                    <TouchableOpacity
                        onPress={() => setTabs('host')}
                        style={{ width: "49%", height: 23, backgroundColor: tabs == 'host' ? '#5B4DBC' : '#EEEEEE', justifyContent: 'center', alignItems: 'center', borderRadius: 40 }}>
                        <Text style={{ fontFamily: fonts.MSBo, fontSize: 8, color: tabs == 'host' ? '#FFFFFF' : '#222' }}>As Host</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setTabs('fellow')}
                        style={{ width: "49%", height: 23, backgroundColor: tabs == 'fellow' ? '#5B4DBC' : '#EEEEEE', justifyContent: 'center', alignItems: 'center', borderRadius: 40 }}>
                        <Text style={{ fontFamily: fonts.MSBo, fontSize: 8, color: tabs == 'fellow' ? '#FFFFFF' : '#222' }}>As Fellow</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RattingStartIcon style={{ marginTop: -4 }} />
                <Text style={{ fontFamily: fonts.PBo, fontSize: 14, color: '#F65997', marginLeft: 5 }}>4.8 </Text>
                <Text style={{ fontFamily: fonts.PMe, fontSize: 12, color: '#5D5760', marginLeft: 8 }}>68 reviews</Text>
            </View> */}

            {/* {tabs !== 'fellow' &&
                [{ rattings: 4.8, width: "70%", text: "Communication" }, { rattings: 3.2, width: "60%", text: "Punctuality" }, { rattings: 4.1, width: "65%", text: "Interaction" }, { rattings: 3.8, width: "62%", text: "Friendliness" }]
                    .map((v, i) => (
                        <View
                            key={i}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RattingStartIcon color="#5B4DBC" style={{ marginTop: -4 }} />
                            <Text style={{ fontFamily: fonts.PBo, fontSize: 13, color: '#5B4DBC', marginLeft: 5, width: "7%" }}>{v.rattings}</Text>
                            <View style={{ width: "45%", height: 7, borderWidth: 1, borderColor: '#707070', borderRadius: 4, marginLeft: 10 }}>
                                <View style={{ width: v.width, backgroundColor: '#5B4DBC', height: "100%", alignItems: 'center', justifyContent: 'center', borderRadius: 4, }}></View>
                            </View>
                            <Text style={{ fontFamily: fonts.PBo, fontSize: 14, color: '#5D5760', marginLeft: 10 }}>{v.text}</Text>
                        </View>
                    ))
            } */}


            {/* <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                <Image
                    style={{}}
                    source={require('../../static_assets/peopleJoinedImages.png')}
                />
                <TouchableOpacity
                    onPress={() => navigate('ViewAllReviews')}
                    style={{ width: "32%", height: 23, borderWidth: 1, borderColor: '#707070', justifyContent: 'center', alignItems: 'center', borderRadius: 40 }}>
                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 8, color: '#5B4DBC' }}>show all 68 reviews</Text>
                </TouchableOpacity>
            </View> */}

            {/* <View style={{ flexDirection: 'row' }}>
                <View style={{ width: "80%", borderRadius: 12, borderWidth: 1, borderRadius: 20, borderColor: '#707070', padding: 10, paddingRight: 15, flexDirection: 'row', marginTop: 20 }}>
                    <Image
                        source={require('../../static_assets/p6.png')}
                    />
                    <View style={{ width: "81%", marginLeft: 10, }}>
                        <Text style={{ fontFamily: fonts.PMe, fontSize: 14, color: '#5D5760', }}>What a cool project this was. We spent 6 hours on and in the ocean, in the</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <RattingStartIcon width={12} height={11} style={{ marginTop: -4 }} />
                                <Text style={{ fontFamily: fonts.PBo, fontSize: 9, color: '#F65997', marginLeft: 5 }}>4.8 </Text>
                            </View>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 12, color: '#5A4CBA', }}>View Replies</Text>
                        </View>
                    </View>
                </View>
            </View> */}

            <Text style={styles.heading}>Photos</Text>
            <View style={{ flexDirection: 'row', width: "100%" }}>
                <View style={{ width: "60%", flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                    {
                        // [require('../../static_assets/p2.png'), require('../../static_assets/p3.png'), require('../../static_assets/p3.png'), require('../../static_assets/p2.png')].
                        photos?.map((v, i) => {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    style={{ width: "40%" }}
                                    onPress={() => {
                                        setInitialSliderIndex(i);
                                        setImageSliderModal(true)
                                    }}>
                                    <Image

                                        style={{ width: "100%", marginLeft: 5, height: 120, aspectRatio: 2 / 2, marginTop: 10, borderRadius: 10 }}
                                        source={{ uri: v }}
                                    />
                                </TouchableOpacity>
                            )
                        })

                    }
                </View>
            </View>

            <ImageSliderModal
                data={photos}
                isVisible={imageSliderModal}
                initialScrollIndex={initialSliderIndex}
                onClose={() => setImageSliderModal(false)}
            />



        </View>

    )
}




const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.4)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 0, shadowOpacity: 0, elevation: 5,
        backgroundColor: 'white'
    },
    aboutHeading: {
        fontFamily: fonts.PBo, fontSize: 15, color: '#ffa183', marginTop: 10
    },
    aboutDesc: {
        fontFamily: fonts.PRe, fontSize: 11, color: '#5D5760', lineHeight: 25
    },
    heading: {
        fontFamily: fonts.PSBo, fontSize: 16, color: '#ffa183', marginTop: 10
    }
})

export default ProfileTab

