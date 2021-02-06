// import React, { useContext, useState, useEffect, useRef } from 'react'
// import { Tabs, AutoComplete, Checkbox, Modal, Row, Col, Button, Card, Select, Form, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Table, DatePicker, Space, TimePicker, InputNumber } from 'antd';
// import { DownOutlined, SaveOutlined, DeleteOutlined, CloseOutlined, PlusCircleOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
// import Datetime from 'react-datetime';
// import { sortableHandle } from 'react-sortable-hoc';
// import moment from 'moment';
// import { useDrag, useDrop } from 'react-dnd';
// import NumberFormat from 'react-number-format';


// import styles from '../../App.css'
// import "react-datetime/css/react-datetime.css";
// import { defaultState } from './initState';


// //global class element
// const { Text, Title } = Typography
// const { TextArea } = Input;
// const arrayMove = require('array-move');
// const time_format = 'HH:mm';
// const dateFormat = 'YYYY-MM-DD';
// const DragHandle = sortableHandle(() => (
//     <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
// ));
// const { Option } = Select;
// const { TabPane } = Tabs;
// const { Search } = Input;
// const { Meta } = Card;
// const axios = require('axios');

// let one = 'http://13.229.16.186:5000/api/customer/'
// let two = 'http://13.229.16.186:5000/api/accommodation/'
// let three = 'http://13.229.16.186:5000/api/poi/'
// let four = 'http://13.229.16.186:5000/api/transportation/'
// let five = 'http://13.229.16.186:5000/api/itinerary/'

// const request_customer = axios.get(one);
// const request_accom = axios.get(two);
// const request_poi = axios.get(three);
// const request_transport = axios.get(four);
// const request_itinerary = axios.get(five);

// class modalActivity extends React.Component {

//     constructor(props) {

//         super();
//         axios.all([request_customer, request_accom, request_poi, request_transport, request_itinerary]).then(axios.spread(async (...response) => {
//             const response_customer = await response[0];
//             const response_accom = await response[1];
//             const response_poi = await response[2];
//             const response_transport = await response[3];
//             const response_itinerary = await response[4];
//             // console.log('axios multiple ==>', response_customer.data, response_accom.data)
//             this.setState({
//                 item_customer: response_customer.data,
//                 item_accom: response_accom.data,
//                 item_poi: response_poi.data,
//                 item_transport: response_transport.data,
//                 item_itinerary: response_itinerary.data
//             })
//         })
//         ).catch(error => {
//             console.error(error);
//             this.setState({
//                 error: error
//             })
//         })
//         this.current_date = new Date().toLocaleDateString()
//         this.doc_id = "QUA" + moment(Date.now()).format("YYYYMM") + "-" + "000"

//         console.log({ "ACTIVITY PROPS ==>": this.props })
//         this.state.visible = this.props.visible
//         this.state = defaultState
//         // [visible, setVisible] = useState(defaultState.visible)

//     }

//     //event input
//     handleInputChange = (event) => {
//         const target = event.target;
//         const { name, value } = target
//         this.setState({
//             [name]: value
//         });
//     }


//     //even modal
//     showModal = () => {
//         // re state modal poi
//         this.state.modal_poi.select_place = ""
//         this.state.modal_poi.time = "00:00"
//         this.state.modal_poi.date_activities = ""
//         this.state.modal_poi.adult_price = 0
//         this.state.modal_poi.child_price = 0
//         this.state.modal_poi.infant_price = 0
//         this.state.modal_poi.total_price = 0
//         this.state.modal_poi.dropdown_adult = 1
//         this.state.modal_poi.dropdown_child = 1
//         this.state.modal_poi.dropdown_infant = 1

//         // re state modal accom
//         this.state.modal_accom.select_property_name = ""
//         this.state.modal_accom.select_roomtype = ""
//         // this.state.modal_accom.ac_room = 1
//         this.state.modal_accom.ac_checkin = ""
//         this.state.modal_accom.date_checkin = ""
//         this.state.modal_accom.checkin_time = "00:00"
//         this.state.modal_accom.ac_checkout = "Day 1"
//         this.state.modal_accom.checkout_time = "00:00"
//         this.state.modal_accom.ac_today_price = 0
//         this.state.modal_accom.ac_total_price = 0
//         this.state.modal_accom.ac_extra_price = 0
//         this.state.modal_accom.note = ""

//         // re state modal transport
//         this.state.modal_transport.name = ""
//         this.state.modal_transport.p_location = "Suvarnabhumi Airport"
//         this.state.modal_transport.d_location = "Suvarnabhumi Airport"
//         this.state.modal_transport.select_carmodel = ""
//         this.state.modal_transport.pickup = ""
//         this.state.modal_transport.pickup_time = "00:00"
//         this.state.modal_transport.dropoff = "Day 1"
//         this.state.modal_transport.dropoff_time = "00:00"
//         this.state.modal_transport.quantity = 1
//         this.state.modal_transport.carseat_value = 1
//         this.state.modal_transport.quantity_price = 0
//         this.state.modal_transport.carseat_price = 0
//         this.state.modal_transport.extra_price = 0
//         this.state.modal_transport.total_price = 0
//         this.state.modal_transport.note = ""

//         // re state modal other
//         this.state.modal_other.time = "00:00"
//         this.state.modal_other.note = ""

//         this.setState({
//             visible: true,
//         });
//         console.log({ "Type_Modal ==>": this.state.type_modal })
//         this.state.poi_place = []
//         if (this.state.type_modal === "modal_POI") {
//             this.state.item_poi.map(data => {
//                 this.setState(prevState => ({
//                     poi_place: [...prevState.poi_place, { "value": data.display_name }]
//                 }))
//             });
//         }
//     };

//     handleOk = e => {
//         const { count_dataSource_1, dataOnDay } = this.state;
//         // check type modal
//         var dataTable;
//         var data_activity;
//         if (this.state.type_modal === "modal_POI") {
//             dataTable = {
//                 key: count_dataSource_1,
//                 time: this.state.modal_poi.time,
//                 day: this.state.on_day,
//                 date: this.state.oneday_date,
//                 activities: this.state.modal_poi.select_place,
//                 price: this.state.modal_poi.total_price,
//                 markup: this.state.markup_margin,
//                 subtotal: this.state.subtotal,
//                 reference: {
//                     type_modal: this.state.type_modal,
//                     adult_price: this.state.modal_poi.adult_price,
//                     child_price: this.state.modal_poi.child_price,
//                     infant_price: this.state.modal_poi.infant_price,
//                     value_adult: this.state.modal_poi.dropdown_adult,
//                     value_child: this.state.modal_poi.dropdown_child,
//                     value_infant: this.state.modal_poi.dropdown_infant,
//                     note: this.state.modal_poi.note,
//                 },
//             }
//         }
//         if (this.state.type_modal === "modal_Accom") {

//             dataTable = {
//                 key: count_dataSource_1,
//                 time: this.state.modal_accom.checkin_time,
//                 day: this.state.on_day,
//                 date: this.state.oneday_date,
//                 activities: this.state.modal_accom.select_property_name,
//                 price: this.state.modal_accom.ac_total_price,
//                 markup: this.state.markup_margin,
//                 subtotal: this.state.subtotal,
//                 reference: {
//                     type_modal: this.state.type_modal,
//                     ac_checkin: this.state.modal_accom.ac_checkin,
//                     ac_checkout: this.state.modal_accom.ac_checkout,
//                     ac_extra_price: this.state.modal_accom.ac_extra_price,
//                     ac_room: this.state.modal_accom.select_roomtype,
//                     ac_today_price: this.state.modal_accom.ac_today_price,
//                     ac_checkin_time: this.state.modal_accom.ac_checkin_time,
//                     ac_checkout_time: this.state.modal_accom.ac_checkout_time,
//                     note: this.state.modal_accom.note,
//                 }
//             }
//         }
//         if (this.state.type_modal === "modal_Transport") {

