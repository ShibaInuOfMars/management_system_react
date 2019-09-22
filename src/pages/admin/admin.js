import React, {Component} from 'react';

import {Redirect} from 'react-router-dom';
import {isLogin} from "../../api/user-api";

export default class Admin extends Component{
    render() {
        // 判断是否登录，没有应该跳转到登录界面
        if (!isLogin()) { // 已登录
            return <Redirect to='/login' />;
        }

        return (
            <div>
                这是主界面
            </div>
        );
    }
}