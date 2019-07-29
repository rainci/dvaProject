import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import LoginPage from './routes/login'
import Main from './routes/main'
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={LoginPage} />
        <Route path='/main' component={Main} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
