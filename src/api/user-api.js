import ajax from './ajax';

// 1. 定义一个基础路径
const BASE_URL = 'http://localhost:3000/api/users';

// 2. 登录请求
export const reqLogin = (url, {account, password}) => {
    return ajax(BASE_URL + url, {account, password}, 'post');
};