//             dataTable = {
//                 key: count_dataSource_1,
//                 time: this.state.modal_transport.pickup_time,
//                 day: this.state.on_day,
//                 date: this.state.oneday_date,
//                 activities: this.state.modal_transport.select_carmodel,
//                 price: this.state.modal_transport.total_price,
//                 markup: this.state.markup_margin,
//                 subtotal: this.state.subtotal,
//                 reference: {
//                     type_modal: this.state.type_modal,
//                     pickup_location: this.state.modal_transport.p_location,
//                     dropoff_location: this.state.modal_transport.d_location,
//                     pickup_day: this.state.modal_transport.pickup,
//                     pickup_day: this.state.modal_transport.pickup_time,
//                     dropoff_day: this.state.modal_transport.dropoff,
//                     dropoff_day: this.state.modal_transport.dropoff_time,
//                     quantity_car: this.state.modal_transport.quantity,
//                     quantity_price: this.state.modal_transport.quantity_price,
//                     car_seat: this.state.modal_transport.carseat_value,
//                     car_seat_price: this.state.modal_transport.carseat_price,
//                     extra: this.state.modal_transport.extra_price,
//                     note: this.state.modal_transport.note,
//                 }
//             }

//         }
//         if (this.state.type_modal === "modal_Other") {
//             dataTable = {
//                 key: count_dataSource_1,
//                 time: this.state.modal_other.time,
//                 day: this.state.on_day,
//                 date: this.state.oneday_date,
//                 activities: this.state.modal_other.note,
//                 price: this.state.modal_other.price,
//                 markup: this.state.markup_margin,
//                 subtotal: this.state.subtotal,
//                 reference: {
//                     type_modal: this.state.type_modal,
//                 }
//             }
//         }
//         console.log({ "NEWDATA ADD TO TABLE ==> ": dataTable })
//         let data = [...this.state.dataSourceOneDay];
//         let index = data.findIndex(el => el.day.props.value === dataTable.day);
//         dataOnDay.push(dataTable)
//         data[index] = { ...data[index], dataOnDay };
//         this.setState({
//             dataSourceOneDay: data,
//             visible: false,
//             count_dataSource_1: +1
//         });
//     };

//     handleCancel = e => {
//         this.setState({
//             visible: false,
//         });
//     };

//     callback = (key) => {
//         if (key === "1") {
//             this.setState({
//                 type_modal: "modal_POI"
//             })
//             this.state.poi_place = []
//             this.state.item_poi.map(data => {
//                 this.setState(prevState => ({
//                     poi_place: [...prevState.poi_place, { "value": data.display_name }]
//                 }))
//             });
//         }
//         if (key === "2") {
//             this.setState({
//                 type_modal: "modal_Accom"
//             })
//             this.state.ac_property_name = []
//             this.state.item_accom.map(data => {
//                 this.setState(prevState => ({
//                     ac_property_name: [...prevState.ac_property_name, { "value": data.property_name }]
//                 }))
//             });
//         }
//         if (key === "3") {
//             this.state.tran_carmodel = []
//             this.state.item_transport.map(data => {
//                 this.setState(prevState => ({
//                     tran_carmodel: [...prevState.tran_carmodel, { "value": data.car_model }]
//                 }))
//             })
//             this.setState({
//                 type_modal: "modal_Transport"
//             })
//         }
//         if (key === "4") {
//             this.setState({
//                 type_modal: "modal_Other"
//             })
//         }
//     }

//     value_adult = ({ key }, adult) => {
//         this.setState({
//             adult: key
//         })
//         message.info(`Click on item ${key}`);
//     };

//     // fn modal poi 
//     poi_auto_change = async (data) => {
//         await this.setState(prevState => ({
//             modal_poi: { ...prevState.modal_poi, select_place: data }
//         }))
//         this.state.item_poi.map(res => {
//             if (res.display_name === data) {
//                 console.log("PRICE ==>", res.adult_price)
//                 this.setState(prevState => ({
//                     modal_poi: { ...prevState.modal_poi, adult_price: res.adult_price },
//                 }))
//                 this.setState(prevState => ({
//                     modal_poi: { ...prevState.modal_poi, child_price: res.child_price }
//                 }))
//                 this.setState(prevState => ({
//                     modal_poi: { ...prevState.modal_poi, infant_price: res.infant_price }
//                 }))
//             }
//         })
//     }
//     value_poi_adult = ({ key }) => {
//         this.setState(prevState => ({
//             modal_poi: { ...prevState.modal_poi, dropdown_adult: key },
//         }))
//         message.info(`Click on item ${key}`);
//     };
//     value_poi_child = ({ key }) => {
//         this.setState(prevState => ({
//             modal_poi: { ...prevState.modal_poi, dropdown_child: key }
//         }))
//         message.info(`Click on item ${key}`);
//     };
//     value_poi_infant = ({ key }) => {
//         this.setState(prevState => ({
//             modal_poi: { ...prevState.modal_poi, dropdown_infant: key }
//         }))
//         message.info(`Click on item ${key}`);
//     };
//     onSelectboxChangePoi = (checkedValues) => {
//         // const check_option = this.state
//         this.setState({
//             poi_check_option: checkedValues
//         });

//     }
//     onChangePOITime = (time, timeString) => {
//         console.log(time, timeString)
//         this.setState(prevState => ({
//             modal_poi: { ...prevState.modal_poi, time: timeString }
//         }))
//     }
//     onChangePOI_Adult_Price = (value) => {
//         this.setState(prevState => ({
//             modal_poi: { ...prevState.modal_poi, adult: value }
//         }))
//     }
//     onChangePOI_Child_Price = (value) => {
//         this.setState(prevState => ({
//             modal_poi: { ...prevState.modal_poi, child: value }
//         }))
//     }
//     onChangePOI_Infan_Price = (value) => {
//         this.setState(prevState => ({
//             modal_poi: { ...prevState.modal_poi, infant: value }
//         }))
//     }
//     handleInputChangePOI = (event) => {
//         const target = event.target;
//         const { name, value } = target
//         this.setState(prevState => ({
//             modal_poi: { ...prevState.modal_poi, [name]: value }
//         }));
//     }
//     // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//     // fn_modal_Accom
//     // value dropdown roomtype
//     accom_value_roomtype = ({ key }) => {
//         this.setState(prevState => ({
//             modal_accom: { ...prevState.modal_accom, select_roomtype: key }
//         }))
//         // this.setState({
//         //     select_roomtype: key
//         // })
//         message.info(`Click on item ${key}`);

//     };
//     accom_value_checkin = ({ key }, checkin) => {
//         this.setState(prevState => ({
//             modal_accom: { ...prevState.modal_accom, ac_checkin: key },
//         }))
//         this.setState(prevState => ({
//             modal_accom: { ...prevState.modal_accom, date_checkin: this.state.oneday_date }
//         }))
//         message.info(`Click on item ${key}`);
//     };
//     // autocomplete
//     ac_auto_change = (data) => {
//         this.setState(prevState => ({
//             modal_accom: { ...prevState.modal_accom, select_property_name: data }
//         }))
//         this.state.item_accom.map(res => {
//             if (res.property_name === data) {
//                 this.state.ac_room_type = []
//                 res.datasource_allroom.map(res => {
//                     this.setState(prevState => ({
//                         ac_room_type: [...prevState.ac_room_type, res.room_type],
//                     }))
//                 })
//             }
//         })
//     }
//     // handlechangeinput
//     handleInputChangeAccom = (event) => {
//         const target = event.target;
//         const { name, value } = target
//         // this.setState({
//         //     [name]: value
//         // });
//         this.setState(prevState => ({
//             modal_accom: { ...prevState.modal_accom, [name]: value }
//         }));
//     }
//     //modal_fn_accom
//     onSelectboxChangeAccom = (checkedValues) => {
//         // const check_option = this.state
//         this.setState({
//             ac_check_option: checkedValues
//         });
//     }

