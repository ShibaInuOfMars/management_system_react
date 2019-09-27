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

export const addQuestion = (title, content, categoryID, answer) => {
    return ajax(BASE_URL + '/addQuestion', {
        title,
        content,
        categoryID,
        answer
    }, 'post');
};

export const editQuestion = (id, title, content, categoryID, answer) => {
    return ajax(BASE_URL + '/updateQuestion', {
        id,
        title,
        content,
        categoryID,
        answer
    }, 'post');
};

export const questionMsg = () => ajax(BASE_URL + '/questionMsg');