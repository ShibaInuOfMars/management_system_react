import React, {Component} from 'react';

import {Redirect} from 'react-router-dom';
import {isLogin} from "../../api/user-api";

import './admin.less';

// 引入图片
import logo from './../../static/images/login-logo.jpg';

// antd
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content, Footer } = Layout;

export default class Admin extends Component{
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        // 判断是否登录，没有应该跳转到登录界面
        if (!isLogin()) { // 已登录
            return <Redirect to='/login' />;
        }

        return (
            <Layout className="adminWrapper">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo">
                        <img src={logo} alt=""/>
                        <span className={this.state.collapsed ? 'close' : ''}>刷题后台管理系统</span>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="header">
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content className="content">
                        Content
                    </Content>
                    <Footer className="copyright">Copyright &copy; 2019 动感 All Rights Reserved.</Footer>
                </Layout>
            </Layout>
        );
    }
}