import * as server from '../services/server';
import { message } from 'antd';
import { routerRedux } from 'dva/router';//路由跳转
import queryString from 'query-string';//url参数
import { setList, avoidData, dealMenuData } from '../utils'

export default {
	namespace: 'loginPage',
	state: {},
	reducers: {
		login(state, { payload = {} }) {
			return {
				...state,
				...payload,
			}
		}
	},
	effects: {
		*fetchLogin({ payload }, { call, put, select }) {
			try {
				const { userName, password } = payload;
				const { data: { data:result, msg, code} } = yield call(server.loginFn, { userName, password })//call异步

				const isSuccess = code === 200;
				if (isSuccess) {
					let { funcTreeVo, ...payload } = result;
					const fnTree = avoidData(result,'funcTreeVo.children');
					const subTree = dealMenuData(fnTree);
					setList('subNav', subTree)//设置sessionStorge subNav
					yield put({ type: 'login', payload })//put同步
					yield select(({ loginPage: { userName, token } } = { loginPage: {} }) => {//从state中取值
						setList('userInfo', { userName, token }) //设置sessionStorge userInfo
					});
					// yield put( routerRedux.push('/main') ); // 路由跳转
					yield put(routerRedux.push({//路由跳转
						pathname: '/main',
						search: queryString.stringify({
							from: 'pro',
							to: 'main',
						})
					}))
				} else {
					message.warn(msg);
				}
				return isSuccess;
			} catch (error) {
				message.warn('jiekou222');
			}
		}
	},
	subscriptions: {
		setup({ dispatch, history }) { 	
		},
	},
}