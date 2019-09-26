import React, {Component} from 'react';

import {Route, Switch} from 'react-router-dom';

import QuestionList from './question-list';

export default class Question extends Component {

    render() {
        return (
            <Switch>
                <Route path='/question' component={QuestionList} />
            </Switch>
        );
    }
}