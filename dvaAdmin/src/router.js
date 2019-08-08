import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import LoginPage from './routes/login'
import Main from './routes/main/index.js'
import TenantList from './routes/user/tenantList'
import MainIndex from './routes/main/helloMain'
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={LoginPage} />
        {/* <Route path='/main' component={Main} /> */}
        <Main>
          <Route exact path="/main" component={MainIndex} />
          <Route path="/main/tenantList" component={TenantList} />
        </Main>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
