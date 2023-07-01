// importing local storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';
import { Alert, BackHandler, Dimensions, Linking, PermissionsAndroid, PixelRatio, Platform, Share } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { urls } from './Api_urls';
import Geolocation from '@react-native-community/geolocation';
import { navigate } from '../../Navigations';
import { useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

import GetLocation from 'react-native-get-location'

const { height, width } = Dimensions.get('window');




export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const hOLcomponentsName = [
  "GroupSizeHappeningL",
  "CC1",
  "CC2",
  "CC3",
  "CC4",
  "HappeningTheme",
  "Title1",
  "Title2",
  "Description1",
  "Description2",
  "Images1",
  "Images2",
  "AboutHost",
  "Location1",
  "Duration1",
  "HappeningLanguages",
  "HappeningLanguages1",
  "HappeningSkills",
  "HappeningFacilites",
  "HappeningGroup",
  "HappeningAccessibilty",
  "FellowsGetBack",
  "HappeningMinimumCancellation",
  "SDGLinked",
  "TermsAndLaws",
]


// local storage function that retreives the data
export async function retrieveItem(key) {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {
    console.log(error.message);
  }
  return
}


// store data in lcoalstorage
export async function storeItem(key, item) {
  try {
    var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
}


//validing email
export function validateEmail(text) {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {

    return false;
  }
  else {
    return true;
  }
}


// simple console log, so I can turn it off later
function doConsole(d) {
  console.log(d)
}

export const useForceUpdate = () => {
  const [, updateState] = useState();
  return useCallback(() => updateState({}), []);
}

export function formatDate(dateObj) {
  var month = dateObj.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
    if (dateObj.getDate() < 10) {
      const dat = "0" + dateObj.getDate();
      let date = dateObj.getFullYear() + "-" + month + "-" + dat;
      return date
    }
    else {
      let date = dateObj.getFullYear() + "-" + month + "-" + dateObj.getDate()
      return date
    }
  }
  else {
    if (dateObj.getDate() < 10) {
      const dat = "0" + dateObj.getDate()
      let date = dateObj.getFullYear() + "-" + month + "-" + dat
      return date
    }
    else {
      let date = dateObj.getFullYear() + "-" + month + "-" + dateObj.getDate()
      return date
    }

  }
}

function generateRandomKey(uri) {
  let shortUrl = uri.substring(uri.length - 4, uri.length - 10);
  const randomNum = Math.floor(Math.random() * Math.pow(10, 15));
  const keyString = randomNum.toString().padStart(15, '0') + shortUrl;
  return keyString;
}

export async function uploadSingleFile() {
  try {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },

    })
    let res = result.assets[0];
    let type = res?.type.split('/');
    const photo = {
      uri: res.uri,
      type: res.type,
      name: generateRandomKey(res.uri) + "." + type[1]
      // name: generateRandomKey+type[1]},
    };

    return photo;
    // setGallaryUploadedImgs(results)
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
    } else {
      return {
        errror: "Unknown Error: " + JSON.stringify(err)
      }

    }
  }
}

export async function uploadMultipleFiles(fileType = 'photo') {
  try {
    let results = await launchImageLibrary({
      selectionLimit: 8,
      mediaType: 'photo'
    })
    results = results.assets;
    // await DocumentPicker.pickMultiple({
    //   type: Platform.OS == 'ios' ? '*/*' : [DocumentPicker.types[fileType]],
    // });
    var selectedFiles = [];
    var type;
    let i = 0;
    for (const res of results) {
      type = res?.type.split('/');
      selectedFiles.push({
        uri: res.uri,
        type: res.type,
        name: generateRandomKey(res.uri) + i + "." + type[1]
      })
      i++;
    }
    console.log('these are resasadas', selectedFiles);
    return selectedFiles;
    // setGallaryUploadedImgs(results)
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
    } else {
      return {
        errror: "Unknown Error: " + JSON.stringify(err)
      }

    }
  }
}

export function formatDateToString(dateObj, timeOrDate) {

  var t = dateObj.split(/[- :]/);
  var v = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5] ?? "00"));
  const month = months[v.getMonth()];
  const date = v.getDate();
  const year = v.getFullYear();
  const hours = v.getHours();
  const minutes = v.getMinutes();
  const timeString = date + " " + month + " " + year + "  " + hours + ":" + minutes;
  const dateString = date + " " + month + " " + year + "  " + hours + ":" + minutes;
  return timeOrDate == 'date' ? dateString : timeString
}

async function requestLocationPermission() {

  var granted;
  if (Platform.OS == 'ios') {
    Geolocation.requestAuthorization()
    return 'granted';
  }

  else {
    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message: 'This App needs to Access your event location',
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      },
    );
  }
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    return 'granted';
  } else {
    return 'denied';
  }


}


export async function getUserLocation() {
  // Promisify Geolocation.getCurrentPosition since it relies on outdated callbacks
  let status = await requestLocationPermission()
  if (status !== 'granted') {
    Alert.alert('Permission to access location was denied');
    return;
  }
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        // const { latitude, longitude } = position.coords;
        console.log('i get the location')
        resolve(position.coords);
      },
      (error) => {
        console.log('i get the error')
        // GetLocation.openGpsSettings();
        // Geolocation.openGPs
        // Alert.alert("Please enable location to see nearby happenings")
        resolve({
          error: '1' // LOCATION OFF ERROR
        });
      },
      {
        enableHighAccuracy: true,
        // timeout: 15000,
        // maximumAge: 5,
      },
    )
      ;
  });
}

export function getHOLPreviousScreen(currentScreenName) {
  let findIndex = hOLcomponentsName?.indexOf(currentScreenName)
  return hOLcomponentsName[findIndex - 1]
}



export const capitalizeFirstLetter = (str) => {
  if (str) return str?.charAt(0)?.toUpperCase() + str.slice(1);
};


export function getHeight(h) {
  const elemHeight = parseFloat(h);
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
}

export function getWidth(w) {
  const elemWidth = parseFloat(w);
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
}



// export async function uploadMultipleFiles(fileType = 'photo') {
//   try {
//     let results = await DocumentPicker.pickMultiple({
//       type: Platform.OS == 'ios' ? '*/*' : ['images'],
//     });
//     //  await launchImageLibrary({
//     //   selectionLimit: 8,
//     //   mediaType: 'photo'
//     // })
//     // results = results.assets;

//     // var selectedFiles = [];
//     // var type;
//     // let i = 0;
//     // for (const res of results) {
//     //   type = res?.type.split('/');
//     //   selectedFiles.push({
//     //     uri: res.uri,
//     //     type: res.type,
//     //     name: 'photo' + i + "." + type[1]
//     //   })
//     //   i++;
//     // }
//     // console.log('these are resasadas', selectedFiles);
//     return results;
//     selectedFiles;
//     // setGallaryUploadedImgs(results)
//   } catch (err) {
//     if (DocumentPicker.isCancel(err)) {
//     } else {
//       return {
//         errror: "Unknown Error: " + JSON.stringify(err)
//       }

//     }
//   }
// }