import React, { useState, useEffect } from 'react'
import { Tabs, Modal, Row, Col, Card, Input } from 'antd';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';

import { itnCallAll } from './../../services/apiItinerary'
import { defaultState } from './initState'
import PoiCheckboxGroup from './component/componentPoi/poiCheckboxGroup'
import PoiInputAutoComplete from './component/componentPoi/poiAutoComplete'
import PoiTimePicker from './component/componentPoi/poiTimePicker'
import PoiTicketPrice from './component/componentPoi/poiTicketPrice'
import PoiInputText from './component/componentPoi/poiInput'
import AccomPrice from './component/componentAccom/acCalculate'
import AccomInputText from './component/componentAccom/acInput'
import AccomAutoComplete from './component/componentAccom/acAutoComPlete'
import AccomCheckInCheckOut from './component/componentAccom/acCheckInCheckOut'
import AccomCheckboxGroup from './component/componentAccom/acCheckboxGroup'
import TsLocation from './component/componentTransport/tsLocation'
import TsAutocomplete from './component/componentTransport/tsAutocomplete'
import TsPickupDropoffDay from './component/componentTransport/tsPickupDropoffDay'
import TsinputText from './component/componentTransport/tsInputText'
import TsPrice from './component/componentTransport/tsPrice'
import OtherTimepicker from './component/componentOther/timepicker';
import OtherInputText from './component/componentOther/otherInputText';
import PoiImage from './component/componentPoi/poiImage';
import AccomImage from './component/componentAccom/acImage';

const time_format = 'HH:mm';
const { TabPane } = Tabs;
const { Search, TextArea } = Input;
const TYPE_MODAL = {
    POI: 'modal_POI',
    ACCOMMODATION: 'modal_Accom',
    TRANSPORTATION: 'modal_Transport',
    OTHERS: 'modal_Other'
}
const POI_TYPES = defaultState.poi_check_option
const ACCOM_TYPES = defaultState.ac_check_option
const acDataActivity = {
    time: moment(),
    activity: '',
    price: 0,
    markup: 0,
    subtotal: 0,
    reference: {
        roomType: '',
        roomValue: 1,
        checkInDay: '',
        checkInTime: moment(),
        checkOutDay: '',
        checkOutTime: moment(),
        todayPrice: 0,
        extraPrice: 0,
        totalPrice: 0,
        note: ''
    }
}
const poiDataActivity = {
    time: moment(),
    activity: '',
    price: 0,
    markup: 0,
    subtotal: 0,
    reference: {
        ticketPrice: {
            adult: {
                price: 0,
                quantity: 0
            },
            child: {
                price: 0,
                quantity: 0
            },
            infant: {
                price: 0,
                quantity: 0
            }
        },
        note: ''
    },
}
const tranDataActivity = {
    carModel: '',
    pickUp: {
        pickUpLocation: 'Suvarnabhumi Airport',
        pickUpDay: 'Day 1',
        pickUpTime: moment()
    },
    dropOff: {
        dropOffLocation: 'Suvarnabhumi Airport',
        dropOffDay: 'Day 1',
        dropOffTime: moment()
    },
    price: {
        Car: {
            quantityCar: 1,
            priceCar: 0,
            subtotalCar: 0,
        },
        carSeat: {
            quantityCarSeat: 1,
            priceCarSeat: 0,
            subtotalCarSeat: 0,
        },
        extraPrice: 0,
        totalPrice: 0
    },
    note: ''
}
const OtherDataActivity = {
    time: moment(),
    activity: ''
}

