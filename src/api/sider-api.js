import ajax from './ajax';

import PubSub from 'pubsub-js';

// 基础路径
const BASE_URL = '/api/menus';

// 1. 获取菜单项
export const reqSiderItem = (url) => {
    return ajax(BASE_URL + url);
};

// 2. 根据parentID获取菜单列表
export const getMenuListWithParentID = (parentID = 0) => {
    return ajax(BASE_URL  + '/listMenusWithParentID', {
        parentID
    });
};

// 3. 添加菜单
export const addOneMenu = (title, icon, _key, parentID) => {
    return ajax(BASE_URL + '/addMenu', {
        title, icon, _key, parentID
    }, 'post');
};

// 4. 删除菜单
export const delOneMenu = (id) => {
    return ajax(BASE_URL + '/deleteMenu', {
        id
    }, 'post');
};

// 5. 更新菜单
export const updateMenu =(id, title, icon, _key, parentID) => {
    return ajax(BASE_URL + '/updateMenu', {
        id, title, icon, _key, parentID
    }, 'post');
};

// 发布订阅
const MENUKEY = 'MENUKEY';

export const publishMenu = (data) => {
    PubSub.publish(MENUKEY, data);
};

export const subscribeMenu = (fn) => {
    PubSub.subscribe(MENUKEY, fn);
};
