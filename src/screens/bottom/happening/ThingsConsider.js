import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, Platform, ScrollView } from 'react-native'
import { navigate } from '../../../../Navigations'
import HappeningHeader from '../../../common/HappeningHeader'
import { BackIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, RELIABLENONPROFITS, SUPPORTICON, WELFAREICON } from '../../../components/Svgs'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import { Context } from '../../../Context/DataContext'
import { apiRequest } from '../../../utils/apiCalls'
import Loader from '../../../utils/Loader'
import GeneralStatusBar from '../../../components/GernalStatusBar'
import { retrieveItem } from '../../../utils/functions'
import AlertMsg1 from '../../../common/AlertMsg1'

const ThingsConsider = () => {



    const { setHappeningSubmissionDataGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [isGuest, setIsGuest] = React.useState(false);





    const conditionArr = [
        { title: "NGOs & LOCAL COMMUNITIES", desc: "Representatives of local communities and small NPOs worldwide have free access to upload their projects. NPOs with larger donor networks and fanbases are invited to contact us for a service partnership." },
        { title: "RELIABILITY", desc: "We accept projects of reliable NPOs and hosts. Prior to publishing a happening, we conduct desk and field research." },
        { title: "WELFARE VULNERABLE GROUPS", desc: "The welfare of children, animals and other vulnerable groups is unquestioned. Projects involving these groups must be represented and supervised by trusted organizations/hosts. Orphanages are not admitted to the platform." },
        { title: "HANDS, SKILLS & EXPERTISE", desc: "On all projects, there is a need for hands skills and/or expertise. Requests for financial support are not admitted." },
        { title: "SUSTAINALBE PROJECTS", desc: "The nature of each project is related to a minimum of one of the goals of the United Nations (SDG)." },
        { title: "SHORT- & LONG-TERM PROJECTS. ONLINE, REMOTE & ON-LOCATION", desc: "We accept projects of any duration. They can be both online and on-site projects." },
        { title: "NO REPLACEMENTS OF LOCAL JOBS:", desc: "Our platform enables local communities and NPOs to ask for help where they cannot find it locally. Support should never come at the expense of opportunities for local citizens." },
        { title: "GIVE & RECEIVE", desc: "The principle of giving and receiving applies to every project. Fellows share time and knowledge, local hosts give something in return, such as education about local nature or culture, a taste of a local product, or a guided tour." },
        { title: "NON-COMMERCIAL ACTIVITIES", desc: "The goal of each project is to solve a sustainable problem. Our platform is not the place for commercial operations like ticket sales and paid tours." },
        { title: "NO ACCOMMODATION", desc: "We do not encourage members to travel but to give something back wherever they are. This means that hosts are not obliged to offer free food and/or accommodation." },
        { title: "HOST PRESENCE", desc: "Every project requires one or more hosts to be present at the location for instructions and personal meet when a volunteer comes to assist. In case of projects with vulnerable groups, a host needs to be present at all times." },
        { title: "COMMUNICATION", desc: "Before meeting in person, contact takes place via our app. A chat function is available between hosts and volunteers. \n Hosts must frequently check the app for updates on discussions, registrations, and other information. And need to have some experience in working with people from outside their village." },

        // {
        //     Svg: LOCALCOMMUNITIES, title: "LOCAL COMMUNITIES & SMALL NONPROFITS", desc: "Representatives of local communities and small  nonprofits all over the world have free access to share their happenings. Nonprofits with larger donor networks and fanbases are invited to contact us for a service partnership."
        // },
        // {
        //     Svg: RELIABLENONPROFITS, title: "RELIABLE NONPROFITS & HOSTS", desc: "We accept happenings of reliable nonprofits and hosts. Prior to publishing a happening, we conduct desk and field research."
        // },
        // {
        //     Svg: WELFAREICON, title: "WELFARE OF VULNERABLE GROUPS", desc: "The welfare of children, animals and other vulnerable groups is unquestioned. Happenings involving these groups must be represented and supervised by trusted organizations/hosts."
        // },
        // {
        //     Svg: SUPPORTICON, title: "SUPPORT FOR SHORT PERIODS", desc: "Fellows may also come for short periods such as 1 or 2 days. If the happening takes longer, you can ask more fellows for help."
        // },
        // {
        //     Svg: NONCOMMERCIALACTIVITIES, title: "NON-COMMERCIAL ACTIVITIES", desc: "The goal of each happening is to solve a local problem.Commercial activities like ticket sales, paid excursions have no place on our platform."
        // },

    ]


    async function getHappeningSubmissionData(refresh = false) {

        setLoading(true);
        apiRequest('', 'getHappeningSubmissionData', "GET")
            .then(data => {
                console.log('dataaaa', data)
                setLoading(false);
                if (data.status) {
                    setHappeningSubmissionDataGlobal(data.data)
                }

            })
            .catch(err => {
                console.log('errorr', err)
                setLoading(false)
            })
    }


    React.useEffect(() => {
        retrieveItem('login_data')
            .then(data => {
                if (data) {
                    getHappeningSubmissionData()
                }
                else {
                    setIsGuest(true)
                }
            })

    }, [])





    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <GeneralStatusBar />
            {/* <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
                hidden={Platform.OS == 'ios' ? true : false}
            /> */}
            <HappeningHeader
                // imageUrl={require('../../../assets/thingsConsiderHeaderImg.png')}
                showBackBtn={true}
                heading={"Things to\nconsider."}
                desc={"Here are a few terms that need to be agreed before you proceed to post your happening. "}
            />

            <ScrollView style={styles.contentContainer}>
                <View style={{ paddingHorizontal: 25 }} >
                    {conditionArr.map((item, index) => {
                        return (
                            <View key={index} style={styles.content}>
                                <View>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.desc}>{item.desc}</Text>
                                </View>
                            </View>
                        )
                    })
                    }
                </View>

                <View style={{ height: 400 }} />
            </ScrollView>
            <TouchableOpacity
                onPress={() => {
                    if (isGuest) {
                        setLoginModal(true);
                        return;
                    }
                    navigate('TypeHappening')
                }}
                activeOpacity={0.9}
                style={[styles.agreeBtn, { paddingBottom: 20 }]}>
                <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Agree and Continue</Text>
                <NextIcon style={{ marginLeft: 10 }} />
            </TouchableOpacity>



            {/* <TouchableOpacity
                onPress={() => navigate('TypeHappening')}
                activeOpacity={0.9}
                style={styles.agreeBtn}>
                <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Agree and Continue</Text>
                <NextIcon style={{ marginLeft: 10 }} />
            </TouchableOpacity> */}

            <AlertMsg1

                headingStyle={{ color: acolors.primary, fontSize: 20 }}
                heading={"Please Log in to\nSubmit a happening"}
                desc=""
                // renderBtn={false}
                // descStyle={{ lineHeight: 22, color: '#5D5760', fontFamily: fonts.PSBo }}
                btnTitle="Login"
                btnTitle2="Sign Up"
                renderBtn2={true}
                state={loginModal}
                onBackdropPress={() => setLoginModal(false)}
                onPress={() => {
                    setLoginModal(false);
                    navigate('AuthStack');

                }}
                containerStyle={{ paddingHorizontal: 25, paddingBottom: 80, paddingTop: 10 }}

            />

            {loading && <Loader />}
        </View >
    )
}

const styles = StyleSheet.create({
    // contentContainer: {
    //     backgroundColor: '#FDFDFD',
    //     width: "100%", borderTopRightRadius: 30, borderTopLeftRadius: 30,
    //     marginTop: -30, paddingTop: 20, paddingHorizontal: 25
    // },
    contentContainer: {
        backgroundColor: '#FDFDFD',
        width: "100%", borderTopRightRadius: 30, borderTopLeftRadius: 30,
        marginTop: -30, paddingTop: 20
    },
    content: {
        width: "100%", paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row',
        backgroundColor: 'white', elevation: 5, marginTop: 15,
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 1, height: 1 },
    },
    title: {
        fontFamily: fonts.MBo, fontSize: 12, color: '#2A2A2A', lineHeight: 15,
    },
    desc: {
        color: '#161615', fontFamily: fonts.MRe, fontSize: 9, lineHeight: 11, marginTop: 4
    },
    agreeBtn: {
        width: "100%", position: 'absolute', bottom: Platform.OS == 'ios' ? 80 : 50, height: 80,
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 30, alignItems: 'center', justifyContent: 'flex-end',
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        elevation: 5
    },
    btnStyling: {
        marginTop: 20,
    }


})

export default ThingsConsider
