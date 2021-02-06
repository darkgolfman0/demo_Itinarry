import React from 'react'
import { Row, Col, Input, Menu, Dropdown, Button, Card, Divider, message, Space, Typography, Rate, InputNumber } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import styles from '../../../App.css'
// import currencyList from "../../../currencyList.js"

const axios = require('axios');
const { Text, Title } = Typography

const { TextArea } = Input;
// const locale = "en-us";



class Transport_Formview extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            fields: {},
            car_model: "",
            car_class: "Premium cars",
            transmission: "Automatic",
            passenger: 0,
            suitcase: 0,
            price: 0,
            remarks: "",
            car_seat: 0,
            star_rate: 0,
            error: {},
        };
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        let fieldsPrice = this.state.price
        let fieldsCarSeat = this.state.car_seat
        //Name
        if (!fields["car_model"]) {
            formIsValid = false;
            errors["car_model"] = "Cannot be empty";
        }

        if (fieldsPrice === 0 || fieldsPrice === null ) {
            formIsValid = false;
            errors["Price"] = " Cannot be 0 Price or empty";
        }

        if (fieldsCarSeat === 0 || fieldsCarSeat === null) {
            formIsValid = false;
            errors["carSeat"] = " Cannot be 0 Seat or empty";
        }
        this.setState({ error: errors });
        return formIsValid;
    }

    handleInputChange = (field, event) => {
        // const target = event.target;
        // const { name, value } = target
        // this.setState({
        //     [name]: value
        // });
        // console.log([name], value)
        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({ fields })
    }
    value_car_class = ({ key }) => {
        console.log(key)
        message.info(`click on item ${key}`);
        this.setState({
            car_class: key
        })
    };
    value_transmission = ({ key }) => {
        console.log(key)
        message.info(`click on item ${key}`);
        this.setState({
            transmission: key
        })
    };
    value_passenger = ({ key }) => {
        console.log(key)
        message.info(`click on item ${key}`);
        this.setState({
            passenger: key
        })
    };
    value_suitcase = ({ key }) => {
        console.log(key)
        message.info(`click on item ${key}`);
        this.setState({
            suitcase: key
        })
    };

    handleChange = star_rate => {
        this.setState({ star_rate });
    };

    onChangePrice = (value) => {
        console.log("value", value)
        this.setState({
            price: value
        })
    }
    onChangeCarSeat = (value) => {
        console.log("value", value)
        this.setState({
            car_seat: value
        })
    }
    submitonClick = (event) => {
        // console.log(event)
        if (this.handleValidation()) {
            const formdata = {
                car_model: this.state.fields.car_model,
                car_class: this.state.car_class,
                transmission: this.state.transmission,
                passenger: this.state.passenger,
                suitcase: this.state.suitcase,
                price: this.state.price,
                remarks: this.state.fields.remarks,
                car_seat: this.state.car_seat,
                star_rate: this.state.star_rate,
            }

            console.log('formdata', formdata)

            axios({
                method: 'post',
                url: 'http://13.229.16.186:5000/api/transportation',
                // url: 'http://localhost:5000/api/transportation',
                data: formdata
                // config: { headers: {'Content-Type': 'multipart/form-data' }}erewrg
            })
                .then((response) => {
                    //handle success
                    this.props.history.push("/transport_list")
                    console.log('api response ==>', response)
                    return response
                    // return this.setState({ data: response})
                })
                .catch((error) => {
                    //handle error
                    console.log(error)
                    return this.setState({
                        error: error
                    })
                });
        }
        else {
            alert("Form has errors.")
        }
    }


    render() {
        console.log(this.state)
        //dropdown menu  
        const suitcase_menu = (
            <Menu onClick={this.value_suitcase}>
                <Menu.Item key='0'>
                    <span target="_blank" rel="noopener noreferrer" >
                        0
                    </span>
                </Menu.Item>
                <Menu.Item key='1'>
                    <span target="_blank" rel="noopener noreferrer" >
                        1
                    </span>
                </Menu.Item>
                <Menu.Item key="2">
                    <span target="_blank" rel="noopener noreferrer" >
                        2
                    </span>
                </Menu.Item>
                <Menu.Item key="3">
                    <span target="_blank" rel="noopener noreferrer">
                        3
                    </span>
                </Menu.Item>
                <Menu.Item key="4">
                    <span target="_blank" rel="noopener noreferrer" >
                        4
                    </span>
                </Menu.Item>
                <Menu.Item key="5">
                    <span target="_blank" rel="noopener noreferrer" >
                        5
                    </span>
                </Menu.Item>
            </Menu>
        );


        const passenger_menu = (
            <Menu onClick={this.value_passenger}>
                <Menu.Item key='0'>
                    <span target="_blank" rel="noopener noreferrer" >
                        0
                            </span>
                </Menu.Item>
                <Menu.Item key='1'>
                    <span target="_blank" rel="noopener noreferrer" >
                        1
                            </span>
                </Menu.Item>
                <Menu.Item key="2">
                    <span target="_blank" rel="noopener noreferrer" >
                        2
                            </span>
                </Menu.Item>
                <Menu.Item key="3">
                    <span target="_blank" rel="noopener noreferrer">
                        3
                            </span>
                </Menu.Item>
                <Menu.Item key="4">
                    <span target="_blank" rel="noopener noreferrer" >
                        4
                            </span>
                </Menu.Item>
                <Menu.Item key="5">
                    <span target="_blank" rel="noopener noreferrer" >
                        5
                            </span>
                </Menu.Item>
            </Menu>
        );

        const transmission_menu = (
            <Menu onClick={this.value_transmission} >
                <Menu.Item key='Automatic'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Automatic
                    </span>
                </Menu.Item>
                <Menu.Item key='Manual'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Manual
                    </span>
                </Menu.Item>
            </Menu>
        );

        //dropdown menu  ssssss

        const class_menu = (
            <Menu onClick={this.value_car_class}>
                <Menu.Item key='Premium cars'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Premium cars
                            </span>
                </Menu.Item>
                <Menu.Item key='SUVs'>
                    <span target="_blank" rel="noopener noreferrer" >
                        SUVs
                            </span>
                </Menu.Item>
                <Menu.Item key='Small cares'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Small cares
                            </span>
                </Menu.Item>
                <Menu.Item key='Medium cars'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Medium cars
                            </span>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className={styles.sitecard_borderless_wrapper}>
                <Card bordered={false} style={{ width: '100%' }}>
                    <Title level={3}>TRANSPORTATION MANAGEMENT</Title>
                    <div style={{ fontSize: "12px" }}>
                        <Row>
                            <Space>
                                <Col span={5}>
                                    {/* <Link exact to="/transport_list"> */}
                                    <Button onClick={this.submitonClick} icon={<SaveOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                        <p style={{ color: "white", position: "inherit" }}>Save</p>
                                    </Button>
                                    {/* </Link> */}
                                </Col>
                                <Col span={5}>
                                    <Link exact to="/transport_list">
                                        <Button icon={<DeleteOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                            <p style={{ color: "white", position: "inherit" }}>Delete</p>
                                        </Button>
                                    </Link>
                                </Col>
                                <Col span={14}>
                                    <Link exact to="/transport_list">
                                        <Button icon={<CloseOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                            <p style={{ color: "white", position: "inherit" }}>Discard</p>
                                        </Button>
                                    </Link>
                                </Col>
                            </Space>
                        </Row>
                        <Divider ></Divider>
                        <Row>
                            <Col span={24} style={{ textAlign: "end" }}><Rate onChange={this.handleChange} style={{ fontSize: "12px" }} /></Col>
                        </Row>
                        <Row>
                            <Col span={2} offset={1}>
                                <Text>CAR MODEL</Text>
                            </Col>
                            <Col span={6} offset={1}>
                                {/* <Input name="car_model" value={this.state.car_model} onChange={this.handleInputChange} tabIndex={1} size="small" placeholder="" /> */}
                                <Space>
                                    <Input name="car_model" ref="car_model" value={this.state.fields["car_model"]} onChange={this.handleInputChange.bind(this, "car_model")} tabIndex={1} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                    <span className="error" style={{ color: "red" }}>{this.state.error["car_model"]}</span>
                                </Space>
                            </Col>
                            <Col span={11} offset={3}>
                                <Text strong>EXTRAS:</Text>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>CLASS</Text>
                            </Col>
                            <Col span={4}>
                                <Dropdown overlay={class_menu} >
                                    <Button tabIndex={2} size="small" onClick={e => e.preventDefault()} style={{ width: 155, display: "flex" }} className="ant-dropdown-link" >{this.state.car_class}<DownOutlined /></Button>
                                </Dropdown>
                            </Col>
                            <Col span={2} offset={4}>
                                <Text>CAR SEAT</Text>
                            </Col>
                            <Col span={10}>
                                <InputNumber
                                    tabIndex={9}
                                    size={"small"}
                                    value={this.state.car_seat}
                                    formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                    onChange={this.onChangeCarSeat}
                                />
                                <span className="error" style={{ color: "red" }}>{this.state.error["carSeat"]}</span>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>TRANSMISSION</Text>
                            </Col>
                            <Col span={4}>
                                <Dropdown overlay={transmission_menu}   >
                                    <Button tabIndex={3} size="small" onClick={e => e.preventDefault()} style={{ width: 155, display: "flex" }} className="ant-dropdown-link" >{this.state.transmission}<DownOutlined /></Button>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>PASSENGER CAPACITY</Text>
                            </Col>
                            <Col span={4}>
                                <Dropdown overlay={passenger_menu} >
                                    <Button tabIndex={4} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.passenger}<DownOutlined /></Button>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>SUITCASE CAPACITY</Text>
                            </Col>
                            <Col span={4} >
                                <Dropdown overlay={suitcase_menu} >
                                    <Button tabIndex={5} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.suitcase}<DownOutlined /></Button>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>PRICE</Text>
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    tabIndex={6}
                                    size={"small"}
                                    value={this.state.price}
                                    style={{ width: "auto", display: "flex" }}
                                    formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                    onChange={this.onChangePrice}
                                />
                                <span className="error" style={{ color: "red" }}>{this.state.error["Price"]}</span>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>REMARKS</Text>
                            </Col>
                            <Col span={4}>
                                {/* <TextArea tabIndex={7} name="remarks" value={this.state.remarks} onChange={this.handleInputChange} style={{ width: "50em" }} rows={4} /> */}
                                <TextArea tabIndex={7} name="remarks" ref="remarks" value={this.state.fields["remarks"]} onChange={this.handleInputChange.bind(this, "remarks")} style={{ width: "50em" }} rows={4} />
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Transport_Formview;