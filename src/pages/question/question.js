import React, {Component} from 'react';

import {Route, Switch} from 'react-router-dom';

import QuestionList from './question-list';
import OperationPanel from './operation-panel';

export default class Question extends Component {

    render() {
        return (
            <Switch>
                <Route path='/question/operationPanel' component={OperationPanel} />
                <Route path='/question' component={QuestionList} />
            </Switch>
        );
    }
}