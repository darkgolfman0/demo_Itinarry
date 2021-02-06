import React, {useState} from 'react'
import { Row, Col, Input, Menu, Dropdown, Button, Card, Divider, Upload, message, Space, Typography, DatePicker, Checkbox, Popconfirm, Radio } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined, CloseOutlined, LoadingOutlined, PlusOutlined, QuestionCircleOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom'
// import {Field, FieldError, Form} from 'react-jsonschema-form-validation';
import axios from 'axios'
import moment from 'moment';
// import yup from 'yup';



import styles from '../../../App.css'
import FormItem from 'antd/lib/form/FormItem';
import { DATE_FORMAT } from '../../../commons/dateformat';
// import currencyList from "../../../currencyList.js"

const { Text, Title } = Typography
const { TextArea } = Input;
// const locale = "en-us";

// const yupObject = yup.object().shape({
//     display_name: yup.string().required("Can't empty"),
// })
// const demoSchema = {
//     type: 'object',
//     properties:{
//         display_name: {type: 'string'},

//     },
//     required:[
//         'display_name',
//     ],
// };


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
function activeChange (e) {
    console.log(`checked = ${e.target.checked}`);
    // if (e.target.checked === false) {
    //     console.log('cheacked = false')
    // } else {
    //     console.log('cheacked = true')
    // }
}

