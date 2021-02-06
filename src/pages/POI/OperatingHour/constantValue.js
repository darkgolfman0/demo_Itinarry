import React from 'react'
import {TimePicker} from 'antd';

const format = 'HH:mm';
export const  TimePickerValue = (isEnabled, handler, dayIndex, openCloseIndex) => {
    // console.log('handler >>>',handler)
    return (
                <TimePicker
                    style={{ fontSize: "12px" }}
                    format={format}
                    disabled={isEnabled}
                    size='small'
                    onChange = {(event) =>handler(event, dayIndex, openCloseIndex)}
                />)
}
export const data_hours = (isSelectable, TimeChangeHandler) => {
    const tempHours = 
    [
        {
            key: '0',
            day: 'Monday',
            openhour : TimePickerValue(isSelectable[0], TimeChangeHandler, 0, 0),
            closehour: TimePickerValue(isSelectable[0], TimeChangeHandler, 0, 1)
        },
        {
            key: '1',
            day: 'Tuesday',
            // open: <Checkbox onChange={onChange}>OPEN</Checkbox>,
            openhour : TimePickerValue(isSelectable[1], TimeChangeHandler, 1, 0),
            closehour: TimePickerValue(isSelectable[1], TimeChangeHandler, 1, 1)
        },
        {
            key: '2',
            day: 'Wednesday',
            // open: <Checkbox onChange={onChange}>OPEN</Checkbox>,
            openhour : TimePickerValue(isSelectable[2], TimeChangeHandler, 2, 0),
            closehour: TimePickerValue(isSelectable[2], TimeChangeHandler, 2, 1)
        },
        {
            key: '3',
            day: 'Thursday',
            // open: <Checkbox onChange={onChange}>OPEN</Checkbox>,
            openhour : TimePickerValue(isSelectable[3], TimeChangeHandler, 3, 0),
            closehour: TimePickerValue(isSelectable[3], TimeChangeHandler, 3, 1)
        },
        {
            key: '4',
            day: 'Friday',
            // open: <Checkbox onChange={onChange}>OPEN</Checkbox>,
            openhour : TimePickerValue(isSelectable[4], TimeChangeHandler, 4, 0),
            closehour: TimePickerValue(isSelectable[4], TimeChangeHandler, 4, 1)
        },
        {
            key: '5',
            day: 'Saturday',
            // open: <Checkbox onChange={onChange}>OPEN</Checkbox>,
            openhour : TimePickerValue(isSelectable[5], TimeChangeHandler, 5, 0),
            closehour: TimePickerValue(isSelectable[5], TimeChangeHandler, 5, 1)
        },
        {
            key: '6',
            day: 'Sunday',
            // open: <Checkbox onChange={onChange}>OPEN</Checkbox>,
            openhour : TimePickerValue(isSelectable[6], TimeChangeHandler, 6, 0),
            closehour: TimePickerValue(isSelectable[6], TimeChangeHandler, 6, 1)
        },
        {
            key: '7',
            day: 'Special Holiday',
            // open: <Checkbox onChange={onChange}>OPEN</Checkbox>,
            openhour : TimePickerValue(isSelectable[7], TimeChangeHandler, 7, 0),
            closehour: TimePickerValue(isSelectable[7], TimeChangeHandler, 7, 1)
        }
    ]
    return tempHours
}

