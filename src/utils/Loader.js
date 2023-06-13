import React from 'react';
// import { Modal, StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import {
    View,
    Image,
    Modal,
    StyleSheet,
    Animated,
    Easing,
    ActivityIndicator
} from "react-native";

// export default function Loader({ isShow = true }) {
//     return (
//         <View style={styles.centeredView}>
//             <Modal animationType="fade" transparent={true} visible={isShow}>
//                 <View style={styles.centeredView}>
//                     <View style={styles.modalView}>
//                         <ActivityIndicator size="large" color="#4E74F9" />
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// }



const Loader = () => {

    var spinValue = new Animated.Value(0);


    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )
    ).start();


    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })


    return (
        <View style={{
            position: "absolute", width: "100%", top: 0, left: 0, right: 0, bottom: 9, flex: 1,
            zIndex: 9999999999, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center",height:1000
        }}>
            <View style={styles.modalView}>
                <ActivityIndicator size="large" color="#4E74F9" />
            </View>
            {/* <Animated.Image
                style={{transform: [{rotate: spin}] , width:40,height:40,zIndex:99999999999999999,backgroundColor:"white",borderRadius:100}}
                source={require("../../assets/loader.png")}
            /> */}
            {/* <Text style={{fontFamily:fonts.PSBIt, letterSpacing:1, fontSize:15,color:'white',textAlign:'center'}}>LH</Text> */}
            {/* </Animated.Image> */}
        </View>);

};
export default Loader;



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

// 1662038