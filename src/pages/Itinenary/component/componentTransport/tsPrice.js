import React, { useContext, useState, useEffect, useRef } from 'react'
import { Tabs, AutoComplete, Checkbox, Modal, Row, Col, Button, Card, Select, Form, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined, CloseOutlined, PlusCircleOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import cloneDeep from 'lodash/cloneDeep';
const { Text } = Typography
const defaultPrice = {
    quantityCar: {
        price: 0,
        quantity: 1,
        subtotal: 0
    },
    carSeat: {
        price: 0,
        quantity: 1,
        subtotal: 0
    },
    extra: {
        price: 0,
    },
    totalPrice: 0
}
const number = [1, 2, 3, 4, 5]

const TsPrice = (props, state) => {
    const [Price, setPrice] = useState(defaultPrice)
    useEffect(() => {
        getPrice()
    }, [props.selectedCarModel])

    useEffect(() => {
        props.onTsPriceResult(Price)
    }, [Price])

    const calculateTotal = (temp) => {
        temp.quantityCar.subtotal = temp.quantityCar.quantity * temp.quantityCar.price
        temp.carSeat.subtotal = temp.carSeat.quantity * temp.carSeat.price
        temp.totalPrice = temp.quantityCar.subtotal + temp.carSeat.subtotal + temp.extra.price
        return temp
    }
    const getPrice = () => {
        props.itemTran.map(res => {
            if (res.car_model === props.selectedCarModel) {
                let temp = cloneDeep(Price);
                temp.quantityCar.price = res.price;
                temp.carSeat.price = res.car_seat;
                setPrice(calculateTotal(temp))
            }
        })
    }
    const onChangeExtraPrice = (value) => {
        let temp = cloneDeep(Price);
        temp.extra.price = value;
        setPrice(calculateTotal(temp))
    }
    const keyQuantity = ({ key }) => {
        message.info(`Click on item ${key}`);
        let temp = cloneDeep(Price);
        temp.quantityCar.quantity = Number(key);
        setPrice(calculateTotal(temp))
    };
    const quantityMenu = (
        <Menu onClick={keyQuantity}>
            {number.map(res => {
                return <Menu.Item key={Number(res)}>
                    <span target="_blank" rel="noopener noreferrer" >
                        {res}
                    </span>
                </Menu.Item>
            })}
        </Menu>
    );
    const keyCarSeat = ({ key }) => {
        message.info(`Click on item ${key}`);
        let temp = cloneDeep(Price);
        temp.carSeat.quantity = Number(key);
        setPrice(calculateTotal(temp))
    };
    const carSeatMenu = (
        <Menu onClick={keyCarSeat}>
            {number.map(res => {
                return <Menu.Item key={Number(res)}>
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
                <Col span={2} offset={14} style={{ bottom: '28em' }}>
                    <Text strong>PRICE:</Text>
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={15} style={{ bottom: '28em' }}>
                    <Text>QUANTITY CAR</Text>
                </Col>
                <Col span={1} style={{ bottom: "28em" }}>
                    <Dropdown overlay={quantityMenu} >
                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{Price.quantityCar.quantity}<DownOutlined /></Button>
                    </Dropdown>
                </Col>
                <Col span={2} style={{ left: "0.5em", bottom: '28em' }}>
                    <InputNumber
                        size={"small"}
                        value={Price.quantityCar.price}
                        disabled={true}
                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                    />
                </Col>
                <Col span={2} style={{ left: "1em", bottom: '28em' }}>
                    <InputNumber
                        size={"small"}
                        value={Price.quantityCar.subtotal}
                        disabled={true}
                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={15} style={{ bottom: '28em' }}>
                    <Text>CAR SEAT</Text>
                </Col>
                <Col span={1} style={{ bottom: '28em' }}>
                    <Dropdown overlay={carSeatMenu} >
                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{Price.carSeat.quantity}<DownOutlined /></Button>
                    </Dropdown>
                </Col>
                <Col span={2} style={{ left: "0.5em", bottom: '28em' }}>
                    <InputNumber
                        size={"small"}
                        value={Price.carSeat.price}
                        disabled={true}
                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                    />
                </Col>
                <Col span={2} style={{ left: "1em", bottom: '28em' }}>
                    <InputNumber
                        size={"small"}
                        value={Price.carSeat.subtotal}
                        disabled={true}
                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={1} offset={19} style={{ bottom: '27.5em' }}>
                    <Text>EXTRA</Text>
                </Col>
                <Col span={2} style={{ left: "1em", bottom: '28em' }}>
                    <InputNumber
                        size={"small"}
                        value={Price.extra.price}
                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                        onChange={onChangeExtraPrice}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={1} offset={19} style={{ bottom: '27.5em' }}>
                    <Text strong>TOTAL PRICE</Text>
                </Col>
                <Col span={2} style={{ left: "1em", bottom: '28em' }}>
                    <InputNumber
                        size={"small"}
                        value={Price.totalPrice}
                        readOnly
                        disabled={true}
                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default TsPrice