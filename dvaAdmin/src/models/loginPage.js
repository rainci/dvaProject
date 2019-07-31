import * as server from '../services/server';
import { message } from 'antd';
import { routerRedux } from 'dva/router';//路由跳转
import queryString from 'query-string';//url参数
export default {
	namespace: 'loginPage',
	state: {},
	reducers: {
		login(state, { payload: { data } = {} }) {
			return {
				...state,
				...data,
			}
		}
	},
	effects: {
		*fetchLogin({ payload }, { call, put }) {
			try {
				const { userName, password } = payload;
				const result = yield call(server.loginFn, { userName, password })//call异步
				const isSuccess = result.data && result.data.code === 200;
				if (isSuccess) {
					yield put({ type: 'login', payload: result.data })//同步
					// yield put( routerRedux.push('/main') ); // 路由跳转
					yield put(routerRedux.push({//路由跳转
						pathname:'/main',
						search: queryString.stringify({
							from: 'pro',
							to:'main',
						})
					}))
				} else {
					message.warn(result.message);
				}
				return isSuccess;
			} catch (error) {
				message.warn('jiekou');
			}
		}
	},
	subscriptions: {
		setup({ dispatch, history }) {  // eslint-disable-line
		},
	},
}