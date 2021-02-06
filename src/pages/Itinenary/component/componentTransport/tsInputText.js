import React, { useState,useEffect } from 'react'
import { Row, Col, Input } from 'antd';

const { Search, TextArea } = Input;

const TsinputText = (props, state) => {
    const [tsInputFields, setTsInputFields] = useState({})
    useEffect(()=>{
        setTsInputFields({})
    })
    const handleTsInputChange = (field, event) => {
        let fields = tsInputFields;
        fields[field] = event.target.value;
        setTsInputFields(fields)
        props.onTsInputResult(tsInputFields['note'])
    }
    return (
        <React.Fragment>
            <Row style={{ marginTop: "0.5em" }}>
                <Col span={7}>
                    <TextArea
                        name="note"
                        placeholder="Additional notes ..."
                        value={tsInputFields['note']}
                        onChange={handleTsInputChange.bind(this,'note')}
                        style={{ height: "auto", width: "100%" }}
                        rows={10} />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default TsinputText