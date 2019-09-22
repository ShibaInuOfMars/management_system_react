import ajax from './ajax';

// 1. 定义一个基础路径
const BASE_URL = 'http://localhost:3000/api/users';

// 2. 登录请求
export const reqLogin = (url, {account, password}) => {
    return ajax(BASE_URL + url, {account, password}, 'post');
};

/*export const isLogin = (key = USERKEY) => {
    if (store.get(key) === '{}') { //没有登录
        return false;
    } else {
        return true;
    }
};*/

/*export const getLoginInfo = (key = USERKEY) => {
    let info = JSON.parse(store.get(key)) || {};
    return info;
};*/


/*export const saveLoginInfo = (value, key = USERKEY) => {
    store.set(key, value);
};*/

/*// 5. 移动登录信息
export const removeLoginInfo = (key = USERKEY) => {
    store.remove(key);
};*/