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


// 发布订阅
const MENUKEY = 'MENUKEY';

export const publishMenu = (data) => {
    PubSub.publish(MENUKEY, data);
};

export const subscribeMenu = (fn) => {
    PubSub.subscribe(MENUKEY, fn);
};
