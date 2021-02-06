import React, { useContext, useState, useEffect, useRef } from 'react'
import { Tabs, AutoComplete, Checkbox, Modal, Row, Col, Button, Card, Select, Form, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';

const AccomCheckboxGroup = (props, state) => {
    const [accomSelectedList, setAccomSelectedList] = useState(props.itemAccomType)
    const handleSelectboxChangeAccom = checkedValues => setAccomSelectedList(checkedValues)

    useEffect(() => {
        props.onAccomSelectboxChangeResult(accomSelectedList)
    }, [accomSelectedList]);

    return (
        <React.Fragment>
            <Checkbox.Group value={accomSelectedList} onChange={handleSelectboxChangeAccom}>
                <Row style={{ height: "0" }}>
                    {props.itemAccomType.map(type => (
                        <Col span={8}>
                            <Checkbox value={type}>{type}</Checkbox>
                        </Col>
                    ))}
                </Row>
            </Checkbox.Group>
        </React.Fragment>
    )
}

export default AccomCheckboxGroup