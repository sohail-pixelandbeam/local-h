import { View, Text, Settings, Image, TextInput, Platform, StyleSheet } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './src/screens/auth/signup';
import Signin from './src/screens/auth/signin';
import Termandcondition from './src/screens/auth/termandcondition';
import Forgetpassword from './src/screens/auth/forgetpassword';
import Verifycode from './src/screens/auth/verifycode';
import Oopswrongcode from './src/screens/auth/oopswrongcode';
import Verifysuccess from './src/screens/auth/verifysuccess';

import Toomanyattempt from './src/screens/auth/toomanyattempt';
import Home from './src/screens/bottom/Home';

import { ChatBtmIcon, HeartBtmIcon, LocationBtmIcon, LocationBtmIconFocused, ProfileBtmIcon, SearchBtmIcon, SettingsIcon, WallBtmIcon } from "./src/components/Svgs";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ThingsConsider from './src/screens/bottom/happening/ThingsConsider';
import TypeHappening from './src/screens/bottom/happening/TypeHappening';

import { navigationRef } from './Navigations';

import MainScreenL from './src/screens/bottom/happening/offline/MainScreenL';
import MainScreenO from './src/screens/bottom/happening/online/MainScreenO';
import Start from './src/screens/auth/start';
import Favourites from './src/screens/bottom/favourites/Favourites';
import Chat from './src/screens/bottom/chats/Chat';
import SuccessfullySubmitted from './src/screens/bottom/happening/offline/SuccessfullySubmitted';
import HappeningApproved from './src/screens/bottom/happening/offline/HappeningApproved';
import HappeningRejected from './src/screens/bottom/happening/offline/HappeningRejected';
import { getHeight, retrieveItem, storeItem, useForceUpdate } from './src/utils/functions';
import Loader from './src/utils/Loader';
import ChangePassword from './src/screens/auth/ChangePassword';
import { Provider } from './src/Context/DataContext';
import { loggedInObservable } from './Common';
import Profile from './src/screens/bottom/Profile';
import HappeningDetails from './src/screens/bottom/booking/HappeningDetails';
import SelectDate from './src/screens/bottom/booking/SelectDates';
import BeforeYouJoin from './src/screens/bottom/booking/BeforeYouJoin';
import Presence from './src/screens/bottom/booking/Presence';
import AttitudeEffort from './src/screens/bottom/booking/AttitudeEffort';
import ChildrenTeenagers from './src/screens/bottom/booking/ChildrenTeenagers';
import GoingWith from './src/screens/bottom/booking/GoingWith';
import ReviewJoining from './src/screens/bottom/booking/ReviewJoining';
import RequestSubmitted from './src/screens/bottom/booking/RequestSubmitted';
import RecursionDates from './src/screens/bottom/booking/RecursionDates';
import AwaitingFellows from './src/screens/bottom/booking/AwaitingFellows';
import ConfirmHappeningStatus from './src/screens/bottom/booking/ConfirmHappeningStatus';
import AllBookings from './src/screens/bottom/booking/AllBookings';
import MyHappeningDetails from './src/screens/bottom/booking/MyHappeningDetail';
import BookingCancelling from './src/screens/bottom/booking/BookingCancelling';
import WhishList from './src/screens/bottom/whishlist/WhishList';
import AllWishList from './src/screens/bottom/whishlist/AllWishList';
import SeeAllHappeningsToday from './src/screens/bottom/SeeAllHappeningsToday';

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import HappeningsMap from './src/screens/bottom/HappeningsMap';
import SettingsScreen from './src/screens/bottom/Settings/Settings';
import PersonalInfo from './src/screens/bottom/Settings/PersonalInfo';
import NotificationSettings from './src/screens/bottom/Settings/NotificationSettings';
import TranslationSettings from './src/screens/bottom/Settings/TranslationSettings';
import LoginSecuritySettings from './src/screens/bottom/Settings/LoginSecuritySettings';
import ViewAllReviews from './src/screens/bottom/ViewAllReviews';
import ProfilePublicView from './src/screens/bottom/ProfilePublicView';
import DonationAmount from './src/screens/bottom/Donation.js/DonationAmount';
import DonationPaymentMethod from './src/screens/bottom/Donation.js/DonationPaymentMethod';
import DonationComplete from './src/screens/bottom/Donation.js/DonationComplete';
import EditProfile from './src/screens/bottom/EditProfile';
import GeneralStatusBar from './src/components/GernalStatusBar';
import EditHappening from './src/screens/bottom/happening/EditHappening';
import EditTitle from './src/screens/bottom/happening/editHappeningScreens/EditTitle';
import EditDescription from './src/screens/bottom/happening/editHappeningScreens/EditDescription';
import EditSkills from './src/screens/bottom/happening/editHappeningScreens/EditSkills';
import EditFellowsGetBack from './src/screens/bottom/happening/editHappeningScreens/EditFellowsGetBack';
import EditDuration from './src/screens/bottom/happening/editHappeningScreens/EditDuration';
import EditHappeningGroup from './src/screens/bottom/happening/editHappeningScreens/EditHappeningGroup';
import EditPhotos from './src/screens/bottom/happening/editHappeningScreens/EditPhotos';
import EditFacilities from './src/screens/bottom/happening/editHappeningScreens/EditFacilities';
import EditPassword from './src/screens/bottom/EditPassword';
import Timezones from './src/screens/bottom/Settings/Timezones';
import DActiveBooking from './src/screens/bottom/Settings/DeactivateScreens/DActiveBookings';
import DReason from './src/screens/bottom/Settings/DeactivateScreens/DReason';
import DFinal from './src/screens/bottom/Settings/DeactivateScreens/DFinal';
import AccountDeActivated from './src/screens/bottom/Settings/DeactivateScreens/AccountDeActivated';
import ActivateAccountVerifyOTP from './src/screens/bottom/Settings/DeactivateScreens/ActivateAccountVerifyOTP';
import GetVerified from './src/screens/bottom/Settings/GetVerified';
import GetVerifiedDetails from './src/screens/bottom/Settings/GetVerifiedDetails';
import VerificationSubmitted from './src/screens/bottom/Settings/VerificationSubmitted';
import StoryDetails from './src/screens/bottom/booking/StoryDetails';


