import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import LoginPage from './routes/login'
import Main from './routes/main'
import TenantList from './routes/user/tenantList'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={LoginPage} />
        <Route path='/main' component={Main} />
        <Route path='/main/tenantList' component={TenantList} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
