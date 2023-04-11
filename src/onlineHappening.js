const createHappeningOnLocation = async function (req, res) {

    try {

        let { UserId } = req.body

        if(!UserId){
            return res.status(400).send({ status: false, message: "user id must be present" })
        }

        let id = UserId

        let userId = await userModel.findOne({ _id: id })

        let userProfileId = await profileAndTimeLineModel.findOne({ userId: id })
        if (!userId) {

            return res.status(400).send({ status: false, message: "your user id is not present in our system please Sign In or Sign Up" })

        }

        if (!userProfileId) {

            return res.status(400).send({ status: false, message: "your user profile id is not in our system please create profile first" })

        }

        let happeningData = req.body

        happeningData.userId = userId._id

        happeningData.meetingIsAvailable = true

        happeningData.profileId = userProfileId._id

        let { AgreeAndContinue, happeningOnLocation, fellowsOneToFifteen,
            fellowsMoreThanFifteen, themeOfYourHappening, happeningTitle, DiscribeOfYourHappening,
            discribeTheLocaltion, enterALocation, latitude, longitude, conformHappeningLocation, languageSpokenAtHappening, languageForYourHappening, addPhotosOfYourHappening,
            facitlity, additionalFacilityYouProvide, iAmNotProvideAnyFacility, happeningAccessibility, addSkill, skillLevel,
            thisHappeningDoesntRequireAnySkills, whatWillYouProvide, whatFellowsGet, timeZone, startTime, endTime, startingDate,
            repeat, every, weekDayName, endDate, AllDay, fifteenMinutesBeforeHappeningStart, minAgeToParticipate, minPeopleRequiredForTheHappenig,
            maxPeopleAllowedAtAGivenTime, maxPeopleThatAFellowCanBring, fellowMustComeAlone, whatAreTheFacilitiesAtYourHappening,
            whatDoTheFellowsNeedToBringToJoinThisOnlineHappening, howWillYouCommunicateWithFellows,
            whatMakesYouIdealTohostThisHappening, numberCancellationPeriod, string, whatSDGIsThisHappeningLinkedTo } = happeningData

        if (!AgreeAndContinue) {
            return res.status(400).send({ status: false, message: "Please agree with terms and condition" })
        }
        if (!happeningOnLocation) {
            return res.status(400).send({ status: false, message: "Please Select Happening On Location" })
        }
        if (!(fellowsOneToFifteen || fellowsMoreThanFifteen)) {
            return res.status(400).send({ status: false, message: "Please choose more than 16  or less than 15" })
        }
        if (!themeOfYourHappening) {
            return res.status(400).send({ status: false, message: "Please provide a filed theme Of your happening" })
        }
        if (!happeningTitle) {
            return res.status(400).send({ status: false, message: "Please Enter Happening Title" })
        }
        if (!DiscribeOfYourHappening) {
            return res.status(400).send({ status: false, message: "Please Enter  Discribe Of Your Happening" })
        }
        if (!discribeTheLocaltion) {
            return res.status(400).send({ status: false, message: "Please Discribe The Localtion " })
        }
        if (!enterALocation) {
            return res.status(400).send({ status: false, message: "Please Enter A Location" })
        }

        if (!latitude) {
            return res.status(400).send({ status: false, message: "Please Enter A latitude" })
        }

        if (!longitude) {
            return res.status(400).send({ status: false, message: "Please Enter A longitude" })
        }

        if (!conformHappeningLocation) {
            return res.status(400).send({ status: false, message: "Please Confirm Happening Location" })
        }
        if (!languageSpokenAtHappening) {
            return res.status(400).send({ status: false, message: "Please Language Spoken At Happening" })
        }
        if (!languageForYourHappening) {
            return res.status(400).send({ status: false, message: "Please Language For Your Happening" })
        }
        if (!(facitlity || iAmNotProvideAnyFacility)) {
            return res.status(400).send({ status: false, message: "Please provide facitlity otherwise select a field I Am Not Provide Any Facility " })
        }
        if (!whatAreTheFacilitiesAtYourHappening) {
            return res.status(400).send({ status: false, message: "Please what Are The Facilities At Your Happening" })
        }
        // if (!additionalFacilityYouProvide) {
        //     return res.status(400).send({ status: false, message: "Please provide additional Facility YouProvide" })
        // }
        if (!happeningAccessibility) {
            return res.status(400).send({ status: false, message: "Please Happening Accessibility" })
        }
        if (!addSkill) {
            return res.status(400).send({ status: false, message: "Please add Skill " })
        }
        if (!skillLevel) {
            return res.status(400).send({ status: false, message: "Please provide skill Level" })
        }
        if (!((minAgeToParticipate && minPeopleRequiredForTheHappenig && maxPeopleAllowedAtAGivenTime && maxPeopleThatAFellowCanBring) || fellowMustComeAlone)) {
            if (!minAgeToParticipate) {
                return res.status(400).send({ status: false, message: "Please Provide a min Age To Participate" })
            }
            if (!minPeopleRequiredForTheHappenig) {
                return res.status(400).send({ status: false, message: "Please Enter a field Min People Required For TheHappenig" })
            }
            if (!maxPeopleAllowedAtAGivenTime) {
                return res.status(400).send({ status: false, message: "Please max People Allowed At AGiven Time" })
            }
            if (!maxPeopleThatAFellowCanBring) {
                return res.status(400).send({ status: false, message: "Please Enter the field  max People That A Fellow CanBring" })
            }
        }
        // if (!whatDoTheFellowsNeedToBringToJoinThisOnlineHappening) {
        //     return res.status(400).send({ status: false, message: "what Do The Fellows Need ToBring To Join This OnlineHappening" })
        // }
        if (!addPhotosOfYourHappening) {
            return res.status(400).send({ status: false, message: "Please add Photos Of YourHappening" })
        }
        if (!whatMakesYouIdealTohostThisHappening) {
            return res.status(400).send({ status: false, message: "Please what Makes You Ideal To host This Happening" })
        }
        if (!timeZone) {
            return res.status(400).send({ status: false, message: "Please Enter time zone" })
        }
        if (!startTime) {
            return res.status(400).send({ status: false, message: "Please Enter starting time" })
        }
        if (!endTime) {
            return res.status(400).send({ status: false, message: "Please Enter  End Time" })
        }
        if (!startingDate) {
            return res.status(400).send({ status: false, message: "Please enter  starting time" })
        }
        // if (!endDate) {
        //     return res.status(400).send({ status: false, message: "Please Enter end Date" })
        // }

        //  happeningData.recursiveDate = getDateArray(startingDate, endDate, every, repeat);
        // console.log(getDateArray("2022-02-20", "2023-02-20", 1, "month"));
 
        if (!whatWillYouProvide) {
            return res.status(400).send({ status: false, message: "PleaseEnter what will yu provide" })
        }
        if (!whatFellowsGet) {
            return res.status(400).send({ status: false, message: "Please Enter provide what fellow get" })
        }
        if (!numberCancellationPeriod) {
            return res.status(400).send({ status: false, message: "Please provide a Number to cancell meeting " })
        }
        if (!string) {
            return res.status(400).send({ status: false, message: "Please Provide Day, month, week, year, to fellow can cancell the happening" })
        }
        if (!whatSDGIsThisHappeningLinkedTo) {
            return res.status(400).send({ status: false, message: "Please provide a filed whatSDGIsThisHappeningLinkedTo" })
        }

        let DateStart = startingDate
        let TimeStart = startTime
        let ZoneTime = timeZone

        let EndDate = endDate
        let EndTime = endTime
        let EndTimeZone = timeZone

        let OutStartingDateAndTime = new Date(`${DateStart}T${TimeStart}`).toString({ timeZone: `${ZoneTime}` });

        let OutEndingDateAndTime = new Date(`${EndDate}T${EndTime}`).toString({ timeZone: `${EndTimeZone}` })

        let SubmitHappening = await CreateAHappeningModel.find({ UserId: UserId, meetingIsAvailable: true,timeZone:userTIme, endTIme:joMaiBhjRahaEndTIme }).select();
        
        if(SubmitHappening){
            return res.status(400).send({ status: false, message: "You are already host the happening in this time, please host happening another time" }) 
        }
        
        let count
        let match = {};
        for (let i = 0; i < SubmitHappening.length; i++) {

            count = 0

            Obj = SubmitHappening[i]

            let startTime = Obj.startTime
            let startDate = Obj.startingDate
            let startTimeZone = Obj.timeZone

            let endDate = Obj.endDate
            let endTime = Obj.endTime
            let timeZone = Obj.timeZone

            let InnerStartingDateAndTime = new Date(`${startDate}T${startTime}`).toString({ timeZone: `${startTimeZone}` });

            let InnerEndingDateAndTime = new Date(`${endDate}T${endTime}`).toString({ timeZone: `${timeZone}` });
            console.log("Start ", InnerStartingDateAndTime)
            console.log("End ", InnerEndingDateAndTime)

            

            if (OutStartingDateAndTime >= InnerEndingDateAndTime && OutEndingDateAndTime <= InnerStartingDateAndTime) {
                count++;
                match.OutStartingDateAndTime = OutStartingDateAndTime ;
                InnerEndingDateAndTime.InnerEndingDateAndTime = InnerEndingDateAndTime;
                match.OutEndingDateAndTime = OutEndingDateAndTime;
                break
            } else if (OutEndingDateAndTime >= InnerStartingDateAndTime && OutStartingDateAndTime <= InnerEndingDateAndTime) {
                count++
                break
            }

        }
        if (count == 1) { return res.status(400).send({ status: false, message: "You are already host the happening in this time, please host happening another time" }) }

       
        let createHappening = await CreateAHappeningModel.create(happeningData)


        client.set('showAllhappning', JSON.stringify(await CreateAHappeningModel.find()))

        return res.status(200).send({ status: true, message: "success", data: createHappening })

    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}


{
    "UserId": "63c8fe7e0fb641507c637aec",
    "userProfileId": "63c8fe7e0fb641507c637aec",
    "AgreeAndContinue": true,
    "happeningOnLocation": true,
    "fellowsOneToFifteen": 15,
    "whatDoTheFellowsNeedToBringToJoinThisOnlineHappening": "Leptop",
    "themeOfYourHappening": [
        "Art & cultural projects"
    ],
    "happeningTitle": "happening Title",
    "DiscribeOfYourHappening": "Discribe Of YourHappening",
    "discribeTheLocaltion": "discribe The Localtion",
    "enterALocation": "Chhatauna",
    "latitude": "23.310650",
    "longitude": "86.965538",
    "conformHappeningLocation": "Chhatauna",
    "addPhotosOfYourHappening": [
        "https://images.pexels.com/photos/9786312/pexels-photo-9786312.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/9786304/pexels-photo-9786304.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/9786318/pexels-photo-9786318.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/9786312/pexels-photo-9786312.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "whatMakesYouIdealTohostThisHappening": "Need to work",
    "timeZone": "Aisa/Kolkata",
    "startTime": "10:00",
    "endTime": "11:30",
    "startingDate": "2023-02-10",
    "endDate": "2023-02-03",
    "languageSpokenAtHappening": [
        "Hindi",
        "English",
        "Purtgal"
    ],
    "languageForYourHappening": [
        "Dutch",
        "french"
    ],
    "facitlity": [
        "wi-fi",
        "food",
        "parking"
    ],
    "whatAreTheFacilitiesAtYourHappening": [
        "toilet",
        "Drinks"
    ],
    "happeningAccessibility": "Nothing",
    "addSkill": [
        "Nodejs",
        "Javascript"
    ],
    "skillLevel": "advanced",
    "minAgeToParticipate": 18,
    "minPeopleRequiredForTheHappenig": 15,
    "maxPeopleAllowedAtAGivenTime": 2,
    "maxPeopleThatAFellowCanBring": 2,
    "fellowMustComeAlone": false,
    "whatWillYouProvide": "Nasta de raha hu me",
    "whatFellowsGet": "Thak kar jayege kuchh nhi milega",
    "numberCancellationPeriod": 1,
    "string": "hours",
    "whatSDGIsThisHappeningLinkedTo": [
        "https://www.unoosa.org/images/ourwork/SDGs/E_SDG_goals_icons-individual-rgb-04.png",
        "https://learning.intracen.org/pluginfile.php/164178/course/overviewfiles//SDG%206%20-%20small.png"
    ]
}



{
    "AgreeAndContinue": true, 
    "AllDay": false, 
    "DiscribeOfYourHappening": "Testing desc", 
    "UserId": "63cd21556295db9eeb7d87db", 
    "addPhotosOfYourHappening": ["https://localhappinez-photo-bucket.s3.eu-central-1.amazonaws.com/LHDevelopment/images%20%281%29.jpeg",
     "https://localhappinez-photo-bucket.s3.eu-central-1.amazonaws.com/LHDevelopment/images.jpeg"], 
     "addSkill": ["React native"],
      "conformHappeningLocation": "F9H7+GF9, Taimoor Street, Farooq Colony, Lahore, Punjab, Pakistan", 
      "discribeTheLocaltion": "Testing", 
      "endDate": "2023-02-22", 
      "endTime": "9:00 PM", 
      "enterALocation": "F9H7+GF9, Taimoor Street, Farooq Colony, Lahore, Punjab, Pakistan", 
      "every": undefined, "fellowMustComeAlone": false, "fellowsOneToFifteen": 15, "happeningAccessibility": "nothing", "happeningOnLocation": true, "happeningTitle": "Testing", "iAmNotProvideAnyFacility": true, "languageForYourHappening": ["English", "Chinese"], "languageSpokenAtHappening": ["English"], "latitude": 31.4783513, "longitude": 74.3635979, "maxPeopleAllowedAtAGivenTime": "15", "maxPeopleThatAFellowCanBring": "1", "minAgeToParticipate": "20", "minPeopleRequiredForTheHappenig": "18", "numberCancellationPeriod": "5", "repeat": false, "skillLevel": "Beginner", "startTime": "10:00 AM", "startingDate": "2023-02-22", "string": "Minutes", "themeOfYourHappening": ["Art & cultural projects"], "timeZone": "Asia/Karachi", "userProfileId": "63cd22fd6295db9eeb7d87e1", "weekDayName": [], "whatAreTheFacilitiesAtYourHappening": ["Drinks", "Food"], "whatFellowsGet": "Nothing getting ", "whatMakesYouIdealTohostThisHappening": "Bucuxuxy ideal", "whatSDGIsThisHappeningLinkedTo": ["Quality Education", "Good Health and Well-Being"], "whatWillYouProvide": "Nothing provided "}