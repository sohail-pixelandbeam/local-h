import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, BackHandler } from 'react-native'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, RELIABLENONPROFITS, SUPPORTICON, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'

import { Context } from '../../../../Context/DataContext'
import { retrieveItem, storeItem, useForceUpdate } from '../../../../utils/functions'
import Loader from '../../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import HappeningStep from '../../../../common/HappeningStep'
import { apiRequest } from '../../../../utils/apiCalls'


var alertRef;

const SDGLinked = (props) => {


    const forceUpdate = useForceUpdate();
    const { state, setLocationHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);

    const conditionArr = state.happeningSubmissionData.SDG
    // [
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image12.png'), title: "No Poverty", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image30.png'), title: "Zero Hunger", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image31.png'), title: "Good Health and Well-Being", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image32.png'), title: "Quality Education", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image33.png'), title: "Gender Equality", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image34.png'), title: "Clean Water and Sanitation", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image35.png'), title: "Affordable and clean energy", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image36.png'), title: "Decent work and Economic growth", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image37.png'), title: "Industry innovation and Infrastructure", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image38.png'), title: "Reduced Inequalities", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image39.png'), title: "Sustainable cities and communities", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image40.png'), title: "Responsible consuption and production", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image41.png'), title: "Climate Action", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image42.png'), title: "Life Below Water", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image43.png'), title: "Life on Land", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image44.png'), title: "Peace, Justice and Strong -Institutions", desc: "small text"
    //     },
    //     {
    //         img: require('../../../../assets/SDGScreenImages/Image45.png'), title: "Partnerships for the Goal", desc: "small text"
    //     },


    // ];

    const [selected, setSelected] = useState([]);

    function addToList(v) {

        let arr = selected;
        if (arr.includes(v)) {
            let foundIndex = arr.indexOf(v);
            arr.splice(foundIndex, 1);
        }
        else {
            arr.push(v);
        }
        setSelected(arr);
        forceUpdate();


    }


    // React.useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', function () {
    //         return true;
    //     })
    // }, []);


    function next() {

        if (selected.length == 0) {
            alertRef.alertWithType('error', "Error", "Please select atleast one SDG");
            return;
        }

        const obj = {
            ...state.locationHappeningDraft,
            whatSDGIsThisHappeningLinkedTo: selected
        }
        setLocationHappeningData(obj);
        doSubmitHappening();

        // navigate('TermsAndLaws')
    }

    async function doSubmitHappening() {

        try {
            setLoading(true);
            // reqObj.happeningTypeOnlineOrOffline.happeningOnline = Object.assign({}, state.happeningDraft)
            const loginData = await retrieveItem('login_data');
            const profileData = await retrieveItem('profile_data');

            // const date = new Date();
            console.log('profileData', profileData);
            let reqObj = Object.assign({}, state.locationHappeningDraft);
            reqObj.AgreeAndContinue = true;
            // reqObj.UserId = loginData?._id;
            // reqObj.userProfileId = profileData?._id;
            reqObj.whatSDGIsThisHappeningLinkedTo = selected;
            reqObj.happeningOnLocation = true;
            reqObj.happeningAccessibility = "nothing";
            reqObj.fellowMustComeAlone = true;
            // reqObj.daysOfWeek = null;
            // console.log(reqObj.daysOfWeek);

            apiRequest(reqObj, 'happening/createHappeningOnLocation')
                .then(data => {
                    setLoading(false)
                    console.log('data-------asd', data)
                    if (data.status) {
                        navigate('SuccessfullySubmitted');
                    }
                    else alertRef.alertWithType('error', 'Error', data.message);
                })
                .catch(erro => {
                    setLoading(false)
                    console.log(erro)
                })
            return;
        }
        catch (err) {
            setLoading(false)
        }
    }



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <HappeningHeader
                // imageUrl={require('../../../assets/thingsConsiderHeaderImg.png')}
                heading={"What SDG's is this happening linked to?"}
                desc={"This might change while we approve your happening"}
            />

            <View style={styles.contentContainer}>
                <FlatList
                    data={conditionArr}
                    contentContainerStyle={{ paddingBottom: 350 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => addToList(item.sdgLogo)}
                                style={[styles.content, { backgroundColor: selected.includes(item.sdgLogo) ? '#5B4DBC' : 'white' }]}>
                                <View style={{ width: "22%" }}>
                                    <Image
                                        style={{ width: 60, height: 60, borderRadius: 10 }}
                                        source={{ uri: item.sdgLogo }}
                                    />
                                </View>
                                <View style={{ flexWrap: 'wrap', width: "78%" }}>
                                    <Text style={[styles.title, { color: selected.includes(item.sdgLogo) ? 'white' : '#2A2A2A', lineHeight: 20 }]}>{item.sdgName}</Text>
                                    {/* <Text style={[styles.desc, { color: selected.includes(item.sdgName) ? 'white' : '#2A2A2A' }]}>{item.sdgDescription}</Text> */}
                                </View>

                            </TouchableOpacity>


                        )
                    }}

                />

            </View>


            <HappeningStep
                nextText={"Next"}
                onPress={() => next()}
                step={props?.route?.params?.step}
            />
            <DropdownAlert ref={(ref) => alertRef = ref} />
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
        width: "100%", paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'white', elevation: 5, marginTop: 15,
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        borderRadius: 20
    },
    title: {
        fontFamily: fonts.PSBo, fontSize: 13, color: '#2A2A2A', lineHeight: 15, alignSelf: 'center', marginLeft: 5
    },
    desc: {
        color: '#161615', fontFamily: fonts.MRe, fontSize: 7, lineHeight: 11, marginTop: 2
    },
    agreeBtn: {
        width: "100%", position: 'absolute', bottom: 0, height: 70,
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 30, alignItems: 'center', justifyContent: 'space-between',
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        shadowColor: 'rgba(0, 0, 0, 0.09)',
        shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        elevation: 5
    },


})

export default SDGLinked
