import {REQ_QUESTION_MSG} from './actionType';

const defaultState = {
    question_msg: []
};

export default (state = defaultState, action) => {
    if (action.type === REQ_QUESTION_MSG) {
        // 先拷贝一份状态
        let newState = JSON.parse(JSON.stringify(state));

        newState.question_msg = action.question_msg;

        return newState;
    }

    return state;
};