import React from 'react'
import { Row, Col, Button, Card, Typography, Input, message, Menu, Dropdown, Space, TimePicker, InputNumber } from 'antd';
import { DownOutlined, PlusCircleOutlined } from '@ant-design/icons';

import moment from 'moment';

import styles from '../App.css'
import "react-datetime/css/react-datetime.css";
import Itinerary_Formview from '../pages/Itinenary/itinerary_formview'

//global class element
const { Text } = Typography
const { TextArea } = Input;
const format = 'HH:mm';
const { Search } = Input;



class ModalTransport extends React.Component {
    constructor(props) {
        super()

    }
    state = {
        name: "",
        note: "",
        p_location: "Suvarnabhumi Airport",
        d_location: "Suvarnabhumi Airport",
        pickup: "DAY 1",
        dropoff: "DAY 1",
        quantity: 1,
        carseat: 1,
        test_state: "test"
    };

    onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const { name, value } = target
        this.setState({
            [name]: value
        });
    }

    render() {
        console.log(this.state)
        //dropdown
        const value_pickup_location = ({ key }) => {
            this.setState({
                p_location: key
            })
            message.info(`Click on item ${key}`);
        };
        const p_location_menu = (
            <Menu onClick={value_pickup_location}>
                <Menu.Item key='Suvarnabhumi Airport'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Suvarnabhumi Airport
                    </span>
                </Menu.Item>
                <Menu.Item key='Don Mueang Airport'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Don Mueang Airport
                    </span>
                </Menu.Item>
                <Menu.Item key='Phuket Airport'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Phuket Airport
                    </span>
                </Menu.Item>
                <Menu.Item key='Chiang Mai Airport'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Chiang Mai Airport
                    </span>
                </Menu.Item>
            </Menu>
        );

        //dropdown
        const value_dropoff_location = ({ key }) => {
            this.setState({
                d_location: key
            })
            message.info(`Click on item ${key}`);
        };
        const d_location_menu = (
            <Menu onClick={value_dropoff_location}>
                <Menu.Item key='Suvarnabhumi Airport'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Suvarnabhumi Airport
                    </span>
                </Menu.Item>
                <Menu.Item key='Don Mueang Airport'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Don Mueang Airport
                    </span>
                </Menu.Item>
                <Menu.Item key='Phuket Airport'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Phuket Airport
                    </span>
                </Menu.Item>
                <Menu.Item key='Chiang Mai Airport'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Chiang Mai Airport
                    </span>
                </Menu.Item>
            </Menu>
        );

        //dropdown
        const value_pickup = ({ key }) => {
            this.setState({
                pickup: key
            })
            message.info(`Click on item ${key}`);
        };
        const pickup_menu = (
            <Menu onClick={value_pickup}>
                <Menu.Item key='DAY 1'>
                    <span target="_blank" rel="noopener noreferrer" >
                        DAY 1
                    </span>
                </Menu.Item>
                <Menu.Item key='DAY 2'>
                    <span target="_blank" rel="noopener noreferrer" >
                        DAY 2
                    </span>
                </Menu.Item>
                <Menu.Item key='DAY 3'>
                    <span target="_blank" rel="noopener noreferrer" >
                        DAY 3
                    </span>
                </Menu.Item>
            </Menu>
        );

        //dropdown
        const value_dropoff = ({ key }) => {
            this.setState({
                dropoff: key
            })
            message.info(`Click on item ${key}`);
        };
        const dropoff_menu = (
            <Menu onClick={value_dropoff}>
                <Menu.Item key='DAY 1'>
                    <span target="_blank" rel="noopener noreferrer" >
                        DAY 1
                            </span>
                </Menu.Item>
                <Menu.Item key='DAY 2'>
                    <span target="_blank" rel="noopener noreferrer" >
                        DAY 2
                            </span>
                </Menu.Item>
                <Menu.Item key='DAY 3'>
                    <span target="_blank" rel="noopener noreferrer" >
                        DAY 3
                            </span>
                </Menu.Item>
            </Menu>
        );

        //dropdown
        const value_quantity = ({ key }) => {
            this.setState({
                quantity: key
            })
            message.info(`Click on item ${key}`);
        };
        const quantity_menu = (
            <Menu onClick={value_quantity}>
                <Menu.Item key='1'>
                    <span target="_blank" rel="noopener noreferrer" >
                        1
                            </span>
                </Menu.Item>
                <Menu.Item key='2'>
                    <span target="_blank" rel="noopener noreferrer" >
                        2
                            </span>
                </Menu.Item>
                <Menu.Item key='3'>
                    <span target="_blank" rel="noopener noreferrer" >
                        3
                            </span>
                </Menu.Item>
                <Menu.Item key='4'>
                    <span target="_blank" rel="noopener noreferrer" >
                        4
                            </span>
                </Menu.Item>
                <Menu.Item key='5'>
                    <span target="_blank" rel="noopener noreferrer" >
                        5
                            </span>
                </Menu.Item>
            </Menu>
        );

        //dropdown
        const value_carseat = ({ key }) => {
            this.setState({
                carseat: key
            })
            message.info(`Click on item ${key}`);
        };
        const carseat_menu = (
            <Menu onClick={value_carseat}>
                <Menu.Item key='1'>
                    <span target="_blank" rel="noopener noreferrer" >
                        1
                            </span>
                </Menu.Item>
                <Menu.Item key='2'>
                    <span target="_blank" rel="noopener noreferrer" >
                        2
                            </span>
                </Menu.Item>
                <Menu.Item key='3'>
                    <span target="_blank" rel="noopener noreferrer" >
                        3
                            </span>
                </Menu.Item>
                <Menu.Item key='4'>
                    <span target="_blank" rel="noopener noreferrer" >
                        4
                            </span>
                </Menu.Item>
                <Menu.Item key='5'>
                    <span target="_blank" rel="noopener noreferrer" >
                        5
                            </span>
                </Menu.Item>
            </Menu>
        );


        return (
            <div className={styles.sitecard_borderless_wrapper}>
                <Card bordered={false}>
                    <div style={{ fontSize: "12px" }}>
                        {/* Col 24 */}
                        <div>
                            <Row>
                                <Col span={3}>
                                    <Text>PICK-UP LOCATION</Text>
                                </Col>
                                <Col span={3}>
                                    <Dropdown overlay={p_location_menu} >
                                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.p_location}<DownOutlined /></Button>
                                    </Dropdown>
                                </Col>
                                <Col span={11} offset={7}>
                                    <Text strong>PRICE:</Text>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "0.5em" }}>
                                <Col span={3}>
                                    <Text>DROP-OFF LOCATION</Text>
                                </Col>
                                <Col span={3}>
                                    <Dropdown overlay={d_location_menu} >
                                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.d_location}<DownOutlined /></Button>
                                    </Dropdown>
                                </Col>
                                <Col span={2} offset={8} style={{ bottom: "0.5em" }}>
                                    <Text>QUANTITY CAR</Text>
                                </Col>
                                <Col span={1} style={{ bottom: "0.5em" }}>
                                    <Dropdown overlay={quantity_menu} >
                                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.quantity}<DownOutlined /></Button>
                                    </Dropdown>
                                </Col>
                                <Col span={1} style={{ left: "0.5em", bottom: "0.5em" }}>
                                    <InputNumber
                                        size={"small"}
                                        defaultValue={0}
                                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                        // formatter={currencyFormatter(this.state.currency)}
                                        // parser={currencyParser}
                                        onChange={this.onChangePrice}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "0.5em" }}>
                                <Col span={3}>
                                    <Text>CAR MODEL</Text>
                                </Col>
                                <Col span={4}>
                                    <Space>
                                        <Search
                                            placeholder="input search text"
                                            onSearch={value => console.log(value)}
                                            style={{ fontSize: "12px", height: "auto", width: 'auto' }}
                                            size='small'
                                        />
                                        <Button tabIndex={2} size={"small"} icon={<PlusCircleOutlined style={{ color: "white", marginTop: "-5px", marginLeft: "-4px", fontSize: "13px" }} />} style={{ width: "20px", height: "20px", background: '#1890ff' }}></Button>
                                    </Space>
                                </Col>
                                <Col span={2} offset={7} style={{ bottom: "0.5em" }}>
                                    <Text>CAR SEAT</Text>
                                </Col>
                                <Col span={1} style={{ bottom: "0.5em" }}>
                                    <Dropdown overlay={carseat_menu} >
                                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.carseat}<DownOutlined /></Button>
                                    </Dropdown>
                                </Col>
                                <Col span={1} style={{ left: "0.5em", bottom: "0.5em" }}>
                                    <InputNumber
                                        size={"small"}
                                        defaultValue={0}
                                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                        // formatter={currencyFormatter(this.state.currency)}
                                        // parser={currencyParser}
                                        onChange={this.onChangePrice}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "0.5em" }}>
                                <Col span={3}>
                                    <Text>PICK-UP DAY</Text>
                                </Col>
                                <Col span={2}>
                                    <Dropdown overlay={pickup_menu}>
                                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.pickup}<DownOutlined /></Button>
                                    </Dropdown>
                                </Col>
                                <Col span={2}>
                                    <TimePicker
                                        size={"small"}
                                        defaultValue={moment('00:00', format)}
                                        format={format}
                                        style={{ width: "80px" }}
                                    />
                                </Col>
                                <Col span={2} offset={7} style={{ bottom: "1em" }}>
                                    <Text>EXTRA</Text>
                                </Col>
                                <Col span={1} offset={1} style={{ left: "0.5em", bottom: "1em" }}>
                                    <InputNumber
                                        size={"small"}
                                        defaultValue={0}
                                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                        // formatter={currencyFormatter(this.state.currency)}
                                        // parser={currencyParser}
                                        onChange={this.onChangePrice}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "0.5em" }}>
                                <Col span={3}>
                                    <Text>DROP-OFF DAY</Text>
                                </Col>
                                <Col span={2}>
                                    <Dropdown overlay={dropoff_menu}>
                                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.dropoff}<DownOutlined /></Button>
                                    </Dropdown>
                                </Col>
                                <Col span={2}>
                                    <TimePicker
                                        size={"small"}
                                        defaultValue={moment('00:00', format)}
                                        format={format}
                                        style={{ width: "80px" }}
                                    />
                                </Col>
                                <Col span={2} offset={7} style={{ bottom: "1.5em" }}>
                                    <Text strong>TOTAL PRICE</Text>
                                </Col>
                                <Col span={1} offset={1} style={{ left: "0.5em", bottom: "1.5em" }}>
                                    <InputNumber
                                        size={"small"}
                                        defaultValue={0}
                                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                        // formatter={currencyFormatter(this.state.currency)}
                                        // parser={currencyParser}
                                        onChange={this.onChangePrice}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "0.5em" }}>
                                <Col span={7}>
                                    <TextArea name="note" placeholder="Additional notes ..." value={this.state.note} onChange={this.handleInputChange} style={{ height: "auto", width: "100%" }} rows={10} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card>
            </div >
        )
    }
}
export default ModalTransport;