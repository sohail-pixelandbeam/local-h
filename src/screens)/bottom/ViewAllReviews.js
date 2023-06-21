import React, { useState } from 'react'
import { SafeAreaView, StatusBar, View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import { goBack } from '../../../Navigations';
import { BackIcon, RattingStartIcon, SearchIcon } from '../../components/Svgs'
import { fonts } from '../../constants/fonts';

const ViewAllReviews = () => {

    const [tabs, setTabs] = useState('host');

    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor={"white"}
            />
            <View style={{ flexDirection: 'row', width: "92%", alignSelf: 'center', marginTop: 20 }}>
                <TouchableOpacity
                    onPress={() => goBack()}
                    style={{ padding: 10 }}>
                    <BackIcon color="#000" />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', width: "60%", alignSelf: 'center', backgroundColor: '#EEEEEE', borderRadius: 40, alignSelf: 'center' }}>
                <TouchableOpacity
                    onPress={() => setTabs('host')}
                    style={{ width: "49%", height: 30, borderWith: 1, borderColor: '#707070', backgroundColor: tabs == 'host' ? '#5B4DBC' : '#EEEEEE', justifyContent: 'center', alignItems: 'center', borderRadius: 40 }}>
                    <Text style={{ fontFamily: fonts.MSBo, fontSize: 9, color: tabs == 'host' ? '#FFFFFF' : '#222' }}>As Host</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setTabs('fellow')}
                    style={{ width: "49%", height: 30, borderWith: 1, borderColor: '#707070', backgroundColor: tabs == 'fellow' ? '#5B4DBC' : '#EEEEEE', justifyContent: 'center', alignItems: 'center', borderRadius: 40 }}>
                    <Text style={{ fontFamily: fonts.MSBo, fontSize: 9, color: tabs == 'fellow' ? '#FFFFFF' : '#222' }}>As Fellow</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "90%", marginTop: 20, alignSelf: 'center', }}>
                <TextInput
                    style={{ height: 35, borderWidth: 3, borderColor: '#B9B1F0', borderRadius: 22, paddingHorizontal: 15, color: '#5D5760', fontFamily: fonts.PRe, fontSize: 10, paddingLeft: 40, }}
                    placeholder="search reviews"
                    placeholderTextColor={"#5D5760"}
                />
                <TouchableOpacity style={{ position: 'absolute', left: 15, top: 8, }}>
                    <SearchIcon width={12} height={12} color="#5D5760" />
                </TouchableOpacity>
            </View>
            <View style={{ width: "90%", alignSelf: 'center', marginTop: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <RattingStartIcon style={{ marginTop: -4 }} />
                    <Text style={{ fontFamily: fonts.PBo, fontSize: 14, color: '#F65997', marginLeft: 5 }}>4.8 </Text>
                    <Text style={{ fontFamily: fonts.PMe, fontSize: 12, color: '#5D5760', marginLeft: 8 }}>68 reviews</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    {tabs !== 'fellow' &&
                        [{ rattings: 4.8, width: "70%", text: "Communication" }, { rattings: 3.2, width: "60%", text: "Punctuality" }, { rattings: 4.1, width: "65%", text: "Interaction" }, { rattings: 3.8, width: "62%", text: "Friendliness" }]
                            .map((v, i) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RattingStartIcon color="#5B4DBC" style={{ marginTop: -4 }} />
                                    <Text style={{ fontFamily: fonts.PBo, fontSize: 13, color: '#5B4DBC', marginLeft: 5, width: "7%" }}>{v.rattings}</Text>
                                    <View style={{ width: "45%", height: 7, borderWidth: 1, borderColor: '#707070', borderRadius: 4, marginLeft: 10 }}>
                                        <View style={{ width: v.width, backgroundColor: '#5B4DBC', height: "100%", alignItems: 'center', justifyContent: 'center', borderRadius: 4, }}></View>
                                    </View>
                                    <Text style={{ fontFamily: fonts.PBo, fontSize: 14, color: '#5D5760', marginLeft: 10 }}>{v.text}</Text>
                                </View>
                            ))
                    }
                </View>

                <View>
                    <View style={{ borderWidth: 1, borderRadius: 20, borderColor: '#707070', padding: 10, paddingRight: 15, marginTop: 20, paddingBottom: 30, }}>
                        <View style={{ width: "80%", borderRadius: 12, flexDirection: 'row' }}>
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

                                </View>

                            </View>
                        </View>
                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 12, color: '#5A4CBA', alignSelf: 'flex-end', marginTop: 20 }}>Reply</Text>
                        <TextInput
                            textAlignVertical='top'
                            multiline={true}
                            style={{ width: "100%", padding: 15, borderWidth: 1, borderColor: '#707070', height: 103, borderRadius: 20, }}
                        />
                    </View>

                </View>

            </View>

        </SafeAreaView>
    )
}

export default ViewAllReviews
