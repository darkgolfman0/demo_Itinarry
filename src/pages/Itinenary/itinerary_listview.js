
import React from 'react'
import { Row, Col, Input, Menu, Dropdown, Button, Card, Divider, Table, message, Space, Typography } from 'antd';
import { DownOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format';

import styles from '../../App.css'
const axios = require('axios');

// Typograpy Text
const { Title } = Typography
// search input
const { Search } = Input;

class Itinerary_List extends React.Component {
    constructor(props) {
        super()
        axios({
            method: 'get',
            // url: 'http://localhost:5000/api/itinerary',
            url: 'http://13.229.16.186:5000/api/itinerary/',
            // data: formData,
            // config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(async (response) => {
                //handle success
                console.log('api response ==>', response.data)
                const response_api = await response.data
                this.setState(
                    {
                        dataSource: response_api
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
            });
    }
    state = {
        status: "All",
        status_table: "New",
        document_id: "",
        // country: "All",
        dataSource: []
    };

    tableOnChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    value_status_table = async ({ key }, status) => {
        await this.setState({
            status_table: key
        })
        if (this.state.status_table === "Completed") {
            const { dataSource } = this.state
            dataSource.map(res => {
                console.log(res)
            })
            // console.log(this.state.dataSource)
        }
        message.info(`Click on item ${key}`);
    };

    onclickUpdate = (event) => {
        this.props.history.push("/itinerary_formupdate/" + event)
    }
    render() {
        const value_status = ({ key }, status) => {
            this.setState({
                status: key
            })
            message.info(`Click on item ${key}`);
        };
        const status_menu = (
            <Menu onClick={value_status}>
                <Menu.Item key='All'>
                    <span target="_blank" rel="noopener noreferrer" >
                        All
                    </span>
                </Menu.Item>
                <Menu.Item key='New'>
                    <span target="_blank" rel="noopener noreferrer" >
                        New
                    </span>
                </Menu.Item>
                <Menu.Item key='Completed'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Completed
                    </span>
                </Menu.Item>
                <Menu.Item key="Lost">
                    <span target="_blank" rel="noopener noreferrer" >
                        Lost
                    </span>
                </Menu.Item>
            </Menu>
        );
        //dropdown menu dropdown
        const status_table_menu = (
            <Menu onClick={this.value_status_table}>
                <Menu.Item key='New'>
                    <span target="_blank" rel="noopener noreferrer" >
                        New
                    </span>
                </Menu.Item>
                <Menu.Item key='Completed'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Completed
                    </span>
                </Menu.Item>
                <Menu.Item key="Lost">
                    <span target="_blank" rel="noopener noreferrer" >
                        Lost
                    </span>
                </Menu.Item>
            </Menu>
        );
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
                        </Space >
                    )
            },
            {
                title: 'Document ID',
                dataIndex: 'document_id',
                key: 'document_id',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => b.document_id.length + a.document_id.length,
                sortDirections: ['descend'],
            },
            {
                title: 'Customer',
                dataIndex: 'customer',
                key: 'customer',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.customer.length + b.customer.length,
                sortDirections: ['descend'],
            },
            {
                title: 'Passengers',
                dataIndex: 'passengers',
                key: 'passengers',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.passengers + b.passengers,
                sortDirections: ['descend'],
            },
            {
                title: 'Total Price',
                dataIndex: 'total_price',
                key: 'total_price',
                render: (text) => (
                    <NumberFormat value={text} displayType={'text'} thousandSeparator={true} style={{ fontSize: "12px" }}>{text}</NumberFormat>
                    // <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.total_price + b.total_price,
                sortDirections: ['descend']
            },
            {
                title: 'Additional Cost',
                dataIndex: 'additional_cost',
                key: 'additional_cost',
                render: (text) => (
                    <NumberFormat value={text} displayType={'text'} thousandSeparator={true} style={{ fontSize: "12px" }}>{text}</NumberFormat>
                    // <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => b.addtitional,
                sortDirections: ['descend']
            },
            {
                title: 'Total Cost',
                dataIndex: 'total_cost',
                key: 'total_cost',
                render: (text) => (
                    <NumberFormat value={text} displayType={'text'} thousandSeparator={true} style={{ fontSize: "12px" }}>{text}</NumberFormat>
                    // <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => b.total_cost,
                sortDirections: ['descend']
            },
            {
                title: 'Mark UP Margin(%)',
                dataIndex: 'markup_margin',
                key: 'markup_margin',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => b.mark_up,
                sortDirections: ['descend'],
            },
            {
                title: 'Summary',
                dataIndex: 'summary',
                key: 'summary',
                render: (text) => (
                    <NumberFormat value={text} displayType={'text'} thousandSeparator={true} style={{ fontSize: "12px" }}>{text}</NumberFormat>
                    // <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => b.summary,
                sortDirections: ['descend']
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (text) => (
                    <>
                        <Dropdown overlay={status_table_menu}>
                            <Button size={"small"} style={{ fontSize: "12px", width: "auto", display: "flex" }} >{this.state.status_table}<DownOutlined /></Button>
                        </Dropdown>
                    </>
                ),
                sorter: (a, b) => a.status,
                sortDirections: ['descend']
            },
        ];
        const { dataSource } = this.state
        const data_key = dataSource.map(row => (
            // console.log(row._id)
            {
                data_id: row._id,
                document_id: row.document_id,
                customer: row.customer,
                passengers: row.passenger_adult + row.passenger_child + row.passenger_infant,
                total_price: row.total_price,
                additional_cost: row.addition_cost,
                total_cost: row.total_cost,
                markup_margin: row.markup_margin,
                summary: row.review_summary,
                status: row.status
            }
        ))
        return (
            <div className={styles.sitecard_borderless_wrapper}>
                <Card bordered={false} style={{ width: '100%' }}>
                    <Title level={3}>ITINERARY MANAGEMENT</Title>
                    <div style={{ color: "#434343" }}>
                        <Row style={{ fontSize: "12px" }}>
                            <Col span={6}>
                                <Link exact to="/itinerary_form">
                                    {<Button style={{ width: '101.92px', background: '#1890ff' }}>
                                        <p style={{ fontSize: "12px", height: "auto", color: "white" }}>+ Add</p>
                                    </Button>}
                                </Link>
                            </Col>
                            {/* <Col span={6} offset={2} style={{ textAlign: "right", left: "9em" }}>
                                <Space>
                                    <span>
                                        STATUS
                                    </span>
                                    <Dropdown overlay={status_menu}>
                                        <Button size={"small"} onClick={e => e.preventDefault()} style={{ fontSize: "12px", height: "auto", width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.status}<DownOutlined /></Button>
                                    </Dropdown>
                                </Space>
                            </Col> */}
                            <Col span={8} offset={10} style={{ textAlign: "right" }}>
                                <Space>
                                    <span style={{ display: "flex", paddingBottom: 5 }}>
                                        DOCUMENT ID
                                    </span>
                                    <Search
                                        placeholder="input search text"
                                        onSearch={value => console.log(value)}
                                        style={{ fontSize: "12px", height: "auto", width: 'auto' }}
                                        size='small'
                                    />
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

export default Itinerary_List;