//     onChangeAccomTodayPrice = (value) => {
//         this.setState(prevState => ({
//             modal_accom: { ...prevState.modal_accom, today_price: value }
//         }))
//     }
//     onChangeAccomExtraPrice = (value) => {
//         this.setState(prevState => ({
//             modal_accom: { ...prevState.modal_accom, ac_extra_price: value }
//         }))
//         // this.setState({
//         //     ac_extra_price: value
//         // })
//     }
//     onChangeCheckInTime = (time, timeString) => {
//         this.setState(prevState => ({
//             modal_accom: { ...prevState.modal_accom, checkin_time: timeString }
//         }))
//     }
//     onChangeCheckoutTime = (time, timeString) => {
//         this.setState(prevState => ({
//             modal_accom: { ...prevState.modal_accom, checkout_time: timeString }
//         }))
//     }
//     // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//     // fn modal transport
//     tran_auto_change = (data) => {
//         this.setState(prevState => ({
//             modal_transport: { ...prevState.modal_transport, select_carmodel: data }
//         }))
//         this.state.item_transport.map(res => {
//             if (res.car_model === data) {
//                 this.setState(prevState => ({
//                     modal_transport: { ...prevState.modal_transport, quantity_price: res.price, carseat_price: res.car_seat }
//                 }))
//             }
//         })
//     }
//     tran_value_pickup = ({ key }) => {
//         this.setState(prevState => ({
//             modal_transport: { ...prevState.modal_transport, pickup: key }
//         }))
//         message.info(`Click on item ${key}`);
//     };
//     tran_value_dropoff = ({ key }) => {
//         this.setState(prevState => ({
//             modal_transport: { ...prevState.modal_transport, dropoff: key }
//         }))
//         message.info(`Click on item ${key}`);
//     };
//     tran_value_carseat = ({ key }) => {
//         this.setState(prevState => ({
//             modal_transport: { ...prevState.modal_transport, carseat_value: key, carseat_price: this.state.modal_transport.carseat_price * key }
//         }))
//         message.info(`Click on item ${key}`);
//     };
//     onChangeMT = (checkedValues) => {
//         console.log('checked = ', checkedValues);
//     }
//     handleInputChangeMT = (event) => {
//         const target = event.target;
//         const { name, value } = target
//         this.setState(prevState => ({
//             modal_transport: { ...prevState.modal_transport, [name]: value }
//         }));
//     }
//     onChangePickupTime = (time, timeString) => {
//         this.setState(prevState => ({
//             modal_transport: { ...prevState.modal_transport, pickup_time: timeString }
//         }))
//     }
//     onChangeDropoffTime = (time, timeString) => {
//         console.log(time, timeString)
//         this.setState(prevState => ({
//             modal_transport: { ...prevState.modal_transport, dropoff_time: timeString }
//         }))
//     }
//     onChangeQuantityPrice = (value) => {
//         console.log(value)
//         this.setState(prevState => ({
//             modal_transport: { ...prevState.modal_transport, quantity_price: value }
//         }))
//     }
//     onChangeCarseatPrice = (value) => {
//         console.log(value)
//         this.setState(prevState => ({
//             modal_transport: { ...prevState.modal_transport, carseat_price: value }
//         }))
//     }
//     onChangeExtraPrice = (value) => {
//         this.setState(prevState => ({
//             modal_transport: { ...prevState.modal_transport, extra_price: value }
//         }))
//     }
//     // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//     //  fn modal other
//     otherHandleInputChange = (event) => {
//         const target = event.target;
//         const { name, value } = target
//         this.setState(prevState => ({
//             modal_other: { ...prevState.modal_other, [name]: value }
//         }));
//     }
//     onChangeOtherTime = (time, timeString) => {
//         this.setState(prevState => ({
//             modal_other: { ...prevState.modal_other, time: timeString }
//         }))
//     }

//     render() {
//         console.log("MODAL ACTIVITY", this.state.visible)
//         // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//         // price POI
//         const sum_adult = this.state.modal_poi.adult_price * this.state.modal_poi.dropdown_adult
//         const sum_child = this.state.modal_poi.child_price * this.state.modal_poi.dropdown_child
//         const sum_infant = this.state.modal_poi.infant_price * this.state.modal_poi.dropdown_infant
//         const poi_totalprice = sum_adult + sum_child + sum_infant
//         this.state.modal_poi.total_price = poi_totalprice
//         // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//         // price accom
//         this.state.item_accom.map(res_item => {
//             res_item.datasource_allroom.map(res_allroom => {
//                 // console.log({ "CHECK ===>": res_allroom.room_type === this.state.select_roomtype, "ROOMTYPE ===>": res_allroom.room_type, "SELECTROOMTYPE ===>": this.state.modal_accom.select_roomtype })
//                 if (res_allroom.room_type === this.state.modal_accom.select_roomtype) {
//                     this.state.modal_accom.ac_today_price = res_allroom.today_price
//                 }
//             })
//         })
//         this.state.modal_accom.ac_today_price = this.state.modal_accom.ac_today_price * this.state.modal_accom.ac_room
//         this.state.modal_accom.ac_total_price = this.state.modal_accom.ac_today_price + this.state.modal_accom.ac_extra_price
//         const ac_room_type = this.state.ac_room_type
//         const ac_checkin = this.state.add_day
//         // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//         // price transportation
//         const quantity_price = this.state.modal_transport.quantity_price
//         const carseat_price = this.state.modal_transport.carseat_price
//         this.state.modal_transport.total_price = quantity_price + carseat_price + this.state.modal_transport.extra_price

//         // autocompete accom 
//         const options_accom = this.state.ac_property_name;
//         // autocomplete poi 
//         const options_poi = this.state.poi_place;
//         // autocomplete transport
//         const options_transport = this.state.tran_carmodel;

//         // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//         //dropdown main page
//         const adult_menu = (
//             <Menu onClick={this.value_adult}>
//                 <Menu.Item key='0'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         0
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='1'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         1
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='2'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         2
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='3'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         3
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='4'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         4
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='5'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         5
//                     </span>
//                 </Menu.Item>
//             </Menu>
//         );

//         //dropdown
//         const value_child = ({ key }, child) => {
//             this.setState({
//                 child: key
//             })
//             message.info(`Click on item ${key}`);
//         };
//         const child_menu = (
//             <Menu onClick={value_child}>
//                 <Menu.Item key='0'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         0
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key='1'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         1
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key='2'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         2
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key='3'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         3
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key='4'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         4
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key='5'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         5
//                             </span>
//                 </Menu.Item>
//             </Menu>
//         );

