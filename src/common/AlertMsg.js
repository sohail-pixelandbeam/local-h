import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { CrossIcon } from '../components/Svgs'
import { fonts } from '../constants/fonts'

const AlertMsg = ({
    heading = "Hey", desc = "Desc", headingStyle, descStyle,
    btnTitle = "Next", onPress, containerStyle,
    onBackdropPress, state = false, renderBtn = true,
    children,
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
                <TouchableOpacity
                    onPress={() => onBackdropPress()}
                    style={styles.crossBtn}>
                    <CrossIcon />
                </TouchableOpacity>
                <Text style={[styles.popupHeading, headingStyle]}>{heading}</Text>
                <Text style={[styles.popupDesc, descStyle]}>{desc}</Text>

                {children}


                {renderBtn && <TouchableOpacity
                    style={[styles.popupBtn]}
                    onPress={onPress}
                >
                    <Text style={styles.popupBtnTitle}>{btnTitle}</Text>
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
        width: 91, height: 32, borderRadius: 20, backgroundColor: '#5b4dbc',
        position: 'absolute', bottom: 15, right: 10,
        alignItems: 'center', justifyContent: 'center'
    },
    popupBtnTitle: {
        color: '#ffffff', fontFamily: fonts.PSBo, fontSize: 9,
    },
    popupDesc: {
        color: '#241414', fontFamily: fonts.MRe, fontSize: 12, marginTop: Platform.OS == 'ios' ? 5 : 0
    },
    crossBtn: {
        position: 'absolute', top: -20, right: -20, width: 43, height: 43, borderRadius: 43 / 2,
        backgroundColor: 'white', elevation: 2, alignItems: 'center', justifyContent: 'center'
    },
})

export default AlertMsg

