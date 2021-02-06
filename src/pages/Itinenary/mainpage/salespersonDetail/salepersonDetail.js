import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Typography } from 'antd';

const { Search, TextArea } = Input;
const { Text } = Typography

const SalePersonAndRemark = (props, state) => {
    const [Fields, setInputFields] = useState({})

    const handleInputChange = (field, event) => {
        let fields = Fields;
        fields[field] = event.target.value;
        setInputFields(fields)
        props.onSalePersonRemarkResult(Fields)
    }
    return (
        <React.Fragment>
            <Row>
                <Col span={2} >
                    <Text>SALESPERSON</Text>
                </Col>
                <Col span={3} offset={1} >
                    <Input name="salesperson" style={{ width: "278px" }} value={Fields['salesperson']} onChange={handleInputChange.bind(this, 'salesperson')} size={"small"} placeholder="" />
                </Col>
            </Row>
            <Row>
                <Col span={2} >
                    <Text>REMARK</Text>
                </Col>
                <Col span={6} offset={1} >
                    <TextArea name="remark" value={Fields['remark']} onChange={handleInputChange.bind(this, 'remark')} style={{ width: "200em" }} rows={10} />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default SalePersonAndRemark