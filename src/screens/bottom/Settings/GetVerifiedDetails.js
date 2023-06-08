import {
    StyleSheet,
    ToastAndroid,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../../components/verificationComponents/Header';
import Heading from '../../../components/verificationComponents/Heading';
import Label from '../../../components/verificationComponents/Label';
import SelectPopup from '../../../components/verificationComponents/SelectPopup';
import Input from '../../../components/verificationComponents/Input';
import Btn from '../../../components/verificationComponents/Btn';
import Loader from '../../../components/verificationComponents/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../../Context/DataContext';
import { BackIcon } from '../../../components/Svgs';
import { goBack } from '../../../../Navigations';
import { apiFormDataRequest } from '../../../utils/apiCalls';


var alertRef;
export default function GetVerifiedDetails({ navigation, route }) {
    const { state } = useContext(Context);
    let [isSelectingCategory, setIsSelectingCategory] = useState(false);
    let [selectedCategory, setSelectedCategory] = useState('');
    let categories = [
        'News/Media',
        'Sports',
        'Government and Politics',
        'Music',
        'Fashion',
        'Entertainment',
        'Digital Creator/Blogger/Influencer',
        'Gamer',
        'Global Business Organization',
        'Other',
    ];
    let [isSelectingType, setIsSelectingType] = useState(false);
    let [selectedType, setSelectedType] = useState('');
    let types = ['Passport', 'Driving-License', 'Other Legal Document'];
    let [link, setLink] = useState('');
    let [isLoading, setIsLoading] = useState(false);

    let [payload, setPayload] = useState({
        id_issuing_country: null,
        type_of_id: null,
        upload_image_of_id: null,
        category: null,
        category_type: null,
        also_known_as: null,
        add_links: [],
    });

    const selectCategory = () => {
        setIsSelectingCategory(true);
    };

    const selectType = () => {
        setIsSelectingType(true);
    };

    const handleAlsoKnownAs = val => {
        payload.also_known_as = val;
        setPayload({ ...payload });
    };

    const handleAddLink = () => {
        if (link) {
            payload.add_links.push(link);
            setLink('');
        } else {
            alertRef.alertWithType('error', "Error", 'Please Enter link');
            return;
        }
    };

    const onSubmitRequest = () => {
        setIsLoading(true);
        payload.id_issuing_country = route.params.id_issuing_country;
        payload.type_of_id = route.params.type_of_id;
        payload.upload_image_of_id = route.params.upload_image_of_id;
        if (
            payload.id_issuing_country &&
            payload.type_of_id &&
            payload.upload_image_of_id &&
            payload.category &&
            payload.category_type
        ) {

            console.log('Shukr alhmdolellah');
            apiFormDataRequest(payload, 'auth/profile/update-profile-verification')
                .then(data => {
                    navigation.navigate('VerificationSubmitted')
                    console.log('data====', data)
                    if (data.status) {
                        alertRef.alertWithType('success', "Success", "Request Submitted Successfully")
                    }
                    else {
                        alertRef.alertWithType("error", "Error", data.message);
                        setIsLoading(false);
                    }
                })
                .catch(err => {

                    setIsLoading(false)
                    alertRef.alertWithType("error", "Error", "Network Error");
                })

            // const apiUrl =
            //     'http://52.57.23.48:3001/api/v1/profile/update-profile-verification';
            // const authToken =
            //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDAzOTEyMjNiMzcxMzk0M2I5MDI0MzYiLCJpYXQiOjE2ODU3NzI5ODJ9.lE2CAjTeP3xTlTfv6GwYlHtlk1xE_uTAX5Zvt5k28FU';
            // const dataObject = payload;

            // const formData = new FormData();
            // formData.append('id_issuing_country', payload.id_issuing_country);
            // formData.append('type_of_id', payload.type_of_id);
            // formData.append('upload_image_of_id', payload.upload_image_of_id);
            // formData.append('category', payload.category);
            // formData.append('category_type', payload.category_type);
            // formData.append('also_known_as', payload.also_known_as);
            // formData.append('add_links', payload.add_links);
            // console.log('My Form data', formData)
            // fetch(apiUrl, {
            //     method: 'POST',
            //     headers: {
            //         Authorization: `Bearer ${authToken}`,
            //         'Content-Type': 'multipart/form-data',
            //     },
            //     body: formData,
            // })
            //     .then(response => response.json())
            //     .then(data => {
            //         // Handle the response data
            //         setIsLoading(false);
            //         console.log('Api called successfuly');
            //         navigation.navigate('verificationSubmission');
            //     })
            //     .catch(error => {
            //         // Handle any errors
            //         console.log(error);
            //         setIsLoading(false);
            //     });
        } else {
            alertRef.alertWithType('error', "Error", 'Required Fields are missing.');
            setIsLoading(false);
            return;
        }
    };

    useEffect(() => {
        setPayload({ ...route.params });
    }, []);

    useEffect(() => {
        payload.category = selectedCategory;
        setPayload({ ...payload });
    }, [selectedCategory]);

    useEffect(() => {
        payload.category_type = selectedType;
        setPayload({ ...payload });
    }, [selectedType]);

    return (
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
                <Heading style={{ marginTop: 50 }}>Apply for Profile</Heading>
                <Heading color="#414141">Verification</Heading>
                <Label>Step 1: Confirm Authenticity</Label>
                <TouchableOpacity style={styles.confirmAuthenticityBox}>
                    {/* <Label>Upload a Govt Approved ID</Label> */}
                    <Image
                        source={{
                            uri: route.params.upload_image_of_id.uri,
                        }}
                        style={styles.confirmAuthenticityBox}></Image>
                </TouchableOpacity>
                <Label style={{ marginTop: 25 }}>Step 2: Confirm Nationality</Label>
                <View style={styles.confirmNationalityBox}>
                    <TouchableOpacity onPress={selectCategory}>
                        <Label style={{ marginTop: 0 }}>
                            {selectedCategory ? selectedCategory : 'Category'}
                        </Label>
                    </TouchableOpacity>
                    {/* Select box to select category */}
                    <SelectPopup
                        heading="Category"
                        dataArr={categories}
                        selected={selectedCategory}
                        setSelected={setSelectedCategory}
                        isShow={isSelectingCategory}
                        setter={setIsSelectingCategory}></SelectPopup>
                    <View style={styles.line}></View>
                    <TouchableOpacity>
                        <Label>{route.params.id_issuing_country}</Label>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <Input
                        label="Also Known as (optional)"
                        onChangeText={handleAlsoKnownAs}
                        value={payload.also_known_as}
                        labelStyle={{ marginBottom: 3 }}
                    />
                </View>
                <Label style={{ marginTop: 25 }}>Step 3: Add Links(optional)</Label>
                <View style={styles.confirmNationalityBox}>
                    <TouchableOpacity onPress={selectType}>
                        <Label style={{ marginTop: 0 }}>
                            {selectedType ? selectedType : 'Type'}
                        </Label>
                    </TouchableOpacity>
                    {/* Select box to select type */}
                    <SelectPopup
                        heading="Type"
                        dataArr={types}
                        selected={selectedType}
                        setSelected={setSelectedType}
                        isShow={isSelectingType}
                        setter={setIsSelectingType}></SelectPopup>
                    <View style={styles.line}></View>
                    <Input
                        label="URL"
                        onChangeText={val => {
                            setLink(val);
                        }}
                        value={link}
                        labelStyle={{ marginBottom: 3 }}
                    />
                    <TouchableOpacity onPress={handleAddLink}>
                        <Label style={{ alignSelf: 'flex-end', fontSize: 12 }}>
                            + Add Link
                        </Label>
                    </TouchableOpacity>
                    <View>
                        {payload.add_links &&
                            payload.add_links.length > 0 &&
                            payload.add_links.map((e, i) => {
                                return (
                                    <Label style={{ color: '#35208E' }} key={i}>
                                        {e}
                                    </Label>
                                );
                            })}
                    </View>
                </View>

                <View style={{ height: 50 }}></View>
            </ScrollView>
            <View style={styles.footer}>
                <Btn label="Submit" onPress={onSubmitRequest} />
            </View>
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <Loader isShow={isLoading} />
        </View>
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
        zIndex: 99,
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
    confirmAuthenticityBox: {
        width: '100%',
        maxWidth: 335,
        height: 143,
        backgroundColor: '#F5F5F5',
        borderRadius: 34,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    confirmNationalityBox: {
        width: '100%',
        backgroundColor: '#F5F5F5',
        borderRadius: 34,
        padding: 20,
    },
    line: {
        height: 1,
        backgroundColor: 'black',
    },
    uploadedImg: {
        width: '100%',
        maxWidth: 335,
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
