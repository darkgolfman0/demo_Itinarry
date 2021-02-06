import React, { useContext, useState, useEffect, useRef } from 'react'
import { Tabs, AutoComplete, Checkbox, Modal, Row, Col, Button, Card, Select, Form, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined, CloseOutlined, PlusCircleOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';

const iconStyle = { color: "white", marginTop: "-5px", marginLeft: "-4px", fontSize: "13px" }
const buttonStyle = { width: "20px", height: "20px", background: '#1890ff' }
const { Text } = Typography

const TsAutocomplete = (props, state) => {
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        setSearchText('')
    },[props.visable])
    const handleTsSearchKeywordChange = data => {
        setSearchText(data);
    }
    const handleOnSelected = (data) => {
        setSearchText(prevState => data);
        props.onTsAutoCompleteResult(data)
    }

    return (
        <React.Fragment>
            <Row style={{ marginTop: "0.5em" }}>
                <Col span={3}>
                    <Text>CAR MODEL</Text>
                </Col>
                <Col span={4}>
                    <Space>
                        <AutoComplete
                            tabIndex={1}
                            dropdownClassName="certain-category-search-dropdown"
                            dropdownMatchSelectWidth={200}
                            style={{ fontSize: "12px", height: "auto", width: 'auto' }}
                            options={props.itemTran.map(x => ({ value: x.car_model }))}
                            filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                            value={searchText}
                            onSelect={handleOnSelected}
                            onChange={handleTsSearchKeywordChange}
                        >
                            <Input.Search size="small" placeholder="SEARCH PROPERTY NAME" />
                        </AutoComplete>
                        <Button size={"small"} icon={<PlusCircleOutlined style={{ color: "white", marginTop: "-5px", marginLeft: "-4px", fontSize: "13px" }} />} style={{ width: "20px", height: "20px", background: '#1890ff' }}></Button>
                    </Space>
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default TsAutocomplete