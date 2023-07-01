import { CommonActions, StackActions } from '@react-navigation/native';
import React from 'react'
// import { CommonActions } from '@react-navigation/native';




export const navigationRef = React.createRef();


export const navigate = (screen, params) => {
    navigationRef.current && navigationRef.current.navigate(screen, params)
}

export const navigateFromStack = (stack, screen, params) => {
    navigationRef.current && navigationRef.current.navigate(stack,
        {
            screen: screen,
            params: { params }
        },

    )
}

export const goBack = () => {
    navigationRef.current && navigationRef.current.goBack();

}

export const getCurrentScreenName = () => {
    if (navigationRef?.current) {
        return navigationRef.current.getCurrentRoute()
    }

}

// REMOVE THE CURRENT SCREEN FROM STACK
export const navigateReplace = (screen, params) => {
    navigationRef.current && navigationRef.current.dispatch(StackActions.replace(screen, params));

}

// IT WILL RESET ALL THE PREVIOUS SCREENS
export const navigateReset = (route, params) => {
    navigationRef.current && navigationRef.current.dispatch(CommonActions.reset({
        index: 0, // Specifies the index of the screen you want to navigate to
        routes: [{ name: route, params: params }], 
    }));
}