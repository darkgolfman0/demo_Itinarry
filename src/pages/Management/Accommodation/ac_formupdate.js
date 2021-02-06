import React, { useContext, useState, useEffect, useRef } from 'react'
import { Row, Col, Button, Card, Divider, Popconfirm, Typography, Input, message, Menu, Dropdown, Form, Table, Space, InputNumber, Rate, Upload } from 'antd';
import { DownOutlined, QuestionCircleOutlined, SaveOutlined, DeleteOutlined, CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

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
                        paddingRight: 24,
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

class Accomodation_Formupdate extends React.Component {
    constructor(props) {
        super()
        // console.log('prop', props.match.params.id)
        this.state = {
            name: "",
            imageUrl: "",
            error: {},
            fields: {},
            item: {
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
                remarks: "",
                data_allrooms: [
                    {
                        key: '0',
                        room_type: "",
                        adult: "",
                        child: "",
                        today_price: "",
                        note: ""
                    }
                ],
                rate_star: 0,
                count: 0,
            },
            rate_star: 0,
            count: 1,
            loading: false,
            checkError: "",
            latitude: 0,
            longtitude: 0,
            data_allrooms: [
                {
                    key: '0',
                    room_type: "",
                    adult: "",
                    child: "",
                    today_price: "",
                    note: ""
                }
            ],
        };
    }

    componentDidMount = () => {
        // axios.get(`http://localhost:5000/api/accommodation/${this.props.match.params.id}`)
        axios.get(`http://13.229.16.186:5000/api/accommodation/${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    item: res.data,
                    imageUrl: res.data.image
                });
            })
            .catch(err => console.log(err))
    }

    handleInputChange = e => {
        e.persist();

        this.setState(prevState => ({
            item: { ...prevState.item, [e.target.name]: e.target.value }
        }))
    }

    ontoday_price = (number, today_price) => {
        this.setState({
            today_price: number
        })
    }

    handleValidation() {
        let fields = this.state.item;
        let errors = {};
        let formIsValid = true;

        fields.datasource_allroom.map(res => {
            let fieldsAllRoom = res
            if (!fieldsAllRoom["room_type"]) {
                formIsValid = false;
                errors["roomType"] = "Room type Cannot emty";
            }
        })

        // Name
        if (!fields["address1"]) {
            formIsValid = false;
            errors["address1"] = "Cannot be empty";
        }

        // if (!fields["property_name"]) {
        //     formIsValid = false;
        //     errors["property_name"] = "Cannot be empty";
        // }

        if (!fields["property_name"].match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            errors["property_name"] = "Cannot be empty And Not Number";
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

    submit_save = event => {
        event.preventDefault();
        if (this.handleValidation()) {
            let formdata = {
                image: this.state.imageUrl,
                rate: this.state.item.rate,
                property_name: this.state.item.property_name,
                property_type: this.state.item.property_type,
                address1: this.state.item.address1,
                address2: this.state.item.address2,
                city: this.state.item.city,
                country: this.state.item.country,
                post_code: this.state.item.post_code,
                phone_number: this.state.item.phone_number,
                email: this.state.item.email,
                datasource_allroom: this.state.item.datasource_allroom,
                remarks: this.state.item.remarks,
                count: this.state.item.count,
                lat: this.state.item.lat,
                long: this.state.item.long,
            }
            console.log('formdata', formdata)
            axios({
                method: 'put',
                url: `http://13.229.16.186:5000/api/accommodation/${this.props.match.params.id}`,
                data: formdata
                // config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
                .then((response) => {
                    //handle success
                    console.log('api response ==>', response)
                    this.props.history.push("/accom_list")
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
            alert("Check Fill Empty")
        }
    }

    confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
        // console.log('prop', this.props.match.params.id)
        axios({
            method: 'delete',
            url: `http://13.229.16.186:5000/api/accommodation/${this.props.match.params.id}`,
            // data: formdata
            // config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then((response) => {
                //handle success
                console.log('api response ==>', response)
                this.props.history.push("/accom_list")
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

    cancel = (e) => {
        console.log(e);
        message.error('Click on No');
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
                    imageUrl: imageUrl,
                    loading: false,
                }),
            );
        }
    };

    handleChangeRate = (value) => {
        console.log('value_rate', value)
        this.setState(prevState => ({
            item: { ...prevState.item, rate: value }
        }))
    };

    todayPriceOnChange = (value) => {
        console.log('changed', value);
        this.setState(prevState => ({
            item: { ...prevState.item, today_price: value }
        }))
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.data_allrooms];
        this.setState(prevState => ({
            // data_allrooms: dataSource.filter((item) => item.key !== key),
            item: { ...prevState.item, datasource_allroom: [...prevState.item.datasource_allroom.filter((item) => item.key !== key)] },
        }));
    };

    handleAdd = () => {
        const newData = {
            key: this.state.item.count++,
            room_type: "",
            adult: "",
            child: "",
            today_price: "",
            note: ""
        };
        console.log(newData)
        this.setState(prevState => ({
            item: { ...prevState.item, datasource_allroom: [...prevState.item.datasource_allroom, newData] },
            // item: { ...prevState.item, count: prevState.item.count + 1 }
        }));
    };

    handleSave = (row) => {
        const newData = [...this.state.item.datasource_allroom];
        const index = newData.findIndex((item) => row.key === item.key);
        console.log('indexxx', index)
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        console.log('newData', newData)
        this.setState(prevState => ({
            // data_allrooms: newData,
            item: { ...prevState.item, datasource_allroom: newData }
        }));
    };

    // value_sleeps = ({ key }, value_sleep1) => {
    //     console.log(key)
    //     // const { count, data_allrooms } = this.state;
    //     console.log('aaaaaa', ...this.state.data_allrooms)
    //     console.log()
    //     this.setState({
    //         value_sleep1: key

    //     })
    //     message.info(`Click on item ${key}`);
    // };

    render() {
        console.log(this.state)
        //table allroom
        const allrooms_columns = [
            {
                title: 'Action',
                key: 'action',
                render: (text, record) =>
                    this.state.item.datasource_allroom.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <span style={{ fontSize: "14px", height: "20px" }}><DeleteOutlined /></span>
                        </Popconfirm>
                    ) : null,
                // (
                //     < Space size="small" >
                //         <span style={{ fontSize: "14px", height: "20px" }}><DeleteOutlined /></span>
                //         {/* <a><FormOutlined /></a>
                //             <a><FormOutlined /></a> */}
                //     </Space >
                // )
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
            this.setState(prevState => ({
                item: { ...prevState.item, property_type: key }
            }))
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
                <Menu.Item key="Capsule Hotels">
                    <span target="_blank" rel="noopener noreferrer" >
                        Capsule Hotels
            </span>
                </Menu.Item>
            </Menu>
        );

        //dropdown county menu  
        const value_county = ({ key }, country) => {
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
                                    <Popconfirm
                                        title="Are you sure delete this task?"
                                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                        onConfirm={this.confirm}
                                        onCancel={this.cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button icon={<DeleteOutlined style={{ color: "white", marginTop: "-3px" }} />} style={{ display: 'flex', background: '#1890ff' }}>
                                            <p style={{ color: "white", position: "inherit" }}>Delete</p>
                                        </Button>
                                    </Popconfirm>
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
                            <Col span={24} style={{ textAlign: "end" }}><Rate value={this.state.item.rate} onChange={this.handleChangeRate} style={{ fontSize: "12px" }} /></Col>
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
                                    {/* <img src={this.state.item.image} alt="avatar" style={{ width: '100%', height: "100%" }} /> */}
                                </Upload>
                            </Col>
                            {/* <Col span={5} offset={12} style={{ textAlign: "center" }}>
                                <Card style={{ width: "auto", height: "auto" }}>
                                    <div>
                                        <Text >GPS</Text>
                                    </div>
                                </Card>
                            </Col> */}
                        </Row>
                        <Row >
                            <Col span={2} offset={19}><Text>LATITUDE</Text></Col>
                            <Col span={3} style={{ textAlign: "center" }}>
                                <Input name="lat" type="number" value={this.state.item.lat} style={{ width: "12.8em", right: "1em" }} onChange={this.handleInputChange} size={"small"} placeholder="" />
                            </Col>
                        </Row>
                        <Row style={{ height: "0px" }}>
                            <Col span={2} offset={19} ><Text>LONGITUDE</Text></Col>
                            <Col span={3} style={{ textAlign: "center" }}>
                                <Input name="long" type="number" value={this.state.item.long} style={{ width: "12.8em", right: "1em" }} onChange={this.handleInputChange} size={"small"} placeholder="" />
                            </Col>
                        </Row>
                        <div className={styles.operating_hours_data}>
                            <Row style={{ paddingBottom: "5px", height: "30px" }}>
                                <Col span={7}><Text strong>ADDRESSES INFO:</Text></Col>
                                <Col span={14} offset={3} ><Text strong>CONTACT INFO:</Text></Col>
                            </Row>
                            <div style={{ padding: "10px" }}>
                                <Row style={{ paddingBottom: "5px", height: "30px" }}>
                                    <Col span={3}><Text >PROPERTY NAME</Text></Col>
                                    <Col span={4}>
                                        <Space>
                                            <Input tabIndex={2} name="property_name" value={this.state.item.property_name} onChange={this.handleInputChange} size={"small"} placeholder="" />
                                            {/* <Input name="property_name" ref="property_name" value={this.state.item.property_name} onChange={this.handleInputChangeValid.bind(this, "property_name")} tabIndex={12} style={{ width: "auto", display: "flex" }} size="small" placeholder="" /> */}
                                            <span className="error" style={{ color: "red" }}>{this.state.error["property_name"]}</span>
                                        </Space>
                                    </Col>
                                    <Col span={3} offset={4}><Text >PHONE NUMBER</Text></Col>
                                    <Col span={10}><Input tabIndex={9} type="number" name="phone_number" value={this.state.item.phone_number} style={{ width: "12.8em", right: "1em" }} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                                </Row>
                                <Row style={{ paddingBottom: "5px" }}>
                                    <Col span={3}><Text >PROPERTY TYPE</Text></Col>
                                    <Col span={4} >
                                        <Dropdown overlay={type_menu} >
                                            <Button tabIndex={3} size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.item.property_type}<DownOutlined /></Button>
                                        </Dropdown>
                                    </Col>
                                    <Col span={3} offset={4}><Text >EMAIL</Text></Col>
                                    <Col span={10}><Input tabIndex={10} name="email" value={this.state.item.email} style={{ width: "12.8em", right: "1em" }} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                                </Row>
                                <Row style={{ paddingBottom: "5px" }}>
                                    <Col span={3}><Text >ADDRESSES 1</Text></Col>
                                    <Col span={4}>
                                        <Space>
                                            <Input tabIndex={4} name="address1" value={this.state.item.address1} onChange={this.handleInputChange} size={"small"} placeholder="" />
                                            {/* <Input tabIndex={4} name="address1" ref="address1" value={this.state.item.address1} onChange={this.handleInputChangeValid.bind(this, "address1")} tabIndex={12} style={{ width: "auto", display: "flex" }} size="small" placeholder="" /> */}
                                            <span className="error" style={{ color: "red" }}>{this.state.error["address1"]}</span>
                                        </Space>
                                    </Col>
                                </Row>
                                <Row style={{ paddingBottom: "5px" }}>
                                    <Col span={3}><Text >ADDRESSES 2</Text></Col>
                                    <Col span={4}><Input tabIndex={5} name="address2" value={this.state.item.address2} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                                </Row>
                                <Row style={{ paddingBottom: "5px" }}>
                                    <Col span={3} ><Text >CITY</Text></Col>
                                    <Col span={4} ><Input tabIndex={6} name="city" value={this.state.item.city} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
                                </Row>
                                <Row style={{ paddingBottom: "5px" }}>
                                    <Col span={3}><Text >COUNTRY</Text></Col>
                                    <Col span={4}>
                                        <Dropdown overlay={county_menu} >
                                            <Button tabIndex={7} size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.item.country}<DownOutlined /></Button>
                                        </Dropdown>
                                    </Col>
                                </Row>
                                <Row style={{ paddingBottom: "5px" }}>
                                    <Col span={3}><Text >ZIP/POST CODE</Text></Col>
                                    <Col span={4}><Input tabIndex={8} type="number" name="post_code" value={this.state.item.post_code} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col>
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
                                <Table components={components} rowClassName={() => 'editable-row'} pagination={false} columns={columns} dataSource={this.state.item.datasource_allroom}>
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
                    <TextArea name="remarks" value={this.state.item.remarks} onChange={this.handleInputChange} style={{ width: "50em" }} rows={4} />
                </Card>
            </div >
        )
    }
}
export default Accomodation_Formupdate;