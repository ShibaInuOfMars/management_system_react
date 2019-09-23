import React, {Component} from 'react';

// 进行类型检查
import PropTypes from 'prop-types';

import {withRouter} from 'react-router-dom';

import './right-header.less';

import {getLoginInfo, removeLoginInfo} from './../../../../api/user-api';

import {timeFormate} from './../../../../utils/time-tool';

// antd
import {Layout, Icon, Button, Modal, message} from 'antd';
const {Header} = Layout;

class RightHeader extends Component {

    state = {
        time: timeFormate(new Date())
    };

    static propTypes = {
        collapsed: PropTypes.bool,
        toggle: PropTypes.func
    };

    componentDidMount() {
        this.timer = setInterval(() => {
            this.state.time = timeFormate(new Date());
            this.setState(this.state);
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    // 退出登录
    _logOut = () => {
        Modal.confirm({
            title: '警告',
            content: '您确定要退出吗？',
            okText: '退出',
            cancelText: '取消',
            onOk: () => {
                removeLoginInfo();
                message.success('退出成功');
                this.props.history.replace('/login');
            },
            onCancel: ''
        });
    };

    render() {
        const {collapsed, toggle} = this.props;

        const {time} = this.state;

        let username = getLoginInfo().userName;

        return (
            <Header className="adminHeader">
                <Icon
                    className="trigger"
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={toggle}
                />

                <div className="rightWrapper">
                    <div className="user">
                        <span>用户名：{username}</span>
                        <Button type="link" onClick={this._logOut}>退出</Button>
                    </div>
                    <div className="otherMsg">
                        时间：<span className="time">{time}</span>天气
                    </div>
                </div>
            </Header>
        );
    }
}

export default withRouter(RightHeader);