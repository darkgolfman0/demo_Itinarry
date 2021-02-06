import React, { useContext, useState, useEffect, useRef } from 'react'
import { Tabs, AutoComplete, Checkbox, Modal, Row, Col, Button, Card, Select, Form, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined, CloseOutlined, PlusCircleOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import cloneDeep from 'lodash/cloneDeep';
import { property } from 'lodash';

const { Text } = Typography
const defaultPrice = {
    totalPrice: 0,
    additionalCost: 0,
    totalCost: 0,
    markupMargin: 0,
    reviewSummary: 0,
    avgPricePerPerson: 0
}
const CalculateAllPrice = (props, state) => {
    const [Price, setPrice] = useState(defaultPrice)

    useEffect(() => {
        let defaultPrices = cloneDeep(Price)
        defaultPrices.totalPrice = props.calPrice
        setPrice(calculateTotal(defaultPrices))
    }, [props.calPrice])

    useEffect(() => {
        props.onCalculatePriceResult(Price)
    }, [Price])
    const handleChangeAdditionCost = (value) => {
        let defaultPrices = cloneDeep(Price)
        defaultPrices.additionalCost = value
        setPrice(calculateTotal(defaultPrices))
    }

    const handleChangeMarupMargin = (value) => {
        let defaultPrices = cloneDeep(Price)
        defaultPrices.markupMargin = value
        setPrice(calculateTotal(defaultPrices))
    }
    const calculateTotal = (temp) => {
        temp.totalCost = temp.totalPrice + temp.additionalCost
        temp.reviewSummary = (temp.totalCost * (temp.markupMargin / 100) + temp.totalCost)
        if (props.totalPassenger) {
            temp.avgPricePerPerson = (temp.reviewSummary / (Number(props.totalPassenger.adultDropdownValue) + Number(props.totalPassenger.childDropdownValue)))
        }

        return temp
    }
    return (
        <React.Fragment>
            <Row>
                <Col span={5} offset={19} style={{ textAlign: "right", bottom: "18em" }}>
                    <Space>
                        <Text strong>TOTAL PRICE</Text>
                        <InputNumber
                            size={"small"}
                            value={Number(Price.totalPrice).toFixed(2)}
                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            disabled={true}
                        />
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={5} offset={19} style={{ textAlign: "right", bottom: "18em" }}>
                    <Space>
                        <Text strong>ADDITIONAL COST</Text>
                        <InputNumber
                            size={"small"}
                            value={Number(Price.additionalCost).toFixed(2)}
                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            onChange={handleChangeAdditionCost}
                        />
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={5} offset={19} style={{ textAlign: "right", bottom: "18em" }}>
                    <Space>
                        <Text strong>TOTAL COST</Text>
                        <InputNumber
                            size={"small"}
                            value={Number(Price.totalCost).toFixed(2)}
                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            disabled={true}
                        />
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={5} offset={19} style={{ textAlign: "right", bottom: "18em" }}>
                    <Space>
                        <Text strong>MARK UP MARGIN (%)</Text>
                        <InputNumber
                            min={0}
                            max={100}
                            size={"small"}
                            value={Price.markupMargin}
                            onChange={handleChangeMarupMargin}
                        />
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={5} offset={19} style={{ textAlign: "right", bottom: "18em" }}>
                    <Space>
                        <Text strong>REVIEW SUMMARY</Text>
                        <InputNumber
                            size={"small"}
                            value={Number(Price.reviewSummary).toFixed(2)}
                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            disabled={true}
                        />
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={7} offset={17} style={{ textAlign: "right", bottom: "18em" }}>
                    <Space>
                        <Text strong>AVG. PRICE PER PERSON</Text>
                        <InputNumber
                            size={"small"}
                            value={Number(Price.avgPricePerPerson).toFixed(2)}
                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            disabled={true}
                        />
                    </Space>
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default CalculateAllPrice