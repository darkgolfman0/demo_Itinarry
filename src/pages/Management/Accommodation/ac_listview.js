import React from 'react'
import { Row, Col, Input, Menu, Dropdown, Button, Card, Divider, Table, message, Space, Typography, AutoComplete } from 'antd';
import { DownOutlined, FormOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom'

import styles from '../../../App.css'

// Typograpy Text
const { Title } = Typography
// search input
const { Search } = Input;
const axios = require('axios');
const { Column } = Table;

class Accomodation_List extends React.Component {
    constructor(props) {
        super()
        axios({
            method: 'get',
            // url: 'http://localhost:5000/api/accommodation/',
            url: 'http://13.229.16.186:5000/api/accommodation/',
            // data: formData,
            // config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(async (response) => {
                //handle success
                console.log('api response ==>', response.data)
                const response_api = await response.data
                return this.setState(
                    {
                        dataSource: response_api,
                        display_property: response_api,
                        item_property: response_api

                    }
                )
                // response.data.forEach(element => {
                //     console.log(element.document_id)
                //     this.setState({
                //         document_id: element.document_id
                //     })
                // });
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
        property_type: "All",
        country: "All",
        dataSource: [],
        id: "",
        dataSource: [],
        display_property: [],
        autocomplete_property: [],
        item_property: [],
        select_property:"",
    };
    tableOnChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    onclickUpdate = (event) => {
        console.log(event)
        console.log(this.props.history);
        this.props.history.push("/accom_formupdate/" + event)
    
    }
    //Row Filtering 
    InputSearchHandler =async () => {
        await this.property_auto_change
    
            this.state.display_property = this.state.dataSource.filter(x => x.first_name.includes(this.state.select_property))
            this.setState({
                display_property:this.state.display_property
            })
        }
        
    property_auto_change =  (data) => {
            this.setState({
               select_property: data
           })
        }

        //Row Filtering of Searching Input Apace 
    onClickSorter = () => {
        // console.log('e :>> ', this.state.select_property) 
        // console.log('display :>> ', this.state.display_property) 
        this.state.display_property = this.state.dataSource.filter(x => x.property_name.includes(this.state.select_property))
            this.setState({
                display_property:this.state.display_property
            })
        }

    render() {
        console.log({ 'state ===>': this.state })

        //filtering state
        this.state.autocomplete_property = []
        this.state.item_property.forEach(property => {
            // console.log(property)
            this.state.autocomplete_property.push({
                "value" : property.property_name
            })
        });
        const options_property = this.state.autocomplete_property;

        //dropdown type menu dropdown
        const value_type = ({ key }, property_type) => {
            this.setState({
                property_type: key
            })
            message.info(`Click on item ${key}`);
        };
        const type_menu = (
            <Menu onClick={value_type}>
                <Menu.Item key='All'>
                    <span target="_blank" rel="noopener noreferrer" >
                        All
                    </span>
                </Menu.Item>
                <Menu.Item key='hotel'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Hotel
                    </span>
                </Menu.Item>
                <Menu.Item key='apartments'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Apartments
                    </span>
                </Menu.Item>
                <Menu.Item key="guesthouses">
                    <span target="_blank" rel="noopener noreferrer" >
                        Guesthouses
                    </span>
                </Menu.Item>
                <Menu.Item key="resorts">
                    <span target="_blank" rel="noopener noreferrer">
                        Resorts
                    </span>
                </Menu.Item>
                <Menu.Item key="villas">
                    <span target="_blank" rel="noopener noreferrer" >
                        Villas
                    </span>
                </Menu.Item>
                <Menu.Item key="capsule_hotels">
                    <span target="_blank" rel="noopener noreferrer" >
                        Capsule Hotels
                    </span>
                </Menu.Item>
            </Menu>
        );

        //dropdown county menu  
        const value_county = ({ key }, country) => {
            this.setState({
                country: key
            })
            message.info(`Click on item ${key}`);
        };
        const county_menu = (
            <Menu onClick={value_county}>
                <Menu.Item key='All'>
                    <span target="_blank" rel="noopener noreferrer" >
                        All
                    </span>
                </Menu.Item>
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

        const { display_property } = this.state

        const data_key = display_property.map(row => (
            // console.log(row._id)
            {
                data_id: row._id,
                property_name: row.property_name,
                property_type: row.property_type,
                address1: row.address1,
                city: row.city,
                country: row.country,
            }
        ))

        //table columns
        const columns = [
            {
                title: 'Action',
                key: 'data_id',
                dataIndex: "data_id",
                render: (data, index) =>
                    (
                        <>
                            <span value={data} onClick={() => this.onclickUpdate(data)} style={{ fontSize: "12px" }}><FormOutlined /></span>
                        </>
                    )
            },
            {
                title: 'Property Name',
                dataIndex: 'property_name',
                key: 'property_name',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => b.property_name.length - a.property_name.length,
                sortDirections: ['descend'],
            },
            {
                title: 'Porperty Type',
                dataIndex: 'property_type',
                key: 'property_type',
                filters: [
                    {
                        text: 'Hotel',
                        value: 'Hotel',
                    },
                    {
                        text: 'Apartments',
                        value: 'Apartments'
                    },
                    {
                        text: 'Guesthouses',
                        value: 'Guesthouses',
                    },
                    {
                        text: 'Resorts',
                        value: 'Resorts'
                    },
                    {
                        text: 'Villas',
                        value: 'Villas',
                    },
                    {
                        text: 'Capsule_hotels',
                        value: 'Capsule_hotels'
                    },

                ],
                onFilter: (value, record) => record.property_type.indexOf(value) === 0,
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.property_type.length - b.property_type.length,
                sortDirections: ['descend'],
            },
            {
                title: 'Addresses',
                dataIndex: 'address1',
                key: 'address1',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.address1.length - b.address1.length,
                sortDirections: ['descend'],
            },
            {
                title: 'City',
                dataIndex: 'city',
                key: 'city',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.city.length - b.city.length,
                sortDirections: ['descend']
            },
            {
                title: 'Country',
                dataIndex: 'country',
                key: 'country',
                filters: [
                    {
                        text: 'Thailand',
                        value: 'Thailand',
                    },
                    {
                        text: 'Taiwan',
                        value: 'Taiwan'
                    },
                    {
                        text: 'China',
                        value: 'China',
                    },
                    {
                        text: 'resorts',
                        value: 'resorts'
                    },
                    {
                        text: 'Korea',
                        value: 'Korea',
                    },
                    {
                        text: 'Japan',
                        value: 'Japan'
                    },

                ],
                onFilter: (value, record) => record.country.indexOf(value) === 0,
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.country.length - b.country.length,
                sortDirections: ['descend'],
            },
        ];

        return (
            <div className={styles.sitecard_borderless_wrapper}>
                <Card bordered={false} style={{ width: '100%' }}>
                    <Title level={3}>ACCOMMODATION MANAGEMENT</Title>
                    <div style={{ color: "#434343" }}>
                        <Row style={{ fontSize: "12px" }}>
                            <Col span={4}>
                                <Link exact to="/accom_form">
                                    {<Button style={{ width: '101.92px', background: '#1890ff' }}>
                                        <p style={{ fontSize: "12px", height: "auto", color: "white" }}>+ Add</p>
                                    </Button>}
                                </Link>
                            </Col>
                            {/* <Col span={6} offset={3} style={{ textAlign: "center" }}>
                                <Space>
                                    <span>
                                        PROPERTY TYPE
                                    </span>
                                    <Dropdown overlay={type_menu}>
                                        <Button size={"small"} onClick={e => e.preventDefault()} style={{ fontSize: "12px", height: "auto", width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.property_type}<DownOutlined /></Button>
                                    </Dropdown>
                                </Space>
                            </Col>
                            <Col span={4}>
                                <Space>
                                    <span>
                                        COUNTRY
                                    </span>
                                    <Dropdown overlay={county_menu} >
                                        <Button size={"small"} onClick={e => e.preventDefault()} style={{ fontSize: "12px", height: "auto", width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.country}<DownOutlined /></Button>
                                    </Dropdown>
                                </Space>
                            </Col> */}
                            <Col span={7} offset={13} style={{ textAlign: "right" }}>
                                <Space>
                                    <span style={{ display: "flex", paddingBottom: 5 }}>
                                        PROPERTY NAME
                                    </span>
                                    <Col span={10}>
                                    <AutoComplete
                                        dropdownClassName="certain-category-search-dropdown"
                                        dropdownMatchSelectWidth={20}
                                        style={{
                                            width: 150,
                                            bottom: 5
                                        }}
                                        options={options_property}
                                        filterOption={(inputValue, option) =>
                                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                        value={this.state.select_property}
                                        onChange={this.property_auto_change}
                                    >
                                        <Input
                                        value = {this.state.select_property}
                                            onChange = {this.InputSearchHandler}
                                            onSelect ={this.onClickSorter.bind(this,this.state.select_property)}
                                        size="small" placeholder="input search text" />
                                    </AutoComplete>
                                    </Col>
                                </Space>
                            </Col>
                        </Row>
                    </div>
                    <Divider type="horizontal"></Divider>

                    <Table size="small" pagination={false} columns={columns} dataSource={data_key} onChange={this.tableOnChange}></Table>

                    {/* <Table size="small" pagination={false} dataSource={data_key} onChange={this.tableOnChange}>
                        <Column title="Action" dataIndex="data_id" key="data_id"
                            render={(data, index) => (
                                <>
                                    < span style={{ fontSize: "12px" }} value={data} onClick={() => this.onclickUpdate(data)}>
                                        <FormOutlined />
                                    </span>
                                </>
                            )}
                        />
                    </Table> */}



                </Card>
            </div >
        )
    }

}

export default Accomodation_List;