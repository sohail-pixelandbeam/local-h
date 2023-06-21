import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { acolors } from '../../../../constants/colors';

const TimePickercomponent = (props) => {
    return (
        <DateTimePicker
            value={new Date(-1232403882588)}
            mode='time'
            // is24Hour={true}
            // display='clock'
            minuteInterval={15}
            themeVariant="dark"
            onChange={(event, date) => props.onChange(date)}
            style={{ backgroundColor: acolors.primary, color: 'red' }}

        />
    )
}

export default TimePickercomponent 
