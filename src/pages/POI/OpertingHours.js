
import React, { useEffect, useState} from 'react'
import { Row, Col, Typography, Table, Space, Card, Button, Divider} from 'antd';
import API from '../../services/apiRoot'
import {FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import PoiAutocomplete from './PoiAutocomplete'
import './poi.module.css'

const { Title } = Typography
function  Poi_List () {
    const [dataSource, setDataSource] = useState([]);
    const [poiPlaceList, setPoiPlaceLst] = useState([])
    const [poiChildSelectPlace, setPoiChildSelectPlace] = useState('')
    // const [display_place, setDisplayPlace] = useState([]);
    // const [autocomplete_place, setAutoCompletePlace] = useState([]); 
    // const [item_place, setItemPlace] = useState([]);
    // const [select_place, setSelectPlace] = useState("");

    // API.get(`api/poi`).then(async (response) =>  {
    //     // console.log('api response ==>', response.data)
    //     await setDataSource(response.data)
    //           setPoiPlaceLst(response.data)
    //     // setDisplayPlace(response.data)

    //   }).catch((error) => {
    //     //   console.log(error);
    //     return{error:error}
    // });
    console.log(dataSource)
    useEffect (() =>{
        API.get(`api/poi`).then(async (response) =>  {
          // console.log('api response ==>', response.data)
          await setDataSource(response.data)
                setPoiPlaceLst(response.data)
        })
      },[])

    const onclickUpdate = (event) => {
        console.log(event)
        console.log(this.props.history);
        this.props.history.push("/poi_formupdate/" + event)
      
    }
    const handlePoiAutoCompleteResult = (data) => {
        setPoiChildSelectPlace(data)
    }
 
    // const place_auto_change = (data) => {
    //     setSelectPlace(data)
    // }

    // const InputSearchHandler = async() => {
    //     await place_auto_change 
    //         this.display_place = dataSource.filter(x => x.display_name.includes(select_place))
    //         setDisplayPlace(display_place)
    // }

    // const onClickSorter = () => {
    //     this.display_place = dataSource.filter(x => x.display_name.includes(select_place))
    //     setDisplayPlace(display_place)
    // }

    const tableOnChange = (pagination, filters, sorter, extra) => {
        console.log('params',pagination, filters, sorter, extra );
    }
    // this.autocomplete_place =[]
    // item_place.forEach(place => {
    //     autocomplete_place.push({
    //         "value" : place.display_name
    //     })
    // })
    // const options_place = autocomplete_place;


    const columns = [
        {
            title: 'Action',
            key: 'action_id',
            dataIndex: "action_id",
            render: (data, record) =>
                (
                    < Space size="small" >
                        <span value={data} onClick={() => onclickUpdate(data)} style={{ fontSize: "12px" }}><FormOutlined /></span>
                        {/* <span><FormOutlined /></span>
                    <span><FormOutlined /></span> */}
                    </Space >
                ),
        },
        {
            title: 'Place',
            dataIndex: 'display_name',
            key: 'display_name',
            render: (text) => (
                <span style={{ fontSize: "12px" }}>{text}</span>
            ),
            sorter: (a, b) => b.display_name.length - a.display_name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Type',
            dataIndex: 'type_poi',
            key: 'type_poi',
            filters: [
                {
                    text: 'Attractions',
                    value: 'Attractions',
                },
                {
                    text: 'Restaurant',
                    value: 'Restaurant'
                },
                {
                    text: 'Shopping',
                    value: 'Shopping',
                },
                {
                    text: 'Beauty',
                    value: 'Beauty',
                },
                {
                    text: 'Entertainment',
                    value: 'Entertainment',
                },
            ],
            
            onFilter: (value, record) => record.type_poi.indexOf(value) === 0,
            render: (text) => (
                <span style={{ fontSize: "12px" }}>{text}</span>
            ),
            sorter: (a, b) => b.type_poi.length - a.type_poi.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Addresses',
            dataIndex: 'address_1',
            key: 'address_1',
            render: (text) => (
                <span style={{ fontSize: "12px" }}>{text}</span>
            ),
            sorter: (a, b) => a.address_1.length - b.address_1.length,
            sortDirections: ['descend'],
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            render: (text) => (
                <span style={{ fontSize: "12px" }}>{text}</span>
            ),
            sorter: (a, b) => a.city.length - b.city.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            filters: [
                {
                    text: 'Thailand',
                    value: 'Thailand',
                },
                {
                    text: 'Taiwan',
                    value: 'Taiwan'
                },
                {
                    text: 'China',
                    value: 'China',
                },
                {
                    text: 'Korea',
                    value: 'Korea',
                },
                {
                    text: 'Japan',
                    value: 'Japan',
                },
            ],
            onFilter: (value, record) => record.country.indexOf(value) === 0,
            render: (text) => (
                <span style={{ fontSize: "12px" }}>{text}</span>
            ),
            sorter: (a, b) => a.country.length + b.country.length,
            sortDirections: ['descend'],
        }
        
    ];
           
 return(
    <div >
            <Card bordered={false} style={{ width: '100%' }}>
                <Title style={{ color: '#434343' }} level={3}>POIN OF INTEREST (POI)</Title>
                <div style={{ color: '#434343' }}>
                    <Row style={{ fontSize: "12px" }}>
                        <Col span={11}>
                            <Link exact to="/poi_new">
                                {<Button style={{ width: '20%', background: '#1890ff' }}>
                                    <p style={{ fontSize: "12px", height: "auto", color: "white" }}>+ Add</p>
                                </Button>}
                            </Link>
                        </Col>
                        <Col span={4} style={{ textAlign: "right"}}>
                            <Space>
                            
                            </Space>
                        </Col>
                        <Col span={4} style={{ textAlign: "right", right: "15px" }}>
                            <Space>
                            
                            </Space>
                        </Col>
                        <Col span={5} style={{ textAlign: "right" }}>
                            <Space>
                                <span style={{ display: "flex", paddingBottom: 5 }}>
                                    PLACE
                                </span>
                                <Col span={10}>
                                    <PoiAutocomplete itemPoi={poiPlaceList} onPoiAutoCompleteResult={handlePoiAutoCompleteResult} />
                                    {/* <AutoComplete
                                        dropdownClassName="certain-category-search-dropdown"
                                        dropdownMatchSelectWidth={20}
                                        style={{
                                            width: 150,
                                            bottom: 5
                                        }}
                                        options={options_place}
                                        filterOption={(inputValue, option) =>
                                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                        value={select_place}
                                        onChange={place_auto_change}
                                    >
                                        <Input
                                        value = {select_place}
                                            onChange = {InputSearchHandler}
                                            onSelect ={this.onClickSorter.bind(this,select_place)}
                                        size="small" placeholder="input search text" />
                                    </AutoComplete> */}
                                </Col>
                            </Space>
                        </Col>
                    </Row>

                </div>

                <Divider type="horizontal"></Divider>
                <Table onChange={tableOnChange} pagination={false} columns={columns} dataSource={dataSource} size="small"></Table>
            </Card>
            </div >
 )

}   
export default Poi_List;