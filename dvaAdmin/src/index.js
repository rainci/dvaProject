import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import { message } from 'antd';
const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
    history: createHistory(),
    onError(e) {
        message.error(e.message, ERROR_MSG_DURATION);
    }
});

// 2. Plugins
app.use(createLoading());//add loading

// 3. Model
app.model(require('./models/loginPage').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
