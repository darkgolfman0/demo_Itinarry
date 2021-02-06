import React, { useContext, useState, useEffect, useRef } from 'react'
import { Row, Col, Input, Dropdown, Button, Card, Divider, Table, Space, Typography, Form, Menu, message, Checkbox, AutoComplete} from 'antd';
import { DownOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import API from '../../../commons/backendApi'

import styles from '../../../App.css'


// Typograpy Text
const { Title } = Typography
// search input
const { Search } = Input;



function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
    }

class User_Profile extends React.Component {
    constructor(props) {
        super()
        
        API.get(`userprofile`).then(async(response) => {

            console.log('api response ==>', response.data)
            let 
                user_profile = response.data
                user_profile.map(el => {
                
                // let date = moment(new Date(el.date_of_birth))
                // el.date_of_birth = date.format(DATE_FORMAT)

            })
            console.log(response.data.active )
            return this.setState({ 
                dataSource: response.data,
                active : response.data.active,
                display_first_name: response.data,
                item_first_name: response.data,
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
        value_type: "Active",
        dataSource: [],
        display_first_name: [],
        autocomplete_first_name: [],
        item_first_name: [],
        select_first_name:"",
    };
    tableOnChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }
    onclickUpdate = (event) => {
        console.log(event)
        console.log(this.props.history);
        this.props.history.push("/user_profile_formupdate/" + event)
    };
    activestatusChange = (e) => {
        console.log(`checked = ${e.target.checked}`)
        this.setState({
            active: e.target.checked
        })
        // if (e.target.checked === false) {
        //     console.log('cheacked = false')
        // } else {
        //     console.log('cheacked = true')
        // }
    }

    //Row Filtering 
    InputSearchHandler =async () => {
        await this.first_name_auto_change
    
            this.state.display_first_name = this.state.dataSource.filter(x => x.display_name.includes(this.state.select_first_name))
            this.setState({
                display_first_name:this.state.display_first_name
            })
        }
        
    first_name_auto_change =  (data) => {
            this.setState({
               select_first_name: data
           })
        }

        //Row Filtering of Searching Input Apace 
    onClickSorter = () => {
        // console.log('e :>> ', this.state.select_first_name) 
        // console.log('display :>> ', this.state.display_first_name) 
        this.state.display_first_name = this.state.dataSource.filter(x => x.display_name.includes(this.state.select_first_name))
            this.setState({
                display_first_name:this.state.display_first_name
            })
        }

    

    render() {
        console.log(this.state)
        //filtering state
        this.state.autocomplete_first_name = []
        this.state.item_first_name.forEach(Name => {

            this.state.autocomplete_first_name.push({
                "value" : Name.display_name
            })
        });
        const options_first_name = this.state.autocomplete_first_name;


        const value_active = ({ key }) => {
            this.setState({
                value_type: key
            })
            console.log(key)
            message.info(`Click on item ${key}`);
        };
        
        const active_menu = (
            <Menu onClick={value_active}>
                <Menu.Item key='Active'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Active
                </span>
                </Menu.Item>
                <Menu.Item key="Inactive">
                    <span target="_blank" rel="noopener noreferrer" >
                        Inactive
                </span>
                </Menu.Item>
            </Menu>
        );


        const { display_first_name } = this.state
        const data_key = display_first_name.map(row => (
            {
                data_id: row._id,
                title: row.title,
                display_name: row.display_name,
                date_of_birth: row.date_of_birth,
                mobile: row.mobile,
                email: row.email,
                active: row.active,
                
            }
        ))
        console.log(this.state.active)

        //table columns
        const columns = [
            {
                title: 'Action',
                dataIndex: 'data_id',
                key: 'data_id',
                // render: (text, record) =>
                //     (
                //         < Space size="small" >
                //             <span style={{ fontSize: "12px" }}><FormOutlined /></span>
                //             {/* <a><FormOutlined /></a>
                // <a><FormOutlined /></a> */}
                //         </Space >
                //     )
                render: (data) =>
                    (
                        < Space size="small" >
                            <span value ={data} onClick ={() => this.onclickUpdate(data)} style={{ fontSize: "12px" }}><FormOutlined /></span>
                            {/* <a><FormOutlined /></a>
                <a><FormOutlined /></a> */}
                        </Space >
                    ),
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.title.length - b.title.length,
                sortDirections: ['descend'],
            },
            {
                title: 'Name',
                dataIndex: 'display_name',
                key: 'display_name',
                // width: "25%",
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.display_name.length - b.display_name.length,
                sortDirections: ['descend']
            },
            {
                title: 'Mobile',
                dataIndex: 'mobile',
                key: 'mobile',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.mobile.length - b.mobile.length,
                sortDirections: ['descend']
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>{text}</span>
                ),
                sorter: (a, b) => a.email - b.email,
                sortDirections: ['descend']
            },
            {
                title: 'Active',
                dataIndex: 'active',
                key: 'active',
             
                render: (data) => (
                    <span style={{ fontSize: "12px" }}>
                        <Checkbox 
                            checked = {data}
                            disabled = {true}
                            onChange={() => this.activestatusChange(data)}
                        >   
                            </Checkbox>
                    </span>
                ),
                sorter: (a, b) => a.active - b.active,
                sortDirections: ['descend'],
            }
            
        ];
       
       

        return (
            <div className={styles.sitecard_borderless_wrapper}>
                <Card bordered={false} style={{ width: '100%' }}>
                    <Title level={3}>USER PROFILE</Title>
                    <div style={{ color: "#434343" }}>
                        <Row style={{ fontSize: "12px" }}>
                            <Col span={11}>
                                <Link exact to="/user_profile_fromview">
                                    {<Button style={{ width: '20%', background: '#1890ff' }}>
                                        <p style={{ fontSize: "12px", height: "auto", color: "white" }}>+ Add</p>
                                    </Button>}
                                </Link>
                            </Col>
                            <Col span={4} offset={4} style={{ textAlign: "right" }}>
                                <Space>
                                    {/* <span style={{ textAlign: "center" }}>
                                        TYPE
                                    </span>
                                    <Dropdown overlay={active_menu} >
                                        <Button size={"small"} onClick={e => e.preventDefault()} style={{ fontSize: "12px", height: "auto", width: "auto", display: "flex" }} className="ant-dropdown-link" > {this.state.value_type}<DownOutlined /></Button>
                                    </Dropdown> */}
                                </Space>
                            </Col>
                            <Col span={5} style={{ textAlign: "right" }}>
                                <Space>
                                    <span style={{ display: "flex", paddingBottom: 5 }}>
                                        NAME
                                    </span>
                                    <Col span={10}>
                                    <AutoComplete
                                        dropdownClassName="certain-category-search-dropdown"
                                        dropdownMatchSelectWidth={20}
                                        style={{
                                            width: 150,
                                            bottom: 5
                                        }}
                                        options={options_first_name}
                                        filterOption={(inputValue, option) =>
                                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                        value={this.state.select_first_name}
                                        onChange={this.first_name_auto_change}
                                    >
                                        <Input
                                        value = {this.state.select_first_name}
                                            onChange = {this.InputSearchHandler}
                                            onSelect ={this.onClickSorter.bind(this,this.state.select_first_name)}
                                        size="small" placeholder="input search text" />
                                    </AutoComplete>
                                    </Col>
                                </Space>
                            </Col>
                        </Row>
                    </div>

                    <Divider type="horizontal"></Divider>
                    <Table size="small" rowClassName={() => 'editable-row'} pagination={false} columns={columns} dataSource={data_key} onChange={this.tableOnChange} ></Table>
                    {/* <Table size="small" components={components} rowClassName={() => 'editable-row'} pagination={false} columns={columns} dataSource={dataSource} onChange={this.tableOnChange}></Table> */}

                </Card>
            </div >
        )
    }

}

export default User_Profile;