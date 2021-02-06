import React, { useContext, useState, useEffect, useRef } from 'react'
import { Tabs, AutoComplete, Checkbox, Modal, Row, Col, Button, Card, Select, Form, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined, CloseOutlined, PlusCircleOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';

const time_format = 'HH:mm';
const { Text, Title } = Typography;

const OtherTimepicker = (props, state) => {
    const [otherTime, setOtherTime] = useState(moment())

    useEffect(() => {
        setOtherTime(moment())
    }, [props.visable])
    useEffect(() => {
        props.onOtherTimeResult(otherTime)
    }, [otherTime])
    const onOtherChangeTime = (time) => {
        setOtherTime(time)
    }
    return (
        <React.Fragment>
            <Row>
                <Col span={2}>
                    <Text>TIME</Text>
                </Col>
                <Col span={21}>
                    <TimePicker
                        size={"small"}
                        onChange={onOtherChangeTime}
                        value={otherTime}
                        format={time_format}
                        style={{ width: "80px" }}
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default OtherTimepicker