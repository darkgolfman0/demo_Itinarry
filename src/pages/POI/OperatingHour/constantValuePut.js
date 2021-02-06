import React, { useEffect, useState } from 'react'
import {TimePicker} from 'antd';
import moment from 'moment';

const format = 'HH:mm';

// console.log('xx >>')


export const  TimePickerValue = (DayValue, isEnabled, handler, dayIndex, openCloseIndex) => {
    if(DayValue === null){
        return (
            <TimePicker
                    style={{ fontSize: "12px" }}
                    value = {""}
                    format={format}
                    disabled={isEnabled}
                    size='small'
                    onChange = {(event) =>handler(event, dayIndex, openCloseIndex)}
                />)
        }
    else {
        return (
            <TimePicker
                    style={{ fontSize: "12px" }}
                    value = {moment(DayValue)}
                    format={format}
                    disabled={isEnabled}
                    size='small'
                    onChange = {(event) =>handler(event, dayIndex, openCloseIndex)}
                />)
    }
}
export const data_hoursPut = (operateDays, isSelectable, TimeChangeHandler) => {

    for (let i in operateDays)
    {
        for(let j in operateDays[i])
        {
            const tempHours = 
            [
                {
                    key: '0',
                    day: 'Monday',
                    openhour : TimePickerValue(operateDays[0][0], isSelectable[0], TimeChangeHandler, 0, 0),
                    closehour: TimePickerValue(operateDays[0][1], isSelectable[0], TimeChangeHandler, 0, 1)
                },
                {
                    key: '1',
                    day: 'Tuesday',
                    openhour : TimePickerValue(operateDays[1][0], isSelectable[1], TimeChangeHandler, 1, 0),
                    closehour: TimePickerValue(operateDays[1][1], isSelectable[1], TimeChangeHandler, 1, 1)
                },
                {
                    key: '2',
                    day: 'Wednesday',
                    openhour : TimePickerValue(operateDays[2][0], isSelectable[2], TimeChangeHandler, 2, 0),
                    closehour: TimePickerValue(operateDays[2][1], isSelectable[2], TimeChangeHandler, 2, 1)
                },
                {
                    key: '3',
                    day: 'Thursday',
                    openhour : TimePickerValue(operateDays[3][0], isSelectable[3], TimeChangeHandler, 3, 0),
                    closehour: TimePickerValue(operateDays[3][1], isSelectable[3], TimeChangeHandler, 3, 1)
                },
                {
                    key: '4',
                    day: 'Friday',
                    openhour : TimePickerValue(operateDays[4][0], isSelectable[4], TimeChangeHandler, 4, 0),
                    closehour: TimePickerValue(operateDays[4][1], isSelectable[4], TimeChangeHandler, 4, 1)
                },
                {
                    key: '5',
                    day: 'Saturday',
                    openhour : TimePickerValue(operateDays[5][0], isSelectable[5], TimeChangeHandler, 5, 0),
                    closehour: TimePickerValue(operateDays[5][1], isSelectable[5], TimeChangeHandler, 5, 1)
                },
                {
                    key: '6',
                    day: 'Sunday',
                    openhour : TimePickerValue(operateDays[6][0], isSelectable[6], TimeChangeHandler, 6, 0),
                    closehour: TimePickerValue(operateDays[6][1], isSelectable[6], TimeChangeHandler, 6, 1)
                },
                {
                    key: '7',
                    day: 'Special Holiday',
                    openhour : TimePickerValue(operateDays[7][0], isSelectable[7], TimeChangeHandler, 7, 0),
                    closehour: TimePickerValue(operateDays[7][1], isSelectable[7], TimeChangeHandler, 7, 1)
                }
            ]
            return tempHours
        }
    }
}


