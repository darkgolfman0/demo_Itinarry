import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Card, Popconfirm, Table, DatePicker } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import { add } from 'lodash';

const TableDayofActivity = (props, state) => {
    const [dayOfActivity, setDayOfActivity] = useState([])
    useEffect(() => {
        setDayOfActivity(dayOfActivity)
        props.onDayActivityResult(dayOfActivity)
    }, [dayOfActivity])
    const columndayOfActivity = [
        {
            dataIndex: 'day',
            render: (text, record) =>
                dayOfActivity.length >= 1 ? (
                    <Button onClick={() => setActiveSelect(record.key)} type="primary" shape="circle">D{record.key + 1}</Button>
                ) : null
        },
        {
            dataIndex: 'date',
            render: (text, record) =>
                dayOfActivity.length >= 1 ? (
                    <DatePicker size={"small"} onSelect={selectedDate.bind(this, record.key)} />
                ) : null,
        },
        {
            dataIndex: 'action',
            render: (text, record) =>
                dayOfActivity.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => DeleteddayOfActivity(record.key)}>
                        <span style={{ fontSize: "14px", height: "20px" }}><DeleteOutlined /></span>
                    </Popconfirm>
                ) : null,
        },
    ];
    const setActiveSelect = (index) => {
        props.onActiveDay(index)
    }
    // const AddTabldayOfActivity = () => {
    //     const newData = {
    //         key: dayOfActivity.length,
    //         dataActivity: [],
    //         reference: [],
    //         dayLabel: dayOfActivity.length + 1,
    //         dayOfActivity: "Day" + (dayOfActivity.length + 1),
    //         dateOfActivity: null
    //     };
    //     return newData
    // }

    const newData = {
        key: dayOfActivity.length,
        dataActivity: [],
        reference: [],
        dayLabel: dayOfActivity.length + 1,
        dayOfActivity: "Day" + (dayOfActivity.length + 1),
        dateOfActivity: null
    };
    const selectedDate = (key, date) => {
        let data = [...dayOfActivity];
        let index = data.findIndex(obj => obj.key === key);
        let selectedKey = data[index]
        selectedKey.dateOfActivity = moment(date).format("YYYY-MM-DD")
        selectedKey.dayOfActivity = ("Day" + (index + 1))
        setDayOfActivity(data)
        props.onActiveDay(index)
    }
    const DeleteddayOfActivity = (key) => {
        let data = cloneDeep(dayOfActivity);
        let newData = data.filter((item) => item.key !== key)
        newData.forEach((x, index) => {
            x.key = index
            x.dayLabel = index + 1
            x.dayOfActivity = "Day" + (index + 1)
            x.dateOfActivity = null
        })
        setDayOfActivity(newData)
    };
    return (
        <React.Fragment>
            <Col span={5}>
                <Card style={{
                    height: "auto",
                    width: 290
                }}>
                    <Table
                        dataSource={dayOfActivity}
                        pagination={false}
                        size={"small"}
                        columns={columndayOfActivity}
                    />
                    <Row>
                        <Col span={24} style={{ textAlign: "center", top: "1em" }}>
                            <Button tabIndex={11} onClick={() => setDayOfActivity(dayOfActivity => [...dayOfActivity, newData])} size={"small"} style={{ width: "auto", background: '#1890ff' }}><span style={{ color: "white" }}>+ Add one day</span></Button>
                            {/* <Button tabIndex={11} onClick={AddTabldayOfActivity} size={"small"} style={{ width: "auto", background: '#1890ff' }}><span style={{ color: "white" }}>+ Add one day</span></Button> */}
                        </Col>
                    </Row>
                </Card>
            </Col>
        </React.Fragment>
    )
}
export default TableDayofActivity