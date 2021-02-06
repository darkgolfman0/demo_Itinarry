import React, { useState, useEffect } from 'react'
import { Tabs, AutoComplete, Row, Col, Button, Card, Select, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined, CloseOutlined, PlusCircleOutlined, MenuOutlined } from '@ant-design/icons';
import moment from 'moment';
import Datetime from 'react-datetime';
import cloneDeep from 'lodash/cloneDeep';

import { itnCallAll } from '../../../../services/apiItinerary'

const { Text, Title } = Typography
const numberValue = [0, 1, 2, 3, 4, 5]
const numberValueAdult = [1, 2, 3, 4, 5]
const DropdownValue = {
    adultDropdownValue: 1,
    childDropdownValue: 0,
    infantDropdownValue: 0
}
const FlightDate = {
    arrivalDate: moment(),
    returnDate: moment()
}
const CustomerFlight = (props, state) => {
    const [itemCustomer, setItemCustomer] = useState([])
    const [customerSelected, setCustomerSelected] = useState('')
    const [passengerNumber, setPassengerNumber] = useState(DropdownValue)
    const [fieldsInput, setFieldsInput] = useState({})
    const [flightDetail, setflightDetail] = useState(FlightDate)

    useEffect(() => {
        itnCallAll().then(async response => {
            await setItemCustomer(response.customer)
        }).catch(error => console.error(error))
    }, [])

    useEffect(() => {
        props.onPassengerResult(passengerNumber)
    }, [passengerNumber])

    const onSelectedCustomer = (data) => {
        setCustomerSelected(data)
        props.onCustomerNameResult(data)
    }
    const onChangeCustomer = (data) => {
        setCustomerSelected(data)
        props.onCustomerNameResult(data)
    }
    const adultValue = ({ key }) => {
        let temp = cloneDeep(passengerNumber);
        temp.adultDropdownValue = Number(key);
        setPassengerNumber(temp)
        message.info(`Click on item ${key}`);
    };
    const adultMenu = (
        <Menu onClick={adultValue}>
            {numberValueAdult.map(res => {
                return <Menu.Item key={Number(res)}>
                    <span target="_blank" rel="noopener noreferrer" >
                        {res}
                    </span>
                </Menu.Item>
            })}
        </Menu>
    );
    const childValue = ({ key }) => {
        let temp = cloneDeep(passengerNumber);
        temp.childDropdownValue = Number(key);
        setPassengerNumber(temp)
        message.info(`Click on item ${key}`);
    };
    const childMenu = (
        <Menu onClick={childValue}>
            {numberValue.map(res => {
                return <Menu.Item key={Number(res)}>
                    <span target="_blank" rel="noopener noreferrer" >
                        {res}
                    </span>
                </Menu.Item>
            })}
        </Menu>
    );
    const infantValue = ({ key }) => {
        let temp = cloneDeep(passengerNumber);
        temp.infantDropdownValue = Number(key);
        setPassengerNumber(temp)
        message.info(`Click on item ${key}`);
    };
    const infantMenu = (
        <Menu onClick={infantValue}>
            {numberValue.map(res => {
                return <Menu.Item key={Number(res)}>
                    <span target="_blank" rel="noopener noreferrer" >
                        {res}
                    </span>
                </Menu.Item>
            })}
        </Menu>
    );
    const handleChangeInput = (field, event) => {
        let fields = fieldsInput;
        fields[field] = event.target.value;
        setFieldsInput(fields)
        props.onAirlineFlightResult(fields)
    }
    const handleChangeArrivalDate = (value) => {
        // console.log(moment(value).format('DD'))
        setflightDetail(FlightDate.arrivalDate = moment(value).format())
    }
    const handleChangeReturnDate = (value) => {
        setflightDetail(FlightDate.returnDate = moment(value).format())
    }
    useEffect(() => {
        props.onAirlineFlightDateResult(FlightDate)
    }, [FlightDate])
    return (
        <React.Fragment>
            <Row>
                <Col span={2} offset={4}>
                    <Text strong>CUSTOMER</Text>
                </Col>
                <Col span={10}>
                    <AutoComplete
                        tabIndex={1}
                        dropdownClassName="certain-category-search-dropdown"
                        dropdownMatchSelectWidth={200}
                        style={{
                            width: 500,
                            bottom: 5
                        }}
                        options={itemCustomer.map(x => ({ value: x.first_name }))}
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        value={customerSelected}
                        onChange={onChangeCustomer}
                        onSelect={onSelectedCustomer}
                    >
                        <Input.Search size="small" placeholder="Search Customer" />
                    </AutoComplete>
                </Col>
                <Col span={7} offset={1}>
                    <Button tabIndex={2} size={"small"} icon={<PlusCircleOutlined style={{ color: "white", marginTop: "-5px", marginLeft: "-4px", fontSize: "13px" }} />} style={{ width: "20px", height: "20px", background: '#1890ff' }}></Button>
                </Col>
            </Row>
            <Row >
                <Col span={4} offset={4}>
                    <Space>
                        <Text strong>NUMBER OF PASSENGERS:</Text>
                    </Space>
                </Col>
                <Col span={3} >
                    <Space>
                        <Text strong>ADULT(12+)</Text>
                        <Dropdown overlay={adultMenu} >
                            <Button tabIndex={3} size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{passengerNumber.adultDropdownValue}<DownOutlined /></Button>
                        </Dropdown>
                    </Space>
                </Col>
                <Col span={3} >
                    <Space>
                        <Text strong>CHILD(4-11)</Text>
                        <Dropdown overlay={childMenu} >
                            <Button tabIndex={4} size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{passengerNumber.childDropdownValue}<DownOutlined /></Button>
                        </Dropdown>
                    </Space>
                </Col>
                <Col span={10} >
                    <Space>
                        <Text strong>INFANT(below 2)</Text>
                        <Dropdown overlay={infantMenu} >
                            <Button tabIndex={5} size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{passengerNumber.infantDropdownValue}<DownOutlined /></Button>
                        </Dropdown>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={20} offset={4}>
                    <Text strong>DEPARTURE:</Text>
                </Col>
            </Row>
            <Row>
                <Col span={7} offset={5}>
                    <Space>
                        <Text >AIRLINE/FLIGHT</Text>
                        <Input tabIndex={6} name="airlineFlight" value={fieldsInput['airlineFlight']} onChange={handleChangeInput.bind(this, 'airlineFlight')} size={"small"} placeholder="" />
                    </Space>
                </Col>
                <Col span={7} >
                    <Space>
                        <Text >ARRIVAL DATE/TIME</Text>
                        <Datetime onChange={handleChangeArrivalDate} style={{ border: '1px solid #d9d9d9' }} tabIndex={7} />
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={20} offset={4}>
                    <Text strong>RETURN:</Text>
                </Col>
            </Row>
            <Row>
                <Col span={7} offset={5}>
                    <Space>
                        <Text >AIRLINE/FLIGHT</Text>
                        <Input tabIndex={8} name="returnAirline" value={fieldsInput['returnAirline']} onChange={handleChangeInput.bind(this, 'returnAirline')} size={"small"} placeholder="" />
                    </Space>
                </Col>
                <Col span={7} >
                    <Space>
                        <Text >RETURN DATE/TIME</Text>
                        <Datetime onChange={handleChangeReturnDate} style={{ border: '1px solid #d9d9d9' }} tabIndex={9} />
                    </Space>
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default CustomerFlight