import React, {Component} from 'react';

import {Switch, Route} from 'react-router-dom';

import Bar from './bar';
import Line from './line';
import Pie from './pie';

/*import store from './../../store/index';
import {req_question_msg} from './../../store/actionCreators';*/

import {connect} from 'react-redux';
import {req_question_msg} from "../../store/actionCreators";

class Statistics extends Component {

    // 数据的新增action, 在这里, 执行一次
    componentDidMount() {
        /*const action = req_question_msg();
        store.dispatch(action);*/

        this.props.reqQuestionMsg();
    }

    render() {
        return (
            <Switch>
                <Route path="/charts/bar" component={Bar} />
                <Route path="/charts/line" component={Line} />
                <Route path="/charts/pie" component={Pie} />
            </Switch>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reqQuestionMsg() {
            const action = req_question_msg();
            dispatch(action);
        }
    }
};

export default connect(null, mapDispatchToProps)(Statistics);