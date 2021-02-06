<Tabs defaultActiveKey="1" size={"small"} onChange={this.callback}>
<TabPane tab="POI" key="1">
    {/* Tab POI */}
    <div>
        <Card bordered={false} style={{ paddingBottom: "0px", paddingTop: "0px" }}>
            <div style={{ fontSize: "12px" }}>
                {/* Col 24 */}
                <div>
                    <Checkbox.Group value={this.state.poi_check_option} onChange={this.onSelectboxChangePoi}>
                        <Row style={{ height: "0" }}>
                            <Col span={8}>
                                <Checkbox value="ATTRACTION">ATTRACTION</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="RESTAURANT">RESTAURANT</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="SHOPPING">SHOPPING</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="BEAUTY & SPA">BEAUTY & SPA</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="ENTERTAINMENT">ENTERTAINMENT</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="EXPERIENCE">EXPERIENCE</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                    <Row>
                        <Col span={2} offset={14} style={{ bottom: "2em" }}>
                            <Text>PLACE</Text>
                        </Col>
                        <Col span={6} style={{ bottom: "2em" }}>
                            <Space>
                                <AutoComplete
                                    tabIndex={1}
                                    dropdownClassName="certain-category-search-dropdown"
                                    dropdownMatchSelectWidth={200}
                                    style={{ fontSize: "12px", height: "auto", width: 'auto' }}
                                    options={options_poi}
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    value={this.state.modal_poi.select_place}
                                    onChange={this.poi_auto_change}
                                >
                                    <Input.Search size="small" placeholder="SEARCH PLACE" />
                                </AutoComplete>
                                <Button size={"small"} icon={<PlusCircleOutlined style={{ color: "white", marginTop: "-5px", marginLeft: "-4px", fontSize: "13px" }} />} style={{ width: "20px", height: "20px", background: '#1890ff' }}></Button>
                            </Space>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={11}>
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                                style={{ fontSize: "12px", height: "auto" }}
                                size='small'
                            />
                        </Col>
                        <Col span={2} offset={3} style={{ bottom: "3.5em" }}>
                            <Text>TIME</Text>
                        </Col>
                        <Col span={6} style={{ bottom: "3.5em" }}>
                            <TimePicker
                                size={"small"}
                                // defaultValue={moment('00:00', format)}
                                value={moment(this.state.modal_poi.time, time_format)}
                                onChange={this.onChangePOITime}
                                format={time_format}
                                style={{ width: "80px" }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1} >
                            <Card
                                style={{ width: 200, height: "auto" }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    "Detail",
                                    "Select"
                                ]}
                            >
                                <Meta
                                    // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={1} offset={6}>
                            <Card
                                style={{ width: 200, height: "auto" }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    "Detail",
                                    "Select"
                                ]}
                            >
                                <Meta
                                    // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={10} offset={6} style={{ bottom: "3em" }}>
                            <Text strong>TICKETS AND PRICE:</Text>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={1} >
                            <Card
                                style={{ width: 200, height: "auto" }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    "Detail",
                                    "Select"
                                ]}
                            >
                                <Meta
                                    // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={1} offset={6}>
                            <Card
                                style={{ width: 200, height: "auto" }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    "Detail",
                                    "Select"
                                ]}
                            >
                                <Meta
                                    // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={2} offset={6} style={{ bottom: "24.5em" }}>
                            <Text>ADULT(12+)</Text>
                        </Col>
                        <Col span={7} offset={1} style={{ bottom: "24.5em" }}>
                            <Space>
                                <InputNumber
                                    size={"small"}
                                    value={this.state.modal_poi.adult_price}
                                    disabled={true}
                                    formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                // formatter={currencyFormatter(this.state.currency)}
                                // parser={currencyParser}
                                // onChange={this.onChangePOI_Adult_Price}
                                />
                                <Text>x</Text>
                                <Dropdown overlay={poi_adult_menu}>
                                    <Button size={"small"} style={{ width: "42.69px", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_poi.dropdown_adult}<DownOutlined /></Button>
                                </Dropdown>
                                <Text>=</Text>
                                <div>
                                    <InputNumber
                                        size={"small"}
                                        value={sum_adult}
                                        disabled={true}
                                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                    // formatter={currencyFormatter(this.state.currency)}
                                    // parser={currencyParser}
                                    // onChange={this.onChangePOI_Child_Price}
                                    />
                                </div>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ height: "0px" }}>
                        <Col span={3} offset={14} style={{ bottom: "44em" }}>
                            <Text>CHILD(4-11)</Text>
                        </Col>
                        <Col span={7} style={{ bottom: "44em" }}>
                            <Space>
                                <InputNumber
                                    size={"small"}
                                    value={this.state.modal_poi.child_price}
                                    disabled={true}
                                    formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                // formatter={currencyFormatter(this.state.currency)}
                                // parser={currencyParser}
                                // onChange={this.onChangePOI_Child_Price}
                                />
                                <Text>x</Text>
                                <Dropdown overlay={poi_child_menu}>
                                    <Button size={"small"} style={{ width: "42.69px", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_poi.dropdown_child}<DownOutlined /></Button>
                                </Dropdown>
                                <Text>=</Text>
                                <div>
                                    <InputNumber
                                        size={"small"}
                                        value={sum_child}
                                        disabled={true}
                                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                    // formatter={currencyFormatter(this.state.currency)}
                                    // parser={currencyParser}
                                    // onChange={this.onChangePrice}
                                    />
                                </div>

                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ height: "0px" }}>
                        <Col span={3} offset={14} style={{ bottom: "41.5em" }}>
                            <Text>INFANT(below2)</Text>
                        </Col>
                        <Col span={7} style={{ bottom: "41.5em" }}>
                            <Space>
                                <InputNumber
                                    size={"small"}
                                    value={this.state.modal_poi.infant_price}
                                    disabled={true}
                                    formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                    // formatter={currencyFormatter(this.state.currency)}
                                    // parser={currencyParser}
                                    onChange={this.onChangePOI_Infan_Price}
                                />
                                <Text>x</Text>
                                <Dropdown overlay={poi_infant_menu}>
                                    <Button size={"small"} style={{ width: "42.69px", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_poi.dropdown_infant}<DownOutlined /></Button>
                                </Dropdown>
                                <Text>=</Text>
                                <div>
                                    <InputNumber
                                        size={"small"}
                                        value={sum_infant}
                                        disabled={true}
                                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                    // formatter={currencyFormatter(this.state.currency)}
                                    // parser={currencyParser}
                                    // onChange={this.onChangePrice}
                                    />
                                </div>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ height: "0px" }}>
                        <Col span={4} offset={20} style={{ bottom: "39em", right: "7px" }}>
                            <Space>
                                <Text strong>TOTAL</Text>
                                <div >
                                    <InputNumber
                                        size={"small"}
                                        value={this.state.modal_poi.total_price}
                                        readOnly
                                        disabled={true}
                                        formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                    // formatter={currencyFormatter(this.state.currency)}
                                    // parser={currencyParser}
                                    />
                                </div>

                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ height: "0px" }}>
                        <Col span={10} offset={14} style={{ bottom: "36.5em" }}>
                            <TextArea
                                name="note"
                                placeholder="Additional notes ..."
                                value={this.state.modal_poi.note}
                                onChange={this.handleInputChangePOI}
                                style={{ height: "auto", width: "100%" }}
                                rows={10}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Card>
    </div >
