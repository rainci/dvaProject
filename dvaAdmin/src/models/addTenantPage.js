import * as server from '../services/server';
import produce from 'immer';
// import { message } from 'antd';
// import { routerRedux } from 'dva/router';//路由跳转
// import queryString from 'query-string';//url参数
// import { setList, avoidData, dealMenuData } from '../utils'
const defaultState = {
    placeListData: [],//地名list
    placeCheckedData: [],//地名列表选中的data
    placeCheckedKeys: [],//地名列表选中的keys
    humanListData: [],//人名list
    humanCheckedData: [],//人名列表选中的data
    humanCheckedKeys: [],//人名列表选中的keys
    labelListData: [],//舆情list
    labelCheckedData: [],//舆情列表选中的data
    labelCheckedKeys: [],//舆情列表选中的keys
}
export default {
    namespace: 'addTenantPageModal',
    state: defaultState,
    reducers: {
        setTreeList: (state,{ payload }) => produce(state, draft => {
            let { result, totalNum, type } = payload;
            draft[`${type}ListData`] = result;
            draft[`${type}ListDataTotal`] = totalNum;  
        })
    },
    effects: {
        *fetchTreeList({ payload:{ type,page}}, { call, put }){
            const {data:{code,result,totalNum}} = yield call(server.treeListFn, {filter:{type,page}})//call异步
            console.log('result234:',result)
            if(code === 200){
                yield put({type:'setTreeList',payload:{result, totalNum, type}})//同步
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