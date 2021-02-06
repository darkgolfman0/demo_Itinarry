import React, { useState } from 'react'
import {Table,InputNumber} from 'antd';

const InputTicketNumber = ( nameInput, defaultInputValue, handler) => {
    return (
        <InputNumber
        style={{ fontSize: "12px", height: "100%" }}
        name= {nameInput}
        size={"small"}
        defaultValue={defaultInputValue}
        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
        onChange={handler}
    />
    )
}

const TicketPrice = (props) => {
    const [adult_price, setAdultPrice] = useState(0.00)
    const [child_price, setChildPrice] = useState(0.00)
    const [infant_price, setInfantPrice] = useState(0.00)

    const adultPriceChange = (value) => {
        setAdultPrice(value)
        console.log('changed', value);
    }
    const childPriceChange = (value) => {
        setChildPrice(value)
        console.log('changed', value);
    }
    const infanPriceChange = (value) => {
        setInfantPrice(value)
        console.log('changed', value);
    }
    const ticket_price_columns = [
        {
            title: 'TYPE',
            dataIndex: 'type_poi',
            key: 'type_poi',
            render: (text) => (
                <span style={{ fontSize: "12px" }}>{text}</span>
            ),
        },
        {
            title: 'PRICE',
            dataIndex: 'price',
            key: 'price',
            render: (text) => (
                <span style={{ fontSize: "12px" }}>{text}</span>
            ),
        },
    ];

    const ticket_data = [
        {
            key: '1',
            type_poi: 'Adult (12+)',
            price: InputTicketNumber("adult_price", adult_price, adultPriceChange)
        },
        {
            key: '2',
            type_poi: 'Child (2-11)',
            price: InputTicketNumber("child_price", child_price, childPriceChange)
        },
        {
            key: '3',
            type_poi: 'Infant (below 2)',
            price: InputTicketNumber("infant_price", infant_price, infanPriceChange)
        },
    ];

    return (<Table  pagination={false} columns={ticket_price_columns} dataSource={ticket_data}></Table>)
}
export default TicketPrice