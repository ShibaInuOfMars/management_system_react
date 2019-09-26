import ajax from './ajax';

const BASE_URL = '/api/questions';

export const getCurrentCategory = (key) => {
    return ajax('/api/menus/getCourseID', {
        key
    });
};

export const getQuestionList = (courseID, pageNum = 1, pageSize = 3) => {
    return ajax(BASE_URL + '/list', {
        courseID,
        pageNum,
        pageSize
    });
};

export const delQuesiotn = (id) => {
    return ajax(BASE_URL + '/deleteQuestion', {
        id
    }, 'post');
};