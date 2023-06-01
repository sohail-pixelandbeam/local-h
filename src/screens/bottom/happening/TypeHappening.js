import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList } from 'react-native'
import { navigate } from '../../../../Navigations'
import HappeningHeader from '../../../common/HappeningHeader'
import { BackIcon, HappeningLocationIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, OnlineHappeningIcon, RELIABLENONPROFITS, SUPPORTICON, WELFAREICON } from '../../../components/Svgs'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import GeneralStatusBar from '../../../components/GernalStatusBar'
import { retrieveItem } from '../../../utils/functions'
import AlertMsg from '../../../common/AlertMsg'
import HappeningStep from '../../../common/HappeningStep'

const TypeHappening = () => {

    const [isGuest, setIsGuest] = React.useState(false);
    const [loginModal, setLoginModal] = useState(false);

    const conditionArr = [
        {
            Svg: HappeningLocationIcon, title: "Happening on location", desc: "Connect with fellows in a geographical location",
            navigate: 'MainScreenL'
            // 'GroupSizeHappeningL'
        },
        {
            Svg: OnlineHappeningIcon, title: "Online/Remote Happening", desc: "Organize an online get-together using Zoom, Team, and so on. Or ask a friend to assist you from a distant location.",
            navigate: 'MainScreenO'
        },


    ]

    useEffect(() => {
        retrieveItem('login_data')
            .then(data => {
                if (!data) {
                    setIsGuest(true)
                }
            })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <GeneralStatusBar />

            <AlertMsg

                headingStyle={{ color: acolors.primary, fontSize: 24 }}
                heading={"Please Log in to\nSubmit a happening"}
                desc=""
                // renderBtn={false}
                // descStyle={{ lineHeight: 22, color: '#5D5760', fontFamily: fonts.PSBo }}
                btnTitle="Login"
                state={loginModal}
                onBackdropPress={() => setLoginModal(false)}
                onPress={() => {
                    setLoginModal(false);
                    navigate('AuthStack');

                }}
                containerStyle={{ paddingHorizontal: 25, paddingBottom: 80, paddingTop: 10 }}

            // children={(
            //     <View style={{ flexDirection: 'row', width: "100%", marginTop: 0, justifyContent: 'space-between' }}>
            //         <TouchableOpacity
            //             style={[styles.popupBtn]}
            //             // onPress={() => setConfirmSignOut(false)}
            //         >
            //             <Text style={styles.popupBtnTitle}>{"Sign up"}</Text>
            //         </TouchableOpacity>
            //         <TouchableOpacity
            //             style={[styles.popupBtn, { borderWidth: 1, borderColor: '#5B4DBC', backgroundColor: 'white' }]}
            //             onPress={() => {
            //                 // storeItem('login_data', '');
            //                 // storeItem('profile_data', '');
            //                 // changeLoggedIn.changeNow(2);
            //             }}
            //         >
            //             <Text style={[styles.popupBtnTitle, { color: '#5B4DBC' }]}>{"Login"}</Text>
            //         </TouchableOpacity>

            //     </View>
            // )
            // }

            />

            <HappeningHeader
                imageStyle={{ marginTop: -20 }}
                imageUrl={require('../../../assets/thingsConsiderHeaderImg.png')}
                heading={"What’s the type of\nyour happening ?"}
                desc={"Specify whether the happening is in a physical location or online."}
            />

            <View style={styles.contentContainer}>
                <FlatList
                    data={conditionArr}
                    contentContainerStyle={{ paddingBottom: 550 }}
                    renderItem={({ item, index }) => {
                        let Icon = item.Svg
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    if (isGuest) {
                                        setLoginModal(true);
                                        return;
                                    }
                                    navigate(item.navigate)
                                }}
                                style={styles.content}>
                                <View style={{ width: "20%" }}>
                                    <Icon />
                                </View>
                                <View style={{ width: "69%" }}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.desc}>{item.desc}</Text>
                                </View>
                                <View>
                                    <NextIcon />
                                </View>
                            </TouchableOpacity>


                        )
                    }}

                />


            </View>

            <HappeningStep
                showStep={false}
                next={false}
                onPress={() => navigate('CC3')}
                
            />
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#FDFDFD',
        width: "100%", borderTopRightRadius: 30, borderTopLeftRadius: 30,
        marginTop: -30, paddingTop: 20, paddingHorizontal: 25
    },
    content: {
        width: "100%", paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'white', elevation: 5, marginTop: 15,
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
    },
    title: {
        fontFamily: fonts.MBo, fontSize: 14, color: '#2A2A2A', lineHeight: 15,
    },
    desc: {
        color: '#161615', fontFamily: fonts.MRe, fontSize: 10, marginTop: 5
    },
    agreeBtn: {
        width: "100%", position: 'absolute', bottom: 50, height: 70,
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 30, alignItems: 'center', justifyContent: 'flex-end',
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        elevation: 5
    },
    popupBtn: {
        width: "49%", height: 29, borderRadius: 20, backgroundColor: '#5b4dbc',
        alignItems: 'center', justifyContent: 'center'
    },

})

export default TypeHappening
