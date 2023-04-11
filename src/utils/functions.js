// importing local storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';
import { Alert, BackHandler, Linking, PermissionsAndroid, Platform, Share } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { urls } from './Api_urls';
import Geolocation from '@react-native-community/geolocation';
import { navigate } from '../../Navigations';
import { useRoute } from '@react-navigation/native';




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


export async function uploadSingleFile() {
  try {
    const result = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images],
    });
    return result;
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

export async function uploadMultipleFiles(fileType = 'images') {
  try {
    const results = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types[fileType]],
    });
    var selectedFiles = [];
    var i = 0;
    for (const res of results) {
      selectedFiles[i] = res
      i++;
    }
    return results;
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
        resolve(position.coords);
      },
      (error) => {
        Alert.alert("Please enable location to see nearby happenings")
        reject(error);
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

