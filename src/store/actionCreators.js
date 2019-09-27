import {REQ_QUESTION_MSG} from './actionType';

import {questionMsg} from './../api/question-api';

export const req_question_msg = () => {
    return async (dispatch) => {
        let res = await questionMsg();
        if (res.status === 0) {
            dispatch({
                type: REQ_QUESTION_MSG,
                question_msg: res.data
            });
        }
    };
};