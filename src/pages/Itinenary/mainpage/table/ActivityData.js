import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Card, Divider, Popconfirm, Typography, Input, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';
import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import arrayMove from 'array-move';

import { EditableTable } from '../../EditableTable';

const DragHandle = sortableHandle(() => (
    <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));
const { Text, Title } = Typography
const time_format = 'HH:mm';
const components = EditableTable

const ActivityData = (props, state) => {
    const [dayOfActivity, setdayOfActivity] = useState([])
    const [dayOfActivityIndex, setDayOfActivityIndex] = useState([])

    useEffect(() => {
        setdayOfActivity(props.dayActivity)
    }, [props.dayActivity])

    useEffect(() => {
        let index = dayOfActivity.findIndex(obj => obj.key === props.activeDay);
        if (index != -1) {
            setDayOfActivityIndex(dayOfActivity[index].dataActivity)
        } else {
            setDayOfActivityIndex([])
        }
    }, [props.activeDay])
    const columnsActivity = [
        {
            dataIndex: 'sort',
            width: 30,
            className: 'drag-visible',
            render: () => <DragHandle />,
        },
        {
            title: 'Time',
            dataIndex: 'time',
            render: (text) => (
                <span style={{ fontSize: "12px" }}>
                    <TimePicker
                        size={"small"}
                        value={moment()}
                        // onChange={this.onChangePOITime}
                        format={time_format}
                        style={{ width: "80px" }}
                    />
                </span>
            ),
            sorter: (a, b) => b.time.length + a.time.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Activities',
            dataIndex: 'activities',
            editable: true,
            sorter: (a, b) => b.activities.length + a.activities.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Price',
            dataIndex: 'price',
            editable: true,
            sorter: (a, b) => b.price.length + a.price.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Mark Up Margin(%)',
            dataIndex: 'markup',
            editable: true,
            sorter: (a, b) => b.markup.length + a.markup.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            editable: true,
            sorter: (a, b) => b.subtotal.length + a.subtotal.length,
            sortDirections: ['descend'],
        },
    ];

    const handleSave = (value, row) => {
        let newData = [...value];
        let index = newData.findIndex((item) => item.key === row.key);
        let item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        let indexs = dayOfActivity.findIndex(obj => obj.key === props.activeDay);
        if (indexs != -1) {
            dayOfActivity[indexs].dataActivity = newData
            setDayOfActivityIndex(dayOfActivity[indexs].dataActivity)
        } else {
            setDayOfActivityIndex([])
        }
    };
    const fixColumns = columnsActivity.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                // handleSave: handleSave.bind(this, tableData()),
                handleSave: handleSave.bind(this, dayOfActivityIndex),
            }),
        };
    });
    const tableData = () => {
        if (dayOfActivityIndex) {
            const dataKey = dayOfActivityIndex.map(row => (
                {
                    key: row.key,
                    dayOfActivity: row.dayOfActivity,
                    time: row.time,
                    activities: row.activities,
                    markup: row.markup,
                    price: row.price,
                    subtotal: Number((row.price * (row.markup / 100) + row.price)).toFixed(2)
                    // subtotal: row.subtotal
                }
            ))
            props.onActivityOfDayResult(dataKey)
            return dataKey
        }
    }
    return (
        <React.Fragment>
            <Table
                size={"small"}
                pagination={false}
                components={components}
                rowClassName={() => 'editable-row'}
                dataSource={tableData()}
                columns={fixColumns}
                rowKey="index"
            />
        </React.Fragment>
    )
}
export default ActivityData