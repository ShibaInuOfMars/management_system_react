import React, {Component} from 'react';

import {Switch, Route} from 'react-router-dom';

import Bar from './bar';
import Line from './line';
import Pie from './pie';

import store from './../../store/index';
import {req_question_msg} from './../../store/actionCreators';

export default class Statistics extends Component {

    // 数据的新增action, 在这里, 执行一次
    componentDidMount() {
        const action = req_question_msg();
        store.dispatch(action);
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