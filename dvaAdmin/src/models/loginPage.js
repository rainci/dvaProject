import * as server from '../services/server';
export default {
    namespace: 'loginPage',
    state: {},
    reducers: {
        login(state,{payload: { data }={} }){
            return {
                ...state,
                ...data,
            }
        }
    },
    effects: {
        *fetchLogin({ payload }, { call, put }){
            const { userName, password } = payload || {};  
            const result = yield call(server.loginFn, {userName,password})//call异步
            console.log('result:',result)
            if(result.data && result.data.code === 200){
                yield put({type:'login',payload:result.data})//同步
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },
}