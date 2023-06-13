import React, { useContext, useState } from 'react'
import { TouchableOpacity, View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import Modal from 'react-native-modal'
import { ArrowDown, CrossIcon, DrinksIcon, FoodIcon, PIcon, TickIcon, ToiletIcon, WifiIcon } from '../components/Svgs'
import { fonts } from '../constants/fonts'
import { Context } from '../Context/DataContext'
import { useForceUpdate } from '../utils/functions'
import GeneralStatusBar from '../components/GernalStatusBar'
import DateTimePicker from 'react-native-date-picker'
import { acolors } from '../constants/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'


const HappeningFilterModal = ({ filterType, isVisible, setIsVisible, onDone }) => {


    const forceUpdate = useForceUpdate();
    const { state } = useContext(Context);
    const [filterThemesArr, setFilterThemesArr] = useState(state.happeningSubmissionData?.happeningTheme)
    const [languagesTemp, setLanguageTemp] = useState(state?.happeningSubmissionData?.languages);


    // const [filterModal, setFilterModal] = useState(false);
    // const [filterType, setFilterType] = useState('');
    const [filterTheme, setFilterTheme] = useState('');
    // ['Art & cultural projects', 'Business Support', 'Clean Energy & Air', 'Community Work', 'Disaster Relief', 'Education']);

    const [fromTimeModal, setFromTimeModal] = useState(false);
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [toTimeModal, setToTimeModal] = useState(false);
    const [isOnlineHappening, setIsOnlineHappening] = useState(null);
    const [isOnlocationHappening, setIsOnLocationHappening] = useState(null);

    const [isExpandThemes, setIsExpandThemes] = useState(false);
    const [isExpandLang, setIsExpandLang] = useState(false);
    const [isExpandFacilities, setIsExpandFacilities] = useState(false);

    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedFacilties, setSelectedFacilties] = useState([]);

    const facilitesArr = [
        { title: "Wi-Fi", icon: WifiIcon },
        { title: "Parking", icon: PIcon },
        { title: "Drinks", icon: DrinksIcon },
        { title: "Food", icon: FoodIcon },
        { title: "Toilet", icon: ToiletIcon }
    ]

    function clearAll() {
        setFromTime('');
        setToTime('');
        setSelectedLanguages([]);
        setSelectedFacilties([]);
        setFilterTheme('');
        setIsOnLocationHappening(null);
        setIsOnLocationHappening(null);

    }

    function makeTime(date) {
        var time;
        let hours = date.getHours();
        let minutes = date.getMinutes() == 0 ? "00" : date.getMinutes();
        time = hours + ":" + minutes;
        return time;
    }

    function addRemoveLanguage(v) {

        var arr = selectedLanguages;
        if (arr.includes(v)) {
            let foundIndex = arr.indexOf(v);
            arr.splice(foundIndex, 1);
        }
        else {
            arr.push(v);
        }
        setSelectedLanguages(arr);
        forceUpdate();


    }


    const FilterHeader = (props) => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Text style={{ fontFamily: fonts.PSBo, fontSize: 20, color: '#5D5760', }}>{props.title}</Text>
                {props.isClear &&
                    <TouchableOpacity
                        onPress={() => props.isClear()}
                    >
                        <Text style={{ fontFamily: fonts.PMe, fontSize: 12, color: '#2A2A2A', color: acolors.primaryLight }}>Clear</Text>
                    </TouchableOpacity>
                }
                {
                    props.isArrowDown &&
                    <TouchableOpacity
                        onPress={() => props.isArrowDown()}
                    >
                        <AntDesign
                            // style={{ marginRight: getWidth(5) }}
                            name={props.isExpanded ? 'up' : "down"}
                            color={'#494761'}
                            size={15}
                        />
                    </TouchableOpacity>
                }
            </View>
            {
                props.showCrossBtn &&
                <TouchableOpacity
                    onPress={() => {
                        setIsVisible(false)
                    }}
                    style={{ width: 28, height: 28, borderRadius: 28 / 2, backgroundColor: '#F08F8F', alignItems: 'center', justifyContent: 'center' }}>
                    <CrossIcon width={10} height={18} color="#241414" />
                </TouchableOpacity>
            }

        </View>
    )


    const FromDateTimePicker = () => (

        <>
            <DateTimePicker
                modal
                open={fromTimeModal}
                date={new Date(-1232403882588)}
                mode={'time'}
                theme='dark'
                onConfirm={(date) => {
                    if (date) {
                        let time = makeTime(date);
                        setFromTimeModal(false);
                        setFromTime(time);

                    }
                }}
                onCancel={() => {
                    setFromTimeModal(false)
                }}
            />
        </>
    )

    const ToDateTimePicker = () => (
        <DateTimePicker
            modal
            open={toTimeModal}
            date={new Date(-1232403882588)}
            minuteInterval={15}
            mode={'time'}
            theme='dark'
            onConfirm={(date) => {
                if (date) {
                    let time = makeTime(date);
                    setToTimeModal(false);
                    setToTime(time);
                }
            }}
            onCancel={() => {
                setToTimeModal(false)
            }}
        />

    )


    function addRemoveFacilities(v) {
        var arr = selectedFacilties;
        console.log('selectedFacilties', selectedFacilties[0], '__v', v)
        if (arr.includes(v)) {
            // if (selectedFacilties.length == 1) return;
            let foundIndex = arr.indexOf(v);
            arr.splice(foundIndex, 1);
        }
        else {
            arr.push(v);
        }
        setSelectedFacilties(arr);
        forceUpdate();
    }


    return (
        <Modal
            isVisible={isVisible}
            backdropColor="#171515"
            // backdropOpacity={0.5}    
            style={{ margin: 0 }}
            onBackdropPress={() => { setIsVisible(false) }}
            swipeDirection={"down"}
            onSwipeComplete={() => setIsVisible(false)}
            animationOut="slideOutDown"
            propagateSwipe={true}

        >
            <FromDateTimePicker />
            <ToDateTimePicker />
            <View style={[styles.popupContainer, { paddingVertical: 15, backgroundColor: 'white', height: filterType == 'All' ? "93%" : "40%", width: "100%", borderRadius: 20, paddingHorizontal: 30, bottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 10 }]}>
                <View style={styles.modalSliderLine} />
                <TouchableOpacity
                    onPress={() => clearAll()}
                >
                    <Text style={{ fontFamily: fonts.PMe, fontSize: 14, color: '#2A2A2A', color: acolors.primaryLight, alignSelf: 'flex-end' }}>Clear all</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                >
                    {

                        filterType == 'All' ?
                            <>
                                <ScrollView
                                    contentContainerStyle={{ paddingBottom: 50 }}
                                    showsVerticalScrollIndicator={false} >
                                    {
                                        // "Start time", "End time",
                                        [ "Theme", "Languages", "Facilities", "Happening type",]
                                            .map((v, i) => {
                                                if (v == 'Start time') return (
                                                    <>
                                                        <FilterHeader
                                                            isClear={() => setFromTime('')}

                                                            title={v} />

                                                        <TouchableOpacity
                                                            onPress={() => setFromTimeModal(true)}
                                                            style={[styles.pickerContainer, { marginTop: 20 }]}>
                                                            <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: '#2A2A2A' }}>Start time</Text>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Text style={styles.pickerTitle}>{fromTime} </Text>
                                                                <ArrowDown style={{ marginLeft: 5 }} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </>
                                                )
                                                if (v == 'End time') return (
                                                    <>
                                                        <FilterHeader
                                                            // showCrossBtn={i == 0 ? true : false} 
                                                            isClear={() => setToTime('')}
                                                            title={v} />

                                                        <TouchableOpacity
                                                            onPress={() => setToTimeModal(true)}
                                                            style={[styles.pickerContainer, { marginTop: 20 }]}>

                                                            <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: '#2A2A2A' }}>End time</Text>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Text style={styles.pickerTitle}>{toTime} </Text>
                                                                <ArrowDown style={{ marginLeft: 5 }} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </>
                                                )
                                                if (v == 'Happening type') return (
                                                    <View style={{ marginTop: 10 }}>
                                                        <FilterHeader
                                                            // showCrossBtn={i == 0 ? true : false} 
                                                            isClear={() => {
                                                                setIsOnLocationHappening(true)
                                                                setIsOnlineHappening(true)
                                                            }}
                                                            title={v} />

                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                                            <View style={styles.checkboxContainer}>
                                                                <View style={{ alignItems: 'center', flexDirection: 'row', }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => setIsOnlineHappening(!isOnlineHappening)}
                                                                        style={[styles.shadow, { width: 32, height: 32, borderRadius: 32 / 2, alignItems: 'center', justifyContent: 'center' }]}>
                                                                        {isOnlineHappening && <TickIcon />}
                                                                    </TouchableOpacity>
                                                                    <Text style={styles.label}>Online</Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.checkboxContainer}>
                                                                <View style={{ alignItems: 'center', flexDirection: 'row', }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => setIsOnLocationHappening(!isOnlocationHappening)}
                                                                        style={[styles.shadow, { width: 32, height: 32, borderRadius: 32 / 2, alignItems: 'center', justifyContent: 'center' }]}>
                                                                        {isOnlocationHappening && <TickIcon />}
                                                                    </TouchableOpacity>
                                                                    <Text style={styles.label}>Location</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                                if (v == 'Theme') return (
                                                    <View style={{ marginTop: 10, width: "100%" }}>

                                                        <FilterHeader
                                                            isArrowDown={() => setIsExpandThemes(!isExpandThemes)}
                                                            isExpanded={isExpandThemes}
                                                            title={v} />
                                                        {isExpandThemes &&
                                                            <View style={{
                                                                // marginHorizontal: 2,
                                                                backgroundColor: 'white', borderTopRightRadius: 10, borderRadius: 10, padding: 0, paddingHorizontal: 10,
                                                                borderWidth: 0.5, borderColor: '#dedede',
                                                                // shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
                                                                marginBottom: 10, paddingBottom: 25, marginTop: 15,
                                                            }}>
                                                                {
                                                                    state.happeningSubmissionData?.happeningTheme && state.happeningSubmissionData.happeningTheme?.map((v, i) => {
                                                                        return (
                                                                            <TouchableOpacity
                                                                                onPress={() => {
                                                                                    setFilterTheme(filterTheme == v ? '' : v)
                                                                                    forceUpdate();
                                                                                }}
                                                                                style={styles.filterThemePickerContainer}>
                                                                                <View>
                                                                                    <Text style={styles.themeText}>{v?.happeningThemeName}</Text>
                                                                                    {/* <Text style={styles.subData}>sub data</Text> */}
                                                                                </View>

                                                                                <View style={styles.languagePickerCircle}>
                                                                                    {filterTheme == v && <TickIcon width={17} height={12} />}
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        )
                                                                    })
                                                                }
                                                            </View>
                                                        }
                                                    </View>

                                                )
                                                if (v == 'Languages') return (
                                                    <View style={{ marginTop: 10, width: "100%" }}>

                                                        <FilterHeader
                                                            isArrowDown={() => setIsExpandLang(!isExpandLang)}
                                                            isExpanded={isExpandLang}
                                                            title={v} />
                                                        {isExpandLang &&
                                                            <View style={{
                                                                // marginHorizontal: 2,
                                                                backgroundColor: 'white', borderTopRightRadius: 10, borderRadius: 10, padding: 0, paddingHorizontal: 10,
                                                                borderWidth: 0.5, borderColor: '#dedede',
                                                                // shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
                                                                marginBottom: 10, paddingBottom: 25, marginTop: 15,
                                                            }}>

                                                                {
                                                                    state?.happeningSubmissionData?.languages && Object.values(state?.happeningSubmissionData?.languages).map((v, i) => {
                                                                        return (
                                                                            <TouchableOpacity
                                                                                key={i}
                                                                                onPress={() => addRemoveLanguage(v)}
                                                                                style={styles.filterThemePickerContainer}>
                                                                                <View>
                                                                                    <Text style={styles.themeText}>{v}</Text>
                                                                                </View>

                                                                                <View style={styles.languagePickerCircle}>
                                                                                    {selectedLanguages.includes(v) && <TickIcon width={17} height={12} />}
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        )
                                                                    })
                                                                }
                                                            </View>
                                                        }
                                                    </View>

                                                )
                                                if (v == 'Facilities') return (
                                                    <View style={{ marginTop: 10, width: "100%" }}>

                                                        <FilterHeader
                                                            isArrowDown={() => setIsExpandFacilities(!isExpandFacilities)}
                                                            isExpanded={isExpandFacilities}
                                                            title={v} />
                                                        {isExpandFacilities &&
                                                            <View style={{
                                                                // marginHorizontal: 2,
                                                                backgroundColor: 'white', borderTopRightRadius: 10, borderRadius: 10, padding: 0, paddingHorizontal: 10,
                                                                borderWidth: 0.5, borderColor: '#dedede',
                                                                // shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
                                                                marginBottom: 10, paddingBottom: 25, marginTop: 15,
                                                            }}>

                                                                <View style={{ flexDirection: 'row', width: "100%", flexWrap: 'wrap', marginTop: 10, }}>
                                                                    {
                                                                        facilitesArr?.map((v, i) => {
                                                                            let Icon = v.icon
                                                                            return (
                                                                                <TouchableOpacity
                                                                                    key={i}
                                                                                    onPress={() => addRemoveFacilities(v.title)}
                                                                                    style={{ alignItems: 'center', marginLeft: 20, marginTop: 20 }}>
                                                                                    <View style={{
                                                                                        width: 54, height: 54, borderRadius: 54 / 2, borderWidth: selectedFacilties.includes(v?.title) ? 0 : 2,
                                                                                        backgroundColor: selectedFacilties.includes(v.title) ? '#5B4DBC' : 'white', borderColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center'
                                                                                    }}>
                                                                                        <Icon color={selectedFacilties.includes(v.title) ? "#fff" : "#222222"} />
                                                                                    </View>
                                                                                    <Text style={{ fontFamily: fonts.MSBo, fontSize: 11, color: '#222222', marginTop: 2 }}>{v.title}</Text>

                                                                                </TouchableOpacity>
                                                                            )
                                                                        })
                                                                    }
                                                                </View>
                                                            </View>
                                                        }
                                                    </View>

                                                )

                                            })

                                    }
                                </ScrollView>

                            </>

                            :
                            <>
                                <FilterHeader showCrossBtn={true} title={filterType} />
                                <View style={{
                                    elevation: 5, backgroundColor: 'white', borderTopRightRadius: 10, borderRadius: 10, padding: 15, paddingBottom: 5,
                                    shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.1,
                                    marginBottom: 10, paddingBottom: 25, marginTop: 10
                                }}>
                                    <ScrollView contentContainerStyle={{ paddingBottom: 20, }} showsVerticalScrollIndicator={false} >
                                        {
                                            filterThemesArr?.map((v, i) => {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setFilterTheme(v.happeningThemeName)
                                                            forceUpdate();
                                                        }}
                                                        style={[styles.filterThemePickerContainer,]}>
                                                        <View>
                                                            <Text style={styles.themeText}>{v?.happeningThemeName}</Text>
                                                            {/* <Text style={styles.subData}>sub data</Text> */}
                                                        </View>

                                                        <View style={styles.languagePickerCircle}>
                                                            {/* {filterTheme == v &&  */}
                                                            {filterTheme == v.happeningThemeName && <TickIcon width={17} height={12} />}
                                                            {/* } */}
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                            </>
                    }
                    {/* <TouchableOpacity
                    onPress={() => {
                        setIsVisible(false)
                    }}
                    style={{ top: 10, position: 'absolute', right: 10, width: 28, height: 28, borderRadius: 28 / 2, backgroundColor: '#F08F8F', alignItems: 'center', justifyContent: 'center' }}>
                    <CrossIcon width={10} height={18} color="#241414" />
                </TouchableOpacity> */}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {

                        const body = {
                            startTime: fromTime,
                            endTime: toTime,
                            theme: filterTheme?.happeningThemeName ?? '',
                            happeningOnLocation: isOnlocationHappening,
                            happeningOnline: isOnlineHappening,
                            languageSpokenAtHappening: selectedLanguages.toString(),
                            facilities: selectedFacilties.toString()

                        }
                        Object.keys(body).map((v, i) => {
                            if (!body[v]) {
                                delete body[v]
                            }
                        })
                        setIsVisible(false)
                        onDone(body);
                    }}
                    style={{ width: "100%", height: 45, backgroundColor: acolors.primaryLight, borderRadius: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', position: 'absolute', bottom: 30 }}>
                    <Text style={{ fontFamily: fonts.PMe, fontSize: 13, color: '#fff' }}>Done</Text>
                </TouchableOpacity>
            </View>
        </Modal >

    )
}


