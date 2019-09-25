import React, {Component} from 'react';

import {Redirect, Switch, Route} from 'react-router-dom';
import {isLogin} from "../../api/user-api";

import './admin.less';

// 相关组件
import LeftSider from './components/left-sider/left-sider';
import RightHeader from './components/right-header/right-header';
import Index from './../index/index';
import User from './../user/user';
import Category from './../category/category';
import NotFound from './../not-found/not-found';

// antd
import {Layout} from 'antd';
const { Content, Footer } = Layout;

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
                    {/* 右边头部 */}
                    <RightHeader collapsed={collapsed} toggle={this.toggle} />
                    <Content className="content">
                        <Switch>
                            <Redirect from="/" exact to="/home" />
                            <Route path="/home" component={Index} />
                            <Route path="/user" component={User} />
                            <Route path="/category" component={Category} />
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                    <Footer className="copyright">Copyright &copy; 2019 动感 All Rights Reserved.</Footer>
                </Layout>
            </Layout>
        );
    }
}