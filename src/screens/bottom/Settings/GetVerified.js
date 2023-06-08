import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import React, { useContext, useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import Header from '../../../components/verificationComponents/Header';
import Heading from '../../../components/verificationComponents/Heading';
import Input from '../../../components/verificationComponents/Input';
import Label from '../../../components/verificationComponents/Label';
import Btn from '../../../components/verificationComponents/Btn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context } from '../../../Context/DataContext';
import { BackIcon } from '../../../components/Svgs';
import { goBack } from '../../../../Navigations';
import DropdownAlert from 'react-native-dropdownalert';



var alertRef;
export default function GetVerified({ navigation }) {
    const { state } = useContext(Context);
    let [payload, setPayload] = useState({
        id_issuing_country: null,
        type_of_id: null,
        upload_image_of_id: null,
        category: null,
        category_type: null,
        also_known_as: null,
        add_links: null,
    });

    const handleCountry = val => {
        payload.id_issuing_country = val;
        setPayload({ ...payload });
    };

    const handleTypeOfId = id => {
        payload.type_of_id = id;
        setPayload({ ...payload });
    };

    const docPicker = async () => {
        try {
            let doc = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images],
            });
            payload.upload_image_of_id = doc;
            setPayload({ ...payload });
        } catch (err) {
            alertRef.alertWithType('error', "Error", 'Unable to upload img');
            return;
        }
    };

    const clearImg = () => {
        payload.upload_image_of_id = null;
        setPayload({ ...payload });
    };

    const coutnryValidation = () => {
        if (!payload.id_issuing_country) {
            alertRef.alertWithType('error', "Error", "Please enter country name");
            return;
        }
    }

    const typeOfIdValidation = () => {
        if (!payload.type_of_id) {
            alertRef.alertWithType('error', "Error", "Please enter type of ID");
            return;
        }
    }

    const goNext = () => {
        if (
            payload.id_issuing_country &&
            payload.type_of_id &&
            payload.upload_image_of_id
        ) {
            navigation.navigate('GetVerifiedDetails', payload);
        } else {
            alertRef.alertWithType('error', "Error", "Required Fields are missing");
            return;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.containerMain}>
                <ScrollView style={styles.containerUpper}>
                    <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => goBack()}>
                            <BackIcon color="#5B4DBC" />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: state.profileData?.profileImage }}
                            style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                        />
                    </View>
                    <Heading style={{ marginTop: 50 }}>Government</Heading>
                    <Heading color="#414141" >ID</Heading>
                    <Input
                        label="ID issuing country"
                        onChangeText={handleCountry}
                        onBlur={coutnryValidation}
                        value={payload.id_issuing_country}
                    />
                    <Input
                        label="Type of ID"
                        onChangeText={handleTypeOfId}
                        onBlur={typeOfIdValidation}
                        value={payload.type_of_id}
                    />
                    <Label style={{ marginTop: 20 }}>Upload image of ID</Label>
                    <View style={styles.imgUploadBox}>

                        <TouchableOpacity onPress={docPicker} style={styles.plus}>
                            <Image source={require('../../../components/verificationComponents/assets/img/+.png')} />
                        </TouchableOpacity>
                        <Label style={{ fontSize: 10 }}>Upload</Label>
                    </View>
                    <View>
                        <Label>Uplaoded image</Label>
                        <View style={styles.uploadedImg}>
                            {payload.upload_image_of_id && (
                                <Image
                                    source={{
                                        uri: payload.upload_image_of_id.uri,
                                    }}
                                    style={styles.uploadedImg}></Image>
                            )}
                        </View>
                        <TouchableOpacity onPress={clearImg}>
                            <View style={styles.crossBox}>
                                <Image source={require('../../../components/verificationComponents/assets/img/cross.png')}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 80 }}></View>
                </ScrollView>
                <View style={styles.footer}>
                    <Btn label="Done" onPress={goNext} />
                </View>
                <DropdownAlert ref={(ref) => alertRef = ref} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerMain: {
        backgroundColor: 'white',
        height: '100%',
    },
    containerUpper: {
        padding: 20,
        backgroundColor: 'white',
        height: '92%',
    },
    footer: {
        backgroundColor: 'white',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingEnd: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    imgUploadBox: {
        alignItems: 'center',
        paddingTop: 20,
    },
    plus: {
        backgroundColor: 'white',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.16,
        shadowRadius: 1.51,
        elevation: 2,
    },
    uploadedImg: {
        width: '100%',
        maxWidth: 300,
        minHeight: 143,
        backgroundColor: '#F5F5F5',
        borderRadius: 34,
        overflow: 'hidden',
    },
    crossBox: {
        width: 24,
        height: 24,
        backgroundColor: '#F08F8F',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -143,
        marginLeft: 280,
    },
});