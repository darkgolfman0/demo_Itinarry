import React, { useContext, useState, useEffect, useRef } from 'react'
import { Row, Col, Input, Dropdown, Button, Card, Divider, Table, Space, Typography, Form, Menu, message, Checkbox, Popconfirm } from 'antd';
import { DownOutlined, FormOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import styles from '../../App.css'

// Typograpy Text
const { Title } = Typography
// search input
const { Search } = Input;
const axios = require('axios');

const EditableContext = React.createContext();

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
    // editing,
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
    // const [editingKey] = useState('');

    // const isEditing = (record) => record.key === editingKey;

    // const isEditing = (record) => record.key === editingKey;
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
                        padding: 0,
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

function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
}

class User_Manage extends React.Component {
    tableOnChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    constructor(props) {
        super()
        this.state = {
            dataSource: [],
            count: 2,
        };
        axios({
          method: 'get',
          url: 'http://localhost:5000/api/usermanage',
      
      })
          .then(async(response) => {
              //handle success
              console.log('api response ==>', response.data)
              const response_api = await response.data
              return this.setState(
                { 
                  dataSource: response_api,
                })
          })
          .catch((error) => {
              //handle error
              console.log(error);
              this.setState({
                  error: error
              })
          });



        this.title_menu = (
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

        this.role_menu_table = (
            <Menu onClick={this.value_role_table}>
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
        
       
    }

    
    onChangePerson = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            role: e.target.value,
        });
    };

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name_title : "Mr.",
            display_name: "",
            role: "Admin",
            active: false,
        };
        console.log(dataSource)
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };
    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    };


    value_role_table = ({ key }) => {
        this.setState({
            role: key
        })
        console.log(key)
        message.info(`Click on item ${key}`);
    };
    value_title = ({ key }) => {
      this.setState({
          name_title: key
      })
      console.log(key)
      message.info(`Click on item ${key}`);
  };

    value_active = ({ key }) => {
        this.setState({
            acive: key
        })
        console.log(key)
        message.info(`Click on item ${key}`);
    };

    render() {
    

      console.log(this.state)


      const manage_columns = [
        {
          title: 'Action',
          dataIndex: 'data_id',
          key: 'data_id',
          width: '10%',
          render: (text, record) =>
                  (
                      <span style=  {{fontsize: "12px"}}>
                          
                        <a style={{ fontSize: "12px" }} onClick={this.handleSave}>
                            Save
                        </a>
                      </span>
                    
                    ) 
      },
      
          {
              title: 'Title',
              dataIndex: 'name_title',
              key: 'name_title',
            //   editable: true,
              render: (data) => (
                <span style={{ fontSize: "12px" }}>
                    <Dropdown overlay={this.title_menu} >
                        <Button  size={"small"}  onClick={e => e.preventDefault()} style={{ fontSize: "12px", height: "auto", width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.value_title}  {data} <DownOutlined /></Button>
                    </Dropdown>
                </span>
            ),
            sorter: (a, b) => a.name_title.length - b.name_title.length,
            sortDirections: ['descend']
          },
          {
              title: 'Display Name',
              dataIndex: 'display_name',
              key: 'display_name',
              editable: true,
              render: (data) => (
                  <span style={{ fontSize: "12px" }}>
                      {data}
                  </span>
              ),
              sorter: (a, b) => a.display_name.length - b.display_name.length,
              sortDirections: ['descend'],
          },
          {
              title: 'Role',
              dataIndex: 'role',
              key: 'role',
              render: (data) => (
                  <span style={{ fontSize: "12px" }}>
                      <Dropdown overlay={this.role_menu_table} >
                          <Button  size={"small"} onChange={this.onChangePerson} style={{ fontSize: "12px", height: "auto", width: "auto", display: "flex" }} className="ant-dropdown-link" >{data} <DownOutlined /></Button>
                      </Dropdown>
                  </span>
              ),
              sorter: (a, b) => a.role.length - b.role.length,
              sortDirections: ['descend']
          },
          {
              title: 'Active',
              dataIndex: 'active',
              key: 'active',
              render: (data) => (
                  <span style={{ fontSize: "12px" }}>
                      <Checkbox onChange={onChange} checked = {data}></Checkbox>
                  </span>
              ),
              sorter: (a, b) => a.active.length - b.active.length,
              sortDirections: ['descend'],
          }
      ];


        const { dataSource, value_role, value_type } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const data_key = dataSource.map(row => (
          // console.log(row._id)
          {
              data_id: row._id,
              name_title: row.name_title,
              display_name: row.display_name,
              role: row.role,
              active: row.active     
          }
      ))
        const columns = manage_columns.map((col) => {
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
                    // editing: isEditing(record),
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div className={styles.sitecard_borderless_wrapper}>
                <Card bordered={false} style={{ width: '100%' }}>
                    <Title level={3}>USER GROUP MANAGEMENT</Title>
                    <div style={{ color: "#434343" }}>
                        <Row style={{ fontSize: "12px" }}>
                            <Col span={11}>
                                {<Button onClick = {this.handleAdd} style={{ width: '20%', background: '#1890ff' }}>
                                    <p style={{ fontSize: "12px", height: "auto", color: "white" }}>+ Add</p>
                                </Button>}
                            </Col>
                            <Col span={1} offset={2} style={{ textAlign: "right" }}>
                                <Space>
                              
                                </Space>
                            </Col>
                            <Col span={1} offset={2} style={{ textAlign: "right" }}>
                                <Space>
                                   
                                </Space>
                            </Col>
                            <Col span={5} offset={2} style={{ textAlign: "right" }}>
                                <Space>
                                    <span style={{ display: "flex", paddingBottom: 5 }}>
                                        USERNAME
                                    </span>
                                    <Search
                                        placeholder="input search text"
                                        onSearch={value => console.log(value)}
                                        style={{ fontSize: "12px", height: "auto", width: 'auto' }}
                                        size='small'
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </div>

                    <Divider type="horizontal"></Divider>
                    <Table size="small" components={components} rowClassName={() => 'editable-row'} pagination={false} columns={columns} dataSource={data_key} onChange={this.tableOnChange}></Table>
                </Card>
            </div >
        )
    }

}

export default User_Manage;