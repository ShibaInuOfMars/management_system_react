// 格式化时间
export const timeFormate = (time) => {
    let date = new Date(time);
    
    let year = date.getFullYear();
    let month = toDub(date.getMonth() + 1);
    let dt = toDub(date.getDate());
    let h = toDub(date.getHours());
    let m = toDub(date.getMinutes());
    let s = toDub(date.getSeconds());

    return year + '/' + month + '/' +dt + ' ' + h + ':' + m + ':' + s;
};

// 将一位数变成两位数
function toDub(num) {
    return num < 10 ? '0' + num : num;
}