//         //dropdown
//         const value_infant = ({ key }, infant) => {
//             this.setState({
//                 infant: key
//             })
//             message.info(`Click on item ${key}`);
//         };
//         const infant_menu = (
//             <Menu onClick={value_infant}>
//                 <Menu.Item key='0'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         0
//                                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='1'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         1
//                                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='2'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         2
//                                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='3'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         3
//                                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='4'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         4
//                                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='5'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         5
//                                     </span>
//                 </Menu.Item>
//             </Menu>
//         );
//         //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//         //dropdown MP
//         const poi_adult_menu = (
//             <Menu onClick={this.value_poi_adult}>
//                 {/* <Menu.Item key={0}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         0
//                     </span>
//                 </Menu.Item> */}
//                 <Menu.Item key={1}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         1
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key={2}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         2
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key={3}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         3
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key={4}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         4
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key={5}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         5
//                     </span>
//                 </Menu.Item>
//             </Menu>
//         );
//         //dropdown
//         const poi_child_menu = (
//             <Menu onClick={this.value_poi_child}>
//                 {/* <Menu.Item key={0}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         0
//                                             </span>
//                 </Menu.Item> */}
//                 <Menu.Item key={1}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         1
//                                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={2}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         2
//                                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={3}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         3
//                                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={4}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         4
//                                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={5}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         5
//                                             </span>
//                 </Menu.Item>
//             </Menu>
//         );
//         //dropdown
//         const poi_infant_menu = (
//             <Menu onClick={this.value_poi_infant}>
//                 {/* <Menu.Item key={0}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         0
//                                             </span>
//                 </Menu.Item> */}
//                 <Menu.Item key={1}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         1
//                                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={2}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         2
//                                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={3}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         3
//                                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={4}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         4
//                                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={5}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         5
//                     </span>
//                 </Menu.Item>
//             </Menu>
//         );
//         //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//         //dropdown MA
//         const accom_value_room = ({ key }, room) => {
//             this.setState(prevState => ({
//                 modal_accom: { ...prevState.modal_accom, ac_room: key }
//             }))
//             message.info(`Click on item ${key}`);
//         };
//         const accom_room_menu = (
//             <Menu onClick={accom_value_room}>
//                 <Menu.Item key='1'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         1
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key='2'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         2
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key='3'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         3
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key='4'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         4
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key='5'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         5
//                             </span>
//                 </Menu.Item>
//             </Menu>
//         );
//         //dropdown
//         const accom_roomtype_menu = (
//             <Menu onClick={this.accom_value_roomtype}>
//                 {ac_room_type.map(res => {
//                     return <Menu.Item key={res}>
//                         <span target="_blank" rel="noopener noreferrer" >
//                             {res}
//                         </span>
//                     </Menu.Item>
//                 })}
//             </Menu>
//         );
//         //dropdown
//         const accom_checkin_menu = (
//             <Menu onClick={this.accom_value_checkin}>
//                 {ac_checkin.map(res => {
//                     // console.log(res)
//                     return <Menu.Item key={res}>
//                         <span target="_blank" rel="noopener noreferrer" >
//                             {res}
//                         </span>
//                     </Menu.Item>
//                 })}
//             </Menu>
//         );
//         //dropdown
//         const accom_value_checkout = ({ key }, checkout) => {
//             this.setState(prevState => ({
//                 modal_accom: { ...prevState.modal_accom, ac_checkout: key }
//             }))
//             message.info(`Click on item ${key}`);
//         };
//         const accom_checkout_menu = (
//             <Menu onClick={accom_value_checkout}>
//                 <Menu.Item key='DAY 1'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Day 1
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='DAY 2'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Day 2
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='DAY 3'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Day 3
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='DAY 4'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Day 4
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='DAY 5'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Day 5
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='DAY 6'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Day 6
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='DAY 7'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Day 7
//                     </span>
//                 </Menu.Item>
//             </Menu>
//         );
//         //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//         //dropdown MT
//         const value_pickup_location = ({ key }) => {
//             this.setState(prevState => ({
//                 modal_transport: { ...prevState.modal_transport, p_location: key }
//             }))
//             message.info(`Click on item ${key}`);
//         };
//         const p_location_menu = (
//             <Menu onClick={value_pickup_location}>
//                 <Menu.Item key='Suvarnabhumi Airport'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Suvarnabhumi Airport
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='Don Mueang Airport'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Don Mueang Airport
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='Phuket Airport'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Phuket Airport
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='Chiang Mai Airport'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Chiang Mai Airport
//                     </span>
//                 </Menu.Item>
//             </Menu>
//         );
//         //dropdown
//         const value_dropoff_location = ({ key }) => {

