import { getStatusBarHeight } from 'react-native-safearea-height';
import React from 'react';
import { View, StatusBar, Platform, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';



const GeneralStatusBar = ({ backgroundColor, ...props }) => (
    <View
        style={[
            Platform.OS === 'ios' ? styles.statusBar : styles.statusBar,
            { backgroundColor },
        ]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);
export default GeneralStatusBar;


const STATUSBAR_HEIGHT =
    Platform.OS === 'ios'
        ? DeviceInfo.hasNotch()
            ? getStatusBarHeight(true)
            : 25
        : StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
});