import ReviewReportStep1 from './src/screens/bottom/reviewSystem/ReviewReportStep1';
import ReviewReportStep2 from './src/screens/bottom/reviewSystem/ReviewReportStep2';
import ReviewReportStep3 from './src/screens/bottom/reviewSystem/ReviewReportStep3';
import ReviewReportStep4 from './src/screens/bottom/reviewSystem/ReviewReportStep4';
import ReviewStep1 from './src/screens/bottom/reviewSystem/ReviewStep1';
import ReviewStep2 from './src/screens/bottom/reviewSystem/ReviewStep2';
import ReviewStep3 from './src/screens/bottom/reviewSystem/ReviewStep3';
import ReviewStep4 from './src/screens/bottom/reviewSystem/ReviewStep4';
import ReviewStep5 from './src/screens/bottom/reviewSystem/ReviewStep5';
import ReviewStep6 from './src/screens/bottom/reviewSystem/ReviewStep6';
import ReviewStep7 from './src/screens/bottom/reviewSystem/ReviewStep7';
import ReviewStep8 from './src/screens/bottom/reviewSystem/ReviewStep8';
import ReviewStep9 from './src/screens/bottom/reviewSystem/ReviewStep9';

import EditReviewStep1 from './src/screens/bottom/reviewSystem/FellowEditReview/EditReviewStep1';
import EditReviewStep2 from './src/screens/bottom/reviewSystem/FellowEditReview/EditReviewStep2';
import EditReviewStep3 from './src/screens/bottom/reviewSystem/FellowEditReview/EditReviewStep3';
import EditReviewStep4 from './src/screens/bottom/reviewSystem/FellowEditReview/EditReviewStep4';
import EditReviewStep5 from './src/screens/bottom/reviewSystem/FellowEditReview/EditReviewStep5';
import EditReviewStep6 from './src/screens/bottom/reviewSystem/FellowEditReview/EditReviewStep6';
import EditReviewStep7 from './src/screens/bottom/reviewSystem/FellowEditReview/EditReviewStep7';
import EditReviewStep8 from './src/screens/bottom/reviewSystem/FellowEditReview/EditReviewStep8';
import EditReviewStep9 from './src/screens/bottom/reviewSystem/FellowEditReview/EditReviewStep9';
import EditReviewReportStep1 from './src/screens/bottom/reviewSystem/FellowEditReview/EditReviewReportStep1';
import EditReviewReportStep2 from './src/screens/bottom/reviewSystem/FellowEditReview/EditReviewReportStep2';
import EditReviewReportStep3 from './src/screens/bottom/reviewSystem/FellowEditReview/EditReviewReportStep3';
import EditReviewReportStep4 from './src/screens/bottom/reviewSystem/FellowEditReview/EditReviewReportStep4';

