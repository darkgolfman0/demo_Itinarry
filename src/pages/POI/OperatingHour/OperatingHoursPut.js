import React, { useEffect, useState } from 'react'
import {Table} from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import { data_hoursPut } from './constantValuePut';
const format = 'HH:mm';

const OperatingHours = (props, ref) => {
    const initialOperateDays = [[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null],]
    const allNonSelectables = [ true, true, true, true, true, true, true, true, ]
    const propsSelectables = props.parrentIsSelectableDates

    const [selectedRowKeys, setSelectedRowKeys] = useState(props.parrentSelectedRowKeys);
    const [operateDays, setOperateDays] = useState(props.parrentOperateDate)
    const [isSelectableDates, setIsSelectableDates] = useState(propsSelectables)

    useEffect(() => {setSelectedRowKeys(props.parrentSelectedRowKeys)},[props.parrentSelectedRowKeys],)
    useEffect(() => {setOperateDays(props.parrentOperateDate)},[props.parrentOperateDate],)
    useEffect(() => {setIsSelectableDates(propsSelectables)} , propsSelectables,)
    // console.log("isSelectableDates => ", [[props.parrentIsSelectableDates]] )

   
    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys)
        if (selectedRowKeys.length >= 1) {
            console.table(selectedRowKeys)
            let tempDisableStates = allNonSelectables
            selectedRowKeys.forEach(element => {
                tempDisableStates[parseInt(element)] = false    
            });
            setIsSelectableDates(tempDisableStates)
        } else {
            setIsSelectableDates(allNonSelectables)
        }
 
    }
    useEffect(() =>{props.onSelectedRowKeysResult(selectedRowKeys)},[selectedRowKeys])
    useEffect(() =>{props.onIsSelectableDatesResult(isSelectableDates)},[isSelectableDates])


    const TimeChangeHandler = async (event, dayIndex, openCloseIndex) => {
        let tempOperateHoursOfDays = cloneDeep(operateDays)
        tempOperateHoursOfDays[dayIndex][openCloseIndex] = event
        await setOperateDays(tempOperateHoursOfDays)
    }
    // console.log(operateDays)
    useEffect(() => {props.onOperateDateResult(operateDays)},[operateDays])

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const operating_hours_columns = [
        {
            title: 'DAY',
            dataIndex: 'day',
            key: 'day',
            render: (text) => (
                <span style={{ fontSize: "12px" }}>{text}</span>
            ),
        },
        {
            title: 'OPEN HOUR',
            dataIndex: 'openhour',
            key: 'openhour',
            render: (text) => (
                <span style={{ fontSize: "12px" }}> {text} </span>
            ),
        },
        {
            title: 'CLOSE HOUR',
            dataIndex: 'closehour',
            key: 'closehour',
            render: (text) => (
                <span style={{ fontSize: "12px" }}>{text}</span>
            ),
        }
    ]
    return(
        <React.Fragment>
            <Table pagination={false} rowSelection={rowSelection}  columns={operating_hours_columns} dataSource={data_hoursPut(operateDays,isSelectableDates,TimeChangeHandler) }></Table>
        </React.Fragment>

    )
}
export default OperatingHours