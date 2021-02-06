import React, { Component } from 'react'
import { Checkbox, Row, Col, Button, Card, Typography, Input, message, Menu, Dropdown, Space, TimePicker, InputNumber } from 'antd';
import { DownOutlined, PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

// import styles from '../App.css'
import "react-datetime/css/react-datetime.css";

//global class element
const { Text } = Typography
const { TextArea } = Input;
const format = 'HH:mm';
const { Search } = Input;
const { Meta } = Card;



class ModalPOI extends React.Component {
    constructor(props) {
        super()
        this.state = {
            poi_data: {
                name: "",
                note: "",
                adult: 0,
                child: 0,
                infant: 0,
                checkAll: true,
                indeterminate: true,
                check_option: []
            },
            check_option: [],
            pass_state: "hello"
        };
    }


    onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
        // const check_option = this.state
        this.setState({
            check_option: checkedValues
        })
    }

    handleInputChange = (event) => {
        const target = event.target;
        const { name, value } = target
        this.setState({
            poi_data: { [name]: value }
        });
    }

    save_poi = pass_state => {
        this.setState({
            pass_state
        })
    }

    render() {
        console.log(this.state)
        //dropdown
        const value_adult = ({ key }, adult) => {
            this.setState({
                poi_data: { adult: key }
            })
            message.info(`Click on item ${key}`);
        };
        const adult_menu = (
            <Menu onClick={value_adult}>
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
                <Menu.Item key='2'>
                    <span target="_blank" rel="noopener noreferrer" >
                        2
                            </span>
                </Menu.Item>
                <Menu.Item key='3'>
                    <span target="_blank" rel="noopener noreferrer" >
                        3
                            </span>
                </Menu.Item>
                <Menu.Item key='4'>
                    <span target="_blank" rel="noopener noreferrer" >
                        4
                            </span>
                </Menu.Item>
                <Menu.Item key='5'>
                    <span target="_blank" rel="noopener noreferrer" >
                        5
                            </span>
                </Menu.Item>
            </Menu>
        );

        //dropdown
        const value_child = ({ key }, child) => {
            this.setState({
                poi_data: { child: key }
            })
            message.info(`Click on item ${key}`);
        };
        const child_menu = (
            <Menu onClick={value_child}>
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
                <Menu.Item key='2'>
                    <span target="_blank" rel="noopener noreferrer" >
                        2
                                    </span>
                </Menu.Item>
                <Menu.Item key='3'>
                    <span target="_blank" rel="noopener noreferrer" >
                        3
                                    </span>
                </Menu.Item>
                <Menu.Item key='4'>
                    <span target="_blank" rel="noopener noreferrer" >
                        4
                                    </span>
                </Menu.Item>
                <Menu.Item key='5'>
                    <span target="_blank" rel="noopener noreferrer" >
                        5
                                    </span>
                </Menu.Item>
            </Menu>
        );

        //dropdown
        const value_infant = ({ key }, infant) => {
            this.setState({
                poi_data: { infant: key }
            })
            message.info(`Click on item ${key}`);
        };
        const infant_menu = (
            <Menu onClick={value_infant}>
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
                <Menu.Item key='2'>
                    <span target="_blank" rel="noopener noreferrer" >
                        2
                                            </span>
                </Menu.Item>
                <Menu.Item key='3'>
                    <span target="_blank" rel="noopener noreferrer" >
                        3
                                            </span>
                </Menu.Item>
                <Menu.Item key='4'>
                    <span target="_blank" rel="noopener noreferrer" >
                        4
                                            </span>
                </Menu.Item>
                <Menu.Item key='5'>
                    <span target="_blank" rel="noopener noreferrer" >
                        5
                                            </span>
                </Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Card bordered={false} style={{ paddingBottom: "0px", paddingTop: "0px" }}>
                    <div style={{ fontSize: "12px" }}>
                        {/* Col 24 */}
                        <div>
                            <Checkbox.Group onChange={this.onChange}>
                                <Row style={{ height: "0" }}>
                                    <Col span={8}>
                                        <Checkbox value="ATTRACTION">ATTRACTION</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="RESTAURANT">RESTAURANT</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="SHOPPING">SHOPPING</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="BEAUTY & SPA">BEAUTY & SPA</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="ENTERTAINMENT">ENTERTAINMENT</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="EXPERIENCE">EXPERIENCE</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                            <Row>
                                <Col span={6} offset={14} style={{ bottom: "2em" }}>
                                    <Space>
                                        <Search
                                            placeholder="input search text"
                                            onSearch={value => console.log(value)}
                                            style={{ fontSize: "12px", height: "auto", width: 'auto' }}
                                            size='small'
                                        />
                                        <Button size={"small"} icon={<PlusCircleOutlined style={{ color: "white", marginTop: "-5px", marginLeft: "-4px", fontSize: "13px" }} />} style={{ width: "20px", height: "20px", background: '#1890ff' }}></Button>
                                    </Space>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={11}>
                                    <Search
                                        placeholder="input search text"
                                        onSearch={value => console.log(value)}
                                        style={{ fontSize: "12px", height: "auto" }}
                                        size='small'
                                    />
                                </Col>
                                <Col span={2} offset={3} style={{ bottom: "3.5em" }}>
                                    <Text>TIME</Text>
                                </Col>
                                <Col span={6} style={{ bottom: "3.5em" }}>
                                    <TimePicker
                                        size={"small"}
                                        defaultValue={moment('00:00', format)}
                                        format={format}
                                        style={{ width: "80px" }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={1} >
                                    <Card
                                        style={{ width: 200, height: "auto" }}
                                        cover={
                                            <img
                                                alt="example"
                                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                            />
                                        }
                                        actions={[
                                            "Detail",
                                            "Select"
                                            // <SettingOutlined key="setting" />,
                                            // <EditOutlined key="edit" />,
                                            // <EllipsisOutlined key="ellipsis" />,
                                        ]}
                                    >
                                        <Meta
                                            // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title="Card title"
                                            description="This is the description"
                                        />
                                    </Card>
                                </Col>
                                <Col span={1} offset={6}>
                                    <Card
                                        style={{ width: 200, height: "auto" }}
                                        cover={
                                            <img
                                                alt="example"
                                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                            />
                                        }
                                        actions={[
                                            "Detail",
                                            "Select"
                                            // <SettingOutlined key="setting" />,
                                            // <EditOutlined key="edit" />,
                                            // <EllipsisOutlined key="ellipsis" />,
                                        ]}
                                    >
                                        <Meta
                                            // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title="Card title"
                                            description="This is the description"
                                        />
                                    </Card>
                                </Col>
                                <Col span={10} offset={6} style={{ bottom: "3em" }}>
                                    <Text strong>TICKETS AND PRICE:</Text>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={1} >
                                    <Card
                                        style={{ width: 200, height: "auto" }}
                                        cover={
                                            <img
                                                alt="example"
                                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                            />
                                        }
                                        actions={[
                                            "Detail",
                                            "Select"
                                            // <SettingOutlined key="setting" />,
                                            // <EditOutlined key="edit" />,
                                            // <EllipsisOutlined key="ellipsis" />,
                                        ]}
                                    >
                                        <Meta
                                            // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title="Card title"
                                            description="This is the description"
                                        />
                                    </Card>
                                </Col>
                                <Col span={1} offset={6}>
                                    <Card
                                        style={{ width: 200, height: "auto" }}
                                        cover={
                                            <img
                                                alt="example"
                                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                            />
                                        }
                                        actions={[
                                            "Detail",
                                            "Select"
                                            // <SettingOutlined key="setting" />,
                                            // <EditOutlined key="edit" />,
                                            // <EllipsisOutlined key="ellipsis" />,
                                        ]}
                                    >
                                        <Meta
                                            // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title="Card title"
                                            description="This is the description"
                                        />
                                    </Card>
                                </Col>
                                <Col span={2} offset={6} style={{ bottom: "24.5em" }}>
                                    <Text>ADULT(12+)</Text>
                                </Col>
                                <Col span={7} offset={1} style={{ bottom: "24.5em" }}>
                                    <Space>
                                        <InputNumber

                                            size={"small"}
                                            defaultValue={0}
                                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                            // formatter={currencyFormatter(this.state.currency)}
                                            // parser={currencyParser}
                                            onChange={this.onChangePrice}
                                        />
                                        <Text>x</Text>
                                        <Dropdown overlay={adult_menu}>
                                            <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.adult}<DownOutlined /></Button>
                                        </Dropdown>
                                        <Text>=</Text>
                                        <div>
                                            <InputNumber
                                                size={"small"}
                                                defaultValue={0}
                                                formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                                // formatter={currencyFormatter(this.state.currency)}
                                                // parser={currencyParser}
                                                onChange={this.onChangePrice}
                                            />
                                        </div>
                                    </Space>
                                </Col>
                            </Row>
                            <Row style={{ height: "0px" }}>
                                <Col span={3} offset={14} style={{ bottom: "44em" }}>
                                    <Text>CHILD(4-11)</Text>
                                </Col>
                                <Col span={7} style={{ bottom: "44em" }}>
                                    <Space>
                                        <InputNumber
                                            size={"small"}
                                            defaultValue={0}
                                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                            // formatter={currencyFormatter(this.state.currency)}
                                            // parser={currencyParser}
                                            onChange={this.onChangePrice}
                                        />
                                        <Text>x</Text>
                                        <Dropdown overlay={child_menu}>
                                            <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.adult}<DownOutlined /></Button>
                                        </Dropdown>
                                        <Text>=</Text>
                                        <div>
                                            <InputNumber
                                                size={"small"}
                                                defaultValue={0}
                                                formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                                // formatter={currencyFormatter(this.state.currency)}
                                                // parser={currencyParser}
                                                onChange={this.onChangePrice}
                                            />
                                        </div>

                                    </Space>
                                </Col>
                            </Row>
                            <Row style={{ height: "0px" }}>
                                <Col span={3} offset={14} style={{ bottom: "41.5em" }}>
                                    <Text>INFANT(below2)</Text>
                                </Col>
                                <Col span={7} style={{ bottom: "41.5em" }}>
                                    <Space>
                                        <InputNumber
                                            size={"small"}
                                            defaultValue={0}
                                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                            // formatter={currencyFormatter(this.state.currency)}
                                            // parser={currencyParser}
                                            onChange={this.onChangePrice}
                                        />
                                        <Text>x</Text>
                                        <Dropdown overlay={infant_menu}>
                                            <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.adult}<DownOutlined /></Button>
                                        </Dropdown>
                                        <Text>=</Text>
                                        <div>
                                            <InputNumber
                                                size={"small"}
                                                defaultValue={0}
                                                formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                                // formatter={currencyFormatter(this.state.currency)}
                                                // parser={currencyParser}
                                                onChange={this.onChangePrice}
                                            />
                                        </div>
                                    </Space>
                                </Col>
                            </Row>
                            <Row style={{ height: "0px" }}>
                                <Col span={4} offset={20} style={{ bottom: "39em", right: "7px" }}>
                                    <Space>
                                        <Text strong>TOTAL</Text>
                                        <div >
                                            <InputNumber
                                                size={"small"}
                                                defaultValue={0}
                                                formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                                // formatter={currencyFormatter(this.state.currency)}
                                                // parser={currencyParser}
                                                onChange={this.onChangePrice}
                                            />
                                        </div>

                                    </Space>
                                </Col>
                            </Row>
                            <Row style={{ height: "0px" }}>
                                <Col span={10} offset={14} style={{ bottom: "36.5em" }}>
                                    <TextArea
                                        name="note"
                                        placeholder="Additional notes ..."
                                        value={this.state.poi_data.note}
                                        // value={this.props.name}
                                        onChange={this.handleInputChange}
                                        style={{ height: "auto", width: "100%" }}
                                        rows={10}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ height: "0px" }}>
                                <Col span={10} offset={14} style={{ textAlign: "-webkit-right", bottom: "21em" }}>
                                    <Button style={{ display: 'flex', background: '#1890ff' }} onSubmit={this.save_poi}>
                                        <p style={{ color: "white", position: "inherit" }}>Save</p>
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card>
            </div >
        )
    }
}
export default ModalPOI;