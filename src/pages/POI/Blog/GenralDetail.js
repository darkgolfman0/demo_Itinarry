import React, { useState } from 'react'
import {Row, Col, Input, Typography} from 'antd';
const { Text } = Typography;
const { TextArea } = Input;

const GeneralDetail = (props) => {
    const [name, setName] = useState("")
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");

    return (
        <React.Fragment>
            <Row style={{ paddingBottom: "5px" }}>
                    <Col span={3} ><Text >SUBJECT</Text></Col>
                    <Col span={10} ><Input name="subject" value={subject} onChange={() => setSubject()} size={"small"} placeholder="" /></Col>
            </Row>
            <Row style={{ paddingBottom: "5px" }}>
                    <Col span={3} ><Text >DESCRIPTION</Text></Col>
                    <Col span={10} ><TextArea name="description" value={description} onChange={() => setDescription()} rows={5} /></Col>
            </Row>
        </React.Fragment>
    )
}
export default GeneralDetail