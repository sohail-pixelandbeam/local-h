import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { CrossIcon } from '../components/Svgs'
import { fonts } from '../constants/fonts'

const AlertPopup = forwardRef(({
    headingStyle, descStyle,
    btnTitle = "Close", onPress, containerStyle,
    renderBtn = true,
    children, isCross = true
}, ref) => {

    const [heading, setHeading] = useState(heading);
    const [desc, setDesc] = useState(desc);
    const [isVisible, setIsVisible] = useState(false);
    const [titleColor, setTitleColor] = useState('#ffa183');

    useImperativeHandle(ref, () => ({
        clearText: (v) => {
            setText('')
        },
        alertWithType: (x, title, desc,) => {

            x == 'error' ? setTitleColor('#ffa183') : setTitleColor('#4bb543');
            setHeading(title);
            setDesc(desc);
            setIsVisible(true);
        }

    }))


    return (
        <ReactNativeModal
            isVisible={isVisible}
            backdropColor="#171515"
            backdropOpacity={0.5}
            style={{ margin: 0 }}
            onBackdropPress={() => setIsVisible(false)}
            animationOut="fadeOut"
            animationIn={"fadeIn"}
        >
            <View style={[styles.popupContainer, containerStyle]}>
                {
                    isCross &&

                    <TouchableOpacity
                        onPress={() => setIsVisible(false)}
                        style={styles.crossBtn}>
                        <CrossIcon />
                    </TouchableOpacity>
                }
                <Text style={[styles.popupHeading, headingStyle, { color: titleColor }]}>{heading}</Text>
                <Text style={[styles.popupDesc, descStyle]}>{desc}</Text>

                {children}


                {renderBtn && <TouchableOpacity
                    style={[styles.popupBtn]}
                    onPress={() => setIsVisible(false)}
                >
                    <Text style={styles.popupBtnTitle}>{btnTitle}</Text>
                </TouchableOpacity>
                }
            </View>

        </ReactNativeModal>
    )
})

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

export default AlertPopup

