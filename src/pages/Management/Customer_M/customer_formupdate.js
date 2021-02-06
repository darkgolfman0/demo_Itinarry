import React from 'react'
import { Row, Col, Radio, Input, DatePicker, Menu, Dropdown, Popconfirm, Button, Card, Divider, message, Space, Typography, Switch } from 'antd';
import { DownOutlined, SaveOutlined, QuestionCircleOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import moment from 'moment';

import styles from '../../../App.css'

const axios = require('axios');
const { Text, Title } = Typography
const dateFormat = 'YYYY-MM-DD';

class Customer_Formupdate extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            billing_show: false,
            item: {},
            error: {},
        };
    }

    componentDidMount = () => {
        // axios.get(`http://localhost:5000/api/customer/${this.props.match.params.id}`)
        axios.get(`http://13.229.16.186:5000/api/customer/${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    item: res.data
                });
            })
            .catch(err => console.log(err))
    }

    onChangePerson = e => {
        console.log('radio checked', e.target.value);
        this.setState(prevState => ({
            item: { ...prevState.item, type_person: e.target.value }
            // type_personal: e.target.value,
        }));
    };

    date_onChange = (date, dateString) => {
        console.log(dateString);
        this.setState(prevState => ({
            item: { ...prevState.item, date_birth: dateString }
        }));
    }

    handleValidation() {
        let fields = this.state.item;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["address1"]) {
            formIsValid = false;
            errors["address1"] = "Cannot be empty";
        }

        if (!fields["first_name"].match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            errors["first_name"] = "Cannot be empty And Only letters";
        }

        this.setState({ error: errors });
        return formIsValid;
    }

    handleInputChange = e => {
        e.persist();

        this.setState(prevState => ({
            item: { ...prevState.item, [e.target.name]: e.target.value }
        }))
    }

    SwitonChange(checked) {
        // this.setState({
        //     billing_show: !checked
        // });
        // console.log(`switch to ${checked}  ${this.state.billing_show}`);
        // checked = true
        this.setState(prevState => ({
            item: { ...prevState.item, check_swit: checked }
        }))
        if (this.state.item.check_swit === true) {
            this.setState(prevState => ({
                item: { ...prevState.item, billing_show: true }
            }))
        } else {
            this.setState(prevState => ({
                item: { ...prevState.item, billing_show: false }
            }))
        }
        // this.setState({
        //     check_swit: checked,
        //     billing_show: checked
        // });
        console.log(`switch to ${this.state.item.check_swit}`);
        console.log(`Billing Show ${this.state.item.billing_show}`);
    }

    value_county = ({ key }) => {
        console.log(key)
        message.info(`Click on item ${key}`);
        this.setState(prevState => ({
            item: { ...prevState.item, country: key }
            // country: key
        }))
    };

    value_billing_county = ({ key }) => {
        console.log(key)
        message.info(`Click on item ${key}`);
        this.setState(prevState => ({
            item: { ...prevState.item, billing_country: key }
            // billing_country: key
        }))
    };

    value_title = ({ key }) => {
        console.log(key)
        message.info(`Click on item ${key}`);
        this.setState(prevState => ({
            item: { ...prevState.item, title: key }
        }));
    };

    value_gender = ({ key }) => {
        console.log(key)
        message.info(`Click on item ${key}`);
        this.setState(prevState => ({
            item: { ...prevState.item, gender: key }
            // gender: key
        }))
    };

    submitonClick = (event) => {
        if (this.handleValidation()) {
            let formdata = {
                type_person: this.state.item.type_person,
                title: this.state.item.title,
                first_name: this.state.item.first_name,
                last_name: this.state.item.last_name,
                date_birth: this.state.item.date_birth,
                phone_number: this.state.item.phone_number,
                email: this.state.item.email,
                gender: this.state.item.gender,
                id_card: this.state.item.id_card,
                wechat_id: this.state.item.wechat_id,
                address1: this.state.item.address1,
                address2: this.state.item.address2,
                city: this.state.item.city,
                country: this.state.item.country,
                post_code: this.state.item.post_code,
                billing_address1: this.state.item.address1,
                billing_address2: this.state.item.address2,
                billing_city: this.state.item.city,
                billing_country: this.state.item.country,
                billing_post_code: this.state.item.post_code,
                check_swit: true,
                billing_show: false
            }
            if (this.state.item.billing_show === true) {
                formdata = {
                    type_person: this.state.item.type_person,
                    title: this.state.item.title,
                    first_name: this.state.item.first_name,
                    last_name: this.state.item.last_name,
                    date_birth: this.state.item.date_birth,
                    phone_number: this.state.item.phone_number,
                    email: this.state.item.email,
                    gender: this.state.item.gender,
                    id_card: this.state.item.id_card,
                    wechat_id: this.state.item.wechat_id,
                    address1: this.state.item.address1,
                    address2: this.state.item.address2,
                    city: this.state.item.city,
                    country: this.state.item.country,
                    post_code: this.state.item.post_code,
                    billing_address1: this.state.item.billing_address1,
                    billing_address2: this.state.item.billing_address2,
                    billing_city: this.state.item.billing_city,
                    billing_country: this.state.item.billing_country,
                    billing_post_code: this.state.item.billing_post_code,
                    check_swit: false,
                    billing_show: true
                }
            }
            console.log('formdata', formdata)

            axios({
                method: 'put',
                // url: 'http://localhost:5000/api/customer/' + this.props.match.params.id,
                url: 'http://13.229.16.186:5000/api/customer/' + this.props.match.params.id,
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
        }else{
            alert("Check empty fill")
        }
    }

    confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
        // console.log('prop', this.props.match.params.id)
        axios({
            method: 'delete',
            // url: `http://localhost:5000/api/customer/${this.props.match.params.id}`,
            url: 'http://13.229.16.186:5000/api/customer/' + this.props.match.params.id,
            // data: formdata
            // config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then((response) => {
                //handle success
                console.log('api response ==>', response)
                if (response) {
                    this.props.history.push("/customer_list")
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
        console.log(this.state.item)

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
                        <Radio.Group onChange={this.onChangePerson} value={this.state.item.type_person} >
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
                                    <Button tabIndex={3} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.item.title}<DownOutlined /></Button>
                                </Dropdown>
                            </Col>
                            <Col span={3} offset={3}>
                                <Text>ADDRESSES 1</Text>
                            </Col>
                            <Col span={10}>
                                <Input name="address1" value={this.state.item.address1} onChange={this.handleInputChange} tabIndex={12} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                <span className="error" style={{ color: "red" }}>{this.state.error["address1"]}</span>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>FIRST NAME</Text>
                            </Col>
                            <Col span={4}>
                                <Input name="first_name" value={this.state.item.first_name} onChange={this.handleInputChange} tabIndex={4} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                <span className="error" style={{ color: "red" }}>{this.state.error["first_name"]}</span>
                            </Col>
                            <Col span={3} offset={3}>
                                <Text>ADDRESSES 2</Text>
                            </Col>
                            <Col span={10}>
                                <Input name="address2" value={this.state.item.address2} onChange={this.handleInputChange} tabIndex={13} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>LAST NAME</Text>
                            </Col>
                            <Col span={4}>
                                <Input name="last_name" value={this.state.item.last_name} onChange={this.handleInputChange} tabIndex={5} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                            <Col span={3} offset={3}>
                                <Text>CITY</Text>
                            </Col>
                            <Col span={10}>
                                <Input name="city" value={this.state.item.city} onChange={this.handleInputChange} tabIndex={14} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>DATE OF BIRTH</Text>
                            </Col>
                            <Col span={4}>
                                <DatePicker value={moment(this.state.item.date_birth, dateFormat)} format={dateFormat} tabIndex={6} style={{ width: "148px", display: "flex" }} size="small" onChange={this.date_onChange} />
                            </Col>
                            <Col span={3} offset={3}>
                                <Text>COUNTRY</Text>
                            </Col>
                            <Col span={10}>
                                <Dropdown overlay={county_menu} >
                                    <Button tabIndex={15} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.item.country}<DownOutlined /></Button>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>PHONE NUMBER</Text>
                            </Col>
                            <Col span={4}>
                                <Input name="phone_number" value={this.state.item.phone_number} onChange={this.handleInputChange} tabIndex={7} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                            <Col span={3} offset={3}>
                                <Text>ZIP/POST CODE</Text>
                            </Col>
                            <Col span={10}>
                                <Input name="post_code"  value={this.state.item.post_code} onChange={this.handleInputChange} tabIndex={16} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>EMAIL</Text>
                            </Col>
                            <Col span={4}>
                                <Input name="email" value={this.state.item.email} onChange={this.handleInputChange} tabIndex={8} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                            <Col span={5} offset={3}>
                                <Text>MAKE DEFAULT BILLING ADDRESS</Text>
                            </Col>
                            <Col span={8}>
                                <Switch tabIndex={17} checked={this.state.item.check_swit} onChange={this.SwitonChange.bind(this)} />
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>GENDER</Text>
                            </Col>
                            <Col span={4}>
                                <Dropdown overlay={gender_menu} >
                                    <Button tabIndex={9} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.item.gender} <DownOutlined /></Button>
                                </Dropdown>
                            </Col>
                            {this.state.item.billing_show ? <Col span={14} offset={2} style={{ position: "relative", top: "10px" }}>
                                <Text strong>BILLING ADDRESS</Text>
                            </Col> : null}

                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>ID CARD/TAX ID</Text>
                            </Col>
                            <Col span={4}>
                                <Input name="id_card" value={this.state.item.id_card} onChange={this.handleInputChange} tabIndex={10} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                            {this.state.item.billing_show ? <Col span={3} offset={3}>
                                <Text>ADDRESSES 1</Text>
                            </Col> : null}
                            {this.state.item.billing_show ? <Col span={10}>
                                <Input name="billing_address1" value={this.state.item.billing_address1} onChange={this.handleInputChange} tabIndex={18} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col> : null}
                        </Row>
                        <Row style={{ paddingTop: "5px" }}>
                            <Col span={3} offset={1}>
                                <Text>WE CHAT ID</Text>
                            </Col>
                            <Col span={4}>
                                <Input name="wechat_id" value={this.state.item.wechat_id} onChange={this.handleInputChange} tabIndex={11} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                            {this.state.item.billing_show ? <Col span={3} offset={3}>
                                <Text>ADDRESSES 2</Text>
                            </Col> : null}
                            {this.state.item.billing_show ? <Col span={10}>
                                <Input name="billing_address2" value={this.state.item.billing_address2} onChange={this.handleInputChange} tabIndex={19} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col> : null}
                        </Row>
                        {this.state.item.billing_show ?
                            <div>
                                <Row style={{ paddingTop: "5px" }}>
                                    <Col span={3} offset={11}>
                                        <Text>CITY</Text>
                                    </Col>
                                    <Col span={10}>
                                        <Input name="billing_city" value={this.state.item.billing_city} onChange={this.handleInputChange} tabIndex={20} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                    </Col>
                                </Row>
                                <Row style={{ paddingTop: "5px" }}>
                                    <Col span={3} offset={11}>
                                        <Text>COUNTRY</Text>
                                    </Col>
                                    <Col span={10}>
                                        <Dropdown overlay={billing_county_menu} >
                                            <Button tabIndex={21} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.item.billing_country}<DownOutlined /></Button>
                                        </Dropdown>
                                    </Col>
                                </Row>
                                <Row style={{ paddingTop: "5px" }}>
                                    <Col span={3} offset={11}>
                                        <Text>ZIP/POST CODE</Text>
                                    </Col>
                                    <Col span={10}>
                                        <Input name="billing_post_code" value={this.state.item.billing_post_code} onChange={this.handleInputChange} tabIndex={22} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                    </Col>
                                </Row>
                            </div> : null}

                    </div>
                </Card>
            </div>
        )
    }
}

export default Customer_Formupdate;