//             this.setState(prevState => ({
//                 modal_transport: { ...prevState.modal_transport, d_location: key }
//             }))
//             message.info(`Click on item ${key}`);
//         };
//         const d_location_menu = (
//             <Menu onClick={value_dropoff_location}>
//                 <Menu.Item key='Suvarnabhumi Airport'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Suvarnabhumi Airport
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='Don Mueang Airport'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Don Mueang Airport
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='Phuket Airport'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Phuket Airport
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='Chiang Mai Airport'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Chiang Mai Airport
//                     </span>
//                 </Menu.Item>
//             </Menu>
//         );
//         //dropdown
//         const pickup_menu = (
//             <Menu onClick={this.tran_value_pickup}>
//                 {/* {ac_checkin.map(res => {
//                     return <Menu.Item key={res}>
//                         <span target="_blank" rel="noopener noreferrer" >
//                             {res}
//                         </span>
//                     </Menu.Item>
//                 })} */}
//                 <Menu.Item key={this.state.on_day}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         {this.state.on_day}
//                     </span>
//                 </Menu.Item>
//             </Menu>
//         );
//         //dropdown
//         const dropoff_menu = (
//             <Menu onClick={this.tran_value_dropoff}>
//                 <Menu.Item key='Day 1'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Day 1
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='Day 2'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Day 2
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='Day 3'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Day 3
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='DAY 4'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Day 4
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='Day 5'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Day 5
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='DAY 6'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Day 6
//                     </span>
//                 </Menu.Item>
//                 <Menu.Item key='Day 7'>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         Day 7
//                     </span>
//                 </Menu.Item>
//             </Menu>
//         );
//         //dropdown
//         const value_quantity = ({ key }) => {
//             this.setState(prevState => ({
//                 modal_transport: { ...prevState.modal_transport, quantity: key, quantity_price: this.state.modal_transport.quantity_price * key }
//             }))
//             message.info(`Click on item ${key}`);
//         };
//         const quantity_menu = (
//             <Menu onClick={value_quantity}>
//                 <Menu.Item key={1}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         1
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={2}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         2
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={3}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         3
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={4}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         4
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={5}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         5
//                             </span>
//                 </Menu.Item>
//             </Menu>
//         );
//         //dropdown
//         const carseat_menu = (
//             <Menu onClick={this.tran_value_carseat}>
//                 <Menu.Item key={1}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         1
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={2}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         2
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={3}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         3
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={4}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         4
//                             </span>
//                 </Menu.Item>
//                 <Menu.Item key={5}>
//                     <span target="_blank" rel="noopener noreferrer" >
//                         5
//                             </span>
//                 </Menu.Item>
//             </Menu>
//         );
//         //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//         return (
//             <Modal
//                 visible={this.state.visible}
//                 onOk={this.handleOk}
//                 onCancel={this.handleCancel}
//                 width={'1200px'}
//                 style={{ marginTop: "-100px" }}
//             >
//                 <Tabs defaultActiveKey="1" size={"small"} onChange={this.callback}>
//                     <TabPane tab="POI" key="1">
//                         {/* Tab POI */}
//                         <div>
//                             <Card bordered={false} style={{ paddingBottom: "0px", paddingTop: "0px" }}>
//                                 <div style={{ fontSize: "12px" }}>
//                                     {/* Col 24 */}
//                                     <div>
//                                         <Checkbox.Group value={this.state.poi_check_option} onChange={this.onSelectboxChangePoi}>
//                                             <Row style={{ height: "0" }}>
//                                                 <Col span={8}>
//                                                     <Checkbox value="ATTRACTION">ATTRACTION</Checkbox>
//                                                 </Col>
//                                                 <Col span={8}>
//                                                     <Checkbox value="RESTAURANT">RESTAURANT</Checkbox>
//                                                 </Col>
//                                                 <Col span={8}>
//                                                     <Checkbox value="SHOPPING">SHOPPING</Checkbox>
//                                                 </Col>
//                                                 <Col span={8}>
//                                                     <Checkbox value="BEAUTY & SPA">BEAUTY & SPA</Checkbox>
//                                                 </Col>
//                                                 <Col span={8}>
//                                                     <Checkbox value="ENTERTAINMENT">ENTERTAINMENT</Checkbox>
//                                                 </Col>
//                                                 <Col span={8}>
//                                                     <Checkbox value="EXPERIENCE">EXPERIENCE</Checkbox>
//                                                 </Col>
//                                             </Row>
//                                         </Checkbox.Group>
//                                         <Row>
//                                             <Col span={2} offset={14} style={{ bottom: "2em" }}>
//                                                 <Text>PLACE</Text>
//                                             </Col>
//                                             <Col span={6} style={{ bottom: "2em" }}>
//                                                 <Space>
//                                                     <AutoComplete
//                                                         tabIndex={1}
//                                                         dropdownClassName="certain-category-search-dropdown"
//                                                         dropdownMatchSelectWidth={200}
//                                                         style={{ fontSize: "12px", height: "auto", width: 'auto' }}
//                                                         options={options_poi}
//                                                         filterOption={(inputValue, option) =>
//                                                             option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
//                                                         }
//                                                         value={this.state.modal_poi.select_place}
//                                                         onChange={this.poi_auto_change}
//                                                     >
//                                                         <Input.Search size="small" placeholder="SEARCH PLACE" />
//                                                     </AutoComplete>
//                                                     <Button size={"small"} icon={<PlusCircleOutlined style={{ color: "white", marginTop: "-5px", marginLeft: "-4px", fontSize: "13px" }} />} style={{ width: "20px", height: "20px", background: '#1890ff' }}></Button>
//                                                 </Space>
//                                             </Col>
//                                         </Row>
//                                         <br />
//                                         <Row>
//                                             <Col span={11}>
//                                                 <Search
//                                                     placeholder="input search text"
//                                                     onSearch={value => console.log(value)}
//                                                     style={{ fontSize: "12px", height: "auto" }}
//                                                     size='small'
//                                                 />
//                                             </Col>
//                                             <Col span={2} offset={3} style={{ bottom: "3.5em" }}>
//                                                 <Text>TIME</Text>
//                                             </Col>
//                                             <Col span={6} style={{ bottom: "3.5em" }}>
//                                                 <TimePicker
//                                                     size={"small"}
//                                                     // defaultValue={moment('00:00', format)}
//                                                     value={moment(this.state.modal_poi.time, time_format)}
//                                                     onChange={this.onChangePOITime}
//                                                     format={time_format}
//                                                     style={{ width: "80px" }}
//                                                 />
//                                             </Col>
//                                         </Row>
//                                         <Row>
//                                             <Col span={1} >
//                                                 <Card
//                                                     style={{ width: 200, height: "auto" }}
//                                                     cover={
//                                                         <img
//                                                             alt="example"
//                                                             src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//                                                         />
//                                                     }
//                                                     actions={[
//                                                         "Detail",
//                                                         "Select"
//                                                     ]}
//                                                 >
//                                                     <Meta
//                                                         // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//                                                         title="Card title"
//                                                         description="This is the description"
//                                                     />
//                                                 </Card>
//                                             </Col>
//                                             <Col span={1} offset={6}>
//                                                 <Card
//                                                     style={{ width: 200, height: "auto" }}
//                                                     cover={
//                                                         <img
//                                                             alt="example"
//                                                             src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//                                                         />
//                                                     }
//                                                     actions={[
//                                                         "Detail",
//                                                         "Select"
//                                                     ]}
//                                                 >
//                                                     <Meta
//                                                         // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//                                                         title="Card title"
//                                                         description="This is the description"
//                                                     />
//                                                 </Card>
//                                             </Col>
//                                             <Col span={10} offset={6} style={{ bottom: "3em" }}>
//                                                 <Text strong>TICKETS AND PRICE:</Text>
//                                             </Col>
//                                         </Row>
//                                         <br />
//                                         <Row>
//                                             <Col span={1} >
//                                                 <Card
//                                                     style={{ width: 200, height: "auto" }}
//                                                     cover={
//                                                         <img
//                                                             alt="example"
//                                                             src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//                                                         />
//                                                     }
//                                                     actions={[
//                                                         "Detail",
//                                                         "Select"
//                                                     ]}
//                                                 >
//                                                     <Meta
//                                                         // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//                                                         title="Card title"
//                                                         description="This is the description"
//                                                     />
//                                                 </Card>
//                                             </Col>
//                                             <Col span={1} offset={6}>
//                                                 <Card
//                                                     style={{ width: 200, height: "auto" }}
//                                                     cover={
//                                                         <img
//                                                             alt="example"
//                                                             src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//                                                         />
//                                                     }
//                                                     actions={[
//                                                         "Detail",
//                                                         "Select"
//                                                     ]}
//                                                 >
//                                                     <Meta
//                                                         // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//                                                         title="Card title"
//                                                         description="This is the description"
//                                                     />
//                                                 </Card>
//                                             </Col>
//                                             <Col span={2} offset={6} style={{ bottom: "24.5em" }}>
//                                                 <Text>ADULT(12+)</Text>
//                                             </Col>
//                                             <Col span={7} offset={1} style={{ bottom: "24.5em" }}>
//                                                 <Space>
//                                                     <InputNumber
//                                                         size={"small"}
//                                                         value={this.state.modal_poi.adult_price}
//                                                         disabled={true}
//                                                         formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                                         parser={value => value.replace(/^฿\s?|(,*)/g, '')}
//                                                     // formatter={currencyFormatter(this.state.currency)}
//                                                     // parser={currencyParser}
//                                                     // onChange={this.onChangePOI_Adult_Price}
//                                                     />
//                                                     <Text>x</Text>
//                                                     <Dropdown overlay={poi_adult_menu}>
//                                                         <Button size={"small"} style={{ width: "42.69px", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_poi.dropdown_adult}<DownOutlined /></Button>
//                                                     </Dropdown>
//                                                     <Text>=</Text>
//                                                     <div>
//                                                         <InputNumber
//                                                             size={"small"}
//                                                             value={sum_adult}
//                                                             disabled={true}
//                                                             formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                                             parser={value => value.replace(/^฿\s?|(,*)/g, '')}
//                                                         // formatter={currencyFormatter(this.state.currency)}
//                                                         // parser={currencyParser}
//                                                         // onChange={this.onChangePOI_Child_Price}
//                                                         />
//                                                     </div>
//                                                 </Space>
//                                             </Col>
//                                         </Row>
//                                         <Row style={{ height: "0px" }}>
//                                             <Col span={3} offset={14} style={{ bottom: "44em" }}>
//                                                 <Text>CHILD(4-11)</Text>
//                                             </Col>
//                                             <Col span={7} style={{ bottom: "44em" }}>
//                                                 <Space>
//                                                     <InputNumber
//                                                         size={"small"}
//                                                         value={this.state.modal_poi.child_price}
//                                                         disabled={true}
//                                                         formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                                         parser={value => value.replace(/^฿\s?|(,*)/g, '')}
//                                                     // formatter={currencyFormatter(this.state.currency)}
//                                                     // parser={currencyParser}
//                                                     // onChange={this.onChangePOI_Child_Price}
//                                                     />
//                                                     <Text>x</Text>
//                                                     <Dropdown overlay={poi_child_menu}>
//                                                         <Button size={"small"} style={{ width: "42.69px", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_poi.dropdown_child}<DownOutlined /></Button>
//                                                     </Dropdown>
//                                                     <Text>=</Text>
//                                                     <div>
//                                                         <InputNumber
//                                                             size={"small"}
//                                                             value={sum_child}
//                                                             disabled={true}
//                                                             formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                                             parser={value => value.replace(/^฿\s?|(,*)/g, '')}
//                                                         // formatter={currencyFormatter(this.state.currency)}
//                                                         // parser={currencyParser}
//                                                         // onChange={this.onChangePrice}
//                                                         />
//                                                     </div>

//                                                 </Space>
//                                             </Col>
//                                         </Row>
//                                         <Row style={{ height: "0px" }}>
//                                             <Col span={3} offset={14} style={{ bottom: "41.5em" }}>
//                                                 <Text>INFANT(below2)</Text>
//                                             </Col>
//                                             <Col span={7} style={{ bottom: "41.5em" }}>
//                                                 <Space>
//                                                     <InputNumber
//                                                         size={"small"}
//                                                         value={this.state.modal_poi.infant_price}
//                                                         disabled={true}
//                                                         formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                                         parser={value => value.replace(/^฿\s?|(,*)/g, '')}
//                                                         // formatter={currencyFormatter(this.state.currency)}
//                                                         // parser={currencyParser}
//                                                         onChange={this.onChangePOI_Infan_Price}
//                                                     />
//                                                     <Text>x</Text>
//                                                     <Dropdown overlay={poi_infant_menu}>
//                                                         <Button size={"small"} style={{ width: "42.69px", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_poi.dropdown_infant}<DownOutlined /></Button>
//                                                     </Dropdown>
//                                                     <Text>=</Text>
//                                                     <div>
//                                                         <InputNumber
//                                                             size={"small"}
//                                                             value={sum_infant}
//                                                             disabled={true}
//                                                             formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                                             parser={value => value.replace(/^฿\s?|(,*)/g, '')}
//                                                         // formatter={currencyFormatter(this.state.currency)}
//                                                         // parser={currencyParser}
//                                                         // onChange={this.onChangePrice}
//                                                         />
//                                                     </div>
//                                                 </Space>
//                                             </Col>
//                                         </Row>
//                                         <Row style={{ height: "0px" }}>
//                                             <Col span={4} offset={20} style={{ bottom: "39em", right: "7px" }}>
//                                                 <Space>
//                                                     <Text strong>TOTAL</Text>
//                                                     <div >
//                                                         <InputNumber
//                                                             size={"small"}
//                                                             value={this.state.modal_poi.total_price}
//                                                             readOnly
//                                                             disabled={true}
//                                                             formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                                             parser={value => value.replace(/^฿\s?|(,*)/g, '')}
//                                                         // formatter={currencyFormatter(this.state.currency)}
//                                                         // parser={currencyParser}
//                                                         />
//                                                     </div>

