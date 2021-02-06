import React, { useState, useEffect } from 'react'
import { Typography, TimePicker, message, Menu, Dropdown, Row, Col, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';

const time_format = 'HH:mm';
const { Text } = Typography
const pickoffDay = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
const pickupPickoffActivity = {
    pickUpDay: 'Day 1',
    PickupTime: moment(),
    dropOffDay: 'Day 1',
    dropOffTime: moment()
}

const TsPickupDropoffDay = (props, state) => {
    const [tsPickupDropoffActivity, setTsPickupDropoffActivity] = useState(pickupPickoffActivity)

    useEffect(()=>{
        setTsPickupDropoffActivity(pickupPickoffActivity)
    },[props.visable])
    useEffect(() => {
        props.onTsPickupDropoffResult(tsPickupDropoffActivity)
    }, [tsPickupDropoffActivity])
    const onTsChangePickupTime = (time) => {
        let temp = cloneDeep(tsPickupDropoffActivity);
        temp.PickupTime = time;
        setTsPickupDropoffActivity(temp)
    }
    const tsKeyPickupDay = ({ key }) => {
        let temp = cloneDeep(tsPickupDropoffActivity);
        temp.pickUpDay = key;
        setTsPickupDropoffActivity(temp)
    }
    const onTsChangeDropoffTime = (time) => {
        let temp = cloneDeep(tsPickupDropoffActivity);
        temp.dropOffTime = time;
        setTsPickupDropoffActivity(temp)
    }
    const tsKeyDropoffDay = ({ key }) => {
        let temp = cloneDeep(tsPickupDropoffActivity);
        temp.dropOffDay = key;
        setTsPickupDropoffActivity(temp)
    }
    const tsPickupDayMenu = (
        <Menu onClick={tsKeyPickupDay}>
            {props.addDay.map(res => {
                return <Menu.Item key={res.dayActivity}>
                    <span target="_blank" rel="noopener noreferrer" >
                        {res.dayActivity}
                    </span>
                </Menu.Item>
            })}

        </Menu>
    );
    const tsDropoffDayMenu = (
        <Menu onClick={tsKeyDropoffDay}>
            {pickoffDay.map(res => {
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
            <Row style={{ marginTop: "0.5em" }}>
                <Col span={3}>
                    <Text>PICK-UP DAY</Text>
                </Col>
                <Col span={2}>
                    <Dropdown overlay={tsPickupDayMenu}>
                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{tsPickupDropoffActivity.pickUpDay}<DownOutlined /></Button>
                    </Dropdown>
                </Col>
                <Col span={2}>
                    <TimePicker
                        size={"small"}
                        value={tsPickupDropoffActivity.PickupTime}
                        onChange={onTsChangePickupTime}
                        format={time_format}
                        style={{ width: "80px" }}
                    />
                </Col>
            </Row>
            <Row style={{ marginTop: "0.5em" }}>
                <Col span={3}>
                    <Text>DROP-OFF DAY</Text>
                </Col>
                <Col span={2}>
                    <Dropdown overlay={tsDropoffDayMenu}>
                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{tsPickupDropoffActivity.dropOffDay}<DownOutlined /></Button>
                    </Dropdown>
                </Col>
                <Col span={2}>
                    <TimePicker
                        size={"small"}
                        value={tsPickupDropoffActivity.dropOffTime}
                        onChange={onTsChangeDropoffTime}
                        format={time_format}
                        style={{ width: "80px" }}
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default TsPickupDropoffDay