</TabPane>
<TabPane tab="ACCOMMODATION" key="2">
    {/* Tab Accom */}
    <div className={styles.sitecard_borderless_wrapper}>
        <Card bordered={false}>
            <div style={{ fontSize: "12px" }}>
                {/* Col 24 */}
                <div>
                    <Checkbox.Group value={this.state.ac_check_option} onChange={this.onSelectboxChangeAccom}>
                        <Row style={{ height: "0" }}>
                            <Col span={8}>
                                <Checkbox value="HOTEL">HOTEL</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="APARTMENTS">APARTMENTS</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="GUESTHOUSES">GUESTHOUSES</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="RESORTS">RESORTS</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="VILLAS">VILLAS</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="CAPSULE HOTELS">CAPSULE HOTELS</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                    <Row>
                        <Col span={3} offset={14} style={{ bottom: "2em" }}>
                            <Text>PROPERTY NAME</Text>
                        </Col>
                        <Col span={6} style={{ bottom: "2em" }}>
                            <Space>
                                <AutoComplete
                                    tabIndex={1}
                                    dropdownClassName="certain-category-search-dropdown"
                                    dropdownMatchSelectWidth={200}
                                    style={{ fontSize: "12px", height: "auto", width: 'auto' }}
                                    options={options_accom}
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    value={this.state.modal_accom.select_property_name}
                                    // onSelect={this.ac_auto_select}
                                    onChange={this.ac_auto_change}
                                >
                                    <Input.Search size="small" placeholder="SEARCH PROPERTY NAME" />
                                </AutoComplete>
                                <Button size={"small"} icon={<PlusCircleOutlined style={{ color: "white", marginTop: "-5px", marginLeft: "-4px", fontSize: "13px" }} />} style={{ width: "20px", height: "20px", background: '#1890ff' }}></Button>
                            </Space>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={12} >
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                                style={{ fontSize: "12px", height: "auto" }}
                                size='small'
                            />
                        </Col>
                        <Col span={2} offset={2} style={{ bottom: "3.5em" }}>
                            <Text>ROOM TYPE</Text>
                        </Col>
                        <Col span={1} offset={1} style={{ bottom: "3.5em" }} >
                            <Dropdown overlay={accom_roomtype_menu} >
                                <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >
                                    {this.state.modal_accom.select_roomtype}<DownOutlined />
                                </Button>
                            </Dropdown>
                            {/* <Select
                                                                    // onChange={value => {
                                                                    //     alert(value);
                                                                    // }}
                                                                    name="category"
                                                                    placeholder="Please select a category"
                                                                    size={"small"}
                                                                >
                                                                    {this.state.ac_room_type &&
                                                                        Array.isArray(this.state.ac_room_type) &&
                                                                        this.state.ac_room_type.map(database => {
                                                                            return <Option value={database}>{database}</Option>;
                                                                        })}
                                                                </Select> */}
                        </Col>
                        <Col span={2} offset={4} style={{ bottom: "3.5em" }} >
                            <Space>
                                <Text>ROOM</Text>
                                <Dropdown overlay={accom_room_menu} >
                                    <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_accom.ac_room}<DownOutlined /></Button>
                                </Dropdown>
                            </Space>
                        </Col>
                    </Row>
                    <Row>
                        {/* {this.state.item_accom.map(res => {
                                                                console.log('img', res.image)
                                                                return <Col span={5} >
                                                                    <Card
                                                                        style={{ width: 200, height: "auto" }}
                                                                        cover={
                                                                            <img
                                                                                alt="example"
                                                                                // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                                                                src={res.image}
                                                                            />
                                                                        }
                                                                        actions={[
                                                                            "Detail",
                                                                            "Select"
                                                                            // <SettingOutlined key="setting" />,
                                                                            // <EditOutlined key="edit" />,
                                                                            // <EllipsisOutlined key="ellipsis" />,
                                                                        ]}
                                                                    >
                                                                        <Meta
                                                                            // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                                            title="Card title"
                                                                            description="This is the description"
                                                                        />
                                                                    </Card>
                                                                </Col>
                                                            })
                                                            } */}
                        <Col span={1} >
                            <Card
                                style={{ width: 200, height: "auto" }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    "Detail",
                                    "Select"
                                    // <SettingOutlined key="setting" />,
                                    // <EditOutlined key="edit" />,
                                    // <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={1} offset={6}>
                            <Card
                                style={{ width: 200, height: "auto" }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    "Detail",
                                    "Select"
                                    // <SettingOutlined key="setting" />,
                                    // <EditOutlined key="edit" />,
                                    // <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={2} offset={6} style={{ bottom: "3.5em" }} >
                            <Text>CHECK-IN DAY</Text>
                        </Col>
                        <Col span={2} offset={1} style={{ bottom: "3.5em" }}>
                            <Dropdown overlay={accom_checkin_menu}>
                                <Button size={"small"} value={this.state.on_day} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.on_day}<DownOutlined /></Button>
                            </Dropdown>
                        </Col>
                        <Col span={5} style={{ bottom: "3.5em" }} >
                            <TimePicker
                                size={"small"}
                                // defaultValue={moment(this.state.modal_accom.checkin_time, format)}
                                value={moment(this.state.modal_accom.checkin_time, time_format)}
                                onChange={this.onChangeCheckInTime}
                                format={time_format}
                                style={{ width: "80px" }}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={1} >
                            <Card
                                style={{ width: 200, height: "auto" }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    "Detail",
                                    "Select"
                                    // <SettingOutlined key="setting" />,
                                    // <EditOutlined key="edit" />,
                                    // <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={1} offset={6}>
                            <Card
                                style={{ width: 200, height: "auto" }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    "Detail",
                                    "Select"
                                    // <SettingOutlined key="setting" />,
                                    // <EditOutlined key="edit" />,
                                    // <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    // avatar={<spanvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={3} offset={6} style={{ bottom: "24.5em" }}>
                            <Text>CHECK-OUT DAY</Text>
                        </Col>
                        <Col span={2} style={{ bottom: "24.5em" }} >
                            <Dropdown overlay={accom_checkout_menu}>
                                <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_accom.ac_checkout}<DownOutlined /></Button>
                            </Dropdown>
                        </Col>
                        <Col span={5} style={{ bottom: "24.5em" }} >
                            <TimePicker
                                size={"small"}
                                value={moment(this.state.modal_accom.checkout_time, time_format)}
                                onChange={this.onChangeCheckoutTime}
                                format={time_format}
                                style={{ width: "80px" }}
                            />
                        </Col>
                    </Row>
                    <div style={{ height: "0px" }}>
                        <Row>
                            <Col span={10} offset={14} style={{ bottom: "44.5em" }}>
                                <Text strong>PRICE:</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={2} offset={15} style={{ bottom: "44.5em" }}>
                                <Text>TODAY PRICE</Text>
                            </Col>
                            <Col span={7} style={{ bottom: "44.5em" }} >
                                <InputNumber
                                    size={"small"}
                                    // value={this.state.modal_accom.today_price}
                                    value={this.state.modal_accom.ac_today_price}
                                    readOnly
                                    disabled={true}
                                    formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                // formatter={currencyFormatter(this.state.currency)}
                                // parser={currencyParser}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={2} offset={15} style={{ bottom: "44em" }}>
                                <Text>EXTRA</Text>
                            </Col>
                            <Col span={7} style={{ bottom: "44em" }} >
                                <InputNumber
                                    size={"small"}
                                    value={this.state.modal_accom.ac_extra_price}
                                    formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                    // formatter={currencyFormatter(this.state.currency)}
                                    // parser={currencyParser}
                                    onChange={this.onChangeAccomExtraPrice}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4} offset={16} style={{ bottom: "43.5em" }}>
                                <Space>
                                    <Text strong>TOTAL</Text>
                                    <div >
                                        <InputNumber
                                            size={"small"}
                                            // defaultValue={0}
                                            value={this.state.modal_accom.ac_total_price}
                                            readOnly
                                            disabled={true}
                                            formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                        // formatter={currencyFormatter(this.state.currency)}
                                        // parser={currencyParser}
                                        // onChange={this.onChangePrice}
                                        />
                                    </div>

                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ height: "25px" }}>
                            <Col span={10} offset={14} style={{ bottom: "43em" }} >
                                <TextArea name="note" placeholder="Additional notes ..." value={this.state.modal_accom.note} onChange={this.handleInputChangeAccom} style={{ height: "auto", width: "100%" }} rows={10} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Card>
    </div >
