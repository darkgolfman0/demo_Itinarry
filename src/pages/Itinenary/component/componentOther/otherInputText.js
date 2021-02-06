import React, { useContext, useState, useEffect, useRef } from 'react'
import { Tabs, AutoComplete, Checkbox, Modal, Row, Col, Button, Card, Select, Form, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';

const { Search, TextArea } = Input;
const { Text, Title } = Typography;

const OtherInputText = (props, state) => {
    const [otherFields, setOtherFields] = useState({})

    useEffect(() => {
        setOtherFields({})
    }, [props.visable])

    const handleOtherInputChange = (field, event) => {
        let fields = otherFields;
        fields[field] = event.target.value;
        setOtherFields(fields)
        props.onOtherActivityResult(fields['note'])
    }
    return (
        <React.Fragment>
            <Row>
                <Col span={2}>
                    <Text>ACTIVITIES</Text>
                </Col>
                <Col span={21}>
                    <TextArea name="note" placeholder="Additional notes ..." value={otherFields['note']} onChange={handleOtherInputChange.bind(this, 'note')} style={{ height: "auto", width: "500px" }} rows={10} />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default OtherInputText