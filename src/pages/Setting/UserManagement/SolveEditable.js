import React, { useContext, useState, useEffect, useRef } from 'react'
import { Row, Col, Input, Dropdown, Button, Card, Divider, InputNumber, Table, Space, Typography, Form, Menu, message, Checkbox, Popconfirm } from 'antd';
import { DownOutlined, FormOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from '../../../App.css'
import API from '../../../services/apiRoot'

const { Title } = Typography
const EditableContext = React.createContext();
const {Search} = Input;



const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const SolveEditable = (props,state) => {
  // console.log(props.dataSource.map(res => res.display_name))
  const [form] = Form.useForm();
  const [data, setData] = useState(props.dataSource);
  const [editingKey, setEditingKey] = useState('');
  const [active, setActive] = useState(false);
  const [name_title, setNameTitle] = useState('');
  const [display_name, setDisplayName] = useState('');
  const [role, setRole] = useState('');
  const [count, setCount] = useState(2);

  const value_role_table = ({key}) => { message.info(`Click on item ${key}`); setRole(key)};
  const value_title = ({key}) => { message.info(`Click on item ${key}`); setNameTitle(key)};
  const isEditing = (record) => record.key === editingKey;

  // data.map(res => {
  //   console.log(res.role)
  // })

  useEffect (() => {
    
    setData(props.dataSource)
  
    // setDisplayName(prop.dis)
  }, [props.dataSource], )

  // console.log('props ==> ',props.dataSource )

  const handleEdit = (record) => {
    console.log("edit >>>",record)
    form.setFieldsValue({
      name_title: '',
      display_name: '',
      role: '',
      active: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const handleAdd = () => {
    setCount(count)
    const newData = {
      key: count,
      name_title: "Mr.",
      display_name: " ",
      role: "Admin",
      active: "",
    };
    console.log('NewData ==> ',newData, data)
    setData(data => [...data, newData]);
    setCount(count + 1)
  };

  const handleCancel = (key) => {
    setEditingKey('');
  };
  const handleDelete = (key) => {
    const dataSource = [...data];
    setData(dataSource.filter((item) => item.key !== key))
    console.log('Delete >> ',key) 
  }

  const handleSave = async (key) => {

    try {
      const row = await form.validateFields();
      console.log('data',data)
      const newData = [...data];
      console.log('newData',newData)
      const index = newData.findIndex((item) => key === item.key);
      // console.log('newData',index)
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);        
        setEditingKey('');
        setActive(newData);
        // console.log('no')

      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
        console.log('asda')

      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }


  //   const  handleInputChange = (event) => {
  //     const [value, setValue] = useState();      
  //     setValue()
  // }

  

    // const formdata = {
    //   name_title : name_title,
    //   display_name : display_name,
    //   role : role,
    //   active : active,
    // }
    // console.log('formdata>>>>',formdata)
    // API.post((`api/usermanage`),formdata)
    // .then( (response) => {
    //   this.props.history.push("/usermanage")
    //   console.log('Post response ==>', response)
    //   return response
    // })
    // .catch((error) => {
    //   console.error(error)
    //   return (error, error)
    // })

  };

  const CheckedOnChange = e => {
      // console.log(`checked = ${e.target.checked}`);
      if ( e.target.checked === false){
          console.log('checked  = false')
          setActive(false)

      }else {
        console.log('checked  = true')
        setActive(true)
      }
      
  }
  

  const title_menu = (
    <Menu onClick={value_title}>
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

  const role_menu_table = (
    <Menu 
    onClick={value_role_table}
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
  

console.log('data_key >> ', display_name)

  const columns = [
    {
        title: 'Actions',
        dataIndex: 'data_id',
        key: 'data_id',
      
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span style={{ fontSize: "12px" }}>
              {/* save action */}
                <a onClick={() => handleSave(record.key)} style={{ marginRight: 8, }}> Save </a>
              {/* cancel action */}
                <a onClick={handleCancel}> Cancel </a>
            </span >
          ) : (
            // edit action
              <a style={{ fontSize: "12px" }} disabled={editingKey !== ''} onClick={() => handleEdit(record)}>
                Edit 
              </a>
            ); 
        },
      },
    {
      title: 'Title',
      dataIndex: 'name_title',
      key: 'name_title',
      render: (data,record) => {
        const editable = isEditing(record);
        return editable?(
          <span style={{ fontSize: "12px" }}>
          <Dropdown overlay={title_menu} disabled={false}>
            <Button size={"small"} value = {name_title} onClick={e => e.preventDefault()}  style={{ fontSize: "12px", height: "auto", width: "auto", display: "flex" }} className="ant-dropdown-link" > {name_title} <DownOutlined /></Button>
          </Dropdown>
        </span>
        ) :  <span style={{ fontSize: "12px" }} > {data} </span>
      },
      sorter: (a, b) => a.name_title.length - b.name_title.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Name',
      dataIndex: 'display_name',
      key: 'display_name',
      editable: true,
      // render: (data,record) => {
      //   const editable = isEditing(record);
      //   return editable?(
      //   <Input style={{ fontSize: "12px" }}  value = {data} />
      //   ) : <span style={{ fontSize: "12px" }} > {data} </span>

      // },
      render: (data,record) => (
        <span style={{ fontSize: "12px" }} > {data} </span>
      ),
      sorter: (a, b) => a.display_name.length - b.display_name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key:'role',
      render: (data, record) => {
        const editable = isEditing(record);
        return editable?(
          <span style={{ fontSize: "12px" }}>
          <Dropdown overlay={role_menu_table} disabled= {false }>
            <Button size={"small"} value = {role} onClick={e => e.preventDefault()} style={{ fontSize: "12px", height: "auto", width: "auto", display: "flex" }} className="ant-dropdown-link" >{data} <DownOutlined /></Button>
          </Dropdown>
        </span>
        ) : <span style={{ fontSize: "12px" }} > {data} </span>
      },
      sorter: (a, b) => a.role.length - b.role.length,
      sortDirections: ['descend'],
    },
    {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        render: (data,record) =>  {
            const editable = isEditing(record);
            return editable? (
                <span>
                <Checkbox onChange = {e => e.preventDefault()} checked = {data}  disabled ={false}>{data}</Checkbox>
            </span>
            ) :  <Checkbox  disabled = {true} checked = {data}></Checkbox>
        },
        sorter: (a, b) => a.active.length - b.active.length,
      sortDirections: ['descend'],
    
    },
   
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div className={styles.sitecard_borderless_wrapper}>
                <Card bordered={false} style={{ width: '100%' }}>
                    <Title level={3}>USER GROUP MANAGEMENT</Title>
                    <div style={{ cloor: "#434343" }}>
                        <Row style={{ fontSize: "12px" }}>
                            <Col span={11}>
                                {<Button onClick = {handleAdd} style={{ width: '20%', background: '#1890ff' }}>
                                    <p style={{ fontSize: "12px", height: "auto", color: "white" }}>+ Add</p>
                                </Button>}
                            </Col>
                            <Col span={5} offset={2} style={{ marginLeft: " 30%" ,textAlign: "right" }}>
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
        <Form form={form} component={false}>
          <Table
          size = "small"
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName={() => 'editable-row'}
            pagination={false}
          />
        </Form>
        </Card>
    </div >
  );
};
export default SolveEditable; 
