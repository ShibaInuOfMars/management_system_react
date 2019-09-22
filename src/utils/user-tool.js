import store from 'store2';

// 1. 定义基础key
const USERKEY = 'USERKEY';

// 2. 验证是否登录
export const isLogin = (key = USERKEY) => {
    if (store.get(key) === '{}') { //没有登录
        return false;
    } else {
        return true;
    }
};

// 3. 获取登录信息
export const getLoginInfo = (key = USERKEY) => {
    let info = JSON.parse(store.get(key)) || {};
    return info;
};

// 4. 存储登录信息
export const saveLoginInfo = (value, key = USERKEY) => {
    store.set(key, value);
};

// 5. 移动登录信息
export const removeLoginInfo = (key = USERKEY) => {
    store.remove(key);
};
