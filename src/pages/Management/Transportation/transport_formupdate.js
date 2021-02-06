import React from 'react'
import { Row, Col, Input, Menu, Dropdown, Button, Card, Divider, message, Space, Typography, Rate, InputNumber, Popconfirm } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import styles from '../../../App.css'
// import currencyList from "../../../currencyList.js"

const axios = require('axios');
const { Text, Title } = Typography

const { TextArea } = Input;
// const locale = "en-us";

class Transport_Formuupdate extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            item: {},
            car_model: "",
            car_class: "Premium cars",
            transmission: "Automatic",
            passenger: 0,
            suitcase: 0,
            price: "",
            remarks: "",
            car_seat: "",
            star_rate: 0,
            error: "",
        };
    }

    componentDidMount = () => {
        // axios.get(`http://localhost:5000/api/transportation/${this.props.match.params.id}`)
        axios.get(`http://13.229.16.186:5000/api/transportation/${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    item: res.data
                });
            })
            .catch(err => console.log(err))
    }

    handleInputChange = (e) => {
        // const target = event.target;
        // const { name, value } = target
        e.persist();
        this.setState(prevState => ({
            item: { ...prevState.item, [e.target.name]: e.target.value }
            // [name]: value
        }));
    }
    value_car_class = ({ key }) => {
        console.log(key)
        message.info(`click on item ${key}`);
        this.setState(prevState => ({
            item: { ...prevState.item, car_class: key }
            // car_class : key
        }))
    };
    value_transmission = ({ key }) => {
        console.log(key)
        message.info(`click on item ${key}`);
        this.setState(prevState => ({
            item: { ...prevState.item, transmission: key }
            // transmission : key
        }))
    };
    value_passenger = ({ key }) => {
        console.log(key)
        message.info(`click on item ${key}`);
        this.setState(prevState => ({
            item: { ...prevState.item, passenger: key }
            // passenger : key
        }))
    };
    value_suitcase = ({ key }) => {
        console.log(key)
        message.info(`click on item ${key}`);
        this.setState(prevState => ({
            item: { ...prevState.item, suitcase: key }
            // suitcase : key
        }))
    };

    handleChange = value => {
        this.setState(prevState => ({
            item: { ...prevState.item, star_rate: value }
        }))
    };

    onChangePrice = (value) => {
        console.log("value", value)
        this.setState(prevState => ({
            item: { ...prevState.item, price: value }
            // price:value
        }))
    }
    onChangeCarSeat = (value) => {
        console.log("value", value)
        this.setState(prevState => ({
            item: { ...prevState.item, car_seat: value }
            // car_seat:value
        }))
    }

    handleValidation() {
        let fields = this.state.item;
        let errors = {};
        let formIsValid = true;
        //Name
        if (!fields["car_model"]) {
            formIsValid = false;
            errors["car_model"] = "Cannot be empty";
        }

        if (fields["price"] === 0 || fields["price"] === null) {
            formIsValid = false;
            errors["price"] = " Cannot be 0 Price or empty";
        }

        if (fields["car_seat"] === 0 || fields["car_seat"] === null) {
            formIsValid = false;
            errors["car_seat"] = " Cannot be 0 Seat or empty";
        }
        this.setState({ error: errors });
        return formIsValid;
    }

    submitonClick = (event) => {
        // console.log(event)
        if (this.handleValidation()) {
            const formdata = {
                car_model: this.state.item.car_model,
                car_class: this.state.item.car_class,
                transmission: this.state.item.transmission,
                passenger: this.state.item.passenger,
                suitcase: this.state.item.suitcase,
                price: this.state.item.price,
                remarks: this.state.item.remarks,
                car_seat: this.state.item.car_seat,
                star_rate: this.state.item.star_rate,
            }
            console.log('formdata', formdata, this.props.match.params.id)
            axios({
                method: 'put',
                // url: 'http://localhost:5000/api/transportation/' + this.props.match.params.id,
                url: 'http://13.229.16.186:5000/api/transportation/' + this.props.match.params.id,
                data: formdata
                // config: { headers: {'Content-Type': 'multipart/form-data' }}erewrg
            })
                .then((response) => {
                    //handle success
                    console.log('api response ==>', response)
                    this.props.history.push("/transport_list")
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
        } else {
            alert("Check empty fill")
        }
    }

    confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
        // console.log('prop', this.props.match.params.id)
        axios({
            method: 'delete',
            url: 'http://13.229.16.186:5000/api/transportation/' + this.props.match.params.id,
            // url: `http://localhost:5000/api/transportation/${this.props.match.params.id}`,
            // data: formdata
            // config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then((response) => {
                //handle success
                console.log('api response ==>', response)
                if (response) {
                    this.props.history.push("/transport_list")
                }
                return response
                // return this.setState({ data: response})
            })
            .catch((error) => {
                //handle error
                return error
                // console.log('error', error)
                // return this.setState({
                //     error: error
                // })
            });
    }

    cancel = (e) => {
        console.log(e);
        message.error('Click on No');
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
            <Menu onClick={this.value_transmission}>
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
                                    {/* <Link exact to="/transport_list"> */}
                                    <Popconfirm
                                        title="Are you sure delete this task?"
                                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                        onConfirm={this.confirm}
                                        onCancel={this.cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button icon={<DeleteOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                            <p style={{ color: "white", position: "inherit" }}>Delete</p>
                                        </Button>
                                    </Popconfirm>
                                    {/* </Link> */}
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
                            <Col span={24} style={{ textAlign: "end" }}><Rate value={this.state.item.star_rate} onChange={this.handleChange} style={{ fontSize: "12px" }} /></Col>
                        </Row>
                        <Row style={{ paddingTop: "10px" }}>
                            <Col span={3} offset={1}>
                                <Text>CAR MODEL</Text>
                            </Col>
                            <Col span={4} >
                                <Input name="car_model" value={this.state.item.car_model} onChange={this.handleInputChange} tabIndex={1} size="small" placeholder="" />
                                <span className="error" style={{ color: "red" }}>{this.state.error["car_model"]}</span>
                            </Col>
                            <Col span={13} offset={3}>
                                <Text strong>EXTRAS:</Text>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>CLASS</Text>
                            </Col>
                            <Col span={4}>
                                <Dropdown overlay={class_menu} >
                                    <Button tabIndex={2} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.item.car_class}<DownOutlined /></Button>
                                </Dropdown>
                            </Col>
                            <Col span={2} offset={4}>
                                <Text>CAR SEAT</Text>
                            </Col>
                            <Col span={10}>
                                <InputNumber
                                    tabIndex={9}
                                    size={"small"}
                                    defaultValue={0}
                                    value={this.state.item.car_seat}
                                    formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                    onChange={this.onChangeCarSeat}
                                />
                                <span className="error" style={{ color: "red" }}>{this.state.error["car_seat"]}</span>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>TRANSMISSION</Text>
                            </Col>
                            <Col span={4}>
                                <Dropdown overlay={transmission_menu} >
                                    <Button tabIndex={3} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.item.transmission}<DownOutlined /></Button>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>PASSENGER CAPACITY</Text>
                            </Col>
                            <Col span={4}>
                                <Dropdown overlay={passenger_menu} >
                                    <Button tabIndex={4} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.item.passenger}<DownOutlined /></Button>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>SUITCASE CAPACITY</Text>
                            </Col>
                            <Col span={4}>
                                <Dropdown overlay={suitcase_menu} >
                                    <Button tabIndex={5} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.item.suitcase}<DownOutlined /></Button>
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
                                    defaultValue={0}
                                    value={this.state.item.price}
                                    formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                    // formatter={currencyFormatter(this.state.currency)}
                                    // parser={currencyParser}
                                    onChange={this.onChangePrice}
                                />
                                <span className="error" style={{ color: "red" }}>{this.state.error["price"]}</span>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>REMARKS</Text>
                            </Col>
                            <Col span={4}>
                                <TextArea tabIndex={7} name="remarks" value={this.state.item.remarks} onChange={this.handleInputChange} style={{ width: "50em" }} rows={4} />
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Transport_Formuupdate;