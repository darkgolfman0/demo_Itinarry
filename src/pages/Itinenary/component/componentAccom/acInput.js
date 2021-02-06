import React, { useContext, useState, useEffect, useRef } from 'react'
import { Tabs, AutoComplete, Checkbox, Modal, Row, Col, Button, Card, Select, Form, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';

const { Search, TextArea } = Input;

const AccomInputText = (props, statae) => {
    const [acTexFields, setacTexFields] = useState({})
    
    useEffect(()=>{
        setacTexFields({})
    },[props.visable])
    const handleInputChangeAccom = (field, event) => {
        let fields = acTexFields;
        fields[field] = event.target.value;
        setacTexFields(fields)
    }
    return (
        <>
            <Row style={{ height: "auto" }}>
                <Col span={10} offset={14} style={{ bottom: "2em" }} >
                    <TextArea name="note" placeholder="Additional notes ..." value={acTexFields['note']} onChange={handleInputChangeAccom.bind(this,'note')} style={{ height: "auto", width: "100%" }} rows={10} />
                </Col>
            </Row>
        </>
    )
}

export default AccomInputText