import React from 'react'
import { Calendar } from 'react-native-calendars'
import { acolors } from '../constants/colors'
import { fonts } from '../constants/fonts'
import { formatDate } from '../utils/functions'

const CalanderComponent = (props) => {
    return (

        <Calendar
            style={{ width: "100%", alignSelf: 'center', backgroundColor: acolors.primary, borderRadius: 5 }}
            // onDayPress={(day) => { console.log('selected day', day) }}
            onDayPress={(day) => { props?.onDayPress(day) }}
            current={props.currentDateObj}
            minDate={props.minDate ? props.minDate : formatDate(new Date)}
            enableSwipeMonths={true}
            // markingType={'custom'}
            disableArrowRight={true}
            theme={{
                calendarBackground: acolors.primary,


                selectedDayBackgroundColor: acolors.white,
                selectedDayTextColor: "#111111",
                selectedDotColor: "#ffffff",

                arrowColor: '#001833',
                todayTextColor: '#0A0A16',
                dayTextColor: 'white',
                textDayFontFamily: fonts.PMe,
                textDisabledColor: 'rgba(255,255,255,0.4)',


                monthTextColor: acolors.white,
                textDayFontSize: 10, // dates 1 ,2,3,4
                textMonthFontSize: 14, // month name dec 2021
                textMonthFontFamily: fonts.PRe,


                //  these are the monday, tuesday, wed headings
                textSectionTitleColor: 'rgba(255, 255, 255, 0.5)',
                textDayHeaderFontSize: 14,
                textDayHeaderFontFamily: fonts.PRe

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
                            color: 'black',
                            alignSelf: 'center',
                            fontFamily: fonts.PRe,
                            fontSize: 14
                        }
                    }
                },

            }}
        />
    )
}

export default CalanderComponent