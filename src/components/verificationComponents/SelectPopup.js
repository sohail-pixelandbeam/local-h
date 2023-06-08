import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Label from './Label';

export default function SelectPopup({
    isShow,
    setter,
    heading,
    dataArr,
    selected,
    setSelected,
}) {
    const selectItem = item => {
        setSelected(item);
        setter(false);
    };
    return (
        <View>
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={isShow}
                onRequestClose={() => {
                    setter(false);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.box} >
                        <View style={styles.headingView}>
                            <View style={styles.headingBox}>
                                <Label style={{ fontSize: 18 }}>{heading}</Label>
                                <TouchableOpacity onPress={() => setter(false)}>
                                    <View style={styles.crossBox}>
                                        <Image source={require('./assets/img/cross.png')}></Image>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView style={styles.modalView}>
                            {dataArr &&
                                dataArr.length > 0 &&
                                dataArr.map((item, i) => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.option}
                                            key={i}
                                            onPress={() => selectItem(item)}>
                                            <Label style={{ color: 'black', fontWeight: '600' }}>
                                                {item}
                                            </Label>
                                            <View style={styles.circle}>
                                                {item === selected && (
                                                    <Image source={require('./assets/img/tick.png')} />
                                                )}
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            {/* <View style={{ height: 20 }} /> */}
                        </ScrollView>

                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        paddingBottom: 60,
        padding: 0,
    },
    box: {
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,

    },
    headingView: {
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginBottom: 10,
    },
    modalView: {
        width: '100%',
        maxHeight: 170,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingBottom: 20,
        borderRadius: 8,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
        marginHorizontal: 10,
    },
    crossBox: {
        width: 24,
        height: 24,
        backgroundColor: '#F08F8F',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.16,
        shadowRadius: 1.51,
        elevation: 2,
    },
    tick: {
        width: 20,
        height: 20,
    },
});
