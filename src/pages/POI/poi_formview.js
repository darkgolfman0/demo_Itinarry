import React from 'react'
import { Row, Col, Button, Card, Divider, Typography, Input, message, Menu, Dropdown, Checkbox, Radio, Table, DatePicker, TimePicker, Rate, Upload, InputNumber } from 'antd';
import { DownOutlined, SaveOutlined, CloseOutlined} from '@ant-design/icons';
import styles from './poi.module.css'
import './poi.module.css'
import { Link } from 'react-router-dom';
import OperatingHours from './OperatingHour/OperatingHours';
import moment from 'moment';
import OperatingPeriod from './OperatingPeriod/OperatingPeriod';
import TicketPrice from './TicketPrice/TicketPrice';
import UploadFile from './Blog/uploadFile';


const axios = require('axios');
const { RangePicker } = DatePicker;
//antd element
const { Text, Title } = Typography
//antd rangeDate

//andtd format time
const format = 'HH:mm';
//andtd radioGroup
const RadioGroup = Radio.Group;
//textarea
const { TextArea } = Input;

function getBase64(fileList, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(fileList);
}


class Poi_New extends React.Component {
    constructor(props) {
        super();
        this.state = {
            active: true,
            name: "",
            display_name: "",
            address_1: "",
            address_2: "",
            city: "",
            country: "Thailand",
            postcode: "",
            type_poi: "Attractions",
            phone: "",
            website: "",
            avg: "",
            tips: "",
            subject: "",
            description: "",
            adult_price: 0.00,
            child_price: 0.00,
            infant_price: 0.00,
            star_rate: 0,
            myarray: [],
            myobject: {},
            fields: {},
            error: {},
        };

    }
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        let childPrice = this.state.child_price;
        let adultPrice = this.state.adult_price;
        let infantPrice = this.state.infant_price;

