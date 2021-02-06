import React, { useState, useEffect } from 'react'
import { Typography, message, Menu, Dropdown, Row, Col, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import cloneDeep from 'lodash/cloneDeep';

const { Text } = Typography
const AirportLocation = ['Suvarnabhumi Airport', 'Don Mueang Airport', 'Phuket Airport', 'Chiang Mai Airport']
const location = {
    pickupLocation: 'Suvarnabhumi Airport',
    pickoffLocation: 'Suvarnabhumi Airport',
}
const TsLocation = (props, state) => {
    const [flightLocation, setFlightLocation] = useState(location)
    useEffect(() => {
        props.onTsLocationResult(flightLocation)
    }, [flightLocation])
    useEffect(() => {
        setFlightLocation(location)
    }, [props.visable])

    const keyPickupLocation = ({ key }) => {
        message.info(`Click on item ${key}`);
        let temp = cloneDeep(flightLocation);
        temp.pickupLocation = key;
        setFlightLocation(temp)
    };
    const keyPickoffLocation = ({ key }) => {
        message.info(`Click on item ${key}`);
        let temp = cloneDeep(flightLocation);
        temp.pickoffLocation = key;
        setFlightLocation(temp)
    };
    const pickupLocationMenu = (
        <Menu onClick={keyPickupLocation}>
            {AirportLocation.map(res => {
                return <Menu.Item key={res}>
                    <span target="_blank" rel="noopener noreferrer" >
                        {res}
                    </span>
                </Menu.Item>
            })}
        </Menu>
    );
    const pickoffLocationMenu = (
        <Menu onClick={keyPickoffLocation}>
            {AirportLocation.map(res => {
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
                <Col span={3}>
                    <Text>PICK-UP LOCATION</Text>
                </Col>
                <Col span={3}>
                    <Dropdown overlay={pickupLocationMenu} >
                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{flightLocation.pickupLocation}<DownOutlined /></Button>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                <Col span={3}>
                    <Text>DROP-OFF LOCATION</Text>
                </Col>
                <Col span={3}>
                    <Dropdown overlay={pickoffLocationMenu} >
                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{flightLocation.pickoffLocation}<DownOutlined /></Button>
                    </Dropdown>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default TsLocation