//                                                 </Space>
//                                             </Col>
//                                         </Row>
//                                         <Row style={{ height: "0px" }}>
//                                             <Col span={10} offset={14} style={{ bottom: "36.5em" }}>
//                                                 <TextArea
//                                                     name="note"
//                                                     placeholder="Additional notes ..."
//                                                     value={this.state.modal_poi.note}
//                                                     onChange={this.handleInputChangePOI}
//                                                     style={{ height: "auto", width: "100%" }}
//                                                     rows={10}
//                                                 />
//                                             </Col>
//                                         </Row>
//                                     </div>
//                                 </div>
//                             </Card>
//                         </div >
//                     </TabPane>
//                     <TabPane tab="ACCOMMODATION" key="2">
//                         {/* Tab Accom */}
//                         <div className={styles.sitecard_borderless_wrapper}>
//                             <Card bordered={false}>
//                                 <div style={{ fontSize: "12px" }}>
//                                     {/* Col 24 */}
//                                     <div>
//                                         <Checkbox.Group value={this.state.ac_check_option} onChange={this.onSelectboxChangeAccom}>
//                                             <Row style={{ height: "0" }}>
//                                                 <Col span={8}>
//                                                     <Checkbox value="HOTEL">HOTEL</Checkbox>
//                                                 </Col>
//                                                 <Col span={8}>
//                                                     <Checkbox value="APARTMENTS">APARTMENTS</Checkbox>
//                                                 </Col>
//                                                 <Col span={8}>
//                                                     <Checkbox value="GUESTHOUSES">GUESTHOUSES</Checkbox>
//                                                 </Col>
//                                                 <Col span={8}>
//                                                     <Checkbox value="RESORTS">RESORTS</Checkbox>
//                                                 </Col>
//                                                 <Col span={8}>
//                                                     <Checkbox value="VILLAS">VILLAS</Checkbox>
//                                                 </Col>
//                                                 <Col span={8}>
//                                                     <Checkbox value="CAPSULE HOTELS">CAPSULE HOTELS</Checkbox>
//                                                 </Col>
//                                             </Row>
//                                         </Checkbox.Group>
//                                         <Row>
//                                             <Col span={3} offset={14} style={{ bottom: "2em" }}>
//                                                 <Text>PROPERTY NAME</Text>
//                                             </Col>
//                                             <Col span={6} style={{ bottom: "2em" }}>
//                                                 <Space>
//                                                     <AutoComplete
//                                                         tabIndex={1}
//                                                         dropdownClassName="certain-category-search-dropdown"
//                                                         dropdownMatchSelectWidth={200}
//                                                         style={{ fontSize: "12px", height: "auto", width: 'auto' }}
//                                                         options={options_accom}
//                                                         filterOption={(inputValue, option) =>
//                                                             option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
//                                                         }
//                                                         value={this.state.modal_accom.select_property_name}
//                                                         // onSelect={this.ac_auto_select}
//                                                         onChange={this.ac_auto_change}
//                                                     >
//                                                         <Input.Search size="small" placeholder="SEARCH PROPERTY NAME" />
//                                                     </AutoComplete>
//                                                     <Button size={"small"} icon={<PlusCircleOutlined style={{ color: "white", marginTop: "-5px", marginLeft: "-4px", fontSize: "13px" }} />} style={{ width: "20px", height: "20px", background: '#1890ff' }}></Button>
//                                                 </Space>
//                                             </Col>
//                                         </Row>
//                                         <br />
//                                         <Row>
//                                             <Col span={12} >
//                                                 <Search
//                                                     placeholder="input search text"
//                                                     onSearch={value => console.log(value)}
//                                                     style={{ fontSize: "12px", height: "auto" }}
//                                                     size='small'
//                                                 />
//                                             </Col>
//                                             <Col span={2} offset={2} style={{ bottom: "3.5em" }}>
//                                                 <Text>ROOM TYPE</Text>
//                                             </Col>
//                                             <Col span={1} offset={1} style={{ bottom: "3.5em" }} >
//                                                 <Dropdown overlay={accom_roomtype_menu} >
//                                                     <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >
//                                                         {this.state.modal_accom.select_roomtype}<DownOutlined />
//                                                     </Button>
//                                                 </Dropdown>
//                                                 {/* <Select
//                                                                                         // onChange={value => {
//                                                                                         //     alert(value);
//                                                                                         // }}
//                                                                                         name="category"
//                                                                                         placeholder="Please select a category"
//                                                                                         size={"small"}
//                                                                                     >
//                                                                                         {this.state.ac_room_type &&
//                                                                                             Array.isArray(this.state.ac_room_type) &&
//                                                                                             this.state.ac_room_type.map(database => {
//                                                                                                 return <Option value={database}>{database}</Option>;
//                                                                                             })}
//                                                                                     </Select> */}
//                                             </Col>
//                                             <Col span={2} offset={4} style={{ bottom: "3.5em" }} >
//                                                 <Space>
//                                                     <Text>ROOM</Text>
//                                                     <Dropdown overlay={accom_room_menu} >
//                                                         <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_accom.ac_room}<DownOutlined /></Button>
//                                                     </Dropdown>
//                                                 </Space>
//                                             </Col>
//                                         </Row>
//                                         <Row>
//                                             {/* {this.state.item_accom.map(res => {
//                                                                                     console.log('img', res.image)
//                                                                                     return <Col span={5} >
//                                                                                         <Card
//                                                                                             style={{ width: 200, height: "auto" }}
//                                                                                             cover={
//                                                                                                 <img
//                                                                                                     alt="example"
//                                                                                                     // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//                                                                                                     src={res.image}
//                                                                                                 />
//                                                                                             }
//                                                                                             actions={[
//                                                                                                 "Detail",
//                                                                                                 "Select"
//                                                                                                 // <SettingOutlined key="setting" />,
//                                                                                                 // <EditOutlined key="edit" />,
//                                                                                                 // <EllipsisOutlined key="ellipsis" />,
//                                                                                             ]}
//                                                                                         >
//                                                                                             <Meta
//                                                                                                 // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//                                                                                                 title="Card title"
//                                                                                                 description="This is the description"
//                                                                                             />
//                                                                                         </Card>
//                                                                                     </Col>
//                                                                                 })
//                                                                                 } */}
//                                             <Col span={1} >
//                                                 <Card
//                                                     style={{ width: 200, height: "auto" }}
//                                                     cover={
//                                                         <img
//                                                             alt="example"
//                                                             src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//                                                         />
//                                                     }
//                                                     actions={[
//                                                         "Detail",
//                                                         "Select"
//                                                         // <SettingOutlined key="setting" />,
//                                                         // <EditOutlined key="edit" />,
//                                                         // <EllipsisOutlined key="ellipsis" />,
//                                                     ]}
//                                                 >
//                                                     <Meta
//                                                         // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//                                                         title="Card title"
//                                                         description="This is the description"
//                                                     />
//                                                 </Card>
//                                             </Col>
//                                             <Col span={1} offset={6}>
//                                                 <Card
//                                                     style={{ width: 200, height: "auto" }}
//                                                     cover={
//                                                         <img
//                                                             alt="example"
//                                                             src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//                                                         />
//                                                     }
//                                                     actions={[
//                                                         "Detail",
//                                                         "Select"
//                                                         // <SettingOutlined key="setting" />,
//                                                         // <EditOutlined key="edit" />,
//                                                         // <EllipsisOutlined key="ellipsis" />,
//                                                     ]}
//                                                 >
//                                                     <Meta
//                                                         // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//                                                         title="Card title"
//                                                         description="This is the description"
//                                                     />
//                                                 </Card>
//                                             </Col>
//                                             <Col span={2} offset={6} style={{ bottom: "3.5em" }} >
//                                                 <Text>CHECK-IN DAY</Text>
//                                             </Col>
//                                             <Col span={2} offset={1} style={{ bottom: "3.5em" }}>
//                                                 <Dropdown overlay={accom_checkin_menu}>
//                                                     <Button size={"small"} value={this.state.on_day} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.on_day}<DownOutlined /></Button>
//                                                 </Dropdown>
//                                             </Col>
//                                             <Col span={5} style={{ bottom: "3.5em" }} >
//                                                 <TimePicker
//                                                     size={"small"}
//                                                     // defaultValue={moment(this.state.modal_accom.checkin_time, format)}
//                                                     value={moment(this.state.modal_accom.checkin_time, time_format)}
//                                                     onChange={this.onChangeCheckInTime}
//                                                     format={time_format}
//                                                     style={{ width: "80px" }}
//                                                 />
//                                             </Col>
//                                         </Row>
//                                         <br />
//                                         <Row>
//                                             <Col span={1} >
//                                                 <Card
//                                                     style={{ width: 200, height: "auto" }}
//                                                     cover={
//                                                         <img
//                                                             alt="example"
//                                                             src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//                                                         />
//                                                     }
//                                                     actions={[
//                                                         "Detail",
//                                                         "Select"
//                                                         // <SettingOutlined key="setting" />,
//                                                         // <EditOutlined key="edit" />,
//                                                         // <EllipsisOutlined key="ellipsis" />,
//                                                     ]}
//                                                 >
//                                                     <Meta
//                                                         // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//                                                         title="Card title"
//                                                         description="This is the description"
//                                                     />
//                                                 </Card>
//                                             </Col>
//                                             <Col span={1} offset={6}>
//                                                 <Card
//                                                     style={{ width: 200, height: "auto" }}
//                                                     cover={
//                                                         <img
//                                                             alt="example"
//                                                             src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//                                                         />
//                                                     }
//                                                     actions={[
//                                                         "Detail",
//                                                         "Select"
//                                                         // <SettingOutlined key="setting" />,
//                                                         // <EditOutlined key="edit" />,
//                                                         // <EllipsisOutlined key="ellipsis" />,
//                                                     ]}
//                                                 >
//                                                     <Meta
//                                                         // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//                                                         title="Card title"
//                                                         description="This is the description"
//                                                     />
//                                                 </Card>
//                                             </Col>
//                                             <Col span={3} offset={6} style={{ bottom: "24.5em" }}>
//                                                 <Text>CHECK-OUT DAY</Text>
//                                             </Col>
//                                             <Col span={2} style={{ bottom: "24.5em" }} >
//                                                 <Dropdown overlay={accom_checkout_menu}>
//                                                     <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_accom.ac_checkout}<DownOutlined /></Button>
//                                                 </Dropdown>
//                                             </Col>
//                                             <Col span={5} style={{ bottom: "24.5em" }} >
//                                                 <TimePicker
//                                                     size={"small"}
//                                                     value={moment(this.state.modal_accom.checkout_time, time_format)}
//                                                     onChange={this.onChangeCheckoutTime}
//                                                     format={time_format}
//                                                     style={{ width: "80px" }}
//                                                 />
//                                             </Col>
//                                         </Row>
//                                         <div style={{ height: "0px" }}>
//                                             <Row>
//                                                 <Col span={10} offset={14} style={{ bottom: "44.5em" }}>
//                                                     <Text strong>PRICE:</Text>
//                                                 </Col>
//                                             </Row>
//                                             <Row>
//                                                 <Col span={2} offset={15} style={{ bottom: "44.5em" }}>
//                                                     <Text>TODAY PRICE</Text>
//                                                 </Col>
//                                                 <Col span={7} style={{ bottom: "44.5em" }} >
//                                                     <InputNumber
//                                                         size={"small"}
//                                                         // value={this.state.modal_accom.today_price}
//                                                         value={this.state.modal_accom.ac_today_price}
//                                                         readOnly
//                                                         disabled={true}
//                                                         formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                                         parser={value => value.replace(/^฿\s?|(,*)/g, '')}
//                                                     // formatter={currencyFormatter(this.state.currency)}
//                                                     // parser={currencyParser}
//                                                     />
//                                                 </Col>
//                                             </Row>
//                                             <Row>
//                                                 <Col span={2} offset={15} style={{ bottom: "44em" }}>
//                                                     <Text>EXTRA</Text>
//                                                 </Col>
//                                                 <Col span={7} style={{ bottom: "44em" }} >
//                                                     <InputNumber
//                                                         size={"small"}
//                                                         value={this.state.modal_accom.ac_extra_price}
//                                                         formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                                         parser={value => value.replace(/^฿\s?|(,*)/g, '')}
//                                                         // formatter={currencyFormatter(this.state.currency)}
//                                                         // parser={currencyParser}
//                                                         onChange={this.onChangeAccomExtraPrice}
//                                                     />
//                                                 </Col>
//                                             </Row>
//                                             <Row>
//                                                 <Col span={4} offset={16} style={{ bottom: "43.5em" }}>
//                                                     <Space>
//                                                         <Text strong>TOTAL</Text>
//                                                         <div >
//                                                             <InputNumber
//                                                                 size={"small"}
//                                                                 // defaultValue={0}
//                                                                 value={this.state.modal_accom.ac_total_price}
//                                                                 readOnly
//                                                                 disabled={true}
//                                                                 formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                                                 parser={value => value.replace(/^฿\s?|(,*)/g, '')}
//                                                             // formatter={currencyFormatter(this.state.currency)}
//                                                             // parser={currencyParser}
//                                                             // onChange={this.onChangePrice}
//                                                             />
//                                                         </div>

