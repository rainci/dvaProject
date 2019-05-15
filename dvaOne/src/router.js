import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import CountPage from './routes/countPage';
import Products from './routes/products'
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/count" component={CountPage} />
        <Route path="/products" component={Products} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
