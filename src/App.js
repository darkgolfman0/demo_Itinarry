import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
  CoffeeOutlined,
  SettingFilled,
  ProfileFilled,
  DeploymentUnitOutlined,
  PushpinOutlined
} from '@ant-design/icons';

import './App.css';
import "antd/dist/antd.css";
import './index.css'
import Routing from './routes'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout>
        {/* Head Nav */}
        <Header className="header">
          {/* <div className="logo" /> */}
          <Menu  mode="horizontal" style={{ paddingLeft: '10rem' }}>
            {/* <Menu.Item key="1"><Link exact to="/">Dashboard</Link></Menu.Item> */}
            {/* <Menu.Item key="2">ININENARY</Menu.Item>
            <Menu.Item key="3"><Link exact to="/poi_list">POI</Link></Menu.Item>
            <Menu.Item key="4">ETC.</Menu.Item>
            <Menu.Item key="5">BLOG</Menu.Item>
            <Menu.Item key="6">SETTINGS</Menu.Item> */}
          </Menu>
        </Header>
        <Layout style={{ minHeight: '100vh' }}>
          {/* Side Nav */}
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu mode="inline">
              {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"> */}
              <Menu.Item key="1" icon={<CoffeeOutlined />}>
                <Link exact to="/">
                  <span style={{ color: '#434343' }}>
                    DASHBOARD
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<DeploymentUnitOutlined />}>
                <Link exact to="/itinerary_list">
                  <span style={{ color: '#434343' }}>
                    ITINERARY
                </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<PushpinOutlined />}>
                <Link exact to="/poi_list">
                  <span style={{ color: '#434343' }}>
                    POI
                  </span>
                </Link>
              </Menu.Item>
              <SubMenu style={{ color: '#434343' }} key="sub1" icon={<ProfileFilled />} title="MANAGEMENT">
                <Menu.Item key="4">
                  <Link exact to="/customer_list">
                    <span style={{ color: '#434343' }}>
                      Customer
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link exact to="/accom_list">
                    <span style={{ color: '#434343' }}>
                      Accommodation
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link exact to="/transport_list">
                    <span style={{ color: '#434343' }}>
                      Transportation
                  </span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu style={{ color: '#434343' }} key="sub2" icon={<SettingFilled />} title="SETTING">
                {/* <Menu.Item key="7">
                  <Link exact to="/user_manage">
                    <span style={{ color: '#434343' }}>
                      User Management
                    </span>
                  </Link>
                </Menu.Item> */}
                <Menu.Item key="8">
                  <Link exact to="/user_profile">
                    <span style={{ color: '#434343' }}>
                      User Profile
                    </span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              {/* ------------------ example submenu ------------------------ */}
              {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />} /> */}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>POI</Breadcrumb.Item>
                <Breadcrumb.Item>poi_list</Breadcrumb.Item>
              </Breadcrumb> */}

              {/*----------------- page data ------------ */}
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Routing />
              </div>

            </Content>
            <Footer style={{ textAlign: 'center' }}>SMARTWORK Design ©2020</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
