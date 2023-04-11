// THIS IS THE SCREEN CONTAINS ALL THE SCREENS OF LOCATION HAPPENING

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { acolors } from '../../../../constants/colors';
import { fonts } from '../../../../constants/fonts';
import AboutHost from './AboutHost';
import BitMore from './BitMore';
import CC1 from './CC1';
import CC2 from './CC2';
import CC3 from './CC3';
import CC4 from './CC4';
import Description1 from './Description1';
import Description2 from './Description2';
import Duration1 from './Duration1';
import FellowsGetBack from './FellowsGetBack';
import GroupSizeHappeningL from './GroupSizeHappeningL';
import HappeningAccessibilty from './HappeningAccessibility';
import HappeningApproved from './HappeningApproved';
import HappeningFacilites from './HappeningFacilities';
import HappeningGroup from './HappeningGroup';
import HappeningLanguages from './HappeningLanguages';
import HappeningMinimumCancellation from './HappeningMinimumCancellation';
import HappeningRejected from './HappeningRejected';
import HappeningSkills from './HappeningSkills';
import HappeningTheme from './HappeningTheme';
import Images1 from './Images1';
import Images2 from './Images2';
import Location1 from './Location1';
import SDGLinked from './SDGLinked';
import SuccessfullySubmitted from './SuccessfullySubmitted';
import TermsAndLaws from './TermsAndLaws';
import Title1 from './Title1';
import Title2 from './Title2';




import { Animated, View, TouchableOpacity, Text, FlatList, Alert, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HappeningLanguages1 from './HappeningLanguages1';
import { navigate, navigateFromStack } from '../../../../../Navigations';
import CustomTabBar from '../../../../common/CustomTabBar';


const components = [
    { label: "Group Size", name: "GroupSizeHappeningL", component: GroupSizeHappeningL },
    { label: "Code of Conduct", name: "CC1", component: CC1, params: { step: "1" } },
    { label: "Code of Conduct", name: "CC2", component: CC2, params: { step: "1" } },
    { label: "Code of Conduct", name: "CC3", component: CC3, params: { step: "1" } },
    { label: "Code of Conduct", name: "CC4", component: CC4, params: { step: "1" } },
    { label: "a bit more", name: "BitMore", component: BitMore, params: { step: "2" } },
    { label: "Theme", name: "HappeningTheme", component: HappeningTheme, params: { step: "3" } },
    { label: "Title", name: "Title1", component: Title1, params: { step: "4" } },
    { label: "Title", name: "Title2", component: Title2, params: { step: "" } },
    { label: "Description", name: "Description1", component: Description1, params: { step: "5" } },
    { label: "Description", name: "Description2", component: Description2, params: { step: "" } },
    { label: "Media", name: "Images1", component: Images1, params: { step: "6" } },
    { label: "Media", name: "Images2", component: Images2, params: { step: "" } },
    { label: "Ideal Host", name: "AboutHost", component: AboutHost, params: { step: "7" } },
    { label: "Duration", name: "Duration1", component: Duration1, params: { step: "8" } },
    { label: "Languages Spoken", name: "HappeningLanguages", component: HappeningLanguages, params: { step: "9" } },
    { label: "Happening Languages", name: "HappeningLanguages1", component: HappeningLanguages1, params: { step: "10" } },
    { label: "Skills Required", name: "HappeningSkills", component: HappeningSkills, params: { step: "11" } },
    { label: "Max Fellows", name: "HappeningGroup", component: HappeningGroup, params: { step: "12" } },
    { label: "", name: "HappeningAccessibilty", component: HappeningAccessibilty, params: { step: "13" } },
    { label: "What fellows get", name: "FellowsGetBack", component: FellowsGetBack, params: { step: "14" } },
    { label: "Minimum Cancellation Period", name: "HappeningMinimumCancellation", component: HappeningMinimumCancellation, params: { step: "15" } },
    { label: "SDG", name: "SDGLinked", component: SDGLinked, params: { step: "16" } },
    { label: "Terms & Local Laws", name: "TermsAndLaws", component: TermsAndLaws, params: { step: "" } },
    // { label: "", name: "SuccessfullySubmitted", component: SuccessfullySubmitted },
    // { label: "", name: "HappeningApproved", component: HappeningApproved },
    // { label: "", name: "HappeningRejected", component: HappeningRejected },
];

const MainScreenO = () => {

    const Stack = createMaterialTopTabNavigator();

    return (
        <Stack.Navigator
            swipeEnabled={false}
            tabBar={props => <CustomTabBar components {...props} />}
        >
            {
                components.map((v, i) => (
                    <Stack.Screen
                        initialParams={v.params ?? null} options={{ tabBarLabel: v.label, }} name={v.name} component={v.component}
                        key={i}
                    />
                ))
            }

        </Stack.Navigator>
    )
}

export default MainScreenO



{/* <Stack.Screen options={{ tabBarLabel: "Things To Consider" }} name="GroupSizeHappeningL" component={GroupSizeHappeningL} />
            <Stack.Screen name="CC1" component={CC1} />
            <Stack.Screen name="CC2" component={CC2} />
            <Stack.Screen name="CC3" component={CC3} />
            <Stack.Screen name="CC4" component={CC4} />
            <Stack.Screen name="BitMore" component={BitMore} />
            <Stack.Screen name="HappeningTheme" component={HappeningTheme} />
            <Stack.Screen name="Title1" component={Title1} />
            <Stack.Screen name="Title2" component={Title2} />
            <Stack.Screen name="Description1" component={Description1} />
            <Stack.Screen name="Description2" component={Description2} />
            <Stack.Screen name="Images1" component={Images1} />
            <Stack.Screen name="Images2" component={Images2} />
            <Stack.Screen name="AboutHost" component={AboutHost} />
            <Stack.Screen name="Duration1" component={Duration1} />
            <Stack.Screen name="HappeningLanguages" component={HappeningLanguages} />
            <Stack.Screen name="HappeningSkills" component={HappeningSkills} />
            <Stack.Screen name="HappeningGroup" component={HappeningGroup} />
            <Stack.Screen name="HappeningAccessibilty" component={HappeningAccessibilty} />
            <Stack.Screen name="FellowsGetBack" component={FellowsGetBack} />
            <Stack.Screen name="HappeningMinimumCancellation" component={HappeningMinimumCancellation} />
            <Stack.Screen name="SDGLinked" component={SDGLinked} />
            <Stack.Screen name="TermsAndLaws" component={TermsAndLaws} />
            <Stack.Screen name="SuccessfullySubmitted" component={SuccessfullySubmitted} />
            <Stack.Screen name="HappeningApproved" component={HappeningApproved} />
            <Stack.Screen name="HappeningRejected" component={HappeningRejected} /> */}


{/* <Stack.Screen name="Location1" component={Location1} /> */ }
{/* <Stack.Screen name="HappeningFacilites" component={HappeningFacilites} /> */ }


// listeners={({ navigation, route }) => {
                        //     return BackHandler.addEventListener('hardwareBackPress', function (e) {
                        //         console.log('route is ',route)
                        //         let goBackTo = "'" + components[i - 1]?.name + "'"
                        //         navigate('MainScreenO')
                        //         // return false;
                        //     })

                        // }}