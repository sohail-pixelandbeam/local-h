import React from 'react'
import { StatusBar, View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, } from 'react-native'
import { goBack } from '../../../../Navigations'
import { BackIcon, RequestSubmittedSvg } from '../../../components/Svgs'
import { fonts } from '../../../constants/fonts'

const AwaitingFellows = (props) => {
    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff', flex: 1, }}>
            <StatusBar
                barStyle={"dark-content"}
                // // translucent={false}
                backgroundColor={"white"}
            />
            <View style={{ width: "90%", alignSelf: 'center' }}>
                <TouchableOpacity
                    onPress={() => goBack()}
                    style={{ marginTop: 20 }} >
                    <BackIcon
                        color={"#5A4CBB"}
                    />
                </TouchableOpacity>
                <Text style={[styles.heading, { marginTop: 30 }]}>This happening is awaiting 4 more fellows to start.</Text>
                <Text style={{ fontSize: 29, fontFamily: fonts.PBo, color: '#5B4DBC', }}>You can invite your friends to join! </Text>
                <View style={{ marginTop: 30 }}>
                    <TextInput
                        placeholder='Search for Fellows to share the happening'
                        // ref={(ref) => textInputRef = ref}
                        placeholderTextColor={"#7b7b7b"}
                        // onChangeText={(v) => setSkill(v)}
                        style={{
                            width: "100%", height: 47, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
                            fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            // if (skill.length > 1) {
                            // textInputRef.clear();
                            // doMakeSkills()
                            // }

                        }}
                        style={{ position: 'absolute', padding: 10, bottom: -5, right: 0 }}>
                        <Text style={{ fontSize: 34, color: '#241414', fontFamily: fonts.MRe, }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: "85%", alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 50,alignItems:'center' }}>
                <TouchableOpacity
                    style={{ width: 116, height: 31, backgroundColor: '#5B4DBC', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
                >
                    <Text style={{ color: '#FFFFFF', fontFamily: fonts.PSBo, fontSize: 9 }}>share happening</Text>
                </TouchableOpacity>
                <Text style={{ color: '#5B4DBC', fontFamily: fonts.PSBo, fontSize: 10, textDecorationLine: 'underline' }}>cancel join request</Text>
            </View>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    heading: {
        color: '#ffa183', fontFamily: fonts.PBo, fontSize: 29, marginTop: 20,
    },
    chooseBtn: {
        width: "20%", alignItems: 'center', justifyContent: 'center', height: 23.48, borderRadius: 18, backgroundColor: '#5B4DBC',
        alignSelf: 'center'
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.8)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 0, shadowOpacity: 0, elevation: 5,
        backgroundColor: 'white'
    },

})
export default AwaitingFellows
