import React, {Component} from 'react';

// 进行类型检查
import PropTypes from 'prop-types';

// 引入图片
import logo from './../../../../static/images/login-logo.jpg';

import './left-sider.less';

// antd
import {Layout, Menu, Icon} from 'antd';
const {Sider} = Layout;
const {Item} = Menu;

export default class LeftSider extends Component {

    static propTypes = {
        collapsed: PropTypes.bool
    };

    render() {

        const {collapsed} = this.props;

        return (
            <Sider className="leftSider" trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <img src={logo} alt=""/>
                    <span className={collapsed ? 'close' : ''}>刷题后台管理系统</span>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Item key="1">
                        <Icon type="user" />
                        <span>nav 1</span>
                    </Item>
                    <Item key="2">
                        <Icon type="video-camera" />
                        <span>nav 2</span>
                    </Item>
                    <Item key="3">
                        <Icon type="upload" />
                        <span>nav 3</span>
                    </Item>
                </Menu>
            </Sider>
        );
    }
}