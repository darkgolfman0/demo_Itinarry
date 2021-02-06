import React, { useState, useEffect } from 'react'
import { Row, Col, Input } from 'antd';
const { Search, TextArea } = Input;

const PoiInputText = (props, state) => {
    const [poiFields, setPoiFields] = useState({})
    const handlePoiInputChange = (field, event) => {
        let fields = poiFields;
        fields[field] = event.target.value;
        setPoiFields(fields)
        props.onPoiChangeInput(poiFields['note'])
    }
    useEffect(()=>{
        setPoiFields({})
    },[props.visable])
    return (
        <React.Fragment>
            <Row style={{ height: "auto" }}>
                <Col span={10} offset={14} style={{ bottom: "4em" }}>
                    <TextArea
                        name="note"
                        placeholder="Additional notes ..."
                        value={poiFields["note"]}
                        onChange={handlePoiInputChange.bind(this, "note")}
                        rows={10}
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default PoiInputText