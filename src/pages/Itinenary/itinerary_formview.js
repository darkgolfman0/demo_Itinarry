import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Card, Divider, Typography, Space } from 'antd';
import { SaveOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import styles from '../../App.css'
import "react-datetime/css/react-datetime.css";
import ModalActivity from './modalActivity';
import GenDocumentId from './mainpage/documentId/newDocumentId';
import CustomerFlight from './mainpage/customerDetail/customerFlight';
import Currency from './mainpage/currency/curencyType';
import SalePersonAndRemark from './mainpage/salespersonDetail/salepersonDetail';
import TableDayofActivity from './mainpage/table/addDayActivity';
import ActivityData from './mainpage/table/ActivityData';
import CalculateAllPrice from './mainpage/calculatePrice/calculatePrice';

const { Text, Title } = Typography
const axios = require('axios');
const Itinerary_Formview = (props, state) => {
    const [visable, setVisable] = useState(false)
    const [dayActivity, setDayActivity] = useState([])
    const [activeDay, setactiveDay] = useState()
    const [totalPassenger, setTotalPassenger] = useState()
    const [activityOfDay, setActivityOfDay] = useState()
    const [calPrice, setCalPrice] = useState(0)
    const [currencyPrice, setCurrencyPrice] = useState(0)
    const [fieldsInputSalesperson, setInputSalesperson] = useState('')
    const [fieldsInputRemark, setInputRemark] = useState('')
    const [fieldsDepartureAirline, setFieldsDepartureAirline] = useState('')
    const [fieldsReturnAirline, setFieldsReturnAirline] = useState('')
    const [getPriceFromCal, setGetPriceFromCal] = useState()
    const [documentIdResult, setDocumentIdResult] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [FlightDate, setFlightDate] = useState()
    const [formData, setFormData] = useState({})

    useEffect(() => {
        let index = dayActivity.findIndex(obj => obj.key === activeDay);
        if (dayActivity[index]) {
            if (activityOfDay) {
                dayActivity[index].dataActivity.push(activityOfDay.dataActivity)
                dayActivity[index].reference.push(activityOfDay.reference)
            }
        }
    }, [activityOfDay])
    useEffect(() => {
        // on click submit save
        console.log(formData)
        // axios({
        //     method: 'post',
        //     url: 'http://13.229.16.186:5000/api/itinerary',
        //     data: formdata
        // })
        //     .then((response) => {
        //         //handle success
        //         this.props.history.push("/itinerary_list")
        //         console.log('api response ==>', response)
        //         return response
        //         // return this.setState({ data: response})
        //     })
        //     .catch((error) => {
        //         //handle error
        //         console.log(error)
        //         return this.setState({
        //             error: error
        //         })
        //     });
    }, [formData])
    const handleModalVisableResult = (data) => {
        setVisable(data)
    }
    const handleModalActivityResult = (data) => {
        if (data) {
            setActivityOfDay(data)
        }
    }
    const handleDayActivityResult = (data) => {
        if (data) {
            setDayActivity(data)
        }
    }
    const handleActiveDay = (data) => {
        setactiveDay(data)
    }
    const handleActivityOfDayResult = (data) => {
        if (data) {
            let a = data
            // console.log(a)
            let b = []
            a.forEach(element => {
                b.push({ subtotal: element.subtotal })
            });
            let sum = b.reduce(function (prev, current) {
                return prev + +current.subtotal
            }, 0);
            setCalPrice(Number(sum).toFixed(2))
        }
    }
    const handlePassengerResult = (data) => {
        setTotalPassenger(data)
    }
    const handleCalculatePriceResult = (data) => {
        if (data) {
            if (calPrice) {
                setGetPriceFromCal(data)
            }
        }
    }
    const handleSalePersonRemarkResult = (data) => {
        if (data.salesperson) {
            setInputSalesperson(data.salesperson)
        }
        if (data.remark) {
            setInputRemark(data.remark)
        }
    }
    const handleAirlineFlightResult = (data) => {
        if (data.airlineFlight) {
            setFieldsDepartureAirline(data.airlineFlight)
        }
        if (data.returnAirline) {
            setFieldsReturnAirline(data.returnAirline)
        }
    }
    const handleDocumentIdResult = (data) => {
        setDocumentIdResult(data)
    }
    const handleCustomerNameResult = (data) => {
        setCustomerName(data)
    }
    const handleAirlineFlightDateResult = (data) => {
        if (data) {
            setFlightDate(data)
        }
    }
    const handleCurrnecyPriceResult = (data) => {
        if (data) {
            setCurrencyPrice(data)
        }
    }
    return (
        <div className={styles.sitecard_borderless_wrapper}>
            <Card bordered={false}>
                <Title level={3}>ITINERARY MANAGEMENT</Title>
                <div style={{ fontSize: "12px" }}>
                    {/* Col 24 */}
                    <Row>
                        <Space>
                            <Col span={5}>
                                <Button onClick={() => setFormData({
                                    documentId: documentIdResult,
                                    customer: customerName,
                                    passenger: totalPassenger,
                                    DepartureFlight: fieldsDepartureAirline,
                                    fightDate: FlightDate,
                                    ReturnFlight: fieldsReturnAirline,
                                    dayOfActivity: dayActivity,
                                    currencyPrice: currencyPrice,
                                    price: getPriceFromCal,
                                    salePersone: fieldsInputSalesperson,
                                    remarks: fieldsInputRemark,
                                })} icon={<SaveOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                    <p style={{ color: "white", position: "inherit" }}>Save</p>
                                </Button>
                            </Col>
                            <Col span={5}>
                                <Link exact to="/itinerary_list">
                                    <Button icon={<DeleteOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                        <p style={{ color: "white", position: "inherit" }}>Delete</p>
                                    </Button>
                                </Link>
                            </Col>
                            <Col span={14}>
                                <Link exact to="/itinerary_list">
                                    <Button icon={<CloseOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                        <p style={{ color: "white", position: "inherit" }}>Discard</p>
                                    </Button>
                                </Link>
                            </Col>
                        </Space>
                    </Row>
                    <GenDocumentId onDocumentIdResult={handleDocumentIdResult} />
                    <div>
                        <CustomerFlight onPassengerResult={handlePassengerResult} onCustomerNameResult={handleCustomerNameResult} onAirlineFlightResult={handleAirlineFlightResult} onAirlineFlightDateResult={handleAirlineFlightDateResult} />
                        <br />
                        <Row>
                            <TableDayofActivity onActiveDay={handleActiveDay} onDayActivityResult={handleDayActivityResult} />
                            <Col span={18} offset={1}>
                                <Card style={{ width: "auto", height: "auto" }}>
                                    <ActivityData activeDay={activeDay} visable={visable} dayActivity={dayActivity} activityOfDay={activityOfDay} onActivityOfDayResult={handleActivityOfDayResult} />
                                    <br />
                                    <Row>
                                        <Col span={5}>
                                            <Button style={{ display: 'flex', background: '#1890ff' }} >
                                                <p style={{ color: "white", position: "inherit" }}>Map Preview</p>
                                            </Button>
                                        </Col>
                                        <Col span={2} offset={17} style={{ textAlign: "right" }}>
                                            <Button style={{ display: 'flex', background: '#1890ff' }} onClick={() => setVisable(true)}>
                                                <p style={{ color: "white", position: "inherit" }}>+ Add</p>
                                            </Button>
                                            <ModalActivity activeDay={activeDay} dayActivity={dayActivity} visable={visable} onModalVisableResult={handleModalVisableResult} onModalActivityResult={handleModalActivityResult} />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        <br />
                        <div>
                            <Currency onCurrnecyPriceResult={handleCurrnecyPriceResult} />
                            <SalePersonAndRemark onSalePersonRemarkResult={handleSalePersonRemarkResult} />
                            <CalculateAllPrice totalPassenger={totalPassenger} calPrice={Number(calPrice)} onCalculatePriceResult={handleCalculatePriceResult} />
                        </div>
                        <Divider type="horizontal"></Divider>
                    </div>
                    <div>
                        <Row>
                            <Col span={2} offset={20} style={{ textAlign: "end", left: "30px" }}>
                                <Button style={{ display: 'flex', background: '#1890ff' }}>
                                    <p style={{ color: "white", position: "inherit" }}>PDF</p>
                                </Button>
                            </Col>
                            <Col span={2} style={{ textAlign: "end", left: "30px" }}>
                                <Button style={{ display: 'flex', background: '#1890ff' }}>
                                    <p style={{ color: "white", position: "inherit" }}>Word</p>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Card>
        </div >
    )
}
export default Itinerary_Formview