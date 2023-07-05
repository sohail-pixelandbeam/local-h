import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput, SafeAreaView } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { ScrollView } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import { goBack, navigate } from '../../../../Navigations';
import { ArrowForward, BackIcon, PlusIcon } from '../../../components/Svgs';
import { acolors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { Context } from '../../../Context/DataContext';
import { apiRequest } from '../../../utils/apiCalls';
import Loader from '../../../utils/Loader';
import GeneralStatusBar from '../../../components/GernalStatusBar';
import PrivacyPicker from '../../../components/PrivacyPicker';
import { urls } from '../../../utils/Api_urls';
import { retrieveItem, storeItem } from '../../../utils/functions';
import AlertPopup from '../../../common/AlertPopup';

var alertRef;
var textInputRef;

const PersonalInfo = () => {



    const [loading, setLoading] = useState(false);
    const [createWishListModal, setCreateWishListModal] = useState(false);
    const [wishListName, setWishListName] = useState('');
    const [wishList, setWishList] = useState([]);
    const { state, setUserGlobal, userProfileData } = useContext(Context);

    const user = { ...state.profileData, ...state.userData } ?? {}
    let dateOfBirth = user.dateOfBirth.replaceAll(' ', '/');
    console.log('dateOfBirth', dateOfBirth)
    let splitDateOfBirth = user.dateOfBirth.split(' ');
    let x = splitDateOfBirth[1];
    let y = parseInt(x) < 10 && x.length == 2 ? x[1] : parseInt(x);


    const [personalInfo, setPersonalInfo] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber,
        address: user.address,
        emergencyContact: user.emergencyContact
    })

    const [inputs, setInputs] = useState([
        { name: 'First name', value: 'firstName' },
        { name: 'Last name', value: 'lastName' },
        { name: 'Phone number', value: 'phoneNumber' },
        { name: 'Date of birth', value: 'dateOfBirth' },
        { name: 'Address', value: 'address' },
        { name: 'Emergency Contact', value: 'emergencyContact' },

    ])

    const monthsArr = [
        { title: "January" },
        { title: "February" },
        { title: "March" },
        { title: "April" },
        { title: "May" },
        { title: "June" },
        { title: "July" },
        { title: "August" },
        { title: "September" },
        { title: "October" },
        { title: "November" },
        { title: "December" },
    ]
    const [daysArr, setDayArr] = useState([]);
    const [yearsArr, setYearArr] = useState([]);
    const [ccArr, setCcArr] = useState([]); // COUNTRY CODES ARRAY



    const [day, setDay] = useState(splitDateOfBirth[0]);
    const [month, setMonth] = useState(monthsArr[y - 1]?.title);
    const [year, setYear] = useState(splitDateOfBirth[2]);
    const [isEdit, setIsEdit] = useState(false)



    function makeStaticArrays() {
        let arr = [];
        for (let i = 1; i <= 31; i++) {
            arr.push({
                title: i.toString()
            })
        }
        setDayArr(arr);
        arr = [];
        for (let i = 1910; i <= 2023; i++) {
            arr.push({
                title: i
            });
        }
        setYearArr(arr);
        arr = [];
        for (let i = 1; i <= 500; i++) {
            arr.push({
                title: i
            });
        }
        setCcArr(arr);

    }

    const doSave = async () => {
        if (personalInfo.firstName == '' || personalInfo.firstName.length < 2) {
            alertRef.alertWithType('error', 'Error', 'Please enter valid first name')
            return;
        }
        if (personalInfo.lastName == '') {
            alertRef.alertWithType('error', 'Error', 'Please enter valid first name')
            return;
        }
        if (personalInfo.lastName == '') {
            alertRef.alertWithType('error', 'Error', 'Please enter valid last name')
            return;
        }
        if (personalInfo.phoneNumber == '' || personalInfo.phoneNumber.length < 9) {
            alertRef.alertWithType('error', 'Error', 'Please enter valid phone number')
            return;
        }

        setLoading(true)

        let getMonth = monthsArr.findIndex((v) => month?.title == v.title) + 1;
        if (getMonth < 10) getMonth = "0" + getMonth.toString();
        const birthday = day + " " + getMonth + " " + year;
        console.log('birthday', birthday)

        const body = {
            firstName: personalInfo.firstName,
            lastName: personalInfo.lastName,
            dateOfBirth: birthday ?? personalInfo.dateOfBirth,
            phoneNumber: personalInfo.phoneNumber,
            address: personalInfo.address,
            emergencyContact: personalInfo.emergencyContact,
        }

        const formData = new FormData();
        formData.append('firstName', personalInfo.firstName);
        formData.append('lastName', personalInfo.lastName);
        formData.append('dateOfBirth', birthday ?? personalInfo.dateOfBirth);
        formData.append('phoneNumber', personalInfo.phoneNumber);
        formData.append('address', personalInfo.address);
        formData.append('emergencyContact', personalInfo.emergencyContact);
        var myHeaders = new Headers();
        let token = await retrieveItem('login_data');
        myHeaders.append("Authorization", `Bearer ${token.token}`);



        let url = urls.API + "profile/update-profile";



        fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: formData
        })
            .then(data => data.json())
            // .then(data => data.text())
            .then(data => {
                console.log('data===', data)
                console.log('status ===', data.status)
                if (data.status) {
                    alertRef.alertWithType('success', 'Profile updated');
                    getProfileDetails()
                }
                else setLoading(false)
            })
            .catch(error => {
                console.log('error', error)
                setLoading(false);

            })




    }


    async function getProfileDetails() {
        setLoading(true);
        // console.log('getMyHosting/' + state.userData._id)
        apiRequest('', 'auth/getUserDetails', 'GET')
            .then(async data => {
                setLoading(false);
                if (data.status) {
                    let token = await retrieveItem('login_data');
                    let userData = { ...data.data.loginUser, token: token.token }

                    storeItem('login_data', userData)
                    storeItem('profile_data', data.data.userProfile)
                    setUserGlobal(data.data.loginUser)
                    userProfileData(data.data.userProfile)
                    goBack();
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    };




    useEffect(() => {
        makeStaticArrays();

    }, [])

    const PersonalInfoView = () => {
        return (
            <View style={{ backgroundColor: '#F8F8F8', width: "100%", borderRadius: 20, paddingTop: 20, paddingHorizontal: 10, paddingBottom: 10 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >

                    <TouchableOpacity
                        style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                        <View>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Legal name</Text>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>{user.firstName + " " + user.lastName}</Text>
                        </View>
                        {/* <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Edit</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                        <View>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Date of Birth</Text>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>{dateOfBirth}</Text>
                        </View>
                        {/* <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Edit</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                        <View>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Email address</Text>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>{user.userEmail}</Text>
                        </View>
                        {/* <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Edit</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                        <View>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Phone number</Text>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>{user.phoneNumber}</Text>
                        </View>
                        {/* <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Edit</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                        <View>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Address</Text>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>{user.address}</Text>
                        </View>
                        {/* <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Edit</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#707070', marginTop: 20 }}>
                        <View>
                            <Text style={{ fontFamily: fonts.PSBo, fontSize: 14, color: '#5D5760' }}>Emergency Contact</Text>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5D5760' }}>{user.emergencyContact}</Text>
                        </View>
                        {/* <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#5B4DBC' }}>Edit</Text> */}
                    </TouchableOpacity>

                </ScrollView>
            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <GeneralStatusBar backgroundColor='#fff' />


            <View style={{ width: "90%", alignSelf: 'center' }}>

                <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-between', }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ padding: 10 }}>
                        <BackIcon color="#5B4DBC" />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: state.profileData?.profileImage }}
                        style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <View>
                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 21, color: '#5B4DBC', }}>Personal</Text>
                        <Text style={{ fontFamily: fonts.PRe, fontSize: 21, color: '#414141' }}>Info</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (isEdit) {
                                doSave()
                                return;
                            }
                            setIsEdit(!isEdit)
                        }}
                        style={{ padding: 5 }}>
                        <Text style={{ fontFamily: fonts.PSBo, fontSize: 16, color: '#5B4DBC' }}>{isEdit ? "Save" : "Edit"}</Text>
                    </TouchableOpacity>
                </View>

                {
                    isEdit ?
                        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} >
                            {

                                inputs.map((v, i) => {
                                    return (
                                        <>
                                            <Text style={styles.aboutHeading}>{v.name}</Text>
                                            {
                                                v.value == 'dateOfBirth' ?
                                                    <>
                                                        <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10, marginLeft: -20 }}>
                                                            <View style={[styles.shadow, styles.dateOfBirthPicker]}>
                                                                <PrivacyPicker
                                                                    selected={{ title: day ?? "Date" }}
                                                                    data={daysArr}
                                                                    onValueChange={(i, v) => { setDay(v.title); }}
                                                                />
                                                            </View>
                                                            <View style={[styles.shadow, styles.dateOfBirthPicker,]}>
                                                                <PrivacyPicker
                                                                    selected={{ title: month ?? "Month" }}
                                                                    data={monthsArr}
                                                                    onValueChange={(i, v) => {
                                                                        setMonth(v);
                                                                    }}
                                                                />
                                                            </View>
                                                            <View style={[styles.shadow, styles.dateOfBirthPicker]}>
                                                                <PrivacyPicker
                                                                    selected={{ title: year ?? "Year" }}
                                                                    data={yearsArr}
                                                                    onValueChange={(i, v) => { setYear(v.title); }}
                                                                />
                                                            </View>

                                                        </View>
                                                    </>
                                                    :

                                                    <TextInput

                                                        defaultValue={personalInfo[v.value].toString()}
                                                        value={personalInfo[v.value]}
                                                        onChangeText={(text) => {
                                                            setPersonalInfo({
                                                                ...personalInfo,
                                                                [v.value]: text
                                                            })
                                                        }}
                                                        placeholderTextColor={"#7b7b7b"}
                                                        style={styles.textInput}
                                                    />
                                            }
                                        </>
                                    )
                                })
                            }
                        </ScrollView>
                        :
                        <PersonalInfoView />

                }

            </View>
            <AlertPopup ref={(ref) => alertRef = ref} />
            {loading && <Loader />}
        </View >
    )
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.2)', shadowOffset: { width: 2, height: 2 }, shadowRadius: 0, shadowOpacity: 0.5, elevation: 5,
        backgroundColor: 'white'
    },
    aboutHeading: {
        fontFamily: fonts.PMe, fontSize: 15, color: '#ffa183', marginTop: 10
    },
    textInput: {
        width: "100%", height: 40, borderRadius: 10, borderColor: '#2a2a2a', borderWidth: 1,
        fontSize: 12, color: "#7b7b7b", fontFamily: fonts.MRe, paddingHorizontal: 10, marginTop: 5,
        marginTop: 10
    },
    dateOfBirthPicker: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 36, borderRadius: 10,
        maxWidth: 90, paddingLeft: 8
    },
})

export default PersonalInfo