</TabPane>

<TabPane tab="TRANSPORTATION" key="3">
    {/* Tab Transportation */}
    <div className={styles.sitecard_borderless_wrapper}>
        <Card bordered={false}>
            <div style={{ fontSize: "12px" }}>
                {/* Col 24 */}
                <div>
                    <Row>
                        <Col span={3}>
                            <Text>PICK-UP LOCATION</Text>
                        </Col>
                        <Col span={3}>
                            <Dropdown overlay={p_location_menu} >
                                <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_transport.p_location}<DownOutlined /></Button>
                            </Dropdown>
                        </Col>
                        <Col span={11} offset={7}>
                            <Text strong>PRICE:</Text>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "0.5em" }}>
                        <Col span={3}>
                            <Text>DROP-OFF LOCATION</Text>
                        </Col>
                        <Col span={3}>
                            <Dropdown overlay={d_location_menu} >
                                <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_transport.d_location}<DownOutlined /></Button>
                            </Dropdown>
                        </Col>
                        <Col span={2} offset={8} style={{ bottom: "0.5em" }}>
                            <Text>QUANTITY CAR</Text>
                        </Col>
                        <Col span={1} style={{ bottom: "0.5em" }}>
                            <Dropdown overlay={quantity_menu} >
                                <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_transport.quantity}<DownOutlined /></Button>
                            </Dropdown>
                        </Col>
                        <Col span={1} style={{ left: "0.5em", bottom: "0.5em" }}>
                            <InputNumber
                                size={"small"}
                                value={this.state.modal_transport.quantity_price}
                                disabled={true}
                                formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            // formatter={currencyFormatter(this.state.currency)}
                            // parser={currencyParser}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "0.5em" }}>
                        <Col span={3}>
                            <Text>CAR MODEL</Text>
                        </Col>
                        <Col span={4}>
                            <Space>
                                <AutoComplete
                                    tabIndex={1}
                                    dropdownClassName="certain-category-search-dropdown"
                                    dropdownMatchSelectWidth={200}
                                    style={{ fontSize: "12px", height: "auto", width: 'auto' }}
                                    options={options_transport}
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    value={this.state.modal_transport.select_carmodel}
                                    // onSelect={this.ac_auto_select}
                                    onChange={this.tran_auto_change}
                                >
                                    <Input.Search size="small" placeholder="SEARCH PROPERTY NAME" />
                                </AutoComplete>
                                <Button size={"small"} icon={<PlusCircleOutlined style={{ color: "white", marginTop: "-5px", marginLeft: "-4px", fontSize: "13px" }} />} style={{ width: "20px", height: "20px", background: '#1890ff' }}></Button>
                            </Space>
                        </Col>
                        <Col span={2} offset={7} style={{ bottom: "0.5em" }}>
                            <Text>CAR SEAT</Text>
                        </Col>
                        <Col span={1} style={{ bottom: "0.5em" }}>
                            <Dropdown overlay={carseat_menu} >
                                <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_transport.carseat_value}<DownOutlined /></Button>
                            </Dropdown>
                        </Col>
                        <Col span={1} style={{ left: "0.5em", bottom: "0.5em" }}>
                            <InputNumber
                                size={"small"}
                                value={this.state.modal_transport.carseat_price}
                                disabled={true}
                                formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            // formatter={currencyFormatter(this.state.currency)}
                            // parser={currencyParser}
                            // onChange={this.onChangeCarseatPrice}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "0.5em" }}>
                        <Col span={3}>
                            <Text>PICK-UP DAY</Text>
                        </Col>
                        <Col span={2}>
                            <Dropdown overlay={pickup_menu}>
                                <Button size={"small"} value={this.state.on_day} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.on_day}<DownOutlined /></Button>
                            </Dropdown>
                        </Col>
                        <Col span={2}>
                            <TimePicker
                                size={"small"}
                                value={moment(this.state.modal_transport.pickup_time, time_format)}
                                onChange={this.onChangePickupTime}
                                format={time_format}
                                style={{ width: "80px" }}
                            />
                        </Col>
                        <Col span={2} offset={7} style={{ bottom: "1em" }}>
                            <Text>EXTRA</Text>
                        </Col>
                        <Col span={1} offset={1} style={{ left: "0.5em", bottom: "1em" }}>
                            <InputNumber
                                size={"small"}
                                value={this.state.modal_transport.extra_price}
                                formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                                // formatter={currencyFormatter(this.state.currency)}
                                // parser={currencyParser}
                                onChange={this.onChangeExtraPrice}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "0.5em" }}>
                        <Col span={3}>
                            <Text>DROP-OFF DAY</Text>
                        </Col>
                        <Col span={2}>
                            <Dropdown overlay={dropoff_menu}>
                                <Button size={"small"} style={{ width: "auto", display: "flex" }} className="ant-dropdown-link" >{this.state.modal_transport.dropoff}<DownOutlined /></Button>
                            </Dropdown>
                        </Col>
                        <Col span={2}>
                            <TimePicker
                                size={"small"}
                                value={moment(this.state.modal_transport.dropoff_time, time_format)}
                                onChange={this.onChangeDropoffTime}
                                format={time_format}
                                style={{ width: "80px" }}
                            />
                        </Col>
                        <Col span={2} offset={7} style={{ bottom: "1.5em" }}>
                            <Text strong>TOTAL PRICE</Text>
                        </Col>
                        <Col span={1} offset={1} style={{ left: "0.5em", bottom: "1.5em" }}>
                            <InputNumber
                                size={"small"}
                                value={this.state.modal_transport.total_price}
                                readOnly
                                disabled={true}
                                formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/^฿\s?|(,*)/g, '')}
                            // formatter={currencyFormatter(this.state.currency)}
                            // parser={currencyParser}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "0.5em" }}>
                        <Col span={7}>
                            <TextArea name="note" placeholder="Additional notes ..." value={this.state.modal_transport.note} onChange={this.handleInputChangeMT} style={{ height: "auto", width: "100%" }} rows={10} />
                        </Col>
                    </Row>
                </div>
            </div>
        </Card>
    </div >
</TabPane>
<TabPane tab="OTHER" key="4">
    {/* tab other */}
    <div className={styles.sitecard_borderless_wrapper}>
        <Card bordered={false}>
            <div style={{ fontSize: "12px" }}>
                {/* Col 24 */}
                <Row style={{ marginTop: "0.5em" }}>
                    <Col span={2}>
                        <Text>TIME</Text>
                    </Col>
                    <Col span={21}>
                        <TimePicker
                            size={"small"}
                            onChange={this.onChangeOtherTime}
                            value={moment(this.state.modal_other.time, time_format)}
                            format={time_format}
                            style={{ width: "80px" }}
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: "0.5em" }}>
                    <Col span={2}>
                        <Text>ACTIVITIES</Text>
                    </Col>
                    <Col span={21}>
                        <TextArea name="note" placeholder="Additional notes ..." value={this.state.modal_other.note} onChange={this.otherHandleInputChange} style={{ height: "auto", width: "500px" }} rows={10} />
                    </Col>
                </Row>
            </div>
        </Card>
    </div >
</TabPane>
</Tabs>
