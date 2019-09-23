import React, {Component} from 'react';

import {Redirect} from 'react-router-dom';
import {isLogin} from "../../api/user-api";

import './admin.less';

// 相关组件
import LeftSider from './components/left-sider/left-sider';

// antd
import { Layout, Icon } from 'antd';
const { Header, Content, Footer } = Layout;

export default class Admin extends Component{
    state = {
        collapsed: false
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

        const {collapsed} = this.state;

        return (
            <Layout className="adminWrapper">
                {/* 左边菜单 */}
                <LeftSider collapsed={collapsed} />
                <Layout>
                    <Header className="header">
                        <Icon
                            className="trigger"
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
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