        //Name
        if (!fields["display_name"]) {
            formIsValid = false;
            errors["display_name"] = "Cannot be empty";
        }
        if (!fields["address_1"]) {
            formIsValid = false;
            errors["address_1"] = "Cannot be empty";
        }
        if (adultPrice === 0 || adultPrice === null) {
            formIsValid = false;
            errors["adult_price"] = " Cannot be 0 or empty";
        }
        if (childPrice === 0 || childPrice === null) {
            formIsValid = false;
            errors["child_price"] = " Cannot be 0 or empty";
        }
        if (infantPrice === 0 || infantPrice === null) {
            formIsValid = false;
            errors["infant_price"] = " Cannot be 0 or empty";
        }
        this.setState({ error: errors });
        return formIsValid;
    }
    onChangeRadiovalue = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            period_value: e.target.value,
        });
        let curren_date = new Date()
        if (e.target.value === 1) {
            this.setState({
                period_value: e.target.value,
                date_period: true,
                allTimePeriod: moment(curren_date).format("YYYY-MM-DD")
            })
        } else if (e.target.value === 2) {
            this.setState({
                period_value: e.target.value,
                date_period: false,
                // allTimePeriod: ''
            })
        }
    };
    handleInputChange = (event) => {
        console.log(event.target)
        const target = event.target;
        const { name, value } = target
        this.setState({
            [name]: value
        });
    }
    submit_save = (event) => {
        if (this.handleValidation()) {
            let formdata = {
                selectedRowKeys: this.state.selectedRowKeys,
                active: this.state.active,
                display_name: this.state.fields.display_name,
                address_1: this.state.fields.address_1,
                address_2: this.state.address_2,
                type_poi: this.state.type_poi,
                country: this.state.country,
                city: this.state.city,
                postcode: this.state.postcode,
                phone: this.state.phone,
                website: this.state.website,
                avg: this.state.avg,
                tips: this.state.tips,
                subject: this.state.subject,
                description: this.state.description,
                adult_price: this.state.adult_price,
                child_price: this.state.child_price,
                infant_price: this.state.infant_price,
                star_rate: this.state.star_rate,
                range_from: this.state.range_from,
                range_to: this.state.range_to,
                allTimePeriod: this.state.allTimePeriod,
                date_period: this.state.date_period,
                period_value: this.state.period_value,
                fileList: this.state.fileList,
                urlImage: this.state.urlImage,
                // uidImage: this.state.uidImage,
                // nameImage: this.state.nameImage,
                // sizeImage: this.state.sizeImage,
                operateDays: this.state.operateDays,
                isSelectableDates: this.state.isSelectableDates
            }
            console.log('formdata', formdata)
            axios({
                method: 'post',
                url: 'http://localhost:5000/api/poi',
                // url: 'http://13.229.16.186:5000/api/poi/',
                data: formdata
                // config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
                .then((response) => {
                    //handle success
                    console.log('api response ==>', response)
                    this.props.history.push("/poi_list")

                    return response

                })
                .catch((error) => {
                    //handle error
                    console.log('error', error)
                    return this.setState({
                        error: error
                    })
                });
        }
        else {
            alert("Form has errors.")
        }
    }
    handleInputChangeField = (field, event) => {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({ fields })
    }


    activestatusChange = (e) => {
        console.log(`checked = ${e.target.checked}`)
        this.setState({
            active: e.target.checked
        })
    }


    adultPriceChange = (value) => {
        this.setState({
            adult_price: value
        })
        console.log('changed', value);
    }

    childPriceChange = (value) => {
        this.setState({
            child_price: value
        })
        console.log('changed', value);
    }

    infanPriceChange = (value) => {
        this.setState({
            infant_price: value
        })
        console.log('changed', value);
    }

    handleChange = value => {
        console.log('value_star_rate', value)
        this.setState({
            star_rate: value
        });
    };

    onChangeRange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        this.setState({
            range_from: dateStrings[0],
            range_to: dateStrings[1]
        })
    }
    

    render() {

        const handleUploadFileListResult = (data) => {
            this.setState({
                fileList : data,
            })
            console.log("Result UploadFileList ==>", data)
        }
        const handleSelectedRowKeysResult = (data) => {
            this.setState({
                selectedRowKeys : data,
            })
            // console.log("Result selectedRowKeys ==>", data)
        }
        const handleIsSelectableDatesResult = (data) => {
            this.setState({
                isSelectableDates : data,
            })
            // console.log("Result isSelectableDates ==>", data)
        }
        const handleOperateDateResult = (data) => {
            this.setState({
                operateDays : data
            })
            // console.log("Result operateDays >>", data)
        }
        const handlePeriodValueResult = (data) => {
            this.setState({
                period_value : data,
            })
            // console.log("Result SelectionAndEnable ===>", data )
        }
        const handleDatePeriodResult = (data) => {
            this.setState({
                date_period : data,
            })
            // console.log("Result date_period ==>", data)
        }
        const handleAllTimePeriodResult = (data) => {
            this.setState({
                allTimePeriod : data,
            })
            // console.log("Result allTimePeriod ==>", data)
        }
        const handleRangeFromResult = (data) => {
            this.setState({
                range_from : data,
            })
            // console.log("Result range_from ==>", data)
        }
        const handleRangeToResult = (data) => {
            this.setState({
                range_to : data,
            })
            // console.log("Result range_to ==>", data)
        }
       
        const value_county = ({ key }) => {
            console.log(key)
            this.setState({
                country: key
            })
            message.info(`Click on item ${key}`);
        };
        const county_menu = (
            <Menu onClick={value_county}>
                <Menu.Item key='Thailand'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Thailand
            </span>
                </Menu.Item>
                <Menu.Item key="Taiwan">
                    <span target="_blank" rel="noopener noreferrer" >
                        Taiwan
            </span>
                </Menu.Item>
                <Menu.Item key="China">
                    <span target="_blank" rel="noopener noreferrer">
                        China
            </span>
                </Menu.Item>
                <Menu.Item key="Korea">
                    <span target="_blank" rel="noopener noreferrer" >
                        Korea
            </span>
                </Menu.Item>
                <Menu.Item key="Japan">
                    <span target="_blank" rel="noopener noreferrer" >
                        Japan
            </span>
                </Menu.Item>
            </Menu>
        );

        //dropdown type menu dropdown
        const value_type = ({ key }) => {
            console.log(key)
            this.setState({
                type_poi: key
            })
            message.info(`Click on item ${key}`);
        };
        const type_menu = (
            <Menu onClick={value_type}>
                <Menu.Item key='Attractions'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Attractions
            </span>
                </Menu.Item>
                <Menu.Item key='Restaurant'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Restaurant
            </span>
                </Menu.Item>
                <Menu.Item key="Shopping">
                    <span target="_blank" rel="noopener noreferrer" >
                        Shopping
            </span>
                </Menu.Item>
                <Menu.Item key="Beauty">
                    <span target="_blank" rel="noopener noreferrer">
                        Beauty & Spa
            </span>
                </Menu.Item>
                <Menu.Item key="Entertainment">
                    <span target="_blank" rel="noopener noreferrer" >
                        Entertainment
            </span>
                </Menu.Item>
            </Menu>
        );

        //table ticket columns
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

        //table ticket data source
        const ticket_data = [
            {
                key: '1',
                type_poi: 'Adult (12+)',
                price:
                    <React.Fragment>
                        <InputNumber
                            style={{ fontSize: "12px", height: "100%" }}
                            name="adult_price"
                            size={"small"}
                            defaultValue={this.state.adult_price}
                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            onChange={this.adultPriceChange}
                        />
                        <span className="error" style={{ color: "red" }}>{this.state.error["adult_price"]}</span>
                    </React.Fragment>

            },
            {
                key: '2',
                type_poi: 'Child (2-11)',
                price:
                    <div>
                        <InputNumber
                            style={{ fontSize: "12px" }}
                            name="child_price"
                            size={"small"}
                            defaultValue={this.state.child_price}
                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            onChange={this.childPriceChange}
                        />
                        <span className="error" style={{ color: "red" }}>{this.state.error["child_price"]}</span>
                    </div>
            },
            {
                key: '3',
                type_poi: 'Infant (below 2)',
                price:
                    <React.Fragment>
                        <InputNumber
                            style={{ fontSize: "12px" }}
                            name="infant_price"
                            size={"small"}
                            defaultValue={this.state.infant_price}
                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            onChange={this.infanPriceChange}
                        />
                        <span className="error" style={{ color: "red" }}>{this.state.error["infant_price"]}</span>
                    </React.Fragment>

            },
        ];

        return (
            <div className={styles.sitecard_borderless_wrapper} >
                <Card bordered={false}>
                    <Title level={3}>POINT OF INTEREST (POI)</Title>
                    <div style={{ fontSize: "12px" }}>
                        {/* Col 24 */}
                        <Row>
                            <Col span={2}>
                                {/* <Link to='poi_list'> */}
                                <Button onClick={this.submit_save} icon={<SaveOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                    <p style={{ color: "white", position: "inherit" }}>Save</p>
                                </Button>
                                {/* </Link> */}
                            </Col>
                            <Col span={2}>
                                <Link to="/poi_list">
                                    <Button icon={<CloseOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                        <p style={{ color: "white", position: "inherit" }}>Discard</p>
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                        <Divider type="horizontal"></Divider>
                        <Row>
                            <Col span={17}><Text strong>OPERATING HOURS:</Text></Col>
                            <Col span={7} style={{ textAlign: "end" }}><Rate onChange={this.handleChange} style={{ fontSize: "12px" }} /></Col>
                        </Row>
                        <div className={styles.operating_hours_data} >
                            <Row style={{ paddingBottom: "5px", height: "30px" }}>
                                <Col span={3}><Text >DISPLAY NAME</Text></Col>
                                <Col span={4}>
                                    <Input tabIndex={1} name="display_name" ref="display_name" value={this.state.fields["display_name"]} onChange={this.handleInputChangeField.bind(this, "display_name")} size={"small"} placeholder="" />
                                    <span className="error" style={{ color: "red" }}>{this.state.error["display_name"]}</span>
                                </Col>
                                <Col span={13} style={{ paddingLeft: "5%" }}>
                                    <Checkbox checked={this.state.active} value={this.state.active} onChange={this.activestatusChange} style={{ fontSize: "12px" }} tabIndex={8}>ACTIVE</Checkbox>
                                </Col>
                                <Col span={4} style={{ textAlign: "center" }}>
                                    <Card style={{ width: "auto", height: "auto" }}>
                                        <div>
                                            <Text >GPS</Text>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col span={3}><Text >ADDRESSES 1</Text></Col>
                                <Col span={4}>
                                    <Input tabIndex={2} name="address_1" ref="address_1" value={this.state.fields["address_1"]} onChange={this.handleInputChangeField.bind(this, "address_1")} size={"small"} placeholder="" />
                                    <span className="error" style={{ color: "red" }}>{this.state.error["address_1"]}</span>
                                </Col>
                                <Col span={4} style={{ paddingLeft: "5%" }}><Text >PHONE</Text></Col>
                                <Col span={4} ><Input tabIndex={9} name="phone" value={this.state.phone} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                            </Row>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col span={3}><Text >ADDRESSES 2</Text></Col>
                                <Col span={4}><Input tabIndex={3} name="address_2" value={this.state.address_2} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                                <Col span={4} style={{ paddingLeft: "5%" }}><Text >WEBSITE</Text></Col>
                                <Col span={4} ><Input tabIndex={10} name="website" value={this.state.website} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                            </Row>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col span={3} ><Text >CITY</Text></Col>
                                <Col span={4} ><Input tabIndex={4} name="city" value={this.state.city} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                                <Col span={4} style={{ paddingLeft: "5%" }}><Text >AVG. PLAY TIME</Text></Col>
                                <Col span={4} ><Input tabIndex={11} name="avg" value={this.state.avg} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                            </Row>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col span={3}><Text >COUNTRY</Text></Col>
                                {/* <Col span={4}><Input name="country" value={this.state.country} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col> */}
                                <Col span={4}>
                                    <Dropdown overlay={county_menu} >
                                        <Button tabIndex={5} size={"small"} onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.country}<DownOutlined /></Button>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col span={3}><Text >ZIP/POST CODE</Text></Col>
                                <Col span={4}><Input tabIndex={6} name="postcode" value={this.state.postcode} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                            </Row>
                            <Row >
                                <Col span={3}><Text >TYPE</Text></Col>
                                <Col span={4}>
                                    <Dropdown overlay={type_menu}>
                                        <Button tabIndex={7} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.type_poi}<DownOutlined /></Button>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row style={{ height: 0 }}>
                                <Col span={4} offset={7} style={{ paddingLeft: "5%", bottom: "6em" }}><Text >TIPS</Text></Col>
                                <Col span={4} style={{ bottom: "6em" }}>
                                    <TextArea tabIndex={12} name="tips" value={this.state.tips} onChange={this.handleInputChange} style={{ width: "50em" }} rows={5} />
                                </Col>
                            </Row>
                        </div>
                        <Divider type="horizontal"></Divider>
                        <Row>
                            <Col span={12}><Text strong>OPERATING PERIOD:</Text></Col>
                            <Col span={12} style={{ paddingLeft: "12%" }}><Text strong>TICKET PRICE:</Text></Col>
                        </Row>
                        <div className={styles.operating_hours_data} >
                            <Row style={{ paddingBottom: "5px", height: "30px" }}>
                                <OperatingPeriod 
                                onPeriodValueResult={handlePeriodValueResult} 
                                onDatePeriodResult = {handleDatePeriodResult} 
                                onOperateDateResult={handleAllTimePeriodResult}
                                onRangeFromResult={handleRangeFromResult} 
                                onRangeToResult={handleRangeToResult} 
                                />
                                <Col span={9} offset={5}>
                                    {/* <TicketPrice />  */}
                                    <Table pagination={false} columns={ticket_price_columns} dataSource={ticket_data}>
                                    </Table>
                                </Col>
                            </Row>
                        </div>
                        <br />
                        <Row>
                            <Col span={12} ><Text strong>OPERATING HOURS:</Text></Col>
                        </Row>
                        <Row>
                            <Col span={13}>  
                            <OperatingHours 
                            onSelectedRowKeysResult={handleSelectedRowKeysResult} 
                            onIsSelectableDatesResult = {handleIsSelectableDatesResult} 
                            onOperateDateResult={handleOperateDateResult} 
                            /> 
                            </Col>
                        </Row>
                        <Divider type="horizontal"></Divider>
                        <Row>
                            <Col span={24} ><Text strong>BLOG:</Text></Col>
                        </Row>
                        <div className={styles.operating_hours_data}>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col span={3} ><Text >SUBJECT</Text></Col>
                                <Col span={10} ><Input name="subject" value={this.state.subject} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                            </Row>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col span={3} ><Text >DESCRIPTION</Text></Col>
                                <Col span={10} ><TextArea name="description" value={this.state.description} onChange={this.handleInputChange} rows={5} /></Col>
                            </Row>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col span={3} ><Text >SELECT IMAGES</Text></Col>
                                <Row span={4} >
                                    <UploadFile onUploadFileListResult = {handleUploadFileListResult} parrentUploadFileList = {this.state.urlImage} />
                                </Row>
                            </Row>
                        </div>

                    </div>

                </Card>
            </div >
        )
    }
}
export default Poi_New;
// export default () => (
// )
// import React from 'react'
// import { Row, Col, Button, Card, Divider, Typography} from 'antd';
// import { SaveOutlined, CloseOutlined} from '@ant-design/icons';
// import API from '../../services/apiRoot';
// import styles from './poi.module.css'
// import './poi.module.css'
// import { Link, useHistory } from 'react-router-dom';
// import OperatingHours from './OperatingHour/OperatingHours';
// import TicketPrice from './TicketPrice/TicketPrice';
// import GeneralDetail from './Blog/GenralDetail';
// import UploadFile from './Blog/uploadFile';
// import PersonalDetails from './GeneralDetals/PersonalDetails';
// import OperatingPeriod from './OperatingPeriod/OperatingPeriod';

