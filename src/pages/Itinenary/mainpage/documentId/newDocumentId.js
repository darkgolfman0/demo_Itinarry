import React, { useState, useEffect } from 'react'
import { Tabs, Modal, Row, Col, Card, Input, Divider, Typography } from 'antd';
import moment from 'moment';

import { itnCallAll } from './../../../../services/apiItinerary'

const { Text } = Typography
const docId = "QUA" + moment(Date.now()).format("YYYYMM") + "-" + "000"

const GenDocumentId = (props, state) => {
    useEffect(() => {
        itnCallAll().then(async response => {
            await setItemItinerary(response.itinerary)
        }).catch(error => console.error(error))
    }, [])

    const [status, setStatus] = useState('NEW')
    const [itemItinerary, setItemItinerary] = useState([])
    const [documentId, setdocumentId] = useState(docId + itemItinerary)
    useEffect(() => {
        if (itemItinerary) {
            setdocumentId(docId + (itemItinerary.length + 1))
            props.onDocumentIdResult(docId + (itemItinerary.length + 1))
        }
        // else{
        //     setdocumentId(docId + (itemItinerary.length + 1))
        // }
    }, [itemItinerary])
    return (
        <React.Fragment>
            <Row>
                <Col span={10} offset={14} style={{ textAlign: "right", top: "2em" }}>
                    <Text strong style={{ fontSize: "18px" }}>DOCUMENT ID:{documentId}</Text>
                </Col>
            </Row>
            <Divider type="horizontal"></Divider>
            <Row>
                <Col span={10} offset={14} style={{ textAlign: "right", bottom: "2em" }}>
                    <Text strong style={{ fontSize: "18px" }}>STATUS: {status}</Text>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default GenDocumentId