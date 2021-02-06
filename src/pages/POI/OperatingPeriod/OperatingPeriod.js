import React, { useEffect, useState } from 'react'
import {Col, Radio, DatePicker} from 'antd';
import styles from './../poi.module.css';
import moment from 'moment';
import { DATE_FORMAT } from '../../../commons/dateformat';

const {RangePicker} = DatePicker;
const RadioGroup = Radio.Group;

const OperatingPeriod = (props) => {
    const [period_value, setPeriodValue] = useState(1)
    const [date_period, setDatePeriod] = useState(true)
    const [allTimePeriod, setAllTimePeriod] = useState(moment(new Date()).format(DATE_FORMAT))
    const [range_from, setRangeFrom] = useState("")
    const [range_to, setRangeTo] = useState("")


    const  onChangeRadiovalue  = (e) =>  {
        console.log('radio checked', e.target.value);
        setPeriodValue(e.target.value)  
        if (e.target.value === 1)  {
            setPeriodValue(e.target.value)
            setDatePeriod(true)
            setAllTimePeriod(moment(new Date()).format(DATE_FORMAT))
        } else if (e.target.value === 2) {
            setPeriodValue(e.target.value)
            setDatePeriod(false)
        }
    };

    useEffect(() => {
        props.onPeriodValueResult(period_value)
        props.onDatePeriodResult(date_period)
        props.onOperateDateResult(allTimePeriod)

    },[period_value],[date_period],[allTimePeriod])


    const onChangeRange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        setRangeFrom(dateStrings[0]);
        setRangeTo(dateStrings[1]);
    }
    useEffect(() => {
        props.onRangeFromResult(range_from)
        props.onRangeToResult(range_to)
    },[range_from],[range_to])
    return (
        <React.Fragment>
            <Col span={3}>
                    <RadioGroup onChange={onChangeRadiovalue} value={period_value}>
                        <Radio className={styles.radioStyle} value={1} style={{ fontSize: "12px" }}>ALL TIME OPEN</Radio>
                        <Radio className={styles.radioStyle} value={2} style={{ fontSize: "12px" }}>DATE RANGE</Radio>
                    </RadioGroup>
                </Col>
                <Col span={7} style={{ paddingTop: '30px' }}>
                    <RangePicker
                        onChange={onChangeRange}
                        disabled={date_period}
                        separator="To" size="small"
                    />
                </Col>
        </React.Fragment>
     
    )

}
export default OperatingPeriod