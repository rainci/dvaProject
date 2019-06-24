import * as server from '../services/server';
export default {
    namespace: 'loginPage',
    state: {},
    reducers: {
        login(state,{payload: {data }}){
            return {
                ...state,
                ...data,
            }
        }
    },
    effects: {
        *fetchLogin({ payload }, { call, put }){
            const { userName, password } = payload || {};  
            const result = yield call(server.loginFn, {userName,password})
            console.log('result:',result)
            const {data: {data , code} } = result;
            if(code === 200){
                yield put({type:'login',payload:{data}}) 
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },
}