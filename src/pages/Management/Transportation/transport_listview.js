import React, { useState, useEffect, useRef } from 'react'
import { Row, Col, Input, Menu, Dropdown, Button, Card, Divider, Table, message, Space, Typography, AutoComplete } from 'antd';
import { DownOutlined, FormOutlined } from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom'
import styles from '../../../App.css'

// Typograpy Text
const { Title } = Typography
// search input
const { Search } = Input;
const axios = require('axios');
class Transport_Listview extends React.Component {
    constructor(props) {
        super()
        axios({
            method: 'get',
            // url: 'http://localhost:5000/api/transportation',
            url: 'http://13.229.16.186:5000/api/transportation',

        })
            .then((response) => {

                return this.setState({ 
                    display_car_model: response.data,
                    dataSource: response.data,
                    item_CarModel: response.data
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
        display_car_model: [],
        car_class_type: "All",
        transmission: "All",
        dataSource: [],
        autocomplete_CarModel: [],
        item_CarModel: [],
        select_carModel: "",

    };

    
    tableOnChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    onclickUpdate = (event) => {
        console.log(event)
        console.log(this.props.history);
        this.props.history.push("/transport_formupdate/" + event)
    }
    //Row Filtering 
    InputSearchHandler =async () => {
    await this.carmodel_auto_change

        this.state.display_car_model = this.state.dataSource.filter(x => x.car_model.includes(this.state.select_carModel))
        this.setState({
            display_car_model:this.state.display_car_model
        })
    }
    
    carmodel_auto_change =  (data) => {
        this.setState({
           select_carModel: data
       })
   }
    //Row Filtering of Searching Input Apace 
    onClickSorter = () => {
    // console.log('e :>> ', this.state.select_carModel) 
    // console.log('display :>> ', this.state.display_car_model) 
    this.state.display_car_model = this.state.dataSource.filter(x => x.car_model.includes(this.state.select_carModel))
    this.setState({
        display_car_model:this.state.display_car_model
    })
    }
   
    render() {
        //filtering state
        this.state.autocomplete_CarModel = []
        this.state.item_CarModel.forEach(CarModel => {
            // console.log(CarModel)
            this.state.autocomplete_CarModel.push({
                "value" : CarModel.car_model
            })
        });
        const options_carmodel = this.state.autocomplete_CarModel;

        //data calling
        const { display_car_model } = this.state
        const data_key = display_car_model.map(row => (
            {
                data_id: row._id,
                car_model: row.car_model,
                car_class: row.car_class,
                transmission: row.transmission,
                passenger: row.passenger,
                suitcase: row.suitcase,
                price: row.price,
                capacity: row.capacity,
                capacity: row.capacity,
                car_seat: row.car_seat,
                remarks: row.remarks
            }
        ))

        //table columns
        const columns = [
            {
                title: 'Action',
                dataIndex: 'data_id',
                key: 'data_id',
                render: (data) =>
                    (
                        < Space size="small" >
                            <span value={data} onClick={() => this.onclickUpdate(data)} style={{ fontSize: "12px" }}><FormOutlined /></span>
                        </Space >
                    )
            },
            {
                title: 'Car Model',
                dataIndex: 'car_model',
                key: 'car_model',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.car_model.length - b.car_model.length,
                sortDirections: ['descend'],
            },
            {
                title: 'Class',
                dataIndex: 'car_class',
                key: 'car_class',
                filters: [
                    {
                        text: 'SUVs',
                        value: 'SUVs',
                    },
                    {
                        text: 'Small cars',
                        value: 'Small cars'
                    },
                    {
                        text: 'Medium cars',
                        value: 'Medium cars',
                    },
                    {
                        text: 'Premium cars',
                        value: 'Premium cars',
                    },
                ],
                onFilter: (value, record) => record.car_class.indexOf(value) === 0,
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.car_class.length - b.car_class.length,
                sortDirections: ['descend'],
            },
            {
                title: 'Transmission',
                dataIndex: 'transmission',
                key: 'transmission',
                filters: [
                    {
                        text: 'Automatic',
                        value: 'Automatic',
                    },
                    {
                        text: 'Manual',
                        value: 'Manual'
                    },
                ],
                onFilter: (value, record) => record.transmission.indexOf(value) === 0,
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.transmission.length - b.transmission.length,
                sortDirections: ['descend'],
            },
            {
                title: 'Passenger Capacity',
                dataIndex: 'passenger',
                key: 'passenger',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => b.passenger - a.passenger,
                sortDirections: ['descend']
            },
            {
                title: 'Suitclass Capacity',
                dataIndex: 'suitcase',
                key: 'suitcase',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => b.suitcase - a.suitcase,
                sortDirections: ['descend']
            },
            {
                title: 'Price per day',
                dataIndex: 'price',
                key: 'price',
                render: (text) => (
                    <NumberFormat value={text} displayType={'text'} thousandSeparator={true}  style={{ fontSize: "12px" }}>{text}</NumberFormat >

                ),
                sorter: (a, b) => b.price - a.price,
                sortDirections: ['descend'],
            },
        ];
        return (
            <div className={styles.sitecard_borderless_wrapper}>
                <Card bordered={false} style={{ width: '100%' }}>
                    <Title level={3}>TRANSPORTATION MANAGEMENT</Title>
                    <div style={{ color: "#434343" }}>
                        <Row style={{ fontSize: "12px" }}>
                            <Col span={5}>
                                <Link exact to="/transport_form">
                                    {<Button style={{ width: '101.92px', background: '#1890ff' }}>
                                        <p style={{ fontSize: "12px", height: "auto", color: "white" }}>+ Add</p>
                                    </Button>}
                                </Link>
                            </Col>
                            <Col span={4} offset={5} style={{ textAlign: "center" }}>
                             
                            </Col>
                            <Col span={2}>
                            </Col>
                            <Col span={6} offset={2}>
                                <Space>
                                    <span style={{ display: "flex", paddingBottom: 5 }}>
                                        CAR MODEL
                                    </span>
                                    <Col span={10}>
                                    <AutoComplete
              
                                        dropdownClassName="certain-category-search-dropdown"
                                        dropdownMatchSelectWidth={20}
          
                                        style={{
                                            width: 150,
                                            bottom: 5
                                        }}
                                        options={options_carmodel}
                                        filterOption={(inputValue, option) =>
                                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                        value={this.state.select_carModel}
                                        onChange={this.carmodel_auto_change}
                                    >
                                        <Input
                                        value = {this.state.select_carModel}
                                            onChange = {this.InputSearchHandler}
                                            onSelect ={this.onClickSorter.bind(this,this.state.select_carModel)}
                                        size="small" placeholder="input search text" />
                                    </AutoComplete>
                                    </Col>
                        
                                </Space>
                            </Col>
                        </Row>
                    </div>

                    <Divider type="horizontal"></Divider>
                    <Table size="small" pagination={false} columns={columns} dataSource={data_key} onChange={this.tableOnChange} allowFiltering = {true}></Table>
                </Card>
            </div >
        )
    }

}

export default Transport_Listview;