import { fonts } from './src/constants/fonts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { apiRequest } from './src/utils/apiCalls';
import HostReviewFellow from './src/screens/bottom/reviewSystem/HostReviewFellow';
import Conversation from './src/screens/bottom/chats/Conversation';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Termandcondition" component={Termandcondition} />
      <Stack.Screen name="Forgetpassword" component={Forgetpassword} />
      <Stack.Screen name="Verifycode" component={Verifycode} />
      <Stack.Screen name="Oopswrongcode" component={Oopswrongcode} />
      <Stack.Screen name="Verifysuccess" component={Verifysuccess} />
      <Stack.Screen name="Toomanyattempt" component={Toomanyattempt} />
    </Stack.Navigator>
  )
}

const BookingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HappeningDetails" component={HappeningDetails} />
      <Stack.Screen name="SelectDate" component={SelectDate} />
      <Stack.Screen name="BeforeYouJoin" component={BeforeYouJoin} />
      <Stack.Screen name="Presence" component={Presence} />
      <Stack.Screen name="AttitudeEffort" component={AttitudeEffort} />
      <Stack.Screen name="ChildrenTeenagers" component={ChildrenTeenagers} />
      <Stack.Screen name="GoingWith" component={GoingWith} />
      <Stack.Screen name="ReviewJoining" component={ReviewJoining} />
      <Stack.Screen name="RequestSubmitted" component={RequestSubmitted} />
      <Stack.Screen name="RecursionDates" component={RecursionDates} />
      <Stack.Screen name="AwaitingFellows" component={AwaitingFellows} />
      <Stack.Screen name="ConfirmHappeningStatus" component={ConfirmHappeningStatus} />
      <Stack.Screen name="AllBookings" component={AllBookings} />
      <Stack.Screen name="MyHappeningDetails" component={MyHappeningDetails} />
      <Stack.Screen name="BookingCancelling" component={BookingCancelling} />
      <Stack.Screen name="SeeAllHappeningsToday" component={SeeAllHappeningsToday} />
      <Stack.Screen name="ProfilePublicView" component={ProfilePublicView} />
    </Stack.Navigator>
  )
}

function WhishListStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WhishList" component={WhishList} />
      <Stack.Screen name="AllWishList" component={AllWishList} />
    </Stack.Navigator>
  )
}

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Home"
  >
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);


const HappeningStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Profile"
  >
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="ViewAllReviews" component={ViewAllReviews} />
    <Stack.Screen name="ThingsConsider" component={ThingsConsider} />
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
    <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
    <Stack.Screen name="TranslationSettings" component={TranslationSettings} />
    <Stack.Screen name="LoginSecuritySettings" component={LoginSecuritySettings} />

    {/* <Stack.Screen name="TypeHappening" component={TypeHappening} />
    LOCATION HAPPENING SCREENS
    <Stack.Screen name="GroupSizeHappeningL" component={GroupSizeHappeningL} />
    <Stack.Screen name="CC1" component={CC1} /> */}


  </Stack.Navigator>
)


const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}

    >

      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="ViewAllReviews" component={ViewAllReviews} />
      <Stack.Screen name="ThingsConsider" component={ThingsConsider} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
      <Stack.Screen name="TranslationSettings" component={TranslationSettings} />
      <Stack.Screen name="LoginSecuritySettings" component={LoginSecuritySettings} />
    </Stack.Navigator>
  )
}




