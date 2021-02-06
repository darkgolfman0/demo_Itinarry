import React from 'react'
import { Row, Col, Button, Card, Divider, Typography, Input, message, Menu, Dropdown, Checkbox, Radio, Table, DatePicker, TimePicker, Rate, Upload, InputNumber } from 'antd';
import { DownOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './poi.module.css'
import './poi.module.css'
import { Link } from 'react-router-dom';
import moment from 'moment';
import OperatingHours from './OperatingHour/OperatingHours';
import OperatingPeriod from './OperatingPeriod/OperatingPeriod';
import OperatingPeriodPut from './OperatingPeriod/OperatingPeriodPut';
import OperatingHoursPut from './OperatingHour/OperatingHoursPut';
import UploadFile from './Blog/uploadFile';

const axios = require('axios');

//antd element
const { Text, Title } = Typography
//textarea
const { TextArea } = Input;



function getBase64(fileList, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(fileList);
}

class poi_formupdate extends React.Component {
    constructor(props) {
        super();
        this.state = {
            fileList: [],
            date_period: true,
            allTimePeriod: "",
            item: [
                {
                    fileList: [],
                }
            ],
            date_form: "",
            date_to: "",
            active: false,
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
            adult_price: 0,
            child_price: 0,
            infant_price: 0,
            star_rate: 0,
            myarray: [],
            myobject: {},
            period_value: 1,
            range_from: "",
            range_to: "",
            error: {},
        };
        this.xxx = []
    }

    async componentDidMount() {
        const res = await axios.get(`http://localhost:5000/api/poi/${this.props.match.params.id}`)
        // const res = await axios.get(`http://13.229.16.186:5000/api/poi/${this.props.match.params.id}`)
        this.setState({
            item: res.data,
            
        })
        
    }
    handleValidation() {
        let fields = this.state.item;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["display_name"]) {
            formIsValid = false;
            errors["display_name"] = "Cannot be empty";
        }
        if (!fields["address_1"]) {
            formIsValid = false;
            errors["address_1"] = "Cannot be empty";
        }
        if (fields["adult_price"] === 0 || fields["adult_price"] === null) {
            formIsValid = false;
            errors["adult_price"] = " Cannot be 0 or empty";
        }
        if (fields["child_price"] === 0 || fields["child_price"] === null) {
            formIsValid = false;
            errors["child_price"] = " Cannot be 0 or empty";
        }
        if (fields["infant_price"] === 0 || fields["infant_price"] === null) {
            formIsValid = false;
            errors["infant_price"] = " Cannot be 0 or empty";
        }
        this.setState({ error: errors });
        return formIsValid;
    }
    handleInputChange = e => {
        e.persist();
        this.setState(prevState => ({
            item: { ...prevState.item, [e.target.name]: e.target.value }
        }))
    }

    handleInputChange = (event) => {
        console.log(event.target)
        const target = event.target;
        const { name, value } = target
        this.setState(prevState => ({
            item: { ...prevState.item, [name]: value }
        }));
    }

    handleChange = (value) => {
        console.log('value_star_rate', value)
        this.setState(prevState => ({
            item: { ...prevState.item, star_rate: value }
        }))
    };

    submit_save = (event) => {
        if (this.handleValidation()) {
            const formdata = {
                selectedRowKeys: this.state.selectedRowKeys,
                active: this.state.item.active,
                display_name: this.state.item.display_name,
                address_1: this.state.item.address_1,
                address_2: this.state.item.address_2,
                type_poi: this.state.item.type_poi,
                country: this.state.item.country,
                city: this.state.item.city,
                postcode: this.state.item.postcode,
                phone: this.state.item.phone,
                website: this.state.item.website,
                avg: this.state.item.avg,
                tips: this.state.item.tips,
                subject: this.state.item.subject,
                description: this.state.item.description,
                adult_price: this.state.item.adult_price,
                child_price: this.state.item.child_price,
                infant_price: this.state.item.infant_price,
                star_rate: this.state.item.star_rate,
                range_from: this.state.range_from,
                range_to: this.state.range_to,
                allTimePeriod: this.state.allTimePeriod,
                date_period: this.state.date_period,
                period_value: this.state.period_value,
                fileList: this.state.item.fileList,
                urlImage: this.state.urlImage,
                uidImage: this.state.uidImage,
                nameImage: this.state.nameImage,
                sizeImage: this.state.sizeImage,
                operateDays: this.state.operateDays,
                isSelectableDates: this.state.isSelectableDates,
            
            }
            // console.log('formdata', formdata)

            axios({
                method: 'put',
                url: `http://localhost:5000/api/poi/${this.props.match.params.id}`,
                // url: 'http://13.229.16.186:5000/api/poi/'+ this.props.match.params.id,
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
            alert("Check empty fill")
        }

    }
    cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    }
    activestatusChange = (e) => {
        console.log(`checked = ${e.target.checked}`)
        this.setState(prevState => ({
            item: { ...prevState.item, active: e.target.checked }
        }))

    }
    adultPriceChange = (value) => {
        this.setState(prevState => ({
            item: { ...prevState.item, adult_price: value }
        }))
        console.log('changed', value);
    }

    childPriceChange = (value) => {
        this.setState(prevState => ({
            item: { ...prevState.item, child_price: value }
        }))
        console.log('changed', value);
    }

    infanPriceChange = (value) => {
        this.setState(prevState => ({
            item: { ...prevState.item, infant_price: value }
        }))
        console.log('changed', value);
    }


    handleImageChange = info => {
        let fileList = [...info.fileList];
        fileList = fileList.slice();
        fileList = fileList.map(file => {
            getBase64(info.file.originFileObj, url =>
                this.setState({
  
                    url,
                    loading: false
                }),
            );
            // console.log(file)
            this.setState({
                imageName: file.name
            })

            if (file.response) {
                file.url = file.thumbUrl;
                file.imageName = file.name;
                file.imageStatus = file.status;
            }
            return file;
        });

        this.setState(prevState =>({ 
            item : {...prevState.item,fileList}
        }));
        console.log(fileList)
    };

    onPreviewImage = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
      //   this.props.onChildResult(fileList)};
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };

    onChangeRange = (dates, dateStrings) => {
        this.setState(prevState => ({
            item: {
                ...prevState.item, range_from: dateStrings[0],
                range_to: dateStrings[1]
            }
        }))
    }

    render() {
        // console.log('urlImage >>', this.state.item.fileList)
        const handleUploadFileListResult = (data) => {
            this.setState({
                fileList : data,
            })
            console.log("Result fileList ==>", data)

        }
        const handleSelectedRowKeysResult = (data) => {
            this.setState({
                selectedRowKeys : data,
            })
        }
        const handleIsSelectableDatesResult = (data) => {
            this.setState({
                isSelectableDates : data,
            })
    
        }
        const handleOperateDateResult = (data) => {
            this.setState({
                operateDays : data
            })
        }
        const handlePeriodValueResult = (data) => {
            this.setState({
                period_value : data,
            })
        }
        const handleDatePeriodResult = (data) => {
            this.setState({
                date_period : data,
            })
        }
        const handleAllTimePeriodResult = (data) => {
            this.setState({
                allTimePeriod : data,
            })
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

        const value_county = ({ key }, country) => {
            console.log(key)
            this.setState(prevState => ({
                item: { ...prevState.item, country: key }
            }))
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

        const value_type = ({ key }, type_poi) => {
            console.log(key)
            this.setState(prevState => ({
                item: { ...prevState.item, type_poi: key }
            }))
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
                price:
                    <React.Fragment>
                        <InputNumber
                            style={{ fontSize: "12px", height: "100%" }}
                            name="adult_price"
                            size={"small"}
                            value={this.state.item.adult_price}
                            defaultValue={0}
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
                    <React.Fragment>
                        <InputNumber
                            style={{ fontSize: "12px" }}
                            name="child_price"
                            size={"small"}
                            value={this.state.item.child_price}
                            defaultValue={0}
                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            onChange={this.childPriceChange}
                        />
                        <span className="error" style={{ color: "red" }}>{this.state.error["child_price"]}</span>
                    </React.Fragment>
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
                            value={this.state.item.infant_price}
                            defaultValue={0}
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
                            <Col span={7} style={{ textAlign: "end" }}><Rate value={this.state.item.star_rate} onChange={this.handleChange} style={{ fontSize: "12px" }} /></Col>
                        </Row>
                        <div className={styles.operating_hours_data} >
                            <Row style={{ paddingBottom: "5px", height: "30px" }}>
                                <Col span={3}><Text >DISPLAY NAME</Text></Col>
                                <Col span={4}>
                                    <Input tabIndex={1} name="display_name" value={this.state.item.display_name} onChange={this.handleInputChange} size={"small"} placeholder="" />
                                    <span className="error" style={{ color: "red" }}>{this.state.error["display_name"]}</span>
                                </Col>
                                <Col span={13} style={{ paddingLeft: "5%" }}>
                                    <Checkbox checked={this.state.item.active} onChange={this.activestatusChange} style={{ fontSize: "12px" }} tabIndex={8}>ACTIVE</Checkbox>
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
                                    <Input tabIndex={2} name="address_1" value={this.state.item.address_1} onChange={this.handleInputChange} size={"small"} placeholder="" />
                                    <span className="error" style={{ color: "red" }}>{this.state.error["address_1"]}</span>
                                </Col>
                                <Col span={4} style={{ paddingLeft: "5%" }}><Text >PHONE</Text></Col>
                                <Col span={4} ><Input tabIndex={9} name="phone" value={this.state.item.phone} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                            </Row>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col span={3}><Text >ADDRESSES 2</Text></Col>
                                <Col span={4}><Input tabIndex={3} name="address_2" value={this.state.item.address_2} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                                <Col span={4} style={{ paddingLeft: "5%" }}><Text >WEBSITE</Text></Col>
                                <Col span={4} ><Input tabIndex={10} name="website" value={this.state.item.website} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                            </Row>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col span={3} ><Text >CITY</Text></Col>
                                <Col span={4} ><Input tabIndex={4} name="city" value={this.state.item.city} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                                <Col span={4} style={{ paddingLeft: "5%" }}><Text >AVG. PLAY TIME</Text></Col>
                                <Col span={4} ><Input tabIndex={11} name="avg" value={this.state.item.avg} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                            </Row>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col span={3}><Text >COUNTRY</Text></Col>
                                {/* <Col span={4}><Input name="country" value={this.state.country} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col> */}
                                <Col span={4}>
                                    <Dropdown overlay={county_menu} >
                                        <Button tabIndex={5} size={"small"} onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.item.country}<DownOutlined /></Button>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col span={3}><Text >ZIP/POST CODE</Text></Col>
                                <Col span={4}><Input tabIndex={6} name="postcode" value={this.state.item.postcode} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                            </Row>
                            <Row >
                                <Col span={3}><Text >TYPE</Text></Col>
                                {/* <Col span={4}><Input name="type" value={this.state.type} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col> */}
                                <Col span={4}>
                                    <Dropdown overlay={type_menu}>
                                        <Button tabIndex={7} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.item.type_poi}<DownOutlined /></Button>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row style={{ height: 0 }}>
                                <Col span={4} offset={7} style={{ paddingLeft: "5%", bottom: "6em" }}><Text >TIPS</Text></Col>
                                <Col span={4} style={{ bottom: "6em" }}>
                                    <TextArea tabIndex={12} name="tips" value={this.state.item.tips} onChange={this.handleInputChange} style={{ width: "50em" }} rows={5} />
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
                            <OperatingPeriodPut
                                onPeriodValueResult={handlePeriodValueResult}   parrentPeriodValue = {this.state.item.period_value}
                                onDatePeriodResult = {handleDatePeriodResult}   parrentDatePeriod = {this.state.item.date_period}
                                onAllTimePeriodResult={handleAllTimePeriodResult} parrentAllTimePeriod ={this.state.item.allTimePeriod}
                                onRangeFromResult={handleRangeFromResult} parrentRangeFrom ={this.state.item.range_from}
                                onRangeToResult={handleRangeToResult} parrentRangeTo={this.state.item.range_to}
                                />
                                <Col span={9} offset={5}>
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
                        <OperatingHoursPut
                            onSelectedRowKeysResult={handleSelectedRowKeysResult} parrentSelectedRowKeys = {this.state.item.selectedRowKeys}
                            onIsSelectableDatesResult = {handleIsSelectableDatesResult} parrentIsSelectableDates = {this.state.item.isSelectableDates}
                            onOperateDateResult={handleOperateDateResult} parrentOperateDate = {this.state.item.operateDays}
                            />
                        </Row>
                        <Divider type="horizontal"></Divider>
                        <Row>
                            <Col span={24} ><Text strong>BLOG:</Text></Col>
                        </Row>
                        <div className={styles.operating_hours_data}>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col span={3} ><Text >SUBJECT</Text></Col>
                                <Col span={10} ><Input name="subject" value={this.state.item.subject} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                            </Row>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col span={3} ><Text >DESCRIPTION</Text></Col>
                                <Col span={10} ><TextArea name="description" value={this.state.item.description} onChange={this.handleInputChange} rows={5} /></Col>
                            </Row>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col span={3} ><Text >SELECT IMAGES</Text></Col>
                                <Row span={4} >
                                    {/* <Upload
                                         action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                         listType="picture-card"
                                         fileList={this.state.item.fileList}
                                         onChange={this.handleImageChange }
                                         onPreview={this.onPreviewImage}
                                       >
                                         {this.state.fileList.length < 4 && '+ Upload' }
                                    </Upload> */}
                                    <UploadFile 
                                    onUploadFileListResult = {handleUploadFileListResult} parrentUploadFileList = {this.state.item.fileList}
                                    />
                                </Row>
                            </Row>
                        </div>
                     
                    </div>

                </Card>
            </div >
        )
    }
}
export default poi_formupdate;
