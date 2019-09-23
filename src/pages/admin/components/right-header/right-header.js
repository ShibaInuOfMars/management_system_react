import React, {Component} from 'react';

// 进行类型检查
import PropTypes from 'prop-types';

import {withRouter} from 'react-router-dom';

import './right-header.less';

import {getLoginInfo, removeLoginInfo} from './../../../../api/user-api';

import {timeFormate} from './../../../../utils/time-tool';

import {getWeather} from './../../../../api/weather-api';

// antd
import {Layout, Icon, Button, Modal, message} from 'antd';

const {Header} = Layout;

class RightHeader extends Component {

    state = {
        time: timeFormate(new Date()),
        picURLday: '',
        picURLnight: '',
        notice: ''
    };

    static propTypes = {
        collapsed: PropTypes.bool,
        toggle: PropTypes.func
    };

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                time: timeFormate(new Date())
            });
        }, 1000);

        getWeather().then(res => {
            let {picURLday, picURLnight, notice} = res;
            this.setState({
                picURLday,
                picURLnight,
                notice
            });
        });
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

        const {time, picURLday, picURLnight, notice} = this.state;

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
                        <div className="left">首页</div>
                        <div className="right">
                            时间：<span className="time">{time}</span>
                            天气
                            <span className="weather">
                            <img src={picURLday} alt=""/>
                            <img src={picURLnight} alt=""/>
                            <span>{notice}</span>
                        </span>
                        </div>
                    </div>
                </div>
            </Header>
        );
    }
}

export default withRouter(RightHeader);