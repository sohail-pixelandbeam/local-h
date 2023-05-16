import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { acolors } from '../constants/colors'
import { fonts } from '../constants/fonts'

const TipsButton = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.tipsBtn]}
            onPress={() => onPress()}
        >
            <Text style={styles.topsBtnTitle}>{"Tips"}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    tipsBtn: {
        width: 91, height: 32, borderRadius: 20, backgroundColor: 'white',
        alignItems: 'center', justifyContent: 'center', borderWidth: 2,
        marginTop: 20, borderColor: acolors.primary,alignSelf:'flex-end'
    },
    topsBtnTitle: {
        color: acolors.primary, fontFamily: fonts.PSBo, fontSize: 10,
    },

})

export default TipsButton
