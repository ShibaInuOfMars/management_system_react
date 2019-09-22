import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// 相关页面
import Admin from './pages/admin/admin';
import Login from './pages/login/login';

export default class App extends Component{
    render() {
        return (
          <Router>
              <Switch>
                  <Route path="/login" component={Login} />
                  {/* 根路径要放到最后 */}
                  <Route path="/" component={Admin} />
              </Switch>
          </Router>
        );
    }
}