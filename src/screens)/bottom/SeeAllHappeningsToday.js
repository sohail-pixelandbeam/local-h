import React, { useState } from 'react'
import { StatusBar, SafeAreaView, View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { goBack, navigate } from '../../../Navigations';
import { BackIcon, HeartWhiteIcon } from '../../components/Svgs';
import { fonts } from '../../constants/fonts';
import Loader from '../../utils/Loader';


var alertRef;

const SeeAllHappeningsToday = (props) => {

    const allHappeningsToday = props?.route?.params.params;
    const [loading, setLoading] = useState(false)

    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff', flex: 1, }}>

            <StatusBar
                barStyle={"dark-content"}
                // // translucent={false}
                backgroundColor={"white"}
            />
            <DropdownAlert ref={(ref) => alertRef = ref} />
            {loading && <Loader />}

            <View style={{ width: "85%", alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ padding: 10 }}>
                        <BackIcon color="#5B4DBC" />
                    </TouchableOpacity>
                    {/* <Image
                        source={{ uri: state.profileData?.profileImage }}
                        style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                    /> */}
                </View>

                <View style={{ marginTop: 10, }}>
                    <Text style={[{ fontFamily: fonts.PSBo, fontSize: 21, color: '#FFA183' }]}>Happening Today</Text>
                </View>
            </View>

            <View style={{ width: "90%", alignSelf: 'center', flex: 1 }}>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    numColumns={2}
                    data={allHappeningsToday}
                    contentContainerStyle={{ paddingBottom: 200 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigate('HappeningDetails', item)}
                                style={{ width: "50%", marginRight: 10, marginTop: 20 }}>
                                <Image
                                    source={{ uri: item?.addPhotosOfYourHappening[0] }}
                                    style={styles.listImg}
                                />
                                <TouchableOpacity
                                    onPress={() => navigate(true)}
                                    style={{ position: 'absolute', top: 10, right: 5, padding: 10 }}>
                                    <HeartWhiteIcon color="rgba(0,0,0,0.2)" />
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                    {
                                        [1, 2, 3, 4, 5].map((v, i) => (
                                            <View key={i} style={index == 4 ? styles.ratingCircleInActive : styles.ratingCircleActive}></View>
                                        ))
                                    }
                                    <Text style={styles.ratingsText}>34 Ratings</Text>
                                </View>
                                <Text style={styles.listTile}>{item?.happeningTitle}</Text>
                                <Text style={styles.distanceText}>{item?.distance}</Text>
                            </TouchableOpacity>
                        )
                    }}

                />


            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    listImg: {
        width: "100%", height: 231, borderRadius: 25, resizeMode: 'stretch',
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