const ModalActivity = (props, state) => {
    const [visable, setVisable] = useState(props.visable)
    const [typeModal, setTypeModal] = useState(TYPE_MODAL.POI)
    const [poiPlaceList, setPoiPlaceLst] = useState([])
    const [poiActivity, setPoiActivity] = useState(poiDataActivity)
    const [accomPlaceList, setAccomPlaceLst] = useState([])
    const [accomActivity, setAccomActivity] = useState(acDataActivity)
    const [accomRoomList, setAccomRoomLst] = useState([])
    const [tranCarModel, setTranCarModel] = useState([])
    const [tranActivity, setTranActivity] = useState(tranDataActivity)
    const [otherActivity, setotherActivity] = useState(OtherDataActivity)
    const [countKey, setCountKey] = useState(0)
    const [dayOfActivity, setDayOfActivity] = useState()
    useEffect(() => {
        itnCallAll().then(response => {
            setPoiPlaceLst(response.poi)
            setAccomPlaceLst(response.accommodation)
            setTranCarModel(response.transpotation)
        }).catch(error => console.error(error))
    }, [])
    useEffect(() => {
        setVisable(props.visable)
    }, [props.visable])
    useEffect(() => {
        props.onModalVisableResult(visable)
    }, [visable])
    useEffect(() => {
        setCountKey(0)
    }, [props.dayActivity])

    useEffect(() => {
        let index = props.dayActivity.findIndex(obj => obj.key === props.activeDay);
        if (props.dayActivity[index]) {
            setDayOfActivity(props.dayActivity[index].dayOfActivity)
        }
    }, [props.activeDay])

    const handleCancel = () => {
        setVisable(false)
    }
    const handleOk = () => {
        let activityOfDay
        let dataActivity
        let reference
        if (typeModal === TYPE_MODAL.POI) {
            activityOfDay = {
                dataActivity : {
                    key: countKey,
                    time: moment(poiActivity.time).format(time_format),
                    activities: poiActivity.activity,
                    price: poiActivity.reference.ticketPrice.totalPrice,
                    markup: 0,
                    subtotal: 0,
                    dayOfActivity: dayOfActivity,
                },
                reference : {
                    typeModal: typeModal,
                    propertPlace: poiActivity.activity,
                    adultPrice: poiActivity.reference.ticketPrice.adult.price,
                    valueAdult: poiActivity.reference.ticketPrice.adult.quantity,
                    childPrice: poiActivity.reference.ticketPrice.child.price,
                    valueChild: poiActivity.reference.ticketPrice.child.quantity,
                    infantPrice: poiActivity.reference.ticketPrice.infant.price,
                    valueInfant: poiActivity.reference.ticketPrice.infant.quantity,
                    note: poiActivity.reference.note,
                }
            }
        }
        if (typeModal === TYPE_MODAL.ACCOMMODATION) {
            dataActivity = {
                key: countKey,
                time: moment(accomActivity.reference.checkInTime).format(time_format),
                activities: accomActivity.activity,
                price: accomActivity.price,
                markup: accomActivity.markup,
                subtotal: accomActivity.subtotal,
                dayOfActivity: '',
            }
            reference = {
                typeModal: typeModal,
                propertyName: accomActivity.activity,
                roomType: accomActivity.reference.roomType,
                roomValue: accomActivity.reference.roomValue,
                checkInDay: accomActivity.reference.checkInDay,
                checkInTime: moment(accomActivity.reference.checkInTime).format(time_format),
                checkOutDay: accomActivity.reference.checkOutDay,
                checkOutTime: moment(accomActivity.reference.checkOutTime).format(time_format),
                todayPrice: accomActivity.reference.todayPrice,
                extraPrice: accomActivity.reference.extraPrice,
                totalPrice: accomActivity.reference.totalPrice,
                note: accomActivity.reference.note
            }
        }
        if (typeModal === TYPE_MODAL.TRANSPORTATION) {
            dataActivity = {
                key: countKey,
                time: moment(tranActivity.pickUp.PickupTime).format(time_format),
                activities: tranActivity.carModel,
                price: tranActivity.price.totalPrice,
                markup: 0,
                subtotal: 0,
                dayOfActivity: '',
                note: tranActivity.note
            }
            reference = {
                typeModal: typeModal,
                carModel: tranActivity.carModel,
                pickUpLocation: tranActivity.pickUp.pickUpLocation,
                pickUpDay: tranActivity.pickUp.pickUpDay,
                pickUpTime: moment(tranActivity.pickUp.pickUpTime).format(time_format),
                dropOffLocation: tranActivity.dropOff.dropOffLocation,
                dropOffDay: tranActivity.dropOff.dropOffDay,
                dropOffTime: moment(tranActivity.dropOff.dropOffTime).format(time_format),
                quantityCar: tranActivity.price.Car.quantityCar,
                priceCar: tranActivity.price.Car.priceCar,
                subtotalCar: tranActivity.price.Car.subtotalCar,
                quantityCarSeat: tranActivity.price.carSeat.quantityCarSeat,
                priceCarSeat: tranActivity.price.carSeat.priceCarSeat,
                subtotalCarSeat: tranActivity.price.carSeat.subtotalCarSeat,
                extraPrice: tranActivity.price.extraPrice,
                totalPrice: tranActivity.price.totalPrice
            }
        }
        if (typeModal === TYPE_MODAL.OTHERS) {
            dataActivity = {
                key: countKey,
                time: moment(otherActivity.time).format(time_format),
                activities: otherActivity.activity,
                price: 0,
                markup: 0,
                subtotal: 0,
                dayOfActivity: '',
            }
            reference = {
                type_modal: typeModal,
                time: moment(otherActivity.time).format(time_format),
                activity: otherActivity.activity,
            }
        }
        setCountKey(countKey + 1)
        // props.onModalActivityResult(dataActivity)
        props.onModalActivityResult(activityOfDay)
        setVisable(false)
    }

    const callback = (key) => {
        if (key === "1") {
            setTypeModal(TYPE_MODAL.POI)
        }
        if (key === "2") {
            setTypeModal(TYPE_MODAL.ACCOMMODATION)
        }
        if (key === "3") {
            setTypeModal(TYPE_MODAL.TRANSPORTATION)
        }
        if (key === "4") {
            setTypeModal(TYPE_MODAL.OTHERS)
        }
    }
    const handlePoiSelectboxChangeResult = checkedValues => {
        console.log("checkValue", checkedValues)
    }
    const handlePoiAutoCompleteResult = (data) => {
        let temp = cloneDeep(poiActivity);
        temp.activity = data;
        setPoiActivity(temp)
    }
    const handlePoiTimeChange = (data) => {
        let temp = cloneDeep(poiActivity);
        temp.time = data;
        setPoiActivity(temp)
    }
    const handlePoiChangePrice = (data) => {
        let temp = cloneDeep(poiActivity);
        temp.reference.ticketPrice = data;
        setPoiActivity(temp)
    }
    const handlePoiChangeText = (data) => {
        let temp = cloneDeep(poiActivity);
        temp.reference.note = data;
        setPoiActivity(temp)
    }
    const handleAccomSelectboxChangeResult = checkedValues => {
        console.log("checkValue", checkedValues)
    }
    const handleAccomAutoCompleteResult = (data) => {
        let temp = cloneDeep(accomActivity);
        temp.activity = data;
        setAccomActivity(temp)
        accomPlaceList.map(res => {
            if (res.property_name === data) {
                setAccomRoomLst([])
                res.datasource_allroom.map(res => {
                    setAccomRoomLst(accomRoomList => [...accomRoomList, res.room_type])
                })
            }
        })
    }
    const handdleSelectedRoomtype = (data) => {
        let temp = cloneDeep(accomActivity);
        temp.reference.roomType = data;
        setAccomActivity(temp)
    }
    const handleSelectedAccomValueRoom = (data) => {
        let temp = cloneDeep(accomActivity);
        temp.reference.roomValue = data;
        setAccomActivity(temp)
    }
    const handleAccomGetPrice = (data) => {
        let temp = cloneDeep(accomActivity);
        temp.price = data.totalPrice;
        temp.reference.todayPrice = data.price;
        temp.reference.extraPrice = data.extraPrice;
        setAccomActivity(temp)
    }
    const handleAccomInputText = (data) => {
        let temp = cloneDeep(accomActivity);
        temp.note = data
        setAccomActivity(temp)
    }
    const handleTsAutoCompleteResult = (data) => {
        let temp = cloneDeep(tranActivity);
        temp.carModel = data
        setTranActivity(temp)
    }
    const handleTsLocationResult = (data) => {
        let temp = cloneDeep(tranActivity);
        temp.pickUp.pickUpLocation = data.pickupLocation
        temp.dropOff.dropOffLocation = data.pickoffLocation
        setTranActivity(temp)
    }
    const handleTsPickupDropoffResult = (data) => {
        let temp = cloneDeep(tranActivity);
        temp.pickUp.pickUpDay = data.pickUpDay
        temp.pickUp.pickUpTime = data.PickupTime
        temp.dropOff.dropOffDay = data.dropOffDay
        temp.dropOff.dropOffTime = data.dropOffTime
        setTranActivity(temp)
    }
    const handleTsInputResult = (data) => {
        let temp = cloneDeep(tranActivity);
        temp.note = data
        setTranActivity(temp)
    }
    const handleTsPriceResult = (data) => {
        let temp = cloneDeep(tranActivity);
        temp.price.Car.priceCar = data.quantityCar.price
        temp.price.Car.quantityCar = data.quantityCar.quantity
        temp.price.Car.subtotalCar = data.quantityCar.subtotal
        temp.price.carSeat.priceCarSeat = data.carSeat.price
        temp.price.carSeat.quantityCarSeat = data.carSeat.quantity
        temp.price.carSeat.subtotalCarSeat = data.carSeat.subtotal
        temp.price.extraPrice = data.extra.price
        temp.price.totalPrice = data.totalPrice
        setTranActivity(temp)
    }
    const handleOtherTimeResult = (data) => {
        let temp = cloneDeep(otherActivity);
        temp.time = data
        setotherActivity(temp)
    }
    const handleOtherActivityResult = (data) => {
        let temp = cloneDeep(otherActivity);
        temp.activity = data
        setotherActivity(temp)
    }
    return (
        <React.Fragment>
            <Modal
                visible={visable}
                onOk={() => handleOk()}
                onCancel={() => handleCancel()}
                width={'1200px'}
                style={{ marginTop: "-100px" }}
            >
                <Tabs defaultActiveKey="1" size={"small"} onChange={() => callback()}>
                    <TabPane tab="POI" key="1">
                        <div>
                            <Card bordered={false} style={{ paddingBottom: "0px", paddingTop: "0px" }}>
                                <div style={{ fontSize: "12px" }}>
                                    <div>
                                        <PoiCheckboxGroup itemPoiType={POI_TYPES} onPoiSelectboxChangeResult={handlePoiSelectboxChangeResult} />
                                        <Row>
                                            <Col span={12} style={{ top: "2em" }} >
                                                <Search
                                                    placeholder="input search text"
                                                    onSearch={value => console.log(value)}
                                                    style={{ fontSize: "12px", height: "auto" }}
                                                    size='small'
                                                />
                                            </Col>
                                        </Row>
                                        <PoiImage itemAccom={accomPlaceList} />
                                        {/* Right */}
                                        <PoiInputAutoComplete visable={visable} itemPoi={poiPlaceList} onPoiAutoCompleteResult={handlePoiAutoCompleteResult} />
                                        <PoiTimePicker visable={visable} onPoiTimeChange={handlePoiTimeChange} />
                                        <PoiTicketPrice visable={visable} itemPoi={poiPlaceList} selectedPlace={poiActivity.activity} onPoiChangePrice={handlePoiChangePrice} />
                                        <PoiInputText visable={visable} onPoiChangeInput={handlePoiChangeText} />
                                    </div>
                                </div>
                            </Card>
                        </div >
                    </TabPane>
                    <TabPane tab="ACCOMMODATION" key="2">
                        <div >
                            <Card bordered={false} style={{ paddingBottom: "0px", paddingTop: "0px" }}>
                                <div style={{ fontSize: "12px" }}>
                                    <div>
                                        <AccomCheckboxGroup itemAccomType={ACCOM_TYPES} onAccomSelectboxChangeResult={handleAccomSelectboxChangeResult} />
                                        <Row>
                                            <Col span={12} style={{ top: "2em" }} >
                                                <Search
                                                    placeholder="input search text"
                                                    onSearch={value => console.log(value)}
                                                    style={{ fontSize: "12px", height: "auto" }}
                                                    size='small'
                                                />
                                            </Col>
                                        </Row>
                                        <AccomImage itemAccom={accomPlaceList} />
                                        {/* RIGHT */}
                                        <AccomAutoComplete visable={visable} itemAccom={accomPlaceList} onAccomAutoCompleteResult={handleAccomAutoCompleteResult} />
                                        <AccomCheckInCheckOut visable={visable} itemAccomRoomList={accomRoomList} addDay={props.dayActivity} onSelectedAccomValueRoom={handleSelectedAccomValueRoom} onSelectedRoomtype={handdleSelectedRoomtype} />
                                        <AccomPrice visable={visable} itemAccom={accomPlaceList} AcRoomValue={accomActivity.reference.roomValue} acRoomTypeSelected={accomActivity.reference.roomType} onAccomGetPrice={handleAccomGetPrice} />
                                        <AccomInputText visable={visable} onAccomInputText={handleAccomInputText} />
                                    </div>
                                </div>
                            </Card>
                        </div >
                    </TabPane>
                    <TabPane tab="TRANSPORTATION" key="3">
                        <div >
                            <Card bordered={false}>
                                <div style={{ fontSize: "12px" }}>
                                    <TsLocation visable={visable} onTsLocationResult={handleTsLocationResult} />
                                    <TsAutocomplete visable={visable} itemTran={tranCarModel} onTsAutoCompleteResult={handleTsAutoCompleteResult} />
                                    <TsPickupDropoffDay visable={visable} addDay={props.dayActivity} onTsPickupDropoffResult={handleTsPickupDropoffResult} />
                                    <TsinputText visable={visable} onTsInputResult={handleTsInputResult} />
                                    <TsPrice visable={visable} onTsPriceResult={handleTsPriceResult} itemTran={tranCarModel} selectedCarModel={tranActivity.carModel} />
                                </div>
                            </Card>
                        </div >
                    </TabPane>
                    <TabPane tab="OTHER" key="4">
                        <div>
                            <Card bordered={false}>
                                <div style={{ fontSize: "12px" }}>
                                    <OtherTimepicker visable={visable} onOtherTimeResult={handleOtherTimeResult} />
                                    <OtherInputText visable={visable} onOtherActivityResult={handleOtherActivityResult} />
                                </div>
                            </Card>
                        </div >
                    </TabPane>
                </Tabs>
            </Modal>
        </React.Fragment>
    )
}

export default ModalActivity;