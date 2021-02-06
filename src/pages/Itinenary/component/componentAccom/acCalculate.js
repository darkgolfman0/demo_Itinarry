import React, { useContext, useState, useEffect, useRef } from 'react'
import { Tabs, AutoComplete, Checkbox, Modal, Row, Col, Button, Card, Select, Form, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';
import cloneDeep from 'lodash/cloneDeep';

const { Text, Title } = Typography

const RoomPrice = {
    todayPrice: {
        price: 0,
        subtotal: 0
    },
    extraPrice: 0,
    totalPrice: 0
}
const AccomPrice = (props, state) => {
    const [acRoomPrice, setacRoomPrice] = useState(RoomPrice)

    const handleAcExtrapPrice = (value) => {
        let temp = cloneDeep(acRoomPrice);
        temp.extraPrice = Number(value)
        setacRoomPrice(calculateTotal(temp))
    }
    const calculateTotal = (temp) => {
        temp.todayPrice.subtotal = temp.todayPrice.price * props.AcRoomValue
        temp.totalPrice = temp.todayPrice.subtotal + temp.extraPrice
        return temp
    }
    const getPrice = () => {
        props.itemAccom.map(res => {
            res.datasource_allroom.map(res => {
                if (res.room_type === props.acRoomTypeSelected) {
                    let temp = cloneDeep(acRoomPrice);
                    temp.todayPrice.price = res.today_price
                    setacRoomPrice(calculateTotal(temp))
                }
            })
        })
    }
    useEffect(() => {
        getPrice()
    }, [props.acRoomTypeSelected, props.AcRoomValue])

    useEffect(() => {
        props.onAccomGetPrice(acRoomPrice)
    }, [acRoomPrice])
    return (
        <React.Fragment>
            <Row>
                <Col span={10} offset={14} style={{ bottom: "4em" }}><Text strong>PRICE:</Text></Col>
            </Row>
            <Row>
                <Col span={3} offset={14} style={{ bottom: "4em" }}> <Text>TODAY PRICE</Text> </Col>
                <Col span={7} style={{ bottom: "4em" }} >
                    <InputNumber
                        size={"small"}
                        value={acRoomPrice.todayPrice.subtotal}
                        disabled={true}
                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={3} offset={14} style={{ bottom: "4em" }}>
                    <Text>EXTRA</Text>
                </Col>
                <Col span={7} style={{ bottom: "4em" }} >
                    <InputNumber
                        size={"small"}
                        value={acRoomPrice.extraPrice}
                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                        onChange={handleAcExtrapPrice}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={3} offset={14} style={{ bottom: "4em" }}>
                    <Text strong>TOTAL</Text>
                </Col>
                <Col span={7} style={{ bottom: "4em" }}>
                    <InputNumber
                        size={"small"}
                        value={acRoomPrice.totalPrice}
                        disabled={true}
                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default AccomPrice