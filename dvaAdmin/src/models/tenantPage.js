import * as server from '../services/server';
// import { message } from 'antd';
// import { routerRedux } from 'dva/router';//路由跳转
// import queryString from 'query-string';//url参数
// import { setList, avoidData, dealMenuData } from '../utils'
export default {
    namespace: 'tenantPageModal',
    state: {},
    reducers: {
        setTenantList(state,{ payload }){
            return {
                ...state,
                ...payload,
                
            }
        }
    },
    effects: {
        *fetchTenantList({ payload={} }, { call, put }){
            const {data:{code,data:result,totalNum}} = yield call(server.tenantListFn, payload)//call异步
            console.log('result:',result)
            if(code === 200){
                yield put({type:'setTenantList',payload:{result,totalNum}})//同步
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( {pathname} ) => {
                console.log(pathname)
                if(pathname === '/tenantList'){
                    dispatch({type:'fetchTenantList'})
                }
            })

        },
    },
}