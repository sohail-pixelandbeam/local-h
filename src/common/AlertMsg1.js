import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { CrossIcon } from '../components/Svgs'
import { fonts } from '../constants/fonts'

const AlertMsg1 = ({
    heading = "Hey", desc = "Desc", headingStyle, descStyle,
    btnTitle = "Next", btnTitle2, onPress, containerStyle,
    onBackdropPress, state = false, renderBtn1 = true,
    children, isCross = true, renderBtn2 = false,
}) => {
    return (
        <ReactNativeModal
            isVisible={state}
            backdropColor="#171515"
            backdropOpacity={0.5}
            style={{ margin: 0 }}
            onBackdropPress={() => onBackdropPress()}
            animationOut="slideOutDown"
        >
            <View style={[styles.popupContainer, containerStyle]}>
                {
                    isCross &&
                    <TouchableOpacity
                        onPress={() => onBackdropPress()}
                        style={styles.crossBtn}>
                        <CrossIcon color='black' />
                    </TouchableOpacity>
                }
                <Text style={[styles.popupHeading, headingStyle]}>{heading}</Text>
                <Text style={[styles.popupDesc, descStyle]}>{desc}</Text>

                {children}


                {renderBtn1 && <TouchableOpacity
                    style={[styles.popupBtn]}
                    onPress={onPress}
                >
                    <Text style={styles.popupBtnTitle}>{btnTitle}</Text>
                </TouchableOpacity>
                }
                {renderBtn2 && <TouchableOpacity
                    style={[styles.popupBtn2]}
                    onPress={onPress}
                >
                    <Text style={[styles.popupBtnTitle, { color: '#5b4dbc' }]}>{btnTitle2}</Text>
                </TouchableOpacity>
                }

            </View>

        </ReactNativeModal>
    )
}

const styles = StyleSheet.create({
    popupContainer: {
        width: "80%", paddingBottom: 60,
        borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.98)',
        alignSelf: 'center', paddingHorizontal: 15
    },
    popupHeading: {
        color: '#ffa183', fontFamily: fonts.PBo, fontSize: 21, marginTop: 20
    },
    popupBtn: {
        width: 91, height: 35, borderRadius: 20, backgroundColor: '#5b4dbc',
        position: 'absolute', bottom: 15, right: 10,
        alignItems: 'center', justifyContent: 'center',
        borderColor: '#5b4dbc',
        borderWidth: 1,
    },
    popupBtn2: {
        width: 91, height: 35, borderRadius: 20, backgroundColor: 'white',
        position: 'absolute', bottom: 15, right: 110,
        alignItems: 'center', justifyContent: 'center',
        borderColor: '#5b4dbc',
        borderWidth: 1,
    },
    popupBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 11,
    },
    popupDesc: {
        color: '#241414', fontFamily: fonts.MRe, fontSize: 12, marginTop: Platform.OS == 'ios' ? 5 : 0
    },
    crossBtn: {
        position: 'absolute', top: -10, right: -10, width: 28, height: 28, borderRadius: 28 / 2,
        backgroundColor: '#F08F8F', elevation: 2, alignItems: 'center', justifyContent: 'center'
    },
})

export default AlertMsg1

