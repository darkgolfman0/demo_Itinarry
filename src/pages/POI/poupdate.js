import React from 'react'
import { Row, Col, Input, Menu, Dropdown, Button, Card, Divider, Table, message, Space, Typography, AutoComplete } from 'antd';
import { DownOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import './poi.module.css'
// search input
const { Search } = Input;
            // Typograpy Text
const { Title } = Typography
const axios = require ('axios');
class Poi_List extends React.Component {
    constructor(props) {
        super()
        axios({
            method: 'get',
            // url: 'http://localhost:5000/api/poi/',
            url: 'http://13.229.16.186:5000/api/poi/',
            // data: formData,
            // config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(async (response) => {
                //handle success
                // console.log('api response ==>', response.data)
                const response_api = await response.data
                return this.setState(
                    {
                        dataSource: response_api,
                        display_place: response_api,
                        item_place: response_api
                        
                    }
                )
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
        country: "All",
        type_poi: "All",
        dataSource: [],
        id: "",
        display_place: [],
        autocomplete_place: [],
        item_place: [],
        select_place:"",
    }
    tableOnChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    onclickUpdate = (event) => {
        console.log(event)
        console.log(this.props.history);
        this.props.history.push("/poi_formupdate/" + event)
      
    }

    value_type = ({ key }) => {
        this.setState({
            type_poi: key
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
    //Row Filtering 
    InputSearchHandler =async () => {
        await this.place_auto_change
    
            this.state.display_place = this.state.dataSource.filter(x => x.display_name.includes(this.state.select_place))
            this.setState({
                display_place:this.state.display_place
            })
        }
        
    place_auto_change =  (data) => {
            this.setState({
               select_place: data
           })
        }

        //Row Filtering of Searching Input Apace 
    onClickSorter = () => {
        // console.log('e :>> ', this.state.select_place) 
        // console.log('display :>> ', this.state.display_place) 
        this.state.display_place = this.state.dataSource.filter(x => x.display_name.includes(this.state.select_place))
            this.setState({
                display_place:this.state.display_place
            })
        }

    render() {
        
        //filtering state
        this.state.autocomplete_place = []
        this.state.item_place.forEach(place => {
            // console.log(place)
            this.state.autocomplete_place.push({
                "value" : place.display_name
            })
        });
        const options_place = this.state.autocomplete_place;
            
        const { display_place } = this.state
        const data = display_place.map(row => (
            // console.log(row._id)
            {
                action_id: row._id,
                display_name: row.display_name,
                type_poi: row.type_poi,
                address_1: row.address_1,
                city: row.city,
                country: row.country,
            }
        ))
        //table columns
        const columns = [
            {
                title: 'Action',
                key: 'action_id',
                dataIndex: "action_id",
                render: (data, record) =>
                    (
                        < Space size="small" >
                            <span value={data} onClick={() => this.onclickUpdate(data)} style={{ fontSize: "12px" }}><FormOutlined /></span>
                            {/* <span><FormOutlined /></span>
                        <span><FormOutlined /></span> */}
                        </Space >
                    ),

            },
            {
                title: 'Place',
                dataIndex: 'display_name',
                key: 'display_name',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => b.display_name.length - a.display_name.length,
                sortDirections: ['descend'],
            },
            {
                title: 'Type',
                dataIndex: 'type_poi',
                key: 'type_poi',
                filters: [
                    {
                        text: 'Attractions',
                        value: 'Attractions',
                    },
                    {
                        text: 'Restaurant',
                        value: 'Restaurant'
                    },
                    {
                        text: 'Shopping',
                        value: 'Shopping',
                    },
                    {
                        text: 'Beauty',
                        value: 'Beauty',
                    },
                    {
                        text: 'Entertainment',
                        value: 'Entertainment',
                    },
                ],
                
                onFilter: (value, record) => record.type_poi.indexOf(value) === 0,
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => b.type_poi.length - a.type_poi.length,
                sortDirections: ['descend'],
            },
            {
                title: 'Addresses',
                dataIndex: 'address_1',
                key: 'address_1',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.address_1.length - b.address_1.length,
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
                sortDirections: ['descend'],
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
                        text: 'Korea',
                        value: 'Korea',
                    },
                    {
                        text: 'Japan',
                        value: 'Japan',
                    },
                ],
                onFilter: (value, record) => record.country.indexOf(value) === 0,
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.country.length + b.country.length,
                sortDirections: ['descend'],
            }
            
        ];
           

        return (
            <div >
                <Card bordered={false} style={{ width: '100%' }}>
                    <Title style={{ color: '#434343' }} level={3}>POIN OF INTEREST (POI)</Title>
                    <div style={{ color: '#434343' }}>
                        <Row style={{ fontSize: "12px" }}>
                            <Col span={11}>
                                <Link exact to="/poi_formview">
                                    {<Button style={{ width: '20%', background: '#1890ff' }}>
                                        <p style={{ fontSize: "12px", height: "auto", color: "white" }}>+ Add</p>
                                    </Button>}
                                </Link>
                            </Col>
                            <Col span={4} style={{ textAlign: "right"}}>
                                <Space>
                                   
                                </Space>
                            </Col>
                            <Col span={4} style={{ textAlign: "right", right: "15px" }}>
                                <Space>
                                   
                                </Space>
                            </Col>
                            <Col span={5} style={{ textAlign: "right" }}>
                                <Space>
                                    <span style={{ display: "flex", paddingBottom: 5 }}>
                                        PLACE
                                    </span>
                                    <Col span={10}>
                                    <AutoComplete
                                        dropdownClassName="certain-category-search-dropdown"
                                        dropdownMatchSelectWidth={20}
                                        style={{
                                            width: 150,
                                            bottom: 5
                                        }}
                                        options={options_place}
                                        filterOption={(inputValue, option) =>
                                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                        value={this.state.select_place}
                                        onChange={this.place_auto_change}
                                    >
                                        <Input
                                        value = {this.state.select_placel}
                                            onChange = {this.InputSearchHandler}
                                            onSelect ={this.onClickSorter.bind(this,this.state.select_place)}
                                        size="small" placeholder="input search text" />
                                    </AutoComplete>
                                    </Col>
                                </Space>
                            </Col>
                        </Row>

                    </div>

                    <Divider type="horizontal"></Divider>
                    <Table onChange={this.tableOnChange} pagination={false} columns={columns} dataSource={data} size="small"></Table>
                </Card>
            </div >
        )
    }

}

export default Poi_List;