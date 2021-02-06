import React, { useEffect, useState } from 'react'
import {Table} from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import { data_hours} from './constantValue'

const OperatingHours = (props, ref) => {
    const initialOperateDays = [[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null],]
    const allNonSelectables = [ true, true, true, true, true, true, true, true, ]
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [operateDays, setOperateDays] = useState(initialOperateDays)
    const [isSelectableDates, setIsSelectableDates] = useState(allNonSelectables)
   
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
            <Table pagination={false} rowSelection={rowSelection} columns={operating_hours_columns} dataSource={data_hours(isSelectableDates,TimeChangeHandler)}></Table>
        </React.Fragment>

    )
}
export default OperatingHours