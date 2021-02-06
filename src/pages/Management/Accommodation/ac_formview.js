import React, { useContext, useState, useEffect, useRef } from 'react'
import { Row, Col, Button, Card, Divider, Typography, Input, message, Menu, Dropdown, Form, Table, Space, Popconfirm, InputNumber, Rate, Upload } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined, CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './ac.module.css'
import styless from '../../../App.css'
// import styles from '../../../App.css'

import { Link } from 'react-router-dom';

//antd element
const { Text, Title } = Typography
const { TextArea } = Input;
const EditableContext = React.createContext();
const axios = require('axios');

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

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    adulteditable,
    childeditable,
    noteeditable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async (e) => {
        try {
            const values = await form.validateFields();
            console.log('value_save_table', values)
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        // paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }
    if (childeditable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
            >
                <Input type="number" ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }
    if (adulteditable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input type="number" ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }
    if (noteeditable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
            // rules={[
            //     {
            //         required: true,
            //         message: `${title} is required.`,
            //     },
            // ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};

class Accomodation_Formview extends React.Component {
    constructor(props) {
        super()
        this.state = {
            name: "",
            fields: {},
            imageUrl: "",
            gps_map: "",
            property_name: "",
            property_type: "Hotel",
            country: "Thailand",
            address_1: "",
            address_2: "",
            city: "",
            postcode: "",
            phone_number: "",
            email: "",
            // room_type: "",
            // note: "",
            remarks: "",
            latitude: 0,
            longitude: 0,
            // value_sleep1: 0,
            // value_sleep2: 0,
            fields: {},
            error: {},
            data_allrooms: [
                {
                    key: '0',
                    room_type: "",
                    adult: "",
                    child: 0,
                    today_price: "",
                    note: ""
                }
            ],
            // country: 2,
            // today_price: 0,
            count: 1,
            rate_star: 0,
            loading: false
        };
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        this.state.data_allrooms.map(res => {
            let fieldsAllRoom = res
            if (!fieldsAllRoom["room_type"]) {
                formIsValid = false;
                errors["roomType"] = "Room type Cannot emty";
            }
        })

        //Name
        if (!fields["address_1"]) {
            formIsValid = false;
            errors["address_1"] = "Cannot be empty";
        }

        if (!fields["property_name"]) {
            formIsValid = false;
            errors["property_name"] = "Cannot be empty";
        }

        // if (!fields["postcode"]) {
        //     formIsValid = false;
        //     errors["postcode"] = "Cannot be empty";
        // }

        if (typeof fields["property_name"] !== "undefined") {
            if (!fields["property_name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["property_name"] = "Only letters";
            }
        }

        // //Email
        // if (!fields["email"]) {
        //     formIsValid = false;
        //     errors["email"] = "Cannot be empty";
        // }

        // if (typeof fields["email"] !== "undefined") {
        //     let lastAtPos = fields["email"].lastIndexOf('@');
        //     let lastDotPos = fields["email"].lastIndexOf('.');

        //     if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        //         formIsValid = false;
        //         errors["email"] = "Email is not valid";
        //     }
        // }
        this.setState({ error: errors });
        return formIsValid;
    }

    handleInputChange = (field, event) => {
        // const target = event.target;
        // const { name, value } = target
        // this.setState({
        //     [name]: value
        // });
        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({ fields })
    }

    ontoday_price = (number, today_price) => {
        this.setState({
            today_price: number
        })
    }

    submit_save = event => {
        event.preventDefault();
        if (this.handleValidation()) {
            let formdata = {
                image: this.state.imageUrl,
                rate: this.state.rate_star,
                lat: this.state.fields.lat,
                long: this.state.fields.long,
                property_name: this.state.fields.property_name,
                property_type: this.state.property_type,
                address1: this.state.fields.address_1,
                address2: this.state.fields.address_2,
                city: this.state.fields.city,
                country: this.state.country,
                post_code: this.state.fields.postcode,
                phone_number: this.state.fields.phone_number,
                email: this.state.fields.email,
                datasource_allroom: this.state.data_allrooms,
                remarks: this.state.fields.remarks,
            }
            console.log('formdata', formdata)
            axios({
                method: 'post',
                // url: 'http://localhost:5000/api/accommodation',
                url: 'http://13.229.16.186:5000/api/accommodation/',
                data: formdata
                // config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
                .then((response) => {
                    //handle success
                    this.props.history.push("/accom_list")
                    console.log('api response ==>', response)

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
        } else {
            alert("Form has errors.")
        }

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

    handleChangeRate = value => {
        console.log('value_rate', value)
        this.setState({
            rate_star: value
        });
    };

    todayPriceOnChange = (value) => {
        console.log('changed', value);
        this.setState({
            today_price: value
        })
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.data_allrooms];
        this.setState({
            data_allrooms: dataSource.filter((item) => item.key !== key),
        });
    };
    handleAdd = () => {
        const { count, data_allrooms } = this.state;
        console.log('even click add', count, data_allrooms)
        const newData = {
            key: count,
            room_type: "",
            adult: "",
            child: 0,
            today_price: "",
            note: ""
        };
        this.setState({
            data_allrooms: [...data_allrooms, newData],
            count: count + 1,
        });
    };
    handleSave = (row) => {
        const newData = [...this.state.data_allrooms];
        const index = newData.findIndex((item) => row.key === item.key);
        console.log('indexxx', index)
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        console.log('newData', newData)
        this.setState({
            data_allrooms: newData,
        });
    };

    value_sleeps = ({ key }, value_sleep1) => {
        console.log(key)
        // const { count, data_allrooms } = this.state;
        console.log('aaaaaa', ...this.state.data_allrooms)
        console.log()
        this.setState({
            value_sleep1: key

        })
        message.info(`Click on item ${key}`);
    };

    render() {
        console.log(this.state)
        //table allroom
        const allrooms_columns = [
            {
                title: 'Action',
                key: 'action',
                render: (text, record) =>
                    this.state.data_allrooms.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <span style={{ fontSize: "14px", height: "20px" }}><DeleteOutlined /></span>
                        </Popconfirm>
                    ) : null,
            },
            {
                title: 'Room Type',
                dataIndex: 'room_type',
                key: 'room_type',
                editable: true,
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>
                        {text}
                        {/* <Input name="room_type" value={this.state.room_type} onChange={this.handleInputChange} style={{ width: "auto" }} /> */}
                    </span>
                ),
            },
            {
                // align: "center",
                title: 'Adult',
                dataIndex: 'adult',
                key: 'adult',
                width: 100,
                adulteditable: true,
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>
                        {text}
                    </span>
                ),
                // render: (text) => (
                //     <span style={{ fontSize: "12px" }}>
                //         <Space>
                //             <Dropdown overlay={sleeps_menu} >
                //                 <Button onClick={e => e.preventDefault()} size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >
                //                     {this.state.value_sleep1}<DownOutlined />
                //                 </Button>
                //             </Dropdown> +
                //                 <Dropdown overlay={sleeps_menu2} >
                //                 <Button onClick={e => e.preventDefault()} size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >
                //                     {this.state.value_sleep2}<DownOutlined />
                //                 </Button>
                //             </Dropdown>
                //         </Space>
                //     </span>
                // ),
            },
            {
                // align: "center",
                title: 'Child',
                dataIndex: 'child',
                width: 100,
                key: 'child',
                childeditable: true,
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>
                        {text}
                    </span>
                ),
                // render: (text) => (
                //     <span style={{ fontSize: "12px" }}>
                //         <Space>
                //             <Dropdown overlay={sleeps_menu} >
                //                 <Button onClick={e => e.preventDefault()} size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >
                //                     {this.state.value_sleep1}<DownOutlined />
                //                 </Button>
                //             </Dropdown> +
                //                 <Dropdown overlay={sleeps_menu2} >
                //                 <Button onClick={e => e.preventDefault()} size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >
                //                     {this.state.value_sleep2}<DownOutlined />
                //                 </Button>
                //             </Dropdown>
                //         </Space>
                //     </span>
                // ),
            },
            {
                title: "Today's Price",
                dataIndex: 'today_price',
                key: 'today_price',
                adulteditable: true,
                width: 150,
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>
                        {text}
                    </span>
                ),
                // render: (text) => (
                //     <span style={{ fontSize: "12px" }}>
                //         {/* <InputNumber onChange={this.ontoday_price} size={"small"} min={0} step={0.25} /> */}
                //         <InputNumber
                //             name="today_price"
                //             // value={this.state.today_price}
                //             defaultValue={0}
                //             min={0}
                //             step={0.25}
                //             size={"small"}
                //             formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                //             parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                //             onChange={this.todayPriceOnChange}
                //         />
                //     </span>
                // ),
            },
            {
                title: 'Note',
                dataIndex: 'note',
                key: 'note',
                noteeditable: true,
                render: (text) => (
                    <span style={{ fontSize: "12px" }}>
                        {text}
                        {/* <Input name="note" value={this.state.note} onChange={this.handleInputChange} style={{ width: "auto" }} size={"small"} /> */}
                    </span>
                ),
            }
        ]

        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = allrooms_columns.map((col) => {
            if (!col.editable && !col.childeditable && !col.adulteditable && !col.noteeditable) {
                return col;
            }


            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    childeditable: col.childeditable,
                    adulteditable: col.adulteditable,
                    noteeditable: col.noteeditable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });


        //dropdown type menu dropdown
        const value_type = ({ key }, property_type) => {
            this.setState({
                property_type: key
            })
            message.info(`Click on item ${key}`);
        };
        const type_menu = (
            <Menu onClick={value_type}>
                <Menu.Item key='Hotel'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Hotel
            </span>
                </Menu.Item>
                <Menu.Item key='Apartments'>
                    <span target="_blank" rel="noopener noreferrer" >
                        Apartments
            </span>
                </Menu.Item>
                <Menu.Item key="Guesthouses">
                    <span target="_blank" rel="noopener noreferrer" >
                        Guesthouses
            </span>
                </Menu.Item>
                <Menu.Item key="Resorts">
                    <span target="_blank" rel="noopener noreferrer">
                        Resorts
            </span>
                </Menu.Item>
                <Menu.Item key="Villas">
                    <span target="_blank" rel="noopener noreferrer" >
                        Villas
            </span>
                </Menu.Item>
                <Menu.Item key="Capsule_hotels">
                    <span target="_blank" rel="noopener noreferrer" >
                        Capsule Hotels
            </span>
                </Menu.Item>
            </Menu>
        );

        //dropdown county menu  
        const value_county = ({ key }, country) => {
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

        //dropdown sleeps1 menu  

        const sleeps_menu = (
            <Menu onClick={this.value_sleeps}>
                <Menu.Item key='0'>
                    <span target="_blank" rel="noopener noreferrer" >
                        0
            </span>
                </Menu.Item>
                <Menu.Item key='1'>
                    <span target="_blank" rel="noopener noreferrer" >
                        1
            </span>
                </Menu.Item>
                <Menu.Item key="2">
                    <span target="_blank" rel="noopener noreferrer" >
                        2
            </span>
                </Menu.Item>
                <Menu.Item key="3">
                    <span target="_blank" rel="noopener noreferrer">
                        3
            </span>
                </Menu.Item>
                <Menu.Item key="4">
                    <span target="_blank" rel="noopener noreferrer" >
                        4
            </span>
                </Menu.Item>
                <Menu.Item key="5">
                    <span target="_blank" rel="noopener noreferrer" >
                        5
            </span>
                </Menu.Item>
            </Menu>
        );

        //dropdown sleeps2 menu  
        const value_sleeps2 = ({ key }, value_sleep2) => {
            console.log(key)
            this.setState({
                value_sleep2: key
            })
            message.info(`Click on item ${key}`);
        };
        const sleeps_menu2 = (
            <Menu onClick={value_sleeps2}>
                <Menu.Item key='0'>
                    <span target="_blank" rel="noopener noreferrer" >
                        0
                    </span>
                </Menu.Item>
                <Menu.Item key='1'>
                    <span target="_blank" rel="noopener noreferrer" >
                        1
                    </span>
                </Menu.Item>
                <Menu.Item key="2">
                    <span target="_blank" rel="noopener noreferrer" >
                        2
                    </span>
                </Menu.Item>
                <Menu.Item key="3">
                    <span target="_blank" rel="noopener noreferrer">
                        3
                    </span>
                </Menu.Item>
                <Menu.Item key="4">
                    <span target="_blank" rel="noopener noreferrer" >
                        4
                    </span>
                </Menu.Item>
                <Menu.Item key="5">
                    <span target="_blank" rel="noopener noreferrer" >
                        5
                    </span>
                </Menu.Item>
            </Menu>
        );

        //upload image
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );

        return (
            <div className={styless.sitecard_borderless_wrapper}>
                <Card bordered={false}>
                    <Title level={3}>ACCOMMODATION MANAGEMENT</Title>
                    <div style={{ fontSize: "12px" }}>
                        {/* Col 24 */}
                        <Row>
                            <Space>
                                <Col span={5}>
                                    {/* <Link exact to="/accom_list"> */}
                                    <Button onClick={this.submit_save} icon={<SaveOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                        <p style={{ color: "white", position: "inherit" }}>Save</p>
                                    </Button>
                                    {/* </Link> */}
                                </Col>
                                <Col span={5}>
                                    <Link exact to="/accom_list">
                                        <Button icon={<DeleteOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                            <p style={{ color: "white", position: "inherit" }}>Delete</p>
                                        </Button>
                                    </Link>
                                </Col>
                                <Col span={14}>
                                    <Link exact to="/accom_list">
                                        <Button icon={<CloseOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                            <p style={{ color: "white", position: "inherit" }}>Discard</p>
                                        </Button>
                                    </Link>
                                </Col>
                            </Space>
                        </Row>
                        <Divider type="horizontal"></Divider>
                        <Row>
                            <Col span={24} style={{ textAlign: "end" }}><Rate onChange={this.handleChangeRate} style={{ fontSize: "12px" }} /></Col>
                        </Row>
                        <Row style={{ height: "auto" }}>
                            <Col span={7} style={{ paddingLeft: "2em" }}>
                                <Upload
                                    tabIndex={1}
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleImageChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', height: "100%" }} /> : uploadButton}
                                </Upload>
                            </Col>
                            {/* <Col span={5} offset={12} style={{ textAlign: "center" }}>
                                <Card style={{ width: "auto", height: "auto" }}>
                                    <div>
                                        <Text >GPS</Text>
                                    </div>
                                </Card>
                            </Col> */}
                            {/* <Col span={2} offset={12}><Text>LATITUDE</Text></Col>
                            <Col span={3} style={{ textAlign: "center" }}>
                                <Input name="latitude" type="number" value={this.state.latitude} style={{ width: "12.8em", right: "1em" }} onChange={this.handleInputChange} size={"small"} placeholder="" />
                            </Col> */}
                        </Row>
                        <Row >
                            <Col span={2} offset={19}><Text>LATITUDE</Text></Col>
                            <Col span={3} style={{ textAlign: "center" }}>
                                {/* <Input name="latitude" type="number" value={this.state.latitude} style={{ width: "12.8em", right: "1em" }} onChange={this.handleInputChange} size={"small"} placeholder="" /> */}
                                <Input name="latitude" ref="lat" value={this.state.fields["lat"]} onChange={this.handleInputChange.bind(this, "lat")} tabIndex={12} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                        </Row>
                        <Row style={{ height: "0px" }}>
                            <Col span={2} offset={19} ><Text>LONGITUDE</Text></Col>
                            <Col span={3} style={{ textAlign: "center" }}>
                                {/* <Input name="longitude" type="number" value={this.state.longitude} style={{ width: "12.8em", right: "1em" }} onChange={this.handleInputChange} size={"small"} placeholder="" /> */}
                                <Input name="longitude" ref="long" value={this.state.fields["long"]} onChange={this.handleInputChange.bind(this, "long")} tabIndex={12} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                            </Col>
                        </Row>
                        <div className={styles.operating_hours_data}>
                            <Row style={{ paddingBottom: "5px", height: "30px" }}>
                                <Col span={7}><Text strong>ADDRESSES INFO:</Text></Col>
                                <Col span={10} offset={3} ><Text strong>CONTACT INFO:</Text></Col>
                            </Row>
                            <div style={{ padding: "10px" }}>
                                <Row style={{ paddingBottom: "5px", height: "30px" }}>
                                    <Col span={3}><Text >PROPERTY NAME</Text></Col>
                                    <Col span={4}>
                                        <Space>
                                            <Input name="property_name" ref="property_name" value={this.state.fields["property_name"]} onChange={this.handleInputChange.bind(this, "property_name")} tabIndex={12} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                            <span className="error" style={{ color: "red" }}>{this.state.error["property_name"]}</span>
                                        </Space>
                                        {/* <Input tabIndex={2} name="property_name" value={this.state.property_name} onChange={this.handleInputChange} size={"small"} placeholder="" required /> */}
                                    </Col>
                                    <Col span={3} offset={4}><Text >PHONE NUMBER</Text></Col>
                                    <Col span={10}>
                                        <Input name="phone_number" ref="phone_number" value={this.state.fields["phone_number"]} onChange={this.handleInputChange.bind(this, "phone_number")} tabIndex={12} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                        {/* <span className="error" style={{ color: "red" }}>{this.state.error["phone_number"]}</span> */}
                                    </Col>
                                </Row>
                                <Row style={{ paddingBottom: "5px" }}>
                                    <Col span={3}><Text >PROPERTY TYPE</Text></Col>
                                    <Col span={4} >
                                        <Dropdown overlay={type_menu} >
                                            <Button tabIndex={3} size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.property_type}<DownOutlined /></Button>
                                        </Dropdown>
                                    </Col>
                                    <Col span={3} offset={4}><Text >EMAIL</Text></Col>
                                    <Col span={10}>
                                        <Space>
                                            <Input name="email" ref="email" value={this.state.fields["email"]} onChange={this.handleInputChange.bind(this, "email")} tabIndex={12} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                            <span className="error" style={{ color: "red" }}>{this.state.error["email"]}</span>
                                        </Space>{/* <Input tabIndex={10} name="email" value={this.state.email} style={{ width: "12.8em", right: "1em" }} onChange={this.handleInputChange} size={"small"} placeholder="" /> */}
                                    </Col>
                                </Row>
                                <Row style={{ paddingBottom: "5px" }}>
                                    <Col span={3}><Text >ADDRESSES 1</Text></Col>
                                    <Col span={4}>
                                        {/* <Input tabIndex={4} name="address_1" value={this.state.address_1} onChange={this.handleInputChange} size={"small"} placeholder="" /> */}
                                        <Space>
                                            <Input name="address_1" ref="address_1" value={this.state.fields["address_1"]} onChange={this.handleInputChange.bind(this, "address_1")} tabIndex={12} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                            <span className="error" style={{ color: "red" }}>{this.state.error["address_1"]}</span>
                                        </Space>
                                    </Col>
                                </Row>
                                <Row style={{ paddingBottom: "5px" }}>
                                    <Col span={3}><Text >ADDRESSES 2</Text></Col>
                                    <Col span={4}>
                                        {/* <Input tabIndex={5} name="address_2" value={this.state.address_2} onChange={this.handleInputChange} size={"small"} placeholder="" /> */}
                                        <Input name="address_2" ref="address_2" value={this.state.fields["address_2"]} onChange={this.handleInputChange.bind(this, "address_2")} tabIndex={12} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                    </Col>
                                </Row>
                                <Row style={{ paddingBottom: "5px" }}>
                                    <Col span={3} ><Text >CITY</Text></Col>
                                    <Col span={4} >
                                        {/* <Input tabIndex={6} name="city" value={this.state.city} onChange={this.handleInputChange} size={"small"} placeholder="" /> */}
                                        <Input name="city" ref="city" value={this.state.fields["city"]} onChange={this.handleInputChange.bind(this, "city")} tabIndex={12} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                    </Col>
                                </Row>
                                <Row style={{ paddingBottom: "5px" }}>
                                    <Col span={3}><Text >COUNTRY</Text></Col>
                                    <Col span={4}>
                                        <Dropdown overlay={county_menu} >
                                            <Button tabIndex={7} size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.country}<DownOutlined /></Button>
                                        </Dropdown>
                                    </Col>
                                </Row>
                                <Row style={{ paddingBottom: "5px" }}>
                                    <Col span={3}><Text >ZIP/POST CODE</Text></Col>
                                    <Col span={4}>
                                        {/* <Input tabIndex={8} name="postcode" value={this.state.postcode} onChange={this.handleInputChange} size={"small"} placeholder="" /> */}
                                        <Space>
                                            <Input name="postcode" ref="postcode" value={this.state.fields["postcode"]} onChange={this.handleInputChange.bind(this, "postcode")} tabIndex={12} style={{ width: "auto", display: "flex" }} size="small" placeholder="" />
                                            {/* <span className="error" style={{ color: "red" }}>{this.state.error["postcode"]}</span> */}
                                        </Space>
                                    </Col>
                                </Row>
                            </div>

                        </div>
                        <Divider type="horizontal"></Divider>
                        <Row>
                            <Col span={24}><Text strong>ALL ROOMS:</Text>
                                <span className="error" style={{ color: "red" }}>{this.state.error["roomType"]}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Table components={components} rowClassName={() => 'editable-row'} pagination={false} columns={columns} dataSource={this.state.data_allrooms}>
                                </Table>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={2} offset={22} style={{ textAlign: "right" }}>
                                <Button onClick={this.handleAdd} style={{ display: 'flex', background: '#1890ff' }}>
                                    <p style={{ color: "white", position: "inherit" }}>+ Add</p>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <Text strong style={{ fontSize: "12px" }}>REMARKS:</Text>
                    <br />
                    {/* <TextArea name="remarks" value={this.state.remarks} onChange={this.handleInputChange} style={{ width: "50em" }} rows={4} /> */}
                    <TextArea name="remarks" ref="remarks" value={this.state.fields["remarks"]} onChange={this.handleInputChange.bind(this, "remarks")} style={{ width: "50em" }} rows={4} />
                </Card>
            </div >
        )
    }
}
export default Accomodation_Formview;
// export default () => (
// )