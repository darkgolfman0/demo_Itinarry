import React, { useContext, useState, useEffect, useRef } from 'react'
import { Tabs, AutoComplete, Checkbox, Modal, Row, Col, Button, Card, Select, Form, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';

const PoiCheckboxGroup = (props, state) => {
    const [poiSelectedList, setPoiSelectedList] = useState(props.itemPoiType)
    const handleSelectboxChangePoi = checkedValues => setPoiSelectedList(checkedValues)

    useEffect(() => {
        props.onPoiSelectboxChangeResult(poiSelectedList)
    }, [poiSelectedList]);

    return (
        <React.Fragment>
            <Checkbox.Group value={poiSelectedList} onChange={handleSelectboxChangePoi}>
                <Row style={{ height: "0" }}>
                    {props.itemPoiType.map(type => (
                        <Col span={8}>
                            <Checkbox value={type}>{type}</Checkbox>
                        </Col>
                    ))}
                </Row>
            </Checkbox.Group>
        </React.Fragment>
    )
}

export default PoiCheckboxGroup