import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import './index.css';
import 'antd/dist/antd.css';

// 1. Initialize
const app = dva({
  history: createHistory(),
  initialState: {
    count: 1, //此处优先级比model中优先级高
    products: [
      { 'name': 'dva', 'id': 1 },
      { 'name': 'antd', 'id': 2 }
    ]
  }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/example').default);
app.model(require('./models/count').default);
app.model(require('./models/product').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
