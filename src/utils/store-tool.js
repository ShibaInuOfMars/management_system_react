import store from 'store2';

// 1. 存储数据到本地
export const saveObj = (key,value) => {
    store.set(key, value);
};

// 2. 从本地获取数据
export const getObj = (key) => {
    return store.get(key);
};

// 3. 从本地移除数据
export const removeObj = (key) => {
    store.remove(key);
};
