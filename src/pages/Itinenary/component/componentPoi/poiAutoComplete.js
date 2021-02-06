import React, { useContext, useState, useEffect, useRef } from 'react'
import { Tabs, AutoComplete, Checkbox, Modal, Row, Col, Button, Card, Select, Form, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined, CloseOutlined, PlusCircleOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';

const iconStyle = { color: "white", marginTop: "-5px", marginLeft: "-4px", fontSize: "13px" }
const buttonStyle = { width: "20px", height: "20px", background: '#1890ff' }
const { Text } = Typography

const PoiInputAutoComplete = (props, state) => {
    const [searchText, setSearchText] = useState('')
    const handlePoiSearchKeywordChange = data => {
        setSearchText(data);
    }
    const handleOnSelected = (data) => {
        setSearchText(data);
        props.onPoiAutoCompleteResult(data)
    }
    useEffect(() => {
        setSearchText('')
    }, [props.visable])

    return (
        <React.Fragment>
            <Row>
                <Col span={2} offset={14} style={{ bottom: "4em" }}>
                    <Text>PLACE</Text>
                </Col>
                <Col span={6} style={{ bottom: "4em" }}>
                    <Space>
                        <AutoComplete
                            tabIndex={1}
                            dropdownClassName="certain-category-search-dropdown"
                            dropdownMatchSelectWidth={200}
                            style={{ fontSize: "12px", height: "auto", width: 'auto' }}
                            options={props.itemPoi.map(x => ({ value: x.display_name }))}
                            filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                            value={searchText}
                            onChange={handlePoiSearchKeywordChange}
                            onSelect={handleOnSelected}
                        >
                            <Input.Search size="small" placeholder="SEARCH PLACE" />
                        </AutoComplete>
                        <Button size={"small"} icon={<PlusCircleOutlined style={iconStyle} />} style={buttonStyle}></Button>
                    </Space>
                </Col>
            </Row>

        </React.Fragment>
    )
}

export default PoiInputAutoComplete