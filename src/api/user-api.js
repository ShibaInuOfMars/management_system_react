import ajax from './ajax';

import {saveObj, getObj, removeObj} from './../utils/store-tool';

// 1. 定义基础路径
const BASE_URL = 'http://localhost:3000/api/users';

// 2. 登录请求
export const reqLogin = (url, {account, password}) => {
    return ajax(BASE_URL + url, {account, password}, 'post');
};

// 基础key
const USERKEY = 'USERKEY';

// 3. 判断是否登录
export const isLogin = (key = USERKEY) => {
    /*if (getObj(key) === '{}') { // 没有登录
        return false;
    } else { // 已登录
        return true;
    }*/
    // console.log(getObj(key));
    let obj = getObj(key);
    if (obj === null || !obj.id) {
        return false;
    } else if (obj.id) {
        return true;
    }
};

// 4. 获取登录信息
export const getLoginInfo = (key = USERKEY) => {
    return  JSON.parse(getObj(key)) || {};
};

// 5. 保存登录信息
export const saveLoginInfo = (value, key = USERKEY) => {
    saveObj(key, value);
};

// 5. 移除登录信息
export const removeLoginInfo = (key = USERKEY) => {
    removeObj(key);
};