function App() {

  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.keyboardType = Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password';





  const forceUpdate = useForceUpdate();
  const [isLogined, setIsLogined] = React.useState(0); // 1 = LOGINED, 2 = NOT LOGINED
  const [loggedIn, setLoggedIn] = React.useState(0)


  const TabNavigator = () => (
    <Tab.Navigator

      inactiveColor="#aaaaaa"
      activeColor="#5b4dbc"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height:getHeight(9.5),
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 2,
          position: 'absolute',
          overflow: 'hidden',
        }
      }}
      shifting={false}
    >

      <Tab.Screen
        options={() => ({
          tabBarLabel: ({ color }) => <Text style={{ ...styles.barText, color: color }}>Explore</Text>,
          tabBarIcon: ({ color }) => <SearchBtmIcon color={color} />,
        })}
        name="Search" component={HomeStack}
      />

      {loggedIn == 1 &&
        <Tab.Screen
          options={() => ({
            tabBarLabel: ({ color }) => <Text style={{ ...styles.barText, color: color }}>Wishlist</Text>,
            tabBarIcon: ({ color }) => <HeartBtmIcon color={color} />,
          })}
          name="WhishListStack" component={WhishListStack}
        />
      }
      {/* {() => Favourites()} */}
      {/* {loggedIn == 1 && */}
      <Tab.Screen
        options={() => ({
          tabBarLabel: ({ color }) => <Text style={{ ...styles.barText, color: color }}>Profile</Text>,
          tabBarIcon: ({ color }) => <Image source={require('./src/assets/wallIcon.png')} style={{ tintColor: color }} />,
        })}
        name="Profilee" component={HappeningStack}
      />
      {/* } */}
      {/* {() => Favourites()} */}

      {/* <Tab.Screen
        options={() => ({
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            focused ? <LocationBtmIconFocused /> : <LocationBtmIcon color={color} />
          ),
        })}
        name="HappeningsMap" component={HappeningsMap}
      /> */}

      {loggedIn == 1 &&
        <Tab.Screen
          options={() => ({
            tabBarLabel: ({ color, focused }) => <Text style={{ ...styles.barText, color: color }}>Chats</Text>,
            tabBarIcon: ({ color }) => <ChatBtmIcon color={color} />,
          })}
          name="Chat" component={Chat}
        />
      }
      {loggedIn == 1 &&
        <Tab.Screen
          options={() => ({
            tabBarLabel: ({ color, focused }) => <Text style={{ ...styles.barText, color: color }}>Settings</Text>,
            tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          })}
          name="SettingsStack" component={SettingsStack}
        />

      }

    </Tab.Navigator>
  );


  

  function checkLoggedIn() {

    retrieveItem("login_data").then((data) => {
      console.log('data', data)
      if (data && (data?.isVerified || data?.isVerify == true)) {
        setLoggedIn(1)
      }
      else {
        setLoggedIn(2)
      }
      forceUpdate();
    })
  }

  function checkLogin() {
    // console.log("ever came here")
    checkLoggedIn()
    loggedInObservable.subscribe((v) => {
      // console.log("Yessss won the warrrrr");
      // console.log(v)
      // console.log(v)
      setLoggedIn(v)
    })
  }

  React.useEffect(() => {
    // storeItem('login_data','');
    checkLogin();
    // retrieveItem('login_data')
    //   .then(data => {
    //     if (data && data.isVerify) {
    //       console.log(data);
    //       setIsLogined(1);
    //     }
    //     else setIsLogined(2);
    //     forceUpdate();

    //   })
  }, [])


  if (loggedIn == 0) {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Loader />
      </View>
    )
  }









  return (
    <Provider>
      <NavigationContainer
        ref={navigationRef}
      >

        {
          loggedIn == 2 &&
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTabs" component={TabNavigator} />
            <Stack.Screen name="HappeningDetails" component={HappeningDetails} />
            <Stack.Screen name="AuthStack" component={AuthStack} />

            <Stack.Screen name="MainScreenL" component={MainScreenL} />
            {/* MainScreen0 CONTAINS ONLINE ONLINE HAPPENING SCREENS */}
            <Stack.Screen name="MainScreenO" component={MainScreenO} />
            <Stack.Screen name="TypeHappening" component={TypeHappening} />

            <Stack.Screen name="AccountDeActivated" component={AccountDeActivated} />
            <Stack.Screen name="ActivateAccountVerifyOTP" component={ActivateAccountVerifyOTP} />
            <Stack.Screen name="StoryDetails" component={StoryDetails} />
            <Stack.Screen name="BookingStack" component={BookingStack} />
            <Stack.Screen name="HappeningsMap" component={HappeningsMap} />

          </Stack.Navigator>
        }{
          loggedIn == 1 &&
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTabs" component={TabNavigator} />
            <Stack.Screen name="TypeHappening" component={TypeHappening} />
            <Stack.Screen name="HappeningDetails" component={HappeningDetails} />
            {/* MainScreen0 CONTAINS ONLINE LOCATION HAPPENING SCREENS */}
            <Stack.Screen name="MainScreenL" component={MainScreenL} />
            {/* MainScreen0 CONTAINS ONLINE ONLINE HAPPENING SCREENS */}
            <Stack.Screen name="MainScreenO" component={MainScreenO} />
            <Stack.Screen name="SuccessfullySubmitted" component={SuccessfullySubmitted} />
            <Stack.Screen name="HappeningApproved" component={HappeningApproved} />
            <Stack.Screen name="HappeningRejected" component={HappeningRejected} />
            <Stack.Screen name="BookingStack" component={BookingStack} />
            {/* Donatin Screens */}
            <Stack.Screen name="DonationAmount" component={DonationAmount} />
            <Stack.Screen name="DonationPaymentMethod" component={DonationPaymentMethod} />
            <Stack.Screen name="DonationComplete" component={DonationComplete} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            {/* Edit Screens */}
            <Stack.Screen name="EditHappening" component={EditHappening} />
            <Stack.Screen name="EditTitle" component={EditTitle} />
            <Stack.Screen name="EditDescription" component={EditDescription} />
            <Stack.Screen name="EditSkills" component={EditSkills} />
            <Stack.Screen name="EditFellowsGetBack" component={EditFellowsGetBack} />
            <Stack.Screen name="EditDuration" component={EditDuration} />
            <Stack.Screen name="EditHappeningGroup" component={EditHappeningGroup} />
            <Stack.Screen name="EditPhotos" component={EditPhotos} />
            <Stack.Screen name="EditFacilities" component={EditFacilities} />
            <Stack.Screen name="EditPassword" component={EditPassword} />
            <Stack.Screen name="Timezones" component={Timezones} />
            {/* Get Verified Screen */}
            <Stack.Screen name="GetVerified" component={GetVerified} />
            <Stack.Screen name="GetVerifiedDetails" component={GetVerifiedDetails} />
            <Stack.Screen name="VerificationSubmitted" component={VerificationSubmitted} />
            {/* Review System Screens */}
            <Stack.Screen name="ReviewStep1" component={ReviewStep1} />
            <Stack.Screen name="ReviewStep2" component={ReviewStep2} />
            <Stack.Screen name="ReviewStep3" component={ReviewStep3} />
            <Stack.Screen name="ReviewStep4" component={ReviewStep4} />
            <Stack.Screen name="ReviewStep5" component={ReviewStep5} />
            <Stack.Screen name="ReviewStep6" component={ReviewStep6} />
            <Stack.Screen name="ReviewStep7" component={ReviewStep7} />
            <Stack.Screen name="ReviewStep8" component={ReviewStep8} />
            <Stack.Screen name="ReviewStep9" component={ReviewStep9} />
            <Stack.Screen name="ReviewReportStep1" component={ReviewReportStep1} />
            <Stack.Screen name="ReviewReportStep2" component={ReviewReportStep2} />
            <Stack.Screen name="ReviewReportStep3" component={ReviewReportStep3} />
            <Stack.Screen name="ReviewReportStep4" component={ReviewReportStep4} />
            {/* Deactivate screens */}
            <Stack.Screen name="DActiveBooking" component={DActiveBooking} />
            <Stack.Screen name="DReason" component={DReason} />
            <Stack.Screen name="DFinal" component={DFinal} />
            <Stack.Screen name="AccountDeActivated" component={AccountDeActivated} />
            <Stack.Screen name="StoryDetails" component={StoryDetails} />
            <Stack.Screen name="HappeningsMap" component={HappeningsMap} />
            {/* HOST REVIEW FELLOW */}
            <Stack.Screen name="HostReviewFellow" component={HostReviewFellow} />
            {/* FELLOW EDIT REVIEW */}
            {/* Review System Screens */}
            <Stack.Screen name="EditReviewStep1" component={EditReviewStep1} />
            <Stack.Screen name="EditReviewStep2" component={EditReviewStep2} />
            <Stack.Screen name="EditReviewStep3" component={EditReviewStep3} />
            <Stack.Screen name="EditReviewStep4" component={EditReviewStep4} />
            <Stack.Screen name="EditReviewStep5" component={EditReviewStep5} />
            <Stack.Screen name="EditReviewStep6" component={EditReviewStep6} />
            <Stack.Screen name="EditReviewStep7" component={EditReviewStep7} />
            <Stack.Screen name="EditReviewStep8" component={EditReviewStep8} />
            <Stack.Screen name="EditReviewStep9" component={EditReviewStep9} />
             <Stack.Screen name="EditReviewReportStep1" component={EditReviewReportStep1} />
            <Stack.Screen name="EditReviewReportStep2" component={EditReviewReportStep2} />
            <Stack.Screen name="EditReviewReportStep3" component={EditReviewReportStep3} />
            <Stack.Screen name="EditReviewReportStep4" component={EditReviewReportStep4} />

            {/* Messages */}
            <Stack.Screen name="Conversation" component={Conversation} />

            

          </Stack.Navigator>
        }


      </NavigationContainer >
    </Provider>
  );


}

const styles = StyleSheet.create({
  barText: {
    fontFamily: fonts.PMe, fontSize: 12,

  }
})

export default App;



