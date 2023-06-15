import React from 'react'
import { StatusBar, View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ScrollView, Linking, Platform, } from 'react-native'
import { goBack, navigate } from '../../../../Navigations'
import { BackIcon, ChatIcon, DirectionArrow, MarkerIcon1, RequestSubmittedSvg } from '../../../components/Svgs'
import { fonts } from '../../../constants/fonts'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker } from 'react-native-svg'
import { acolors } from '../../../constants/colors'

const ConfirmHappeningStatus = (props) => {


    const params = props.route.params.params ?? {};
    const happeningDetail = params.booking?.happeningId ?? {};
    const fellows = params?.fellow;

    console.log('params___', params.booking)



    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <StatusBar
                barStyle={"dark-content"}
                // // translucent={false}
                backgroundColor={"white"}
            />
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ padding: 20 }} >
                <BackIcon
                    color={"#5A4CBB"}
                />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ paddingBottom: 150 }} >
                <View style={{ width: "90%", alignSelf: 'center' }}>

                    <Text style={[styles.heading, { marginTop: 20, lineHeight: 35, color: '#ffa183' }]}>Upcoming{"\n"}Happening</Text>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <Image
                            source={{ uri: happeningDetail?.addPhotosOfYourHappening[0] }}
                            style={{ width: '49%', height: 230, borderRadius: 10, }}
                        />
                        {
                            happeningDetail?.happeningOnline ?
                                <View
                                    style={[styles.shadow, { width: '49%', height: 230, borderRadius: 10, backgroundColor: '#675AC1' }]}
                                >

                                    <>
                                        <View style={{ height: 40, justifyContent: 'center' }}>
                                            <Text style={{ fontFamily: fonts.PBo, fontSize: 15, color: 'white', marginLeft: 10, }}>Meet Details</Text>
                                        </View>
                                        <View style={{ height: 195, backgroundColor: 'white', padding: 10, marginTop: -5, borderRadius: 10 }}>
                                            <Text style={styles.meetDetailsHeadings}>Software :</Text>
                                            <Text style={styles.meetDetailsLables}>{happeningDetail?.howWillYouCommunicateWithFellows}</Text>
                                            <Text style={styles.meetDetailsHeadings}>link :</Text>
                                            <Text style={styles.meetDetailsLables}>{happeningDetail?.onlineMeetingLink}</Text>
                                            <Text style={styles.meetDetailsHeadings}>Things to bring :</Text>
                                            <Text style={styles.meetDetailsLables}>{happeningDetail?.whatDoTheFellowsNeedToBringToJoinThisOnlineHappening}</Text>
                                        </View>
                                    </>
                                </View>
                                : <View
                                    style={[styles.shadow, { flex: 1, width: '49%', height: 230, borderRadius: 10, backgroundColor: '#675AC1', marginLeft: 10 }]}
                                >


                                    <View
                                        pointerEvents='none'
                                        style={{ flex: 1, alignSelf: 'center', width: '100%', height: 230, borderRadius: 10, overflow: 'hidden', }}>
                                        <MapView
                                            ref={ref => map = ref}
                                            showsUserLocation={false}
                                            showsMyLocationButton={false}
                                            region={{
                                                latitude: happeningDetail?.location?.coordinates[0] ?? 0,
                                                longitude: happeningDetail?.location?.coordinates[1] ?? 0,
                                                latitudeDelta: 0.01,
                                                longitudeDelta: 0.01,
                                                locationTitle: ''
                                            }}
                                            provider={PROVIDER_GOOGLE}
                                            userLocationAnnotationTitle={null}
                                            style={{ width: '100%', height: '100%', }}
                                        // onPress={() => setIsCalloutModal(false)}
                                        >

                                            <Marker
                                                coordinate={{
                                                    latitude: happeningDetail?.location?.coordinates[0] ?? 0,
                                                    longitude: happeningDetail?.location?.coordinates[1] ?? 0,
                                                    latitudeDelta: 1,
                                                    longitudeDelta: 1,
                                                }}
                                                pinColor={acolors.primary}
                                                description="custom"
                                                onPress={() => {
                                                    // setIsCalloutModal(true)
                                                    // setCalloutParams(v)
                                                }}

                                            >
                                                <MarkerIcon1 style={{ width: 200, height: 200 }} />
                                                {/* <Text style={{ color: '#121212', fontSize: 10, fontFamily: fonts.PBo, }}>{v.title}</Text> */}
                                            </Marker>

                                        </MapView>
                                    </View>

                                    <View style={{ backgroundColor: 'white', position: 'absolute', bottom: 0, width: "100%", borderRadius: 10, padding: 10 }}>


                                        <Text style={{ color: acolors.primaryLight, fontSize: 15, fontFamily: fonts.PBo }}>Meet at</Text>
                                        <Text style={{ color: '#222222', fontSize: 10, fontFamily: fonts.PRe, marginTop: 2 }}>{happeningDetail?.conformHappeningLocation}</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                                                const latLng = `${happeningDetail?.location?.coordinates[0]},${happeningDetail?.location?.coordinates[1]}`;
                                                const label = happeningDetail?.happeningTitle;
                                                const url = Platform.select({
                                                    ios: `${scheme}${label}@${latLng}`,
                                                    android: `${scheme}${latLng}(${label})`
                                                });
                                                Linking.openURL(url);
                                            }}
                                            style={{ position: 'absolute', top: 10, right: 10 }}
                                        >
                                            <DirectionArrow width={12} height={12} />

                                        </TouchableOpacity>


                                    </View>

                                </View>
                        }

                    </View>
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 13, color: '#5D5760', marginTop: 10 }}>{happeningDetail?.happeningTitle}</Text>
                    <Text style={[styles.heading, { marginTop: 10 }]}>Fellows</Text>
                    {/* <Text style={{ fontFamily: fonts.PBo, fontSize: 12, color: '#626161', marginTop: 0 }}>{fellows?.length} Fellows</Text> */}
                    {
                        fellows.length && fellows.map((v, i) => {
                            return (
                                <>

                                    <View style={[styles.shadow, { width: '100%', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, marginTop: 10 }]}>
                                        <Image
                                            style={{ width: 42, height: 42, borderRadius: 42 / 2 }}
                                            source={{ uri: v?.profileAndTimeline?.profileImage }}
                                        />
                                        <Text style={{ fontFamily: fonts.PBo, fontSize: 12, color: "#2A2A2A", marginLeft: 10 }}>{v?.profileAndTimeline?.userId?.firstName} {v?.profileAndTimeline?.userId?.lastName} </Text>
                                    </View>
                                </>
                            )
                        })

                    }



                </View>
            </ScrollView>
            <View style={[styles.shadow, { width: "100%", alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0, alignItems: 'center', paddingVertical: 20, paddingHorizontal: 20, borderTopRightRadius: 15, borderTopLeftRadius: 15 }]}>
                <View
                    style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <ChatIcon />
                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 16, color: '#5B4DBC', marginLeft: 10 }}>Chat with{"\n"}host</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigate('BookingCancelling', {
                        params: happeningDetail,
                        cancelRoute: 'booking',
                        bookingId: params.booking._id
                    })}
                >
                    <Text style={{ color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 10, textDecorationLine: 'underline' }}>cancel booking</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    heading: {
        color: '#675AC1', fontFamily: fonts.PBo, fontSize: 29, marginTop: 20,
    },
    chooseBtn: {
        width: "20%", alignItems: 'center', justifyContent: 'center', height: 23.48, borderRadius: 18, backgroundColor: '#5B4DBC',
        alignSelf: 'center'
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.8)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 0, shadowOpacity: 0, elevation: 5,
        backgroundColor: 'white'
    },
    meetDetailsHeadings: {
        fontFamily: fonts.PBo, fontSize: 12, color: '#675AC1', marginTop: 5
    },
    meetDetailsLables: {
        fontFamily: fonts.PBo, fontSize: 12, color: '#626161', marginTop: 0
    }

})
export default ConfirmHappeningStatus
