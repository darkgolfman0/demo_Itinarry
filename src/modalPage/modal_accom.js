import React from 'react'
import { Checkbox, Row, Col, Button, Card, Typography, Input, message, Menu, Dropdown, Space, TimePicker, InputNumber } from 'antd';
import { DownOutlined, PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

import styles from '../App.css'
import "react-datetime/css/react-datetime.css";

//global class element
const { Text } = Typography
const { TextArea } = Input;
const format = 'HH:mm';
// const { TabPane } = Tabs;
const { Search } = Input;
const { Meta } = Card;



class ModalAccom extends React.Component {
    state = {
        name: "",
        note: "",
        checkin: "DAY 1",
        checkout: "DAY 1",
        roomtype: "Panoramic Executive Suite 2+1",
        room: 1,
        infant: 0,
        checkAll: true,
        indeterminate: true,
    };

    onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const { name, value } = target
        this.setState({
            [name]: value
        });
    }

    render() {
        console.log(this.state)
        const option1 = [
            { label: 'HOTEL', value: 'HOTEL' },
        ];
        const option2 = [
            { label: 'APARTMENTS', value: 'APARTMENTS' },
        ];
        const option3 = [
            { label: 'GUESTHOUSES', value: 'GUESTHOUSES' },
        ]
        const option4 = [
            { label: 'RESORTS', value: 'RESORTS' },
        ]
        const option5 = [
            { label: 'VILLAS', value: 'VILLAS' },
        ]
        const option6 = [
            { label: 'CAPSULE HOTELS', value: 'CAPSULE HOTELS' },
        ]

        //dropdown
        const value_room = ({ key }, room) => {
            this.setState({
                adult: key
            })
            message.info(`Click on item ${key}`);
        };
        const room_menu = (
            <Menu onClick={value_room}>
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
        const value_roomtype = ({ key }, roomtype) => {
            this.setState({
                roomtype: key
            })
            message.info(`Click on item ${key}`);
        };
        const roomtype_menu = (
            <Menu onClick={value_roomtype}>
                <Menu.Item key='King Family Rever View 2+1'>
                    <span target="_blank" rel="noopener noreferrer" >
                        King Family Rever View 2+1
                    </span>
                </Menu.Item>
                <Menu.Item key='King Family Rever View 3'>
                    <span target="_blank" rel="noopener noreferrer" >
                        King Family Rever View 3
                    </span>
                </Menu.Item>
                <Menu.Item key='Familu Suite 2+1'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Familu Suite 2+1
                    </span>
                </Menu.Item>
                <Menu.Item key='Panoramic Executive Suite 2+1'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Panoramic Executive Suite 2+1
                    </span>
                </Menu.Item>
            </Menu>
        );

        //dropdown
        const value_checkin = ({ key }, checkin) => {
            this.setState({
                checkin: key
            })
            message.info(`Click on item ${key}`);
        };
        const checkin_menu = (
            <Menu onClick={value_checkin}>
                <Menu.Item key='DAY 1'>
                    <span target="_blank" rel="noopener noreferrer" >
                        DAY 1
                    </span>
                </Menu.Item>
                <Menu.Item key='DAY 2'>
                    <span target="_blank" rel="noopener noreferrer" >
                        DAY 2
                    </span>
                </Menu.Item>
                <Menu.Item key='DAY 3'>
                    <span target="_blank" rel="noopener noreferrer" >
                        DAY 3
                    </span>
                </Menu.Item>
            </Menu>
        );

        //dropdown
        const value_checkout = ({ key }, checkout) => {
            this.setState({
                checkout: key
            })
            message.info(`Click on item ${key}`);
        };
        const checkout_menu = (
            <Menu onClick={value_checkout}>
                <Menu.Item key='DAY 1'>
                    <span target="_blank" rel="noopener noreferrer" >
                        DAY 1
                            </span>
                </Menu.Item>
                <Menu.Item key='DAY 2'>
                    <span target="_blank" rel="noopener noreferrer" >
                        DAY 2
                            </span>
                </Menu.Item>
                <Menu.Item key='DAY 3'>
                    <span target="_blank" rel="noopener noreferrer" >
                        DAY 3
                            </span>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className={styles.sitecard_borderless_wrapper}>
                <Card bordered={false}>
                    <div style={{ fontSize: "12px" }}>
                        {/* Col 24 */}
                        <div>
                            <Row>
                                <Col span={4}>
                                    <Checkbox.Group options={option1} onChange={this.onChange} />
                                </Col>
                                <Col span={4}>
                                    <Checkbox.Group options={option2} onChange={this.onChange} />
                                </Col>
                                <Col span={4}>
                                    <Checkbox.Group options={option3} onChange={this.onChange} />
                                </Col>
                                <Col span={3} offset={2}>
                                    <Text>PROPERTY NAME</Text>
                                </Col>
                                <Col span={6}>
                                    <Space>
                                        <Search
                                            placeholder="input search text"
                                            onSearch={value => console.log(value)}
                                            style={{ fontSize: "12px", height: "auto", width: 'auto' }}
                                            size='small'
                                        />
                                        <Button tabIndex={2} size={"small"} icon={<PlusCircleOutlined style={{ color: "white", marginTop: "-5px", marginLeft: "-4px", fontSize: "13px" }} />} style={{ width: "20px", height: "20px", background: '#1890ff' }}></Button>
                                    </Space>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={4}>
                                    <Checkbox.Group options={option4} onChange={this.onChange} />
                                </Col>
                                <Col span={4}>
                                    <Checkbox.Group options={option5} onChange={this.onChange} />
                                </Col>
                                <Col span={16}>
                                    <Checkbox.Group options={option6} onChange={this.onChange} />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={12} >
                                    <Search
                                        placeholder="input search text"
                                        onSearch={value => console.log(value)}
                                        style={{ fontSize: "12px", height: "auto" }}
                                        size='small'
                                    />
                                </Col>
                                <Col span={2} offset={2} style={{ bottom: "3.5em" }}>
                                    <Text>ROOM TYPE</Text>
                                </Col>
                                <Col span={1} offset={1} style={{ bottom: "3.5em" }} >
                                    <Dropdown overlay={roomtype_menu} >
                                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.roomtype}<DownOutlined /></Button>
                                    </Dropdown>
                                </Col>
                                <Col span={2} offset={4} style={{ bottom: "3.5em" }} >
                                    <Space>
                                        <Text>ROOM</Text>
                                        <Dropdown overlay={room_menu} >
                                            <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.room}<DownOutlined /></Button>
                                        </Dropdown>
                                    </Space>
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
                                <Col span={2} offset={6} style={{ bottom: "3.5em" }} >
                                    <Text>CHECK-IN DAY</Text>
                                </Col>
                                <Col span={2} offset={1} style={{ bottom: "3.5em" }}>
                                    <Dropdown overlay={checkin_menu}>
                                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.checkin}<DownOutlined /></Button>
                                    </Dropdown>
                                </Col>
                                <Col span={5} style={{ bottom: "3.5em" }} >
                                    <TimePicker
                                        size={"small"}
                                        defaultValue={moment('00:00', format)}
                                        format={format}
                                        style={{ width: "80px" }}
                                    />
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
                                <Col span={3} offset={6} style={{ bottom: "24.5em" }}>
                                    <Text>CHECK-OUT DAY</Text>
                                </Col>
                                <Col span={2} style={{ bottom: "24.5em" }} >
                                    <Dropdown overlay={checkout_menu}>
                                        <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.checkout}<DownOutlined /></Button>
                                    </Dropdown>
                                </Col>
                                <Col span={5} style={{ bottom: "24.5em" }} >
                                    <TimePicker
                                        size={"small"}
                                        defaultValue={moment('00:00', format)}
                                        format={format}
                                        style={{ width: "80px" }}
                                    />
                                </Col>
                            </Row>
                            <div style={{ height: "0px" }}>
                                <Row>
                                    <Col span={10} offset={14} style={{ bottom: "44.5em" }}>
                                        <Text strong>PRICE:</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={2} offset={15} style={{ bottom: "44.5em" }}>
                                        <Text>TODAY PRICE</Text>
                                    </Col>
                                    <Col span={7} style={{ bottom: "44.5em" }} >
                                        <InputNumber
                                            size={"small"}
                                            defaultValue={0}
                                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                            // formatter={currencyFormatter(this.state.currency)}
                                            // parser={currencyParser}
                                            onChange={this.onChangePrice}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={2} offset={15} style={{ bottom: "44em" }}>
                                        <Text>EXTRA</Text>
                                    </Col>
                                    <Col span={7} style={{ bottom: "44em" }} >
                                        <InputNumber
                                            size={"small"}
                                            defaultValue={0}
                                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                            // formatter={currencyFormatter(this.state.currency)}
                                            // parser={currencyParser}
                                            onChange={this.onChangePrice}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={4} offset={16} style={{ bottom: "43.5em" }}>
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
                                <Row style={{ height: "25px" }}>
                                    <Col span={10} offset={14} style={{ bottom: "43em" }} >
                                        <TextArea name="note" placeholder="Additional notes ..." value={this.state.note} onChange={this.handleInputChange} style={{ height: "auto", width: "100%" }} rows={10} />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </Card>
            </div >
        )
    }
}
export default ModalAccom;