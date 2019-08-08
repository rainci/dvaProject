import * as server from '../services/server';
import { message } from 'antd';
import { routerRedux } from 'dva/router';//路由跳转
import queryString from 'query-string';//url参数
import { setList, avoidData, dealMenuData } from '../utils'
export default {
    namespace: 'tenantPage',
    state: {},
    reducers: {
        tenantList(state,{ payload }){
            return {
                ...state,
                data:payload,
            }
        }
    },
    effects: {
        *fetchTenantList({ payload }, { call, put }){
            const { name } = payload || {};  
            const {data:{code,msg,data:result}} = yield call(server.tenantListFn, {name})//call异步
            console.log('result:',result)
            if(code === 200){
                yield put({type:'tenantList',payload:result})//同步
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( {pathname} ) => {
                console.log(pathname)
                if(pathname === '/main/tenantList'){
                    dispatch({type:'fetchTenantList'})
                }
            })

        },
    },
}