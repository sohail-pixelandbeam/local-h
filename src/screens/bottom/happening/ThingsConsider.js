import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, Platform } from 'react-native'
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

const ThingsConsider = () => {



    const { setHappeningSubmissionDataGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);



    const conditionArr = [
        { title: "NGOs & LOCAL COMMUNITIES", desc: "Representatives of local communities and small NPOs worldwide have free access to upload their projects.\n\nNPOs with more extensive donor networks and fanbases can contact us for a service partnership." },
        { title: "ONLY HANDS & EXPERTISE", desc: "On all projects, there is a need for hands and/or expertise. Requests for financial support are not admitted." },
        { title: "ONLINE & ON-LOCATION PROJECTS", desc: "The projects you submit can take place in an actual location or a virtual environment with video tooling." },
        { title: "WELFARE OF VULNERABLE GROUPS", desc: "The welfare of children, elderly people, animals, and other vulnerable groups is unquestioned. Projects involving these groups must be represented and supervised by trusted organizations/hosts. Orphanages are not admitted to the platform." },
        { title: "GIVE AND RECEIVE", desc: "Fellows share time and knowledge, local hosts give something in return, such as education about local nature or culture, a taste of a local product, a guided tour." },
        { title: "SUSTAINABLE PROJECTS", desc: "The nature of each project is related to a minimum of one of the United Nations' sustainable development goals (SDG)." },
        { title: "SHORT-TERM & LONG-TERM PROJECTS", desc: "We also accept projects that only last briefly, like for half or one day." },
        { title: "NON-COMMERCIAL ACTIVITIES", desc: "Our platform is not the place for commercial operations like ticket sales and paid tours." },
        { title: "NO ACCOMMODATION", desc: "We do not encourage members to travel but to give something back wherever they are. This means that hosts are not obliged to offer free food and/or accommodation." },
        { title: "HOST PRESENCE", desc: "Every project requires one or more hosts to be present at the location when a volunteer comes to assist. Before you meet in person, you can contact a fellow through our app if you like. A chat function is available between hosts and fellows." },
        { title: "COMMUNICATION", desc: "Hosts must frequently check the app for updates on discussions, registrations, and other information." },

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
                if (data) getHappeningSubmissionData()
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
                heading={"Things to\nconsider."}
                desc={"Here are a few terms that need to be agreed before you proceed to post your happening. "}
            />

            <View style={styles.contentContainer}>
                <FlatList
                    data={conditionArr}
                    contentContainerStyle={{ paddingBottom: 550 }}
                    renderItem={({ item, index }) => {
                        let Icon = item.Svg
                        return (
                            <View style={styles.content}>
                                {/* <View style={{ width: "22%" }}>
                                    <Icon />
                                </View> */}
                                <View>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.desc}>{item.desc}</Text>
                                </View>
                            </View>


                        )
                    }}

                />

            </View>


            <TouchableOpacity
                onPress={() => navigate('TypeHappening')}
                activeOpacity={0.9}
                style={styles.agreeBtn}>
                <Text style={{ color: '#292929', fontSize: 14, fontFamily: fonts.MRe }}>Agree and Continue</Text>
                <NextIcon style={{ marginLeft: 10 }} />
            </TouchableOpacity>
            {loading && <Loader />}
        </View >
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#FDFDFD',
        width: "100%", borderTopRightRadius: 30, borderTopLeftRadius: 30,
        marginTop: -30, paddingTop: 20, paddingHorizontal: 25
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
        width: "100%", position: 'absolute', bottom: Platform.OS == 'ios' ? 80 : 50, height: 70,
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 30, alignItems: 'center', justifyContent: 'flex-end',
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        elevation: 5
    },


})

export default ThingsConsider