// const { Text, Title } = Typography

// function Poi_New (props,state) {
//     const history = useHistory()
//     const submit_save = (event) => {
//             let formdata = {
//                 selectedRowKeys: this.state.selectedRowKeys,
//                 active: this.state.active,
//                 display_name: this.state.fields.display_name,
//                 address_1: this.state.fields.address_1,
//                 address_2: this.state.address_2,
//                 type_poi: this.state.type_poi,
//                 country: this.state.country,
//                 city: this.state.city,
//                 postcode: this.state.postcode,
//                 phone: this.state.phone,
//                 website: this.state.website,
//                 avg: this.state.avg,
//                 tips: this.state.tips,
//                 subject: this.state.subject,
//                 description: this.state.description,
//                 adult_price: this.state.adult_price,
//                 child_price: this.state.child_price,
//                 infant_price: this.state.infant_price,
//                 star_rate: this.state.star_rate,
//                 range_from: this.state.range_from,
//                 range_to: this.state.range_to,
//                 allTimePeriod: this.state.allTimePeriod,
//                 date_period: this.state.date_period,
//                 period_value: this.state.period_value,
//                 fileList: this.state.fileList,
//                 url: this.state.url,
//                 imageName: this.state.imageName,
//                 imageStatus: this.state.imageStatus,
//                 operateDays: this.state.operateDays,
//                 isSelectableDates: this.state.isSelectableDates
//             }
//             console.log('formdata', formdata)
//             // API.post(`api/poi`)(formdata).then((response) => {
//             //     console.log('api response ==>', response)
//             //     history.push("/poi_list")
//             //     return response
//             // }).catch((error) => {
//             //     console.log('error', error)
//             //     return {error : error}
//             // })
//         }
//     // const handlePersonalResult = 
//     return(
//         <div className={styles.sitecard_borderless_wrapper} >
//                 <Card bordered={false}>
//                     <Title level={3}>POINT OF INTEREST (POI)</Title>
//                     <div style={{ fontSize: "12px" }}>
//                         {/* Col 24 */}
//                         <Row>
//                             <Col span={2}>
//                                 {/* <Link to='poi_list'> */}
//                                 <Button onClick={submit_save} icon={<SaveOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
//                                     <p style={{ color: "white", position: "inherit" }}>Save</p>
//                                 </Button>
//                                 {/* </Link> */}
//                             </Col>
//                             <Col span={2}>
//                                 <Link to="/poi_list">
//                                     <Button icon={<CloseOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
//                                         <p style={{ color: "white", position: "inherit" }}>Discard</p>
//                                     </Button>
//                                 </Link>
//                             </Col>
//                         </Row>
//                         <PersonalDetails/>
//                         <Row>
//                             <Col span={12}><Text strong>OPERATING PERIOD:</Text></Col>
//                             <Col span={12} style={{ paddingLeft: "12%" }}><Text strong>TICKET PRICE:</Text></Col>
//                         </Row>
//                         <div className={styles.operating_hours_data} >
//                             <Row style={{ paddingBottom: "5px", height: "30px" }}>
//                                 <OperatingPeriod/>
//                                 <Col span={9} offset={5} style={{ paddingLeft: "%"}}>
//                                     <TicketPrice />
//                                 </Col>
//                             </Row>
//                         </div>
//                         <br />
//                         <Row>
//                             <Col span={12} ><Text strong>OPERATING HOURS:</Text></Col>
//                         </Row>
//                         <Row>
//                             <Col span={13}>  
//                             <OperatingHours/> 
//                             </Col>
//                         </Row>
//                         <Divider type="horizontal"></Divider>
//                         <Row>
//                             <Col span={24} ><Text strong>BLOG:</Text></Col>
//                         </Row>
//                         <div className={styles.operating_hours_data}>
//                             <GeneralDetail/>
//                             <Row style={{ paddingBottom: "5px" }}>
//                                 <Col span={3} ><Text >SELECT IMAGES</Text></Col>
//                                 <Row span={4} >
//                                 <UploadFile/>
//                                 </Row>
//                             </Row>
//                         </div>

//                     </div>

//                 </Card>
//             </div >
//     )
    
// }
// export default Poi_New
