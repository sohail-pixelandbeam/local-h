import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, BackHandler } from 'react-native'
import { navigate } from '../../../../../Navigations'
import HappeningHeader from '../../../../common/HappeningHeader'
import { BackIcon, LOCALCOMMUNITIES, NextIcon, NONCOMMERCIALACTIVITIES, RELIABLENONPROFITS, SUPPORTICON, WELFAREICON } from '../../../../components/Svgs'
import { acolors } from '../../../../constants/colors'
import { fonts } from '../../../../constants/fonts'

import { Context } from '../../../../Context/DataContext'
import { storeItem, useForceUpdate } from '../../../../utils/functions'
import Loader from '../../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import HappeningStep from '../../../../common/HappeningStep'


var alertRef;

const SDGLinked = (props) => {


    const forceUpdate = useForceUpdate();
    const { state, setLocationHappeningData } = useContext(Context)
    const [loading, setLoading] = useState(false);

    const conditionArr = [
        {
            img: require('../../../../assets/SDGScreenImages/Image12.png'), title: "No Poverty", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image30.png'), title: "Zero Hunger", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image31.png'), title: "Good Health and Well-Being", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image32.png'), title: "Quality Education", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image33.png'), title: "Gender Equality", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image34.png'), title: "Clean Water and Sanitation", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image35.png'), title: "Affordable and clean energy", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image36.png'), title: "Decent work and Economic growth", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image37.png'), title: "Industry innovation and Infrastructure", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image38.png'), title: "Reduced Inequalities", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image39.png'), title: "Sustainable cities and communities", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image40.png'), title: "Responsible consuption and production", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image41.png'), title: "Climate Action", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image42.png'), title: "Life Below Water", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image43.png'), title: "Life on Land", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image44.png'), title: "Peace, Justice and Strong -Institutions", desc: "small text"
        },
        {
            img: require('../../../../assets/SDGScreenImages/Image45.png'), title: "Partnerships for the Goal", desc: "small text"
        },


    ];

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


    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function () {
            // navigate('HappeningLanguages1');
            return true;
        })
    }, []);


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
        navigate('TermsAndLaws')
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                backgroundColor={acolors.primary}
                barStyle={"light-content"}
            />
            <HappeningHeader
                // imageUrl={require('../../../assets/thingsConsiderHeaderImg.png')}
                heading={"What SDG is this happening linked to?"}
                desc={"This might change while we approve your happening"}
            />

            <View style={styles.contentContainer}>
                <FlatList
                    data={conditionArr}
                    contentContainerStyle={{ paddingBottom: 550 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => addToList(item.title)}
                                style={[styles.content, { backgroundColor: selected.includes(item.title) ? '#5B4DBC' : 'white' }]}>
                                <View style={{ width: "22%" }}>
                                    <Image
                                        // style={{ width: "100%", height: "100%" }}
                                        source={item.img}
                                    />
                                </View>
                                <View>
                                    <Text style={[styles.title, { color: selected.includes(item.title) ? 'white' : '#2A2A2A' }]}>{item.title}</Text>
                                    <Text style={[styles.desc, { color: selected.includes(item.title) ? 'white' : '#2A2A2A' }]}>{item.desc}</Text>
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
        width: "100%", paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row',
        backgroundColor: 'white', elevation: 5, marginTop: 15,
        shadowColor: 'rgba(0, 0, 0, 0.09)', shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        borderRadius: 20
    },
    title: {
        fontFamily: fonts.MBo, fontSize: 9, color: '#2A2A2A', lineHeight: 15,
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
