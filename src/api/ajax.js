import axios from 'axios';

import {message} from 'antd';

// 基础路径
const BASE_URL = 'http://localhost:3000';

export default function ajax(url, data = {}, method = 'get', baseurl = BASE_URL) {
    // 再返回一个Promise给外界，那么外界就可以使用.then
    return new Promise((resolve, reject) => {
        // 判断请求类型
        if (method.toLowerCase() === 'get') { // get请求
            return axios.get(baseurl + url, {
                params: data
            }).then((res) => {
                // 通过resolve抛出正常的结果
                resolve(res.data);
            }).catch((err) => {
                // 统一处理错误
                message.error('网络异常：' + err.message);
            });
        } else if (method.toLowerCase() === 'post') { // post请求
            return axios.post(url, data).then((res) => {
                // 通过resolve抛出正常的结果
                resolve(res.data);
            }).catch((err) => {
                // 统一处理错误
                message.error('网络异常：' + err.message);
            });
        }
    });
}