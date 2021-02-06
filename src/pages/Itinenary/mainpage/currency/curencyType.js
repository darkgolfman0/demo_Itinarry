import React, { useContext, useState, useEffect, useRef } from 'react'
import { Tabs, AutoComplete, Checkbox, Modal, Row, Col, Button, Card, Select, Form, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';
import cloneDeep from 'lodash/cloneDeep';

const { Text, Title } = Typography
const { Option } = Select;

const CurencyPrice = {
    THB: 'THB',
    CNT: 'CNT'
}
const Currency = (props, state) => {
    const [price, setPrice] = useState(0)
    const onChangePrice = (data) => {
        setPrice(data)
        props.onCurrnecyPriceResult(Number(data))
    }
    return (
        <React.Fragment>
            <Row>
                <Col span={2} >
                    <Text>CURRENCY</Text>
                </Col>
                <Col span={6} offset={1}>
                    <Input.Group compact>
                        <Select value="THB" size="small" style={{ fontSize: "12px", height: "10px" }}>
                            <Option value={CurencyPrice.THB}>THB</Option>
                            {/* <Option value={CurencyPrice.CNT}>CNT</Option> */}
                        </Select>
                        <InputNumber
                            size={"small"}
                            value={price}
                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            onChange={onChangePrice}
                        />
                    </Input.Group>
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default Currency