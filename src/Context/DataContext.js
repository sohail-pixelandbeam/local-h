import createDataContext from "./createDataContext";
// import React from 'react'









const dataReducer = (state, action) => {
    switch (action.type) {
        case 'setUserData':
            return { ...state, userData: action.payload }
        case 'setUserProfileData':
            return { ...state, profileData: action.payload }
        case 'setUserLocation':
            return { ...state, userLocation: action.payload }
        case 'makeHappening':
            return { ...state, happeningDraft: action.payload }
        case 'makeLocationHappening':
            return { ...state, locationHappeningDraft: action.payload }
        case 'setHappeningSubmissionDataGlobal':
            return { ...state, happeningSubmissionData: action.payload }
        case 'setWhishListsGlobal':
            return { ...state, whishLists: action.payload }
        default: return state
    }

}


const setUserGlobal = dispatch => {
    return (data) => {
        dispatch({ type: 'setUserData', payload: data })
    }
}

const setUserLocationGlobal = dispatch => {
    return (data) => {
        dispatch({ type: 'setUserLocation', payload: data })
    }
}

const userProfileData = dispatch => {
    return (data) => {
        dispatch({ type: 'setUserProfileData', payload: data })
    }
}

const setHappeningData = dispatch => {
    return (data) => {
        dispatch({ type: 'makeHappening', payload: data })
    }
}
const setLocationHappeningData = dispatch => {
    return (data) => {
        dispatch({ type: 'makeLocationHappening', payload: data })
    }
}
const setHappeningSubmissionDataGlobal = dispatch => {
    return (data) => {
        dispatch({ type: 'setHappeningSubmissionDataGlobal', payload: data })
    }
}
const setWhishListsGlobal = dispatch => {
    return (data) => {
        dispatch({ type: 'setWhishListsGlobal', payload: data })
    }
}


export const { Provider, Context } = createDataContext(
    dataReducer,
    {
        setUserGlobal,
        setUserLocationGlobal,
        setHappeningData,
        userProfileData,
        setLocationHappeningData,
        setHappeningSubmissionDataGlobal,
        setWhishListsGlobal
    },
    {
        userData: [],
        profileData: [],
        userLocation: {},
        happeningDraft: {}, // ONLINE HAPPENING
        locationHappeningDraft: {}, // ON LOCATION HAPPENING
        happeningSubmissionData: {},
        whishLists: []
    }
)