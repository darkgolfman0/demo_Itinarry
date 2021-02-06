import React, { useContext, useState, useEffect, useRef } from 'react'
import { Tabs, AutoComplete, Checkbox, Modal, Row, Col, Button, Card, Select, Form, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined, CloseOutlined, PlusCircleOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';

const time_format = 'HH:mm';
const { Text, Title } = Typography;

const AccomCheckInCheckOut = (props, state) => {
    const INDEX_ROOM = [1, 2, 3, 4, 5]
    const checkOutDay = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]

    const [AccomValueDropdown, setAccomValueDropdown] = useState('')
    const [AccomIndexDropdown, setAccomIndexDropdown] = useState(1)
    const [activityDayAccom, setactivityDayAccom] = useState([props.addDay])
    const [checkInDayAccom, setcheckInDayAccom] = useState('Day 1')
    const [checkOutDayAccom, setcheckOutDayAccom] = useState('Day 1')
    const [accomCheckInTime, setAccomCheckInTime] = useState()
    const [accomCheckOutTime, setAccomCheckOutTime] = useState()

    useEffect(() => {
        setAccomValueDropdown('')
        setAccomIndexDropdown(1)
        setcheckInDayAccom("Day 1")
        setcheckOutDayAccom("Day 1")
        setAccomCheckInTime()
        setAccomCheckOutTime()
    }, [props.visable])

    const onAccomChangeCheckOutTime = (time) => {
        setAccomCheckOutTime(time)
    }
    const accomCheckOutDay = ({ key }, props) => {
        const keys = key
        setcheckOutDayAccom(keys)
        message.info(`Click on item ${key}`);
    };
    const onAccomChangeCheckInTime = (time) => {
        setAccomCheckInTime(time)
    }
    const accomValueRoomtype = ({ key }) => {
        const keys = key
        setAccomValueDropdown(keys)
        message.info(`Click on item ${keys}`);
        props.onSelectedRoomtype(keys)
    };
    const accomIndexRoom = ({ key }) => {
        const keys = key
        setAccomIndexDropdown(keys)
        message.info(`Click on item ${keys}`);
        props.onSelectedAccomValueRoom(Number(keys))
    };
    const accomCheckInDay = ({ key }, props) => {
        const keys = key
        setactivityDayAccom(keys)
        setcheckInDayAccom(keys)
        message.info(`Click on item ${key}`);
    };

    const accomRoomTypeMenu = (
        <Menu onClick={accomValueRoomtype}>
            {props.itemAccomRoomList.map(res => {
                return <Menu.Item key={res}>
                    <span target="_blank" rel="noopener noreferrer" >
                        {res}
                    </span>
                </Menu.Item>
            })}
        </Menu>
    );
    const accomIndexRoomMenu = (
        <Menu onClick={accomIndexRoom}>
            {INDEX_ROOM.map(res => {
                return <Menu.Item key={res}>
                    <span target="_blank" rel="noopener noreferrer" >
                        {res}
                    </span>
                </Menu.Item>
            })}
        </Menu>
    );
    const accomCheckInMenu = (
        <Menu onClick={accomCheckInDay}>
            {props.addDay.map(res => {
                return <Menu.Item key={res.dayActivity}>
                    <span target="_blank" rel="noopener noreferrer" >
                        {res.dayActivity}
                    </span>
                </Menu.Item>
            })}
        </Menu>
    );
    const accomCheckOutMenu = (
        <Menu onClick={accomCheckOutDay}>
            {checkOutDay.map(res => {
                return <Menu.Item key={res}>
                    <span target="_blank" rel="noopener noreferrer" >
                        {res}
                    </span>
                </Menu.Item>
            })}
        </Menu>
    );

    return (
        <React.Fragment>
            <Row>
                <Col span={2} offset={14} style={{ bottom: "4em" }}><Text>ROOM TYPE</Text></Col>
                <Col span={1} offset={1} style={{ bottom: "4em" }} >
                    <Dropdown overlay={accomRoomTypeMenu} >
                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >
                            {AccomValueDropdown}
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                </Col>
                <Col span={2} offset={4} style={{ bottom: "4em" }} >
                    <Space>
                        <Text>ROOM</Text>
                        <Dropdown overlay={accomIndexRoomMenu} >
                            <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >
                                {AccomIndexDropdown}
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={14} style={{ bottom: "4em" }} ><Text>CHECK-IN DAY</Text></Col>
                <Col span={2} offset={1} style={{ bottom: "4em" }}>
                    <Dropdown overlay={accomCheckInMenu}>
                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{checkInDayAccom}<DownOutlined /></Button>
                    </Dropdown>
                </Col>
                <Col span={5} style={{ bottom: "4em" }} >
                    <TimePicker
                        size={"small"}
                        value={moment(accomCheckInTime)}
                        format={time_format}
                        onChange={onAccomChangeCheckInTime}
                        style={{ width: "80px" }}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={3} offset={14} style={{ bottom: "4em" }}><Text>CHECK-OUT DAY</Text></Col>
                <Col span={2} style={{ bottom: "4em" }} >
                    <Dropdown overlay={accomCheckOutMenu}>
                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{checkOutDayAccom}<DownOutlined /></Button>
                    </Dropdown>
                </Col>
                <Col span={5} style={{ bottom: "4em" }} >
                    <TimePicker
                        size={"small"}
                        value={moment(accomCheckOutTime)}
                        format={time_format}
                        onChange={onAccomChangeCheckOutTime}
                        style={{ width: "80px" }}
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default AccomCheckInCheckOut