//                                                     </Space>
//                                                 </Col>
//                                             </Row>
//                                             <Row style={{ height: "25px" }}>
//                                                 <Col span={10} offset={14} style={{ bottom: "43em" }} >
//                                                     <TextArea name="note" placeholder="Additional notes ..." value={this.state.modal_accom.note} onChange={this.handleInputChangeAccom} style={{ height: "auto", width: "100%" }} rows={10} />
//                                                 </Col>
//                                             </Row>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Card>
//                         </div >
//                     </TabPane>
//                     <TabPane tab="TRANSPORTATION" key="3">
//                         {/* Tab Transportation */}
//                         <div className={styles.sitecard_borderless_wrapper}>
//                             <Card bordered={false}>
//                                 <div style={{ fontSize: "12px" }}>
//                                     {/* Col 24 */}
//                                     <div>
//                                         <Row>
//                                             <Col span={3}>
//                                                 <Text>PICK-UP LOCATION</Text>
//                                             </Col>
//                                             <Col span={3}>
//                                                 <Dropdown overlay={p_location_menu} >
//                                                     <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_transport.p_location}<DownOutlined /></Button>
//                                                 </Dropdown>
//                                             </Col>
//                                             <Col span={11} offset={7}>
//                                                 <Text strong>PRICE:</Text>
//                                             </Col>
//                                         </Row>
//                                         <Row style={{ marginTop: "0.5em" }}>
//                                             <Col span={3}>
//                                                 <Text>DROP-OFF LOCATION</Text>
//                                             </Col>
//                                             <Col span={3}>
//                                                 <Dropdown overlay={d_location_menu} >
//                                                     <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_transport.d_location}<DownOutlined /></Button>
//                                                 </Dropdown>
//                                             </Col>
//                                             <Col span={2} offset={8} style={{ bottom: "0.5em" }}>
//                                                 <Text>QUANTITY CAR</Text>
//                                             </Col>
//                                             <Col span={1} style={{ bottom: "0.5em" }}>
//                                                 <Dropdown overlay={quantity_menu} >
//                                                     <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_transport.quantity}<DownOutlined /></Button>
//                                                 </Dropdown>
//                                             </Col>
//                                             <Col span={1} style={{ left: "0.5em", bottom: "0.5em" }}>
//                                                 <InputNumber
//                                                     size={"small"}
//                                                     value={this.state.modal_transport.quantity_price}
//                                                     disabled={true}
//                                                     formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                                     parser={value => value.replace(/^฿\s?|(,*)/g, '')}
//                                                 // formatter={currencyFormatter(this.state.currency)}
//                                                 // parser={currencyParser}
//                                                 />
//                                             </Col>
//                                         </Row>
//                                         <Row style={{ marginTop: "0.5em" }}>
//                                             <Col span={3}>
//                                                 <Text>CAR MODEL</Text>
//                                             </Col>
//                                             <Col span={4}>
//                                                 <Space>
//                                                     <AutoComplete
//                                                         tabIndex={1}
//                                                         dropdownClassName="certain-category-search-dropdown"
//                                                         dropdownMatchSelectWidth={200}
//                                                         style={{ fontSize: "12px", height: "auto", width: 'auto' }}
//                                                         options={options_transport}
//                                                         filterOption={(inputValue, option) =>
//                                                             option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
//                                                         }
//                                                         value={this.state.modal_transport.select_carmodel}
//                                                         // onSelect={this.ac_auto_select}
//                                                         onChange={this.tran_auto_change}
//                                                     >
//                                                         <Input.Search size="small" placeholder="SEARCH PROPERTY NAME" />
//                                                     </AutoComplete>
//                                                     <Button size={"small"} icon={<PlusCircleOutlined style={{ color: "white", marginTop: "-5px", marginLeft: "-4px", fontSize: "13px" }} />} style={{ width: "20px", height: "20px", background: '#1890ff' }}></Button>
//                                                 </Space>
//                                             </Col>
//                                             <Col span={2} offset={7} style={{ bottom: "0.5em" }}>
//                                                 <Text>CAR SEAT</Text>
//                                             </Col>
//                                             <Col span={1} style={{ bottom: "0.5em" }}>
//                                                 <Dropdown overlay={carseat_menu} >
//                                                     <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_transport.carseat_value}<DownOutlined /></Button>
//                                                 </Dropdown>
//                                             </Col>
//                                             <Col span={1} style={{ left: "0.5em", bottom: "0.5em" }}>
//                                                 <InputNumber
//                                                     size={"small"}
//                                                     value={this.state.modal_transport.carseat_price}
//                                                     disabled={true}
//                                                     formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                                     parser={value => value.replace(/^฿\s?|(,*)/g, '')}
//                                                 // formatter={currencyFormatter(this.state.currency)}
//                                                 // parser={currencyParser}
//                                                 // onChange={this.onChangeCarseatPrice}
//                                                 />
//                                             </Col>
//                                         </Row>
//                                         <Row style={{ marginTop: "0.5em" }}>
//                                             <Col span={3}>
//                                                 <Text>PICK-UP DAY</Text>
//                                             </Col>
//                                             <Col span={2}>
//                                                 <Dropdown overlay={pickup_menu}>
//                                                     <Button size={"small"} value={this.state.on_day} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.on_day}<DownOutlined /></Button>
//                                                 </Dropdown>
//                                             </Col>
//                                             <Col span={2}>
//                                                 <TimePicker
//                                                     size={"small"}
//                                                     value={moment(this.state.modal_transport.pickup_time, time_format)}
//                                                     onChange={this.onChangePickupTime}
//                                                     format={time_format}
//                                                     style={{ width: "80px" }}
//                                                 />
//                                             </Col>
//                                             <Col span={2} offset={7} style={{ bottom: "1em" }}>
//                                                 <Text>EXTRA</Text>
//                                             </Col>
//                                             <Col span={1} offset={1} style={{ left: "0.5em", bottom: "1em" }}>
//                                                 <InputNumber
//                                                     size={"small"}
//                                                     value={this.state.modal_transport.extra_price}
//                                                     formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                                     parser={value => value.replace(/^฿\s?|(,*)/g, '')}
//                                                     // formatter={currencyFormatter(this.state.currency)}
//                                                     // parser={currencyParser}
//                                                     onChange={this.onChangeExtraPrice}
//                                                 />
//                                             </Col>
//                                         </Row>
//                                         <Row style={{ marginTop: "0.5em" }}>
//                                             <Col span={3}>
//                                                 <Text>DROP-OFF DAY</Text>
//                                             </Col>
//                                             <Col span={2}>
//                                                 <Dropdown overlay={dropoff_menu}>
//                                                     <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_transport.dropoff}<DownOutlined /></Button>
//                                                 </Dropdown>
//                                             </Col>
//                                             <Col span={2}>
//                                                 <TimePicker
//                                                     size={"small"}
//                                                     value={moment(this.state.modal_transport.dropoff_time, time_format)}
//                                                     onChange={this.onChangeDropoffTime}
//                                                     format={time_format}
//                                                     style={{ width: "80px" }}
//                                                 />
//                                             </Col>
//                                             <Col span={2} offset={7} style={{ bottom: "1.5em" }}>
//                                                 <Text strong>TOTAL PRICE</Text>
//                                             </Col>
//                                             <Col span={1} offset={1} style={{ left: "0.5em", bottom: "1.5em" }}>
//                                                 <InputNumber
//                                                     size={"small"}
//                                                     value={this.state.modal_transport.total_price}
//                                                     readOnly
//                                                     disabled={true}
//                                                     formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                                     parser={value => value.replace(/^฿\s?|(,*)/g, '')}
//                                                 // formatter={currencyFormatter(this.state.currency)}
//                                                 // parser={currencyParser}
//                                                 />
//                                             </Col>
//                                         </Row>
//                                         <Row style={{ marginTop: "0.5em" }}>
//                                             <Col span={7}>
//                                                 <TextArea name="note" placeholder="Additional notes ..." value={this.state.modal_transport.note} onChange={this.handleInputChangeMT} style={{ height: "auto", width: "100%" }} rows={10} />
//                                             </Col>
//                                         </Row>
//                                     </div>
//                                 </div>
//                             </Card>
//                         </div >
//                     </TabPane>
//                     <TabPane tab="OTHER" key="4">
//                         {/* tab other */}
//                         <div className={styles.sitecard_borderless_wrapper}>
//                             <Card bordered={false}>
//                                 <div style={{ fontSize: "12px" }}>
//                                     {/* Col 24 */}
//                                     <Row style={{ marginTop: "0.5em" }}>
//                                         <Col span={2}>
//                                             <Text>TIME</Text>
//                                         </Col>
//                                         <Col span={21}>
//                                             <TimePicker
//                                                 size={"small"}
//                                                 onChange={this.onChangeOtherTime}
//                                                 value={moment(this.state.modal_other.time, time_format)}
//                                                 format={time_format}
//                                                 style={{ width: "80px" }}
//                                             />
//                                         </Col>
//                                     </Row>
//                                     <Row style={{ marginTop: "0.5em" }}>
//                                         <Col span={2}>
//                                             <Text>ACTIVITIES</Text>
//                                         </Col>
//                                         <Col span={21}>
//                                             <TextArea name="note" placeholder="Additional notes ..." value={this.state.modal_other.note} onChange={this.otherHandleInputChange} style={{ height: "auto", width: "500px" }} rows={10} />
//                                         </Col>
//                                     </Row>
//                                 </div>
//                             </Card>
//                         </div >
//                     </TabPane>
//                 </Tabs>
//             </Modal>
//         )
//     }
// }
// export default modalActivity;