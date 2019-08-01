import * as server from '../services/server';
import { message } from 'antd';
import { routerRedux } from 'dva/router';//路由跳转
import queryString from 'query-string';//url参数
import { setList } from '../utils'

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
		*fetchLogin({ payload }, { call, put, select }) {
			try {
				const { userName, password } = payload;
				const result = yield call(server.loginFn, { userName, password })//call异步

				const isSuccess = result.data && result.data.code === 200;
				console.log('result:', result, isSuccess)
				if (isSuccess) {

					yield put({ type: 'login', payload: result.data })//put同步
					yield select(({ loginPage: { userName, token } } = { loginPage: {} }) => {//从state中取值
						setList('userInfo', { userName, token })
					});
					// yield put( routerRedux.push('/main') ); // 路由跳转
					// console.log(555,this.userName,this.token)
					yield put(routerRedux.push({//路由跳转
						pathname: '/main',
						search: queryString.stringify({
							from: 'pro',
							to: 'main',
						})
					}))
				} else {
					message.warn(result.message);
				}
				return isSuccess;
			} catch (error) {
				message.warn('jiekou222');
			}
		}
	},
	subscriptions: {
		setup({ dispatch, history }) {  // eslint-disable-line
		},
	},
}