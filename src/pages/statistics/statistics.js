import React, {Component} from 'react';

import {Switch, Route} from 'react-router-dom';

import Bar from './bar';
import Line from './line';
import Pie from './pie';

export default class Statistics extends Component {
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