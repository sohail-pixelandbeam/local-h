// THIS IS THE SCREEN CONTAINS ALL THE SCREENS OF LOCATION HAPPENING

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { BackHandler } from 'react-native';
import { getCurrentScreenName } from '../../../../../Navigations';
import CustomTabBar from '../../../../common/CustomTabBar';
import AboutHost from './AboutHost';
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
import HappeningLanguages1 from './HappeningLanguages1';
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
import GeneralStatusBar from '../../../../components/GernalStatusBar';



const components = [
    // { label: "a bit more", name: "BitMore", component: BitMore, params: { step: "2" } },

    // { label: "Group Size", name: "GroupSizeHappeningL", component: GroupSizeHappeningL },
    // { label: "Media", name: "Images1", component: Images1, params: { step: "8" } },
    // { label: "Happening Location", name: "Location1", component: Location1, params: { step: "10" } },
    // { label: "Code of Conduct", name: "CC1", component: CC1, params: { step: "1" } },
    { label: "Code of Conduct", name: "CC2", component: CC2, params: { step: "2" } },
    { label: "Code of Conduct", name: "CC3", component: CC3, params: { step: "3" } },
    { label: "Code of Conduct", name: "CC4", component: CC4, params: { step: "4" } },
    { label: "Theme", name: "HappeningTheme", component: HappeningTheme, params: { step: "5" } },
    { label: "Title", name: "Title1", component: Title1, params: { step: "6" } },
    { label: "Title", name: "Title2", component: Title2, params: { step: "" } },
    { label: "Description", name: "Description1", component: Description1, params: { step: "7" } },
    { label: "Description", name: "Description2", component: Description2, params: { step: "" } },
    { label: "Media", name: "Images1", component: Images1, params: { step: "8" } },
    { label: "Media", name: "Images2", component: Images2, params: { step: "" } },
    { label: "Ideal Host", name: "AboutHost", component: AboutHost, params: { step: "9" } },
    { label: "Happening Location", name: "Location1", component: Location1, params: { step: "10" } },
    { label: "Duration", name: "Duration1", component: Duration1, params: { step: "11" } },
    { label: "Languages Spoken", name: "HappeningLanguages", component: HappeningLanguages, params: { step: "12" } },
    // { label: "Happening Languages", name: "HappeningLanguages1", component: HappeningLanguages1, params: { step: "10" } },
    { label: "Skills Required", name: "HappeningSkills", component: HappeningSkills, params: { step: "13" } },
    { label: "Facilities", name: "HappeningFacilites", component: HappeningFacilites, params: { step: "14" } },
    { label: "Max Fellows", name: "HappeningGroup", component: HappeningGroup, params: { step: "15" } },
    { label: "", name: "HappeningAccessibilty", component: HappeningAccessibilty, params: { step: "16" } },
    { label: "What fellows get", name: "FellowsGetBack", component: FellowsGetBack, params: { step: "17" } },
    { label: "Minimum Cancellation Period", name: "HappeningMinimumCancellation", component: HappeningMinimumCancellation, params: { step: "18" } },
    { label: "SDG", name: "SDGLinked", component: SDGLinked, params: { step: "19" } },
    { label: "Terms & Local Laws", name: "TermsAndLaws", component: TermsAndLaws, params: { step: "" } },
]


const MainScreenL = () => {

    const Stack = createStackNavigator();

    // React.useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', function () {
    //         console.log('getCurrentScreenName().name', getCurrentScreenName().name)
    //         return true;
    //     })
    // }, []);

    return (
        <>
            <GeneralStatusBar />
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            // swipeEnabled={false}
            // tabBar={props => <CustomTabBar components {...props}/>}
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
        </>
    )

    // const Stack = createStackNavigator();
    // return (
    //     <Stack.Navigator screenOptions={{headerShown:false}} >
    //         <Stack.Screen name="GroupSizeHappeningL" component={GroupSizeHappeningL} />
    //         <Stack.Screen name="CC1" component={CC1} />
    //         <Stack.Screen name="CC2" component={CC2} />
    //         <Stack.Screen name="CC3" component={CC3} />
    //         <Stack.Screen name="CC4" component={CC4} />
    //         <Stack.Screen name="HappeningTheme" component={HappeningTheme} />
    //         <Stack.Screen name="Title1" component={Title1} />
    //         <Stack.Screen name="Title2" component={Title2} />
    //         <Stack.Screen name="Description1" component={Description1} />
    //         <Stack.Screen name="Description2" component={Description2} />
    //         <Stack.Screen name="Images1" component={Images1} />
    //         <Stack.Screen name="Images2" component={Images2} />
    //         <Stack.Screen name="AboutHost" component={AboutHost} />
    // <Stack.Screen name="Location1" component={Location1} />
    //         <Stack.Screen name="Duration1" component={Duration1} />
    //         <Stack.Screen name="HappeningLanguages" component={HappeningLanguages} />
    //         <Stack.Screen name="HappeningSkills" component={HappeningSkills} />
    //         <Stack.Screen name="HappeningGroup" component={HappeningGroup} />
    //         <Stack.Screen name="HappeningFacilites" component={HappeningFacilites} />
    //         <Stack.Screen name="HappeningAccessibilty" component={HappeningAccessibilty} />
    //         <Stack.Screen name="FellowsGetBack" component={FellowsGetBack} />
    //         <Stack.Screen name="HappeningMinimumCancellation" component={HappeningMinimumCancellation} />
    //         <Stack.Screen name="SDGLinked" component={SDGLinked} />
    //         <Stack.Screen name="TermsAndLaws" component={TermsAndLaws} />
    //         <Stack.Screen name="SuccessfullySubmitted" component={SuccessfullySubmitted} />
    //         <Stack.Screen name="HappeningApproved" component={HappeningApproved} />
    //         <Stack.Screen name="HappeningRejected" component={HappeningRejected} />


    //     </Stack.Navigator>
    // )
}

export default MainScreenL
