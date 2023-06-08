import React, { useContext, useState } from 'react'
import { TouchableOpacity, View, Text, ScrollView, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { ArrowDown, CrossIcon, TickIcon } from '../components/Svgs'
import { fonts } from '../constants/fonts'
import { Context } from '../Context/DataContext'
import { useForceUpdate } from '../utils/functions'
import GeneralStatusBar from '../components/GernalStatusBar'
import DateTimePicker from 'react-native-date-picker'
import { acolors } from '../constants/colors'



const HappeningFilterModal = ({ filterType, isVisible, setIsVisible, onDone }) => {


    const forceUpdate = useForceUpdate();
    const { state } = useContext(Context);
    const [filterModal, setFilterModal] = useState(false);
    // const [filterType, setFilterType] = useState('');
    const [filterTheme, setFilterTheme] = useState('Art & cultural projects');
    const [filterThemesArr, setFilterThemesArr] = useState(state.happeningSubmissionData?.happeningTheme)
    // ['Art & cultural projects', 'Business Support', 'Clean Energy & Air', 'Community Work', 'Disaster Relief', 'Education']);

    const [fromTimeModal, setFromTimeModal] = useState(false);
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [toTimeModal, setToTimeModal] = useState(false);


    function makeTime(date) {
        var time;
        let hours = date.getHours();
        let minutes = date.getMinutes() == 0 ? "00" : date.getMinutes();
        time = hours + ":" + minutes;
        return time;
    }



    const FilterHeader = (props) => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
            <Text style={{ fontFamily: fonts.PSBo, fontSize: 20, color: '#5D5760', }}>{props.title}</Text>
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



    return (
        <Modal
            isVisible={isVisible}
            backdropColor="#171515"
            // backdropOpacity={0.5}    
            style={{ margin: 0 }}
            onBackdropPress={() => { setIsVisible(false) }}
            animationOut="slideOutDown"
        >
            <FromDateTimePicker />
            <ToDateTimePicker />
            <View style={[styles.popupContainer, { paddingVertical: 15, backgroundColor: 'white', height: filterType == 'All' ? "93%" : "40%", width: "100%", borderRadius: 20, paddingHorizontal: 30, bottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 10 }]}>

                {

                    filterType == 'All' ?
                        <>
                            <ScrollView showsVerticalScrollIndicator={false} >
                                {
                                    ["Start time", "End time", "Theme",]
                                        .map((v, i) => {
                                            if (i == 0) return (
                                                <>
                                                    <FilterHeader
                                                        // showCrossBtn={i == 0 ? true : false} 
                                                        title={v} />

                                                    <TouchableOpacity
                                                        onPress={() => setFromTimeModal(true)}
                                                        style={[styles.shadow, styles.pickerContainer, { marginTop: 20 }]}>
                                                        <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: '#2A2A2A' }}>Start time</Text>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={styles.pickerTitle}>{fromTime} </Text>
                                                            <ArrowDown style={{ marginLeft: 5 }} />
                                                        </View>
                                                    </TouchableOpacity>
                                                </>
                                            )
                                            if (i == 1) return (
                                                <>
                                                    <FilterHeader
                                                        // showCrossBtn={i == 0 ? true : false} 
                                                        title={v} />

                                                    <TouchableOpacity
                                                        onPress={() => setToTimeModal(true)}
                                                        style={[styles.shadow, styles.pickerContainer, { marginTop: 20 }]}>
                                                        <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: '#2A2A2A' }}>End time</Text>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={styles.pickerTitle}>{toTime} </Text>
                                                            <ArrowDown style={{ marginLeft: 5 }} />
                                                        </View>
                                                    </TouchableOpacity>
                                                </>
                                            )
                                            return (
                                                <View style={{ marginTop: 10 }}>

                                                    <FilterHeader
                                                        // showCrossBtn={i == 0 ? true : false} 
                                                        title={v} />
                                                    <View style={{
                                                        marginHorizontal: 2,
                                                        elevation: 5, backgroundColor: 'white', borderTopRightRadius: 10, borderRadius: 10, padding: 15,
                                                        shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
                                                        marginBottom: 10, paddingBottom: 25
                                                    }}>
                                                        <ScrollView showsVerticalScrollIndicator={false} >
                                                            {
                                                                state.happeningSubmissionData?.happeningTheme && state.happeningSubmissionData.happeningTheme?.map((v, i) => {
                                                                    return (
                                                                        <TouchableOpacity
                                                                            onPress={() => {
                                                                                setFilterTheme(v)
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
                                                        </ScrollView>
                                                    </View>
                                                </View>
                                            )
                                        })

                                }
                            </ScrollView>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsVisible(false)
                                    onDone(fromTime, toTime, filterTheme?.happeningThemeName)
                                }}
                                style={{ width: "50%", height: 40, backgroundColor: acolors.primaryLight, borderRadius: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                <Text style={{ fontFamily: fonts.PMe, fontSize: 13, color: '#fff' }}>Done</Text>
                            </TouchableOpacity>
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
                <TouchableOpacity
                    onPress={() => {
                        setIsVisible(false)
                    }}
                    style={{ top: 10, position: 'absolute', right: 10, width: 28, height: 28, borderRadius: 28 / 2, backgroundColor: '#F08F8F', alignItems: 'center', justifyContent: 'center' }}>
                    <CrossIcon width={10} height={18} color="#241414" />
                </TouchableOpacity>
            </View>
        </Modal>

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
        paddingLeft: 8, paddingHorizontal: 10, marginHorizontal: 1
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.4)', shadowOffset: { width: 0.5, height: 0.5 }, shadowRadius: 2, shadowOpacity: 0.5, elevation: 2,
        backgroundColor: 'white'
    },
    pickerTitle: {
        fontFamily: fonts.MBo, fontSize: 12, color: '#2A2A2A'
    },

})

export default HappeningFilterModal