class User_Profile_Formview extends React.Component {
    constructor() {
        super();
        this.state = {  
            fields: {},
            imageUrl :"",
            title: "Mr.",
            active: false,
            display_name: "",
            user_name: "",
            password: "",
            date_of_birth: "",
            mobile: "",
            email: "",
            addresses1: "",
            addresses2: "",
            city: "",
            country: "Thailand",
            post_code: "",
            about_us: "",
            loading: false,
            error:{},
            role:"Admin",
          
        };
    }
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["display_name"]) {
            formIsValid = false;
            errors["display_name"] = "Cannot be empty";
        }
        if (!fields["user_name"]) {
            formIsValid = false;
            errors["user_name"] = "Cannot be empty";
        }
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }

        this.setState({ error: errors });
        return formIsValid;
    }
    handleInputChangeField = (field, event) => {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({ fields })
    }
    submit_save = (event) => {
        if(this.handleValidation()){
            const formdata = {
                imageUrl: this.state.imageUrl,
                title: this.state.title,
                active: this.state.active,
                display_name: this.state.fields.display_name,
                user_name: this.state.fields.user_name,
                password: this.state.fields.password,
                date_of_birth: this.state.date_of_birth,
                mobile: this.state.mobile,
                email: this.state.email,
                addresses1: this.state.addresses1,
                addresses2: this.state.addresses2,
                city: this.state.city,
                country: this.state.country,
                post_code: this.state.post_code,
                about_us: this.state.about_us,
                role: this.state.role,
            
            }
            console.log('formdata', formdata )
            axios({
                method: 'post',
                // url: 'http://localhost:5000/api/userprofile',
                url: 'http://13.229.16.186:5000/api/userprofile/',
                data: formdata
                // config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
                .then((response) => {
                    //handle success
                    console.log('api response ==>', response)
                    this.props.history.push("/user_profile")
                    return response
                    // return this.setState({ data: response})
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
    
    checkOnChange = e => {
        console.log(`checked = ${e.target.checked}`);
        if ( e.target.checked === false){
            console.log('checked = false')
            this.setState({
               active: false
            });

        }else {
            console.log('checked = true')
            this.setState({
                active: true
             });
        }
    }
       
    cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    }

    date_onChange = (date,dateString) => {
        console.log(dateString);
        this.setState({
            date_of_birth: dateString
        });
    }
    
    

    value_title = ({ key }) => {
        this.setState({
            title : key
        })
        message.info(`Click on item ${key}`);
    };
    value_role_table = ({ key }) => {
        this.setState({
            role : key
        })
        message.info(`Click on item ${key}`);
    };

    value_county = ({ key }) => {
        this.setState({
           country: key
        })
        message.info(`Click on item ${key}`);
    };

    // onChange(date, dateString) {
    //     console.log(date, dateString);
    // }

    handleInputChange = (event) => {
        console.log(event.target)
        const target = event.target;
        const { name, value } = target
        this.setState({
           [name]: value
        });
    }
    handleImageChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {
        console.log(this.state)
        //dropdown menu  
        const type_menu = (
            <Menu onClick={this.value_title}>
                <Menu.Item key='Mr.'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Mr.
                            </span>
                </Menu.Item>
                <Menu.Item key='Ms.'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Ms.
                            </span>
                </Menu.Item>
            </Menu>
        );

        const county_menu = (
            <Menu onClick={this.value_county}>
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
        const role_menu_table = (
            <Menu 
            onClick={this.value_role_table}
            >
              <Menu.Item key='Admin'>
                <span target="_blank" rel="noopener noreferrer" >
                  Admin
                      </span>
              </Menu.Item>
              <Menu.Item key='Sales'>
                <span target="_blank" rel="noopener noreferrer" >
                  Sales
                      </span>
              </Menu.Item>
              <Menu.Item key='Operator'>
                <span target="_blank" rel="noopener noreferrer" >
                  Operator
                      </span>
              </Menu.Item>
            </Menu>
          );

       
        const {loading, imageUrl} = this.state;
        const uploadButton = (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          );

        return (
            <div className={styles.sitecard_borderless_wrapper}>
                <Card bordered={false} style={{ width: '100%' }}>
                    <Title level={3}>USER PROFILE</Title>
                    <div style={{ fontSize: "12px" }}>
                        <Row>
                            <Space>
                                <Col span={5}>
                                    {/* <Link exact to="/user_profile"> */}
                                        <Button onClick={this.submit_save} icon={<SaveOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                            <p style={{ color: "white", position: "inherit" }}>Save</p>
                                        </Button>
                                    {/* </Link> */}
                                </Col>
                                <Col span={5}>
                                   
                                        <Link exact to="/user_profile">
                                        <Button icon={<DeleteOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                            <p style={{ color: "white", position: "inherit" }}>Delete</p>
                                        </Button>
                                    </Link>
                                
                                    
                                </Col>
                                <Col span={14}>
                                    <Link exact to="/user_profile">
                                        <Button icon={<CloseOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                            <p style={{ color: "white", position: "inherit" }}>Discard</p>
                                        </Button>
                                    </Link>
                                </Col>
                            </Space>
                        </Row>
                        <Divider ></Divider>
                        <div>
                            <Row >
                                <Col span={1} offset={1}>
                                    <Upload
                                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleImageChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                </Col>
                                <Col span={19} offset={2}>
                                    <Checkbox tabIndex={1} checked = {this.state.active} value = {this.state.active} onChange={this.checkOnChange} style={{ fontSize: "12px" }}>Active</Checkbox>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4} offset={4} style={{ bottom: "7.5em" }}>
                                    <Dropdown overlay={type_menu} >
                                        <Button tabIndex={2} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.title}<DownOutlined /></Button>
                                    </Dropdown>
                                </Col>
                                <Col span={2} offset={4} style={{ bottom: "7.5em" }}>
                                    <Text>ROLE</Text>
                                </Col>
                                <Col span={2} style={{ bottom: "7.5em" }}> 
                                    <Dropdown overlay={role_menu_table}>
                                        <Button tabIndex={3} size= "small" onClick={e => e.preventDefault()} style = {{ width: "auto", display: "flex" }} className="ant-dropdown-link" > {this.state.role}<DownOutlined/></Button>
                                        </Dropdown>
                                </Col>
                            </Row>
                            
                            <Row >
                                <Col span={4} offset={4} style={{ bottom: "7em" }}>
                                    <Input  name="display_name" ref= "display_name" value={this.state.fields["display_name"]} onChange={this.handleInputChangeField.bind(this, "display_name")} tabIndex={3} size={"small"} placeholder="Your Name..." />
                                    <span className="error" style={{ color: "red" }}>{this.state.error["display_name"]}</span>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={4} offset={4} style={{ bottom: "6.5em" }}>
                                    <Input tabIndex={4} name="user_name" ref={"user_name"} value={this.state.fields["user_name"]} onChange={this.handleInputChangeField.bind(this, "user_name")} size={"small"} placeholder="Username..." />
                                    <span className="error" style={{ color: "red" }}>{this.state.error["user_name"]}</span>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={4} offset={4} style={{ bottom: "6em" }}>
                                    <Input.Password tabIndex={5} style={{ fontSize: "12px", height: "20px" }} name="password" ref = "password" value={this.state.fields["password"]} onChange={this.handleInputChangeField.bind(this, "password")} size={"small"} placeholder="Password..." />
                                    <span className="error" style={{ color: "red" }}>{this.state.error["password"]}</span>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={4} style={{ bottom: "5.5em" }}>
                                    <Text strong>PERSONAL DETAILS:</Text>
                                </Col>
                                <Col span={4} offset={7} style={{ bottom: "5.5em" }}>
                                    <Text strong>ADDRESSES:</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={3} offset={1} style={{ bottom: "5em" }}>
                                    <Text>DATE OF BIRTH</Text>
                                </Col>
                                <Col span={4} style={{ bottom: "5em" }}>
                                    <DatePicker tabIndex={6} size={"small"} onChange={this.date_onChange} />
                                </Col>
                                <Col span={2} offset={4} style={{ bottom: "5em" }}>
                                    <Text>ADDRESSES1</Text>
                                </Col>
                                <Col span={4} style={{ bottom: "5em" }}>
                                    <Input tabIndex={10} type={"text"} name="addresses1" value={this.state.addresses1} onChange={this.handleInputChange} size={"small"} placeholder="" />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={3} offset={1} style={{ bottom: "4.5em" }}>
                                    <Text>PHONE NUMBER</Text>
                                </Col>
                                <Col span={4} style={{ bottom: "4.5em" }}>
                                    <Input tabIndex={7}  name="mobile" value={this.state.mobile} onChange={this.handleInputChange} size={"small"} placeholder="" />
                                </Col>
                                <Col span={2} offset={4} style={{ bottom: "5em" }}>
                                    <Text>ADDRESSES2</Text>
                                </Col>
                                <Col span={4} style={{ bottom: "5em" }}>
                                    <Input tabIndex={11} type={"text"} name="addresses2" value={this.state.addresses2} onChange={this.handleInputChange} size={"small"} placeholder="" />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={3} offset={1} style={{ bottom: "4em" }}>
                                    <Text>EMAIL</Text>
                                </Col>
                                <Col span={4} style={{ bottom: "4em" }}>
                                    <Input tabIndex={8} type={"email"} name="email" value={this.state.email} onChange={this.handleInputChange} size={"small"} placeholder="" />
                                </Col>
                                <Col span={2} offset={4} style={{ bottom: "4.5em" }}>
                                    <Text>CITY</Text>
                                </Col>
                                <Col span={4} style={{ bottom: "4.5em" }}>
                                    <Input tabIndex={12} type={"text"} name="city" value={this.state.city} onChange={this.handleInputChange} size={"small"} placeholder="" />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={3} style={{ bottom: "3.5em" }}>
                                    <Text strong>ABOUT US:</Text>
                                </Col>
                                <Col span={6} offset={1} style={{ bottom: "3.5em" }}>
                                    <TextArea tabIndex={9} name="about_us" value={this.state.about_us} onChange={this.handleInputChange} style={{ width: "50em" }} rows={4} />
                                </Col>
                                <Col span={2} offset={2} style={{ bottom: "4em" }}>
                                    <Text>COUNTRY</Text>
                                </Col>
                                <Col span={4} style={{ bottom: "4em" }}>
                                    <Dropdown overlay={county_menu} >
                                        <Button tabIndex={13} size="small" defaultValue = {'Thailand'} onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.country}<DownOutlined /></Button>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={2} offset={12} style={{ bottom: "7.5em" }}>
                                    <Text>ZIP/POST CODE</Text>
                                </Col>
                                <Col span={4} style={{ bottom: "7.5em" }} >
                                    <Input tabIndex={14} type={"text"} name="post_code" value={this.state.post_code} onChange={this.handleInputChange} size={"small"} placeholder="" />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default User_Profile_Formview;