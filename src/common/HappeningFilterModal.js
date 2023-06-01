import React, { useContext, useState } from 'react'
import { TouchableOpacity, View, Text, ScrollView, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { CrossIcon, TickIcon } from '../components/Svgs'
import { fonts } from '../constants/fonts'
import { Context } from '../Context/DataContext'
import { useForceUpdate } from '../utils/functions'



const HappeningFilterModal = ({ filterType, isVisible, setIsVisible }) => {


    const forceUpdate = useForceUpdate();
    const { state } = useContext(Context);
    const [filterModal, setFilterModal] = useState(false);
    // const [filterType, setFilterType] = useState('');
    const [filterTheme, setFilterTheme] = useState('Art & cultural projects');
    const [filterThemesArr, setFilterThemesArr] = useState(state.happeningSubmissionData?.happeningTheme)
    // console.log('happeningTheme', state.happeningSubmissionData.happeningTheme[0])
    // ['Art & cultural projects', 'Business Support', 'Clean Energy & Air', 'Community Work', 'Disaster Relief', 'Education']);


    const FilterHeader = (props) => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', }}>
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



    return (
        <Modal
            isVisible={isVisible}
            backdropColor="#171515"
            // backdropOpacity={0.5}    
            style={{ margin: 0 }}
            onBackdropPress={() => { setIsVisible(false) }}
            animationOut="slideOutDown"
        >
            <View style={[styles.popupContainer, { paddingVertical: 15, backgroundColor: 'white', height: filterType == 'All' ? "80%" : "40%", width: "100%", borderRadius: 20, paddingHorizontal: 30, bottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 10 }]}>

                {

                    filterType == 'All' ?
                        <ScrollView>
                            {
                                ["Theme", "Time of day", "Online", "Languages Spoken"]
                                    .map((v, i) => {
                                        return (
                                            <View style={{ marginTop: 10 }}>
                                                <FilterHeader showCrossBtn={i == 0 ? true : false} title={v} />
                                                <View style={{
                                                    marginHorizontal: 2,
                                                    elevation: 5, backgroundColor: 'white', borderTopRightRadius: 10, borderRadius: 10, padding: 15,
                                                    shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 3, shadowOpacity: 0.5,
                                                    marginBottom: 10, paddingBottom: 25
                                                }}>
                                                    <ScrollView >
                                                        {
                                                            filterThemesArr?.map((v, i) => {
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
})

export default HappeningFilterModal
