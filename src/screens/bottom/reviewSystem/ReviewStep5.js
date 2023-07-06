import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, StatusBar, FlatList, ScrollView, BackHandler } from 'react-native'
import { navigate } from '../../../../Navigations'
import { acolors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import Btn from '../../../components/verificationComponents/Btn'
import { apiRequest } from '../../../utils/apiCalls'
import Loader from '../../../utils/Loader'
import DropdownAlert from 'react-native-dropdownalert'


var alertRef;
export default function ReviewStep5({ route }) {

    const payload = route.params;
    const [loading, setLoading] = useState(false);

    const submitReview = () => {
        navigate('ReviewStep9', payload);
        return;
        setLoading(true)
        payload.reviewedAt = new Date().toString()
        apiRequest(payload, 'rating-and-review/fellow-review-a-host')
            .then(data => {
                if (data.status) {
                    setLoading(false);
                    navigate('ReviewStep9', payload);

                }
                else {
                    alertRef.alertWithType("error", "Error", data.message);
                    setLoading(false);
                }
            })
            .catch(err => {
                setLoading(false)
                alertRef.alertWithType("error", "Error", "Network Error");
            })
    }
    return (
        <View style={styles.contentContainer}>
            <StatusBar
                backgroundColor={acolors.theme2}
                barStyle={"light-content"}
            />

            <Text style={styles.heading} >{'Help us to know \nmore about this \nHappening.'}</Text>
            <Text style={styles.heading} >{'You can skip this\nand post your review,\nbut we would be\nhappy to be helped:)'}</Text>
            <View style={styles.btns} >
                <Btn label='Skip' onPress={submitReview} style={styles.btn} color={acolors.primaryLight} bgColor={acolors.theme2} />
                <Btn label='Next' onPress={() => {
                    navigate('ReviewStep6', payload)
                }} style={styles.btn} bgColor={acolors.primaryLight} />
            </View>

            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: acolors.theme2,
        width: "100%",
        height: '100%',
        paddingHorizontal: 25,
        paddingTop: 50,
        justifyContent: 'space-evenly'

    },
    content: {
        width: "100%", paddingHorizontal: 10, paddingVertical: 15, alignItems: 'center',
        backgroundColor: '#FFFFFF', elevation: 2, marginTop: 15, borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowRadius: 3, shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
    },
    text: {
        color: 'gray', fontFamily: fonts.PMe, fontSize: 12, marginBottom: 40
    },
    textBold: {
        color: '#5D5760', fontFamily: fonts.PMe, fontSize: 18, fontWeight: 'bold'
    },
    heading: {
        fontFamily: fonts.PBo, fontSize: 29,
        lineHeight: 43, color: 'white'
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    btn: {
        marginEnd: 20,
        height: 40,
        width: 110,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: acolors.primaryLight
    }
})

