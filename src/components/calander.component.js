import React from 'react'
import { Calendar } from 'react-native-calendars'
import { acolors } from '../constants/colors'
import { fonts } from '../constants/fonts'
import { formatDate } from '../utils/functions'
import ReactNativeModal from 'react-native-modal'

const CalanderComponent = (props) => {

    let makeMinDate = new Date();
    // console.log(makeMinDate.setDate(makeMinDate.getDate() + 14))
    console.log('minDate', props.minDate)
    return (

        <Calendar
            style={{ width: "100%", alignSelf: 'center', backgroundColor: acolors.primary, borderRadius: 5 }}
            // onDayPress={(day) => { console.log('selected day', day) }}
            onDayPress={(day) => { props?.onDayPress(day) }}
            current={props.currentDateObj}
            minDate={props.minDate ? props.minDate : formatDate(new Date)}
            enableSwipeMonths={true}

            // markingType={'custom'}
            // disableArrowRight={true}
            theme={{
                calendarBackground: acolors.primary,

                selectedDayBackgroundColor: acolors.white,
                selectedDayTextColor: "black",
                textMonthFontWeight: '800',
                selectedDotColor: acolors.primary,

                arrowColor: 'white',
                todayTextColor: 'white',
                dayTextColor: 'white',
                textDayFontFamily: fonts.PMe,
                textDisabledColor: 'grey',

                monthTextColor: acolors.white,
                textDayFontSize: 12, // dates 1 ,2,3,4
                textDayFontWeight: '500',
                textMonthFontSize: 14, // month name dec 2021
                textMonthFontFamily: fonts.PMe,


                //  these are the monday, tuesday, wed headings
                textSectionTitleColor: 'rgba(255, 255, 255, 1)',
                textDayHeaderFontSize: 14,
                textDayHeaderFontFamily: fonts.PMe

            }}
            markedDates={{
                [props.selectedDate]: {
                    selected: true,
                    marked: true,
                    customStyles: {
                        container: {
                            backgroundColor: acolors.white,
                            height: 30,
                            width: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            borderRadius: 15,
                        },
                        text: {
                            color: 'white',
                            alignSelf: 'center',
                            fontFamily: fonts.PMe,
                            fontSize: 14
                        }
                    }
                },

            }}
        />
    )
}

export default CalanderComponent