import React, { useContext, useState, useEffect, useRef } from 'react'
import { Row, Col, Typography, TimePicker, InputNumber } from 'antd';
import moment from 'moment';

const time_format = 'HH:mm';
const { Text } = Typography

const PoiTimePicker = (props, state) => {
    const [poiTime, setpoiTime] = useState()
    
    const onPoiChangeTime = (time) => {
        setpoiTime(time)
        props.onPoiTimeChange(time)
    }
    useEffect(() => {
        setpoiTime()
    },[props.visable])
    return (
        <React.Fragment>
            <Row>
                <Col span={2} offset={14} style={{ bottom: "4em" }}>
                    <Text>TIME</Text>
                </Col>
                <Col span={6} style={{ bottom: "4em" }}>
                    <TimePicker
                        size={"small"}
                        value={moment(poiTime)}
                        format={time_format}
                        onChange={onPoiChangeTime}
                        style={{ width: "80px" }}
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default PoiTimePicker 