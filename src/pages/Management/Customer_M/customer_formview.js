import React from 'react'
import { Row, Col, Radio, Input, DatePicker, Menu, Dropdown, Button, Card, Divider, message, Space, Typography, Switch } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment'

import styles from '../../../App.css'

const axios = require('axios');
const { Text, Title } = Typography
const dateFormat = 'YYYY-MM-DD';

class Customer_Formview extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            billing_show: false,
            type_personal: "NATURAL PERSON",
            title: "Mr.",
            first_name: "",
            last_name: "",
            // date_birth: new Date().toLocaleString(),
            date_birth: moment(),
            phone_number: "",
            email: "",
            gender: "Male",
            id_card: "",
            wechat: "",
            address1: "",
            address2: "",
            city: "",
            country: "Thailand",
            post_code: "",
            billing_address1: "",
            billing_address2: "",
            billing_city: "",
            billing_country: "Thailand",
            billing_post_code: "",
            check_swit: true,
            fields: {},
            error: {},
        };
    }

    onChangePerson = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            type_personal: e.target.value,
        });
    };

    date_onChange = (e, date, dateString) => {
        console.log(date, dateString);
        this.setState({
            date_birth: date
        });
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

    SwitonChange(checked) {
        // checked = true
        this.setState({
            check_swit: checked
        })
        if (this.state.check_swit === true) {
            this.setState({
                billing_show: true
            })
        } else {
            this.setState({
                billing_show: false
            })
        }
        // this.setState({
        //     check_swit: checked,
        //     billing_show: checked
        // });
        console.log(`switch to ${this.state.check_swit}`);
        console.log(`Billing Show ${this.state.billing_show}`);
    }

    value_county = ({ key }) => {
        console.log(key)
        message.info(`Click on item ${key}`);
        this.setState({
            country: key
        })
    };

    value_billing_county = ({ key }) => {
        console.log(key)
        message.info(`Click on item ${key}`);
        this.setState({
            billing_country: key
        })
    };

    value_title = ({ key }) => {
        console.log(key)
        message.info(`Click on item ${key}`);
        this.setState({
            title: key
        })
    };

    value_gender = ({ key }) => {
        console.log(key)
        message.info(`Click on item ${key}`);
        this.setState({
            gender: key
        })
    };

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["address1"]) {
            formIsValid = false;
            errors["address1"] = "Cannot be empty";
        }

        if (!fields["first_name"]) {
            formIsValid = false;
            errors["first_name"] = "Cannot be empty";
        }

        if (typeof fields["first_name"] !== "undefined") {
            if (!fields["first_name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["first_name"] = "Only letters";
            }
        }
        this.setState({ error: errors });
        return formIsValid;
    }

    submitonClick = (event) => {
        // console.log(event)
        event.preventDefault();
        if (this.handleValidation()) {
            let formdata = {
                type_person: this.state.type_personal,
                title: this.state.title,
                first_name: this.state.fields.first_name,
                last_name: this.state.fields.last_name,
                date_birth: this.state.date_birth,
                phone_number: this.state.fields.phone_number,
                email: this.state.fields.email,
                gender: this.state.gender,
                id_card: this.state.fields.id_card,
                wechat_id: this.state.fields.wechat,
                address1: this.state.fields.address1,
                address2: this.state.fields.address2,
                city: this.state.fields.city,
                country: this.state.country,
                post_code: this.state.fields.post_code,
                billing_address1: this.state.fields.address1,
                billing_address2: this.state.fields.address2,
                billing_city: this.state.fields.city,
                billing_country: this.state.country,
                billing_post_code: this.state.fields.post_code,
                check_swit: true,
                billing_show: false
            }
            if (this.state.billing_show === true) {
                formdata = {
                    type_person: this.state.type_personal,
                    title: this.state.title,
                    first_name: this.state.fields.first_name,
                    last_name: this.state.fields.last_name,
                    date_birth: this.state.date_birth,
                    phone_number: this.state.fields.phone_number,
                    email: this.state.fields.email,
                    gender: this.state.gender,
                    id_card: this.state.fields.id_card,
                    wechat_id: this.state.fields.wechat,
                    address1: this.state.fields.address1,
                    address2: this.state.fields.address2,
                    city: this.state.fields.city,
                    country: this.state.country,
                    post_code: this.state.fields.post_code,
                    billing_address1: this.state.fields.billing_address1,
                    billing_address2: this.state.fields.billing_address2,
                    billing_city: this.state.fields.billing_city,
                    billing_country: this.state.billing_country,
                    billing_post_code: this.state.fields.billing_post_code,
                    check_swit: false,
                    billing_show: true
                }
            }
            console.log('formdata', formdata)
            axios({
                method: 'post',
                // url: 'http://localhost:5000/api/customer',
                url: 'http://13.229.16.186:5000/api/customer/',
                data: formdata
                // config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
                .then((response) => {
                    //handle success
                    console.log('api response ==>', response)
                    this.props.history.push("/customer_list")
                    return response
                    // return this.setState({ data: response})
                })
                .catch((error) => {
                    //handle error
                    console.log('error', error)
                    return this.setState({
                        error: error
                    })
                });

        } else {
            alert("Form has errors.")
        }

    }
    render() {
        console.log(this.state)
        // axios({
        //     method: 'post',
        //     url: 'http://localhost:5000/api/customer',
        //     data: {
        //         type_personal:this.state.type_personal
        //     },
        //     // config: { headers: {'Content-Type': 'multipart/form-data' }}
        // })
        //     .then((response) => {
        //         //handle success
        //         // console.log('api response ==>', response.data)
        //         return this.setState({ data: response.data })
        //     })
        //     .catch((error) => {
        //         //handle error
        //         return this.setState({
        //             error: error
        //         })
        //     });

        const county_menu = (
            <Menu onClick={this.value_county}>
                <Menu.Item key='Thailand'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Thailand
                    </span>
                </Menu.Item>
                <Menu.Item key="Taiwan">
                    <span target="_blank" rel="noopener noreferrer" >
                        Taiwan
                    </span>
                </Menu.Item>
                <Menu.Item key="China">
                    <span target="_blank" rel="noopener noreferrer">
                        China
                    </span>
                </Menu.Item>
                <Menu.Item key="Korea">
                    <span target="_blank" rel="noopener noreferrer" >
                        Korea
                    </span>
                </Menu.Item>
                <Menu.Item key="Japan">
                    <span target="_blank" rel="noopener noreferrer" >
                        Japan
                    </span>
                </Menu.Item>
            </Menu>
        );

        const billing_county_menu = (
            <Menu onClick={this.value_billing_county}>
                <Menu.Item key='Thailand'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Thailand
                    </span>
                </Menu.Item>
                <Menu.Item key="Taiwan">
                    <span target="_blank" rel="noopener noreferrer" >
                        Taiwan
                    </span>
                </Menu.Item>
                <Menu.Item key="China">
                    <span target="_blank" rel="noopener noreferrer">
                        China
                    </span>
                </Menu.Item>
                <Menu.Item key="Korea">
                    <span target="_blank" rel="noopener noreferrer" >
                        Korea
                    </span>
                </Menu.Item>
                <Menu.Item key="Japan">
                    <span target="_blank" rel="noopener noreferrer" >
                        Japan
                    </span>
                </Menu.Item>
            </Menu>
        );

        const title_menu = (
            <Menu onClick={this.value_title}>
                <Menu.Item key='Mr.'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Mr.
                    </span>
                </Menu.Item>
                <Menu.Item key='Ms.'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Ms.
                    </span>
                </Menu.Item>
            </Menu>
        );

        const gender_menu = (
            <Menu onClick={this.value_gender}>
                <Menu.Item key='Male'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Male
                    </span>
                </Menu.Item>
                <Menu.Item key='Female'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Female
                    </span>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className={styles.sitecard_borderless_wrapper}>
                <Card bordered={false} style={{ width: '100%' }}>
                    <Title level={3}>CUSTOMER MANAGEMENT</Title>
                    <div style={{ fontSize: "12px" }}>
                        <Row>
                            <Space>
                                <Col span={5}>
                                    {/* <Link exact to="/customer_list"> */}
                                    <Button onClick={this.submitonClick} icon={<SaveOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                        <p style={{ color: "white", position: "inherit" }}>Save</p>
                                    </Button>
                                    {/* </Link> */}
                                </Col>
                                <Col span={5}>
                                    <Link exact to="/customer_list">
                                        <Button icon={<DeleteOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                            <p style={{ color: "white", position: "inherit" }}>Delete</p>
                                        </Button>
                                    </Link>
                                </Col>
                                <Col span={14}>
                                    <Link exact to="/customer_list">
                                        <Button icon={<CloseOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                            <p style={{ color: "white", position: "inherit" }}>Discard</p>
                                        </Button>
                                    </Link>
                                </Col>
                            </Space>
                        </Row>
                        <Divider ></Divider>
                        <Radio.Group onChange={this.onChangePerson} value={this.state.type_personal} >
                            <Radio tabIndex={1} value={"NATURAL PERSON"} style={{ fontSize: "12px" }}>NATURAL PERSON</Radio>
                            <Radio tabIndex={2} value={"JURISTIC PERSON"} style={{ fontSize: "12px" }}>JURISTIC PERSON</Radio>
                        </Radio.Group>
                        <Row>
                            <Col span={10} style={{ position: "relative", top: "10px" }}>
                                <Text strong>PERSONAL DETAILS</Text>
                            </Col>
                            <Col span={14} style={{ position: "relative", top: "10px" }}>
                                <Text strong>ADDRESSES</Text>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "10px" }}>
                            <Col span={3} offset={1}>
                                <Text>TITLE</Text>
                            </Col>
                            <Col span={4} >
                                <Dropdown overlay={title_menu} >
                                    <Button tabIndex={3} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.title}<DownOutlined /></Button>
                                </Dropdown>
                            </Col>
                            <Col span={3} offset={3}>
                                <Text>ADDRESSES 1*</Text>
                            </Col>
                            <Col span={10}>
                                <Space>
                                    <Input name="address1" ref="address1" value={this.state.fields["address1"]} onChange={this.handleInputChange.bind(this, "address1")} tabIndex={12} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                    <span className="error" style={{ color: "red" }}>{this.state.error["address1"]}</span>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>FIRST NAME*</Text>
                            </Col>
                            <Col span={4}>
                                <Input name="first_name" ref="first_name" value={this.state.fields["first_name"]} onChange={this.handleInputChange.bind(this, "first_name")} tabIndex={4} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                <span className="error" style={{ color: "red" }}>{this.state.error["first_name"]}</span>
                            </Col>
                            <Col span={3} offset={3}>
                                <Text>ADDRESSES 2</Text>
                            </Col>
                            <Col span={10}>
                                {/* <Input name="address2" value={this.state.address2} onChange={this.handleInputChange} tabIndex={13} style={{ width: "auto", display: "flex" }} size="small" placeholder="" /> */}
                                <Input name="address2" ref="address2" value={this.state.fields["address2"]} onChange={this.handleInputChange.bind(this, "address2")} tabIndex={13} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>LAST NAME</Text>
                            </Col>
                            <Col span={4}>
                                {/* <Input name="last_name" value={this.state.last_name} onChange={this.handleInputChange} tabIndex={5} style={{ width: "auto", display: "flex" }} size="small" placeholder="" /> */}
                                <Input name="last_name" ref="last_name" value={this.state.fields["last_name"]} onChange={this.handleInputChange.bind(this, "last_name")} tabIndex={13} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                            <Col span={3} offset={3}>
                                <Text>CITY</Text>
                            </Col>
                            <Col span={10}>
                                {/* <Input name="city" value={this.state.city} onChange={this.handleInputChange} tabIndex={14} style={{ width: "auto", display: "flex" }} size="small" placeholder="" /> */}
                                <Input name="city" ref="city" value={this.state.fields["city"]} onChange={this.handleInputChange.bind(this, "city")} tabIndex={13} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>DATE OF BIRTH</Text>
                            </Col>
                            <Col span={4}>
                                {/* <DatePicker tabIndex={6} style={{ width: "148px", display: "flex" }} size="small" onChange={this.date_onChange} /> */}
                                <DatePicker name="date_birth" value={this.state.date_birth} tabIndex={6} style={{ width: "148px", display: "flex" }} size="small" onChange={this.date_onChange.bind(this, "date_birth")} />
                            </Col>
                            <Col span={3} offset={3}>
                                <Text>COUNTRY</Text>
                            </Col>
                            <Col span={10}>
                                <Dropdown overlay={county_menu} >
                                    <Button tabIndex={15} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.country}<DownOutlined /></Button>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>PHONE NUMBER</Text>
                            </Col>
                            <Col span={4}>
                                {/* <Input name="phone_number" type="number" value={this.state.phone_number} onChange={this.handleInputChange} tabIndex={7} style={{ width: "auto", display: "flex" }} size="small" placeholder="" /> */}
                                <Input name="phone_number" ref="phone_number" value={this.state.fields["phone_number"]} onChange={this.handleInputChange.bind(this, "phone_number")} tabIndex={13} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                            <Col span={3} offset={3}>
                                <Text>ZIP/POST CODE</Text>
                            </Col>
                            <Col span={10}>
                                {/* <Input name="post_code" type="number" value={this.state.post_code} onChange={this.handleInputChange} tabIndex={16} style={{ width: "auto", display: "flex" }} size="small" placeholder="" /> */}
                                <Input name="post_code" ref="post_code" value={this.state.fields["post_code"]} onChange={this.handleInputChange.bind(this, "post_code")} tabIndex={13} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>EMAIL</Text>
                            </Col>
                            <Col span={4}>
                                {/* <Input name="email" value={this.state.email} onChange={this.handleInputChange} tabIndex={8} style={{ width: "auto", display: "flex" }} size="small" placeholder="" /> */}
                                <Input name="email" ref="email" value={this.state.fields["email"]} onChange={this.handleInputChange.bind(this, "email")} tabIndex={13} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                            <Col span={5} offset={3}>
                                <Text>MAKE DEFAULT BILLING ADDRESS</Text>
                            </Col>
                            <Col span={8}>
                                {/* <Switch tabIndex={17} defaultChecked={this.state.billing_show} onChange={this.SwitonChange.bind(this)} /> */}
                                <Switch tabIndex={17} checked={this.state.check_swit} onChange={this.SwitonChange.bind(this)} />
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>GENDER</Text>
                            </Col>
                            <Col span={4}>
                                <Dropdown overlay={gender_menu} >
                                    <Button tabIndex={9} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.gender} <DownOutlined /></Button>
                                </Dropdown>
                            </Col>
                            {this.state.billing_show ? <Col span={14} offset={2} style={{ position: "relative", top: "10px" }}>
                                <Text strong>BILLING ADDRESS</Text>
                            </Col> : null}

                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>ID CARD/TAX ID</Text>
                            </Col>
                            <Col span={4}>
                                {/* <Input name="id_card" value={this.state.id_card} onChange={this.handleInputChange} tabIndex={10} style={{ width: "auto", display: "flex" }} size="small" placeholder="" /> */}
                                <Input name="id_card" ref="id_card" value={this.state.fields["id_card"]} onChange={this.handleInputChange.bind(this, "id_card")} tabIndex={13} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                            {this.state.billing_show ? <Col span={3} offset={3}>
                                <Text>ADDRESSES 1</Text>
                            </Col> : null}
                            {this.state.billing_show ? <Col span={10}>
                                {/* <Input name="billing_address1" value={this.state.billing_address1} onChange={this.handleInputChange} tabIndex={18} style={{ width: "auto", display: "flex" }} size="small" placeholder="" /> */}
                                <Input name="billing_address1" ref="billing_address1" value={this.state.fields["billing_address1"]} onChange={this.handleInputChange.bind(this, "billing_address1")} tabIndex={13} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col> : null}
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>WE CHAT ID</Text>
                            </Col>
                            <Col span={4}>
                                {/* <Input name="wechat" value={this.state.wechat} onChange={this.handleInputChange} tabIndex={11} style={{ width: "auto", display: "flex" }} size="small" placeholder="" /> */}
                                <Input name="wechat" ref="wechat" value={this.state.fields["wechat"]} onChange={this.handleInputChange.bind(this, "wechat")} tabIndex={13} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                            {this.state.billing_show ? <Col span={3} offset={3}>
                                <Text>ADDRESSES 2</Text>
                            </Col> : null}
                            {this.state.billing_show ? <Col span={10}>
                                {/* <Input name="billing_address2" value={this.state.billing_address2} onChange={this.handleInputChange} tabIndex={19} style={{ width: "auto", display: "flex" }} size="small" placeholder="" /> */}
                                <Input name="billing_address2" ref="billing_address2" value={this.state.fields["billing_address2"]} onChange={this.handleInputChange.bind(this, "billing_address2")} tabIndex={13} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col> : null}
                        </Row>
                        {this.state.billing_show ?
                            <div>
                                <Row style={{ paddingTop: "5px" }}>
                                    <Col span={3} offset={11}>
                                        <Text>CITY</Text>
                                    </Col>
                                    <Col span={10}>
                                        {/* <Input name="billing_city" value={this.state.billing_city} onChange={this.handleInputChange} tabIndex={20} style={{ width: "auto", display: "flex" }} size="small" placeholder="" /> */}
                                        <Input name="billing_city" ref="billing_city" value={this.state.fields["billing_city"]} onChange={this.handleInputChange.bind(this, "billing_city")} tabIndex={13} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                    </Col>
                                </Row>
                                <Row style={{ paddingTop: "5px" }}>
                                    <Col span={3} offset={11}>
                                        <Text>COUNTRY</Text>
                                    </Col>
                                    <Col span={10}>
                                        <Dropdown overlay={billing_county_menu} >
                                            <Button tabIndex={21} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.billing_country}<DownOutlined /></Button>
                                        </Dropdown>
                                    </Col>
                                </Row>
                                <Row style={{ paddingTop: "5px" }}>
                                    <Col span={3} offset={11}>
                                        <Text>ZIP/POST CODE</Text>
                                    </Col>
                                    <Col span={10}>
                                        {/* <Input name="billing_post_code" value={this.state.billing_post_code} onChange={this.handleInputChange} tabIndex={22} style={{ width: "auto", display: "flex" }} size="small" placeholder="" /> */}
                                        <Input name="billing_post_code" ref="billing_post_code" value={this.state.fields["billing_post_code"]} onChange={this.handleInputChange.bind(this, "billing_post_code")} tabIndex={13} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                    </Col>
                                </Row>
                            </div> : null}

                    </div>
                </Card>
            </div>
        )
    }
}

export default Customer_Formview;