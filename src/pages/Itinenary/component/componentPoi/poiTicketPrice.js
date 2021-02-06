import React, { useContext, useState, useEffect, useRef } from 'react'
import { Tabs, AutoComplete, Checkbox, Modal, Row, Col, Button, Card, Select, Form, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined, CloseOutlined, PlusCircleOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import cloneDeep from 'lodash/cloneDeep';

const { Text } = Typography
const defaultTicketAndPrice = {
    adult: {
        price: 0,
        quantity: 1,
        subTotal: 0
    },
    child: {
        price: 0,
        quantity: 1,
        subTotal: 0
    },
    infant: {
        price: 0,
        quantity: 1,
        subTotal: 0
    },
    totalPrice: 0
}
const number = [1, 2, 3, 4, 5]

const PoiTicketPrice = (props, state) => {
    const [ticketAndPrice, setTicketAndPrice] = useState(defaultTicketAndPrice)
    const poiKeyAdult = ({ key }) => {
        let temp = cloneDeep(ticketAndPrice);
        temp.adult.quantity = Number(key);
        setTicketAndPrice(calculateTotal(temp))
        message.info(`Click on item ${key}`);
    }
    const poiKeyChild = ({ key }) => {
        let temp = cloneDeep(ticketAndPrice);
        temp.child.quantity = Number(key);
        setTicketAndPrice(calculateTotal(temp))
        message.info(`Click on item ${key}`);
    }
    const poiKeyInfant = ({ key }) => {
        let temp = cloneDeep(ticketAndPrice);
        temp.infant.quantity = Number(key);
        setTicketAndPrice(calculateTotal(temp))
        message.info(`Click on item ${key}`);
    }

    const poiAdultmenu = (
        <Menu onClick={poiKeyAdult}>
            {
                number.map(res => {
                    return <Menu.Item key={res}>
                        <span target="_blank" rel="noopener noreferrer" >
                            {res}
                        </span>
                    </Menu.Item>
                })
            }
        </Menu>
    );
    const poiChildMenu = (
        <Menu onClick={poiKeyChild}>
            {
                number.map(res => {
                    return <Menu.Item key={res}>
                        <span target="_blank" rel="noopener noreferrer" >
                            {res}
                        </span>
                    </Menu.Item>
                })
            }
        </Menu>
    )
    const poiInfantMenu = (
        <Menu onClick={poiKeyInfant}>
            {
                number.map(res => {
                    return <Menu.Item key={res}>
                        <span target="_blank" rel="noopener noreferrer" >
                            {res}
                        </span>
                    </Menu.Item>
                })
            }
        </Menu>
    )
    const calculateTotal = (temp) => {
        temp.adult.subTotal = temp.adult.quantity * temp.adult.price
        temp.child.subTotal = temp.child.quantity * temp.child.price
        temp.infant.subTotal = temp.infant.quantity * temp.infant.price
        temp.totalPrice = temp.adult.subTotal + temp.child.subTotal + temp.infant.subTotal
        return temp
    }
    const getPrice = () => {
        props.itemPoi.map(res => {
            if (res.display_name === props.selectedPlace) {
                let temp = cloneDeep(ticketAndPrice);
                temp.adult.price = res.adult_price;
                temp.child.price = res.child_price;
                temp.infant.price = res.infant_price;
                setTicketAndPrice(calculateTotal(temp))
            }
        })
    }
    useEffect(() => {
        getPrice()
    }, [props.selectedPlace])
    useEffect(() => {
        props.onPoiChangePrice(ticketAndPrice)
    }, [ticketAndPrice])
    return (
        <React.Fragment>
            <Row>
                <Col span={10} offset={14} style={{ bottom: "4em" }}>
                    <Text strong>TICKETS AND PRICE:</Text>
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={14} style={{ bottom: "4em" }}>
                    <Text>ADULT(12+)</Text>
                </Col>
                <Col span={7} style={{ bottom: "4em" }} >
                    <Space>
                        <InputNumber

                            size={"small"}
                            value={ticketAndPrice.adult.price}
                            disabled={true}
                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                        />
                        <Text>x</Text>
                        <Dropdown overlay={poiAdultmenu}>
                            <Button size={"small"} style={{ width: "42.69px", display: "flex" }} className="ant-dropdown-link" >{ticketAndPrice.adult.quantity}<DownOutlined /></Button>
                        </Dropdown>
                        <Text>=</Text>
                        <div>
                            <InputNumber
                                size={"small"}
                                value={ticketAndPrice.adult.subTotal}
                                disabled={true}
                                formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            />
                        </div>
                    </Space>
                </Col>
            </Row>
            <Row >
                <Col span={2} offset={14} style={{ bottom: "4em" }}>
                    <Text>CHILD(4-11)</Text>
                </Col>
                <Col span={7} style={{ bottom: "4em" }}>
                    <Space>
                        <InputNumber
                            size={"small"}
                            value={ticketAndPrice.child.price}
                            disabled={true}
                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                        />
                        <Text>x</Text>
                        <Dropdown overlay={poiChildMenu}>
                            <Button size={"small"} style={{ width: "42.69px", display: "flex" }} className="ant-dropdown-link" >{ticketAndPrice.child.quantity}<DownOutlined /></Button>
                        </Dropdown>
                        <Text>=</Text>
                        <div>
                            <InputNumber
                                size={"small"}
                                value={ticketAndPrice.child.subTotal}
                                disabled={true}
                                formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            />
                        </div>
                    </Space>
                </Col>
            </Row>
            <Row >
                <Col span={2} offset={14} style={{ bottom: "4em" }}>
                    <Text>INFANT(below2)</Text>
                </Col>
                <Col span={7} style={{ bottom: "4em" }}>
                    <Space>
                        <InputNumber
                            size={"small"}
                            value={ticketAndPrice.infant.price}
                            disabled={true}
                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                        />
                        <Text>x</Text>
                        <Dropdown overlay={poiInfantMenu}>
                            <Button size={"small"} style={{ width: "42.69px", display: "flex" }} className="ant-dropdown-link" >{ticketAndPrice.infant.quantity}<DownOutlined /></Button>
                        </Dropdown>
                        <Text>=</Text>
                        <div>
                            <InputNumber
                                size={"small"}
                                value={ticketAndPrice.infant.subTotal}
                                disabled={true}
                                formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            />
                        </div>
                    </Space>
                </Col>
            </Row>
            <Row >
                <Col span={5} offset={19} style={{ bottom: "4em", right: "7px" }}>
                    <Space>
                        <Text strong>TOTAL</Text>
                        <div >
                            <InputNumber
                                size={"small"}
                                value={ticketAndPrice.totalPrice}
                                readOnly
                                disabled={true}
                                formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            />
                        </div>
                    </Space>
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default PoiTicketPrice