import React from 'react'
import { Row, Col, Input, Menu, Dropdown, Button, Card, Divider, Table, message, Space, Typography, AutoComplete } from 'antd';
import { DownOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import styles from '../../../App.css'

// Typograpy Text
const { Title } = Typography
// search input
const { Search } = Input;
const axios = require('axios');

class Customer_List extends React.Component {
    constructor(props) {
        super()
        axios({
            method: 'get',
            url: 'http://13.229.16.186:5000/api/customer/',
            // url: 'http://localhost:5000/api/customer',
            // data: formData,
            // config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then((response) => {
                //handle success
                // console.log('api response ==>', response.data)
                return this.setState({ 
                    dataSource: response.data,
                    display_customer: response.data,
                    item_customer: response.data
                })
                
            })
            .catch((error) => {
                //handle error
                console.log(error);
                this.setState({
                    error: error
                })
            });
    }
    state = {
        legal: "All",
        country: "All",
        legal_person: "",
        title: "",
        first_name: "",
        last_name: "",
        // country:"",
        telephone: "",
        email: "",
        error: "",
        dataSource: [],
        display_customer: [],
        autocomplete_customer: [],
        item_customer: [],
        select_customer:"",
    }

    tableOnChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    //dropdown Legal menu dropdown
    value_legal = ({ key }) => {
        this.setState({
            legal: key
        })
        console.log(key)
        message.info(`Click on item ${key}`);
    };

    //dropdown county menu  
    value_county = ({ key }) => {
        this.setState({
            country: key
        })
        console.log(key)
        message.info(`Click on item ${key}`);
    };

    onclickUpdate = (event) => {
        console.log(event)
        console.log(this.props.history);
        this.props.history.push("/customer_formupdate/" + event)
    }
    //Row Filtering 
    InputSearchHandler =async () => {
        await this.customer_auto_change
    
            this.state.display_customer = this.state.dataSource.filter(x => x.first_name.includes(this.state.select_customer))
            this.setState({
                display_customer:this.state.display_customer
            })
        }
        
    customer_auto_change =  (data) => {
            this.setState({
               select_customer: data
           })
        }

        //Row Filtering of Searching Input Apace 
    onClickSorter = () => {
        // console.log('e :>> ', this.state.select_customer) 
        // console.log('display :>> ', this.state.display_customer) 
        this.state.display_customer = this.state.dataSource.filter(x => x.first_name.includes(this.state.select_customer))
            this.setState({
                display_customer:this.state.display_customer
            })
        }


    render() {
        
        console.log(this.state)
        
        //filtering state
        this.state.autocomplete_customer = []
        this.state.item_customer.forEach(customer => {
            // console.log(customer)
            this.state.autocomplete_customer.push({
                "value" : customer.first_name
            })
        });
        const options_customer = this.state.autocomplete_customer;

        const { display_customer } = this.state

        const data_key = display_customer.map(row => (
            // console.log(row._id)
            {
                data_id: row._id,
                type_person: row.type_person,
                title: row.title,
                first_name: row.first_name,
                last_name: row.last_name,
                country: row.country,
                phone_number: row.phone_number,
                email: row.email,
            }
        ))

        //table columns
        const columns = [
            {
                title: 'Action',
                dataIndex: 'data_id',
                key: 'data_id',
                render: (data, record) =>
                    (
                        < Space size="small" >
                            <span value={data} onClick={() => this.onclickUpdate(data)} style={{ fontSize: "12px" }}><FormOutlined /></span>
                            {/* <span><FormOutlined /></span>
                <span><FormOutlined /></span> */}
                        </Space >
                    )
            },
            {
                title: 'Legal Person',
                dataIndex: 'type_person',
                key: 'type_person',
                filters: [
                    {
                        text: 'NATURAL PERSON',
                        value: 'NATURAL PERSON',
                    },
                    {
                        text: 'JURISTIC',
                        value: 'JURISTIC',
                    },
                ],
                onFilter: (value, record) => record.type_person.indexOf(value) === 0,
                sorter: (a, b) => a.type_person.length - b.type_person.length,
                sortDirections: ['descend'],
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.title.length + b.title.length,
                sortDirections: ['descend'],
            },
            {
                title: 'First Name',
                dataIndex: 'first_name',
                key: 'first_name',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.first_name.length - b.first_name.length,
                sortDirections: ['descend'],
            },
            {
                title: 'Last Name',
                dataIndex: 'last_name',
                key: 'last_name',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.last_name.length - b.last_name.length,
                sortDirections: ['descend']
            },
            {
                title: 'Country',
                dataIndex: 'country',
                key: 'country',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                filters: [
                    {
                        text: "Thailand",
                        value: "Thailand"
                    },
                    {
                        text: "Taiwan",
                        value: "Taiwan"
                    },
                    {
                        text: "China",
                        value: "China"
                    },
                    {
                        text: "Korea",
                        value: "Korea"
                    },
                    {
                        text: "Japan",
                        value: "Japan"
                    },
                ],
                onFilter: (value, record) => record.country.indexOf(value) === 0,
                sorter: (a, b) => a.country.length - b.country.length,
                sortDirections: ['descend'],
            },
            {
                title: 'Tel.',
                dataIndex: 'phone_number',
                key: 'phone_number',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.phone_number - b.phone_number,
                sortDirections: ['descend']
            },
            {
                title: 'Email Addresses',
                dataIndex: 'email',
                key: 'email',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.email.length - b.email.length,
                sortDirections: ['descend'],
            }
        ];

        return (
            <div className={styles.sitecard_borderless_wrapper}>
                <Card bordered={false} style={{ width: '100%' }}>
                    <Title level={3}>CUSTOMER MANAGEMENT</Title>
                    <div style={{ color: "#434343" }}>
                        <Row style={{ fontSize: "12px" }}>
                            <Col span={10}>
                                <Link exact to="/customer_form">
                                    {<Button style={{ width: '20%', background: '#1890ff' }}>
                                        <p style={{ fontSize: "12px", height: "auto", color: "white" }}>+ Add</p>
                                    </Button>}
                                </Link>
                            </Col>
                
                            <Col span={5} offset={9} style={{ textAlign: "right" }}>
                                <Space>
                                    <span style={{ display: "flex", paddingBottom: 5 }}>
                                        CUSTOMER
                                    </span>
                                    <Col span={10}>
                                    <AutoComplete
                                        dropdownClassName="certain-category-search-dropdown"
                                        dropdownMatchSelectWidth={20}
                                        style={{
                                            width: 150,
                                            bottom: 5
                                        }}
                                        options={options_customer}
                                        filterOption={(inputValue, option) =>
                                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                        value={this.state.select_customer}
                                        onChange={this.customer_auto_change}
                                    >
                                        <Input
                                        value = {this.state.select_customer}
                                            onChange = {this.InputSearchHandler}
                                            onSelect ={this.onClickSorter.bind(this,this.state.select_customer)}
                                        size="small" placeholder="input search text" />
                                    </AutoComplete>
                                    </Col>
                                </Space>
                            </Col>
                        </Row>
                        
                    </div>

                    <Divider type="horizontal"></Divider>
                    <Table size="small" pagination={false} columns={columns} dataSource={data_key} onChange={this.tableOnChange}></Table>
                </Card>
            </div >
        )
    }

}

export default Customer_List;