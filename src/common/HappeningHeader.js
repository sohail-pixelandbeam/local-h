import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar } from 'react-native'
import { goBack } from '../../Navigations'
import { BackIcon } from '../components/Svgs'
import { acolors } from '../constants/colors'
import { fonts } from '../constants/fonts'



const HappeningHeader = ({ heading, desc, imageUrl, headerStyle, showBackBtn = false, titleStyle, imageStyle }) => (
    <View style={[styles.header, headerStyle]}>

        {showBackBtn &&
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ marginLeft: -10, padding: 15, marginBottom: 20 }}
            >
                <BackIcon />
            </TouchableOpacity>
        }
        {
            imageUrl &&
            <Image
                style={[{ alignSelf: 'center' }, imageStyle]}
                source={imageUrl}
            />
        }
        <Text style={[styles.heading, showBackBtn && {
            marginTop: 10,
        }, titleStyle]}>{heading}</Text>
        <Text style={styles.desc}>{desc}</Text>

    </View>
)


const styles = StyleSheet.create({
    header: {
        width: "100%", paddingHorizontal: 20, paddingBottom: 50, paddingTop: 10,
        backgroundColor: '#35208E'
    },
    heading: {
        fontFamily: fonts.PBo, fontSize: 29, color: "#FFFFFF",
        lineHeight: 43,
    },
    desc: {
        fontFamily: fonts.MRe, fontSize: 10, color: '#FFFFFF', marginTop: 10, lineHeight: 15
    }
})


export default HappeningHeader;