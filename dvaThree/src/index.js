import dva from 'dva';
import createLoading from 'dva-loading';
import { browserHistory } from 'dva/router';
import { message } from 'antd';
import './index.css';
const ERROR_MSG_DURATION = 3; // 3 秒
// 1. Initialize
const app = dva({
  history: browserHistory(),
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  }
});

// 2. Plugins
app.use(
  createLoading()
);

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