const styles = StyleSheet.create({

    popupContainer: {
        width: "80%", paddingBottom: 60,
        borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.98)',
        position: 'absolute', bottom: 5, alignSelf: 'center', paddingHorizontal: 15
    },

    filterThemePickerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, paddingRight: 3,
        // shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        elevation: 2
    },
    themeText: {
        fontSize: 12, color: "#2a2a2a", fontFamily: fonts.MBo, letterSpacing: 0.18,
    },
    subData: {
        fontFamily: fonts.MRe, color: '#828282', fontSize: 8
    },
    languagePickerCircle: {
        width: 37, height: 37, borderRadius: 37 / 2,
        shadowColor: 'rgba(0, 0, 0, 0.2)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', elevation: 5
    },
    languagePickerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14
    },
    languageText: {
        fontSize: 9, color: "#2a2a2a", fontFamily: fonts.MSBo, letterSpacing: 0.18,
    },


    pickerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 46, borderRadius: 10,
        paddingLeft: 8, paddingHorizontal: 10, marginHorizontal: 1, borderWidth: 0.5, borderColor: '#dedede'
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.4)', shadowOffset: { width: 0.5, height: 0.5 }, shadowRadius: 2, shadowOpacity: 0.5, elevation: 2,
        backgroundColor: 'white'
    },
    pickerTitle: {
        fontFamily: fonts.MBo, fontSize: 12, color: '#2A2A2A'
    },
    modalSliderLine: {
        width: 70,
        height: 5,
        borderRadius: 10,
        backgroundColor: '#EFEFEF',
        alignSelf: 'center',
        marginTop: 3
    },
    checkboxContainer: {
        flexDirection: "row",
        marginTop: 30,
        marginBottom: 10,

    },
    checkbox: {
        alignSelf: "center",
        borderRadius: 20,
        padding: 15,
        backgroundColor: "#ffffff",
        borderWidth: 0,
    },
    label: {
        margin: 8,
        fontFamily: fonts.PSBo,
        fontSize: 12,
        color: '#2A2A2A',
        marginLeft: 10
    },

})

export default HappeningFilterModal
