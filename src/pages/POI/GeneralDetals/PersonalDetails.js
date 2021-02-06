import React, { Fragment, useState } from 'react';
import {Row, Col, Typography, Input, Menu, message, Divider, Dropdown, Card, Checkbox, Button, Rate} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './../poi.module.css';

const { TextArea } = Input;
const { Text } = Typography;

const PersonalDetails = (props) => {
    const [name, setName] = useState("")
    const [star_rate, setStarRate] = useState("")
    const [country, setCountry] = useState("Thailand")
    const [type_poi, setTypePoi] = useState("Attractions")
    const [display_name, setDisplayName] = useState("")
    const [active, setActive] = useState(true)
    const [address_1, setAddress1] = useState("")
    const [address_2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [postcode, setPostCode] = useState("")
    const [phone, setPhone] = useState("")
    const [avg, setAvg] = useState("")
    const [tips, setTips] = useState("")
    const [website, setWebsite] = useState("")

    const handleInputChange = (event) => {
        console.log(event.target)
        const target = event.target;
        const { name, value } = target
        setName([name] , value)
    }

    const handleStarChange = (value) => {
        console.log('value_star_rate', value)
        setStarRate(value)
    }
    const value_county = ({ key }) => {
        console.log(key)
        setCountry(key)
        message.info(`Click on item ${key}`);
    };
    const value_type = ({ key }) => {
        console.log(key)
        setTypePoi(key)
        message.info(`Click on item ${key}`);
    };
    const activestatusChange = (e) => {
        console.log(`checked = ${e.target.checked}`)
        setActive(e.target.checked)
    }
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

    return (
        
 <React.Fragment>
 <Divider type="horizontal"></Divider>
     <Row>
         <Col span={17}><Text strong>OPERATING HOURS:</Text></Col>
         <Col span={7} style={{ textAlign: "end" }}><Rate onChange={handleStarChange} style={{ fontSize: "12px" }} /></Col>
     </Row>
     <div className={styles.operating_hours_data} >
         <Row style={{ paddingBottom: "5px", height: "30px" }}>
             <Col span={3}><Text >DISPLAY NAME</Text></Col>
             <Col span={4}>
                 <Input tabIndex={1} name="display_name"  value={display_name} onChange={() => setDisplayName()} size={"small"} placeholder="" />
                 {/* <Input tabIndex={1} name="display_name" ref="display_name" value={this.state.fields["display_name"]} onChange={this.handleInputChangeField.bind(this, "display_name")} size={"small"} placeholder="" />
                 <span className="error" style={{ color: "red" }}>{this.state.error["display_name"]}</span> */}
             </Col>
             <Col span={13} style={{ paddingLeft: "5%" }}>
                 <Checkbox checked={active} value={active} onChange={activestatusChange} style={{ fontSize: "12px" }} tabIndex={8}>ACTIVE</Checkbox>
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
                 <Input tabIndex={2} name="address_1"  value={address_1} onChange={() => setAddress1()} size={"small"} placeholder="" />
                 {/* <Input tabIndex={2} name="address_1" ref="address_1" value={this.state.fields["address_1"]} onChange={this.handleInputChangeField.bind(this, "address_1")} size={"small"} placeholder="" />
                 <span className="error" style={{ color: "red" }}>{this.state.error["address_1"]}</span> */}
             </Col>
             <Col span={4} style={{ paddingLeft: "5%" }}><Text >PHONE</Text></Col>
             <Col span={4} ><Input tabIndex={9} name="phone" value={phone} onChange={() => setPhone()} size={"small"} placeholder="" /></Col>
         </Row>
         <Row style={{ paddingBottom: "5px" }}>
             <Col span={3}><Text >ADDRESSES 2</Text></Col>
             <Col span={4}><Input tabIndex={3} name="address_2" value={address_2} onChange={() => setAddress2()} size={"small"} placeholder="" /></Col>
             <Col span={4} style={{ paddingLeft: "5%" }}><Text >WEBSITE</Text></Col>
             <Col span={4} ><Input tabIndex={10} name="website" value={website} onChange={() => setWebsite()} size={"small"} placeholder="" /></Col>
         </Row>
         <Row style={{ paddingBottom: "5px" }}>
             <Col span={3} ><Text >CITY</Text></Col>
             <Col span={4} ><Input tabIndex={4} name="city" value={city} onChange={() => setCity()} size={"small"} placeholder="" /></Col>
             <Col span={4} style={{ paddingLeft: "5%" }}><Text >AVG. PLAY TIME</Text></Col>
             <Col span={4} ><Input tabIndex={11} name="avg" value={avg} onChange={() => setAvg()} size={"small"} placeholder="" /></Col>
         </Row>
         <Row style={{ paddingBottom: "5px" }}>
             <Col span={3}><Text >COUNTRY</Text></Col>
             {/* <Col span={4}><Input name="country" value={this.state.country} onChange={this.handleInputChange} size={"small"} placeholder="" /></Col> */}
             <Col span={4}>
                 <Dropdown overlay={county_menu} >
                     <Button tabIndex={5} size={"small"} onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{country}<DownOutlined /></Button>
                 </Dropdown>
             </Col>
         </Row>
         <Row style={{ paddingBottom: "5px" }}>
             <Col span={3}><Text >ZIP/POST CODE</Text></Col>
             <Col span={4}><Input tabIndex={6} name="postcode" value={postcode} onChange={() => setPostCode()} size={"small"} placeholder="" /></Col>
         </Row>
         <Row >
             <Col span={3}><Text >TYPE</Text></Col>
             <Col span={4}>
                 <Dropdown overlay={type_menu}>
                     <Button tabIndex={7} size="small" onClick={e => e.preventDefault()} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{type_poi}<DownOutlined /></Button>
                 </Dropdown>
             </Col>
         </Row>
         <Row style={{ height: 0 }}>
             <Col span={4} offset={7} style={{ paddingLeft: "5%", bottom: "6em" }}><Text >TIPS</Text></Col>
             <Col span={4} style={{ bottom: "6em" }}>
                 <TextArea tabIndex={12} name="tips" value={tips} onChange={() => setTips()} style={{ width: "50em" }} rows={5} />
             </Col>
         </Row>
         </div>
     <Divider type="horizontal"></Divider>
</React.Fragment>   
       

    )
}
export default PersonalDetails