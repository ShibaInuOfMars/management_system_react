import ajax from './ajax';

// 基础路径
const BASE_URL = '/api/menus';

// 1. 获取菜单项
export const reqSiderItem = (url) => {
    return ajax(BASE_URL + url);
};