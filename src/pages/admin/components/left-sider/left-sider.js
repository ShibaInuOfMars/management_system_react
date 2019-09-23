import React, {Component} from 'react';

// 进行类型检查
import PropTypes from 'prop-types';

import {Link, withRouter} from 'react-router-dom';

// 相关api
import {reqSiderItem} from './../../../../api/sider-api';

// 引入图片
import logo from './../../../../static/images/login-logo.jpg';

import './left-sider.less';

// antd
import {Layout, Menu, Icon, message} from 'antd';

const {Sider} = Layout;
const {Item, SubMenu} = Menu;

class LeftSider extends Component {

    state = {
        menuList: []
    };

    static propTypes = {
        collapsed: PropTypes.bool
    };

    componentDidMount() {
        // 组件加载完成后执行
        this._siderItemReq();
    }

    // 请求菜单项
    _siderItemReq = async () => {
        // 1. 发送请求
        let res = await reqSiderItem('/list');
        // console.log(res);
        if (res.status === 0) { // 成功
            this.state.menuList = res.data;
            // 同步
            this.setState(this.state);
        } else { // 失败
            message.error('菜单项请求失败');
        }
    };

    // 根据数据创建出对应的元素（递归实现）
    _renderMenu = (menuList) => {
       return menuList.map(item => {
            // 1. 判断每一项里面是否还有子菜单项
           if (!item.children) { // 没有
                return (
                    <Item to={item._key} key={item._key}>
                        <Link to={item._key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Item>
                );
            } else { // 有
                return (
                    <SubMenu
                        key={item._key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {/* 再次判断子菜单项里面还有没有子菜单项 */}
                        {this._renderMenu(item.children)}
                    </SubMenu>
                );
            }
        });
    };

    // 根据当前菜单列表数据, 以及当前的路由路径, 获取到应该被展开的菜单项
    _getOpenKeys = (meunList, path) => {
        for (var i = 0; i< meunList.length; i++) {
            let menu = meunList[i];

            if (menu.children && menu.children.find(item => {
                return item._key === path;
            })) {
                return menu._key;
            }
        }

        return '';
    };

    render() {

        const {collapsed, location} = this.props;

        const {menuList} = this.state;

        // 获取地址栏路径
        let path = location.pathname;

        // 获取应该展开的那项
        let openKeys = this._getOpenKeys(menuList, path);

        return (

            <Sider className="leftSider" trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <img src={logo} alt=""/>
                    <span className={collapsed ? 'close' : ''}>刷题后台管理系统</span>
                </div>
                {
                    // 处理数据还没下来的时候菜单项没有展开的BUG
                    menuList.length > 0 ? (
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]} defaultOpenKeys={[openKeys]}>
                        {/*
                    <Item key="1">
                        <Icon type="user" />
                        <span>nav 1</span>
                    </Item>

                    <SubMenu
                        key="sub1"
                        title={
                          <span>
                            <Icon type="mail" />
                            <span>Navigation One</span>
                          </span>
                        }
                     >
                        <Menu.Item key="1">Option 1</Menu.Item>
                        <Menu.Item key="2">Option 2</Menu.Item>
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                     </SubMenu>
                    */}
                        {this._renderMenu(menuList)}
                    </Menu>
                    ) : ''
                }
            </Sider>
        );
    }
}

// 将该组件变路由组件
export default withRouter(LeftSider);