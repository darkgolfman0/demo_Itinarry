import React, { useEffect, useState } from 'react'
import {Col, Radio, DatePicker} from 'antd';
import styles from './../poi.module.css';
import moment from 'moment';
import { DATE_FORMAT } from '../../../commons/dateformat';

const {RangePicker} = DatePicker;
const RadioGroup = Radio.Group;

const OperatingPeriodPut = (props) => {
    const [period_value, setPeriodValue] = useState(props.parrentPeriodValue)
    const [date_period, setDatePeriod] = useState(props.parrentDatePeriod)
    const [allTimePeriod, setAllTimePeriod] = useState(props.parrentAllTimePeriod)
    const [range_from, setRangeFrom] = useState(props.parrentRangeFrom)
    const [range_to, setRangeTo] = useState(props.parrentRangeTo)

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
    useEffect(() => {props.onPeriodValueResult(period_value)},[period_value])
    useEffect(() => {props.onDatePeriodResult(date_period)},[date_period])
    useEffect(() => {props.onAllTimePeriodResult(allTimePeriod)},[allTimePeriod])

    const onChangeRange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        setRangeFrom(dateStrings[0]);
        setRangeTo(dateStrings[1]);
    }
    useEffect(() => {props.onRangeFromResult(range_from)},[range_from])
    useEffect(() => {props.onRangeToResult(range_to)},[range_to])
   
    useEffect(() => {
        setPeriodValue(props.parrentPeriodValue)
        setDatePeriod(props.parrentDatePeriod)
        setAllTimePeriod(props.parrentAllTimePeriod)
        setRangeFrom(props.parrentRangeFrom)
        setRangeTo(props.parrentRangeTo)
   },
   [props.parrentPeriodValue],
   [props.parrentDatePeriod],
   [props.parrentAllTimePeriod],
   [props.parrentRangeFrom],
   [props.parrentRangeTo],
   )
//    console.log('Props range_from >>', range_from)
   if(range_to === null || range_from === null){
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
                        value = {""}
                        onChange={onChangeRange}
                        disabled={date_period}
                        separator="To" size="small"
                    />
                </Col>
        </React.Fragment>
    )
   }else{
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
                        value = {[moment(range_from),moment(range_to)]}
                        onChange={onChangeRange}
                        disabled={date_period}
                        separator="To" size="small"
                    />
                </Col>
        </React.Fragment>
    )
   } 

}
export default OperatingPeriodPut