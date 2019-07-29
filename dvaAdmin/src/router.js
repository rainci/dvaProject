import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LoginPage from './routes/login'
import FCMain from './routes/main'
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path='/main' component={FCMain} /> 
      </Switch>
    </Router>
  );
}

export default RouterConfig;
